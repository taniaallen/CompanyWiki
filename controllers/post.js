var express  = require('express');
var router   = express.Router();
var User     = require('../Models/users.js');
var Article  = require('../Models/articles.js');
var Category = require('../Models/categories.js');
var bodyParser = require('body-parser');

// New post page

router.get('/:id/new', function(req,res) {
		User.findById(req.params.id, function(err,foundAuthor) {
			res.render('posts/new.ejs',
				{
					data:foundAuthor
				});
				
		});
});




// Post new article

router.post('/:id/new', function(req,res) {
	User.findById(req.params.id, function(err,user) {
		
		Article.create(req.body, function(err,post) {
			
			user.articles.push(post);
			user.save(function(err) {
				res.render('posts/show.ejs', {
					data:user,
					article: post
				});
			});
		});
	});
});



// Post show page

router.get('/:id/show/:post_id', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		Article.findById(req.params.post_id, function(err, post) {
			res.render('posts/show.ejs', {
				data: user,
				article: post
			});
		});
	});
});










module.exports = router;