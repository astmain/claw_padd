let tool = require("./tool")
function script_dou_yin_get_fans_nickname() {


    let object = textContains("回关").findOne(1000 * 1)

    if (object != null) {
        log(object.clickable())
        if (object.clickable()) {

            object.click()
            tool.my_log("============" + "关注成功")
        }
    }
    else {
        log("未找到关注按钮,可能已经关注了或者app版本不符合")
    }

    tool.store.arr_init("arr_douyin", [])
    let params = { num: 2000, }

    // log("点击-home:" + back() + back() + back() + back() + back()); sleep(1000)
    // log("点击-home:" + home()); sleep(1000)
    // log("点击-抖音:" + click("抖音")); sleep(1000)
    // log("点击-首页:" + click("首页")); sleep(1000)
    // log("点击-我:" + click("我")); sleep(1000)
    // log("点击-粉丝:" + click("粉丝")); sleep(1000)
    // log("**************************************")


    sleep(1000 * 1); log("**************************************")


    let item = {}
    //第1部分数据
    let list = className("android.widget.TextView").depth('3').find()
    list.forEach((currentValue, index) => {
        log(index, "index----------" + currentValue.text())
        if (index == 0) { item["获赞"] = currentValue.text() }
        if (index == 2) { item["关注"] = currentValue.text() }
        if (index == 4) { item["粉丝"] = currentValue.text() }
        if (index == 6) { item["关联"] = currentValue.text() }
        if (index == 7) { item["作品"] = currentValue.text().replace("作品 ", '') }

    })
    //第2部分数据
    item["昵称"] = className("android.widget.TextView").depth(1).findOne().desc()
    item["抖音号"] = descContains("抖音号：").findOne().desc().replace("抖音号：", '').replace("，复制", '')
    log("item1---", JSON.stringify(item))


    //第3部分数据
    let list2 = className("android.widget.TextView").depth('2').find()
    log("length---" + list2.length)
    list2.forEach((currentValue2, index2) => {
        log(index2, "index2----------" + currentValue2.text())
        if (index2 == 0) { item["性别"] = currentValue2.desc() }
        if (index2 == 1) { item["地址"] = currentValue2.text() }
        if (index2 == 2) { item["地址详细"] = currentValue2.text() }
        if (index2 == 3) { item["是否关注"] = currentValue2.text() }

    })
    log("item2---", JSON.stringify(item))









}
script_dou_yin_get_fans_nickname()
