var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var bcrypt         = require('bcrypt');
var mongoose       = require('mongoose');
var timestamps     = require('mongoose-timestamp');
var session        = require('express-session');
var marked         = require('marked');




/* app settings  */
var app  = express();
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiki';

app.use(session({
	secret: 'lonestar',
	resave: false,
	saveUninitialized: false
}));


/*  db  */
userController  = require('./controllers/user.js');
loginController = require('./controllers/login.js');
postController  = require('./controllers/post.js');






/* Middleware  */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(methodOverride('_method'));

app.use('/login', loginController);
app.use('/users', userController);
app.use('/posts', postController);



app.get('/', function(req,res) {				// tested the route.
	res.render('login/login.ejs');
});

// app.get('/articlesByCategory', function(req, res){
// 	var categoryToFind  = req.params.value;
// 	console.log(categoryToFind);
// 	Article.find({categories: categoryToFind}, function(err,posts) {
// 		res.send(posts);
// 	});
// });



/* Server  */

mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function() {
	console.log('the mongod connection is open.');
});


app.listen(port, function() {
	console.log("server running on port " + port);
});
