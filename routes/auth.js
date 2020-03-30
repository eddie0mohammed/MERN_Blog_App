

const express = require('express');

const authController = require('../controllers/authController');

const checkAuth = require('../middlewares/checkAuth');


const router = express.Router();


// @path    POST /auth/register
// @desc    Create new user
// @access  Public
router.post('/register', authController.register);

// @path    POST /auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);


// @path    POST /auth/validate/:token
// @desc    Validate token for login
// @access  Private
router.get('/validate/:token', authController.validateAccount);


// @path    Get /auth/user
// @desc    Get current user
// @access  Private
router.get('/user', checkAuth, authController.getUser);


// @path    POST /auth/forgotPassword
// @desc    forgot password
// @access  Public
router.post('/forgotPassword', authController.forgotPassword);


// @path    GET /auth/resetPassword/:token
// @desc    get request to reset password link from emaik
// @access  Public
router.get('/resetPassword/:token', authController.redirectToResetPassword);


// @path    POST /auth/resetPassword/:token
// @desc    reset password
// @access  Public
router.post('/resetPassword/:token', authController.resetPassword);






module.exports = router;