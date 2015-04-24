/**
 * Created by HSH on 14-６-18.
 */
var crypto = require('crypto');
var mongoose = require('../../../../../../lib/db/mongodb.js');
var UserSchema = require('../../domain/userModel.js').UserSchema;
var User = mongoose.model('user', UserSchema);

var UserService = function() {
};

//是否是管理员 TODO
UserService.prototype.isAdmin = function(username,callback){
	if(username=="admin"){
		return callback(null,true);
	}else{
		return callback(null,false);
	}
}
//加密
UserService.prototype.parsePwd = function(pwd){
	return crypto.createHash('md5').update(pwd).digest('base64');
}
//获取用户信息
UserService.prototype.getUser = function(obj,callback){
	var filter = obj;
	if(filter.hasOwnProperty("password")){
		filter.password = this.parsePwd(filter.password);
	}
	User.find(filter,function(err,doc){
        return callback(err,doc);
    })
};

//新增
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
				_this.save(obj,function(error,doc){
					return callback(error,doc);
				})
			}
		}
	})
};
//保存用户
UserService.prototype.save = function(obj,callback){
	var newUser = new User(obj);
	newUser.save(function(error,doc){
		return callback(error,doc);
	})
};
//分页
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
//获取用户的角色或部门等信息
UserService.prototype.getAllocationInfo = function(_id,allocation,callback){
	
	User.find().populate(allocation).exec(function (err, doc) {
		if(err){
			return callback(err);
		}
		var tempVal = [];
        for(var i=0,len=doc.length;i<len;i++){
             for(var j=0,subLen=doc[i][allocation].length;j<subLen;j++){
                 if(doc[i][allocation][j]._id==_id){
                     tempVal.push(doc[i]._id);
                     break;
                 }
             }
         }
        User.find({"_id":{$in:tempVal}},function(err,doc){
            return callback(err,doc);
        })
     })
}

module.exports = UserService;