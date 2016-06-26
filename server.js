var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bcrypt         = require('bcrypt');
var mongoose       = require('mongoose');


/* app settings  */
var app  = express();
var port = process.env.PORT || 3000




/*  db  */
userController = require('../Controllers/user.js');
loginController = require('../Controllers/login.js');







/* Middleware  */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/users', userController);
app.use('login', loginController);






/* Server  */

mongoose.connect('mongodb://localhost/wiki');

mongoose.connection.once('open', function() {
	console.log('the mongod connection is open.');
});


app.listen(port, function() {
	console.log("I am listening master...");
});
