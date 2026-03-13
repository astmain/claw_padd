import time

from DrissionPage import ChromiumOptions, ChromiumPage


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
                print("ele3:", ele3)


if __name__ == '__main__':
    pass
    滚动获取数据(15259712061, 9001)  # 风控0311
    # 滚动获取数据(18750573105, 9001)# 风控0311
