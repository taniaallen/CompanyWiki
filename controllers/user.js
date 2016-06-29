var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcrypt');
var User    = require('../Models/users.js');

// User Show page route

router.get('/:id', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		res.render('users/user.ejs', {
			data:user
		});
	});
});

// Route to go back to Main page while in the User show page when clicking the "main page" button

router.get('/:id/main', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		// console.log(req.params.id); check to make sure the user id is flowing
		res.render('users/main.ejs', {
			data:user
		});
	});
});













module.exports = router;