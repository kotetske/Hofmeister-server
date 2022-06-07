const Router = require('express')
const router = new Router()
const accountController = require('../controllers/accountController')

router.get('/', accountController.getAll)
router.get('/:id', accountController.getOne)
router.post('/', accountController.create)
router.patch('/:id', accountController.update)
router.delete('/:id', accountController.delete)

module.exports = router