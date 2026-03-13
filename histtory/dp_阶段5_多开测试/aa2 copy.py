# 爬虫库
import time
import threading
from DrissionPage import ChromiumOptions, ChromiumPage


def browser(phone, port):
    """打开一个独立的浏览器实例"""
    co = ChromiumOptions()
    # 每个手机号对应一个独立的用户数据目录，实现cookie隔离
    co.set_paths(user_data_path=f'c:/AAA_dp_{phone}')
    page = ChromiumPage(co)
    page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')

    # 保持浏览器打开状态
    time.sleep(300)  # 等待5分钟，可根据需要调整


if __name__ == '__main__':
    phone_list = [15259712061, 18750573105]
    phone_list = [{"phone": 1111, "port": 3001}, {"phone": 18750573105, "port": 3002}, ]

    # 创建线程列表
    threads = []

    # 为每个手机号创建一个线程
    for ele in phone_list:
        t = threading.Thread(target=browser, args=(ele['phone'], ele['port'],))
        threads.append(t)

    # 启动所有线程
    for t in threads:
        t.start()

    # 等待所有线程结束
    for t in threads:
        t.join()

    print("所有浏览器已关闭")
