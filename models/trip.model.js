const mongoose = require("mongoose")
const { SeatSchema } = require("./seat.model")

const TripSchema = new mongoose.Schema({
  fromStation: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
  toStation: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
  seats: [SeatSchema],
  time: { type: Date, required: true },
  price: { type: Number, required: true }
})

const Trip = mongoose.model("Trip", TripSchema, "Trip")

module.exports = {
  Trip,
  TripSchema
}
