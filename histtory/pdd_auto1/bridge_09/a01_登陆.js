var axios = require('axios');
var data = '{"username":"admin","password":"123456"}';

var config = {
  method: 'post',
  url: 'http://127.0.0.1:48080/admin-api/system/auth/login',
  headers: { 
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Language': 'zh-CN,zh;q=0.9', 
    'Connection': 'keep-alive', 
    'Content-Type': 'application/json;charset=UTF-8', 
    'Origin': 'http://127.0.0.1', 
    'Referer': 'http://127.0.0.1/', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'same-site', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"', 
    'tenant-id': '1'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
