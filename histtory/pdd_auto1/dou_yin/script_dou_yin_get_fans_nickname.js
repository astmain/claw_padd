let tool = require("./tool")
function script_dou_yin_get_fans_nickname() {
    tool.store.arr_init("arr_douyin", [])
    let params = { num: 2000, }

    log("点击-home:" + back() + back() + back() + back() + back()); sleep(1000)
    log("点击-home:" + home()); sleep(1000)
    log("点击-抖音:" + click("抖音")); sleep(1000)
    log("点击-首页:" + click("首页")); sleep(1000)
    log("点击-我:" + click("我")); sleep(1000)
    log("点击-粉丝:" + click("粉丝")); sleep(1000)
    log("**************************************")


    sleep(1000 * 5)


    // let object = className("android.widget.TextView").depth(4).id("zf_").find();
    // if (!object.empty()) {
    //     log('找到了');
    //     object.forEach((currentValue, index) => {

    //         // log(currentValue.text())
    //         toastLog(currentValue.text())
    //         sleep(3000)
    //     })
    // } else {
    //     log('没找到');
    // }

    let object = className("android.widget.Button").depth(3).id("root_layout").find()
    if (!object.empty()) {
        log('找到了');
        object.forEach(element => {
            log(element.contentDescription);
        });
    } else {

    }



}
script_dou_yin_get_fans_nickname()
