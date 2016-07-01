var express = require('express');
var router  = express.Router();
var User    = require('../models/users.js');
var bcrypt  = require('bcrypt');

// Login page will have a get request for when the user submits their username and password



// Login action for existing users
// if username and password exists, go to the main page, else redirect to the login/ New User page

router.post('/', function(req,res) {
		User.findOne({username:req.body.username}, function(err, foundUser) {
		if(bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.loggedInUsername = foundUser.username;
			res.render('users/main.ejs', {
				data: foundUser
			});
		} else {
			res.redirect('login/newuser');
		};
	});
});



// Route for login/ New User page
// Post new username and password here

router.get('/newuser', function(req,res) {
	res.render('login/newuser.ejs');
});


router.post('/newuser', function(req,res) {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, function(err, user) {
		res.redirect('/');
	});
});







module.exports = router;