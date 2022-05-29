const express = require('express');
const router = express.Router();
const {signing,signinp} = require('../controller/signin');

router.route('/').get(signing).post(signinp);

module.exports = router;