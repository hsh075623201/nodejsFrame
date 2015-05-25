/**
* 第三方认证中心操作
*/
define(["page","common/util"],function (page,util) {
	var url = "smartcloud/config/app.json";
	/**  
    * @description 获取认证用户
    */
	var init = function(){
		var params = params||{};//查询条件
		var config = {
			"sAjaxSource":"/smartcloudServer/authorize/authorize/pagination?params="+JSON.stringify(params),
			"aoColumns":[
					{ //自定义列多选框
			            "mDataProp": "_id",
			            "sClass": "center",
			            'bSortable': false,
			            "mRender": function (_id) {
			                return util.getTableRadio(_id,"certificate-table");
			            }
			        },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "name"},
		            { "sClass": "center", 'bSortable': false,"mDataProp": "appKey", },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "appSecret" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "desc" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "createUsername" },
		            { "sClass": "center", 'bSortable': false,"mDataProp": "DateTime" },
        		]
		};
		
		util.renderDataTable("#certificate-table",config);
	}
	/**  
    * @description 注册应用页面
    */
	var addCertificate = function(){
		page.slidePage("certificate.add",url);
	}
	/**  
    * @description 注册应用
    */
	var addCtrl = function(){
		var $form = $("#addCertificateForm");
		util.validform($form,null,function(form){
    		var jsonForm = util.toJsonObject($form);
    		util.post("/smartcloudServer/authorize/authorize/add",jsonForm,function(ret){
    			util.message("保存成功","success");
    			init();
    		})
    		page.slideHide();
    		return false;
    	})
	};

	return {
		init:init,
		addCertificate:addCertificate,
		addCtrl:addCtrl
	}
})