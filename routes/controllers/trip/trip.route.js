const express = require("express")
const tripController = require("../trip/trip.controller")
const {
  authentication
} = require("../../../middlewares/auth.middleware")

const router = express.Router()

router.post("/", authentication, tripController.createTrip)
router.get("/", tripController.getTrip)
router.get("/:_id", tripController.getTripById)
router.put("/:_id", authentication, tripController.updateTripById)
router.delete("/:_id", authentication, tripController.deleteTripById)

module.exports = router
