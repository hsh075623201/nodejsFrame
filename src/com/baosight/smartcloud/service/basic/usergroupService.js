/**
* 用户组操作
*/
var mongoose = require('../../../../../../lib/db/mongodb.js');
var UsergroupSchema = require('../../domain/usergroupModel.js').UsergroupSchema;
var Usergroup = mongoose.model('usergroup', UsergroupSchema);

var UsergroupService = function() {
	this.userService = null;
};

/**  
* @description 分页 
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UsergroupService.prototype.pagination = function(obj,query,callback){
	
	Usergroup.count(query).exec(function(err,count){
        if (err){
            return callback(err,null);
        }else{
            Usergroup.find(query).skip(obj.iDisplayStart)
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
};

/**  
* @description 验证是否已存在编码或名称 
* @param query 查询条件
* @param callback 回调函数
*/
UsergroupService.prototype.validate = function(query,callback){
	Usergroup.find(query,callback);
}

/**  
* @description 新增用户组 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.add = function(obj,callback){
	var _this = this;
	var filter = {$or:[{"name":obj.name},{"code":obj.code}]};
	this.validate(filter,function(error,doc){
		if(error){
			return callback(error);
		}else{
			if(doc.length){
				return callback("该用户组名称或编码已存在！");
			}else{
				_this.save(obj,callback);
			}
		}
	});
};
/**  
* @description 保存 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.save = function(obj,callback){
	var newUsergroup = new Usergroup(obj);
	newUsergroup.save(callback);
};

/**  
* @description 获取用户组信息 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.getUsergroup = function(obj,callback){
	Usergroup.find(obj,callback);
};
/**  
* @description 更新 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.update = function(obj,callback){
	Usergroup.update({"_id":obj._id},{$set:obj},callback);
}
/**  
* @description 删除 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.delete = function(obj,callback){
	var _this = this;
	Usergroup.remove(obj,function(err,doc){
		if(err){
			return callback(err);
		}
		//删除用户中的角色信息
		_this.userService.deleteUser(obj,"usergroupArr",function(err,doc){
			return callback(err,doc);
		})
		//删除权限表中的信息 TODO
		//删除缓存中的角色信息TODO
        
    })
}

/**  
* @description 新增资源 
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UsergroupService.prototype.addResource = function(query,obj,callback){
	//全部删除数据
	Usergroup.update(query,{$unset:{"menus":1,"components":1,"urls":1}},function(error,doc){
		if(error){
			return callback(error);
		}
		//新增
		Usergroup.update(query,{$addToSet:{"menus":{$each:obj.menu},"components":{$each:obj.component},"urls":{$each:obj.url}}},function(error,doc){
			return callback(error,doc);
		})
	})
	
}
/**  
* @description 获取已添加用户 
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UsergroupService.prototype.getAddedUser = function(obj,query,callback){
	this.userService.getAllocationInfo(obj,query,"usergroupArr",callback);
}
/**  
* @description 获取需添加的用户 
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UsergroupService.prototype.getNeedUser = function(obj,query,callback){
	this.userService.getNeedUser(obj,query,"usergroupArr",callback);
}
/**  
* @description 添加用户 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.addUser = function(obj,callback){
	this.userService.addUser(obj,"usergroupArr",callback);
}
/**  
* @description 删除用户 
* @param obj 参数对象
* @param callback 回调函数
*/
UsergroupService.prototype.deleteUser = function(obj,callback){
	this.userService.deleteUser(obj,"usergroupArr",callback);
}
module.exports = UsergroupService;