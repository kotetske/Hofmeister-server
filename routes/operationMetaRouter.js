const Router = require('express')
const router = new Router()
const operationMetaController = require('../controllers/operationMetaController')

router.get('/', operationMetaController.getAll)

module.exports = router