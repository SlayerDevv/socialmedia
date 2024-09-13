const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const header = req.headers.authorization
    const token = header.split(" ")[1]
    if(!token) return res.status(401).json({msg: 'No token, authorization denied'})

    try {
    jwt.verify(token, process.env.SECRET_KEY);
      next();
    }catch (err){
        return res.status(401).json({msg: 'Token is invalid t'})
    }
}

module.exports = {auth}