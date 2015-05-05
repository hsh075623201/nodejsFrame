/**
* 动态加载页面的处理文件
*/
define(["common/component","pageslide"],function (component) {
   
    /**  
    * @description 获取匹配的配置信息
    * @param hashStr 页面定位字符串
    * @param url 获取配置信息的地址
    * @param callback 回调函数
    */ 
	var getConfig = function(hashStr,url,callback){
        //TODO　hashStr 权限检查
		$.getJSON(url,function(config){
			hashStr = hashStr||config.index;
            var hashPathArr = hashStr.split(".");
			var retObj = {"appPath":config.path};
			var flag = true ;
            for(var i=0,len=config.modules.length;i<len;i++){
                if(hashPathArr[0] == config.modules[i].module){
                    retObj.jsPath = config.modules[i].js;
                    for(var j=0,subLen=config.modules[i].pages.length;j<subLen;j++){
                        if(hashPathArr[1] == config.modules[i].pages[j].id){
                            retObj.htmlPath = config.modules[i].pages[j].url;
                            retObj.initMethod = config.modules[i].pages[j].method;
                            retObj.components = config.modules[i].pages[j].components;
                            flag = false;
                        }
                    }
                }
            }
            if(flag){
            	component.alert("URL 地址错误！");
            	return;
            }
            return callback(retObj);
		})
	};
	/**  
    * @description 对动态加载的页面进行操作
    * @param hashStr 页面定位字符串
    * @param config 配置信息
    */ 
	var pageController = function(hashStr,config){
		//给页面赋予属性
		$("div[ng-page]").each(function(){
	        if(typeof($(this).attr("ng-page-id"))=="undefined"){
	            $(this).attr("ng-page-id",hashStr);
	        }
	    });
		//加载对应的JS
        require([config.jsPath],function(objCtrl){
            
            if(config.initMethod){
                objCtrl[config.initMethod]();//页面初始化方法
            }
            //为页面属性赋予事件功能
            $("div[ng-page-id='"+hashStr+"']").find("*[ng-click]").each(function(index, val) {
                 $(this).click(function(event) {
                      var method = $(this).attr("ng-click");//获取属性值
                      objCtrl[method]();//赋予事件功能
                 });
            });

            //页面需限制权限列表
	        var limitComponents = [];
	        for(var i=0,len=config.components.length;i<len;i++){
	            if(config.components[i].limit){
	                limitComponents.push("component_smartcloud."+hashStr+"."+config.components[i].component);
	            }
	        }
	        //用户具有的权限列表 todo

             //select 绑定option
            $("div[ng-page-id='"+hashStr+"']").find("select[optionCode]").each(function(){
                var optionCode = $(this).attr("optionCode");//类型 + 方法KEY
                var optionKey = $(this).attr("optionKey");
                var optionValue = $(this).attr("optionValue");
                var id = $(this).attr("id");
                var optionCodeArr = optionCode.split(".");
                $("#"+id).empty();
                $.getJSON("/config/select.json",function(select){
                    if(optionCodeArr[0]=="JSON"){
                        var optionJSON = select.JSON[optionCodeArr[1]];
                        var str = "";
                        for(var i=0;i<optionJSON.length;i++){
                            str += "<option value="+optionJSON[i].key+">"+optionJSON[i].value+"</option>";
                        }
                        $("#"+id).append(str);
                    }else{
                        
                    }
                });
            });
           
        })
	};
	/**  
    * @description 页面解析
    * @param hashStr 页面定位字符串
    * @param url 获取配置信息地址
    * @param pos jquery 定位符 动态页面显示的位置
    */ 
	var parsePage = function(hashStr,url,pos){
		getConfig(hashStr,url,function(config){
			//加载页面
            pos = pos||"#page";
            $(pos).load(config.appPath+config.htmlPath,function() {
            	//对加载的页面进行处理
                pageController(hashStr,config);
            });
		})
	};

    /**  
    * @description 返回结果统一处理
    * @param data 返回结果
    * @param callback 回调函数
    */ 
	var resProcess = function(data,callback){
		var _this = this;
	    if(data.status==-1){
	        component.alert("运行异常，异常信息："+data.message+",请与管理员联系！");
	        return ;
	    }else{
	        return callback(data.doc);
	    }
	};
    /**  
    * @description 封装get请求
    * @param path 请求路径
    * @param params 请求条件
    * @param callback 回调函数
    */ 
    var get = function(path,params,callback){
    	params.random = Math.random();
    	$.get(path, params,function(data){
            return resProcess(data,callback);
        });
    };
    /**  
    * @description 封装post请求
    * @param path 请求路径
    * @param params 请求条件
    * @param callback 回调函数
    */ 
    var post = function(path,params,callback){
    	var params = JSON.stringify(params);
        console.log(params);
	    $.post(path,{"params":params},function(data){
	        return resProcess(data,callback);
	    });
    };
    /**  
    * @description 侧滑页面显示
    * @param hashStr 页面定位符
    * @param url 配置信息路径
    * @param callback 回调函数
    */ 
    var slidePage = function(hashStr,url,callback){
    	getConfig(hashStr,url,function(config){
			//加载页面
            $.pageslide({href:config.appPath+config.htmlPath,direction:"left"},function() {
            	//对加载的页面进行处理
                pageController(hashStr,config);
            });
		})
    };

    /**  
    * @description 关闭侧滑页面
    */ 
    var slideHide = function(){
    	$.pageslide.close();
    };
    
    

    return {
    	parsePage:parsePage,
    	get:get,
    	post:post,
    	slidePage:slidePage,
    	slideHide:slideHide
       
       
    }
});