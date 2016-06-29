var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcrypt');
var User    = require('../Models/users.js');

// User Show page

router.get('/:id', function(req,res) {
	User.findById(req.params.id, function(err, user) {
		res.render('users/user.ejs', {
			data:user
		});
	});
});
















module.exports = router;