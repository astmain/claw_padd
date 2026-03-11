"ui";

var window = ui.layout(
    <vertical>
        <webview id="webview" h="*" />
    </vertical>
);








let 按钮01_ = () => {

    threads.start(function () {
        try {


            log("1111111111111111111111111111")
            let e = engines.execScriptFile("/sdcard/脚本/script_dou_yin_dian_zan.js");
            log("2222222222222222222222222", e)
            //停止脚本
            log("==============")
            sleep(1000 * 1)
            arr = engines.all()
            log("arr==============", arr)
            my = engines.myEngine()
            log("my==============", my)
            sleep(1000 * 1)
            // log("isDestroyed==============",e.getEngine().isDestroyed())
            sleep(1000 * 1)
            for (let i = 0; i < arr.length; i++) {
                ele = arr[i]
                if (my != arr[i]) {
                    ele.forceStop()
                    toastLog("停止脚本2:" + ele.source + "");
                }
            }
        }
        catch (error) {
            log("error==============", error)
        }
    })






}//



ui.webview.loadUrl("file://" + files.path("./网页.html"))
ui.webview.jsBridge.registerHandler("test", (code, callBack) => {

    // threads.start(function(){
    //     log(111, code)
    //     let e = engines.execScript("run", code);//成功
    //     console.log(`${1}>e=======:`, e)//  com.stardust.autojs.execution.LoopedBasedJavaScriptExecution@2f
    //     log("is-11111111111--", e.getEngine().isDestroyed())
    //     // sleep(2000);
    //     console.log(`${2}>22222222`)
    // });




    // 按钮01_()

    threads.start(function () {
        try {
            log("1111111111111111111111111111")
            // let e = engines.execScriptFile("/sdcard/脚本/script_dou_yin_dian_zan.js");
            let e = engines.execScript("run", code);//成功
            log("2222222222222222222222222", e)
            //停止脚本
            log("==============")
            sleep(1000 * 1)
            arr = engines.all()
            log("arr==============", arr)
            my = engines.myEngine()
            log("my==============", my)
            sleep(1000 * 1)
            // log("isDestroyed==============",e.getEngine().isDestroyed())
            sleep(1000 * 1)
            // for (let i = 0; i < arr.length; i++) {
            //     ele = arr[i]
            //     if (my != arr[i]) {
            //         ele.forceStop()
            //         toastLog("停止脚本2:" + ele.source + "");
            //     }
            // }
        }
        catch (error) {
            log("error==============", error)
        }
    })


    callBack(code.toString())
    // callBack(res)
})




