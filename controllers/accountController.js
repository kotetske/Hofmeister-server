const {Account} = require("../models/models")
const ApiError = require('../error/ApiError')

class AccountController {
    async getAll(req, res) {

    }

    async getOne(req, res) {

    }

    async create(req, res) {
        const {userId, accountTypeId, bankId, currencyId, num, name, balance, creditlimit, inArchive} = req.body
        const account = await Account.create({
            num,
            name,
            balance,
            creditlimit,
            inArchive,
            userId,
            accountTypeId,
            bankId,
            currencyId
        })
        return res.json(account)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new AccountController()