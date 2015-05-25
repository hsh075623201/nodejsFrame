/**
* 角色操作文件
*/
var UsergroupCmd = function(){
	this.usergroupService = null;
};

/**  
* @description 分页显示
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.pagination = function(req,res){

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

    this.usergroupService.pagination(obj,query,function(error,result){
        return res.json(error,result);
    })
};

/**  
* @description 新增用户组
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.add = function(req,res){

	var obj = JSON.parse(req.body.params);
	obj.createUsername = req.session.user.username;
    obj.code = "usergroup_"+obj.code;
    this.usergroupService.add(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 获取用户组
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.getUsergroup = function(req,res){
    var obj = {
        "_id":req.param("_id")
    }
    this.usergroupService.getUsergroup(obj,function(error,result){
        return res.json(error,result);
    })
}

/**  
* @description 更新
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.update = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.usergroupService.update(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 删除 
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.delete = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.usergroupService.delete(obj,function(error,result){
        return res.json(error,result);
    })
}

/**  
* @description 新增资源
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.addResource = function(req,res){
    var obj = JSON.parse(req.body.params);
    var query = {
        "_id":obj._id
    }
    var resource = obj.resource;
    this.usergroupService.addResource(query,resource,function(error,result){
        return res.json(error,result);
    })
}

/**  
* @description 获取已添加用户 Table 
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.getAddedUser = function(req,res){

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

    this.usergroupService.getAddedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 获取需添加用户 Table
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.getNeedUser = function(req,res){
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

    this.usergroupService.getNeedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 添加用户
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.addUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.usergroupService.addUser(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 删除用户
* @param req
* @param res
* @return json
*/ 
UsergroupCmd.prototype.deleteUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.usergroupService.deleteUser(obj,function(error,result){
        return res.json(error,result);
    })
}
module.exports = UsergroupCmd;