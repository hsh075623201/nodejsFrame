/**
* 缓存信息处理文件
*/
var redisClient = require("../../../../../../lib/db/redis");
var RedisService = function() {
	this.userService = null;
	this.roleService = null;
	this.deptService = null;
};

/**  
* @description 根据用户名加载权限至缓存
* @param req
* @param res
*/ 
RedisService.prototype.load = function(username){
	var _this = this;
	this.userService.getAllResource({"username":username},function(error,doc){
		var userObj = doc[0];
		var resource = [];
		resource = resource.concat(userObj.menus).concat(userObj.components).concat(userObj.urls);
		var roles = userObj.roleArr;
		for(var i=0,len=roles.length;i<len;i++){
			resource = resource.concat(roles[i].menus).concat(roles[i].components).concat(roles[i].urls);
		}
		var depts = userObj.deptArr;
		var deptCodes = [];//记录codes 为获取所有上级目录的通用权限
		for(var i=0,len=depts.length;i<len;i++){
			deptCodes.push(depts[i].pCode);
			resource = resource.concat(depts[i].menus).concat(depts[i].components).concat(depts[i].urls);
		}
		//获取所有的部门信息 
		_this.deptService.getDept({},function(error,doc){
			for(var i=0,len=deptCodes.length;i<len;i++){
				resource = resource.concat(_this.tailRescuvie(doc,deptCodes[i],[]));
			}
			//第一个空间中查询
			redisClient.select(0,function(){
				redisClient.del(username,function(err,reply){
					if(err){
						throw err;
					}
				    if(resource.length>0){
						redisClient.SADD(username,resource);//放入redis缓存
					}
				})
			});

			/*redisClient.del(username,function(err,reply){
				if(err){
					throw err;
				}

				if(resource.length>0){
					redisClient.SADD(username,resource);//放入redis缓存
				}
			    

			    if(resource.length>0){
					redisClient.SADD(username,resource);//放入redis缓存
				}

			})
*/
			

		})
		

	})
}
/**  
* @description 尾递归获取codes
* @param depts 部门所有信息
* @param code 查询code条件
* @param codes 存放值的数组
* @return codes Array
*/ 
RedisService.prototype.tailRescuvie = function(depts,code,codes){
	for(var i=0,len=depts.length;i<len;i++){
		if(depts[i].code == code){
			codes = codes.concat(depts[i].menus).concat(depts[i].components).concat(depts[i].urls);
			if(depts[i].pCode == "dept_root"){
				return codes;
			}else{
				return this.tailRescuvie(depts,depts[i].pCode,codes);
			}
		}
	}
}
/**  
* @description 获取权限列表
* @param username 用户名
* @param type 类型  menu url component
* @param callback 回调函数
*/ 
RedisService.prototype.getAuthorize = function(username,type,callback){
	redisClient.select(0,function(){
		redisClient.SMEMBERS(username,function(error,doc){
			if(type){
				var match = new RegExp('^'+type+'_.+$');
				var ret = [];
				for(var i=0;i<doc.length;i++){
		            if(match.test(doc[i])){
		                ret.push(doc[i]);
		            }
		        }
		        return callback(error,ret);
			}else{
				return callback(error,doc);
			}
		});
	});
	
}
/**  
* @description 认证授权code保存
* @param code 生成的code
* @param callback 回调函数
*/ 
RedisService.prototype.addCode = function(code,callback){
	//放入第二个空间内
	redisClient.select(1,function(){
		redisClient.set(code,code,function(err,reply){
			redisClient.expire(code, 60*5);
			return callback(err,reply);
		})
	});
}
/**  
* @description 获取认证授权code
* @param callback 回调函数
*/ 
RedisService.prototype.getCode = function(code,callback){
	//放入第二个空间内
	redisClient.select(1,function(){
		redisClient.get(code,function(err,reply){
			return callback(err,reply);
		})
	});
}
module.exports = RedisService;