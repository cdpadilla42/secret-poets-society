var express = require('express');
var router = express.Router();
const controllers = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/sign-up', controllers.signUpGet);

router.post('/sign-up', controllers.signUpPost);

router.get('/login', controllers.loginGet);

router.post('/login', controllers.loginPost);

router.get('/logout', controllers.logOut);

router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next;
});

module.exports = router;
