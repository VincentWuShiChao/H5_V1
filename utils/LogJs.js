/**
 * Created by Administrator on 2018/5/22.
 */
var log4js=require('log4js');
var fs=require('fs');



log4js_config={
    "appenders":{"log":{"type":"file","filename":"../logs/log.log",layout:{type:"messagePassThrough"}}
},
    "categories":
    {"default":{"appenders":["log"],"level":"ALL"}},

   /* pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'*///linux下安装pm2-intercom模块后，使用pm2开启服务器，即可成功写入日志文件，否则无法写入。
};


exports.setConfig= function (filename,tag,callback) {

    console.log("setConfig:",filename);
    if(tag=="login"){
        log4js_config.appenders[filename]={"type":"file","filename":"../logs/login/"+filename+".log",layout:{type:"messagePassThrough"}};
        log4js_config.categories[filename]={"appenders":[filename],"level":"ALL"};
        log4js.configure(log4js_config);
        callback(true);
    }
    if(tag=="register"){
        log4js_config.appenders[filename]={"type":"file","filename":"../logs/register/"+filename+".log",layout:{type:"messagePassThrough"}};
        log4js_config.categories[filename]={"appenders":[filename],"level":"ALL"};
        log4js.configure(log4js_config);
        callback(true);
    }
    if(tag=="game_server_cache"){
        log4js_config.appenders[filename]={"type":"file","filename":"../logs/cache/"+filename+".log",layout:{type:"messagePassThrough"}};
        log4js_config.categories[filename]={"appenders":[filename],"level":"ALL"};
        log4js.configure(log4js_config);
        callback(true);
    }


};
exports.useLogger= function (loggerName) {
    logger=log4js.getLogger(loggerName);
    return logger;
};
