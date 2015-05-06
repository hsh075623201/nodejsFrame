/**
* 角色操作文件
*/
var RoleCmd = function(){
	this.roleService = null;
};
/**  
* @description 新增角色 
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.add = function(req,res){

	var obj = JSON.parse(req.body.params);
	obj.createUsername = req.session.user.username;
    obj.code = "role_"+obj.code;
    this.roleService.add(obj,function(error,result){
        return res.json(error,result);
    })
}

/**  
* @description 分页显示 
* @param req
* @param res
* @return json
*/ 
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

/**  
* @description 获取角色信息 
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.getRole = function(req,res){
    var obj = {
        "_id" : req.param("_id")
    }
    this.roleService.getRole(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 更新角色信息 
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.update = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.update(obj,function(error,result){
        return res.json(error,result);
    })
};
/**  
* @description 删除 
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.delete = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.delete(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 获取已添加用户 Table 
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.getAddedUser = function(req,res){

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
    var query = JSON.parse(params);

     var obj = {
        "iDisplayStart":iDisplayStart,
        "iDisplayLength":iDisplayLength,
        "sort":sortFlag+mSortDataProp,
        "sEcho":sEcho
    };

    this.roleService.getAddedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 获取需添加用户 Table
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.getNeedUser = function(req,res){
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
    var query = JSON.parse(params);

     var obj = {
        "iDisplayStart":iDisplayStart,
        "iDisplayLength":iDisplayLength,
        "sort":sortFlag+mSortDataProp,
        "sEcho":sEcho
    };

    this.roleService.getNeedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 添加用户
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.addUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.addUser(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 删除用户
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.deleteUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.roleService.deleteUser(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 新增资源
* @param req
* @param res
* @return json
*/ 
RoleCmd.prototype.addResource = function(req,res){
    var obj = JSON.parse(req.body.params);
    var query = {
        "_id":obj.id
    }
    var resource = obj.resource;
    this.roleService.addResource(query,resource,function(error,result){
        return res.json(error,result);
    })
}

module.exports = RoleCmd;