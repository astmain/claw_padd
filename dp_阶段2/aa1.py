# 爬虫库
import time
import json
from DrissionPage import ChromiumOptions, ChromiumPage

co = ChromiumOptions()
co.set_paths(user_data_path=r'c:/AAA_DrissionPage4')
page = ChromiumPage(co)

# 数据

import os
import pandas as pd

# 1. 构造 Excel 文件路径（相对当前脚本）
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print("BASE_DIR---:", BASE_DIR)
excel_path = os.path.join(BASE_DIR, '..', 'dp_阶段1', 'data1.xlsx')

df = pd.read_excel(excel_path, sheet_name=0)

# 方式一：每一行是一个 dict，放到 list 里
data_list = df.to_dict(orient='records')  # List[Dict]

print('总行数：', len(data_list))

detail_list = []

# 3. 遍历这个“数组对象”
for idx, row in enumerate(data_list, start=1):
    print(f'第 {idx} 行：', row)
    # 访问页面
    page.get(row['product_url'])
    print(page.title)
    img_main_list = []
    img_info_list = []
    img_main = page.eles('xpath=//*[contains(@class, "QFNLpbqP")]//img')  # QFNLpbqP
    img_info = page.eles('xpath=//*[contains(@class, "Blmqu2TV")]//img')  # Blmqu2TV
    for img in img_main:
        src = img.attr('src') if img.attr('src') else img.attr('data-src')
        print("主图---", src)
        img_main_list.append(src)

    for img in img_info:
        img_info_list.append(img.attr('src') if img.attr('src') else img.attr('data-src'))

    time.sleep(5)
    detail_list.append(dict(product_url=row['product_url'], img_main_list=img_main_list, img_info_list=img_info_list))
    print("\n\n")

json_str = json.dumps(detail_list, ensure_ascii=False, indent=4)
with open("detail_list.json", 'w', encoding='utf-8') as f:
    f.write(json_str)
page.quit()
