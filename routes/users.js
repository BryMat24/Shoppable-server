const express = require('express');
const router = express.Router();
const Controller = require('../controller/userController');

router.post('/register', Controller.registerUser);
router.get('/verify-email', Controller.verifyEmail);
router.post('/login', Controller.loginUser);
router.post('/google-login', Controller.googleLogin);

module.exports = router;

