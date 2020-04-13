const { body, validationResults, sanitizeBody } = require('express-validator');
const User = require('../models/user');

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

  // sanitize
  sanitizeBody('first_name').escape(),
  sanitizeBody('last_name').escape(),
  sanitizeBody('username').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('membership').trim().escape(),

  // process request
  (req, res, next) => {
    // TODO: VALIDATE PASSWORD
    // Create new user
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      // TODO: ENCRYPT PASSWORD
      password: req.body.password,
      member_status: req.body.member_status,
    });
    // handle errors
    const errors = validationResults(req);
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
  },
];

exports.loginGet = (req, res) => {
  res.send('NOT IMPLEMENTED: loginGet');
};

exports.loginPost = (req, res) => {
  res.send('NOT IMPLEMENTED: loginPost');
};
