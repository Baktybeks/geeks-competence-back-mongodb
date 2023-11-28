const Router = require('express');
const router = new Router();
const answerController = require('../controllers/answerController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.put('/', checkRole('ADMIN'), answerController.updateStatus)
router.get('/', answerController.getAll)
// router.get('/:id', answerController.getOne)
router.get('/user/:id', answerController.getOneUser)


module.exports = router;