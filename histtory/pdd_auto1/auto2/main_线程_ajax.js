// let 上传淘宝相册 = require('上传淘宝相册.js');
// let 删除图片 = require('删除图片.js');
'ui';

ui.layout(
  <vertical bg="#F5F5F5" h="*">
    <card w="*" h="40" cardCornerRadius="12dp" cardElevation="4dp" bg="#42a5f5">
      <text text="我的工具箱" textColor="#FFFFFF" textSize="18sp" gravity="center" />
    </card>
    <button text="方法1" id="方法1" />
  </vertical>
);

ui.方法1.click(() => {
  threads.start(function () {
    try {
      let url = 'http://192.168.124.5:9999/test_get';
      let res = http.get(url, { timeout: 5000 });
      if (!res) {
        return toastLog('失败:请求无响应');
      }

      if (res.statusCode === 200) {
        let data = res.body.json(); // 注意：确保返回的是 JSON，否则会报错
        toastLog('成功:' + JSON.stringify(data));
      } else {
        toastLog('HTTP 错误: ' + res.statusCode);
      }
    } catch (e) {
      toastLog('失败:请求出错' + e.message);
    }
  });
});
