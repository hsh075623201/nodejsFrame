define(["util","common/component","jquery.validform"],function (util,component) {

	var url = "smartcloud/config/app.json";
	//页面初始化 列表显示
	var init = function(params){


		component.getMenus("smartcloudServer",function(menus){
			console.log(menus);
		})

		var params = params||{};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/user/pagination?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "username",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (username) {
			                return component.getTableRadio(username,"users-table");
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "username"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "email", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "gender" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "status" }
        		]
		};
		
		component.renderDataTable("#users-table",config);
	};
	//新增用户页面显示
	var addUser = function(){
		util.slidePage("user.add",url);
	};
	//新增用户操作
	var addUserCtrl = function(){
		var $form = $("#addUserForm");
		$form.Validform({
		 	tiptype:3,
        	label:".label",
        	showAllError:true,
        	callback:function(form){
        		var jsonForm = component.toJsonObject($form);
        		util.post("/smartcloudServer/basic/user/add",jsonForm,function(ret){
        			component.message("保存成功","success");
        			init();
        		})
        		util.slideHide();
        		return false;
        	}
		 });
	};
	//查询用户页面显示
	var queryUser = function(){
		util.slidePage("user.query",url);
	};
	//查询用户操作
	var queryUserCtrl = function(){
		var $form = $("#queryUserForm");
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
	//编辑用户页面显示
	var  editUser = function(){
		var username = component.getTableRadioVal("#users-table");
		if(username){
			util.slidePage("user.edit",url);
		}else{
			component.alert("请选择需要编辑的用户！");
		}
	};
	//编辑页面操作
	var editUserCtrl = function(){
		var username = component.getTableRadioVal("#users-table");
		util.get("/smartcloudServer/basic/user/getUser",{"username":username},function(result){
			var data = result[0];
			data.rePassword = data.password;
			component.renderForm("#editUserForm",result[0]);
			var $form = $("#editUserForm");
			$form.Validform({
	            tiptype:3,
	            label:".label",
	            showAllError:true,
	            callback:function(form){
	                //更新数据
	                var jsonForm = component.toJsonObject($form);
	                util.post("/smartcloudServer/basic/user/update",jsonForm,function(result){
	                	component.message("更新成功","success");
	                	init();//重新初始化
	                })
	                util.slideHide();
	                return false;
	            }
			})
		});
	}
	//删除用户
	var deleteUser = function(){
		var username = component.getTableRadioVal("#users-table");
		if(username){
			util.post("/smartcloudServer/basic/user/delete",{"username":username},function(result){
				component.message("删除成功","success");
				init();
			})
		}else{
			component.alert("请选择需要删除的用户！");
		}
	};
	//用户权限信息列表
	var userPermission = function(){
		alert("userPermission...");
	};




	return {
		init:init,
		addUser:addUser,
		queryUser:queryUser,
		editUser:editUser,
		editUserCtrl:editUserCtrl,
		deleteUser:deleteUser,
		userPermission:userPermission,
		addUserCtrl:addUserCtrl,
		queryUserCtrl:queryUserCtrl
	}
	
});