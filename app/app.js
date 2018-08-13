/**
 * Created by Administrator on 2018/5/21.
 */
var express=require('express');
var bodyParser=require('body-parser');
var ipParse=require('../utils/IpParse');
var logger=require('../utils/LogJs');
var center_server=require('../servers/center_server/center_server.js');
var request=require('request');
var GlobalUrl=require('../utils/GlobalUrl');
var Date=require("../utils/Date");
var game_server=require('../servers/game_server/game_server.js');
var cluster=require('cluster');
var app=express();
var http=require("http");
var app1=express();

var ports=[6080,6081,6082,6083,6084];

app.set("view engine",'ejs');
//路由中间件
app.use(express.static("../public"));
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var router_main=require('../routers/main');
app.use("/",router_main);

http.createServer(app).listen(6000,"0.0.0.0", function () {
    /*let person=new Person("张三",22);
    console.log(person.getAge());*/
    /***********************************动态分配空闲游戏服务器*************************************/
    console.log("app success open");
	/*request({
        method: 'POST',
        url:GlobalUrl.GlobalUrl+":6000/getServerState"
        //form:{tag:'open',id:1,flag:true,port:6080}
    }, function(err, respose,body){
        //返回游戏服务器的所有状态
        var data=JSON.parse(respose.body);
        //console.log(data);
        var port=data.data.port;
        console.log(port);
        if(port!=0){
            request({
                method: 'POST',
                url:GlobalUrl.GlobalUrl+":6000/operate_server",
                form:{tag:'open',id:1,flag:true,port:port}
            }, function(err, respose,body){
                //游戏服务器返回的数值
                console.log(respose.body);
				console.log("listening");
            });
        }else {
            console.log("server full!");
        }

    });*/

	//game_server.open("localhost",6080);
	for(let i=0;i<ports.length;i++){
		game_server.open("localhost",ports[i]);
	}
	

});
process.on("exit", function () {
    console.log("process shutdown!");
    next();
});

function findBlankPostion(BLANK){

    blank=BLANK.blank;
    var has_blank=false;
    for(let j=0;j<BLANK.blank_list.length;j++){
        if(blank==BLANK.blank_list[j]){
            has_blank=true;
            break;
        }
    }
    if(has_blank){
        blank=Math.floor(Math.random()*11);
        BLANK.blank_list=findBlankPostion({blank:blank,blank_list:BLANK.blank_list});
        return BLANK.blank_list;
    }else {
        BLANK.blank_list.push(blank);
        return BLANK.blank_list;
    }
}


