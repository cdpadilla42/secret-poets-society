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

router.get('/upgrade-membership', controllers.upgradeMembershipGET);

router.post('/upgrade-membership', controllers.upgradeMembershipPOST);

router.get('/create-poem', controllers.createPoemGet);

router.post('/create-poem', controllers.createPoemPost);

module.exports = router;
