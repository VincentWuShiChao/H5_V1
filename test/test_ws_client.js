/**
 * Created by Administrator on 2018/5/22.
 */
var ws = require("ws");

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://localhost:1111");
sock.on("open", function () {
    console.log("connect success !!!!");
    sock.send('{"tag":1,"name":"wushichao","token":"","type":"1"}');
});

sock.on("error", function(err) {
    console.log("error: ", err);
});

sock.on("close", function() {
    console.log("close");
});

sock.on("message", function(data) {
    //console.log(data);
    let json_value=JSON.parse(data);

});
/*
let Person=require('./test').Person;

let person=new Person("hahah",12);
console.log(person.getAge());
*/

