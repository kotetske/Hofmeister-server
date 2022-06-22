require('dotenv').config()
const express = require('express')
const sequelize = require('./db')           // импортируем данные для локального подключение к БД
const models = require('./models/models')
const cors = require('cors')                //импорт функции cors для отправки запросов к приложение из браузера
const router = require('./routes/index')    //импорт маршрутов для REST API
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())             //передаем app функцию CORS
app.use(express.json())     //передаем app json модуль для возможности чтения этого формата
app.use('/api', router)      //передаем app маршруты для обработки REST запросов

// Обработка ошибок, последний Middleware
app.use(errorHandler)
// app.get('/', (req,res)=>{
//     res.status(200).json({message:'WORKING!!!'})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

         //заполняем базу минимальными данными
        await models.User.create({
            email: 'kotetske1@gmail.com',
            password: '$2a$05$ns6k/iIeeCdIry1wxDm2dOIq7mnYSgNxPZpU2ngJYfUqy0qaaG03W'
        })

        await models.AccountType.create({name: 'debit'})
        await models.AccountType.create({name: 'credit'})
        await models.AccountType.create({name: 'deposit'})

        await models.Bank.create({name: 'tinkoff'})
        await models.Bank.create({name: 'sberbank'})

        await models.Currency.create({name: 'RUB'})
        await models.Currency.create({name: 'USD'})

        await models.Icon.create({url: 'url1'})
        await models.Icon.create({url: 'url2'})

        await models.OperationType.create({name: 'incomeExpense'})
        await models.OperationType.create({name: 'transfer'})
        await models.OperationType.create({name: 'debt'})

        await models.Account.create({
            num: '1111',
            name: 'Tin Black 1',
            balance: 1001,
            creditLimit: 0,
            inArchive: false,
            userId: 1,
            accountTypeId: 1,
            bankId: 1,
            currencyId: 1
        })
        await models.Account.create({
            num: '1112',
            name: 'Tin Black 2',
            balance: 1002,
            creditLimit: 0,
            inArchive: false,
            userId: 1,
            accountTypeId: 1,
            bankId: 1,
            currencyId: 1
        })
        await models.Account.create({
            num: '2221',
            name: 'Tin Platinum 1',
            balance: 0,
            creditLimit: 100000,
            inArchive: false,
            userId: 1,
            accountTypeId: 2,
            bankId: 1,
            currencyId: 1
        })
        await models.Account.create({
            num: '1211',
            name: 'Sber Virtual',
            balance: 2001,
            creditLimit: 0,
            inArchive: false,
            userId: 1,
            accountTypeId: 1,
            bankId: 2,
            currencyId: 1
        })

        await models.Category.create({
            name: 'Продукты',
            income: false,
            expense: true,
            userId: 1,
            iconId: 1,
            operationTypeId: 1
        })
        await models.Category.create({
            name: 'Проезд',
            income: false,
            expense: true,
            userId: 1,
            iconId: 1,
            operationTypeId: 1
        })
        await models.Category.create({
            name: 'Подписки',
            income: false,
            expense: true,
            userId: 1,
            iconId: 1,
            operationTypeId: 1
        })

        await models.Operation.create({
            destination: true,
            sum: 900,
            date: '2022-06-13 03:48:03+05',
            userId: 1,
            donorAccountId: 1,
            operationTypeId: 1
        })
        await models.Operation.create({
            destination: true,
            sum: 25,
            date: '2022-06-13 03:48:03+05',
            userId: 1,
            donorAccountId: 1,
            operationTypeId: 1
        })
        await models.Operation.create({
            destination: true,
            sum: 999,
            date: '2022-06-13 03:48:03+05',
            userId: 1,
            donorAccountId: 1,
            operationTypeId: 1
        })
        await models.Operation.create({
            destination: true,
            sum: 998,
            date: '2022-06-13 03:48:03+05',
            userId: 1,
            donorAccountId: 2,
            operationTypeId: 1
        })
        await models.Operation.create({
            destination: true,
            sum: 900,
            date: '2022-06-13 03:48:03+05',
            place: 'place1',
            userId: 1,
            donorAccountId: 1,
            operationTypeId: 3
        })


        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

