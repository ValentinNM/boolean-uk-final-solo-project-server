const express = require('express');
const { protect } = require("../../utils/authentication");

const router = express.Router();

const { getProfile, validateProfile, editProfile }   = require('./controller')

router.get('/profile/view', protect, getProfile);

router.post('/validation', protect, validateProfile);

router.patch("/profile/edit", protect, editProfile)

module.exports = router;