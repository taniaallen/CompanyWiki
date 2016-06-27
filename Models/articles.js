var mongoose = require('mongoose');
// var categorySchema = require('./categories.js').schema;


var articleSchema = mongoose.Schema({
	title: String,
	body: String,
	origAuthor: String,
	origDate: Date,
	editAuthor: String,
	editDate: Date,
	categories: []
});


var Article = mongoose.model('Article', articleSchema);


module.exports = Article;