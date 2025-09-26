const express = require('express');
const { registerUser, loginUser, updateProfile } = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', verifyToken, updateProfile)

module.exports = router;