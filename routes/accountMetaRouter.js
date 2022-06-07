const Router = require('express')
const router = new Router()
const accountMetaController = require('../controllers/accountMetaController')

router.get('/', accountMetaController.getAll)

module.exports = router