var mongoose = require('mongoose');
var categorySchema = require('./models/categories.js').schema;


var articleSchema = mongoose.Schema({
	title: String,
	body: String,
	origAuthor: String,
	origDate: Date;
	editAuthor: String,
	editDate: Date,
	categories: [categorySchema]
});


var Article = mongoose.model('Article', articleSchema);


module.exports = Article;