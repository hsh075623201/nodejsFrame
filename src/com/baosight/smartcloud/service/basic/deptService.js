
var mongoose = require('../../../../../../lib/db/mongodb.js');
var DeptSchema = require('../../domain/deptModel.js').DeptSchema;
var Dept = mongoose.model('dept', DeptSchema);
var DeptService = function() {
};
//获取部门信息
DeptService.prototype.getDept = function(query,callback){
	Dept.find(query,callback);
}
//新增
DeptService.prototype.add = function(obj,callback){
	var _this = this;
	_this.getDept({"code":obj.code},function(error,doc){
		if(error){
			return callback(error);
		}
		if(doc&&doc.length>0){
			return callback("此编码已存在，请重新输入！");
		}
		_this.save(obj,function(error,doc){
			return callback(error,doc);
		})
	})
}
//保存
DeptService.prototype.save = function(obj,callback){
	var DeptNew = new Dept(obj);
	DeptNew.save(callback);
}

module.exports = DeptService;