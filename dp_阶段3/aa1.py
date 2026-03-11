# 爬虫库
import time
import re
import json
from DrissionPage import ChromiumOptions, ChromiumPage

co = ChromiumOptions()
co.set_paths(user_data_path=r'c:/AAA_DrissionPage4')
page = ChromiumPage(co)
page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')

product_list = []
product_ele = page.eles('xpath=//*[contains(@class, "_3glhOBhU")]//img')  # QFNLpbqP
for ele in product_ele:
    img_id = ele.attr('src') if ele.attr('src') else ele.attr('data-src')
    product_list.append(dict(img_id=img_id))

product_details = []
for i, ele in enumerate(product_list):
    img_id = ele['img_id']
    ele2 = page.ele(f'xpath=//img[@src="{img_id}"]').click()
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
    product_details.append(dict(product_url=product_url, product_id="", img_main_list=img_main_list, img_info_list=img_info_list))
    page.back()
    time.sleep(4)

json_str = json.dumps(product_details, ensure_ascii=False, indent=4)
with open("product_details.json", 'w', encoding='utf-8') as f:
    f.write(json_str)
page.quit()
