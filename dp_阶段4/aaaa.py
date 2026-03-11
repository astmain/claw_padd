import re

url = "https://mobile.yangkeduo.com/goods.html?goods_id=804642911361&_oak_rcto=YWKS1hNz5sVWp5Mzpn8KcUOq2xpp98VGDGDgc7xQ67vXc3tYxh_J7iOT&_oak_gallery=https%3A%2F%2Fimg.pddpic.com%2Fmms-goods-image%2F2025-08-27%2F171f9771-9343-42a6-b6b9-0ca43b7c923e.jpeg.a.jpeg&_oak_gallery_token=557f65ca511ca4c99b4d6b87528b2b30&_oc_refer_ad=0&_x_query=%E5%BC%A0%E8%8B%A5%E6%98%80&refer_page_el_sn=99369&refer_rn=&page_from=23&refer_page_name=search_result&refer_page_id=10015_1773129523934_u9s83vefmg&refer_page_sn=10015&uin=GWBSSWVVLNVC6LLHIS5A7LSKOA_GEXDA"

# 正则替换：删掉所有非goods_id数字的内容，只保留794706784609
# 规则：匹配 goods_id= 后的数字，替换整个字符串为该数字；其他内容替换为空
goods_id = re.sub(r'.*goods_id=(\d+).*', r'\1', url)
print(goods_id)  # 输出：794706784609



for i, ele in enumerate(range(100)):
    print("循环",i,ele)