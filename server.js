var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bcrypt         = require('bcrypt');
var mongoose       = require('mongoose');
var session        = require('express-session');


/* app settings  */
var app  = express();
var port = process.env.PORT || 3000

app.use(session({
	secret: 'lonestar',
	resave: false,
	saveUninitialized: false
}));


/*  db  */
userController  = require('./Controllers/user.js');
loginController = require('./Controllers/login.js');
postController  = require('./Controllers/post.js');






/* Middleware  */
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/login', loginController);
app.use('/users', userController);
app.use('/posts', postController);



app.get('/', function(req,res) {				// tested the route.
	res.render('login/login.ejs');
});



/* Server  */

mongoose.connect('mongodb://localhost:27017/wiki');

mongoose.connection.once('open', function() {
	console.log('the mongod connection is open.');
});


app.listen(port, function() {
	console.log("I am listening master...");
});
