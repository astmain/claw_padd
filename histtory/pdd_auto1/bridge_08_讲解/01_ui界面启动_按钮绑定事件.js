"ui";
let tool = require("./tool")
ui.layout(

    <vertical class="垂直布局">
        <vertical>
            <button alpha="0.9" text="my_handle1" id="my_handle1" w="272" h="50"> </button>
        </vertical>

        <horizontal class="水平布局">
            <my_button text="my_handle2" onClick="my_handle2()" />
            <my_button text="my_handle3" onClick="my_handle3()" />
         

        </horizontal>
    </vertical>

)



ui.my_handle1.click(() => {
    threads.start(() => {
        home();
        sleep(1000 * 1)
        toastLog("home")

        click("抖音");
        sleep(1000 * 1);
        toastLog("抖音")

        click("首页");
        sleep(1000 * 2);
        toastLog("首页")
    })

    // threads.start(() => {
    // log("点击-home:" + home()); sleep(1000)
    // log("点击-抖音:" + click("抖音")); sleep(1000)
    // log("点击-首页:" + click("首页")); sleep(1000)
    // })



})
function my_handle2() {
    threads.start(() => {
        toastLog("点击-home:" + home()); sleep(1000 * 2)
        toastLog("点击-抖音:" + click("抖音")); sleep(1000 * 2)
        let ele = descContains("首页").findOne(1000 * 2)
        ele.click()
        toastLog("点击-首页")
    })
}
function my_handle3() {
    engines.execScriptFile("/sdcard/脚本/script_dou_yin.js");

}


