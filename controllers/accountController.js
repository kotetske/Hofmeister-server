const {Account} = require("../models/models")
const ApiError = require('../error/ApiError')

class AccountController {
    //получить все счета пользователя
    async getAll(req, res) {
        //const userId = req.user.id
        //const accounts = await Account.findAll({where: {userId}})
        const accounts = await Account.findAll()
        return res.json(accounts)
    }

    async getOne(req, res) {

    }

    async create(req, res) {
        const userId = req.user.id
        const {accountTypeId, bankId, currencyId, num, name, balance, creditLimit, inArchive} = req.body
        const account = await Account.create({
            userId,
            accountTypeId,
            bankId,
            currencyId,
            num,
            name,
            balance,
            creditLimit,
            inArchive
        })
        return res.json(account)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new AccountController()