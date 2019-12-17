const express = require("express")
const userControllers = require("./user.controller")
const { uploadImage } = require("../../../middlewares/upload.middleware")
const {
  authentication,
  authorization
} = require("../../../middlewares/auth.middleware")

const router = express.Router()

router.post("/", userControllers.createUser)
router.post("/login", userControllers.login)
router.put(
  "/avatar",
  authentication,
  uploadImage("avatar"),
  userControllers.uploadAvatar
)
router.get("/", userControllers.getUser)
router.get("/:_id", userControllers.getUserById)
router.put(
  "/:_id",
  authentication,
  authorization(["admin"]),
  userControllers.updateUserById
)

router.delete(
  "/:_id",
  authentication,
  authorization(["admin"]),
  userControllers.deleteUser
)

module.exports = router
