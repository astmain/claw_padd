// ==================== Auto.js WebSocket 简单使用示例 ====================

// 1. 基本连接
log("🚀 启动WebSocket客户端...");

let ws = new WebSocket("ws://127.0.0.1:8888/taobao_ws");

// 2. 连接成功事件
ws.onopen = function() {
    log("✅ 已连接到服务器");
    // 发送注册信息
    ws.send(JSON.stringify({
        type: "register",
        client: "autojs_simple_client",
        version: "1.0"
    }));
};

// 3. 接收消息事件
ws.onmessage = function(event) {
    try {
        let data = JSON.parse(event.data);
        log(`📥 收到: ${JSON.stringify(data)}`);

        // 根据消息类型处理
        switch(data.type) {
            case "task_publish":
                handlePublishTask(data);
                break;
            case "ping":
                ws.send(JSON.stringify({type: "pong"}));
                break;
            default:
                log(`未知消息类型: ${data.type}`);
        }
    } catch(e) {
        log(`消息解析错误: ${e.message}`);
    }
};

// 4. 连接关闭事件
ws.onclose = function(event) {
    log(`❌ 连接已关闭 (代码: ${event.code})`);
    // 可添加重连逻辑
    log("🔄 5秒后尝试重连...");
    setTimeout(() => {
        // 重新运行脚本或创建新连接
        engines.execScriptFile("ws_simple_example.js");
    }, 5000);
};

// 5. 错误处理事件
ws.onerror = function(error) {
    log(`⚠️ 连接错误: ${error}`);
};

// ==================== 任务处理函数 ====================

function handlePublishTask(task) {
    log(`📦 开始处理发布任务: ${task.task_id}`);

    try {
        // 1. 截图当前屏幕
        let screenshot = captureScreen();
        log("📸 已截图");

        // 2. 执行淘宝发布操作
        // 这里添加你的淘宝发布代码
        // ...

        // 3. 发送完成消息
        ws.send(JSON.stringify({
            type: "task_completed",
            task_id: task.task_id,
            result: "success",
            timestamp: Date.now()
        }));

        log(`✅ 任务完成: ${task.task_id}`);

    } catch(error) {
        // 发送错误消息
        ws.send(JSON.stringify({
            type: "task_error",
            task_id: task.task_id,
            error: error.message,
            timestamp: Date.now()
        }));
        log(`❌ 任务失败: ${error.message}`);
    }
}

// ==================== 工具函数 ====================

// 发送心跳包
function startHeartbeat() {
    setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: "heartbeat",
                timestamp: Date.now()
            }));
        }
    }, 30000); // 每30秒发送一次心跳
}

// 检查连接状态
function checkConnection() {
    setInterval(() => {
        let states = ["连接中", "已连接", "关闭中", "已关闭"];
        log(`🔍 连接状态: ${states[ws.readyState]}`);
    }, 10000);
}

// ==================== 启动服务 ====================

// 启动心跳
startHeartbeat();

// 启动状态检查
checkConnection();

// 保持脚本运行
setInterval(() => {
    // 空操作，保持脚本运行
}, 1000);

log("🎯 WebSocket客户端已启动，等待服务器连接...");
