import threading
import time
import random

num = 0


def Producer():
    while True:
        global num
        time.sleep(1)
        rand_num1 = random.randint(10, 100)
        num += rand_num1
        print(f"0生产者-生产了---{num}", threading.current_thread())


def Customer():
    while True:
        global num
        time.sleep(1)
        rand_num2 = random.randint(10, 200)
        if rand_num2 <= num:
            num -= rand_num2
            print("1消费了---", rand_num2, num)
        else:
            print("2余额不足---", rand_num2, num)


def async_run():
    for x in range(3):
        th = threading.Thread(target=Producer, args=[])
        th.start()

    for x in range(3):
        th = threading.Thread(target=Customer, args=[])
        th.start()


if __name__ == '__main__':
    pass

    # line_run()
    async_run()
