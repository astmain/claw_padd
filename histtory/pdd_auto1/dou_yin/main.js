
let tool = require("./tool")
let params = { num: 2000, }
var window = floaty.window(
    <card cardCornerRadius="6" alpha="0.9" >
        <vertical w="300" id="id总窗口" contentPaddingLeft="20dp">
            {/* 句柄 */}
            <linear bg="#000000" >
                <button alpha="0.9" bg="#000000" id="my_handle" w="272" h="30"> </button>
                <card margin="4" cardCornerRadius="100">
                    <button bg="#fb512c" id="my_handle_close" textColor="#fb512c" text="true" h="20"> </button>
                </card>
            </linear>
            {/* 主体 */}
            <vertical alpha="0.9" bg="#7d7d7d" id="my_body" padding="1">
                <linear>
                    <my_button text="关闭" onClick="关闭()" />
                    <my_button id="暂停" text="暂停" />
                    <my_button text="方法1" onClick="方法1()" />
                    <my_button text="方法2" onClick="方法2()" />
                    <my_button text="方法3" onClick="方法3()" />
                </linear>

                <linear>
                    <my_button id="抖音点赞" text="抖音点赞" />
                    <my_button id="获取粉丝昵称" text="获取粉丝昵称" />
                </linear>

          


                <linear h="50">
                    <my_button id="on_log" textSize="14" checked="true" text="on_log" />
                    <text id="on_log_info"></text>
                </linear>
            </vertical>

        </vertical>


    </card>

);


function 关闭(params) {
    toast("关闭")
    engines.stopAll()
}
window.暂停.click(() => {
    toastLog("暂停")
    setTimeout(() => {
        tool.script_stop()
        toastLog("暂停")
    }, 1000)
})


function 方法1(params) {
    window.on_log_info.setText("on_log_info:" + Math.floor(Math.random() * 1000) + 1)
}

function 方法2(params) {
    let aaa = descContains("on_log").findOne(1000 * 2)
    log("111", aaa.desc())
}


function 方法3(params) {
    toastLog("方法1")
    let arr_douyin = tool.store.arr_get("arr_douyin")
    log(arr_douyin)
}










window.抖音点赞.click((aaa) => {
    try {
        engines.execScriptFile("/sdcard/脚本/script_dou_yin.js");
    } catch (error) {
        log("错误情况")
        log(error)
    }

})

window.获取粉丝昵称.click((aaa) => {
    try {
        engines.execScriptFile("/sdcard/脚本/script_dou_yin_get_fans_nickname.js");
    } catch (error) {
        log("错误情况")
        log(error)
    }

})











tool.window_set_handle(window)


// window.


tool.store.arr_init("arr_douyin", [])
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

}, 1000);//1