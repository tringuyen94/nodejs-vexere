const config = require("../../../config")
const { User } = require("../../../models/user.model")
const bcrypt = require("bcryptjs")
const jsonWebToken = require("jsonwebtoken")
const { promisify } = require("util")
const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jsonWebToken.sign)

const createUser = (req, res, next) => {
  const { email, password, fullName } = req.body
  User.findOne({ email })
    .then(user => {
      if (user)
        return Promise.reject({
          status: 400,
          messages: "This email has already taken"
        })
      const newUser = new User({ email, password, fullName })
      return newUser.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
const login = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({
          status: 404,
          messages: "Email does not exists"
        })
      return Promise.all([comparePassword(password, user.password), user])
    })
    .then(result => {
      const isMatch = result[0]
      const user = result[1]
      if (!isMatch)
        return Promise.reject({
          status: 400,
          messages: "Password is incorrect"
        })
      const payload = {
        email: user.email,
        userType: user.userType
      }
      return jwtSign(payload, config.SECRET_KEY, { expiresIn: 3600 })
    })
    .then(token =>
      res.status(200).json({ messages: "Login successfully", jwt: token })
    )
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}

const getUser = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
}
const getUserById = (req, res, next) => {
  const userId = req.params
  User.findById(userId)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, messages: "User not found" })
      return res.status(200).json(user)
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
const updateUserById = (req, res, next) => {
  const { email, password, fullName, userType } = req.body
  const userId = req.params
  User.findById(userId)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, messages: "User not found" })
      user.email = email
      user.password = password
      user.fullName = fullName
      user.userType = userType
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
const deleteUser = (req, res, next) => {
  const userId = req.params
  User.deleteOne({ _id: userId })
    .then(result => {
      if (result.n === 0)
        return Promise.reject({ status: 404, messages: "User not found" })
      return res.status(200).json({ messages: "Deleted Successfully" })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
const uploadAvatar = (req, res, next) => {
  const { email } = req.user
  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" })
      user.avatar = req.file.path
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message)
      return res.status(500).json(err)
    })
}
module.exports = {
  createUser,
  login,
  getUser,
  updateUserById,
  getUserById,
  uploadAvatar,
  deleteUser
}
