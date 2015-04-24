
var routeUtil = require("../lib/routeUtil.js");

//路由
module.exports=function(app){

    app.get('/', routeUtil.index);
    app.get('/login', routeUtil.checkNotLogin);
    app.get('/login', routeUtil.loginRender);
    app.post('/login', routeUtil.checkNotLogin);
    app.post('/login', routeUtil.login);
    app.get('/logout', routeUtil.checkLogin);
    app.get('/logout',routeUtil.logoutRender);
    app.post('/reg',routeUtil.reg);
    app.use("/*",routeUtil.indexTemplate);//自定义模板
    app.use('/*',routeUtil.validatePermission);//权限验证
    app.use('/*',routeUtil.urlParse);//地址解析

    app.use(function(req, res, next){
        return res.render("error", {"message":"路由匹配失败！"});
    })

};
