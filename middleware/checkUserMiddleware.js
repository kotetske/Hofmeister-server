const checkToken = require('./checkTokenFunction')

module.exports = function (userId) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const decodedToken = checkToken(req, res)
            if (decodedToken.id !== userId) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decodedToken
            next()
        } catch (e) {
            return res.status(401).json({message: "Не авторизован"})
        }
    }
}