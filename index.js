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
app.use('/api',router)      //передаем app маршруты для обработки REST запросов

// Обработка ошибок, последний Middleware
app.use(errorHandler)
// app.get('/', (req,res)=>{
//     res.status(200).json({message:'WORKING!!!'})
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

