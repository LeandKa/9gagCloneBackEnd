const express = require('express');

const router = express.Router();
const auth = require('../Controllers/auth');

router.post('/login',auth.postLogin);
router.post('/signup',auth.postSignup);
router.post('/logout',auth.postLogout);



module.exports = router;