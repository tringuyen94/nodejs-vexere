const { Trip } = require("../../../models/trip.model")
const { Seat } = require("../../../models/seat.model")

const seatCodes = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12"
]

const createTrip = (req, res, next) => {
  const { fromStation, toStation, time, price } = req.body
  let seats = []
  seatCodes.map(code => {
    let newSeat = new Seat({ code, isBooked: false })
    seats.push(newSeat)
  })
  const newTrip = new Trip({ fromStation, toStation, time, price, seats })
  newTrip
    .save()
    .then(trip => {
      res.status(201).json(trip)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
const getTrip = (req, res, next) => {
  Trip.find()
    .then(trips => res.status(200).json(trips))
    .catch(err => res.status(500).json(err))
}
const getTripById = (req, res, next) => {
  const tripId = req.params
  Trip.findById(tripId)
    .then(trip => {
      if (!trip) return Promise.reject({ status: 404, messages: "Not found" })
      return res.status(200).json(trip)
    })
    .catch(err => {
      if (err.status) return res.status(err.status).messages(err.messages)
      return res.status(500).json(err)
    })
}
const updateTripById = (req, res, next) => {
  const { fromStation, toStation, price, time } = req.body
  const tripId = req.params
  Trip.findById(tripId)
    .then(trip => {
      if (!trip) return Promise.reject({ status: 404, messages: "Not found" })
      trip.fromStation = fromStation
      trip.toStation = toStation
      trip.price = price
      trip.time = time
      return trip.save()
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
const deleteTripById = (req, res, next) => {
  const tripId = req.params
  Trip.deleteOne({ _id: tripId })
    .then(result => {
      if (result.n === 0)
        return Promise.reject({ status: 404, messages: "Not found" })
      return res.status(200).json({ messages: "Deleted Successfully" })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.messages)
      return res.status(500).json(err)
    })
}
module.exports = {
  createTrip,
  getTrip,
  getTripById,
  updateTripById,
  deleteTripById
}
