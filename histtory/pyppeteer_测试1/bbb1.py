import asyncio
from pyppeteer import launch


async def basic_usage():
    # 1. 启动浏览器（可选参数：headless=False 显示浏览器窗口）
    browser = await launch(
        headless=False,  # 显示浏览器（调试用），默认 True（无头模式）
        args=['--no-sandbox'],  # 解决权限问题（Linux/macOS 可能需要）
        executablePath=r'C:\AAA_desktop\Chrome_Portable\App\Chrome-bin\chrome.exe'  # 驱动文件
    )

    # 2. 新建标签页
    page = await browser.newPage()

    # 3. 设置页面视口大小（可选）
    await page.setViewport({'width': 1920, 'height': 1080})

    # 4. 访问网页（waitUntil='networkidle2' 等待网络空闲，避免加载不完整）
    await page.goto('https://www.baidu.com', waitUntil='networkidle2')

    # 5. 模拟操作：输入关键词并点击搜索
    await page.type('#kw', 'Pyppeteer 使用教程')  # 定位输入框并输入
    await page.click('#su')  # 点击搜索按钮
    await asyncio.sleep(1)  # 等待搜索结果加载（简单等待，更优方式见下文）

    # 6. 截图保存
    await page.screenshot({'path': 'baidu_search.png', 'fullPage': True})

    # 7. 提取页面文本/数据
    title = await page.title()  # 获取页面标题
    print('页面标题：', title)

    # 8. 关闭浏览器
    await browser.close()


# 运行异步函数
asyncio.run(basic_usage())
