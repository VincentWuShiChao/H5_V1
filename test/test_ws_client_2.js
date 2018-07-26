/**
 * Created by Administrator on 2018/5/22.
 */
var ws = require("ws");

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://192.168.1.70:6080");
sock.on("open", function () {
    console.log("connect success !!!!");
    sock.send('{"tag":2,"name":"lichengkun","token":""}');
});

sock.on("error", function(err) {
    console.log("error: ", err);
});

sock.on("close", function() {
    console.log("close");
});

sock.on("message", function(data) {
    //console.log(data);

    json_value=JSON.parse(data);
    if(json_value.msg=="linkSuccess"){
        sock.send('{"tag":0,"name":"lichengkun","token":"","integral":1600,"type":1}');
    }else if(json_value.msg=="result"){

    }else if(json_value.msg=="result_score"){
        console.log("对战结果：",data);
    }else if(json_value.msg=="initMap"){
        console.log("另一个人的初始地图：",data);
    }else  {
        if(json_value.data.state==0){
            console.log("匹配中。。。。。。。");

        }else {
            console.log("匹配完成");
            sock.send('{"tag":8,"name":"lichengkun","token":"","integral":2580,map:{row:12,col:6}}');
        }
    }

});