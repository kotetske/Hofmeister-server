const Router = require('express')
const router = new Router()
const operationMetaController = require('../controllers/operationMetaController')
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', authMiddleware, operationMetaController.getAll)

module.exports = router