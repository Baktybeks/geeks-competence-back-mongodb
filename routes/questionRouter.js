const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), questionController.create)
router.get('/', questionController.getAll)
// router.get('/:id', questionController.getOne)
// router.get('/st/:subtitleId', questionController.getOneIdSubtitle)
router.delete('/:id', checkRole('ADMIN'), questionController.deleteOne)
router.delete('/', checkRole('ADMIN'), questionController.deleteAll)

module.exports = router