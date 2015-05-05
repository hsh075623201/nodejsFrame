/**
* 处理菜单信息文件
*/
define(["util","common/component","ztree"],function (util,component) {
	var init = function(){

		component.getMenus(null,false,function(config){
			var setting = {
				data:{
					simpleData:{
						enable:true,
						idKey:"code",
						pIdKey:"pCode",
						rootPid:"menu_root"
					},
					key:{
                        name:"name"
                    }
				}
			};

			var zTreeObj = $.fn.zTree.init($("#menuTree"), setting, config);
			zTreeObj.expandAll(true);
		})
	}

	return {
		init:init
	}
})