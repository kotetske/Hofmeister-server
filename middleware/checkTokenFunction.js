const jwt = require('jsonwebtoken')

module.exports = function (req, res) {
    // парсим токен из Authorization-поля Headers запроса
    const token = req.headers.authorization.split(' ')[1] // Bearer sdfgsdfgdsf
    // если токена нет
    if (!token) {
        console.log("checkTokenFunc: ")
        return res.status(401).json({message: "Не авторизован"})
    }
    //console.log(jwt.verify(token, process.env.SECRET_KEY))
    // декодируем JWT токен и возвращаем
    return jwt.verify(token, process.env.SECRET_KEY)
}