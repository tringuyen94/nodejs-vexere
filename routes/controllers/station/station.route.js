const express = require("express")
const stationController = require("../station/station.controller")
const {
  authentication,
  authorization
} = require("../../../middlewares/auth.middleware")
const router = express.Router()

router.post(
  "/",
  authentication,
  authorization(["admin"]),
  stationController.createStation
)
router.get("/", stationController.getStation)
router.get("/:_id", stationController.getStationById)
router.put(
  "/:_id",
  authentication,
  authorization,
  stationController.updateStationById
)
router.delete("/:_id", authentication, stationController.deleteStationById)

module.exports = router
