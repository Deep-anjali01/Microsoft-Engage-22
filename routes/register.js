const express = require('express');
const router = express.Router();
const {userSchema} = require('../model/register');
const {registerg,registerp} = require('../controller/register');

router.route('/').get(registerg).post(registerp);


module.exports = router;