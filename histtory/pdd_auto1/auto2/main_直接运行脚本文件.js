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
  // 删除图片();
  engines.execScriptFile('/sdcard/脚本/上传淘宝相册.js'); //成功
});
