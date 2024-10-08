const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware')
const whitelistMiddleware = require('../middlewares/whitelistMiddleware')

const { register, login, users, findOne, deleteUser } = require('../controllers/authController');

router.post('/register', register)
router.post('/login', login)
router.get('/users', authMiddleware, whitelistMiddleware, users)
router.get('/users/:username', authMiddleware, whitelistMiddleware, findOne)
router.delete('/users/:id', authMiddleware, whitelistMiddleware, deleteUser)

module.exports = router;
