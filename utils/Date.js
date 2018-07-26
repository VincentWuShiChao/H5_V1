/**
 * Created by Administrator on 2018/6/3.
 */

exports.getDate= function () {
    var year=new Date().getFullYear();
    var month=new Date().getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var date=new Date().getDate();
    if(date<10){
        date="0"+date;
    }
    return year+month+date;
};