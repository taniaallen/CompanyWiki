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
	User.findById(req.params.id, function(err,user) {  // first find the user by the req.params.id
		
		Article.create(req.body, function(err,post) {  // then create the article using the Article schema
			Category.create({categories:post.categories, articles:[post]}, function(err,category) {

			});
			user.articles.push(post);  // push the new post to the user.articles array
			user.save(function(err) {	// save the user changes
				res.render('posts/show.ejs', {
					data:user,  // have to send the data to the show page so that the show page can render the post
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


// Route to go back to the main page from the post show page when clicking the "main page" button

router.get('/:id/main', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		// console.log(req.params.id);  check that the req.params.id is crossing for the user
		res.render('users/main.ejs', {
			data:user
		});
	});
});


// Route to the edit post page

router.get('/:id/edit/:post_id', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		Article.findById(req.params.post_id, function(err, post) {
			res.render('posts/edit.ejs', {
				data: user,
				article: post
			});
		});
	});
});

// Update the article in the edit page

router.put('/:id/edit/:post_id', function(req,res) {
	Article.findByIdAndUpdate(req.params.post_id, req.body, { new:true }, function(err, post) {

		User.findById(req.params.id, function(err, user) {
			for(var i = 0; i < user.articles.length; i++) {
				if(user.articles[i].id === req.params.post_id) {
					user.articles[i] = { _id: req.params.post_id, title:req.body.title, body:req.body.body, origAuthor:req.body.origAuthor, editAuthor:req.body.author};
					user.save(function(err) {
						res.send(user);
					});	
				};
			};
		});
	});
});


module.exports = router;