
/**
* 资源操作文件
*/
var ResourceCmd = function(){
	this.resourceService = null;
};
/**  
* @description 获取资源 
* @param req
* @param res
* @return json
*/ 
ResourceCmd.prototype.getResource = function(req,res){
	var obj = {} ;
	this.resourceService.getResource(obj,function(error,result){
		return res.json(error,result);
	})
}

module.exports = ResourceCmd;