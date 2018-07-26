/**
 * Created by Administrator on 2018/5/21.
 */

var logger=require('../../utils/LogJs');
var ipParse=require('../../utils/IpParse');
var net=require('net');
var request=require('request');

var lineReader=require('line-reader');
var t=require('../../utils/Token.js');
var TokenList=require('../../utils/TokenList');
var token=new t.newToken;
var tokenlist=new TokenList.Tokenlist();
var GlobalUrl=require('../../utils/GlobalUrl');
var url=require("url");
var qs=require('querystring');
var mysqlCenter=require('../../database/mysql_center');
var fs=require('fs');
var Q=require('q');
var gameServer=require('../game_server/game_server.js');
var DateTime=require('../../utils/Date');
var mysql_user=require('../../database/mysql_user');
var path=require('path');

var crypto=require("crypto");
let join=require('path').join;
//存放所有开启的服务器
var servers_list=[];

function header(res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Content-Type','text/html');
	return res;
}
/**
 * 开启游戏服务器
 */
function openGameServer(res,id){
    var gameServer=require('../game_server/game_server');
    gameServer.open(GlobalUrl.ip,6080);
    mysqlCenter.findServerById(id, function (err,data) {
        servers_list.push(data[0]);
    });
    mysqlCenter.updateServerStateOpen(id,function (err,data) {
        if(err){
            console.log("开启服务器失败");
        }
        res.send("1");
    });

    
}
/**
 * 关闭游戏服务器
 */
function closeGameServer(res,id){
    var gameServer=require('../game_server/game_server');
    gameServer.close();
    if(servers_list.indexOf(id)>=0){
        servers_list.splice(servers_list.indexOf(id),1);
    }
    mysqlCenter.updateServerStateClose(id,function (err,data) {
        if(err){
            console.log("关闭服务器失败");
        }
        res.send("0");
    });
}


/**
 * -----------------------------------------------------------------------------------------请求用户服务器----------------------------------------------------------------------------------------------------------------------
 */
function conn_user_server(router,json,callback){
    var config={
        method: 'get',
        url:GlobalUrl.GlobalUrl+":6001"+router+"?name="+json.name+"&password="+json.password
    };
    if(router=="/wxuser"){
        //console.log(json.body);
        config.url="https://api.weixin.qq.com/sns/auth?openid="+json.openid+"&access_token="+json.access_token;
    }
    if(router=="/admin"){
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?name="+json.name+"&password="+json.password;
    }
    //向数据库中保存用户信息
    if(router=="/wxloginuser"){
        //将中文进行编码
        let buf=new Buffer(json.body.nickname);
        let token_string=buf.toString("hex");
        let type=json.type;
        //console.log("wxloginUser:",token_string);
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?name="+token_string+"&type="+type;
    }
	//向数据库中保存用户信息(微信小游戏版本)
    if(router=="/wxloginuser_1"){
        //将中文进行编码
		console.log("101:",json);
        let buf=new Buffer(json.nickName);
        let token_string=buf.toString("hex");
        let type=1;
        let openid=json.openId;
        //console.log("wxloginUser:",token_string);
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?name="+token_string+"&type="+type+"&openid="+openid;
    }
    //查询用户是否为第一次登录游戏
    if(router=="/isFirstLogin"){
        let buf=new Buffer(json.body.nickname);
        let token_string=buf.toString("hex");
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?name="+token_string;
    }
 //查询用户是否为第一次登录游戏(微信小游戏版本)
    if(router=="/isFirstLogin_1"){
		console.log("115:",typeof json);
		console.log("116:",json);
        let buf=new Buffer(json.nickName);
        let token_string=buf.toString("hex");
        let openid=json.openId;
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?openid="+openid+"&name="+token_string;
    }
    //微信支付
    if(router=="/wxpay"){
        let buf=new Buffer(json);
        let token_string=buf.toString("hex");
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?message="+token_string;
    }
    //微信回调
    if(router=="/wxnotify"){
        let buf=new Buffer(json);
        let token_string=buf.toString("hex");
        config.url=GlobalUrl.GlobalUrl+":6001"+router+"?content="+token_string;
    }
    request(config, function(err, res, body){
        //用户服务器返回的数值
        callback(res.body);
    });
}
//------------------------------------------------------------------------------------判断用户是否为首次登录-------------------------------------------------------------------------------------------------------------------
function isFirstLogin_user(client_ip,result_json,callback){
    conn_user_server("/isFirstLogin",result_json, function (result_data) {
        if(result_data=="null"){
            conn_user_server("/wxloginuser",result_json, function (data) {
                var buf=new Buffer(result_json.body.nickname);
                var buf_name=buf.toString("hex");
                console.log("buf_name:",buf_name);
                mysql_user.getPlayerByName(buf_name, function (err,data_name) {
                    logger.setConfig(DateTime.getDate().toString()+"_register","register", function (data_1) {
                        var buf=new Buffer(data_name[0].name,"hex");
                        var decode_string=buf.toString();
                        data_name[0].name=decode_string;
                        data_name[0].registerTime=new Date().getHours()+":"+new Date().getMinutes();
                        data_name[0].ipAddr=ipParse.parse_ip(client_ip);
                        logger.useLogger(DateTime.getDate().toString()+"_register").info(JSON.stringify(data_name[0]));
                    });
                });
                conn_user_server("/isFirstLogin",result_json, function (result_data) {
                   callback(result_data);
                });
            });
        }else {
            callback(result_data);
        }
    });
}
//------------------------------------------------------------------------------------判断用户是否为首次登录(微信小游戏版)-------------------------------------------------------------------------------------------------------------------
function isFirstLogin_user_1(client_ip,result_json,callback){
    conn_user_server("/isFirstLogin_1",result_json, function (result_data) {
        if(result_data=="null"){
            conn_user_server("/wxloginuser_1",result_json, function (data) {
                var buf=new Buffer(result_json.nickName);
                var buf_name=buf.toString("hex");
                console.log("buf_name:",buf_name);
                mysql_user.getPlayerByName(buf_name, function (err,data_name) {
					console.log("177:",data_name);
                    logger.setConfig(DateTime.getDate().toString()+"_register","register", function (data_1) {
                        var buf=new Buffer(data_name[0].name,"hex");
                        var decode_string=buf.toString();
                        data_name[0].name=decode_string;
                        data_name[0].registerTime=new Date().getHours()+":"+new Date().getMinutes();
                        data_name[0].ipAddr=ipParse.parse_ip(client_ip);
                        logger.useLogger(DateTime.getDate().toString()+"_register").info(JSON.stringify(data_name[0]));
                    });
                });
                conn_user_server("/isFirstLogin_1",result_json, function (result_data) {
                   callback(result_data);
                });
            });
        }else {
            callback(result_data);
        }
    });
}
/**
 * 用户传来的信息类型为：{"tag":login;"name":;"password":;}
 * @param req
 * @param res
 */
//--------------------------------------------------------------------------------------------客户端登录验证------------------------------------------------------------------------
exports.loginVerify=function (req,res){
    console.log("loginVerify:",new Date().getTime());
    var client_ip=req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
	console.log(client_ip);
    var result_client=req.body;
    let result_msg={};
    for(var key in result_client){
        result_msg=key;
    }
    let result_json=JSON.parse(result_msg);
    //console.log(JSON.parse(result_msg));
    res=header(res);
    //--------------------游客登录----------------------
    if(result_json.tag=="touristLogin"){
        conn_user_server("/user",result_msg.body,function (data) {
            console.log("data:",data);
            var result={
                tag:"ok",
                data:data,
                token:""
            };
            if(data!="none"){
                /*此行可从mysql_center中获取所有的服务器信息返回给客户端*/
                token.createToken(result_client, function (err,result_token) {
                    console.log("编码后的用户数据:",result_token);
                    result.token=result_token;
                    var json_token={
                        "validTimes":token.getValidTimes(),
                        "safeCode":result_token
                    };
                    tokenlist.setToken(json_token);
                    gameServer.setTokenList(tokenlist);//将用户信息token传给游戏服务器
                    //登录成功后，打开游戏服务器
                    request({
                        method: 'POST',
                        url:GlobalUrl.GlobalUrl+":6000/operate_server",
                        form:{tag:'open'}
                    }, function(err, respose,body){
                        //游戏服务器返回的数值
                        console.log(respose.body);
                        res.send(JSON.stringify(result));
                    });

                })
            }else {
                result.tag="error";
                res.send(JSON.stringify(result));

            }
        })
    }
    //--------------------------------------微信登录----------------------
    /**
     * 接收客户端的格式为{tag:wxLogin;body:{}}
     */

    if(result_json.tag=="wxLogin"){
        conn_user_server("/wxuser",result_json.body,function (data) {
            //console.log(data);
            let result={
                result:"ok",
                msg:"getUser",
                data:""
            };
            console.log("getUser:",new Date().getTime());
            res.send(JSON.stringify(result));
        });
    }
};
//------------------------------------------------接收用户登录成功并且验证成功后传过来的用户信息-----------------------------------------------
exports.userMsg= function (req,res) {
    console.log("userMsg");
    var client_ip=req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
    var result_client=req.body;
    var result_msg="";
    var has_token_msg="";
    for(var key in result_client) {
        result_msg = key;
    }
    let result_json=JSON.parse(result_msg+"\"\"}}");
    res=header(res);
    var has_user=false;
    console.log("nickname:",result_json.body);
    for(let i=0;i<tokenlist.getTokenList().length;i++){
        if(tokenlist.getTokenList()[i].username==result_json.body.nickname){
            has_user=true;
            has_token_msg=tokenlist.getTokenList()[i].safeCode;
            break;
        }
    }
    if(has_user==false){
        console.log("用户第一次登录该游戏");
        token.createToken(result_json, function (err,result_token) {
            //result.token=result_token;
            var json_token={
                "username":result_json.body.nickname,
                "validTimes":token.getValidTimes(),
                "safeCode":result_token,
				"oldTime":(new Date()).getTime()//7_19
            };
            tokenlist.setToken(json_token);
            gameServer.setTokenList(tokenlist);//将用户信息token传给游戏服务器
            //判断用户是否为首次登录
            isFirstLogin_user(client_ip,result_json, function (data) {

                var result_data=JSON.parse(data);
                var buf_name=new Buffer(result_data.name,"hex");
                var decode_name=buf_name.toString();
                result_data.name=decode_name;
                data=JSON.stringify(result_data);


                let result={
                    result:"ok",
                    msg:"userMsg",
                    data:data,
                    token:result_token
                };
				console.log("给用户发送userMsg");
                res.send(JSON.stringify(result));
                logger.setConfig(DateTime.getDate().toString()+"_login","login", function (data_1) {
                    console.log(data);
                    data=JSON.parse(data);
                    data.loginTime=new Date().getHours()+":"+new Date().getMinutes();
                    data.ipAddr=ipParse.parse_ip(client_ip);
                    logger.useLogger(DateTime.getDate().toString()+"_login").info(JSON.stringify(data));
                });
            });
        });
    }else {
        console.log("此人的token存在");
        //判断用户是否为首次登录
        isFirstLogin_user(client_ip,result_json, function (data) {

            var result_data=JSON.parse(data);
            var buf_name=new Buffer(result_data.name,"hex");
            var decode_name=buf_name.toString();
            result_data.name=decode_name;
            data=JSON.stringify(result_data);

            let result={
                result:"ok",
                msg:"userMsg",
                data:data,
                token:has_token_msg
            };
            res.send(JSON.stringify(result));
            logger.setConfig(DateTime.getDate().toString()+"_login","login", function (data_1) {
                console.log(data);
                data=JSON.parse(data);
                data.loginTime=new Date().getHours()+":"+new Date().getMinutes();
                data.ipAddr=ipParse.parse_ip(client_ip);
                logger.useLogger(DateTime.getDate().toString()+"_login").info(JSON.stringify(data));
            });
        });
    }

};
var aeskey="";
var iv="";
var session_key="";
var appid="";
const sha1 = require("sha1");
var WXBizDataCrypt=require("../../utils/WXBizDataCrypt")
//微信小游戏登录入口
exports.LoginCode= function (req,res) {
	console.log("微信小游戏登录入口：",req.body);  //{ errMsg: 'login:ok', code: '023AnbQM1wOAK41shtNM1amcQM1AnbQg' }
	let code=req.body.code;
	console.log("code:",code);
	appid=req.body.appid;
	let secret=req.body.secret;
	/*request({
			method:"get",
			url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code"
		},function(err,res2,body){
			console.log("微信返回的用户信息：",res2.body);
		});*/
	 request({
		method: 'get',
        url:"https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code"
	 }, function(err, res1, body){
        //用户服务器返回的数值
        console.log("微信返回的信息：",res1.body);
		 let result={
                result:"ok",
          };
		console.log("session_key:",JSON.parse(res1.body).session_key);
		session_key=JSON.parse(res1.body).session_key;
		result.result="ok";
		result.msg="sessionKey";
		result.data=session_key;
		res.send(JSON.stringify(result));
		
    });
};
//微信小游戏用户信息
exports.UserInfo=function(req,res){
	let signature2 = sha1(req.body.rawData + session_key);
    if (req.body.signature != signature2) return res.json("数据签名校验失败");
    // 解密
    let pc = new WXBizDataCrypt(appid, session_key)
    let data = pc.decryptData(req.body.encryptedData,req.body. iv)
    console.log('解密后用户信息: ', data);
	 console.log('解密后用户信息类型: ', typeof data);
	
	var client_ip=req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
	res=header(res);
    var has_user=false;
    for(let i=0;i<tokenlist.getTokenList().length;i++){
        if(tokenlist.getTokenList()[i].username==data.nickName){
            has_user=true;
            has_token_msg=tokenlist.getTokenList()[i].safeCode;
            break;
        }
    }
    if(has_user==false){
        console.log("用户第一次登录该游戏");
        token.createToken(data, function (err,result_token) {
            //result.token=result_token;
            var json_token={
                "username":data.nickName,
                "validTimes":token.getValidTimes(),
                "safeCode":result_token,
				"oldTime":(new Date()).getTime()//7_19
            };
            tokenlist.setToken(json_token);
            gameServer.setTokenList(tokenlist);//将用户信息token传给游戏服务器
            //判断用户是否为首次登录
            isFirstLogin_user_1(client_ip,data, function (data) {

                var result_data=JSON.parse(data);
                var buf_name=new Buffer(result_data.name,"hex");
                var decode_name=buf_name.toString();
                result_data.name=decode_name;
                data=JSON.stringify(result_data);


                let result={
                    result:"ok",
                    msg:"userMsg_1",
                    data:data,
                    token:result_token
                };
				console.log("给用户发送userMsg");
                res.send(JSON.stringify(result));
                logger.setConfig(DateTime.getDate().toString()+"_login","login", function (data_1) {
                    console.log(data);
                    data=JSON.parse(data);
                    data.loginTime=new Date().getHours()+":"+new Date().getMinutes();
                    data.ipAddr=ipParse.parse_ip(client_ip);
                    logger.useLogger(DateTime.getDate().toString()+"_login").info(JSON.stringify(data));
                });
            });
        });
    }else {
        console.log("此人的token存在");
        //判断用户是否为首次登录
        isFirstLogin_user_1(client_ip,data, function (data) {

            var result_data=JSON.parse(data);
            var buf_name=new Buffer(result_data.name,"hex");
            var decode_name=buf_name.toString();
            result_data.name=decode_name;
            data=JSON.stringify(result_data);

            let result={
                result:"ok",
                msg:"userMsg_1",
                data:data,
                token:has_token_msg
            };
            res.send(JSON.stringify(result));
            logger.setConfig(DateTime.getDate().toString()+"_login","login", function (data_1) {
                console.log(data);
                data=JSON.parse(data);
                data.loginTime=new Date().getHours()+":"+new Date().getMinutes();
                data.ipAddr=ipParse.parse_ip(client_ip);
                logger.useLogger(DateTime.getDate().toString()+"_login").info(JSON.stringify(data));
            });
        });
    }
}

//-------------------------------------------------------------------------------获取服务器状态，分配空闲的游戏服务器-----------------------------------------------------------------
exports.getServerState= function (req,res) {

  mysqlCenter.findAllServer(function(err,result_server){
      let hasFree=false;
      let result={};
      console.log(result_server);
      for(let i=0;i<result_server.length;i++){
          //console.log(result_server[i].count);
          if(result_server[i].count<=2000&&result_server[i].state==1){
              result.data={port:result_server[i].port,count:result_server[i].count,state:result_server[i].state};
              hasFree=true;
              res.send(JSON.stringify(result));
              break;
          }
      }
      if(hasFree==false){
          result.data={port:0,count:0,state:0};
          res.send(JSON.stringify(result));
      }
  });
};
exports.react= function (req,res) {

    console.log(req.body);
    console.log(req.url);
    //console.log(req);

    console.log("react执行了==============================================1");
    res.send({"name":"hahah"});
    console.log("react执行了==============================================2");
};
//-------------------------------------------------------------------------管理游戏服务器的开关------------------------------------------------------------------------
exports.operate_server= function (req,res) {
    console.log("进入开启游戏服务器函数");
    var client_ip=req.connection.remoteAddress;
    var result_client=req.body;
    /**
     * 开启游戏服务器
     */
    if(result_client.tag=="open"&&result_client.flag=="false"){//后台管理开启游戏服务器
        openGameServer(res,result_client.id);
    }else if (result_client.tag=="open"&&result_client.flag=="true"){//通过app开启游戏服务器
        var gameServer=require('../game_server/game_server');
        gameServer.open(GlobalUrl.ip,result_client.port);
        mysqlCenter.findServerById(result_client.id, function (err,data) {
            console.log("-----------------------",data[0]);
            servers_list.push(data[0]);
        });
        mysqlCenter.updateServerStateOpen(result_client.id, function (err, data) {
            if (err) {
                console.log("开启服务器失败");
            }
            res.send("app开启的游戏服务器");
        });

    }
    /**
     * 关闭游戏服务器
     */
    if(result_client.tag=="close"){
        console.log("tag为close");
        closeGameServer(res,result_client.id);
    }
};
var adminUser={name:null,password:null};
//--------------------------------------------------------------------------后台管理界面的登录界面----------------------------------------------------------------------
exports.showAdminLogin= function (req,res) {
	console.log("has user  login");
	console.log(req.query);
    if(adminUser.name){
        adminUser={};
    }
	res=header(res);
    return res.render("../../views/login_admin.ejs",{state:0});
	
	//res.send("哈哈哈");
};

//--------------------------------------------------------------------------后台管理系统获取服务器的数据---------------------------------------------------------------
exports.getServers= function (req,res) {
	res=header(res);
    if(adminUser.name){
        mysqlCenter.findAllServer(function(err,result_server){
            console.log(result_server);
            res.render("../../views/gallery.ejs",{name:adminUser.name,servers:result_server});
        });
    }else {
        return res.render("../../views/login_admin.ejs");
    }

};

//---------------------------------------------------------后台管理系统用户名和密码验证---------------------------------------------------------------------

exports.verify= function (req,res) {
    console.log("center_server.js verify");
    var result_client=req.body;
    console.log("admin login:",result_client);
    var name=result_client.name;
    var password=result_client.password;
    console.log("admin name:",name);
    console.log("password:",password);
    conn_user_server("/admin",{name:name,password:password}, function (data) {
        console.log(data);
        if(data=="none"){
            return res.json({msg:"用户名或者密码不正确"});
        }else {
            adminUser.name=name;
            return res.json({msg:1});

        }
    })
    /*var arg=url.parse(req.url).query;
    var name=qs.parse(arg)['name'];
    var password=qs.parse(arg)['password'];
    conn_user_server("/admin",{name:name,password:password}, function (data) {
        console.log(data);
        if(data=="none"){
            return res.json({msg:"用户名或者密码不正确"});
        }else {
            return res.json({msg:1});
        }

    })*/
};

//--------------------------------------------------------后台管理系统的首页----------------------------------------------------------------------
exports.home= function (req,res) {
	res=header(res);
    var arg=url.parse(req.url).query;
    var name=qs.parse(arg)["name"];
    if(adminUser.name){
        res.render("../../views/index",{name:adminUser.name});
    }else{
        res.render("../../views/login_admin");
    }
    /*mysqlCenter.findAllServer(function (err,data) {
        console.log(data);
        console.log(getFileList("../logs/"));
        return res.render("../../views/home",{name:name,servers_list:data,logs_list:getFileList("../logs/")});
    });*/

};
//注册记录
exports.register_record= function (req,res) {
	res=header(res);
    if(adminUser.name){
        var files=getFileList("../logs/register/");
        var fileNames=[];
        for(let i=0;i<files.length;i++){
            fileNames.push(files[i].filename);
        }
        res.render("../../views/register_record",{name:adminUser.name,logs:fileNames});
    }else {
        res.render("../../views/login_admin");
    }
};
//------------------------------------------------------注册记录表的信息---------------------------------------------------------------------------
exports.apply_register= function (req,res) {
	res=header(res);
    if(adminUser.name){
        var client_data=req.body;
        if(client_data.text=="日志目录"){
            res.send({});
        }else{
            var list=[];
            lineReader.eachLine(path.join("../logs/register",client_data.text), function (line,last) {
                //console.log(typeof line);
                list.push(JSON.parse(line));
                if(last){
                    console.log("i am done");
                    //console.log(list);
                    res.send({logs_list:list});
                }
            });
        }
    }else{
        res.render("../../views/login_admin");
    }

};
//------------------------------------------------------登录记录界面（并显示所有的登录日志列表）----------------------------------------------------
//登录记录
exports.login_record= function (req,res) {
	res=header(res);

    if(adminUser.name){
        var files=getFileList("../logs/login/");
        var fileNames=[];
        for(let i=0;i<files.length;i++){
            fileNames.push(files[i].filename);
        }
        res.render("../../views/login_record",{name:adminUser.name,logs:fileNames});
    }else {
        res.render("../../views/login_admin");
    }

};
exports.showEditData= function (req,res) {
    res=header(res);
    if(adminUser.name){
        res.render("../../views/edit_data",{name:adminUser.name});//7_20
    }else {
        res.render("../../views/login_admin");
    }

};
exports.showTable= function (req,res) {
    res=header(res);
    if(adminUser.name){
        var client_data=req.body;
        console.log("showTable type:",client_data);
        if(client_data.text=="数据库表结构"){
            res.send({})
        }else{
            let table_name=client_data.text;
            if(table_name=="player"){
                mysql_user.getAllPlayer(function (err,all_data) {
                    console.log(all_data);
                    res.send({playerList:all_data});//7_20
                });
            }


        }
    }else{
        res.render("../../views/login_admin");
    }
};
exports.editPlayerData= function (req,res) {
    res=header(res);
    if(adminUser.name){
        var client_data=req.query;
        let pid=client_data["pid"];
        console.log("pid;",pid);
        console.log(typeof pid);
        mysql_user.getPlayerByPid(parseInt(pid), function (err,data) {
            if(err){
                res.send({player:[]});
            }else {
                console.log(data);
                res.render("../../views/edit_player",{name:adminUser.name,player:data});
            }

        })
    }else{
        res.render("../../views/login_admin");
    }
};
//修改数据库信息
exports.editPlayerSubmit= function (req,res) {
    res=header(res);
    if(adminUser.name){
        var client_data=req.body;
        console.log("client data:",client_data);
        var pid=parseInt(client_data.pid);
        var name=client_data.name;
        var integral=parseInt(client_data.integral);
        var universal=client_data.universal;
        var time=client_data.time;
        var logintype=parseInt(client_data.logintype);
        var level=parseInt(client_data.level);
        var exper=parseInt(client_data.exper);
        mysql_user.updatePlayer(pid,name,integral,universal,time,logintype,level,exper, function (err,msg) {
            res.send({msg:msg.msg});
        });
    }else{
        res.render("../../views/login_admin");
    }
}
//------------------------------------------------------登录记录表的信息---------------------------------------------------------------------------
exports.apply= function (req,res) {
	res=header(res);
    if(adminUser.name){
        var client_data=req.body;
        console.log("apply type:",typeof client_data);
        if(client_data.text=="日志目录"){
            res.send({})
        }else{
            var list=[];
            lineReader.eachLine(path.join("../logs/login",client_data.text), function (line,last) {
                //console.log(typeof line);
                list.push(JSON.parse(line));
                if(last){
                    console.log("i am done");
                    //console.log(list);
                    hander(list);
                }
            });
            var table=[];
            function hander(list) {
                //console.log(list);

                list.forEach(function (each) {
                    var tag = false;
                    var u_tag;
                    for (var i = 0; i < table.length; i++) {
                        if (each.name == table[i].name) {
                            tag = true;
                            u_tag = i;
                            break;
                        }
                    }
                    if (tag == false) {
                        each.count = 1;
                        table.push(each);
                    } else {
                        table[u_tag].count += 1;
                    }
                });
                console.log("table msg:",table);
                res.send({logs_list:table});
            }
        }
    }else{
        res.render("../../views/login_admin");
    }

};

//获取文件夹下的所有文件
function getFileList(path) {
    var filesList = [];
    readFileList(path, filesList);
    return filesList;
}
function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = 'H5_server/logs/';//路径
            obj.filename = itm;//名字
            filesList.push(obj);
        }
    })
}
exports.getCache= function (req,res) {
    result_list={
        servers_list:servers_list
    };
    //将缓存数据主动加入的文件中保存
    logger.setConfig("center_game_cache", function () {
        logger_1=logger.useLogger("center_game_cache");
        logger_1.info(JSON.stringify(result_list));
    });
    return res.send(result_list);
};

//-----------------------------------------------------微信支付入口---------------------------------------------
exports.order= function (req,res,next) {
    var attach = "1276687601";
    var body = "测试支付";
    var mch_id = "1111111"; //商户ID
    var openid = "111111";
    var bookingNo = "201501806125346"; //订单号
    var total_fee = 10;
    var notify_url = "http://localhost/wxpay/notify"; //通知地址
    var message={attach:attach,body:body,mch_id:mch_id,openid:openid,bookingNo:bookingNo,total_fee:total_fee,
    notify_url:notify_url};
    conn_user_server("/wxpay",message,function (data) {
        //console.log(data);
       /* let result={
            result:"ok",
            msg:"getUser",
            data:""
        };
        console.log("getUser:",new Date().getTime());
        res.send(JSON.stringify(result));*/
    });
};

exports.notify= function (req,res,next) {
    var content="";
    req.on("data", function (chunk) {
        content+=chunk;
    });
    req.on("end", function () {
        console.log(content);//采用数据流形式读取微信返回的xml数据
        conn_user_server("/wxnotify",content,function (data) {
            //console.log(data);
            /*let result={
                result:"ok",
                msg:"getUser",
                data:""
            };
            console.log("getUser:",new Date().getTime());
            res.send(JSON.stringify(result));*/
        });
    })
};


