var HelloService = function(){

};

HelloService.prototype.hello = function(obj,callback){
	callback(null,"hello "+obj.name);
}

module.exports = HelloService;