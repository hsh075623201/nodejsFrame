/**
 * Created by xuzhengchao on 14-4-30.
 */
var BSON = require('../../../../../node_modules/mongoose/node_modules/mongodb/lib/mongodb/index').BSONPure;
/**
 * 分页
 * @param Model
 * @param params
 * @param req
 * @param callback
 */
exports.getPaginate= function(Model,params,req,callback){
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
    var query={};
    if( !params.ignoreParmas){
        for(var attr in params){
            if(attr=="MenuStatus"){
                query["MenuStatus"]=params[attr];
            }else if(attr=="state"){
                 query["state"]=params[attr];
            }else if(attr=="assignUser"){
                query["assignUser"]=BSON.ObjectID.createFromHexString(params[attr]);
            }else if(attr=="typeArr"){
                if(params[attr]){
                    query["typeArr"]=params[attr];
                }else{
                    continue;
                }
            }else if(attr=="isRead"){
                if(params[attr]){
                    query["isRead"]=params[attr];
                }else{
                    continue;
                }
            }else{
                query[attr]=new RegExp(params[attr]);//模糊查询参数
            }
        }
    }


    // Query Mongo for Users, just get back the question text

    var queryCount = Model.count(query);
    if("id" in params){
        queryCount = Model.count({"_id":params["id"]});
    }
    if("accessId" in params){
        queryCount = Model.count({"_id":{$in:params["accessId"]}});
    }
    if("accessDeptId" in params){
        queryCount = Model.count({"deptArr":params["accessDeptId"]});
    }
    if("accessUserGroupId" in params){
        queryCount = Model.count({"userGroupArr":params["accessUserGroupId"]});
    }

    queryCount.exec(function(err,count){
        if (err){
            console.log("err...");
        }else{
            console.error("db query count:"+count);
            var queryResult = Model.find(query).populate('typeArr');

            if("accessId" in params){
                queryResult = Model.find({"_id":{$in:params["accessId"]}});
            }
            if("accessDeptId" in params){
                queryResult = Model.find({"deptArr":params["accessDeptId"]});
            }

            if("accessUserGroupId" in params){
                queryResult = Model.find({"userGroupArr":params["accessUserGroupId"]});
            }
            if("id" in params){
                queryResult = Model.find({"_id":params["id"]});
            }

            queryResult.skip(iDisplayStart)
                .limit(iDisplayLength)
                .sort(sortFlag+mSortDataProp)
                .exec(function(error, data) {
                    var result = {};
                    result.sEcho=sEcho;
                    result.iTotalRecords=count;
                    result.iTotalDisplayRecords=count;//data.Count(),
                    result.iDisplayStart = iDisplayStart;
                    result.aaData = data;
                    callback(result);
                });
        }
    })
};

/**
 * 根据code分页
 * @param Model
 * @param query
 * @param req
 * @param callback
 */
exports.getPaginateByCodes= function(Model,query,req,callback){
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

    var queryCount = Model.count(query);
    queryCount.exec(function(err,count){
        if (err){
            console.log("err...");
        }else{
            console.error("db query count:"+count);
            var queryResult = Model.find(query);

            queryResult.skip(iDisplayStart)
                .limit(iDisplayLength)
                .sort(sortFlag+mSortDataProp)
                .exec(function(error, data) {
                    var result = {};
                    result.sEcho=sEcho;
                    result.iTotalRecords=count;
                    result.iTotalDisplayRecords=count;
                    result.iDisplayStart = iDisplayStart;
                    result.aaData = data;
                    callback(result);
                });
        }
    })
};
