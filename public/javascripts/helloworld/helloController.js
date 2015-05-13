
define(["util","common/component","bootbox"],function (util,component,bootbox) {
	
	var init = function(){
		component.get("/helloServer/hellomodule/hellocmd/hello",{"name":"baosight"},function(data){
			$("#msg").text(data);
		})
	}

	return {
		init:init
	}
})