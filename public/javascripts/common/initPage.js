define(["jquery","hashchange"],function ($) {

	/*var hashStr = "";
	$(window).hashchange( function(){
		hashStr = location.hash.replace("#","");
	});
	
	$(window).hashchange();
	alert(hashStr+">>>>");
	return{
		path:hashStr
	}*/

	 /*$(window).hashchange( function(){
        var hashStr = "";//页面定位
        hashStr = location.hash.replace("#","")||"page1";
        var pages = {
            "pageId":"page1",
            "url":"smartcloud/html/page1.html",//页面地址
            "js":"./smartcloud/div1",//js地址
            "init":"init"//初始化函数

        }
        $("#page").load(pages.url,function() {
            var jsPath = pages.js;//配置文件中指定
           
            require([jsPath],function(div1){
                div1[pages.init]();
                $("div[ng-click]").each(function(index, val) {
                     $(this).click(function(event) {
                          var method = $(this).attr("ng-click");//获取属性值
                          div1[method]();
                     });
                });
            })
        });
    alert("123");
    });
    $(window).hashchange();//触发事件*/
    

});

