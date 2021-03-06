/**
* 部门操作
*/
var DeptCmd = function(){
	this.deptService = null;
};

/**  
* @description 新增 
* @param req
* @param res
* @return json
*/ 

DeptCmd.prototype.add = function(req,res){
	var obj = JSON.parse(req.body.params);
	obj.createUsername = req.session.user.username;
    obj.code = "dept_"+obj.code;
    this.deptService.add(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 获取部门信息 
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.getDept = function(req,res){
    var code = req.param("code");
    var query = {};
    if(code){
        query.code = code;
    }
	this.deptService.getDept(query,function(error,result){
		return res.json(error,result);
	})
}
/**  
* @description 删除部门信息 
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.delete = function(req,res){
	var obj = JSON.parse(req.body.params);
	this.deptService.delete(obj,function(error,result){
		return res.json(error,result);
	})
}
/**  
* @description 获取已添加用户 Table
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.getAddedUser = function(req,res){

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

    this.deptService.getAddedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}

/**  
* @description 获取需添加用户 Table
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.getNeedUser = function(req,res){
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

    this.deptService.getNeedUser(obj,query,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 添加用户 
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.addUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.deptService.addUser(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 删除用户 
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.deleteUser = function(req,res){
    var obj = JSON.parse(req.body.params);
    this.deptService.deleteUser(obj,function(error,result){
        return res.json(error,result);
    })
}
/**  
* @description 新增资源 
* @param req
* @param res
* @return json
*/ 
DeptCmd.prototype.addResource = function(req,res){
    var obj = JSON.parse(req.body.params);
    var query = {
        "code":obj.code
    }
    var resource = obj.resource;
    this.deptService.addResource(query,resource,function(error,result){
        return res.json(error,result);
    })
}
module.exports = DeptCmd;