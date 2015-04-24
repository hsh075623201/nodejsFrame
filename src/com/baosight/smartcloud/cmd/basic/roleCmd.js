var RoleCmd = function(){
	this.roleService = null;
};
//新增角色
RoleCmd.prototype.add = function(req,res){

	var obj = JSON.parse(req.body.params);
	obj.createUsername = req.session.user.username;
    this.roleService.add(obj,function(error,result){
        return res.json(error,result);
    })
}

//分页显示
RoleCmd.prototype.pagination = function(req,res){

    var sEcho = req.param("sEcho");
    var iDisplayStart = req.param("iDisplayStart");
    var iDisplayLength = req.param("iDisplayLength");
    var iSortCol_0 = req.param("iSortCol_0");
    var mSortDataProp = req.param("mDataProp_"+iSortCol_0);
    var sortType = req.param("sSortDir_0");
    var sortFlag = "-";
    if(sortType == "asc"){
        sortFlag = "-";
    }else if(sortType == "desc"){
        sortFlag = "";
    }
    var params = req.param("params");
    var query={};
    if(params){
        var jsonObj = JSON.parse(params);
        for(var attr in jsonObj){
            query[attr]=new RegExp(jsonObj[attr]);//模糊查询参数
        }
    }
    var obj = {
        "iDisplayStart":iDisplayStart,
        "iDisplayLength":iDisplayLength,
        "sort":sortFlag+mSortDataProp,
        "sEcho":sEcho
    };

    this.roleService.pagination(obj,query,function(error,result){
        return res.json(error,result);
    })
};
//获取角色信息
RoleCmd.prototype.getRole = function(req,res){
    var obj = {
        "code" : req.param("code")
    }
    this.roleService.getRole(obj,function(error,result){
        return res.json(error,result);
    })
}
//更新角色信息
RoleCmd.prototype.update = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.update(obj,function(error,result){
        return res.json(error,result);
    })
};
//删除
RoleCmd.prototype.delete = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.delete(obj,function(error,result){
        return res.json(error,result);
    })
}
//获取用户
RoleCmd.prototype.getUser = function(req,res){
    var obj = {
        "code":req.param("code")
    }
    this.roleService.getUser(obj,function(error,result){
        console.log(result);
        return res.json(error,result);
    })
}


module.exports = RoleCmd;