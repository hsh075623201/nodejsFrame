/** 
* @fileOverview 重写response  
* @date: 2015/05/05 
* @author hsh创建文件
*/

function Response(res){
    this.originalRes = res;
};
/**  
* @description 重写json方法
* @param message 错误信息
* @param doc 返回的文档
* @return 返回json数据
*/ 
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
/**  
* @description 重写jsonp方法
* @param message 错误信息
* @param doc 返回的文档
* @return 返回jsonp数据
*/ 
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
/**  
* @description 重写render方法
* @param template 模板
* @param options 参数
* @param callback 回调函数
* @return 渲染页面
*/ 
Response.prototype.render = function(template,options,callback){
    return this.originalRes.render(template,options,callback)
};
/**  
* @description 重写redirect方法
* @param url 地址
* @return 页面
*/ 
Response.prototype.redirect = function(url){
    console.log("response.redirect info....");
    return this.originalRes.redirect(url);
};

module.exports = Response;