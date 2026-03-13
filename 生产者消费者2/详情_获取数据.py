import time

from DrissionPage import ChromiumOptions, ChromiumPage
import re


def 详情_获取数据(phone, port):
    pass
    co = ChromiumOptions()
    co.set_local_port(port)
    co.set_user_data_path(f'c:/AAA_dp_{phone}')
    page = ChromiumPage(co)
    page.get('https://mobile.yangkeduo.com/goods.html?goods_id=889148715108')  # 跳转网页
    img_main_eles = page.eles('xpath=//*[contains(@class, "QFNLpbqP")]//img')  # QFNLpbqP
    img_info_eles = page.eles('xpath=//*[contains(@class, "UhNRiWLO")]//img')  # UhNRiWLO
    img_main_list = []
    img_info_list = []
    for img in img_main_eles:
        img_main_list.append(img.attr('src') if img.attr('src') else img.attr('data-src'))
    for img in img_info_eles:
        img_info_list.append(img.attr('src') if img.attr('src') else img.attr('data-src'))
    product_url = page.url
    product_id = re.sub(r'.*goods_id=(\d+).*', r'\1', product_url)
    shop_name = page.ele('xpath=//*[contains(@class, "BAq4Lzv7")]').text
    product_price = page.ele('xpath=//*[contains(@class, "YocHfP4N")]').text
    product_title = page.ele('xpath=//*[contains(@class, "tLYIg_Ju ")]').text
    # page.ele(".goods-container-v2").get_screenshot(path=f'截图/{product_id}.png')  # 截图-元素
    page.ele(".goods-container-v2").get_screenshot(path=f'C:/Users/admin/Desktop/截图/{product_id}.png')  # 截图-元素
    one = dict(product_id=product_id, shop_name=shop_name, product_price=product_price, product_title=product_title, product_url=product_url, img_main_list=img_main_list, img_info_list=img_info_list)
    print("one---:", one)


if __name__ == '__main__':
    pass
    # 详情_获取数据(13599723265, 9001)
    详情_获取数据(15260762607, 9002)#0311失效
