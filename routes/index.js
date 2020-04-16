var express = require('express');
var router = express.Router();
const controllers = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', controllers.indexGet);

router.get('/sign-up', controllers.signUpGet);

router.post('/sign-up', controllers.signUpPost);

router.get('/login', controllers.loginGet);

router.post('/login', controllers.loginPost);

router.get('/logout', controllers.logOut);

router.get('/upgrade-membership', controllers.upgradeMembershipGET);

router.post('/upgrade-membership', controllers.upgradeMembershipPOST);

router.get('/create-poem', controllers.createPoemGet);

router.post('/create-poem', controllers.createPoemPost);

router.get('/delete', controllers.deletePoemsList);

router.get('/delete/:id', controllers.deletePoemGet);

router.post('/delete/:id', controllers.deletePoemPost);

module.exports = router;
