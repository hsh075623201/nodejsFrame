requirejs.config({
    baseUrl: 'javascripts',
    paths: {
        "jquery":'import/jquery-1.8.3',
        "jquery.validform":'import/jquery.validform',
        "bootstrap":'import/bootstrap.min',
        "hashchange":'import/jquery.ba-hashchange',
        "ace":'import/ace.min',
        "pageslide":'import/jquery.pageslide.min',
        "util":'common/util',
        "datatables":'import/jquery.dataTables.min',
        "datatables.bootstrap":'import/jquery.datatables.bootstrap'
    },
    shim: {
        'hashchange': { 
            deps: ['jquery'],
            exports: 'hashchange'
        },
        'ace':{
           deps: ['jquery'],
            exports: 'ace'
        },
        "jquery.validform":{
            deps:['jquery']
        },
        "bootstrap":{
            deps:['jquery']
        },
        "pageslide":{
            deps:['jquery']
        },
        "datatables":{
            deps:['jquery']
        },
        "datatables.bootstrap":{
            deps:["datatables"]
        }
    }
});

// Start the main app logic.
requirejs(['jquery','util','hashchange','bootstrap','ace'],function   ($,util) {
    
    $(window).hashchange( function(){
        var hashStr = "";//页面定位
        hashStr = location.hash.replace("#","");
        util.parsePage(hashStr,"smartcloud/config/app.json");
        
    });
    $(window).hashchange();//触发事件

});