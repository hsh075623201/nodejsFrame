
/**
* 部门信息处理文件
*/
var mongoose = require('../../../../../../lib/db/mongodb.js');
var DeptSchema = require('../../domain/deptModel.js').DeptSchema;
var Dept = mongoose.model('dept', DeptSchema);
var DeptService = function() {
	this.userService = null;
};
//获取部门信息
DeptService.prototype.getDept = function(query,callback){
	Dept.find(query).sort({name:1}).exec(callback);
}
//新增
DeptService.prototype.add = function(obj,callback){
	var _this = this;
	_this.getDept({"code":obj.code},function(error,doc){
		if(error){
			return callback(error);
		}
		if(doc&&doc.length>0){
			return callback("此编码已存在，请重新输入！");
		}
		_this.save(obj,function(error,doc){
			return callback(error,doc);
		})
	})
}
//保存
DeptService.prototype.save = function(obj,callback){
	var DeptNew = new Dept(obj);
	DeptNew.save(callback);
}
//删除部门信息
DeptService.prototype.delete = function(obj,callback){
	var _this = this;
	Dept.remove(obj,function(err,doc){
		if(err){
			return callback(err);
		}
		//删除用户中的角色信息
		_this.userService.deleteUser(obj,"deptArr",function(err,doc){
			return callback(err,doc);
		})
		//删除权限表中的信息 TODO
		//删除缓存中的角色信息TODO
        
    })
}
//获取已添加用户
DeptService.prototype.getAddedUser = function(obj,query,callback){
	this.userService.getAllocationInfo(obj,query,"deptArr",callback);
}
//获取需添加的用户
DeptService.prototype.getNeedUser = function(obj,query,callback){
	this.userService.getNeedUser(obj,query,"deptArr",callback);
}
//添加用户
DeptService.prototype.addUser = function(obj,callback){
	this.userService.addUser(obj,"deptArr",callback);
}
//删除用户
DeptService.prototype.deleteUser = function(obj,callback){
	this.userService.deleteUser(obj,"deptArr",callback);
}
//新增资源
DeptService.prototype.addResource = function(query,obj,callback){
	//全部删除数据
	Dept.update(query,{$unset:{"menus":1,"components":1,"urls":1}},function(error,doc){
		if(error){
			return callback(error);
		}
		//新增
		Dept.update(query,{$addToSet:{"menus":{$each:obj.menu},"components":{$each:obj.component},"urls":{$each:obj.url}}},function(error,doc){
			return callback(error,doc);
		})
	})
	
}
module.exports = DeptService;