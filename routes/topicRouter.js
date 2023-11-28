const Router = require('express');
const router = new Router();
const topicController = require('../controllers/topicController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), topicController.create);
router.delete('/:id', checkRole('ADMIN'), topicController.deleteOne)
router.delete('/', checkRole('ADMIN'), topicController.deleteAll)
router.get('/', topicController.getAll);


module.exports = router;