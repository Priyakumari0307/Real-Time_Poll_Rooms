const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', auth, getUser);

module.exports = router;
