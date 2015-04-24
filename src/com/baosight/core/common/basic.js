/**
 * Created by HSH on 2015/1/6.
 */
//后台通用函数
var crypto = require('crypto');
var Basic = function(){
};
/**
 *时间格式化
 *
 **/
Basic.prototype.formatDate = function(date,format){
    var paddNum = function(num){
        num += "";
        return num.replace(/^(\d)$/,"0$1");
    };
    //指定格式字符
    var cfg = {
        yyyy : date.getFullYear() //年 : 4位
        ,yy : date.getFullYear().toString().substring(2)//年 : 2位
        ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
        ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
        ,d  : date.getDate()   //日 : 如果1位的时候不补0
        ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
        ,h  : date.getHours() //时 如果1位的时候不补0
        ,hh : paddNum(date.getHours())  //时 如果1位的时候补0
        ,m  : date.getMinutes() //分 如果1位的时候不补0
        ,mm : paddNum(date.getMinutes()) //分 如果1位的时候补0
        ,s  : date.getSeconds() //秒 如果1位的时候不补0
        ,ss : paddNum(date.getSeconds()) //秒 如果1位的时候补0
    };
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
};
/**
 * 随机数
 * @param len
 * @returns {string}
 */
Basic.prototype.random36 = function(len) {
    var lists = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        ret = [],
        total = lists.length;
    for (var i = 0; i < len; i++) {
        ret.push(lists[Math.floor(Math.random() * total)]);
    }
    return ret.join('');
};

Basic.prototype.getEncrypt =function(str){

    var ran = this.random36(8);
    var encrypt = crypto.createHash('md5').update(str+ran).digest('base64');
    encrypt = encrypt.replace(/\+/g,"0");
    return encrypt;
};

module.exports = Basic;
