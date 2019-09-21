const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.JWT_SECRET

const authenticationMiddleware = (req, res, next) => {
    const authorization = req.get('Authorization')
    if (authorization) {
        const token = authorization.replace('Bearer ', '')
        const { id } = jwt.verify(token, APP_SECRET)
        req.user = id
    }
    
    next();
}

module.exports = { authenticationMiddleware }