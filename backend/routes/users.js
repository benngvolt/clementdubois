const express = require ('express');
const router = express.Router();
const usersCtrl = require ('../controllers/users');
const loginRateLimit = require('../middlewares/loginRateLimit');

// router.post('/signup', usersCtrl.signup);
router.post('/', loginRateLimit, usersCtrl.logIn);

module.exports = router;
