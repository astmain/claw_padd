// 正确的下载函数
function ajax_download(url, savePath) {
  try {
    console.log('下载图片:', url)

    // 使用 http.get() 获取图片数据
    let response = http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Android) AutoJS' } })

    if (response.statusCode === 200) {
      // 获取图片二进制数据
      let imageData = response.body.bytes()
      // 确保目录存在
      let dir = savePath.substring(0, savePath.lastIndexOf('/'))
      if (!files.exists(dir)) {
        files.createWithDirs(dir)
      }

      // 保存图片到文件
      files.writeBytes(savePath, imageData)

      console.log('下载成功:', savePath)
      // toast('下载成功')
    } else {
      console.log('下载失败，HTTP状态码:', response.statusCode)
      toast('下载失败')
    }
  } catch (e) {
    console.log('下载错误:', e.message)
    toast('下载错误: ' + e.message)
  }
}

function 下载图片(urls, basePath) {
  urls.forEach((imageObj, index) => {
    // 使用图片对象的file_name作为文件名
    let filename = imageObj.file_name
    let savePath = `${basePath}/${filename}`

    console.log(`下载第 ${index + 1} 张图片: ${filename}...`)
    ajax_download(imageObj.url, savePath)
    // sleep(1000) // 避免下载过快
  })
 
  let message=`下载图片-全部完成${urls.length}张`
  toast(message)
  return message
}

// // 使用示例
// let imageUrls = [
//   {
//     "file_name": "267238225167257602_主图_0.jpg",
//     "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/2c/20260107182838344022_product_856405681142_main_1_1767781718129.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=Fm6KX01Q7RuayIsCHj7mUee5PnU%3D"
//   },
//   {
//     "file_name": "267238225167257602_主图_1.jpg",
//     "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/d5/20260107182838610519_product_856405681142_main_2_1767781718422.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=6c%2F6Kbg37BBcXFpCzQ7FEd%2Fn7nA%3D"
//   },
//   {
//     "file_name": "267238225167257602_主图_2.jpg",
//     "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/6b/20260107182838824605_product_856405681142_main_3_1767781718623.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=ZcM4gABV631GW%2BbiOPJ3IO8Q6cM%3D"
//   },
//   {
//     "file_name": "267238225167257602_主图_3.jpg",
//     "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/08/20260107182839109779_product_856405681142_main_4_1767781718900.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=6yDirLtDNo7BLMxpEt60odPySok%3D"
//   },
//   {
//     "file_name": "267238225167257602_主图_4.jpg",
//     "url": "http://ldz-ai-image.oss-cn-shenzhen.aliyuncs.com/development/hxagents/259967471782461440/2026/01/07/d5/20260107182839597863_product_856405681142_main_5_1767781719419.jpg?OSSAccessKeyId=LTAI5tFAzB11mQx2DSB1URXd&Expires=1768386567&Signature=wEmVqVmMDruqFhoIiXLgVa5Lr2Q%3D"
//   }
// ]
// 下载图片(imageUrls, '/sdcard/Pictures/taobao')

module.exports = 下载图片

// 执行删除
// 删除图片()
