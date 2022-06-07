const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.post('/', categoryController.create)
router.patch('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router