# Auto.js WebSocket 使用指南

本文档介绍如何在Auto.js中使用WebSocket进行实时通信，特别适用于淘宝自动化任务。

## 文件说明

### 1. `ws1.js` - 完整WebSocket客户端类
功能最完整的WebSocket实现，包含：
- 自动重连机制
- 心跳检测
- 错误处理
- 消息队列管理

### 2. `ws_simple_example.js` - 简单使用示例
基础的WebSocket使用示例，适合快速上手。

### 3. `taobao_websocket_client.js` - 淘宝专用客户端
专门为淘宝自动化设计的客户端，包含：
- 淘宝发布任务处理
- 图片上传功能
- 截图功能
- 订单检查功能

## 快速开始

### 基本使用

```javascript
// 1. 创建WebSocket连接
let ws = new WebSocket("ws://127.0.0.1:8888/taobao_ws");

// 2. 设置事件监听
ws.onopen = function() {
    log("✅ 已连接");
    ws.send(JSON.stringify({type: "register", client: "autojs"}));
};

ws.onmessage = function(event) {
    let data = JSON.parse(event.data);
    log("收到消息: " + JSON.stringify(data));

    // 处理消息
    switch(data.type) {
        case "task_publish":
            // 执行发布任务
            break;
        case "take_screenshot":
            let img = captureScreen();
            break;
    }
};

ws.onclose = function() {
    log("❌ 连接断开");
};

ws.onerror = function(error) {
    log("⚠️ 错误: " + error);
};
```

### 使用完整客户端类

```javascript
// 引入完整客户端
let AutoWebSocket = require("ws1.js").AutoWebSocket;

// 创建连接
let wsClient = new AutoWebSocket({
    url: "ws://127.0.0.1:8888/taobao_ws",
    reconnectInterval: 3000,
    heartbeatInterval: 25000
});

// 发送消息
wsClient.send({
    type: "task_completed",
    result: "success"
});
```

### 使用淘宝专用客户端

```javascript
// 直接运行淘宝客户端
engines.execScriptFile("taobao_websocket_client.js");
```

## 消息协议

### 客户端 -> 服务器

```javascript
// 注册客户端
{
    type: "register",
    client: "autojs_client",
    timestamp: Date.now()
}

// 任务开始
{
    type: "task_started",
    task_id: "task_123",
    timestamp: Date.now()
}

// 任务完成
{
    type: "task_completed",
    task_id: "task_123",
    result: {...},
    timestamp: Date.now()
}

// 任务失败
{
    type: "task_error",
    task_id: "task_123",
    error: "错误信息",
    timestamp: Date.now()
}

// 心跳
{
    type: "heartbeat",
    timestamp: Date.now()
}
```

### 服务器 -> 客户端

```javascript
// 分配任务
{
    type: "task_assign",
    task: {
        id: "task_123",
        type: "publish_product",
        data: {...}
    }
}

// 取消任务
{
    type: "task_cancel",
    task_id: "task_123"
}

// 心跳请求
{
    type: "ping"
}
```

## 淘宝自动化任务

### 支持的任务类型

1. **publish_product** - 发布商品
2. **update_inventory** - 更新库存
3. **take_screenshots** - 截图
4. **check_orders** - 检查订单

### 任务数据格式

```javascript
// 发布商品任务
{
    type: "publish_product",
    data: {
        title: "商品标题",
        price: 99.99,
        description: "商品描述",
        images: ["http://.../img1.jpg", "http://.../img2.jpg"],
        category: "服装",
        attributes: {...}
    }
}

// 截图任务
{
    type: "take_screenshots",
    data: {
        count: 3,  // 截图数量
        delay: 1000  // 间隔时间(ms)
    }
}
```

## 配置参数

```javascript
const config = {
    url: "ws://127.0.0.1:8888/taobao_ws",  // 服务器地址
    reconnectInterval: 5000,              // 重连间隔(ms)
    heartbeatInterval: 30000,             // 心跳间隔(ms)
    maxReconnectAttempts: 10,             // 最大重连次数
    timeout: 10000                        // 连接超时时间(ms)
};
```

## 常见问题

### 1. 连接失败
- 检查服务器地址是否正确
- 确认端口是否开放
- 检查网络连接

### 2. 消息发送失败
- 确认WebSocket连接状态
- 检查消息格式是否正确
- 查看发送的数据大小

### 3. 脚本自动退出
- 使用 `setInterval()` 或 `waitForEvent()` 保持运行
- 添加适当的延时

### 4. 内存泄漏
- 及时清理图片对象
- 避免创建过多的定时器
- 合理使用事件监听器

## 调试技巧

```javascript
// 查看连接状态
log("连接状态: " + ws.readyState);
// 0: 连接中, 1: 已连接, 2: 关闭中, 3: 已关闭

// 监控消息流量
ws.onmessage = function(event) {
    log("收到消息: " + event.data);
    // 添加消息计数器
};

// 性能监控
setInterval(() => {
    log("内存使用: " + device.getAvailMem() + "MB");
}, 60000);
```

## 生产环境建议

1. **错误处理**: 添加完善的异常处理
2. **日志记录**: 记录重要操作和错误
3. **重连策略**: 实现指数退避重连
4. **资源管理**: 及时释放图片和内存
5. **监控告警**: 添加连接状态监控

## 示例服务器代码 (Node.js)

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', function connection(ws) {
    console.log('新客户端连接');

    ws.on('message', function incoming(message) {
        console.log('收到消息: %s', message);

        // 解析消息
        try {
            const data = JSON.parse(message);

            switch(data.type) {
                case 'register':
                    ws.send(JSON.stringify({
                        type: 'welcome',
                        message: '连接成功'
                    }));
                    break;

                case 'task_completed':
                    console.log('任务完成:', data.task_id);
                    break;
            }
        } catch(e) {
            console.error('消息解析错误:', e);
        }
    });

    // 发送测试任务
    setTimeout(() => {
        ws.send(JSON.stringify({
            type: 'task_assign',
            task: {
                id: 'test_task_001',
                type: 'take_screenshots',
                data: { count: 1 }
            }
        }));
    }, 5000);
});
```

## 相关链接

- [Auto.js 官方文档](http://doc.autoxjs.com/)
- [WebSocket MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- [淘宝开放平台](https://open.taobao.com/)

---

如有问题，请查看控制台日志或联系开发团队。
