var mongoose = require('mongoose');
var articleSchema = require('./models/articles.js').schema;


var categorySchema = mongoose.Schema({
	category: String,
	articles: [articleSchema]
});


var Category = mongoose.model('Category', categorySchema);

module.exports = Category;