/**
 * Created by Administrator on 2018/5/22.
 */
var ws = require("ws");

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://127.0.0.1:6080");
sock.on("open", function () {
    console.log("connect success !!!!");
    sock.send('{"tag":2,"name":"zhujiawei","token":""}');
});

sock.on("error", function(err) {
    console.log("error: ", err);
});

sock.on("close", function() {
    console.log("close");
});

sock.on("message", function(data) {
    console.log(data);
    if(data=="success"){
        sock.send('{"tag":4,"name":"zhujiawei","token":"","integral":2100}');
    }
});