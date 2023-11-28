const Router = require('express');
const router = new Router();
const levelController = require('../controllers/levelController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), levelController.create);
router.delete('/:id', checkRole('ADMIN'), levelController.deleteOne)
router.delete('/', checkRole('ADMIN'), levelController.deleteAll)
router.get('/', levelController.getAll);


module.exports = router;



//
// router.get('/:id', levelController.getOne)
