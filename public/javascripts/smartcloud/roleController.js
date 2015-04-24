define(["util","common/component","jquery.validform"],function (util,component) {

	var url = "smartcloud/config/app.json";
	//页面初始化 列表显示
	var init = function(params){
		var params = params||{};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/role/pagination?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "code",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (code) {
			                return component.getTableRadio(code);
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "name"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "code", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "createUsername" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "DateTime" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "desc" }
        		]
		};
		
		component.renderDataTable("#role-table",config);
	};
	//新增角色页面显示
	var addRole = function(){
		util.slidePage("role.add",url);
	};
	//新增角色操作
	var addRoleCtrl = function(){
		var $form = $("#addRoleForm");
		$form.Validform({
		 	tiptype:3,
        	label:".label",
        	showAllError:true,
        	callback:function(form){
        		var jsonForm = component.toJsonObject($form);
        		util.post("/smartcloudServer/basic/role/add",jsonForm,function(ret){
        			component.message("保存成功","success");
        		})
        		util.slideHide();
        		return false;
        	}
		 });
	};
	//查询角色页面显示
	var queryRole = function(){
		util.slidePage("role.query",url);
	};
	//查询角色操作
	var queryRoleCtrl = function(){
		var $form = $("#queryRoleForm");
		$form.Validform({
		 	tiptype:3,
        	label:".label",
        	showAllError:true,
        	callback:function(form){
        		var jsonForm = component.toJsonObject($form);
        		init(jsonForm);
        		util.slideHide();
        		return false;
        	}
		 });
	};
	//编辑角色页面显示
	var  editRole = function(){
		var code = component.getTableRadioVal("#role-table");
		if(code){
			util.slidePage("role.edit",url);
		}else{
			component.alert("请选择需要编辑的角色！");
		}
		
	};
	//编辑页面操作
	var editRoleCtrl = function(){
		var code = component.getTableRadioVal("#role-table");
		util.get("/smartcloudServer/basic/role/getRole",{"code":code},function(result){
			component.renderForm("#editRoleForm",result[0]);
			var $form = $("#editRoleForm");
			$form.Validform({
	            tiptype:3,
	            label:".label",
	            showAllError:true,
	            callback:function(form){
	                //更新数据
	                var jsonForm = component.toJsonObject($form);
	                util.post("/smartcloudServer/basic/role/update",jsonForm,function(result){
	                	component.message("更新成功","success");
	                	init();//重新初始化
	                })
	                util.slideHide();
	                return false;
	            }
			})
		});
	}
	//删除角色
	var deleteRole = function(){
		var code = component.getTableRadioVal("#role-table");
		if(code){
			util.post("/smartcloudServer/basic/role/delete",{"code":code},function(result){
				component.message("删除成功","success");
				init();
			})
		}else{
			component.alert("请选择需要删除的角色！");
		}
	};
	//用户管理页面显示
	var userManage = function(){
		var code = component.getTableRadioVal("#role-table");
		if(code){
			util.slidePage("role.user",url);
		}else{
			component.alert("请选择对应的角色！");
		}
	}
	//用户管理操作
	var userManageCtrl = function(){
		var code = component.getTableRadioVal("#role-table");
		util.get("/smartcloudServer/basic/role/getUser",{"code":code},function(result){

		})
	}
	return {
		init:init,
		addRole:addRole,
		queryRole:queryRole,
		editRole:editRole,
		deleteRole:deleteRole,
		addRoleCtrl:addRoleCtrl,
		queryRoleCtrl:queryRoleCtrl,
		editRoleCtrl:editRoleCtrl,
		userManage:userManage,
		userManageCtrl:userManageCtrl
	}
	
});