
"ui";
let tool = require("tool.js");
let my_ui = ui.layout(

    <vertical>

        <horizontal>
            <text text="ui线程问题" layout_weight="1"></text>
            <text text="*" id="my_text" ></text>
            <button gravity="right" w="100" h="auto" text="靠右" />
        </horizontal>

        <horizontal>
            <button id="测试1_dayjs" text="测试1_dayjs"></button>
            <button id="btn_2" text="btn_2"></button>
        </horizontal>


        <horizontal>
            <button id="子线程2_启动" text="子线程2_启动"></button>
            <button id="子线程2_关闭" text="子线程2_关闭"></button>
        </horizontal>


        <horizontal>
            <button id="测试3_设置全局变量" text="测试3_设置全局变量"></button>
            <button id="测试3_子线程得到变量" text="测试3_子线程得到变量"></button>
        </horizontal>


        <horizontal>
            <button id="测试4_单线程定时器" text="测试4_单线程定时器"></button>
            <button id="测试4_窗口信息" text="测试4_窗口信息"></button>
        </horizontal>



        <horizontal>
            <button id="测试5_发送广播" text="测试5_发送广播"></button>
            <button id="测试5_收到广播" text="测试5_收到广播"></button>
        </horizontal>


        <horizontal>
            <button id="测试6_修改文本" text="测试6_修改文本"></button>
            <button id="测试6_监听文本内容变化" text="测试6_监听文本内容变化"></button>

        </horizontal>



    </vertical>
)

ui.测试1_dayjs.click(function () {
    //  log(tool.dayjs)
    let date = tool.dayjs().format('YYYY-MM-DD HH:mm:ss')
    console.log(date)
})


ui.btn_2.click(function () {
    threads.start(() => {
        log("222")
        home()
        sleep(1000 * 2)
        click("抖音")
        log(eval(`
        (()=>{
           
            return 666
          })()
        
        `))
    })
})






let 子线程2 = null
ui.子线程2_启动.click(() => {
    //启动完后 其它程序继续运行
    子线程2 = threads.start(() => {
        //情况1 thread444.interrupt()  不可以停止
        // setInterval(() => {
        //     log(555,"setInterval")
        // }, 1000)
        //情况2 thread444.interrupt()  可以被停止
        while (true) {
            log(666, "while")
            sleep(1000)
        }
    })
})





ui.子线程2_关闭.click(() => {
    log("停止子线程2的运行")
    threads.shutDownAll()
    // if (子线程2) { 子线程2.interrupt() }
})



let 测试3_变量 = "我的"
let 测试3_线程 = null
let dayjs = require("dayjs")
ui.测试3_设置全局变量.click(() => {
    log(1, 测试3_变量)
    log(dayjs)
})


ui.测试3_子线程得到变量.click(() => {
    测试3_线程 = threads.start(() => {
        while (true) {
            log(666, "while", 测试3_变量)
            sleep(1000)
        }
    })
})

//教程      https://www.bilibili.com/video/BV1w44y157VE/?p=159
//文档      http://doc.autoxjs.com/#/timers?id=setimmediatecallback-args             clearInterval(id) clearTimeout(id)
ui.测试4_单线程定时器.click(() => {
    threads.start(() => {
        //这里的语句会在10秒后执行,而是不是1秒后执行==因为这个但是单线程的  threads
        let id1 = setTimeout(() => {
            toast("111,测试4_单线程定时器")
            log("111,测试4_单线程定时器")
        }, 1000)

        // threads.start(() => {
        //     setTimeout(() => {
        //         toast("222,测试4_单线程定时器")
        //         log("222,测试4_单线程定时器")
        //     }, 1000)
        // })

        log("id1", id1)
        sleep(9000)//sleep是主线程  setTimeout是接着我们的主线程去运行的
    })

});
ui.测试4_窗口信息.click(() => {
    // let wins = auto.windows
    // autojsx的窗口属性是空的
    let wins = auto.service
    log("1", auto.service)
    log("2", auto.windows)
    log("3", auto.root)
    log("4", auto.rootInActiveWindow)
    log("5", auto.windowRoots)
})



ui.测试5_发送广播.click(() => {
    let message = `小许:${tool.dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    // ui.my_text.setText(message)
    threads.start(() => {
        // events.broadcast.emit("hello", `小许:${tool.dayjs().formart('YYYY-MM-DD HH:mm:ss')}`);
        log("1发送完成", message)
        events.broadcast.emit("hello", message);

    })

});


let 测试5_监听线程 = null
ui.测试5_收到广播.click(() => {
    if (测试5_监听线程 == null) {
        log("测试5_监听线程-新建")
        测试5_监听线程 = threads.start(() => {
            events.broadcast.on("hello", function (name) {
                toast("你好, " + name);
                log("2收到信息", name)

                let message = `小许:${tool.dayjs().format('YYYY-MM-DD HH:mm:ss')}`
                ui.my_text.setText(message)
            });
            //保持脚本运行
            setInterval(() => { }, 1000);
        })
    } else {
        log("测试5_监听线程-已经存在了")
    }

});





ui.测试6_修改文本.click(() => {
    // setScreenMetrics(1080, 1920);
    // auto.registerEvent()
    log(auto.registerEvent)

})





ui.my_text.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function (s) {
        // log("afterTextChangedafterTextChanged")
        // console.log(`${1}>afterTextChanged=======:`, ui.my_text.getText())
    }
}));



var sb = new java.lang.StringBuffer();
sb.append("hi, mom");
sb.append(3);
sb.append(true);
print(sb);
log( typeof sb.toString())
log( typeof sb)
// openConsole();




sensors.ignoresUnsupportedSensor = true;
setInterval(() => {
    let message = `小许:${tool.dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    ui.my_text.setText(message)

    // var i = threads.atomic();
    // log("i", i)


    // JsBridge

}, 1000);