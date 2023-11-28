const Router = require('express');
const router = new Router();
const levelController = require('../controllers/levelController');


router.post('/', levelController.create);
router.get('/', levelController.getAll);
module.exports = router;