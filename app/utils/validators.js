const { body } = require('express-validator');

exports.signupValidator = [
  body('email').isEmail().normalizeEmail().trim(),
  body('password').isAlphanumeric().isLength({ min: 8 })
];
