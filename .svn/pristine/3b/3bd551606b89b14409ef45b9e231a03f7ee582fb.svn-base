define(["import/bootbox.min","datatables","datatables.bootstrap"],function (bootbox) {

	var alert = function(message,width){
			var dialog = bootbox.dialog({
	        message: message,
	        title: "<i class='fa fa-exclamation-triangle orange'></i> 提示信息",
	        buttons:
	        {
	            "success" :
	            {
	                "label" : "<i class='fa fa-check'></i> 确定",
	                "className" : "btn-warning"
	            }
	        }
	    }).css("z-index",9999999999999);
	    if(width){
	        $(".modal-dialog").width(width);
	    }
	};
	var confirm = function (message,callback,width){
	    bootbox.dialog({
	        message: message,
	        title: "<i class='fa fa-question-circle orange'></i> 确认信息",
	        buttons:
	        {
	            "success" :
	            {
	                "label" : "<i class='fa fa-check'></i> 确定",
	                "className" : "btn-danger",
	                "callback":function(){
	                    callback();
	                }
	            },
	            "reject" :
	            {
	                "label" : "<i class='fa fa-times'></i> 取消",
	                "className" : "btn-info"
	            }
	        }
	    }).css("z-index",9999999999999);

	    if(width){
	        $(".modal-dialog").width(width);
	    }
	};
	var prompt = function(title,callback){
	    var promptOptions = {
	        title: title,
	        buttons: {
	            confirm: {
	                label: "<i class='fa fa-check'></i> 确认",
	                "className" : "btn-danger"

	            },
	            cancel:{
	                label: "<i class='fa fa-times'></i>取消",
	                "className" : "btn-info"
	            }
	        },
	        inputType:"textarea",
	        callback: function(result){
	            callback(result);
	        }
	    };
	    bootbox.prompt(promptOptions);
	};
	//message
	var message = function(msg,type){
		 var messageAlert = $('<div class="alert alert-'+type+' text-center"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>'+msg+'<br /></div>');
	    $("body").prepend(messageAlert);
	    setTimeout(function(){
	        messageAlert.hide(1000,"swing");
	    },1500);
	}
	//表格checkbox
    var getTableCheckbox = function(id){
        return '<label><input class="ace" type="checkbox" name="selectedCheckbox" value="'+id+'" /><span class="lbl"></span></label>';

    };
    //表格radio
    var getTableRadio = function(id){
        return '<label><input class="ace" type="radio" name="selectedRadio" value="'+id+'" /><span class="lbl"></span></label>';
    };
    //获取表格radio 值
    var getTableRadioVal = function(pos){
    	return $(pos).find("input[name='selectedRadio'].ace:checked").val();
    };
    //填充表单
    var renderForm = function(pos,obj){
    	var key,value,tagName,type,arr;
	    for(x in obj){
	        key = x;
	        value = obj[x];
	         
	        $(pos).find("[name='"+key+"'],[name='"+key+"[]']").each(function(){
	            tagName = $(this)[0].tagName;
	            type = $(this).attr('type');
	            if(tagName=='INPUT'){
	                if(type=='radio'){
	                    $(this).attr('checked',$(this).val()==value);
	                }else if(type=='checkbox'){
	                    arr = value.split(',');
	                    for(var i =0;i<arr.length;i++){
	                        if($(this).val()==arr[i]){
	                            $(this).attr('checked',true);
	                            break;
	                        }
	                    }
	                }else{
	                    $(this).val(value);
	                }
	            }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
	                $(this).val(value);
	            }
	             
	        });
	    }
    }
    //jquery DataTable
    var renderDataTable = function(pos,config){
        var defaultConfig = {
            "ordering":false,//是否排序
            "bProcessing": true,//是否显示正在处理信息
            "bServerSide": true,//是否启动服务器端数据导入，即要和sAjaxSource结合使用
            "bDestroy":true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置
            'bPaginate': true,//是否分页
            "bFilter": false,
            "oLanguage": {
                "sProcessing": "正在加载中......",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录"
             },
             //"sAjaxSource":config.sAjaxSource,//后台访问地址
             //"fnServerParams"://发送额外的数据
             "fnServerData":function(sSource, aoData, fnCallback ){
                $.ajax( {
                    "type": "GET",
                    "contentType": "application/json",
                    "url": sSource,
                    "dataType": "json",
                    "data": aoData, //以json格式传递
                    "success": function(resp) {
                        if(resp.error!=undefined){
                            component.alert(resp.error);
                            return;
                        }
                        if(resp=="NoPermission"){
                            var object={};
                            object.aaData=[{"permission":"NoPermission"}];
                            resp=object;
                        }
                        fnCallback(resp.doc); //服务器端返回的对象的returnObject部分是要求的格式
                    }
                });
             },//用于替换默认发到服务端的请求操作
             //"aoColumns":config.columns//定义列
             //"fnPreDrawCallback"://用于在开始绘制之前调用，返回false的话，会阻止draw事件发生；返回其它值，draw可以顺利执行
        }
        //自定义
        for(var key in config){
            defaultConfig[key] = config[key];
        }

        $(pos).dataTable(defaultConfig);
    };

    var toJsonObject = function($obj){
        var serializeObj={};
        var array=$obj.serializeArray();
        $(array).each(function(){
            if(this.value){
                if(serializeObj[this.name]){
                    if($.isArray(serializeObj[this.name])){
                        serializeObj[this.name].push(this.value);
                    }else{
                        serializeObj[this.name]=[serializeObj[this.name],this.value];
                    }
                }else{
                    serializeObj[this.name]=this.value;
                }
            }
        });
        return serializeObj;
    }

    return {
        alert:alert,
        confirm:confirm,
        prompt:prompt,
        message:message,
        getTableCheckbox:getTableCheckbox,
        getTableRadio:getTableRadio,
        getTableRadioVal:getTableRadioVal,
        renderForm:renderForm,
        renderDataTable:renderDataTable,
        toJsonObject:toJsonObject
    }
});