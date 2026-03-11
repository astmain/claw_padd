"ui";

ui.layout(`
    <vertical>
        <webview id="webview" h="*"/>
    </vertical>`)

ui.webview.loadUrl("file://" + files.path("./网页.html"))


let bbb = (code) => {
    let e = engines.execScript("run", code);//成功
    console.log(`${1}>e=======:`, e)//  com.stardust.autojs.execution.LoopedBasedJavaScriptExecution@2f
    log("is-11111111111--", e.getEngine().isDestroyed())
    sleep(2000);
    console.log(`${2}>22222222`)
}



ui.webview.jsBridge.registerHandler("test", (code, callBack) => {
    log(111, code)
    // let res = eval(code)
    // engines.execScriptFile("/sdcard/脚本/script_dou_yin.js"); //成功

    // engines.execScript("hello world", "toast('hello world')");
    // engines.execScript("hello world", code);//成功
    bbb(code)

    callBack(code.toString())
    // callBack(res)
})


