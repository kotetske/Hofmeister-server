const Router = require('express')
const router = new Router()
const accountController = require('../controllers/accountController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, accountController.getAll)
router.get('/:id', accountController.getOne)
router.post('/', authMiddleware, accountController.create)
router.patch('/:id', accountController.update)
router.delete('/:id', accountController.delete)

module.exports = router