/**
* 缓存操作文件
*/
var RedisCmd = function(){
	this.redisService = null;
};
/**  
* @description 根据用户名加载权限
* @param req
* @param res
*/ 
RedisCmd.prototype.load = function(req,res){
	var username = req.session.user.username;
	this.redisService.load(username);
}
/**  
* @description 根据用户名获取权限信息
* @param req
* @param res
*/ 
RedisCmd.prototype.getAuthorize = function(req,res){
	var username = req.session.user.username;
	var type = req.param("type");//哪种权限信息 url menu component
	this.redisService.getAuthorize(username,type,function(error,result){
		return res.json(error,result);
		
	})
}
/**  
* @description 检查菜单权限
* @param req
* @param res
* @return boolean
*/ 
RedisCmd.prototype.checkMenu = function(req,res){
	var username = req.session.user.username;

}
/**  
* @description 检查组件权限
* @param req
* @param res
* @return boolean
*/ 
RedisCmd.prototype.checkComponent = function(req,res){
	var username = req.session.user.username;

}
/**  
* @description 检查url权限
* @param path 路径
* @param callback 回调函数
*/ 
RedisCmd.prototype.checkUrl = function(path,callback){
	var username = req.session.user.username;
	return callback(error,true);
}

module.exports = RedisCmd;