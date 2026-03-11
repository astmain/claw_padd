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



    let bbb = Promise.coroutine(function* (data, callBack) {


        console.log(data);

        var result = yield Promise.resolve(callBack('11111111'));
        return result;
    })



    ui.web.jsBridge.registerHandler("test", (code, callBack) => {
        // log(111, code)
        eval(code)


        callBack(name222.toString())
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


