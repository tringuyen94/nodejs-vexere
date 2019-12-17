const express = require("express")
const {
  authentication,
  authorization
} = require("../../../middlewares/auth.middleware")
const ticketController = require("./ticket.controller")

const router = express.Router()

router.post(
  "/booking",
  authentication,
  authorization(["client"]),
  ticketController.bookingTicket
)

module.exports = router
