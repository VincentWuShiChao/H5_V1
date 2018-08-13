/**
 * Created by Administrator on 2018/5/21.
 */
var express=require('express');
var bodyParser=require('body-parser');
var mysql_user=require('../../database/mysql_user');
var url=require('url');
var qs=require('querystring');
var wxpay=require('../../utils/WxPay');



var app=express();
//路由中间件
app.use(express.static("../../public"));
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));


app.get("/user", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)['name'];
    var password=qs.parse(arg)['password'];
    mysql_user.getUserByName(name,password, function (err,data) {
        if(data.length==0){
            res.send("none");
        }else {
            res.send(JSON.stringify(data[0]));
        }
    });
});
//微信登录接口
app.get("/wxuser", function (req,res) {
    var arg=url.parse(req.url).query;
    var body=qs.parse(arg)['body'];
    console.log(body);
    mysql_user.getWxVerify(body, function (data) {
        res.send(data);//给中心服务器传送微信成功后的结果
    })
});
//管理员登录后台管理
app.get("/admin", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
    var password=qs.parse(arg)["password"];
    console.log("name:",name);
    console.log("password:",password);
    mysql_user.getUserByName(name,password, function (err,data) {
        if(data.length==0){
            res.send("none");
        }else {
            res.send(JSON.stringify(data[0]));
        }
    });
});
//查看用户是否第一次登录
app.get("/isFirstLogin", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
	 var openid=qs.parse(arg)["openid"];
    //解码，变成中文
    var buf=new Buffer(name,"hex");
    var decode_string=buf.toString();
    mysql_user.getPlayerByOpenid(openid, function (err,data) {
        if(err){
            console.log(err);
        }else {
            console.log("查询用户成功");
            if(data[0]==undefined){
                console.log("没有该用户");
                res.send("null");
            }else {
                console.log("有该用户data type:",typeof data);
				 console.log("有该用户data type:", data);
				 console.log("98:",name);
				 console.log("99:",data[0].name);
				if(data[0].name!=name){
					console.log("用户名发生改变，需要更新");
					mysql_user.updatePlayerName(openid,name,function(err,data){
						if(data.msg==1){
							console.log("更新成功");
							mysql_user.getPlayerByOpenid(openid, function (err,data) {
								res.send(data[0]);
								return;
							});
						}
					
					});
					
				}else{
					 res.send(data[0]);
					 return;
				}
                res.send(data[0]);
				return;
            }
        }
    });
});
//查看用户是否第一次登录(微信小游戏版本)
app.get("/isFirstLogin_1", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
    var openid=qs.parse(arg)["openid"];
  
	mysql_user.getPlayerByOpenid(openid, function (err,data) {
        if(err){
            console.log(err);
        }else {
            console.log("查询用户成功");
            if(data[0]==undefined){
                console.log("没有该用户");
                res.send("null");
				return;
            }else {
                console.log("有该用户data type:",typeof data);
				 console.log("有该用户data type:", data);
				 console.log("98:",name);
				 console.log("99:",data[0].name);
				if(data[0].name!=name){
					console.log("用户名发生改变，需要更新");
					mysql_user.updatePlayerName(openid,name,function(err,data){
						if(data.msg==1){
							console.log("更新成功");
							mysql_user.getPlayerByOpenid(openid, function (err,data) {
								res.send(data[0]);
								return;
							});
						}
					
					});
					
				}else{
					 res.send(data[0]);
					 return;
				}
                res.send(data[0]);
				return;
            }
        }
    });

});
//插入微信用户信息
app.get("/wxloginuser", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
    var type=qs.parse(arg)["type"];
	var headimgurl=qs.parse(arg)["headimgurl"];
    //解码，变成中文
    var buf=new Buffer(name,"hex");
    var decode_string=buf.toString();
	var openid=qs.parse(arg)["openid"];
    mysql_user.addPlayer(name,type, openid,headimgurl,function (err,data) {

        if(err){
            console.log("插入用户数据库失败");
        }else {
            console.log("插入用户数据库成功");
            res.send("哈哈哈哈哈哈成功了");

        }
    });
});
//插入微信用户信息(微信小游戏版本)
app.get("/wxloginuser_1", function (req,res) {
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
    var type=qs.parse(arg)["type"];
	var openid=qs.parse(arg)["openid"];
	var avatarUrl=qs.parse(arg)["avatarUrl"];
	console.log("user_server:130",openid);
    //解码，变成中文
    var buf=new Buffer(name,"hex");
    var decode_string=buf.toString();
    mysql_user.addPlayer(name,type,openid,avatarUrl,function (err,data) {

        if(err){
            console.log("插入用户数据库失败");
        }else {
            console.log("插入用户数据库成功");
            res.send("哈哈哈哈哈哈成功了");

        }
    });
});

/**
 * 充值类型：1：直充，直接付钱买；2：买钻石，再买商品
 * 商品类型：1：钻石；2：普通商品
 */
app.get("/wxpay", function (req,res) {
    var arg=url.parse(req.url).query;
    var message=qs.parse(arg)["message"];
    //解码，变成中文
    var buf=new Buffer(message,"hex");
    var decode_string=buf.toString();
    message=JSON.parse(decode_string);
    wxpay.order(message).then(function(data){
        console.log(data);//返回带签名的客户端支付信息，此时发送给客户端
    });
});
//微信回调返回的信息
app.get("/wxnotify", function (req,res) {
    var arg=url.parse(req.url).query;
    var content=qs.parse(arg)["content"];
    //解码，变成中文
    var buf=new Buffer(content,"hex");
    var decode_string=buf.toString();
    console.log(decode_string);//输出微信回调信息
    //如果正确则将信息更新到数据库,并返回给前端
    //wxpay.notify()//通过notify方法得到返回结果的正确性

});

app.listen(6001,"0.0.0.0", function () {
    console.log("user_server open success");
});