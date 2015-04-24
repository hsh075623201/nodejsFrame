/**
 * Created by xuzhengchao on 14-5-8.
 */

var config = require('../../../../../config/config.json');
var fs = require('fs');
var formidable = require('formidable');
var gm = require('gm');


var uploadCmd = function(){

};

// JSON API for update a User
/**
 * 上传文件
 * @param req
 * @param res
 */
uploadCmd.prototype.upload = function(req,res) {

    if(this.mime(req)==='multipart/form-data'){
        var projectWeb = req.param("webUI");
        var addr = __dirname.split("\\");
        addr.pop();addr.pop();addr.pop();addr.pop();addr.pop();
        var deployAddr = addr.join("/");
        var uploadFile = deployAddr+config.uploadDir+"/"+projectWeb+"/uploadFile";
        if (!fs.existsSync(uploadFile)) {
            fs.mkdirSync(uploadFile);
        }
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = uploadFile+"/temp";
        //创建临时文件夹
        if (!fs.existsSync(form.uploadDir)) {
            fs.mkdirSync(form.uploadDir);
        }
        form.parse(req,function(err,fields,files){
            req.body = fields;
            req.files = files;

            var file = files.file;

            // 获得文件的临时路径
            var tmp_path = file.path;
            var fileName = req.session.user.username+"_"+file.name;
            var _date=new Date();
            var folder = uploadFile;

            var datedir=_date.getFullYear();
            var mm=_date.getMonth()+1;
            if(mm<10){
                datedir+="0"+mm;
            }else{
                datedir+=mm.toString();
            }
            folder+="/"+datedir;
            // 指定文件上传后的目录 - 示例为"images"目录。
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            var target_path = folder + '/' + fileName;
            // 移动文件
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                // 删除临时文件夹文件,
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    var url = "/"+projectWeb+"/uploadFile/"+datedir+'/'+fileName;
                    //返回文件上传后的访问地址
                    res.render('upload-result', {
                        url: url,
                        names:file.name
                    });
                });
            });
        });
    }
};
/**
 * 上传图片
 * @param req
 * @param res
 */
uploadCmd.prototype.uploadImage = function(req,res) {

    if(this.mime(req)==='multipart/form-data'){
        var projectWeb = req.param("webUI");
        var addr = __dirname.split("\\");
        addr.pop();addr.pop();addr.pop();addr.pop();addr.pop();
        var deployAddr = addr.join("/");
        var uploadImage = deployAddr+config.uploadDir+"/"+projectWeb+"/uploadImage";
        if (!fs.existsSync(uploadImage)) {
            fs.mkdirSync(uploadImage);
        }
        var uploadImage_images =uploadImage+"/images";
        if (!fs.existsSync(uploadImage_images)) {
            fs.mkdirSync(uploadImage_images);
        }
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = uploadImage+"/temp";
        //创建临时文件夹
        if (!fs.existsSync(form.uploadDir)) {
            fs.mkdirSync(form.uploadDir);
        }
        form.parse(req,function(err,fields,files){
            req.body = fields;
            req.files = files;

            var file = files.file;

            // 获得文件的临时路径
            var tmp_path = file.path;
            var _date=new Date();
            var fileName = req.session.user.username+"_"+_date.getTime()+".jpg";
            var folder = uploadImage;
            var datedir=_date.getFullYear();
            var mm=_date.getMonth()+1;
            if(mm<10){
                datedir+="0"+mm;
            }else{
                datedir+=mm.toString();
            }
            folder+="/"+datedir;
            // 指定文件上传后的目录 - 示例为"images"目录。
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            var target_path = folder + '/' + fileName;
            // 移动文件
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                // 删除临时文件夹文件,
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    var url = "/"+projectWeb+"/uploadImage/"+datedir+'/'+fileName;
                    //返回文件上传后的访问地址
                    res.render('upload-image', {
                        url: url,
                        names:file.name
                    });
                });
            });
        });
    }


};
/**
 * 保存图片
 * @param req
 * @param res
 */
uploadCmd.prototype.saveImage = function(req,res) {
    var reqBody = req.body,
    // Filter out choices with empty text
        dataString = reqBody.dataString;
    var projectWeb = reqBody.webUI;
    var jsonObject = JSON.parse(dataString);
    var addr = __dirname.split("\\");
    addr.pop();addr.pop();addr.pop();addr.pop();addr.pop();
    var deployAddr = addr.join("/");
    var imagePath = deployAddr+config.uploadDir+jsonObject.uploadUrl;
    var _date=new Date();
    var fileName = req.session.user.username+"_"+_date.getTime()+".jpg";
    gm(imagePath).resize(null, 400)//先缩小尺寸，与界面显示一致。然后剪切
        .crop(jsonObject.w, jsonObject.h,jsonObject.x, jsonObject.y)
        .resize(null, 150)
        .write(deployAddr+config.uploadDir+"/"+projectWeb+"/uploadImage/images/"+fileName, function(err){
            if (err) return console.dir(arguments);
            jsonObject.uploadUrl = projectWeb+"/uploadImage/images/"+fileName;
            res.json(jsonObject);
        }
    )
};

uploadCmd.prototype.mime = function(req){
    var str = req.headers['content-type']||'';
    return str.split(";")[0];
};

module.exports = uploadCmd;



