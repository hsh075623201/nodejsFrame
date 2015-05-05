/**
* 处理授权资源信息文件
*/
define(["util","common/component","smartcloud/authorizeController","ztree"],function (util,component,auth) {

	var getResource = function(callback){
		var num = 0;
		component.bootstrapTab("#resource");
		//获取菜单资源
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
				},
				check: {
					enable: true,
					chkStyle: "checkbox"
				}
			};

			var zTreeObj = $.fn.zTree.init($("#menuTree"), setting, config);
			zTreeObj.expandAll(true);
			num++;
			if(num == 3){
				callback();
			}
		})
		//获取组件资源
		component.getComponent({},function(config){
			var setting = {
				data:{
					simpleData:{
						enable:true,
						idKey:"code",
						pIdKey:"pCode",
						rootPid:"component_root"
					},
					key:{
                        name:"name"
                    }
				},
				check: {
					enable: true,
					chkStyle: "checkbox"
				}
			};

			var zTreeObj = $.fn.zTree.init($("#componentTree"), setting, config);
			function filter(node) {
	            return (node.level == 2);
	        }
	        var nodes = zTreeObj.getNodesByFilter(filter); // 查找节点集合
	        zTreeObj.expandNode(nodes[0], true, false, true);
	        num++;
			if(num == 3){
				callback();
			}
		});
		//获取url资源
		util.get("/smartcloudServer/basic/resource/getResource",{},function(data){
			var setting = {
				data:{
					simpleData:{
						enable:true,
						idKey:"code",
						pIdKey:"pCode",
						rootPid:"component_root"
					},
					key:{
                        name:"name"
                    }
				},
				check: {
					enable: true,
					chkStyle: "checkbox"
				}
			};

			var zTreeObj = $.fn.zTree.init($("#urlTree"), setting, data);
			function filter(node) {
	            return (node.level == 2);
	        }
	        var nodes = zTreeObj.getNodesByFilter(filter); // 查找节点集合
	        zTreeObj.expandNode(nodes[0], true, false, true);
	        num++;
			if(num == 3){
				callback();
			}
		})
	}
	//渲染已授权的信息
	var renderResource = function(obj){
		//渲染菜单树
		var menu_zTree = $.fn.zTree.getZTreeObj("menuTree");
		var menuNodes = menu_zTree.transformToArray(menu_zTree.getNodes());
		for(var i=0,menuLen=menuNodes.length;i<menuLen;i++){
			if(component.contains(obj.menus,menuNodes[i].code)){
				menu_zTree.checkNode(menuNodes[i], true, true);
			}
		}
		//渲染组件树
		var component_zTree = $.fn.zTree.getZTreeObj("componentTree");
		var componentNodes = component_zTree.transformToArray(component_zTree.getNodes());
		for(var i=0,componentLen=componentNodes.length;i<componentLen;i++){
			if(component.contains(obj.components,componentNodes[i].code)){
				component_zTree.checkNode(componentNodes[i],true,true);
			}
		}
		//渲染url
		var url_zTree = $.fn.zTree.getZTreeObj("urlTree");
		var urlNodes = url_zTree.transformToArray(url_zTree.getNodes());
		for(var i=0,urlLen=urlNodes.length;i<urlLen;i++){
			if(component.contains(obj.urls,urlNodes[i].code)){
				url_zTree.checkNode(urlNodes[i],true,true);
			}
		}
		
	}
	//获取选中的授权信息
	var getSelectedResource = function(){

		var menus=[],components=[],urls=[];
		//获取选中的菜单资源
	    var menu_zTree = $.fn.zTree.getZTreeObj("menuTree");
	    if(menu_zTree){
			var menu_nodes = menu_zTree.getCheckedNodes();
			for(var i=0,len=menu_nodes.length;i<len;i++){
				if(!menu_nodes[i].isParent){
					menus.push(menu_nodes[i].code);//只获取叶子节点
				}
			}
	    }
	    //获取选中的组件资源
	    var component_zTree = $.fn.zTree.getZTreeObj("componentTree");
	    if(component_zTree){
			var component_nodes = component_zTree.getCheckedNodes();
			for(var i=0,len=component_nodes.length;i<len;i++){
				if(component_nodes[i].level == 3){
					components.push(component_nodes[i].code);//只获取第三级别 即只获取组件信息
				}
			}
	    }
	    //获取选中的url资源
	    var url_zTree = $.fn.zTree.getZTreeObj("urlTree");
	    if(url_zTree){
			var url_nodes = url_zTree.getCheckedNodes();
			for(var i=0,len=url_nodes.length;i<len;i++){
				if(url_nodes[i].level == 3){
					urls.push(url_nodes[i].code);//只获取第三级别 
				}
			}
	    }
		var obj = {
			"menu":menus,
			"component":components,
			"url":urls
		};
		return obj;


	}
	return {
		getResource:getResource,
		renderResource:renderResource,
		getSelectedResource:getSelectedResource
	}
})