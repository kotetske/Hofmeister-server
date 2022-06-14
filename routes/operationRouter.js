const Router = require('express')
const router = new Router()
const operationController = require('../controllers/operationController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, operationController.getAll)
router.get('/:id', operationController.getOne)
router.post('/', authMiddleware, operationController.create)
router.patch('/:id', operationController.update)
router.delete('/:id', operationController.delete)

module.exports = router