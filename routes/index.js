const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const topicRouter = require('./topicRouter')
const levelRouter = require('./levelRouter')
const subtitleRouter = require('./subtitleRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')

router.use('/user', userRouter)
router.use('/level', levelRouter)
router.use('/topic', topicRouter)
router.use('/subtitle', subtitleRouter)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)

module.exports = router