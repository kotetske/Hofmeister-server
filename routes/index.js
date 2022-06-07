// маршруты для REST запросов на сервер, главный роутер (корневой)
// в роутерах прописаны url по которым будут работать REST-запросы приложения
const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const accountRouter = require('./accountRouter')
const operationRouter = require('./operationRouter')
const categoryRouter = require('./categoryRouter')
const accountMetaRouter = require('./accountMetaRouter')
const operationMetaRouter = require('./operationMetaRouter')

router.use('/user', userRouter)
router.use('/account', accountRouter)
router.use('/operation', operationRouter)
router.use('/category', categoryRouter)
router.use('/accountMeta', accountMetaRouter)
router.use('/operationMeta', operationMetaRouter)

module.exports = router