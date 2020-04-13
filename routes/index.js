var express = require('express');
var router = express.Router();
const controllers = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', controllers.signUpGet);

router.post('/sign-up', controllers.signUpPost);

router.get('/login', controllers.loginGet);

router.post('/login', controllers.loginPost);

module.exports = router;
