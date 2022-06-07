const {Operation} = require("../models/models")
const ApiError = require('../error/ApiError')

class OperationController {
    async getAll(req, res) {
        const operations = await Operation.findAll()
        return res.json(operations)
    }

    async getOne(req, res) {

    }

    async create(req, res, next) {

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new OperationController()