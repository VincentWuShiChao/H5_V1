/**
 * Created by Administrator on 2018/7/25.
 */
var express=require('express');
var router=express.Router();
var center_server=require('../servers/center_server/center_server.js');
var game_server=require('../servers/game_server/game_server.js');
/**
 * 接收客户端的参数格式为{tag:wxLogin;body:{}}
 */
router.post("/login",center_server.loginVerify);
router.post("/UserMsg",center_server.userMsg);
router.get('/order',center_server.order);//微信支付入口
router.post("/notify",center_server.notify);//微信回调通知
router.post("/LoginCode",center_server.LoginCode);//微信小游戏登录入口
router.get("/LoginCode",center_server.LoginCodeGet);//微信小游戏登录入口
router.post("/UserInfo",center_server.UserInfo);//微信小游戏用户信息
router.get("/UserInfo",center_server.UserInfoGet);//微信小游戏用户信息
router.get("/KeepLink",function(req,res){console.log("单机刷新状态");res.end()});
router.get("/GetWorldRank",center_server.getWorldRank);

//-------------------------------------------------------------------------------------------后台管理系统-------------------------------------------------------------------
router.get("/AdminLogin",center_server.showAdminLogin);
router.post("/operate_server",center_server.operate_server);
router.post("/getServerState",center_server.getServerState);//客户端连接游戏服务器前，需要提前发送短链接请求，使服务器动态分配空余的服务器，将其端口返回给客户端连接
router.post("/Verify",center_server.verify);
router.post("/Apply",center_server.apply);
router.post("/Apply_Register",center_server.apply_register);
router.get("/Home",center_server.home);
router.get("/login_record",center_server.login_record);
router.get("/register_record",center_server.register_record);
router.post("/GetCacheCenter_server",center_server.getCache);
router.post("/GetCacheGame_server",game_server.getCacheGame);
router.get("/Servers",center_server.getServers);
router.post("/react",center_server.react);
router.get("/edit_data",center_server.showEditData);
router.post("/showTable",center_server.showTable);
router.get("/editPlayerData",center_server.editPlayerData);
router.post("/editPlayerSubmit",center_server.editPlayerSubmit);



module.exports=router;