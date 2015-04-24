define(["util","common/component","jquery.validform"],function (util,component) {

	var url = "smartcloud/config/app.json";
	//页面初始化 列表显示
	var init = function(params){
		
	};
	//新增角色页面显示
	var addDept function(){
		util.slidePage("dept.add",url);
	};
	//新增角色操作
	var addDeptCtrl = function(){
		var $form = $("#addDeptForm");
		$form.Validform({
		 	tiptype:3,
        	label:".label",
        	showAllError:true,
        	callback:function(form){
        		var jsonForm = component.toJsonObject($form);
        		util.post("/smartcloudServer/basic/dept/add",jsonForm,function(ret){
        			component.message("保存成功","success");
        		})
        		util.slideHide();
        		return false;
        	}
		 });
	};
	
	
	//删除角色
	var deleteRole = function(){
		
	};
	

	return {
		init:init,
		
	}
	
});