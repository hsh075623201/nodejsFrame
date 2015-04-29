define(["util","common/component","jquery.validform","ztree"],function (util,component) {

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
            },
            view: {
                selectedMulti: false
            }/*,
            callback: {
                onCheck: 
            }*/
	        };
	        var zTreeObj = $.fn.zTree.init($("#deptTree"),setting,data);
	        zTreeObj.expandAll(true);
		})
        
	};
	//新增角色页面显示
	var addDept = function(){

		var zTree = $.fn.zTree.getZTreeObj("deptTree");
	    var node = zTree.getSelectedNodes()[0];
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
	    var node = zTree.getSelectedNodes()[0];
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
	
	

	return {
		init:init,
		addDept:addDept,
		addDeptCtrl:addDeptCtrl

		
	}
	
});