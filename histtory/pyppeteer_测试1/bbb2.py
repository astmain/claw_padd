import asyncio
from pyppeteer import launch
from pyppeteer_stealth import stealth


async def basic_usage():
    # 1. 启动浏览器（可选参数：headless=False 显示浏览器窗口）
    browser = await launch(
        headless=False,  # 显示浏览器（调试用），默认 True（无头模式）
        args=['--no-sandbox'],  # 解决权限问题（Linux/macOS 可能需要）
        executablePath=r'C:\AAA_desktop\Chrome_Portable\App\Chrome-bin\chrome.exe',  # 驱动文件
        userDataDir=r'C:\AAA_pyppeteer1'
    )

    # 2. 新建标签页
    page = await browser.newPage()
    await stealth(page)  # 反扒库

    # 3. 设置页面视口大小（可选）
    await page.setViewport({'width': 1920, 'height': 1080})

    # 4. 访问网页（waitUntil='networkidle2' 等待网络空闲，避免加载不完整）
    await page.goto('https://mobile.yangkeduo.com/search_result.html?search_type=goods&search_key=张若昀', waitUntil='networkidle2')

    # 6. 截图保存
    await page.screenshot({'path': 'baidu_search.png', 'fullPage': True})

    # 7. 提取页面文本/数据
    title = await page.title()  # 获取页面标题
    print('页面标题：', title)

    for ele in range(5):
        await page.evaluate('_ => {window.scrollBy(0, window.innerHeight);}')
        await asyncio.sleep(2)
        print("滚动---:", ele)

    await asyncio.sleep(999999 * 999999)  # 等待搜索结果加载（简单等待，更优方式见下文）

    # 8. 关闭浏览器
    await browser.close()


# 运行异步函数
asyncio.run(basic_usage())
