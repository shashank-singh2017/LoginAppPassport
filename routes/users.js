var express = require('express');
var router = express.Router();

//Register
router.get('/register', function(req, res){
  res.render('register');
});

router.get('/login', function(req, res){
  res.render('login');
});

//Register
router.post('/register', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var pwd = req.body.pwd1;
  var pwd2 = req.body.pwd2;

  // Validation
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email pattern not correct').isEmail();
  req.checkBody('pwd1', 'password is required').notEmpty();
  req.checkBody('pwd2', 'password do not match').equals(req.body.pwd1);

  var errors = req.validationErrors();

  if(errors) {
    console.log("There are some errors in the registration form fill up....");
    res.render('register',{errors: errors});
  }
  else {
    console.log("There are no errors");
  }

});

module.exports = router;
