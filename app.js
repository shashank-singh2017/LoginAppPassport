var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphb = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
mongoose.connect('mongodb://localhost/loginapppassport');
var db = mongoose.connection;


//craete routes for app and the user.

var routes = require('./routes/index');
var users = require('./routes/users');

//Initialize the app
var app = express();

//view Engine

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphb({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 5 * 60 * 1000 }
}));

// passport Initialize

app.use(passport.initialize());
app.use(passport.session());


//Express Validator
app.use(expressValidator({
  errorFormatter: function(param,msg,value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


//Connect flash
app.use(flash());

//Global Vars
app.use(function(req,res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  req.session.email = 'hello world';
  res.locals.session = req.session;
  next();
});


app.use('/', routes);
app.use('/users', users);

//Set port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'),function() {
  console.log('server started on port: '+ app.get('port'));
});
