const { body, validationResult, sanitizeBody } = require('express-validator');
const User = require('../models/user');
const Poem = require('../models/poem');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.indexGet = (req, res) => {
  res.send('NOT IMPLEMENTED: indexGet');
};

exports.signUpGet = (req, res) => {
  res.render('sign-up');
};

exports.signUpPost = [
  // validate
  body('first_name').trim().isLength({ min: 1 }),
  body('last_name').trim().isLength({ min: 1 }),
  body('username').trim().isLength({ min: 1 }),
  body('password').trim().isLength({ min: 1 }),
  body('password_confirm', 'Passwords must match').custom(
    (value, { req }) => value === req.body.password
  ),

  // sanitize
  sanitizeBody('first_name').escape(),
  sanitizeBody('last_name').escape(),
  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('membership').trim().escape(),

  // process request
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      // Create new user
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        member_status: req.body.member_status,
      });
      // handle errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return to form w/ errors

        res.render('sign-up', { errors: errors.array() });
      } else {
        // view success
        user.save((err, newUser) => {
          if (err) return next(err);
          res.redirect('/');
        });
      }
    });
  },
];

exports.loginGet = (req, res) => {
  res.render('login');
};

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.logOut = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.upgradeMembershipGET = (req, res) => {
  res.render('upgrade-membership');
};

exports.upgradeMembershipPOST = [
  // validate
  body('key', 'Incorrect key.').custom((value, { req }) => value === 'cats'),
  // sanitize
  sanitizeBody('key').escape(),
  // proccess
  (req, res, next) => {
    // handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('upgrade-membership', { errors: errors.array() });
      return;
    }
    // new user
    User.findById(req.user._id).exec((err, currentUser) => {
      if (err) return next(err);
      let updatedUser = currentUser;
      updatedUser.member_status = 'member';
      User.findByIdAndUpdate(req.user._id, currentUser, {}, (err, theUser) => {
        if (err) return next(err);
        console.log(theUser);
        res.redirect('/');
      });
    });
  },
];

exports.createPoemGet = (req, res) => {
  res.render('poem-form');
};

exports.createPoemPost = [
  // validate
  body('title', 'Title required. Label untitled if none.').exists(),
  body('text', 'Poem body required').exists(),
  body('user', 'User must be logged in').exists(),

  // sanitize
  sanitizeBody('title').escape(),
  sanitizeBody('text').escape(),
  sanitizeBody('user').escape(),

  // process
  (req, res, next) => {
    // new poem
    const poem = new Poem({
      title: req.body.title,
      text: req.body.text,
      user: req.body.user,
      timeStamp: Date.now(),
    });
    // errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('poem-form', {
        errors: errors.array(),
        poem,
      });
    } else {
      // save new poem
      poem.save((err) => {
        if (err) return next(err);
        console.log(poem);
        res.redirect('/');
      });
    }
  },
];
