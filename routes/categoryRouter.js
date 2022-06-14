const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.post('/', authMiddleware, categoryController.create)
router.patch('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router