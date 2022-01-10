const express = require('express')
const router = express.Router();

const { signup, signin, signout, getUserProfile } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/auth');


router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout)
router.route('/myProfile').get(isAuthenticatedUser, getUserProfile)

module.exports = router