const express = require("express")
const stationRoute = require("./controllers/station/station.route")
const tripRoute = require("./controllers/trip/trip.route")
const userRoute = require("./controllers/user/user.route")
const ticketRoute = require("./controllers/ticket/ticket.router")

const router = express.Router()

router.use("/stations", stationRoute)
router.use("/trips", tripRoute)
router.use("/users", userRoute)
router.use("/tickets", ticketRoute)

module.exports = router
