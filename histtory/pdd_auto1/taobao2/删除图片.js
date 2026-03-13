// 简化的删除函数 - 删除 /sdcard/Pictures/taobao 中的所有文件
function 删除图片() {
  const dir = '/sdcard/Pictures/taobao'

  if (!files.exists(dir)) {
    toast('目录不存在')
    return
  }

  // 获取目录中的所有文件
  const filesList = files.listDir(dir)

  // 逐个删除
  let count = 0
  filesList.forEach((file) => {
    if (files.remove(dir + '/' + file)) {
      count++
    }
  })

  let message = `删除图片-共删除${count}个文件`
  toast(message)
  return message
}

module.exports = 删除图片
