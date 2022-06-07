const Router = require('express')
const router = new Router()
const operationController = require('../controllers/operationController')

router.get('/', operationController.getAll)
router.get('/:id', operationController.getOne)
router.post('/', operationController.create)
router.patch('/:id', operationController.update)
router.delete('/:id', operationController.delete)

module.exports = router