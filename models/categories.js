var mongoose = require('mongoose');
var articleSchema = require('./articles.js').schema;


var categorySchema = mongoose.Schema({
	categories: String,
	articles: [articleSchema]
});


var Category = mongoose.model('Category', categorySchema);

module.exports = Category;