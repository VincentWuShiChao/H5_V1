/**
 * Created by Administrator on 2018/5/22.
 */
var mysql=require('mysql');

var Date=require("../utils/Date");
var conn_pool=mysql.createPool({
    host:"127.0.0.1" ,
    port:3306,
    database:"mysql_user",
    user:"root",
    password:"0325122yxn"
});
function mysql_exce(sql,callback){
    conn_pool.getConnection(function (err,conn) {
        if(err){
            if(callback){
                callback(err,null,null);
            }
            return;
        }
        conn.query(sql, function (sql_err,sql_result,fields_desic) {
            if(sql_err){
                if(callback){
                    callback(sql_err,null,null);
                    conn.release();
                }
                return;
            }
            if(callback){
                callback(null,sql_result,fields_desic);
                conn.release();
            }
        });

    });
}

//根据用户名获取用户信息
exports.getUserByName= function (name,password,callback) {
    console.log("mysql_user.js/getUserByName");
    var sql="select * from user where name=\""+name+"\" and password=\""+password+"\"";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//根据用户名获取用户信息
exports.getPlayerByName= function (name,callback) {
    console.log("mysql_user.js/getUserByName");
    var sql="select * from player where name=\""+name+"\"";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//根据用户名获取用户信息(微信小游戏版本)
exports.getPlayerByOpenid= function (openid,callback) {
    console.log("mysql_user.js/getUserByOpenid");
    var sql="select * from player where openid=\""+openid+"\"";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//用户第一次微信登录，将用户信息保存到数据库
exports.addPlayer= function (name,type,openid,callback) {
	console.log("mysql_user:81",openid);
    let time=Date.getDate();
    var sql="insert into player(openid,name,integral,universal,time,logintype) values(\""+openid+"\",\""+name+"\",0,"+"\'{\"games\": 0, \"victory\": 0}\',\""+time+"\","+type+")";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        if(err){
            //console.log(err);
            callback(err,null);
			console.log("mysql_user:88",err);
        }
        callback(null,sql_result);
    });

};

//获取所有玩家的所有数据
exports.getAllPlayer= function (callback) {
    var sql="select * from player";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//根据用户的pid获取信息
exports.getPlayerByPid= function (pid,callback) {
    var sql="select * from player where pid="+pid;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};

//修改用户的信息
exports.updatePlayer= function (pid,name,integral,universal,time,logintype,level,exper,callback) {
    console.log("universal:",universal);
    console.log((JSON.parse(universal)).victory);
    universal=JSON.parse(universal);
    console.log("pid:",pid);
    //var sql="update player set name=\""+name+"\",integral="+integral+",universal=\"\""+universal+"\"\",time=\""+time+"\",logintype="+logintype+",level="+level+",exper="+exper+" where pid="+pid;
    var sql=`update player set name="${name}",universal="{\\\"victory\\\":${universal.victory},\\\"games\\\":${universal.games}}",integral=${integral},time=${time},logintype=${logintype},level=${level},exper=${exper} where pid=${pid}`;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,{msg:1});
    });
};
//修改用户的信息(微信小游戏版本)
exports.updatePlayerName= function (openid,name,callback) {
    //var sql="update player set name=\""+name+"\",integral="+integral+",universal=\"\""+universal+"\"\",time=\""+time+"\",logintype="+logintype+",level="+level+",exper="+exper+" where pid="+pid;
    var sql=`update player set name="${name}" where openid="${openid}"`;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            console.log(err);
            callback(err,null);
        }
        callback(null,{msg:1});
    });
};
