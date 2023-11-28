const Router = require('express');
const {
  registerValidation,
  loginValidation
} = require('../validations');
const router = new Router();
const userController = require('../controllers/userController');
const handleValidationErrors = require('../middleware/handleValidationErrors');


router.post('/registration', registerValidation, handleValidationErrors, userController.registration);
router.post('/login', loginValidation, handleValidationErrors, userController.login);
router.get('/', userController.getAllUsers);
router.get('/admin/:role', userController.getAllAdminUsers);
router.get('/:id', userController.getOneUser);
module.exports = router;