/**
 * Created by Administrator on 2018/5/22.
 */
/*
var TokenList=require('../utils/TokenList');
var tokenlist=new TokenList.Tokenlist();

console.log(tokenlist.getTokenList());*/

/*var rise=2;
var all_list=[];
var white_list=[];
for(let i=0;i<10;i++){
    all_list.push(i);
}*/
/*-------------------------------------一次性多行-----------------------------------------*/
//var temp_list=[];
/*for(let i=0;i<rise;i++){
    var index=Math.floor(Math.random()*(all_list.length));
    console.log("index:",index);
    white_list.push(all_list[index]);
    all_list.splice(index,1);
    temp_list.push(all_list);
    all_list=[];
    for(let i=0;i<10;i++){
        all_list.push(i);
    }
}
var array_map=[];
for(let i=0;i<temp_list.length;i++){

    array_map.push({row:i,col:white_list[i],color:"0"});

    for(let j=0;j<temp_list[i].length;j++){
        var colors=["1","2","3"];
        let index_color=Math.floor(Math.random()*(colors.length));
        array_map.push({row:i,col:temp_list[i][j],color:colors[index_color]});
    }
}
console.log(array_map);*/
//console.log(white_list);
/*console.log(temp_list);
console.log(array_map);*/
/*------------------------------------一行------------------------------------------------*/
/*for(let i=0;i<rise;i++){
    var index=Math.floor(Math.random()*(all_list.length));
    console.log("index:",index);
    white_list.push(all_list[index]);
    all_list.splice(index,1);
}
var list=[];
for(let j=0;j<white_list.length;j++){
    list.push({row:0,col:white_list[j],color:"0"});
}
for(let n=0;n<all_list.length;n++){
    var colors=["1","2","3"];
    let index_color_1=Math.floor(Math.random()*(colors.length));
    list.push({row:0,col:all_list[n],color:colors[index_color_1]});
}*/

/*console.log(white_list);
console.log(all_list);*/
//console.log(list);

/*var distance=-1;
console.log(0-distance);*/

var path=require('path');
var lineReader=require('line-reader');
var Q=require('q');
/*var LineReader=require('node-line-reader').LineReader;
//var stream=getSomeReadableStream();
/!*var express=require('express');
var app=express();
app.use(express.static("../logs"));*!/

var reader=new LineReader(path.join("../logs","20180625_login.log"));
reader.nextLine(function (err,line) {
    if(!err){
        console.log("file line:",line);
    }
});*/
//--------------------------------------解析日志文件---------------------------------
/*var list=[];
lineReader.eachLine(path.join("../logs","20180625_login.log"), function (line,last) {
    //console.log(typeof line);
    list.push(JSON.parse(line));
    if(last){
        console.log("i am done");
        //console.log(list);
        hander(list);
    }
});
var table=[];
function hander(list){
    //console.log(list);

    list.forEach(function (each) {
        var tag=false;
        var u_tag;
        for(var i=0;i<table.length;i++){
            if(each.name==table[i].name){
                tag=true;
                u_tag=i;
                break;
            }
        }
        if(tag==false){
            each.count=1;
            table.push(each);

        }else {
            table[u_tag].count+=1;
        }
    });
    console.log(table);
}*/
//-------------------------------------------------获取logs下的所有文件名-----------------------
/*
let fs=require("fs");
let join=require('path').join;
function findSync(startPath){

    fs.readdir(startPath, function (err,files) {
        console.log(files);
    });

}

let fileNames=findSync("../logs/login");*/

/*
console.log(1%3)*/


//------------------------------------------------宝石-----------------------------------------
/*let rise=5;
const max_col_num=3;
const colors_able=["0","1","2","3"];
const colors_unable=["4"];
var colors_list=[...colors_able];
let map_list=[[1],[1],[],[],[],[]];

let count_col=0;//记录上次地图的列数
let index_col=[];//标记第一个非空块的位置

var create_map_col=[];
map_list.forEach(function (str_1,index) {
    if(str_1.length>0){
        index_col.push(index);
        count_col+=1;
    }
});
switch (count_col) {
    case 0:
        var down_index=Math.ceil(Math.random()*10);
        if(rise<=4){
            if(down_index<=3){//生成一列带有不可消除
                var num_1=rise-1;
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:0,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list=[[],[],[],[],[],[]];
                map_list.splice(0,1,create_map_col);
                if(num_1!=0){
                    map_list=add_unthunk(index_col,map_list,num_1);
                }
            }else {//生成三列
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>4&&rise<=8){
            if(down_index<=3){//生成两列带有不可消除
                var num_2=rise-2;
                map_list=[[],[],[],[],[],[]];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:0,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(0,1,create_map_col);
                create_map_col=[];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:1,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(1,1,create_map_col);
                if(num_2!=0){
                    map_list=add_unthunk(index_col,map_list,num_2);
                }
            }else {
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>8){
            map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
        }
        break;
    case 1:
        var down_index_1=Math.ceil(Math.random()*10);
        if(rise<=4){
            if(down_index_1<=3){//生成一列带有不可消除
                var num_11=rise-1;
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    if(index_col[0]+1>5){
                        index_col[0]=-1;
                        create_map_col.push({col:index_col[0]+1,color:colors_list[index_color]});
                    }else {
                        create_map_col.push({col:index_col[0]+1,color:colors_list[index_color]});
                    }
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list=[[],[],[],[],[],[]];
                map_list.splice(index_col[0]+1,1,create_map_col);
                if(num_11!=0){
                    map_list=add_unthunk(index_col,map_list,num_11);
                }
            }else {//生成三列
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>4&&rise<=8){
            if(down_index_1<=3){//生成两列带有不可消除
                var num_21=rise-2;
                map_list=[[],[],[],[],[],[]];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:0,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(0,1,create_map_col);
                create_map_col=[];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:1,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(1,1,create_map_col);
                if(num_21!=0){
                    map_list=add_unthunk(index_col,map_list,num_21);
                }
            }else {
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>8){
            map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
        }
        break;
    case 2:
        var down_index_2=Math.ceil(Math.random()*10);
        if(rise<=4){
            if(down_index_2<=3){//生成一列带有不可消除
                var num_12=rise-1;
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:0,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list=[[],[],[],[],[],[]];
                map_list.splice(0,1,create_map_col);
                if(num_12!=0){
                    map_list=add_unthunk(index_col,map_list,num_12);
                }
            }else {//生成三列
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>4&&rise<=8){
            if(down_index_2<=3){//生成两列带有不可消除
                var num_22=rise-2;
                map_list=[[],[],[],[],[],[]];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    if(index_col[0]+2>4){
                        index_col[0]=-2;
                        create_map_col.push({col:index_col[0]+2,color:colors_list[index_color]});
                    }else {
                        create_map_col.push({col:index_col[0]+2,color:colors_list[index_color]});
                    }
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(index_col[0]+2,1,create_map_col);
                create_map_col=[];
                for(let i=0;i<max_col_num;i++){
                    let index_color=Math.floor(Math.random()*colors_list.length);
                    create_map_col.push({col:index_col[0]+3,color:colors_list[index_color]});
                    colors_list.splice(index_color,1);
                }
                colors_list=[...colors_able];
                map_list.splice(index_col[0]+3,1,create_map_col);
                if(num_22!=0){
                    map_list=add_unthunk(index_col,map_list,num_22);
                }
            }else {
                map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
            }
        }
        if(rise>8){
            map_list=create_map(rise,map_list,create_map_col,colors_list,index_col);
        }
        break;
    case 3:
        console.log("case3:",index_col);
        if(index_col[0]===0&&index_col[1]===1&&index_col[2]===2){
            let map_1=[];
            let unable_thunk=rise-3;
            if(unable_thunk===0){
                map_list=create_unequal_thunk_2(map_1,map_list,colors_list,create_map_col,index_col);
            }else {
                map_list=create_unequal_thunk_2(map_1,map_list,colors_list,create_map_col,index_col);
                index_col=[];
                map_list.forEach(function (str_1,index) {
                    if(str_1.length>0){
                        index_col.push(index);
                    }
                });
                for(let i=0;i<unable_thunk;i++){
                    let index_1=Math.floor(Math.random()*index_col.length);
                    let flag=-1;
                    let flag_index=is_all_unthunk(flag,index_1,index_col,map_list);
                    console.log("===========================:",flag_index);
                    map_list[flag_index[0]][flag_index[1]].color=colors_unable[0];
                }
            }
        }else if(index_col[0]===3&&index_col[1]===4&&index_col[2]===5){
            let map_1=[];
            let unable_thunk=rise-3;
            if(unable_thunk===0){
                map_list=create_unequal_thunk_1(map_1,map_list,colors_list,create_map_col,index_col);
            }else {
                map_list=create_unequal_thunk_1(map_1,map_list,colors_list,create_map_col,index_col);
                index_col=[];
                map_list.forEach(function (str_1,index) {
                    if(str_1.length>0){
                        index_col.push(index);
                    }
                });
                for(let i=0;i<unable_thunk;i++){
                    let index_1=Math.floor(Math.random()*index_col.length);
                    let flag=-1;
                    let flag_index=is_all_unthunk(flag,index_1,index_col,map_list);
                    console.log("===========================:",flag_index);
                    map_list[flag_index[0]][flag_index[1]].color=colors_unable[0];
                }
            }
        }else if(index_col[0]===0&&index_col[1]===2&&index_col[2]===4){
            map_list=is_all_unthunk_1(rise,map_list,create_map_col,colors_list,index_col,1);

        }else {
            map_list=is_all_unthunk_1(rise,map_list,create_map_col,colors_list,index_col,-1);
        }

        break;
}*/
/*
console.log(map_list);
//------------------------------------------------------------------添加不可消除块begin------------------------------------------------------------------
function add_unthunk(index_col,map_list,unable_thunk){
    index_col=[];
    map_list.forEach(function (str_1,index) {
        if(str_1.length>0){
            index_col.push(index);
        }
    });
    for(let i=0;i<unable_thunk;i++){
        let index_1=Math.floor(Math.random()*index_col.length);
        let flag=-1;
        let flag_index=is_all_unthunk(flag,index_1,index_col,map_list);
        console.log("===========================:",flag_index);
        map_list[flag_index[0]][flag_index[1]].color=colors_unable[0];
    }
    return map_list;
}
//------------------------------------------------------------------添加不可消除块end------------------------------------------------------------------
//------------------------------------------------------------------宝石生成三列的情况下（70%）begin---------------------------------------------------------
function create_map(rise,map_list,create_map_col,colors_list,index_col){
    let map_1=[];
    let unable_thunk=rise-3;
    if(unable_thunk===0){
        map_list=[[],[],[],[],[],[]];
        for(let index=0;index<3;index++){
            for(let i=0;i<max_col_num;i++){
                let index_color=Math.floor(Math.random()*colors_list.length);
                create_map_col.push({col:index,color:colors_list[index_color]});
                colors_list.splice(index_color,1);
            }
            colors_list=[...colors_able];
            map_list.splice(index,1,create_map_col);
            create_map_col=[];
        }
    }else {
        map_list=[[],[],[],[],[],[]];
        for(let index=0;index<3;index++){
            for(let i=0;i<max_col_num;i++){
                let index_color=Math.floor(Math.random()*colors_list.length);
                create_map_col.push({col:index,color:colors_list[index_color]});
                colors_list.splice(index_color,1);
            }
            colors_list=[...colors_able];
            map_list.splice(index,1,create_map_col);
            create_map_col=[];
        }
        map_list=add_unthunk(index_col,map_list,unable_thunk);
    }
    return map_list;

}
//------------------------------------------------------------------宝石生成三列的情况下（70%）end-----------------------------------------------------------

//-------------------------------------------------------------------宝石三个分开列的方法begin------------------------------------------------------
function is_all_unthunk_1(rise,map_list,create_map_col,colors_list,index_col,type){
    let map_1=[];
    let unable_thunk=rise-3;
    if(unable_thunk===0){
        map_list=[[],[],[],[],[],[]];
        for(let index=0;index<3;index++){
            for(let i=0;i<max_col_num;i++){
                let index_color=Math.floor(Math.random()*colors_list.length);
                create_map_col.push({col:index_col[index]+type,color:colors_list[index_color]});
                colors_list.splice(index_color,1);
            }
            colors_list=[...colors_able];
            map_list.splice(index_col[index]+type,1,create_map_col);
            create_map_col=[];
        }
    }else {
        map_list=[[],[],[],[],[],[]];
        for(let index=0;index<3;index++){
            for(let i=0;i<max_col_num;i++){
                let index_color=Math.floor(Math.random()*colors_list.length);
                create_map_col.push({col:index_col[index]+type,color:colors_list[index_color]});
                colors_list.splice(index_color,1);
            }
            colors_list=[...colors_able];
            map_list.splice(index_col[index]+type,1,create_map_col);
            create_map_col=[];
        }
        map_list=add_unthunk(index_col,map_list,unable_thunk);
    }
    return map_list;
}

//-------------------------------------------------------------------宝石三个分开列的方法end------------------------------------------------------
//-------------------------------------------------------------------宝石三个相连列的方法begin------------------------------------------------------
function is_all_unthunk(flag,index,index_col,map_list){
    for(let i=0;i<map_list[index_col[index]].length;i++){
        if(map_list[index_col[index]][i].color!="4"){
            flag=i;
            break;
        }
    }
    if(flag==-1){
        index_col.splice(index,1);
        index=Math.floor(Math.random()*index_col.length);
        [index_col[index],flag]=is_all_unthunk(flag,index,index_col,map_list);
        return [index_col[index],flag];
    }else {
        return [index_col[index],flag];
    }
}

function create_unequal_thunk_1(map_1,map_list,colors_list,create_map_col,index_col){
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        create_map_col.push({col:index_col[0],color:colors_list[index_color]});
        colors_list.splice(index_color,1);
    }
    colors_list=[...colors_able];
    map_list=[[],[],[],[],[],[]];
    map_list.splice(0,1,create_map_col);
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        if(map_list[0][i].color===colors_list[index_color]){
            if(index_color+1>=colors_list.length){
                map_1.push({col:1,color:colors_list[0]});
                colors_list.splice(0,1);
            }else {
                map_1.push({col:1,color:colors_list[index_color+1]});
                colors_list.splice(index_color+1,1);
            }
        }else {
            map_1.push({col:1,color:colors_list[index_color]});
            colors_list.splice(index_color,1);
        }
    }
    map_list.splice(1,1,map_1);
    colors_list=[...colors_able];
    map_1=[];
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        if(map_list[1][i].color===colors_list[index_color]){
            if(index_color+1>=colors_list.length){
                map_1.push({col:2,color:colors_list[0]});
                colors_list.splice(0,1);
            }else {
                map_1.push({col:2,color:colors_list[index_color+1]});
                colors_list.splice(index_color+1,1);
            }
        }else {
            map_1.push({col:2,color:colors_list[index_color]});
            colors_list.splice(index_color,1);
        }
    }
    if(map_1[0].color===map_list[1][1].color){
        colors_list=[...colors_able];
        colors_list.splice(colors_list.indexOf(map_list[1][1].color),1);
        colors_list.splice(colors_list.indexOf(map_list[1][0].color),1);
        let index_color=Math.floor(Math.random()*colors_list.length);
        map_1[0].color=colors_list[index_color];
    }
    if(map_1[2].color===map_list[1][1].color){
        colors_list=[...colors_able];
        colors_list.splice(colors_list.indexOf(map_list[1][0].color),1);
        colors_list.splice(colors_list.indexOf(map_list[1][2].color),1);
        let index_color=Math.floor(Math.random()*colors_list.length);
        map_1[2].color=colors_list[index_color];
    }
    map_list.splice(2,1,map_1);
    colors_list=[...colors_able];
    map_1=[];
    index_col=[];
    return map_list;
}
function create_unequal_thunk_2(map_1,map_list,colors_list,create_map_col,index_col){
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        create_map_col.push({col:index_col[0],color:colors_list[index_color]});
        colors_list.splice(index_color,1);
    }
    colors_list=[...colors_able];
    map_list=[[],[],[],[],[],[]];
    map_list.splice(3,1,create_map_col);
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        if(map_list[3][i].color===colors_list[index_color]){
            if(index_color+1>=colors_list.length){
                map_1.push({col:1,color:colors_list[0]});
                colors_list.splice(0,1);
            }else {
                map_1.push({col:1,color:colors_list[index_color+1]});
                colors_list.splice(index_color+1,1);
            }
        }else {
            map_1.push({col:1,color:colors_list[index_color]});
            colors_list.splice(index_color,1);
        }
    }
    map_list.splice(4,1,map_1);
    colors_list=[...colors_able];
    map_1=[];
    for(let i=0;i<max_col_num;i++){
        let index_color=Math.floor(Math.random()*colors_list.length);
        if(map_list[4][i].color===colors_list[index_color]){
            if(index_color+1>=colors_list.length){
                map_1.push({col:2,color:colors_list[0]});
                colors_list.splice(0,1);
            }else {
                map_1.push({col:2,color:colors_list[index_color+1]});
                colors_list.splice(index_color+1,1);
            }
        }else {
            map_1.push({col:2,color:colors_list[index_color]});
            colors_list.splice(index_color,1);
        }
    }
    if(map_1[0].color===map_list[4][1].color){
        colors_list=[...colors_able];
        colors_list.splice(colors_list.indexOf(map_list[4][1].color),1);
        colors_list.splice(colors_list.indexOf(map_list[4][0].color),1);
        let index_color=Math.floor(Math.random()*colors_list.length);
        map_1[0].color=colors_list[index_color];
    }
    if(map_1[2].color===map_list[4][1].color){
        colors_list=[...colors_able];
        colors_list.splice(colors_list.indexOf(map_list[4][0].color),1);
        colors_list.splice(colors_list.indexOf(map_list[4][2].color),1);
        let index_color=Math.floor(Math.random()*colors_list.length);
        map_1[2].color=colors_list[index_color];
    }
    map_list.splice(5,1,map_1);
    colors_list=[...colors_able];
    map_1=[];
    return map_list;
}*/
//------------------------------------------------------------------宝石三个相连列的方法end--------------------------------------------------


//-----------------------------------------------画像------------------------------------------

//--------------------------------------------------1-------------------------------------------
/*const max_cols=2;//规定下落的列数
var rise=1;
var map_list=[[],[],[],[],[],[]];//二维数组[[],[],[]]
var each_col_list=[];
var each_col_number=rise*4/max_cols;
var colors_list=["4","5","6","7"];
var col_1=0;
var col_2=0;
var has_col=false;
var direct=0;
for(let i=0;i<map_list.length;i++){
    if(map_list[i].length>0){
        has_col=true;

        if(i+2>5&&map_list[i][0].direction==1){
            console.log("到达最右边:"+i);
            col_1=i-2;
            col_2=i-1;
            direct=-1;
        }
        if(i+3<=5&&i-2>=0&&map_list[i][0].direction==1){
            col_1=i+2;
            col_2=i+3;
            direct=1
        }
        if(i+3<=5&&i-2>=0&&map_list[i][0].direction==-1){
            col_1=i-2;
            col_2=i-1;
            direct=-1
        }
        if(i-1<0&&map_list[i][0].direction==-1){
            col_1=i+2;
            col_2=i+3;
            direct=1;
        }
        if(i-1<0&&map_list[i][0].direction==1){
            col_1=i+2;
            col_2=i+3;
            direct=1;
        }

        break;
    }
}
if(has_col==false){//第一次
    col_1=0;
    col_2=1;
    direct=1;
}
//重置
map_list=[[],[],[],[],[],[]];
var random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_1,color:colors_list[random_color],direction:direct});
}
map_list.splice(col_1,1,each_col_list);
each_col_list=[];
random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_2,color:colors_list[random_color],direction:direct});
}
map_list.splice(col_2,1,each_col_list);

console.log(map_list);*/
//-------------------------------------------------2--------------------------------------------
/*
const max_cols=2;//规定下落的列数
var rise=1;
var map_list=[[],[],[],[],[ { col: 4, color: '6', direction: 1 },
    { col: 4, color: '6', direction: 1 } ],
    [ { col: 5, color: '6', direction: 1 },
        { col: 5, color: '6', direction:1 } ]];//二维数组[[],[],[]]
var each_col_list=[];
var each_col_number=rise*4/max_cols;
var colors_list=["4","5","6","7"];
var col_1=0;
var col_2=0;
var has_col=false;
var direct=0;
for(let i=0;i<map_list.length;i++){
    if(map_list[i].length>0){
        has_col=true;

        if(i+2>5&&map_list[i][0].direction==-1){
            console.log("到达最右边:"+i);
            col_1=i-2;
            col_2=i-1;
            direct=-1;
        }
        if(i+2>5&&map_list[i][0].direction==1){
            console.log("到达最右边:"+i);
            col_1=i-2;
            col_2=i-1;
            direct=-1;
        }
        if(i+3<=5&&i-2>=0&&map_list[i][0].direction==-1){
            col_1=i-2;
            col_2=i-1;
            direct=-1
        }
        if(i+3<=5&&i-2>=0&&map_list[i][0].direction==1){
            col_1=i+2;
            col_2=i+3;
            direct=1
        }
        if(i-1<0&&map_list[i][0].direction==-1){
            col_1=i+2;
            col_2=i+3;
            direct=1;
        }

        break;
    }
}
if(has_col==false){//第一次
    col_1=4;
    col_2=5;
    direct=-1;
}
//重置
map_list=[[],[],[],[],[],[]];
var random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_1,color:colors_list[random_color],direction:direct});
}
map_list.splice(col_1,1,each_col_list);
each_col_list=[];
random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_2,color:colors_list[random_color],direction:direct});
}
map_list.splice(col_2,1,each_col_list);

console.log(map_list);
*/
//--------------------------------------------------3------------------------------------------
//[[1],[0],[0],[0],[0],[1]]-->[[0],[1],[0],[0],[1],[0]]-->[[0],[0],[1],[1],[0],[0]]
/*
const max_cols=2;//规定下落的列数
var rise=1;
var map_list=[[ { col: 4, color: '6', direction: 1 },
    { col: 4, color: '6', direction: 1 } ],[],[],[],[],
    [ { col: 4, color: '6', direction: -1 },
        { col: 4, color: '6', direction: -1 } ]];//二维数组[[],[],[]]//房间用户信息中获得
var each_col_list=[];
var each_col_number=rise*4/max_cols;
var colors_list=["4","5","6","7"];
var col_1=0;
var col_2=0;
var has_col=false;
var direct_1=0;//第一列的方向
var direct_2=0;//第二列的方向

for(let i=0;i<map_list.length;i++){
    if(map_list[i].length>0){
        has_col=true;
        var col_number_list=findColNumber(map_list);//查找到已有列数的下标
        console.log(col_number_list);
        col_1=col_number_list[0];
        col_2=col_number_list[1];
        if(map_list[col_1][0].direction==1&&map_list[col_2][0].direction==-1){
            if(col_2-col_1>=1){
                col_2=col_2-1;
                col_1=col_1+1;
                direct_1=1;
                direct_2=-1;
            }else {
                let temp_index=col_1;
                col_1=col_2;
                col_2=temp_index;
                col_1=col_1-1;
                col_2=col_2+1;
                direct_1=-1;
                direct_2=1;
            }
        }else if(map_list[col_1][0].direction==-1&&map_list[col_2][0].direction==1){
            if(col_1==0&&col_2==5){
                col_1=col_1+1;
                col_2=col_2-1;
                direct_1=1;
                direct_2=-1;
            }else {
                col_1=col_1-1;
                col_2=col_2+1;
                direct_1=-1;
                direct_2=1;
            }
        }

        break;
    }
}
if(has_col==false){//第一次
    col_1=0;
    col_2=5;
    direct_1=1;
    direct_2=-1;
}
//重置
map_list=[[],[],[],[],[],[]];
var random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_1,color:colors_list[random_color],direction:direct_1});
}
map_list.splice(col_1,1,each_col_list);
each_col_list=[];
random_color=Math.floor(Math.random()*(colors_list.length));
for(let i=0;i<each_col_number;i++){
    each_col_list.push({col:col_2,color:colors_list[random_color],direction:direct_2});
}
map_list.splice(col_2,1,each_col_list);

console.log(map_list);


function findColNumber(map_list){
    var map_temp_list=[];
    for(let i=0;i<map_list.length;i++){
        map_temp_list[i]=map_list[i];
    }
    var temp=[];
    for(let i=0;i<map_temp_list.length;i++){
        if(map_temp_list[i].length>0){
            temp.push(i);
            map_temp_list.splice(i,1,[]);
            if(temp.length==2){
                break;
            }
        }
    }
    return temp;
}
*/
//-------------------------------------------------4------------------------------------------
//[[1],[0],[0],[0],[0],[0]]-->[[0],[1],[0],[0],[0],[0]]-->[[0],[0],[1],[0],[0],[0]]-->[[0],[0],[0],[1],[0],[0]]-->[[0],[0],[0],[0],[1],[0]]-->[[0],[0],[0],[0],[0],[1]]
/*
var rise=7;
var map_list=[[],[],[],[],[ { col: 5, color: '6' },
    { col: 5, color: '6'},
    { col: 5, color: '6'},
    { col: 5, color: '6'}],
    [ { col: 5, color: '6' },
        { col: 5, color: '6'},
        { col: 5, color: '6'},
        { col: 5, color: '6'}]];//二维数组[[],[],[]]
var each_col_list=[];
var each_col_number=4;
var colors_list=["4","5","6","7"];
var tag_map_list=[];
if(rise<=6){
   let index=findColNumber_last(map_list);
   console.log(index);
    let tag_col=index;
    map_list=[[],[],[],[],[],[]];
    for(let i=0;i<rise;i++){
        if(index+2>5){
            tag_col=0;
            while(map_list[tag_col].length>0){
                tag_col=tag_col+1;
            }
            let random_color=Math.floor(Math.random()*(colors_list.length));
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:colors_list[random_color]});
            }
            map_list.splice(tag_col,1,each_col_list);
            index=findColNumber_last(map_list);
            each_col_list=[];
        }else{
            tag_col=index+2;
            while(map_list[tag_col].length>0){
                tag_col=tag_col+1;
            }
            let random_color=Math.floor(Math.random()*(colors_list.length));
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:colors_list[random_color]});
            }
            map_list.splice(tag_col,1,each_col_list);
            index=findColNumber_last(map_list);
            each_col_list=[];
        }
    }
}else {
    let index=0;
    let tag_col=index;
    map_list=[[],[],[],[],[],[]];
    for(let i=0;i<6;i++){
        if(index+2>5){
            tag_col=0;
            while(map_list[tag_col].length>0){
                tag_col=tag_col+1;
            }
            let random_color=Math.floor(Math.random()*(colors_list.length));
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:colors_list[random_color]});
            }
            map_list.splice(tag_col,1,each_col_list);
            index=findColNumber_last(map_list);
            each_col_list=[];
        }else{
            tag_col=index+2;
            while(map_list[tag_col].length>0){
                tag_col=tag_col+1;
            }
            let random_color=Math.floor(Math.random()*(colors_list.length));
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:colors_list[random_color]});
            }
            map_list.splice(tag_col,1,each_col_list);
            index=findColNumber_last(map_list);
            each_col_list=[];
        }
    }
    var add_col=rise-6;
    index=0;

    for(let i=0;i<add_col;i++){
        if(index+2>5){
            tag_col=0;
            let random_color=map_list[tag_col][0].color;
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:random_color});
            }
            for(let j=0;j<each_col_list.length;j++){
                map_list[tag_col].push(each_col_list[j]);
            }
            tag_map_list.push(each_col_list);
            index=findColNumber_last(tag_map_list);
            each_col_list=[];
        }else{
            tag_col=index+2;
            let random_color=map_list[tag_col][0].color;
            for(let j=0;j<each_col_number;j++){
                each_col_list.push({col:tag_col,color:random_color});
            }
            for(let j=0;j<each_col_list.length;j++){
                map_list[tag_col].push(each_col_list[j]);
            }

            tag_map_list.push(each_col_list);
            index=findColNumber_last(tag_map_list);
            each_col_list=[];
        }
    }



}
console.log(map_list);


function findColNumber_last(map_list){//发现空的列数
    var map_temp_list=[];
    for(let i=0;i<map_list.length;i++){
        map_temp_list[i]=map_list[i];
    }
    var temp=0;
    for(let i=0;i<map_temp_list.length;i++){
        if(map_temp_list[i].length>0){
            temp=i;
        }
    }
    return temp;
}



*/

/*
console.log("(。＿ 。） ✎＿学习计划走起");*/

/*var 蛋花汤=1;
console.log(蛋花汤);*/

//类声明
/*
class Person{
    //构造
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    getAge(){
        return (`${this.x}的年龄是${this.y}岁`);
    }
    printAge(){
        return this.y;
    }
}
module.exports=Person;

*/

//import {Person} from "./test";
/*
let person=new Person("张三",12);
console.log(person.getAge());
console.log(`年龄：${person.printAge()}`);*/

//console.log(Math.ceil(4.0));

/*var time=0;

function _1(){
    time++;
}*/
/*
if(true) {
    console.log(x); // ReferenceError
    let x = 'hello';
}*/
/*
const arr = [1, 2, 3, 4];
const [first,second]=arr;
console.log([first,second]);*/
/*
var unusued = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    alert(message);
}

greet()*//*
 var a = SIMD.Float32x4(1, 2, 3, 4);
 var b = SIMD.Float32x4(5, 6, 7, 8);
 var c = SIMD.Float32x4.add(a, b); // Float32x4[6, 8, 10, 12]*/

/*function haha(){
    let arr=new Array(1,2,3,4,5);
    return Array.constructor;
}*/
//-----------------------------------------------------------------------------------------------------javascriptAPI---------------------------------------------------------------------------------

//------------------------------------------------------Array-------------------------------------------------------
/*let arr=new Array(1,2,3,4,5);
function Object(){

}
Object.prototype.name={"wn":11};
let object=new Object();

console.log(object.name)*/

/*let arr_1=[1,2,3,4];
let arr_2=[5,6,7,8];
let arr_3=arr_1.concat(arr_2);//合并
//arr_3=arr_3.join(" ");
console.log(typeof arr_3);//Array
console.log(typeof arr_3.join(","));//string
console.log(arr_3.reverse());//颠倒
console.log(arr_3.pop());
console.log(arr_3);
console.log(arr_3.shift());//删除第一个元素并返回原第一个元素
console.log(arr_3);
console.log(arr_3.slice(0,3));
console.log(arr_3.toLocaleString());
let arr_4=[arr_3.toLocaleString()];
console.log(arr_4);
let arr_5=[...arr_3.join("")];
console.log(arr_5);
console.log(arr_5.length);
console.log(arr_5.unshift(9,8));
console.log("===============================");
let arr_6=[];
arr_5.forEach(function (each) {
    arr_6.push(parseInt(each));
});
console.log(arr_6.valueOf());*/

//-----------------------------------------------------Date-----------------------------------------------------------
/*var myDate=new Date();
console.log(Date());
console.log(`${myDate.getDate()}日`);//日期
console.log(`第${myDate.getDay()+1}`);//某一周的第几天
console.log(`${myDate.getMonth()+1}月`);
console.log(`${myDate.getFullYear()}年`);
console.log(`${myDate.getMilliseconds()}毫秒`);
console.log(`距离1970/01/01一共${Date.parse("Jul 8,2005")}毫秒`);*/

//----------------------------------------------------Math-------------------------------------
/*console.log(Math.E);//返回算术常量 e，即自然对数的底数（约等于2.718）。
console.log(Math.LN2);//返回 2 的自然对数（约等于0.693）。
console.log(Math.LN10);//返回 10 的自然对数（约等于2.302）。
console.log(Math.LOG2E);//返回以 2 为底的 e 的对数（约等于 1.414）。
console.log(Math.LOG10E);//返回以 10 为底的 e 的对数（约等于0.434）。
console.log(Math.PI);//返回圆周率（约等于3.14159）。
console.log(Math.SQRT1_2);//返回返回 2 的平方根的倒数（约等于 0.707）。
console.log(Math.SQRT2);//返回 2 的平方根（约等于 1.414）。

console.log(Math.abs(-1.2));//绝对值
console.log(Math.acos(1));//反余弦值
console.log(Math.asin(1)/Math.PI*180);//反正玄值
console.log(Math.atan(1)/Math.PI*180);//反正切值
console.log(Math.atan2(1,0)/Math.PI*180);//返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。atan2(y,x)
console.log(Math.ceil(3.5));//向上取整 ->大
console.log(Math.floor(3.5));//向下取整->小
console.log(Math.exp(2));//返回e的指数
console.log(Math.sqrt(Math.exp(2))/Math.E);
console.log(Math.log(Math.exp(2)));//返回数的自然对数（底为e）。
console.log(Math.pow(2,3));//返回 x 的 y 次幂。
console.log(Math.round(2.4));//把数四舍五入为最接近的整数。*/

//----------------------------------------------------Number------------------------------------------
/*var myNum=new Number(1.232323);
console.log(Number.MAX_VALUE);
//console.log(Math.pow(1.79,308));
console.log(Number.MIN_VALUE);
console.log(Number.NaN);
console.log(myNum.toFixed(2));//把数字转换为字符串，结果的小数点后有指定位数的数字。
console.log(myNum instanceof Number);//true
console.log(myNum.toPrecision(2));//把数字格式化为指定的长度。*/

//----------------------------------------------------String----------------------------------
/*let txt="hello world";
console.log(txt.anchor("myanchor"));//创建 HTML 锚。
let str=new String("hello world");
console.log(str.big());//用大号字体显示字符串。
console.log(str.blink());//显示闪动字符串。
console.log(str.bold());//使用粗体显示字符串。
console.log(str.charAt(0));//返回在指定位置的字符。
console.log(str.charCodeAt(0));//返回在指定位置的字符的Unicode编码
let str_2=new String("aushichao");
console.log(str.concat(str_2));//连接字符串。
console.log(str.fixed());//以打字机文本显示字符串。
console.log(str.fontcolor("red"));//使用指定的颜色来显示字符串。
console.log(str.fontsize(2));//size 参数必须是从 1 至 7 的数字。
console.log(String.fromCharCode(104));//从字符编码创建一个字符串。
console.log(str.indexOf("w"));//检索字符串。
console.log(str.italics());//使用斜体显示字符串
console.log(str.lastIndexOf("w"));//从后向前搜索字符串。
console.log(str.link("http://www.baidu.com"));//将字符串显示为链接
console.log(str.localeCompare(str_2));//用本地特定的顺序来比较两个字符串。
console.log(str.match("world"));//找到一个或多个正则表达式的匹配。
console.log(str.replace("world","hahahahh"));//替换与正则表达式匹配的子串。
console.log(str.search("world"));//检索与正则表达式相匹配的值。
console.log(str.slice(0,5));//提取字符串的片断，并在新的字符串中返回被提取的部分
console.log(str.small());//使用小字号来显示字符串。
console.log(str.split("l"));//把字符串分割为字符串数组。
console.log(str.strike());//使用删除线来显示字符串。
console.log(str.sub());//把字符串显示为下标。
console.log(str.sup());//把字符串显示为上标。
console.log(str.substr(0,2));//从起始索引号提取字符串中指定数目的字符。substr(num,length)
console.log(str.substring(0,2));//提取字符串中两个指定的索引号之间的字符。不包括2
console.log(str.toLowerCase());//把字符串转换为小写。
console.log(str.toUpperCase());//把字符串转换为大写。*/

//----------------------------------------------------RegExp---------------------------------------------------

//=========================支持正则表达式的 String 对象的方法=======================
//=========================方法    描述=============================================
//=========================search 检索与正则表达式相匹配的值========================
//=========================match   找到一个或多个正则表达式的匹配======================
//=========================replace 替换与正则表达式匹配的子串=========================
//=========================split   把字符串分割为字符串数组=========================

/*let regExp=new RegExp("is","i");//i	执行对大小写不敏感的匹配。g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。m	执行多行匹配。
var str="Is this all there is hello 012";
var patt1=/is/i;
console.log(str.match(patt1));
console.log(str.match(regExp));*/
//=============================方括号[]====================================
/*console.log(str.match(/[abo]/g));//查找方括号之间的任何字符。
console.log(str.match(/[^a-z]/i));//查找任何不在方括号之间的字符。
console.log(str.match(/[0-9]/g));//查找任何从 0 至 9 的数字。
console.log(str.match(/[a-z]/g));//查找任何从小写 a 到小写 z 的字符。
console.log(str.match(/[A-Z]/g));//查找任何从大写 A 到大写 Z 的字符。
console.log(str.match(/[A-z]/g));//查找任何从大写 A 到小写 z 的字符。
console.log(str.match(/[adgk]/g));//查找给定集合内的任何字符。
console.log(str.match(/[^Is this all there is hello 01]/g));*/
//============================元字符=====================================
/*let str="That's hot";
console.log(str.match(/h.t/g));//查找单个字符，除了换行和行结束符。
console.log(str.match(/\w/g));//查找单词字符。
console.log(str.match(/\W/g));//查找非单词字符。
console.log(str.match(/\d/g));//查找数字。
console.log(str.match(/\D/g));//查找非数字字符。
console.log(str.match(/\s/g));//查找空白字符。
console.log(str.match(/\S/g));//查找非空白字符。
console.log(str.match(/\0/g));//查找nul字符
console.log(str.match(/\f/g));//查找换页符。
console.log(str.match(/\n/g));//查找换行符
console.log(str.match(/\r/g));//查找回车符。
console.log(str.match(/\t/g));//查找制表符。
console.log(str.match(/\v/g));//查找垂直制表符。*/

/*
var str="Visit W3school.Hello World!";
console.log(str.match(/\127/g));//\xxx	查找以八进制数 xxx 规定的字符。
console.log(str.match(/\x57/g));//查找以十六进制数 dd 规定的字符。
console.log(str.match(/\u0057/g));//查找以十六进制数 xxxx 规定的 Unicode 字符。
*/

//==========================量词=============================================
/*var str="Hellooo World! Hello W3School";
console.log(str.length);
console.log(str.match(/o+/g));//匹配任何包含至少一个 n 的字符串。
console.log(str.match(/lo*!/g));//匹配任何包含零个或多个 n 的字符串。
console.log(str.match(/o?/g).length);//匹配任何包含零个或一个 n 的字符串。
console.log(str.match(/o{3}/g));//匹配包含 X 个 n 的序列的字符串。
console.log(str.match(/o{1,3}/g));//匹配包含 X 至 Y 个 n 的序列的字符串。
console.log(str.match(/o{1,}/g));//匹配包含至少 X 个 n 的序列的字符串。
console.log(str.match(/l$/g));//匹配任何结尾为 n 的字符串。
console.log(str.match(/^h/i));//匹配任何开头为 n 的字符串。
console.log(str.match(/H(?=e)/g));//匹配任何其后紧接指定字符串 n 的字符串。
console.log(str.match(/l(?!o)/g));//匹配任何其后没有紧接指定字符串 n 的字符串。*/

//-------------------------------------Functions---------------------------------------------------
/*
let str="hello world";
console.log(isNaN(str));//检查某个值是否是数字。*/

/*
class Person{

    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    getAge(){
        return this.age;
    }
}
*/

/*
exports.Person=Person;*/
//---------------------------------匹配---------------------------------------------------------
/*
const websocket=require('ws');
var allMatchingPlayer=[];
var roomList=[];

server=new websocket.Server({
    //host:ip,
    port:1111
});
server.broadcast=function (msg) {

};
//将用户放入待匹配池中
function addMatching(session,allMatchingPlayer,json_data){
    console.log("addMatching user:",session.user);
    session.user["state"]=0;//待匹配
    session.user["type"]=json_data.type;//玩家游戏类型
    allMatchingPlayer.push(session.user);
    result.result="ok";
    result.data=session.user;
    result.msg="addMatching";
    session.send(JSON.stringify(result));
    console.log("匹配池的人：",allMatchingPlayer);
    var deferred=Q.defer();
    deferred.resolve(allMatchingPlayer);
    return deferred.promise;
}
server.on("connection", function (session) {
    session.on("message", function (data) {
        var json_data=JSON.parse(data);
        console.log(json_data);
        switch (json_data.tag){
            case 1:
                console.log("进入匹配");
                addMatching(session,allMatchingPlayer,json_data).then(function (data) {
                    allMatchingPlayer=data;
                    console.log("现在匹配池：",allMatchingPlayer);
                    setInterval(function () {
                        let user_name=json_data.name;
                        let my_tag=0;
                        for(let i=0;i<allMatchingPlayer.length;i++){
                            if(allMatchingPlayer[i].user.name===user_name){
                                my_tag=i;
                                break;
                            }
                        }
                        for(let i=0;i<allMatchingPlayer.length;i++){
                            if(allMatchingPlayer[i].user.state===0&&allMatchingPlayer[i].user.name!=user_name){
                                let userList=[];
                                userList.push(each);
                                userList.push(allMatchingPlayer[my_tag]);
                            }
                        }
                    },1000);
                });
                break;
        }
    })
});*/
/*var _12_1=Math.random()*11;
//var _1_2=3;
var all_list=[];
var white_list=[];
var rise=6;
console.log("惩罚值为：",rise);
for(let i=0;i<10;i++){
    all_list.push(i);
}
var black_list=[];
var array_map=[];

count_rows=rise;
var white_counts=rise;
var row_index=0;
while(white_counts>0){
    let white_count_random=Math.ceil(Math.random()*white_counts);
    if(white_count_random<=5){
        for(let i=0;i<white_count_random;i++){
            let index=Math.floor(Math.random()*(all_list.length));
            white_list.push(all_list[index]);
            all_list.splice(index,1);
        }
        white_counts=white_counts-white_count_random;
        black_list=[...all_list];
        for(let i=0;i<white_list.length;i++){
            array_map.push({row:row_index,col:white_list[i],color:"white"});
        }
        for(let i=0;i<black_list.length;i++){
            let colors=["green","blue","red"];
            let index_color=Math.floor(Math.random()*(colors.length));
            array_map.push({row:row_index,col:black_list[i],color:colors[index_color]});
        }
        row_index++;
        all_list=[];
        white_list=[];
        black_list=[];
        for(let j=0;j<10;j++){
            all_list.push(j);
        }
    }
}
console.log(row_index);*/
/*if(_12_1<5) {//一次性掉多行
    count_rows=rise;
    for(let i=0;i<rise;i++){
        let index=Math.floor(Math.random()*(all_list.length));
        console.log("index:",index);
        white_list.push(all_list[index]);
        all_list.splice(index,1);
        temp_list.push(all_list);
        all_list=[];
        for(let j=0;j<10;j++){
            all_list.push(j);
        }
    }
    for(let i=0;i<temp_list.length;i++){

        array_map.push({row:i,col:white_list[i],color:"white"});

        for(let j=0;j<temp_list[i].length;j++){
            let colors=["green","blue","red"];
            let index_color=Math.floor(Math.random()*(colors.length));
            array_map.push({row:i,col:temp_list[i][j],color:colors[index_color]});
        }
    }
}else {
    if(rise>=5){
        count_rows=rise;
        for(let i=0;i<rise;i++){
            let index=Math.floor(Math.random()*(all_list.length));
            console.log("index:",index);
            white_list.push(all_list[index]);
            all_list.splice(index,1);
            temp_list.push(all_list);
            all_list=[];
            for(let j=0;j<10;j++){
                all_list.push(j);
            }
        }
        for(let i=0;i<temp_list.length;i++){

            array_map.push({row:i,col:white_list[i],color:"white"});

            for(let j=0;j<temp_list[i].length;j++){
                let colors=["green","blue","red"];
                let index_color=Math.floor(Math.random()*(colors.length));
                array_map.push({row:i,col:temp_list[i][j],color:colors[index_color]});
            }
        }
    }else {
        count_rows=1;
        for(let i=0;i<rise;i++){
            let index=Math.floor(Math.random()*(all_list.length));
            console.log("index:",index);
            white_list.push(all_list[index]);
            all_list.splice(index,1);
        }
        for(let j=0;j<white_list.length;j++){
            array_map.push({row:0,col:white_list[j],color:"white"});
        }
        for(let n=0;n<all_list.length;n++){
            let colors=["green","blue","red"];
            let index_color_1=Math.floor(Math.random()*(colors.length));
            array_map.push({row:0,col:all_list[n],color:colors[index_color_1]});
        }
    }
}*/
/*
console.log(array_map);*/

/*
let i=0001;
i<<=4;
console.log(i);
*/

/*let a=[1,2,3,4];
delete a[0]
console.log(a)*/

/*label:
    console.log("label11111");
for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
        if(j==1){
            break;
        }
    }
}

console.log("jjjjjjjj")*/;

