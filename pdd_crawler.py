#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拼多多商品爬虫 - 爬取搜索结果中的商品信息
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import random

# 要爬取的URL
URL = "https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀&search_type=goods"

# 模拟浏览器请求头
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
}

def crawl_products(url, num_products=10):
    """
    爬取拼多多商品信息
    
    Args:
        url: 搜索结果页面URL
        num_products: 要爬取的商品数量
    
    Returns:
        商品信息列表
    """
    print(f"正在爬取: {url}")
    print(f"目标商品数量: {num_products}")
    print("-" * 50)
    
    try:
        # 发送请求
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.encoding = 'utf-8'
        
        print(f"响应状态码: {response.status_code}")
        print(f"页面大小: {len(response.text)} 字符")
        
        # 解析HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        products = []
        
        # 方法1: 尝试从script标签中提取JSON数据
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and 'goodsList' in script.string:
                # 尝试提取JSON数据
                try:
                    # 查找JSON数据
                    text = script.string
                    start = text.find('{')
                    end = text.rfind('}') + 1
                    if start >= 0 and end > start:
                        data = json.loads(text[start:end])
                        if 'goodsList' in data:
                            for item in data['goodsList'][:num_products]:
                                products.append({
                                    'name': item.get('goods_name', ''),
                                    'price': item.get('price', ''),
                                    'sales': item.get('sales', ''),
                                    'shop': item.get('mall_name', ''),
                                    'link': f"https://mobile.yangkeduo.com/goods.html?goods_id={item.get('goods_id', '')}"
                                })
                except (json.JSONDecodeError, KeyError) as e:
                    print(f"JSON解析错误: {e}")
        
        # 方法2: 如果方法1失败，尝试从页面DOM中提取
        if not products:
            # 查找商品元素（可能需要根据实际页面结构调整）
            goods_items = soup.select('.goods-item, .goods-item-v2, [class*="goods"]')
            
            for item in goods_items[:num_products]:
                try:
                    name = item.select_one('.goods-name, .goods-title, [class*="name"]')
                    price = item.select_one('.price, .goods-price, [class*="price"]')
                    sales = item.select_one('.sales, .goods-sales, [class*="sales"]')
                    
                    products.append({
                        'name': name.get_text(strip=True) if name else '',
                        'price': price.get_text(strip=True) if price else '',
                        'sales': sales.get_text(strip=True) if sales else '',
                        'shop': '',
                        'link': ''
                    })
                except Exception as e:
                    print(f"解析商品元素错误: {e}")
        
        return products
        
    except requests.RequestException as e:
        print(f"请求错误: {e}")
        return []

def save_to_file(products, filename='products.txt'):
    """保存商品信息到文件"""
    with open(filename, 'w', encoding='utf-8') as f:
        for i, p in enumerate(products, 1):
            f.write(f"{'='*50}\n")
            f.write(f"商品 {i}:\n")
            f.write(f"  名称: {p.get('name', 'N/A')}\n")
            f.write(f"  价格: {p.get('price', 'N/A')}\n")
            f.write(f"  销量: {p.get('sales', 'N/A')}\n")
            f.write(f"  店铺: {p.get('shop', 'N/A')}\n")
            f.write(f"  链接: {p.get('link', 'N/A')}\n")
    print(f"\n已保存到文件: {filename}")

def main():
    print("=" * 50)
    print("拼多多商品爬虫")
    print("=" * 50)
    
    # 爬取商品
    products = crawl_products(URL, num_products=10)
    
    # 显示结果
    if products:
        print(f"\n成功爬取 {len(products)} 条商品信息:\n")
        for i, p in enumerate(products, 1):
            print(f"【商品 {i}】")
            print(f"  名称: {p.get('name', 'N/A')}")
            print(f"  价格: {p.get('price', 'N/A')}")
            print(f"  销量: {p.get('sales', 'N/A')}")
            print(f"  店铺: {p.get('shop', 'N/A')}")
            print("-" * 30)
        
        # 保存到文件
        save_to_file(products)
    else:
        print("\n未能获取到商品信息")
        print("\n可能的原因:")
        print("  1. 拼多多有反爬机制，需要登录或验证码")
        print("  2. 页面需要JavaScript渲染")
        print("  3. 网络连接问题")
        print("\n解决方案:")
        print("  1. 使用Selenium/Playwright处理动态页面")
        print("  2. 添加代理IP")
        print("  3. 模拟登录状态")

if __name__ == "__main__":
    main()
