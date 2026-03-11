// ==================== Auto.js WebSocket 完整实现 ====================

// 配置参数
const WS_CONFIG = {
    url: "ws://127.0.0.1:8888/taobao_ws",  // WebSocket服务器地址
    reconnectInterval: 5000,              // 重连间隔(ms)
    heartbeatInterval: 30000,             // 心跳间隔(ms)
    maxReconnectAttempts: 10,             // 最大重连次数
    timeout: 10000                        // 连接超时时间(ms)
};

class AutoWebSocket {
    constructor(config = {}) {
        this.config = { ...WS_CONFIG, ...config };
        this.ws = null;
        this.reconnectAttempts = 0;
        this.heartbeatTimer = null;
        this.reconnectTimer = null;
        this.isReconnecting = false;
        this.lastHeartbeat = Date.now();

        this.connect();
        this.startHeartbeat();
    }

    // 连接WebSocket
    connect() {
        try {
            log(`🔌 正在连接到: ${this.config.url}`);
            this.ws = new WebSocket(this.config.url);

            this.ws.onopen = (event) => this.onOpen(event);
            this.ws.onmessage = (event) => this.onMessage(event);
            this.ws.onclose = (event) => this.onClose(event);
            this.ws.onerror = (error) => this.onError(error);

        } catch (error) {
            log(`❌ 创建WebSocket连接失败: ${error.message}`);
            this.scheduleReconnect();
        }
    }

    // 连接成功
    onOpen(event) {
        log("✅ WebSocket 已连接");
        this.reconnectAttempts = 0;
        this.isReconnecting = false;

        // 发送注册消息
        this.send({
            type: "register",
            client: "autojs_client",
            timestamp: Date.now()
        });

        // 启动心跳
        this.startHeartbeat();
    }

    // 接收消息
    onMessage(event) {
        try {
            let data = JSON.parse(event.data);
            this.lastHeartbeat = Date.now();

            log(`📥 收到消息: ${JSON.stringify(data)}`);

            // 处理不同类型的消息
            this.handleMessage(data);

        } catch (e) {
            log(`❌ 消息解析错误: ${e.message}, 原始消息: ${event.data}`);
        }
    }

    // 处理接收到的消息
    handleMessage(data) {
        switch (data.type) {
            case "task_publish":
                log("🚀 开始执行淘宝发布任务");
                this.handleTaskPublish(data);
                break;

            case "task_screenshot":
                log("📸 执行截图任务");
                this.handleScreenshot(data);
                break;

            case "task_click":
                log("👆 执行点击任务");
                this.handleClick(data);
                break;

            case "heartbeat":
                // 心跳响应
                break;

            default:
                log(`❓ 未知消息类型: ${data.type}`);
        }
    }

    // 处理淘宝发布任务
    handleTaskPublish(data) {
        try {
            // 发送任务开始确认
            this.send({
                type: "task_started",
                task_id: data.task_id,
                timestamp: Date.now()
            });

            // 这里执行淘宝发布逻辑
            // ... 你的淘宝发布代码 ...

            // 任务完成
            this.send({
                type: "task_completed",
                task_id: data.task_id,
                result: "success",
                timestamp: Date.now()
            });

        } catch (error) {
            this.send({
                type: "task_error",
                task_id: data.task_id,
                error: error.message,
                timestamp: Date.now()
            });
        }
    }

    // 处理截图任务
    handleScreenshot(data) {
        try {
            let img = captureScreen();
            let base64 = images.toBase64(img);

            this.send({
                type: "screenshot_result",
                task_id: data.task_id,
                image: base64,
                timestamp: Date.now()
            });

        } catch (error) {
            this.send({
                type: "task_error",
                task_id: data.task_id,
                error: error.message
            });
        }
    }

    // 处理点击任务
    handleClick(data) {
        try {
            if (data.x && data.y) {
                click(data.x, data.y);
                this.send({
                    type: "click_result",
                    task_id: data.task_id,
                    result: "success",
                    timestamp: Date.now()
                });
            }
        } catch (error) {
            this.send({
                type: "task_error",
                task_id: data.task_id,
                error: error.message
            });
        }
    }

    // 连接关闭
    onClose(event) {
        log(`❌ WebSocket 已断开 (代码: ${event.code}, 原因: ${event.reason})`);

        if (!this.isReconnecting) {
            this.scheduleReconnect();
        }
    }

    // 错误处理
    onError(error) {
        log(`⚠️ WebSocket 错误: ${error}`);
        this.scheduleReconnect();
    }

    // 发送消息
    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                let message = typeof data === 'string' ? data : JSON.stringify(data);
                this.ws.send(message);
                log(`📤 发送消息: ${message}`);
            } catch (error) {
                log(`❌ 发送消息失败: ${error.message}`);
            }
        } else {
            log("⚠️ WebSocket未连接，无法发送消息");
        }
    }

    // 心跳检测
    startHeartbeat() {
        this.stopHeartbeat();
        this.heartbeatTimer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.send({ type: "heartbeat", timestamp: Date.now() });

                // 检查最后心跳时间
                if (Date.now() - this.lastHeartbeat > this.config.timeout) {
                    log("⚠️ 心跳超时，重新连接");
                    this.ws.close();
                }
            }
        }, this.config.heartbeatInterval);
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    // 重新连接
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
            log(`❌ 已达到最大重连次数 (${this.config.maxReconnectAttempts})，停止重连`);
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        log(`🔄 ${this.reconnectAttempts}秒后尝试重连...`);

        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, this.config.reconnectInterval);
    }

    // 关闭连接
    close() {
        this.stopHeartbeat();

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }

        if (this.ws) {
            this.ws.close();
        }
    }
}

// ==================== 使用示例 ====================

// 创建WebSocket连接
let wsClient = new AutoWebSocket({
    url: "ws://127.0.0.1:8888/taobao_ws",
    reconnectInterval: 3000,
    heartbeatInterval: 25000
});

// 保持脚本运行
setInterval(() => {
    // 检查连接状态
    if (wsClient.ws) {
        let state = wsClient.ws.readyState;
        let stateText = ["连接中", "已连接", "关闭中", "已关闭"][state];
        log(`🔍 连接状态: ${stateText} (重连次数: ${wsClient.reconnectAttempts})`);
    }
}, 5000);

// 如果需要主动关闭
// wsClient.close();