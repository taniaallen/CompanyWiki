var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamp');


var articleSchema = mongoose.Schema({
	title: String,
	body: String,
	origAuthor: String,
	editAuthor: String,
	categories: []
});

articleSchema.plugin(timestamps);
var Article = mongoose.model('Article', articleSchema);


module.exports = Article;