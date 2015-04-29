var DeptCmd = function(){
	this.deptService = null;
};
//新增
DeptCmd.prototype.add = function(req,res){
	var obj = JSON.parse(req.body.params);
	obj.createUsername = req.session.user.username;
    this.deptService.add(obj,function(error,result){
        return res.json(error,result);
    })
}
//获取部门信息
DeptCmd.prototype.getDept = function(req,res){
	var query = {};
	this.deptService.getDept(query,function(error,result){
		return res.json(error,result);
	})
}

DeptCmd.prototype.update = function(req,res){
	
}

module.exports = DeptCmd;