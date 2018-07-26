/**
 * Created by Administrator on 2018/5/22.
 */
//ip地址解析
var libqqwry=require("lib-qqwry");
var qqwry=libqqwry.init();
qqwry.speed();
exports.parse_ip= function (ipAddr) {
    var ipL=qqwry.searchIP(ipAddr);
    return ipL;
};