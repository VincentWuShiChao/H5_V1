/**
 * Created by Administrator on 2018/5/21.
 */

var mysql=require('mysql');

//user数据库
var conn_pool=mysql.createPool({
    host:"172.26.14.117" ,
    port:3306,
    database:"h1v1_user",
    user:"root",
    password:"Zjw#19991223.."
});
//门服务数据库
var conn_pool_server_state=mysql.createPool({
    host:"172.26.14.117",
    port:3306,
    database:"h1v1_center",
    user:"root",
    password:"Zjw#19991223.."
});

//user数据库的执行语句
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
//门数据库的执行语句
function mysql_exce_server(sql,callback){
    conn_pool_server_state.getConnection(function (err,conn) {
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
//查询某服务器的信息（连接数）
exports.getServerByPort= function (port,callback) {

    var sql="select * from servers where port="+port;
    mysql_exce_server(sql, function (err,sql_result,fields_desic) {
        //console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};
//修改服务器的连接数(增加)
exports.addServerByPort= function (port,count,callback) {
    var sql="update servers set count="+count+" where port="+port;
    mysql_exce_server(sql, function (err,sql_result,fields_desic) {
        //console.log("sql_result:",sql_result);
        if(err){
            //console.log(err);
            callback(err,null);
        }
        callback(null,sql_result);
    })
};


//查询用户信息
exports.getUserData= function (data,callback) {

    var sql="select * from player where name=\'"+data+"\'";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        if(err){
            console.log(err);
            callback("没有该用户",null);
        }

        callback(null,sql_result);
    });
};
//获取排行榜
exports.getPlayerRank= function (callback) {

    var sql="select * from player order by integral desc";
    mysql_exce(sql, function (err,sql_result,fields_desic) {
        if(err){
            callback(err,null);
        }

        callback(null,sql_result);
    });
};
//更新胜利用户的积分以及场数
exports.updateIntegral_victory= function (name,integral,victory,games,callback) {
    var sql1=`update player set integral=${integral},universal="{\\\"victory\\\":${victory},\\\"games\\\":${games}}" where name="${name}"`;
    console.log(sql1);
   // var sql="update player set integral="+integral+",universal=json_set('{\"victory\":0,\"games\":0}','$.victory',"+victory+",'$.games',"+games+")"+" where name=\""+name+"\"";
    mysql_exce(sql1, function (err,sql_result,fields_desic) {
        if(err){
            callback(err,null);
        }
        callback(null,sql_result);
    });
};
//更新失败用户的积分以及场数
exports.updateIntegral_loser= function (name,integral,victory,games,callback) {
    var sql2=`update player set integral=${integral},universal="{\\\"victory\\\":${victory},\\\"games\\\":${games}}" where name="${name}"`;
    console.log(sql2);
    //var sql="update player set integral="+integral+",universal=json_set('{\"victory\":0,\"games\":0}','$.victory',"+victory+",'$.games',"+games+")"+" where name=\""+name+"\"";
    mysql_exce(sql2, function (err,sql_result,fields_desic) {
        console.log("^^^^^^^^^^^^^^^^^:",sql_result);
        if(err){
            callback(err,null);
        }
        callback(null,sql_result);
    });
};

exports.getWorldRank=function(callback){

	let sql=`select * from  player order by integral asc`;
	 mysql_exce(sql, function (err,sql_result,fields_desic) {
        console.log("^^^^^^^^^^^^^^^^^:",sql_result);
        if(err){
            callback(err,null);
        }else{
			callback(null,sql_result);
		}
    });

}

