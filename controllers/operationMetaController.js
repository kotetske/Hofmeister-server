const {OperationType} = require("../models/models");

class OperationMetaController {
    async getAll(req, res) {
        const operationTypes = await OperationType.findAll()
        return res.json(operationTypes)
    }
}

module.exports = new OperationMetaController()