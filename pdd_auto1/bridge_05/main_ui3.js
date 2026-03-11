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



ui.web.jsBridge.registerHandler("test", (code, callBack) => {
    log(111, code)
    let e = engines.execScript("run", code);//成功
    console.log(`${1}>e=======:`, e)//  com.stardust.autojs.execution.LoopedBasedJavaScriptExecution@2f
    log("is-11111111111--", e.getEngine().isDestroyed())
    sleep(2000);
    console.log(`${2}>22222222`)

    callBack(code.toString())
    // callBack(res)
})


