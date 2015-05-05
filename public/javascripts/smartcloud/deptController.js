/**
* 处理部门信息文件
*/
define(["util","common/component","smartcloud/resourceController","jquery.validform","ztree"],function (util,component,resource) {

	var url = "smartcloud/config/app.json";
	//页面初始化 列表显示
	var init = function(params){

		util.get("/smartcloudServer/basic/dept/getDept",{},function(data){
			var setting = {
	            data: {
	                simpleData: {
	                    enable: true,
	                    idKey: "code",
	                    pIdKey: "pCode",
	                    rootPId: "dept_root"
	                },
	                key:{
	                    name:"name"
	                }
	            },
	            check: {
	                enable: true,
	                chkStyle: "radio",
	                radioType: "all"
	            }
	        };
	        var zTreeObj = $.fn.zTree.init($("#deptTree"),setting,data);
	        zTreeObj.expandAll(true);
		})
        
	};
	//新增角色页面显示
	var addDept = function(){

		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
	    if(node){
	        util.slidePage("dept.add",url);
	    }else{
	    	component.confirm("您将创建的是根目录，请确认！",function(){
	            util.slidePage("dept.add",url);
	        }); 
	    }
		
	};
	//新增角色操作
	var addDeptCtrl = function(){
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
		var $form = $("#addDeptForm");
		$form.Validform({
		 	tiptype:3,
        	label:".label",
        	showAllError:true,
        	callback:function(form){
        		var jsonForm = component.toJsonObject($form);
        		jsonForm.pCode = node.code||"dept_root";//父节点信息
        		util.post("/smartcloudServer/basic/dept/add",jsonForm,function(ret){
        			component.message("保存成功","success");
        			init();
        		})
        		util.slideHide();
        		return false;
        	}
		});
	};
	//删除操作
	var deleteDept = function(){
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
	    if(node&&!node.isParent){
	        util.post("/smartcloudServer/basic/dept/delete", {"_id":node._id}, function(data) {
		    	component.message("删除成功","success");
				init();
		    });
	    }else{
	    	component.alert("请选择需删除的部门，注意：不能直接删除上级部门！"); 
	    }
	}
	//用户管理页面
	var userManage = function(){

		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
	    if(node){
	        util.slidePage("dept.user",url);
	    }else{
	    	component.alert("请选择具体部门进行用户管理！"); 
	    }
	}
	//用户管理操作 获取部门已添加的用户
	var userManageCtrl = function(){
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
		var params = {"_id":node._id};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/dept/getAddedUser?params="+JSON.stringify(params),
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
		
		component.renderDataTable("#dept-user-table",config);
		
	}
	//部门添加用户操作 显示可添加的用户
	var deptAddUser = function(){
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
		var params = {"_id":node._id};//查询条件
		var config = {
			//http://10.25.76.206:18080/api/smartcloudServer/security/users/list?app_key=fdioanferik&app_secret=secret1&callback=?
			"sAjaxSource":"/smartcloudServer/basic/dept/getNeedUser?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "username",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (username) {
			                return component.getTableCheckbox(username,"deptUserModalTable");
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "username"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "email", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "gender" }
        		]
		};
		
		component.renderDataTable("#deptUserModalTable",config);
		$("#deptUserModal").modal({
	        backdrop:false
	    }).css("z-index",99999999999);
	}
	//为部门添加用户
	var deptAddUserCtrl = function(){
		var values = component.getTableCheckedbox("#deptUserModalTable");
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
		$("#deptUserModal").modal("toggle");//隐藏
		if(values.length>0&&node){
			util.post("/smartcloudServer/basic/dept/addUser",{"username":values,"_id":node._id},function(result){
				component.message("添加成功","success");
				userManage();
			})
		}
		
	}
	//部门删除用户
	var deptDeleteUser = function(){
		var username = component.getTableRadioVal("#dept-user-table");
		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getCheckedNodes(true)[0];
		if(node){
			util.post("/smartcloudServer/basic/dept/deleteUser",{"username":username,"_id":node._id},function(result){
				component.message("删除成功","success");
				userManage();
			})
		}else{
			component.alert("请选择删除的用户！");
		}
		
	}

	//授权页面显示
	var authorize = function(){
		var dept_zTree = $.fn.zTree.getZTreeObj("deptTree");
		var selectedNode = dept_zTree.getCheckedNodes(true)[0];
		if(selectedNode){
			util.slidePage("dept.authorize",url);
		}else{
			component.alert("请选择授权的部门！");
		}
		
	}
	//授权操作
	var authorizeCtrl = function(){
		resource.getResource(function(){
			var dept_zTree = $.fn.zTree.getZTreeObj("deptTree");
			var selectedNode = dept_zTree.getCheckedNodes(true)[0];
			util.get("/smartcloudServer/basic/dept/getDept",{"code":selectedNode.code},function(data){
				var obj = {
					"menus":data[0].menus,
					"components":data[0].components,
					"urls":data[0].urls
				}
				resource.renderResource(obj);//渲染已授权的资源
			})
		});
	}
	//确认授权
	var auth = function(){
		var dept_zTree = $.fn.zTree.getZTreeObj("deptTree");
		var selectedNode = dept_zTree.getCheckedNodes(true)[0];
		var resourceObj = resource.getSelectedResource();
		var obj = {
			"code":selectedNode.code,
			"resource":resourceObj
		}
		util.post("/smartcloudServer/basic/dept/addResource",obj,function(data){
			component.message("授权成功","success");	
            util.slideHide();
            return false;
		})
	}

	return {
		init:init,
		addDept:addDept,
		addDeptCtrl:addDeptCtrl,
		deleteDept:deleteDept,
		userManage:userManage,
		userManageCtrl:userManageCtrl,
		deptDeleteUser:deptDeleteUser,
		deptAddUserCtrl:deptAddUserCtrl,
		deptAddUser:deptAddUser,
		authorize:authorize,
		authorizeCtrl:authorizeCtrl,
		auth:auth
	}
	
});