# 爬虫库
import time
import re
import json
from DrissionPage import ChromiumOptions, ChromiumPage

project_time1 = time.time()

# co = ChromiumOptions().headless()
co = ChromiumOptions()
co.set_paths(user_data_path=r'c:/AAA_DrissionPage4')
# co.headless(True)  # 开启无头模式
co.set_argument('--disable-gpu')  # 可选，兼容部分系统的GPU渲染问题
page = ChromiumPage(co)
page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')

product_details = []


def page_info(product_list):
    page_time1 = time.time()
    for i, ele in enumerate(product_list):
        img_id = ele['img_id']
        page.ele(f'xpath=//img[@src="{img_id}"]').click()
        time.sleep(4)
        img_main_list = []
        img_info_list = []
        img_main = page.eles('xpath=//*[contains(@class, "QFNLpbqP")]//img')  # QFNLpbqP
        img_info = page.eles('xpath=//*[contains(@class, "UhNRiWLO")]//img')  # UhNRiWLO
        for img in img_main:
            src = img.attr('src') if img.attr('src') else img.attr('data-src')
            img_main_list.append(src)
        for img in img_info:
            img_info_list.append(img.attr('src') if img.attr('src') else img.attr('data-src'))

        product_url = page.url
        product_id = re.sub(r'.*goods_id=(\d+).*', r'\1', product_url)
        shop_name = page.ele('xpath=//*[contains(@class, "BAq4Lzv7")]').text
        product_price = page.ele('xpath=//*[contains(@class, "YocHfP4N")]').text
        product_title = page.ele('xpath=//*[contains(@class, "tLYIg_Ju ")]').text
        # page.ele(".goods-container-v2").get_screenshot(path=f'截图/{product_id}.png')  # 截图-元素
        page.ele(".goods-container-v2").get_screenshot(path=f'C:/Users/admin/Desktop/截图/{product_id}.png')  # 截图-元素
        one = dict(product_id=product_id, shop_name=shop_name, product_price=product_price, product_title=product_title, product_url=product_url, img_main_list=img_main_list, img_info_list=img_info_list)
        print(f"one-{i + 1}", one)
        product_details.append(one)
        page.back()
        time.sleep(4)
    page_time2 = time.time()
    page_cost = page_time2 - page_time1
    print(f"页面耗时-{page_cost // 60}分{page_cost % 60}秒 ")
    return product_list


def page_running():
    pass


product_history = []

# 翻页
for i, ele in enumerate(range(2)):
    print(f"页数-{i + 1}")
    if i + 1 != 1: page.run_js('window.scrollBy(0, window.innerHeight)')
    product_list = []
    product_ele = page.eles('xpath=//*[contains(@class, "LOFjVUas")]//img[not(contains(@class, "aaabbb"))]')  # QFNLpbqP
    for ele in product_ele:
        img_id = ele.attr('src') if ele.attr('src') else ele.attr('data-src')
        product_list.append(dict(img_id=img_id))
    print(f"页面商品数-{len(product_list)}个")
    # 判断历史记录是否存在
    product_list = [x for x in product_list if x not in product_history]
    product_temp = page_info(product_list)
    product_history.extend(product_temp)

print(f"最终商品数据{len(product_details)}个")
json_str = json.dumps(product_details, ensure_ascii=False, indent=4)
with open("product_details.json", 'w', encoding='utf-8') as f:
    f.write(json_str)

project_time2 = time.time()
project_cost = project_time2 - project_time1
print(f"项目运行耗时-{project_cost // 60}分{project_cost % 60}秒 ")
page.quit()
