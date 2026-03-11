"ui";

ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`)

ui.web.loadUrl("file://" + files.path("./网页.html"))


name11()
function name11(params) {
    // function bbb(data, callBack) {
    //     return new Promise((reslove, reject) => {
    //         log(data)

    //         function name222(params) {
    //             console.log(`${1}>name=======:`, 3)
    //         }
    //         let aaa = name222 + ""
    //         log("aaa", aaa)
    //         // reslove ( callBack(('function name(params) {}')))
    //         reslove(callBack(aaa))
    //     })
    // }
    // ui.web.jsBridge.registerHandler("test", bbb)



    // ui.web.jsBridge.registerHandler("test", (data, callBack) => {
    //     // toastLog("web调用安卓,data:" + data)
    //     log(data)
    //     // return callBack("1155")

    //     let aaa = log + ""
    //     log(111, aaa)
    //     // return callBack("222")
    //     callBack(('function name(params) {}'))

    // })



    let bbb = (code) => {
        let e = engines.execScript("run", code);//成功
        console.log(`${1}>e=======:`, e)//  com.stardust.autojs.execution.LoopedBasedJavaScriptExecution@2f
        log("is-11111111111--", e.getEngine().isDestroyed())
        sleep(2000);
        console.log(`${2}>22222222`)
    }



    ui.web.jsBridge.registerHandler("test", (code, callBack) => {
        log(111, code)
        // let res = eval(code)
        // engines.execScriptFile("/sdcard/脚本/script_dou_yin.js"); //成功

        // engines.execScript("hello world", "toast('hello world')");
        // engines.execScript("hello world", code);//成功
        bbb(code)

        callBack(code.toString())
        // callBack(res)
    })









}



// ui.web.jsBridge.registerHandler("test", (data, callBack) => {
//     // toastLog("web调用安卓,data:" + data)
//     log(data)
//     // return callBack("1155")

//     let aaa = log + ""
//     log(111, aaa)
//     // return callBack("222")
//     callBack(('function name(params) {}'))

// })


