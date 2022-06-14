const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    //создаем нового пользователя в БД
    async registration(req, res, next) {
        // получаем регистрационные данные пользователя из запроса
        const {email, password} = req.body
        //если нет емейла или пароля
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        //проверка существует ли такой пользователь в БД
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //хэшируем пароль чтобы не хранить его в открытом виде в БД
        const hashPassword = await bcrypt.hash(password, 5)
        //Создаем в БД пользователя с хэшированным паролем
        const user = await User.create({email, password: hashPassword})
        //вызываем функцию генерации JWT токена
        const token = generateJwt(user.id, user.email)
        // передаем в response сгенерированный JWT-токен
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        //console.log(req.user.id)
        //res.json({message: "ВСЁ РАБОТАЕТ!!!"})
        console.log("req.user.id" + req.user.id)
        console.log("req.user.email" + req.user.email)
        const token = generateJwt(req.user.id, req.user.email)
        //res.json({message: "ВСЁ РАБОТАЕТ!!!"})
        return res.json({token})

        /*const {id} = req.query
        if (!id) {
            next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)*/
    }
}

/*class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return  res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}*/

module.exports = new UserController()