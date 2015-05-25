/**
 * 认证中心操作
 */
var mongoose = require('../../../../../../lib/db/mongodb.js');
var AuthorizeSchema = require('../../domain/authorizeModel.js').AuthorizeSchema;
var authorize = mongoose.model('authorize', AuthorizeSchema);

var AuthorizeService = function() {
	
};
/**  
* @description 认证列表
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
AuthorizeService.prototype.pagination = function(obj,query,callback){
	authorize.count(query).exec(function(err,count){
        if (err){
            return callback(err,null);
        }else{
            authorize.find(query).skip(obj.iDisplayStart)
                .limit(obj.iDisplayLength)
                .sort(obj.sort)
                .exec(function(error, data) {
                    var result = {};
                    result.sEcho=obj.sEcho;
                    result.iTotalRecords=count;
                    result.iTotalDisplayRecords=count;
                    result.iDisplayStart = obj.iDisplayStart;
                    result.aaData = data;
                    return callback(error,result);
                });
        }
    });
}
/**  
* @description 查询 
* @param obj 查询条件
* @param callback 回调函数
*/
AuthorizeService.prototype.query = function(obj,callback){
    authorize.find(obj,callback);
}
/**  
* @description 新增 
* @param obj 参数对象
* @param callback 回调函数
*/
AuthorizeService.prototype.add = function(obj,callback){
    var _this = this;
    _this.query({"name":obj.name},function(error,doc){
        if(error){
            return callback(error);
        }else{
            if(doc.length){
                return callback("该应用名称已存在！");
            }else{
                
                _this.save(obj,callback);
            }
        }
    })
}
/**  
* @description 保存 
* @param obj 参数对象
* @param callback 回调函数
*/
AuthorizeService.prototype.save = function(obj,callback){
    var newObj = new authorize(obj);
    newObj.save(callback);
}
/**  
* @description 更新
* @param obj 更新条件
* @param obj 更新信息
* @param callback 回调函数
*/
AuthorizeService.prototype.update = function(query,obj,callback){
    authorize.update(query,{$set:obj},callback);
}

module.exports = AuthorizeService;