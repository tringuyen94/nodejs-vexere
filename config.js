require("dotenv").config()

let MONGO_URI
let SECRET_KEY
let EMAIL
let PASSWORD
switch (process.env.NODE_ENV) {
  case "LOCAL":
    MONGO_URI = process.env.MONGO_URI_LOCAL
    SECRET_KEY = process.env.SECRET_KEY_LOCAL
    EMAIL = process.env.EMAIL
    PASSWORD = process.env.PASSWORD
    break
  case "STAGING":
    MONGO_URI = process.env.MONGO_URI_STAGING
    SECRET_KEY = process.env.SECRET_KEY_STAGING
    EMAIL = process.env.EMAIL
    PASSWORD = process.env.PASSWORD
    break
  default:
    break
}
module.exports = {
  MONGO_URI,
  SECRET_KEY,
  EMAIL,
  PASSWORD
}
