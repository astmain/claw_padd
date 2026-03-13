import time
import json
from DrissionPage import ChromiumOptions, ChromiumPage

co = ChromiumOptions()
# phone = 15259712061
phone = 18750573105
co.set_paths(user_data_path=f'c:/AAA_dp_{phone}')
page = ChromiumPage(co)

# 设置监听目标
page.listen.start(targets='yangkeduo.com/proxy/api/search\?pdduid=', is_regex=True, method=None)
# 正则匹配 https://mobile.yangkeduo.com/proxy/api/search?pdduid=3149778909
# 不要匹配 https://mobile.yangkeduo.com/proxy/api/search_hotquery?pdduid=3149778909&plat=h5&source=search

# 访问页面
page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')
print(page.title)

data_raw = []
max_packets = 10  # 设置最多获取的数据包数量
packet_count = 0

# 滚动并实时捕获数据包
for ele in range(999999):
    time.sleep(10)
    print("滚动---:", ele)
    page.run_js('window.scrollBy(0, window.innerHeight)')

    # 在滚动过程中尝试获取数据包
    packet = page.listen.wait(timeout=2, raise_err=False)
    if packet:
        try:
            print("packet---:", packet.url)
            item_pdd = packet.response.body['items']
            data_raw.extend(item_pdd)
            print("item_pdd---:", len(item_pdd), "条")
            packet_count += 1

            # 获取足够数据后退出
            if packet_count >= max_packets:
                print(f"已获取 {packet_count} 个数据包，退出监听")
                break
        except Exception as e:
            print(f"解析数据包出错: {e}")
            break

# 停止监听
page.listen.stop()

print("=" * 50)
print(f"共获取数据: {len(data_raw)} 条")

# 处理数据
data_info = []
for d_raw in data_raw:
    d = d_raw['item_data']['goods_model']
    info = dict(title=d['goods_name'], img_main=d['hd_url'], price1=d['couponPromoPrice'], price2=d['normal_price'], product_url="https://mobile.yangkeduo.com/goods.html?goods_id=" + str(d["goods_id"]))
    print("数据:", info)
    data_info.append(info)

print("=" * 50)
print(f"最终数据: {len(data_info)} 条")

# 如何将最终的数据写入execl表格xlsx文件
import pandas as pd

df = pd.DataFrame(data_info)
df.to_excel('data1.xlsx', index=False)

json_str = json.dumps(data_info, ensure_ascii=False, indent=4)
with open("product_details.json", 'w', encoding='utf-8') as f:
    f.write(json_str)
print(f"数据写入execl表格1")
page.quit()
