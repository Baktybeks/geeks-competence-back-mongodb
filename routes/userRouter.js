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
router.get('/', userController.getAll);
router.get('/admin/:role', userController.getAllRole);
router.get('/:id', userController.getOne);
module.exports = router;