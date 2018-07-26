/**
 * Created by Administrator on 2018/5/22.
 */
const CODINGTYPE="base64";//编码方式
var validTimes=60*1000*2-1000*20;//有效期
var username;
var safeCode;

//构造函数
var Token= function () {

};
/*Token.prototype.setName= function (name) {
    this.username=name;
};
Token.prototype.getName= function () {
    return this.username;
};*/
Token.prototype.getValidTimes= function () {
    return validTimes;
};
//编码
Token.prototype.createToken= function (data,callback) {
    data=data+"&time="+new Date().getTime();
    var buf=new Buffer(data);
    var token_string=buf.toString(CODINGTYPE);
    callback(null,token_string);
};
//解码
Token.prototype.decodeToken= function (data,callback) {
    var buf=new Buffer(data,CODINGTYPE);
    var decode_string=buf.toString();
    callback(null,decode_string);
};

exports.newToken=Token;