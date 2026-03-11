

back_home()

app.launch("com.xunmeng.pinduoduo");
sleep(2 * 1000);

click_ele_desc({ remark: "搜索", ele_text: "搜索" })
var searchBtn = desc("搜索").findOne(5000);
console.log(`searchBtn`, searchBtn)
searchBtn.setText("张若昀");
click_ele_text({ remark: "搜索按钮", ele_text: "搜索" })






let mediaElements = id('media_check_hot').find()








// 函数================================================================
function click_ele_desc({ remark, ele_text }) {
  sleep(2 * 1000)
  let el = desc(ele_text).findOne(5000)
  if (el) {
    let bounds = el.bounds()
    let x = bounds.centerX()
    let y = bounds.centerY()
    click(x, y)
    console.log(`成功:${remark}---(${x},${y}})`)
    sleep(2 * 1000)
  } else {
    console.log(`异常:${remark}`)
    sleep(2 * 1000)
  }
}
function click_ele_text({ remark, ele_text }) {
  sleep(2 * 1000)
  let el = text(ele_text).findOne(5000)
  if (el) {
    let bounds = el.bounds()
    let x = bounds.centerX()
    let y = bounds.centerY()
    click(x, y)
    console.log(`成功:${remark}---(${x},${y}})`)
    sleep(2 * 1000)
  } else {
    console.log(`异常:${remark}`)
    sleep(2 * 1000)
  }
}

function click_ele_id({ desc, ele_id }) {
  sleep(2 * 1000)
  let el = id(ele_id).findOne(5000)
  if (el) {
    let bounds = el.bounds()
    let x = bounds.centerX()
    let y = bounds.centerY()
    click(x, y)
    console.log(`成功:${desc}---(${x},${y}})`)
    sleep(2 * 1000)
  } else {
    console.log(`异常:${desc}`)
    sleep(2 * 1000)
  }
}
function back_home() {
  back()
  back()
  back()
  back()
  back()
  home()
  sleep(2 * 1000)
}
