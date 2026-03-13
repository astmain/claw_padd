let tool = require("tool.js")
let arr = []

// for (let index = 0; index < 20; index++) {
//     // 获取名单()
//     sleep(1000 * 0.1)
//     swipe(device.width / 2, 400, device.width / 2, 1500, 1000 * 0.3);
// }

for (let index = 0; index < 5; index++) {
    sleep(1000 * 4)
    获取名单()
    swipe(device.width / 2, 1500, device.width / 2, 400, 1000 * 0.3);
}

function 获取名单() {
    // className("android.widget.Button").untilFind().forEach(ele => {
    className("android.widget.Button").find().forEach(ele => {
        // log(ele.desc())
        // log(ele.children())
        // log(ele.child(1).desc())
        if (ele.children().length >= 3) {
            let name = ele.child(1).text()
            let btn = ele.child(3).child(0)
            let btn_text = ele.child(3).child(0).desc()

            if (btn_text == '回关') {
                if (!tool._.find(arr, { name: name })) { arr.push({ name, btn_text, btn }) }
            }

            if (btn_text == '互相关注') {
                if (!tool._.find(arr, { name: name })) { arr.push({ name, btn_text, btn }) }
            }
            if (btn_text == '更多') {
                btn = ele.child(2).child(0)
                btn_text = ele.child(2).child(0).desc()
                if (!tool._.find(arr, { name: name })) { arr.push({ name, btn_text, btn }) }
            }



            if (btn_text == "回关") {
                btn.click()
                sleep(1000 * 2)
            }


            log(1, name, btn_text)
        }

    })






}



// tool._.map(arr, o => {
//     if (o.btn_text == '回关') {
//         o.btn.click()
//         sleep(1000 * 2)
//     }
// })



// log(arr)
// log(tool._)


