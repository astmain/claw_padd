let tool = require("./tool")


for (let index = 0; index < 5; index++) {

    let 关注 = text("关注").findOne(1000 * 2)
    if (关注) {
        log(关注.text())
        log(关注.parent().click(), sleep(1000 * 1))

    }
    className("android.widget.EditText").click(); sleep(1000 * 2)
    className("android.widget.EditText").setText("主播你的头发乱了"); sleep(1000 * 1)
    text("发送").findOne(1000*2).click(); sleep(1000 * 8)
    swipe(device.width / 2, 1500, device.width / 2, 400, 1000 * 0.3);; sleep(1000 * 1)


}



