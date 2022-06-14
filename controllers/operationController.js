const {Operation} = require("../models/models")
const ApiError = require('../error/ApiError')


class OperationController {
    async getAll(req, res) {
        /*const {operationTypeId, recipientAccId}
        const operations = await Operation.findAll()
        return res.json(operations)*/
        let {donorAccountId, operationTypeId, limit, page} = req.query
        const userId = req.user.id
        console.log(req.body.donorAccountId)
        console.log("OperationController")
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let operations;
        if (!donorAccountId && !operationTypeId) {
            operations = await Operation.findAndCountAll({where: {userId}, limit, offset})
        }
        if (donorAccountId && !operationTypeId) {
            operations = await Operation.findAndCountAll({where: {userId, donorAccountId}, limit, offset})
        }
        if (!donorAccountId && operationTypeId) {
            operations = await Operation.findAndCountAll({where: {userId, operationTypeId}, limit, offset})
        }
        if (donorAccountId && operationTypeId) {
            operations = await Operation.findAndCountAll({
                where: {userId, donorAccountId, operationTypeId},
                limit,
                offset
            })
        }
        return res.json(operations)
    }

    async getOne(req, res) {

    }

    async create(req, res, next) {
        const userId = req.user.id
        try {
            const {
                userId,
                operationTypeId,
                donorAccountId,
                recipientAccountId,
                destination,
                sum,
                date,
                place,
                comment
            } = req.body
            const operation = await Operation.create({
                userId,
                operationTypeId,
                donorAccountId,
                recipientAccountId,
                destination,
                sum,
                date,
                place,
                comment
            })
            return res.json(operation)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new OperationController()