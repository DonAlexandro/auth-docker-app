const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/UserController');
const { signupValidator } = require('../utils/validators');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/signup', signupValidator, UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/users', AuthMiddleware, UserController.getUsers);

module.exports = router;
