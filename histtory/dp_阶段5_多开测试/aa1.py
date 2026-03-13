# 爬虫库
import time
import re
import json
from DrissionPage import ChromiumOptions, ChromiumPage


def browser(phone):
    co = ChromiumOptions()
    co.set_paths(user_data_path=f'c:/AAA_dp_{phone}')
    page = ChromiumPage(co)
    page.get('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀')


if __name__ == '__main__':
    browser(15259712061)
    browser(18750573105)
    # 我应该如何实现浏览器多开?
