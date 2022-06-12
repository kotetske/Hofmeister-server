const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getOne(req, res) {

    }

    async create(req, res) {
        const {userId, operationTypeId, parentCategoryId, iconId, name, level, income, expense} = req.body
        const category = await Category.create({
            userId,
            operationTypeId,
            parentCategoryId,
            iconId,
            name,
            level,
            income,
            expense})
        return res.json(category)
    }

    async update(req, res) {

    }

    async delete(req, res) {


    }
}

module.exports = new CategoryController()