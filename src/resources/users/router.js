const express = require('express');
const { protect } = require("../../utils/authentication");

const router = express.Router();

const { getProfile, validateProfile }   = require('./controller')

router.get('/profile/view', protect, getProfile);
// router.get('/profile/view', getProfile);

router.post('/validate', protect, validateProfile);

module.exports = router;