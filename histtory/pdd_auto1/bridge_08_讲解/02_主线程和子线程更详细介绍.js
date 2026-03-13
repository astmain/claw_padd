"ui";

ui.layout(
    <vertical>
        <button alpha="0.9" text="my_handle1" id="my_handle1" w="272" h="50"> </button>
    </vertical>)






ui.my_handle1.click(() => {
    console.log('1====',)
    toast(111)
    // sleep(2000)//时间暂停

    //// 错误演示代码1
    // setInterval(() => {
    //     sleep(2000)//时间暂停
    //     toastLog(222, 333)
    // },1000)



    //// 错误演示代码1
    // setTimeout(() => {
    //     sleep(2000)//时间暂停
    //     toastLog(222, 333)
    // }, 1000)


    //// 错误演示代码1
    // while (true){
    //     sleep(2000)//时间暂停
    //     toastLog(222, 333)
    // }



    // threads.start(() => {
    //     setInterval(() => {
    //         sleep(2000)//时间暂停
    //         toastLog(222, 333)
    //     }, 2000)
    // })






})


