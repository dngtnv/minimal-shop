const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth.js');
const User = require('../models/User');

const router = express.Router();

// POST /auth/signup
router.post(
  '/signup',
  [
    body('fullName').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('phone').trim().isLength({ min: 10 }),
  ],
  authController.signup
);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;
