var HelloCmd = function(){
	this.helloService = null;
};
//自定义模板
HelloCmd.prototype.index = function(req,res){
    return res.render("helloIndex");
};

HelloCmd.prototype.hello = function(req,res){
	var obj = {
		"name":req.param("name")
	}
	this.helloService.hello(obj,function(error,result){
		return res.json(error,result);
	})
}

module.exports = HelloCmd;