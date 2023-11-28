const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const levelRouter = require('./levelRouter')

router.use('/user', userRouter)
router.use('/level', levelRouter)

module.exports = router