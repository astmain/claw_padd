require('./tool')
var window = floaty.window(
  <card cardCornerRadius="6" alpha="0.9">
    <vertical w="300" id="id总窗口" contentPaddingLeft="20dp">
      {/* 句柄 */}
      <linear bg="#000000">
        <button alpha="0.9" bg="#000000" id="my_handle" w="272" h="30"></button>
        <card margin="4" cardCornerRadius="100">
          <button bg="#fb512c" id="my_handle_close" textColor="#fb512c" text="true" h="20"></button>
        </card>
      </linear>
      {/* 主体 */}
      <vertical h="*" w="*">
        <my_button text="方法1" onClick="方法1()" />
        <webview id="webView" layout_below="title" w="272" h="200" src="www.baidu.com" />
      </vertical>
    </vertical>
  </card>
)

window_set_handle(window)

let is_init = false
function 方法1() {
  toast('11111111')
  window.webView.loadUrl('file://' + files.path('./html.html'))
}

// 修复：WebView 操作需要在主线程中执行
setTimeout(() => {
  ui.post(() => {
    window.webView.loadUrl('file://' + files.path('./html.html'))
    //注册一个监听函数
    window.webView.jsBridge.registerHandler('test', (data, callBack) => {
      toastLog('web调用安卓,data:' + data)
      try {
        engines.execScriptFile('/sdcard/脚本/上传淘宝相册.js')
      } catch (error) {
        log('错误情况')
        log(error)
      }

      // setTimeout(() => {
      //   //回调web
      //   callBack('1155')
      // }, 2000)
    })
  })
}, 2 * 1000)

setInterval(() => {}, 1000)

function window_set_handle(window) {
  ////原生悬浮窗体,可以拖动
  // window.setAdjustEnabled(true)

  //如果关闭窗口，应用退出,脚本停止
  window.exitOnClose()

  //初始化悬浮窗位置
  // window.setPosition(100, 10)

  //内容隐藏显示绑定 my_handle_close my_body
  window.my_handle_close.click(() => {
    if (window.my_handle_close.getText() == 'true') {
      window.my_handle_close.setText('false')
      window.my_body.visibility = 8 //8显示
    } else {
      window.my_handle_close.setText('true')
      window.my_body.visibility = 0 //8显示
    }
  })

  // 悬浮窗句柄拖拽 绑定my_handle
  window.my_handle.setOnTouchListener((view, event) => {
    switch (event.getAction()) {
      case event.ACTION_DOWN:
        x = event.getRawX()
        y = event.getRawY()
        windowX = window.getX()
        windowY = window.getY()
        return true
      case event.ACTION_MOVE:
        window.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y))
        return true
      case event.ACTION_UP:
        if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
        }
        return true
    }
    return true
  })
}
