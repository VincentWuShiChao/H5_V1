/**
 * Created by Administrator on 2018/5/21.
 */
//门服务器 存放游戏服务器信息
var mysql=require('mysql');

var conn_pool=mysql.createPool({
    host:"127.0.0.1" ,
    port:3306,
    database:"mysql_center",
    user:"root",
    password:"03251222yxn"
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
//发现所有的服务器状态
exports.findAllServer= function (callback) {
    var sql="select * from servers";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//查找单个服务器的状态
exports.findServerById= function (id,callback) {
    var sql="select * from servers where id="+id;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        //console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
}


exports.updateServerStateOpen= function (id,callback) {
    var sql="update servers set state=1 where id="+id;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        //console.log("opensql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
exports.updateServerStateClose= function (id,callback) {
    var sql="update servers set state=0 where id="+id;
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("close_sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};




