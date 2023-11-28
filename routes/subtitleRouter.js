const Router = require('express');
const router = new Router();
const subtitleController = require('../controllers/subtitleController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), subtitleController.create);
router.delete('/:id', checkRole('ADMIN'), subtitleController.deleteOne)
router.delete('/', checkRole('ADMIN'), subtitleController.deleteAll)
router.get('/', subtitleController.getAll);


module.exports = router;