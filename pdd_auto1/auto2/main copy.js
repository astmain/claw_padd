'ui';

// 全局变量，用于保存 WebSocket 实例，方便后续关闭
let globalWebSocket = null;

ui.layout(
  <vertical bg="#F5F5F5" h="*">
    <card w="*" h="40" cardCornerRadius="12dp" cardElevation="4dp" bg="#42a5f5">
      <text text="我的工具箱" textColor="#FFFFFF" textSize="18sp" gravity="center" />
    </card>
    <button text="启动 WebSocket" id="方法1" />
    <button text="关闭 WebSocket" id="关闭" />
  </vertical>
);

// // 导入 okhttp3 包（必须）
importPackage(Packages['okhttp3']);

// 点击启动 WebSocket
ui.方法1.click(() => {
  if (globalWebSocket) {
    toastLog('WebSocket 已在运行！');
    return;
  }

  threads.start(function () {
    try {
      let client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build();
      let request = new Request.Builder()
        .url('ws://192.168.124.5:9999/my_ws') // 这是连接nestjs的服务,这个为什么会失败
        // .url('ws://192.168.124.5:6666') // 这是连接expressjs的服务,可以成功
        .build();

      // 3. 定义监听器
      let myListener = {
        onOpen: function (webSocket, response) {
          console.log('✅ WebSocket 连接已打开');
          toastLog('WebSocket 已连接');

          // 发送初始消息
          let json = {
            type: 'hello',
            data: {
              device_name: '模拟设备',
              client_version: 123,
              app_version: 123,
              app_version_code: '233',
            },
          };
          webSocket.send(JSON.stringify(json));
        },

        onMessage: function (webSocket, msg) {
          console.log('📥 收到消息:', msg);
          toastLog('收到: ' + msg);
        },

        onClosing: function (webSocket, code, reason) {
          console.log('⏳ 正在关闭，code=' + code + ', reason=' + reason);
        },

        onClosed: function (webSocket, code, reason) {
          console.log('❌ WebSocket 已关闭，code=' + code);
          globalWebSocket = null;
          toastLog('连接已断开');
        },

        onFailure: function (webSocket, t, response) {
          console.error('💥 WebSocket 错误:', t.getMessage());
          toastLog('连接失败: ' + t.getMessage());
          globalWebSocket = null;
        },
      };

      // 4. 创建 WebSocket 连接
      globalWebSocket = client.newWebSocket(request, new WebSocketListener(myListener));

      console.log('🔄 WebSocket 正在连接...');

      // 5. 保持线程不退出（关键！）
      while (globalWebSocket) {
        // 可以在这里做定时任务，比如定期发心跳
        // 但通常服务器会处理 ping/pong，所以只需 sleep
        java.lang.Thread.sleep(1000);
      }
    } catch (e) {
      console.error('WebSocket 启动异常:', e);
      toastLog('启动失败: ' + e.message);
      globalWebSocket = null;
    }
  });
});

// 可选：提供关闭按钮
ui.关闭.click(() => {
  if (globalWebSocket) {
    globalWebSocket.close(1000, '用户主动关闭');
    globalWebSocket = null;
    toastLog('已请求关闭连接');
  } else {
    toastLog('当前无连接');
  }
});
