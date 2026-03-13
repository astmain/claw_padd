let tool = {}
tool._ = require("./lodash");
tool.dayjs =require("./dayjs.js")


//权限:申请截图
tool["is_requestScreenCapture"] = function () {
    if (!requestScreenCapture()) {
        let res = { isok: 0, msg: "失败:申请截图" };
        exit();
        return res
    } else {
        let res = { isok: 1, msg: "成功:申请截图" };
        return res
    }
}

//权限:申请悬浮窗
tool["is_permission_floaty"] = function () {
    if (!floaty.checkPermission()) {
        // 没有悬浮窗权限，提示用户并跳转请求
        toast("本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。");
        floaty.requestPermission();
        exit();
    } else {
        toastLog('已有悬浮窗权限');

    }
}










tool["window_set_handle"] = function window_set_handle(window) {
    ////原生悬浮窗体,可以拖动
    // window.setAdjustEnabled(true)

    //如果关闭窗口，应用退出,脚本停止
    window.exitOnClose();

    //初始化悬浮窗位置
    // window.setPosition(100, 10)

    //内容隐藏显示绑定 my_handle_close my_body
    window.my_handle_close.click(() => {
        if (window.my_handle_close.getText() == "true") {
            window.my_handle_close.setText("false");
            window.my_body.visibility = 8;//8显示
        }
        else {
            window.my_handle_close.setText("true");
            window.my_body.visibility = 0;//8显示
        }
    })

    // 悬浮窗句柄拖拽 绑定my_handle
    window.my_handle.setOnTouchListener((view, event) => {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                return true;
            case event.ACTION_MOVE:
                window.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) { }
                return true;
        }
        return true;
    });
}



tool["my_button"] = (function () {
    //继承ui.Widget
    util.extend(ColoredButton, ui.Widget);

    function ColoredButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("color", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;
            log("color:" + value);
            view.attr("backgroundTint", value);
        });
        //自定义属性onClick，定义被点击时执行的代码
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            this._onClick = value;
        });
        //自定义属性textSize，定义被点击时执行的代码
        // this.defineAttr("textSize", (view, name, defaultGetter) => {
        //     return this.textSize;
        // }, (view, name, value, defaultSetter) => {
        //     this._textSize = value;
        // });

    }
    ColoredButton.prototype.render = function () {
        return (
            <button textSize="10sp" padding="1" h="40" margin="0" style="Widget.AppCompat.Button.Colored" w="auto" />
        );
    }
    ColoredButton.prototype.onViewCreated = function (view) {
        view.on("click", () => {
            if (this._onClick) {
                eval(this._onClick);
            }
        });
    }
    ui.registerWidget("my_button", ColoredButton);
    return ColoredButton;
})()






tool.script_stop = function script_stop(params) {
    //停止脚本
    log("==============")
    arr = engines.all()
    log(arr)
    my = engines.myEngine()
    log(my)
    for (let i = 0; i < arr.length; i++) {
        ele = arr[i]
        if (my != arr[i]) {
            ele.forceStop()
            toastLog("停止脚本:" + ele.source + "");
        }
    }
}

tool.store = (() => {
    let store = storages.create("storage")
    store["set"] = store.put

    store["arr_init"] = function (key, arr_or_obj) {
        store.set(key, arr_or_obj)
        return store.get(key)
    }

    store["arr_push"] = function (key, obj) {
        let arr = store.get(key)
        if (arr) {
            arr.push(obj)
            store.set(key, arr)
        } else {
            store.set(key, [])
        }
        return store.get(key)
    }
    store["arr_get"] = (key) => store.get(key)

    return store
})()




tool.my_log = ((text) => {
    let store = storages.create("storage")
    if (text) {
        store.put("log", text)
        log(text)
        return text
    } else {
        let __text = store.get('log')
        log(__text)
        return __text
    }
});




tool.run_eval = function aaa(str_func) {
    log("1" + str_func)
    let aaa = threads.start(str_func)
    log(2, aaa)
    return aaa


    // threads.start((str_func) => {
    //     // home()
    //     // log(444)
    //     // sleep(1000 * 1)
    //     // log(555)
    //     let aaa = eval(`   (()=>{ 
    //         home();
    //         sleep(1000 * 1)
    //         log("666");
    //         click("抖音")
    //         return 777;})() ;       `)
    //     log(aaa)
    //     // click("抖音")
    //     // log(888, ui)
    // })
}







module.exports = tool;//回调


