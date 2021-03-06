/**
 * 用户操作
 */
var crypto = require('crypto');
var mongoose = require('../../../../../../lib/db/mongodb.js');
var UserSchema = require('../../domain/userModel.js').UserSchema;
var User = mongoose.model('user', UserSchema);

var UserService = function() {
};

/**  
* @description 是否是管理员 
* @param username 用户名
* @param callback 回调函数
*/
UserService.prototype.isAdmin = function(username,callback){
	if(username=="admin"){
		return callback(null,true);
	}else{
		return callback(null,false);
	}
}
/**  
* @description 加密 
* @param pwd 加密字符串
*/
UserService.prototype.parsePwd = function(pwd){
	return crypto.createHash('md5').update(pwd).digest('base64');
}
/**  
* @description 获取用户信息 
* @param obj 参数对象
* @param callback 回调函数
*/
UserService.prototype.getUser = function(obj,callback){
	var filter = obj;
	if(filter.hasOwnProperty("password")){
		filter.password = this.parsePwd(filter.password);
	}
	User.find(filter,callback);
};

/**  
* @description 新增 
* @param obj 参数对象
* @param callback 回调函数
*/
UserService.prototype.add = function(obj,callback){
	var _this = this;
	_this.getUser({"username":obj.username},function(error,doc){
		if(error){
			return callback(error);
		}else{
			if(doc.length>0){
				return callback("该用户已存在！");
			}else{
				if(obj.hasOwnProperty("password")){
					obj.password = _this.parsePwd(obj.password);
				}
				_this.save(obj,callback);
			}
		}
	})
};
/**  
* @description 保存用户 
* @param obj 参数对象
* @param callback 回调函数
*/
UserService.prototype.save = function(obj,callback){
	var newUser = new User(obj);
	newUser.save(callback);
};
/**  
* @description 分页 
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UserService.prototype.pagination = function(obj,query,callback){
	
	User.count(query).exec(function(err,count){
        if (err){
            return callback(err,null);
        }else{
            User.find(query).skip(obj.iDisplayStart)
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
* @description 删除用户 
* @param obj 参数对象
* @param callback 回调函数
*/
UserService.prototype.delete = function(obj,callback){
	User.remove(obj,callback);
}
/**  
* @description 更新 
* @param obj 参数对象
* @param callback 回调函数
*/
UserService.prototype.update = function(obj,callback){
	User.update({"username":obj.username},{$set:obj},callback);
}

/**  
* @description 获取用户的角色或部门等信息 
* @param obj 参数对象
* @param params 参数对象
* @param allocation 分配对象 角色 部门
* @param callback 回调函数
*/
UserService.prototype.getAllocationInfo = function(obj,params,allocation,callback){
	var query = "";
	if(allocation == "roleArr"){
		query = {"roleArr":params._id};
	}else if(allocation == "deptArr"){
		query = {"deptArr":params._id};
	}else if(allocation == "usergroupArr"){
		query = {"usergroupArr":params._id};
	}
	this.pagination(obj,query,callback);
}
/**  
* @description 获取需要添加用户信息 
* @param obj 参数对象
* @param params 参数对象
* @param allocation 分配对象 角色 部门
* @param callback 回调函数
*/
UserService.prototype.getNeedUser = function(obj,params,allocation,callback){
	var query = "";
	if(allocation == "roleArr"){
		query = {"roleArr":{$ne:params._id}};
	}else if(allocation == "deptArr"){
		query = {"deptArr":{$ne:params._id}};
	}else if(allocation == "usergroupArr"){
		query = {"usergroupArr":{$ne:params._id}};
	}
	this.pagination(obj,query,callback);
};
/**  
* @description 为角色 部门 添加新用户 
* @param obj 参数对象
* @param allocation 分配对象 角色 部门
* @param callback 回调函数
*/
UserService.prototype.addUser = function(obj,allocation,callback){
	var query = {"username":{$in:obj.username}};
	var add = "";
	if(allocation =="roleArr"){
		add = {"roleArr":obj._id};
	}else if(allocation == "deptArr"){
		add = {"deptArr":obj._id};
	}else if(allocation == "usergroupArr"){
		add = {"usergroupArr":obj._id};
	}

	User.update(query,{$addToSet:add}, {multi : true },callback);
}
/**  
* @description 为角色 部门删除已分配的用户
* @param obj 参数对象
* @param allocation 分配对象 角色 部门
* @param callback 回调函数
*/
UserService.prototype.deleteUser = function(obj,allocation,callback){
	var query = "";
	if(obj.username){
		query = {"username":obj.username};
	}else{
		query = {};
	}
	var del = "";
	if(allocation == "roleArr"){
		del = {"roleArr":obj._id};
	}else if(allocation == "deptArr"){
		del = {"deptArr":obj._id};
	}else if(allocation == "usergroupArr"){
		del = {"usergroupArr":obj._id};
	}
	User.update(query,{$pull:del},{multi:true},callback);
}
/**  
* @description 新增资源
* @param obj 参数对象
* @param query 查询条件
* @param callback 回调函数
*/
UserService.prototype.addResource = function(query,obj,callback){
	//全部删除数据
	User.update(query,{$unset:{"menus":1,"components":1,"urls":1}},function(error,doc){
		if(error){
			return callback(error);
		}
		//新增
		User.update(query,{$addToSet:{"menus":{$each:obj.menu},"components":{$each:obj.component},"urls":{$each:obj.url}}},function(error,doc){
			return callback(error,doc);
		})
	})
}
/**  
* @description 获取所有资源 包括其所属组织的资源
* @param query 查询条件
* @param callback 回调函数
*/
UserService.prototype.getAllResource = function(query,callback){
	User.find(query).populate(["deptArr","roleArr","usergroupArr"]).exec(callback);
}
module.exports = UserService;