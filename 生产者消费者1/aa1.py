import threading
import time


def greet(x):
    print(f"greet---{x}")
    time.sleep(1)


def line_run():
    for x in range(5):
        greet(x)


def async_run():
    for x in range(5):
        th = threading.Thread(target=greet, args=[x])
        th.start()


if __name__ == '__main__':
    # line_run()
    async_run()
