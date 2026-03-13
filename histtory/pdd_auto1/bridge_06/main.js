
let tool = require("tool.js")
let params = { num: 2000, }
var window = floaty.window(
    <card cardCornerRadius="6" alpha="0.9" >
        <vertical w="300" id="id总窗口" contentPaddingLeft="20dp">
            {/* 句柄 */}
            <linear bg="#000000" >
                <button alpha="0.9" bg="#000000" id="my_handle" w="272" h="30"> </button>
                <card margin="4" cardCornerRadius="100">
                    <button bg="#fb512c" id="my_handle_close" textColor="#fb512c" text="true" h="20"> </button>
                    <button id="方法1" text="" h="0" w="0" />
                </card>
            </linear>
            {/* 主体 */}
            {/* <vertical alpha="0.9" bg="#7d7d7d" id="my_body" padding="1"> */}
            <webview id="webview" h="*" />
            {/* </vertical> */}


        </vertical>


    </card>

);
















window.方法1.click((aaa) => {
    // window.webview.loadUrl("file://" + files.path("./网页.html"))

    // window. webview.requestFocus(View.FOCUS_DOWN);

    // 启用JavaScript以支持输入交互
    window.webview.getSettings().setJavaScriptEnabled(true);
    window.webview.getSettings().setDomStorageEnabled(true);


    window.webview.loadUrl("https://www.baidu.com/")
    window.webview.setEnabled(true)
    window.webview.requestFocus();
    // window.webview.setVisibility(View.VISIBLE);
    window.webview.setEnabled(true);  //  这里如果设置false, 则点击h5页面中的输入框时不能唤起软键盘
    window.webview.requestFocusFromTouch();//支持获取手势焦点
    window.webview.jsBridge.registerHandler("test", (code, callBack) => {
        log(111, code)
        let e = engines.execScript("run", code);//成功
        console.log(`${1}>e=======:`, e)//  com.stardust.autojs.execution.LoopedBasedJavaScriptExecution@2f
        log("is-11111111111--", e.getEngine().isDestroyed())
        sleep(2000);
        console.log(`${2}>22222222`)

        callBack(code.toString())
        // callBack(res)
    })




})



tool.window_set_handle(window)

// window.webview.loadUrl("file://" + files.path("./网页.html"))
// window.


tool.store.arr_init("arr_douyin", [])
let run = false
setInterval(() => {

    // ui.run(() => {
    //     let arr_douyin = tool.store.arr_get("arr_douyin")
    //     log(arr_douyin)

    //     let content = ""
    //     arr_douyin.map(o => {
    //         // content += o.index + o.desc.replace("未", "") + "\n"
    //         content = "\n" + o.index + o.desc.replace("未", "") + "\n"
    //     })

    //     window.on_log_info.setText("on_log_info:" + content)
    // })




    ui.run(() => {
        // setTimeout(() => {
        if (run == false) {
            log(11111111111111, window.方法1.click())
            run = true
        } else {

        }

        // }, 2000)
    })

    // setTimeout(()=>{
    //     window.方法1.click()
    // },2000)

}, 1000);//1