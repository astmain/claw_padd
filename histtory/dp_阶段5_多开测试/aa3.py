import threading
import time
from DrissionPage import Chromium, ChromiumOptions, ChromiumPage

data_list = []


def one_browser_phone(phone, port):
    """打开一个独立的浏览器实例"""
    # 每个浏览器使用独立的端口和用户数据目录
    co = ChromiumOptions()
    co.set_local_port(port)  # 指定端口
    co.set_user_data_path(f'c:/AAA_dp_{phone}')  # 用户数据目录
    page = ChromiumPage(co)
    page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')
    print(f"手机号 {phone} 浏览器已打开，端口: {port}")
    input("按回车键关闭浏览器...")  # 等待用户手动关闭
    page.quit()


def multi_browser_login(accounts):
    # 每个账号配置独立的端口
    threads = []
    for acc in accounts:
        t = threading.Thread(target=one_browser_phone, args=(acc['phone'], acc['port']))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()


def multi_browser_data1(accounts):
    def one_browser_phone(phone, port):
        """打开一个独立的浏览器实例"""
        # 每个浏览器使用独立的端口和用户数据目录
        co = ChromiumOptions()
        co.set_local_port(port)  # 指定端口
        co.set_user_data_path(f'c:/AAA_dp_{phone}')  # 用户数据目录
        page = ChromiumPage(co)
        page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')
        print(f"手机号 {phone} 浏览器已打开，端口: {port}")
        data_raw = []
        max_packets = 5  # 设置最多获取的数据包数量
        packet_count = 0

        # 滚动并实时捕获数据包
        for ele in range(10):
            time.sleep(1)
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

        # 处理数据
        data_info = []
        for d_raw in data_raw:
            d = d_raw['item_data']['goods_model']
            info = dict(title=d['goods_name'], img_main=d['hd_url'], price1=d['couponPromoPrice'], price2=d['normal_price'], product_url="https://mobile.yangkeduo.com/goods.html?goods_id=" + str(d["goods_id"]))
            print("数据:", info)
            data_info.append(info)
        print(f"共获取数据: {len(data_raw)} 条")
        print(f"最终数据: {len(data_info)} 条")

    # 每个账号配置独立的端口
    threads = []
    for acc in accounts:
        t = threading.Thread(target=one_browser_phone, args=(acc['phone'], acc['port']))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()


if __name__ == '__main__':
    accounts = [
        {"phone": 15259712061, "port": 9222},
        {"phone": 18750573105, "port": 9223},
    ]
    # multi_browser_login(accounts)
    multi_browser_data1(accounts)
