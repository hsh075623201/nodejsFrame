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
			            "mDataProp": "_id",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (_id) {
			                return component.getTableRadio(_id,"role-table");
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
        			init();
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
		var _id = component.getTableRadioVal("#role-table");
		if(_id){
			util.slidePage("role.edit",url);
		}else{
			component.alert("请选择需要编辑的角色！");
		}
		
	};
	//编辑页面操作
	var editRoleCtrl = function(){
		var _id = component.getTableRadioVal("#role-table");
		util.get("/smartcloudServer/basic/role/getRole",{"_id":_id},function(result){
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
		var _id = component.getTableRadioVal("#role-table");
		if(_id){
			util.post("/smartcloudServer/basic/role/delete",{"_id":_id},function(result){
				component.message("删除成功","success");
				init();
			})
		}else{
			component.alert("请选择需要删除的角色！");
		}
	};
	//用户管理页面显示
	var userManage = function(){
		var _id = component.getTableRadioVal("#role-table");
		if(_id){
			util.slidePage("role.user",url);
		}else{
			component.alert("请选择对应的角色！");
		}
	}
	//用户管理操作 获取角色已添加的用户
	var userManageCtrl = function(){
		var _id = component.getTableRadioVal("#role-table");
		var params = {"_id":_id};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/role/getAddedUser?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "username",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (username) {
			                return component.getTableRadio(username,"role-user-table");
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "username"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "email", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "gender" }
        		]
		};
		
		component.renderDataTable("#role-user-table",config);
		
	}
	//角色添加用户操作 显示可添加的用户
	var roleAddUser = function(){
		var _id = component.getTableRadioVal("#role-table");
		var params = {"_id":_id};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/role/getNeedUser?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "username",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (username) {
			                return component.getTableCheckbox(username,"roleUserModalTable");
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "username"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "email", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "gender" }
        		]
		};
		
		component.renderDataTable("#roleUserModalTable",config);
		$("#roleUserModal").modal({
	        backdrop:false
	    }).css("z-index",99999999999);
	}
	//为角色添加用户
	var roleAddUserCtrl = function(){
		var values = component.getTableCheckedbox("#roleUserModalTable");
		var _id = component.getTableRadioVal("#role-table");
		$("#roleUserModal").modal("toggle");//隐藏
		if(values.length>0&&_id){
			util.post("/smartcloudServer/basic/role/addUser",{"username":values,"_id":_id},function(result){
				component.message("添加成功","success");
				userManage();
			})
		}
		
	}
	//角色删除用户
	var roleDeleteUser = function(){
		var username = component.getTableRadioVal("#role-user-table");
		var _id = component.getTableRadioVal("#role-table");
		if(_id){
			util.post("/smartcloudServer/basic/role/deleteUser",{"username":username,"_id":_id},function(result){
				component.message("删除成功","success");
				userManage();
			})
		}else{
			component.alert("请选择删除的用户！");
		}
		
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
		userManageCtrl:userManageCtrl,
		roleAddUser:roleAddUser,
		roleAddUserCtrl:roleAddUserCtrl,
		roleDeleteUser:roleDeleteUser
	}
	
});