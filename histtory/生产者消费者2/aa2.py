from DrissionPage import ChromiumOptions, ChromiumPage

####################################################################
import threading
import queue
import time
import random

# 创建消息队列
message_queue = queue.Queue()

# 停止信号
stop_event = threading.Event()


def 滚动获取数据(phone, port):
    pass
    co = ChromiumOptions()
    co.set_local_port(port)
    co.set_user_data_path(f'c:/AAA_dp_{phone}')
    page = ChromiumPage(co)
    page.listen.start(targets='yangkeduo.com/proxy/api/search\?pdduid=', is_regex=True, method=None)  # 监听url
    page.get('https://mobile.yangkeduo.com')  # 跳转网页
    time.sleep(2)
    page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')  # 跳转网页
    page.run_js("""
    js_scrollBy()
    async function js_scrollBy() {
        for (let i = 0; i < 999999999; i++) {
            window.scrollBy(0, window.innerHeight)
            await new Promise((resolve) => setTimeout(resolve, 1.1 * 1000))
            window.scrollBy(0, window.innerHeight)
            await new Promise((resolve) => setTimeout(resolve, 1.1 * 1000))
            window.scrollBy(0, window.innerHeight)
            await new Promise((resolve) => setTimeout(resolve, 1.1 * 1000))
            window.scrollBy(0, window.innerHeight)
            await new Promise((resolve) => setTimeout(resolve, 20 * 1000))
        }
    }
    """)
    # page.run_js("window.scrollBy(0,2000);")  # 触发下拉
    while True:
        results = page.listen.wait(timeout=2, raise_err=False)
        if results:  # 空列表说明没有新数据
            data1 = results.response.body['items']
            data2 = []
            for ele1 in data1:
                ele2 = ele1["item_data"]["goods_model"]
                data2.append(ele2)
            # print("data2---:", data2)
            data3 = []
            for ele2 in data2:
                # ele3 = dict(title=ele2['goods_name'], img_main=ele2['hd_url'], price1=ele2['couponPromoPrice'], price2=ele2['normal_price'], product_url="https://mobile.yangkeduo.com/goods.html?goods_id=" + str(ele2["goods_id"]))
                ele3 = dict(product_url="https://mobile.yangkeduo.com/goods.html?goods_id=" + str(ele2["goods_id"]))
                # print("ele3:", ele3)
                message_queue.put(ele3)  # {"aaa":random.randint(1, 100)}
            print(f"生成者-当前队列{len(message_queue.queue)}\n")


def my_producer(producer_id):
    滚动获取数据(18750573105, 9000)  # 风控0311
    # """生产者：一个个生成数据放到队列中"""
    # count = 0
    # while not stop_event.is_set():
    #     count += 1
    #     # 模拟生产一个数据
    #     # data = random.randint(1, 100)
    #     data = {"aaa": random.randint(1, 100)}
    #     print(f"生产者 {producer_id} 生产数据: {data}")
    #
    #     # 放入队列
    #     message_queue.put(data)  # {"aaa":random.randint(1, 100)}
    #     # 打印当前的消息队列
    #     print(f"  -> 当前队列: {list(message_queue.queue)}")
    #     print(f"  -> 当前队列: {len(message_queue.queue)}")
    #
    #     # 生产间隔
    #     time.sleep(1)
    # print(f"---生产者 {producer_id} 停止生产")


def my_consumer(e):
    pass
    """消费者：从队列取数据"""
    consumer_id = e['phone']
    pass
    while not stop_event.is_set() or not message_queue.empty():
        try:
            item = message_queue.get(timeout=1)
            print(f"消费者{consumer_id}-消费数据-{item}\n")

            message_queue.task_done()
        except queue.Empty:
            continue


if __name__ == '__main__':
    print("=== 生产者-消费者模式（生产者持续生产）===")
    print("按 Ctrl+C 停止运行")

    # 创建1个生产者线程
    producer_thread = threading.Thread(target=my_producer, args=(1,), name="Producer-1")

    # 创建3个消费者线程
    consumer_threads = []
    accounts = [
        {"phone": 15259712061, "port": 9001},
        {"phone": 18750573105, "port": 9001},
    ]
    for e in accounts:
        t = threading.Thread(target=my_consumer, args=(e,), name=f"Consumer-{e['phone']}")
        consumer_threads.append(t)

    # 启动所有线程
    producer_thread.start()
    for t in consumer_threads:
        t.start()

    try:
        # 保持主线程运行
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n收到停止信号...")
        # 设置停止事件
        stop_event.set()

    # 等待所有线程结束
    producer_thread.join()
    for t in consumer_threads:
        t.join()

    print("\n=== 所有任务完成 ===")
