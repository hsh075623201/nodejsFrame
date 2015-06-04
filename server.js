/**
* 系统初始化文件页面
* 包括：初始化系统配置 路由定向等
*/
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
var log4js = require("./lib/log");

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
//日志配置
log4js.configure();
app.use(log4js.useLog());

var contextPath = require.resolve('./context.json');//加载配置文件
var bearcat = Bearcat.createApp([contextPath],{"BEARCAT_LOGGER":"off"});//第二个参数默认地址mysql.json 也可指定BEARCAT_CPATH(绝对路径)
bearcat.start(function() {
    app.use(function(req, res, next){

        var url = req.originalUrl;//获取url
        if(url.indexOf("/getToken")==-1){
            var user = req.session.user;//获取session中的user
            if(url.indexOf("/authorize?")!=-1){
                var redirect = req.param("redirect");//获取重定向地址 认证服务
                if(!redirect){
                    return res.json("授权错误，没有回调页面！");
                }
                req.session.redirect = redirect;//保存第三方应用的回调地址
            }
            if (url != "/login" && !user&&url!="/reg") {
                return res.redirect("/login");
            }
        }
        next();
        
    });
    routes(app);//路由
    //端口监听
    server.listen(config.port, function(){
        console.log('server listening on port ' + config.port);
    });
});


