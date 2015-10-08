var express = require('express');
var register = require('./routes/register');
var login = require('./routes/login');
var messages = require('./lib/messages');
var ejs = require('ejs');
var user = require('./lib/middleware/user');
var entries = require('./routes/entries');
var validate = require('./lib/middleware/validate');
var app = express();
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');

app.configure(function(){
	app.set('views', __dirname + '/public/views');
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(user);
	app.use(messages);
});

app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);
app.get('/', page(Entry.count, 5), entries.list);

app.listen(3000);