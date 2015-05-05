/**
* 角色信息处理文件
*/
var mongoose = require('../../../../../../lib/db/mongodb.js');
var RoleSchema = require('../../domain/roleModel.js').RoleSchema;
var Role = mongoose.model('role', RoleSchema);

var RoleService = function() {
	this.userService = null;
};

//验证是否已存在编码或名称
RoleService.prototype.validate = function(filter,callback){
	Role.find(filter,callback);
}
//新增角色
RoleService.prototype.add = function(obj,callback){
	var _this = this;
	var filter = {$or:[{"name":obj.name},{"_id":obj._id}]};
	this.validate(filter,function(error,doc){
		if(error){
			return callback(error);
		}else{
			if(doc.length>0){
				return callback("该角色名称或编码已存在！");
			}else{
				_this.save(obj,callback);
			}
		}
	});
};
//保存
RoleService.prototype.save = function(obj,callback){
	var newRole = new Role(obj);
	newRole.save(callback);
};
//分页
RoleService.prototype.pagination = function(obj,query,callback){
	
	Role.count(query).exec(function(err,count){
        if (err){
            return callback(err,null);
        }else{
            Role.find(query).skip(obj.iDisplayStart)
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
//获取角色信息
RoleService.prototype.getRole = function(query,callback){
	Role.find(query,callback)
}
//更新角色
RoleService.prototype.update = function(obj,callback){
	Role.update({"_id":obj._id},{$set:obj},callback);
}
//删除 TODO用户中的角色信息
RoleService.prototype.delete = function(obj,callback){
	var _this = this;
	Role.remove(obj,function(err,doc){
		if(err){
			return callback(err);
		}
		//删除用户中的角色信息
		_this.userService.deleteUser(obj,"roleArr",function(err,doc){
			return callback(err,doc);
		})
		//删除权限表中的信息 TODO
		//删除缓存中的角色信息TODO
        
    })
}
//获取已添加用户
RoleService.prototype.getAddedUser = function(obj,query,callback){
	this.userService.getAllocationInfo(obj,query,"roleArr",callback);
}
//获取需添加的用户
RoleService.prototype.getNeedUser = function(obj,query,callback){
	this.userService.getNeedUser(obj,query,"roleArr",callback);
}
//添加用户
RoleService.prototype.addUser = function(obj,callback){
	this.userService.addUser(obj,"roleArr",callback);
}
//删除用户
RoleService.prototype.deleteUser = function(obj,callback){
	this.userService.deleteUser(obj,"roleArr",callback);
}
//新增资源
RoleService.prototype.addResource = function(query,obj,callback){
	//全部删除数据
	Role.update(query,{$unset:{"menus":1,"components":1,"urls":1}},function(error,doc){
		if(error){
			return callback(error);
		}
		//新增
		Role.update(query,{$addToSet:{"menus":{$each:obj.menu},"components":{$each:obj.component},"urls":{$each:obj.url}}},function(error,doc){
			return callback(error,doc);
		})
	})
	
}
module.exports = RoleService;