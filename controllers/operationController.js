const {Operation} = require("../models/models")
const ApiError = require('../error/ApiError')

class OperationController {
    async getAll(req, res) {
        /*const {operationTypeId, recipientAccId}
        const operations = await Operation.findAll()
        return res.json(operations)*/
        const {accountId, operationTypeId} = req.query
        let operations;
        if (!accountId && !operationTypeId) {
            operations = await Operation.findAll()
        }
        if (accountId && !operationTypeId) {
            operations = await Operation.findAll({where: {accountId}})
        }
        if (!accountId && operationTypeId) {
            operations = await Operation.findAll({where: {operationTypeId}})
        }
        if (accountId && operationTypeId) {
            operations = await Operation.findAll({where:{accountId, operationTypeId}})
        }
        return res.json(operations)
    }

    async getOne(req, res) {

    }

    async create(req, res, next) {
        const {operationTypeId, donorAccountId, recipientAccountId, destination, sum, date, place, comment} = req.body
        const operation = await Operation.create({
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
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new OperationController()