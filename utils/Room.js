/**
 * Created by Administrator on 2018/5/25.
 */
/**
 *
  * stayState:首先达到120倍数惩罚值得用户的等待状态，true为正在等待敌人下落，此过程中一旦再次达到120的倍数时不会再次触发发送等待敌人的请求。false为未等待，可向敌人发送等待请求
 * removeRows:消除的次数//用于用户消除次数的叠加
 * penalty_value:用于记录用户的惩罚值
 * penaltyType:当用户游戏类型为画像时，记录画像的惩罚类型
 * map_list:记录用户上次被惩罚时生成的惩罚地图
 *
 */
var room={
    roomid:0,
    playerList:[{"id":1,"name":"null","integral":"","type":0,"state":0,"universal":{},"url":"",loadingState:0,"removeState":0,"removeRows":0,"penalty_value":0,"penaltyType":0,"map_list":[[],[],[],[],[],[]],"stayState":false},
        {"id":2,"name":"null","integral":"","type":0,"state":0,"universal":{},"url":"","loadingState":0,"removeState":0,"removeRows":0,"penalty_value":0,"penaltyType":0,"map_list":[[],[],[],[],[],[]],"stayState":false}
    ],
    score_count:0
};
var roomList=[];
var Room= function () {

};

Room.prototype.setRoomId= function (id) {
    room.roomid=id;
};
Room.prototype.getRoomId= function () {
    return room.roomid;
};
Room.prototype.setPlayerList= function (player) {
    if(room.playerList[0].name!="null"){
        room.playerList[1].name=player.name;
        room.playerList[1].integral=player.integral;
        room.playerList[1].type=player.type;
        room.playerList[1].state=player.state;
        room.playerList[1].universal=player.universal;
        room.playerList[1].url=player.url;
        room.playerList[1].penaltyType=player.penaltyType;
    }else {
        room.playerList[0].name=player.name;
        room.playerList[0].integral=player.integral;
        room.playerList[0].type=player.type;
        room.playerList[0].state=player.state;
        room.playerList[0].universal=player.universal;
        room.playerList[0].url=player.url;
        room.playerList[0].penaltyType=player.penaltyType;
    }
};
Room.prototype.getPlayerList= function () {
    return room.playerList;
};
Room.prototype.getRoom= function () {
    return room;
};
Room.prototype.clearRoom= function (roomid) {
    room={
        roomid:roomid,
        playerList:[{"id":1,"name":"null","integral":"","type":0,"state":0,"universal":{},"url":"","loadState":0,"removeState":0,"removeRows":0,"penalty_value":0,"penaltyType":0,"map_list":[[],[],[],[],[],[]],"stayState":false},
            {"id":2,"name":"null","integral":"","type":0,"state":0,"universal":{},"url":"","loadingState":0,"removeState":0,"removeRows":0,"penalty_value":0,"penaltyType":0,"map_list":[[],[],[],[],[],[]],"stayState":false}
        ],
        score_count:0
    };
};
//ddd
Room.prototype.getRoomList=function (){
    return roomList;
};
Room.prototype.setRoom= function (room) {
    roomList.push(room);
};
exports.Room=Room;

