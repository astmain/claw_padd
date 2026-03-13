let 删除图片= require("删除图片.js")
let 下载图片= require("下载图片.js")
删除图片()
let img_list = [
  {
    "file_name": "267238225167257602_主图_0.jpg",
    "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/2c/20260107182838344022_product_856405681142_main_1_1767781718129.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=Fm6KX01Q7RuayIsCHj7mUee5PnU%3D"
  },
  {
    "file_name": "267238225167257602_主图_1.jpg",
    "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/d5/20260107182838610519_product_856405681142_main_2_1767781718422.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=6c%2F6Kbg37BBcXFpCzQ7FEd%2Fn7nA%3D"
  },
  {
    "file_name": "267238225167257602_主图_2.jpg",
    "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/6b/20260107182838824605_product_856405681142_main_3_1767781718623.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=ZcM4gABV631GW%2BbiOPJ3IO8Q6cM%3D"
  },
  {
    "file_name": "267238225167257602_主图_3.jpg",
    "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/08/20260107182839109779_product_856405681142_main_4_1767781718900.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=6yDirLtDNo7BLMxpEt60odPySok%3D"
  },
  {
    "file_name": "267238225167257602_主图_4.jpg",
    "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/d5/20260107182839597863_product_856405681142_main_5_1767781719419.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=wEmVqVmMDruqFhoIiXLgVa5Lr2Q%3D"
  }
]
下载图片(img_list, '/sdcard/Pictures/taobao')


back_home()
click_ele_text({ desc: '点击-千牛', ele_text: '千牛' })
click_ele_text({ desc: '点击-图片空间', ele_text: '图片空间' })
click_ele_id({ desc: '点击-弹框', ele_id: 'close_iv' })
click_ele_id({ desc: '点击-上传', ele_id: 'upload_btn' })
click_ele_text({ desc: '点击-从相册选择', ele_text: '从相册选择' })

let mediaElements = id('media_check_hot').find()
console.log('找到 ' + mediaElements.length + ' 个 media_check_hot 元素')
for (let index = 0; index < mediaElements.length; index++) {
  let el = mediaElements[index]
  let x = el.bounds().centerX()
  let y = el.bounds().centerY()
  click(x, y)
  console.log(`点击-图片---${index + 1}--(${x}, ${y})`)
}
console.log(`图片全部点击完成`)

click_ele_text({ desc: '点击-原图', ele_text: '原图' })
click_ele_text({ desc: '点击-确定', ele_text: `确定(${mediaElements.length})` })

// 函数================================================================
// 函数================================================================
// 函数================================================================
// 函数================================================================
// 函数================================================================
function click_ele_text({ desc, ele_text }) {
  sleep(2 * 1000)
  let el = text(ele_text).findOne(5000)
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
