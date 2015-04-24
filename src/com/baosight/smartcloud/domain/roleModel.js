var mongoose = require('mongoose');

exports.RoleSchema = new mongoose.Schema({
    name: String,
    code: String,
    desc: String,
    createUsername:String,
    DateTime:{ type: Date, default: Date.now }
});