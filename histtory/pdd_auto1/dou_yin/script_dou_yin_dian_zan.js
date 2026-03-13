let tool = require("./tool")
function script_dou_yin() {
    tool.store.arr_init("arr_douyin", [])
    let params = { num: 2, }
    log("点击-home:" + home()); sleep(1000)
    log("点击-抖音:" + click("抖音")); sleep(1000)
    log("点击-首页:" + click("首页")); sleep(1000)

    for (let index = 0; index < params.num; index++) {
        let ele = className("android.widget.LinearLayout").descContains("未点赞，").findOne(1000 * 5);
        if (ele.desc().includes("未点赞，")) {
            ele.click(); sleep(1000 * 3);
            swipe(device.width / 2, 1500, device.width / 2, 400, 1000 * 0.3);
            let item = { index: index + 1, isok: 1,msg:`滑动了: ${index + 1}`, desc: ele.desc() }; log(item);
            events.broadcast.emit("script_dou_yin", "小明");
            tool.store.arr_push("arr_douyin", item);sleep(1000 * 2)
        } else {
            swipe(device.width / 2, 1500, device.width / 2, 400, 1000 * 0.3);
        }



        // window.msg_info.getText("msg_info" + index)



    }
    toastLog('运行结束')

}
script_dou_yin()
