const config = require("../config")
const { promisify } = require("util")

const jwt = require("jsonwebtoken")
const jwtVerify = promisify(jwt.verify)

const authentication = (req, res, next) => {
  const token = req.header("token")
  if (!token)
    return res
      .status(404)
      .json({ message: "Access denided, no token provided" })
  return jwtVerify(token, config.SECRET_KEY).then(decoded => {
    req.user = decoded
    next()
  })
}
const authorization = userTypeArray => {
  return (req, res, next) => {
    if (userTypeArray.findIndex(elm => elm === req.user.userType) !== -1)
      return next()
    return res.status(403).json({ message: "You dont' have permission" })
  }
}
module.exports = {
  authentication,
  authorization
}
