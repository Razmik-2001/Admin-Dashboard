const express = require('express');
const router = express.Router();
const {register, login, fetchUser} = require('../controller/AuthController');
const authMiddleware = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/getUserInfo', authMiddleware, fetchUser);

module.exports = router;