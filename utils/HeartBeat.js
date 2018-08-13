/**
 * Created by Administrator on 2018/7/19.
 */
class HeartBeat{
    constructor(name,timeout){
        this.name=name;
        this.timeout=timeout;
    }
    createHeartBeat(callback){
        return setInterval(callback,this.timeout);
    }

}

module.exports=HeartBeat;