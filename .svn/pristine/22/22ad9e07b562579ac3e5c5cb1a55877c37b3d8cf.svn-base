/**
 * Created by HSH on 2015/1/14.
 */

function Response(res){
    this.originalRes = res;
};

Response.prototype.json = function(message,doc){
    var data={};
    var status = 1;//成功为1； 错误为-1
    if(message){
        /*if(message.fatal==true){
            status = -1;
            console.log(message);
        }*/
        status = -1;
        console.log(message);
        data.message = JSON.stringify(message);
    }

    data.doc = doc;
    data.status = status;

    //console.log("hshshshsh:"+this.originalRes.req.param("hsh"));
    //统一处理 跨域请求
    if(this.originalRes.req.param("callback")){
        return this.originalRes.jsonp(data);
    }else{
        return this.originalRes.json(data);
    }
};

Response.prototype.jsonp = function(message,doc){
    var data={};
    var status = 1;//成功为1； 错误为-1
    if(message){
        /*if(message.fatal==true){
         status = -1;
         console.log(message);
         }*/
        status = -1;
        console.log(message);
        data.message = JSON.stringify(message);
    }
    data.doc = doc;
    data.status = status;
    return this.originalRes.jsonp(data);
};

Response.prototype.render = function(template,options,callback){
    return this.originalRes.render(template,options,callback)
};

Response.prototype.redirect = function(url){
    console.log("response.redirect info....");
    return this.originalRes.redirect(url);
};

module.exports = Response;