const { body, validationResult, sanitizeBody } = require('express-validator');
const User = require('../models/user');
const Poem = require('../models/poem');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.indexGet = (req, res, next) => {
  if (req.user && req.user.member_status === 'admin') {
    Poem.find()
      .populate('user')
      .exec((err, poems) => {
        if (err) return next(err);
        res.render('delete', {
          title: 'The SPS',
          poems,
        });
      });
  }
  Poem.find()
    .populate('user')
    .exec((err, poems) => {
      if (err) return next(err);
      res.render('index', {
        title: 'The SPS',
        poems,
      });
    });
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

exports.loginGet = (req, res, next) => {
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

exports.upgradeMembershipGET = (req, res, next) => {
  res.render('upgrade-membership');
};

exports.upgradeMembershipPOST = [
  // validate
  body('key', 'Incorrect key.').custom(
    (value, { req }) => value === 'cats' || value === 'dogs'
  ),
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
      if (req.body.key === 'cats') {
        updatedUser.member_status = 'member';
      }
      if (req.body.key === 'dogs') {
        updatedUser.member_status = 'admin';
      }
      User.findByIdAndUpdate(req.user._id, currentUser, {}, (err, theUser) => {
        if (err) return next(err);
        console.log(theUser);
        res.redirect('/');
      });
    });
  },
];

exports.createPoemGet = (req, res, next) => {
  // TODO Make it so only users can post poems
  // TODO Also make it so only members can see who posted what
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

exports.deletePoemsList = (req, res, next) => {
  if (req.user && req.user.member_status === 'admin') {
    Poem.find()
      .populate('user')
      .exec((err, poems) => {
        if (err) return next(err);
        res.render('delete', {
          poems,
        });
      });
  } else {
    res.render('access-error', {
      error: 'Must be an admin to delete poems',
    });
  }
};

exports.deletePoemGet = (req, res, next) => {
  if (req.user && req.user.member_status === 'admin') {
    Poem.findById(req.params.id).exec((err, poem) => {
      if (err) return next(err);
      res.render('delete-poem', {
        poem,
      });
    });
  } else {
    res.render('access-error', {
      error: 'Must be an admin to delete poems',
    });
  }
};

exports.deletePoemPost = (req, res, next) => {
  if (req.user && req.user.member_status !== 'admin') {
    res.render('access-error', {
      error: 'Must be an admin to delete poems',
    });
  } else {
    Poem.findByIdAndRemove(req.body.id, function deletePoem(err) {
      if (err) return next(err);
      res.redirect('/delete');
    });
  }
};
