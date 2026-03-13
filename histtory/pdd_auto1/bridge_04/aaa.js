//async函数写法
// let main = async function (s) {
//     var result = await Promise.resolve("value:" + s);
//     return result;
// }
//Generator 函数写法
let main = Promise.coroutine(function* (s) {
    var result = yield Promise.resolve("value:" + s);
    return result;
})

main('test').then(log)
