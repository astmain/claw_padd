# 爬虫库
import time
import re
import json
from DrissionPage import ChromiumOptions, ChromiumPage

# phone = 15259712061  # 风控
# phone = 18750573105  # 风控
phone = 13599723265  # 风控
# phone = 15260762607 #风控
# phone = 15259517309  # 风控

project_time1 = time.time()

co = ChromiumOptions()
co.set_argument('--disable-gpu')
co.set_local_port(9001)
co.set_user_data_path(f'c:/AAA_dp_{phone}')
page = ChromiumPage(co)
page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')

"""
测试商品翻页 20秒-120个 网络问题
测试商品详情 30秒-30个  网络问题
-

"""
task_list = []
for i, ele in enumerate(range(9999)):
    pass
    try:
        print(f"翻页-{i + 1}")
        if len(task_list) >= 100: break
        # if i + 1 != 1: page.run_js('window.scrollBy(0, window.innerHeight)')
        # page.run_js('window.scrollBy(0, window.innerHeight)')
        # time.sleep(1)
        # page.run_js('window.scrollBy(0, -window.innerHeight)')
        # time.sleep(1)
        # page.run_js('window.scrollBy(0, window.innerHeight)')
        # time.sleep(1)
        # page.run_js('window.scrollBy(0, window.innerHeight)')
        # time.sleep(1)
        # page.run_js('window.scrollBy(0, window.innerHeight)')
        # time.sleep(1)
        # page.run_js('window.scrollBy(0, window.innerHeight)')

        page.run_js('window.scrollBy(0, window.scrollBy(0,4000))')
        product_ele = page.eles('xpath=//*[contains(@class, "LOFjVUas")]//img[not(contains(@class, "aaabbb"))]')  # QFNLpbqP
        print(f"翻页-元素-{len(product_ele)}")
        task_list = [ele2.attr('src') or ele2.attr('data-src') for ele2 in product_ele]
        time.sleep(30)
    except Exception as error:
        print(f"翻页-{i + 1}-失败", error)
print(f"翻页-任务数量-{len(task_list)}")

product_details = []
for i, ele_img in enumerate(task_list):
    page.ele(f'xpath=//img[@src="{ele_img}"]').click()
    img_main = page.eles('xpath=//*[contains(@class, "QFNLpbqP")]//img')  # QFNLpbqP
    img_info = page.eles('xpath=//*[contains(@class, "UhNRiWLO")]//img')  # UhNRiWLO
    img_main_list = [ele2.attr('src') or ele2.attr('data-src') for ele2 in img_main]
    img_info_list = [ele2.attr('src') or ele2.attr('data-src') for ele2 in img_info]
    product_url = page.url
    product_id = re.sub(r'.*goods_id=(\d+).*', r'\1', product_url)
    shop_name = page.ele('xpath=//*[contains(@class, "BAq4Lzv7")]').text
    product_price = page.ele('xpath=//*[contains(@class, "YocHfP4N")]').text
    product_title = page.ele('xpath=//*[contains(@class, "tLYIg_Ju ")]').text
    one = dict(product_id=product_id, shop_name=shop_name, product_price=product_price, product_title=product_title, product_url=product_url, img_main_list=img_main_list, img_info_list=img_info_list)
    product_details.append(one)
    print(f"one-{i + 1}", one)
    try:
        # page.ele(".goods-container-v2").get_screenshot(path=f'截图/{product_id}.png')  # 截图-元素
        page.ele(".goods-container-v2").get_screenshot(path=f'C:/Users/admin/Desktop/截图/{product_id}.png')  # 截图-元素
    except Exception as error:
        print(f"截图-异常-{product_id}----{product_url}")
    time.sleep(2 * 60)
    page.back()

print(f"最终商品数据{len(product_details)}个")
json_str = json.dumps(product_details, ensure_ascii=False, indent=4)
with open("product_details.json", 'w', encoding='utf-8') as f:
    f.write(json_str)

project_time2 = time.time()
project_cost = project_time2 - project_time1
print(f"项目运行耗时-{project_cost // 60}分{project_cost % 60}秒 ")
page.quit()
