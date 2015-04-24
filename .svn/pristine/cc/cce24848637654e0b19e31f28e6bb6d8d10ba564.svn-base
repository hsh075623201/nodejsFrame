
var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');//解析post上传文件
var methodOverride = require('method-override');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var partials = require('express-partials');
var Bearcat = require('bearcat');
var compression = require('compression');
var routes = require('./routes');
var config = require('./config/config.json');

var app = express();
var server = http.createServer(app);
app.set('views', path.join(__dirname, 'views'));//__dirname为全局变量，存放当前脚本所在目录
app.set('view engine', 'ejs');//指定模板引擎为ejs
app.engine('html', require('ejs').renderFile);//配置模板引擎要处理的文件类型
app.use(compression()); //use compression
app.use(express.static(path.join(__dirname, 'public')));// connect内建中间件，设置根目录下的public存放静态文件
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser());
app.use(methodOverride()); 					// simulate DELETE and PUT
app.use(favicon());//默认图标
app.use(cookieParser()); 					//使用cookie工具类
app.use(session({    //创建session保存到mongodb中
    secret: config.cookiesecret,
    store: new MongoStore({
        db : config.dbName,
        url:"mongodb://"+config.dbHost+"/"+config.dbName
    })
}));
var contextPath = require.resolve('./context.json');
var bearcat = Bearcat.createApp([contextPath],{"BEARCAT_LOGGER":"off"});//第二个参数默认地址mysql.json 也可指定BEARCAT_CPATH(绝对路径)
bearcat.start(function() {
    app.use(function(req, res, next){
        /**
         * 获取url
         * 假如url中没有login 则记录到session 为以后调用
         * 假如url不是login 也不是reg 并且session中没有user 则跳到login
         */
        var url = req.originalUrl;
        //为第三方应用 http请求时req.session.user不存在，特意过滤，防止进入到/login
        var filter = true;
        var site = config.siteUrlFilter;
        for(var i=0;i<site.length;i++){
            if(url.indexOf(site[i])!=-1){
                filter = false;
            }
        }
        //外部链接调用api端口时，如果以api调用时，特意过滤，防止进入到/login
        if(url.substring(0,5)=="/api/"){
            filter = false;
        }
        /*req.session.url = null;*/
        if(url.indexOf("/oauth?")!=-1){//授权
            req.session.url=url;
        }
        if (url != "/login" && !req.session.user&&url!="/reg"&&filter) {
            return res.redirect("/login");
        }
        next();
    });
    routes(app);//路由
    server.listen(config.port, function(){
        console.log('SEC server listening on port ' + config.port);
    });
});


