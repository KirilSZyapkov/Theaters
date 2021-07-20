const router = require('express').Router();

const { openLogin, loginUser } = require('../userControlers/loginControler');
const { openRegister, createNewUser } = require('../userControlers/registerControler');
const logout = require('./logoutControler');

router.get('/login', openLogin);
router.get('/register', openRegister);
router.get('/logout', logout);

router.post('/login', loginUser);
router.post('/register', createNewUser);

module.exports = router;