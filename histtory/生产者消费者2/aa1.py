










import threading
import queue
import time
import random

# 创建消息队列
message_queue = queue.Queue()

# 停止信号
stop_event = threading.Event()


def producer(producer_id):
    """生产者：一个个生成数据放到队列中"""
    count = 0
    while not stop_event.is_set():
        count += 1
        # 模拟生产一个数据
        # data = random.randint(1, 100)
        data = {"aaa": random.randint(1, 100)}
        print(f"生产者 {producer_id} 生产数据: {data}")

        # 放入队列
        message_queue.put(data)  # {"aaa":random.randint(1, 100)}
        # 打印当前的消息队列
        print(f"  -> 当前队列: {list(message_queue.queue)}")
        print(f"  -> 当前队列: {len(message_queue.queue)}")

        # 生产间隔
        time.sleep(1)

    print(f"---生产者 {producer_id} 停止生产")


def consumer(consumer_id):
    """消费者：从队列取数据"""
    pass
    while not stop_event.is_set() or not message_queue.empty():
        try:
            # 设置超时，以便定期检查停止信号
            item = message_queue.get(timeout=1)
            print(f"消费者 {consumer_id} 消费数据: {item}")
            time.sleep(10)  # 模拟处理时间
            message_queue.task_done()
        except queue.Empty:
            continue

    # 处理队列中剩余的数据
    while not message_queue.empty():
        try:
            item = message_queue.get_nowait()
            print(f"消费者 {consumer_id} 消费剩余数据: {item}")
            message_queue.task_done()
        except queue.Empty:
            break

    print(f"---消费者 {consumer_id} 停止消费")


if __name__ == '__main__':
    print("=== 生产者-消费者模式（生产者持续生产）===")
    print("按 Ctrl+C 停止运行")

    # 创建1个生产者线程
    producer_thread = threading.Thread(target=producer, args=(1,), name="Producer-1")

    # 创建3个消费者线程
    consumer_threads = []
    for i in range(1, 4):
        t = threading.Thread(target=consumer, args=(i,), name=f"Consumer-{i}")
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
