const jwt = require('jsonwebtoken')
const checkToken = require('./checkTokenFunction')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const decodedToken = checkToken(req, res)
        //console.log('decodedToken: ')
        //console.log(decodedToken)
        req.user = decodedToken
        next()
    } catch (e) {
        console.log("authMiddelware: ")
        return res.status(401).json({message: "Не авторизован"})
    }
}

/*const token = req.headers.authorization.split(' ')[1] // Bearer sdfgsdfgdsf
        // если токена нет
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded*/