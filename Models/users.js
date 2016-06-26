var mongoose = require('mongoose');
var articleSchema = require('./models/articles.js').schema;


var userSchema = mongoose.Schema({
	username: String,
	password: String,
	author: String,
	articles:[articleSchema]

});


var User = mongoose.model('User', userSchema);

module.exports = User;