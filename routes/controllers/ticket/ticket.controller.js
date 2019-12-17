const { Ticket } = require("../../../models/ticket.model")
const { Trip } = require("../../../models/trip.model")
const { sendConfirmEmail } = require("../../../services/sendEmail/cofirmEmail")

const bookingTicket = (req, res, next) => {
  const userId = req.user.id
  const { tripId, seatCodes } = req.body
  Trip.findById(tripId)
    .populate("fromStation")
    .populate("toStation")
    .then(trip => {
      if (!trip)
        return Promise.reject({ status: 404, message: "Trip not found" })
      let availableSeats = trip.seats
        .filter(seat => !seat.isBooked)
        .map(seat => seat.code)
      let errSeat = []
      seatCodes.forEach(code => {
        if (availableSeats.indexOf(code) === -1) return errSeat.push(code)
      })
      if (errSeat.length > 0)
        return Promise.reject({
          status: 400,
          message: "Some seats are not available",
          errSeats: errSeat
        })
      const newTicket = new Ticket({
        userId,
        tripId,
        seats: seatCodes.map(code => ({
          code: code,
          isBooked: true
        })),
        totalPrice: trip.price * seatCodes.length
      })
      trip.seats = trip.seats.map(seat => {
        if (seatCodes.indexOf(seat.code) !== -1) {
          seat.isBooked = true
        }
        return seat
      })
      return Promise.all([newTicket.save(), trip.save()])
    })
    .then(result => {
      sendConfirmEmail(result[0], result[1], req.user)
      res.status(200).json(result[0])
    })
    .catch(err => {
      if (err.status)
        return res
          .status(err.status)
          .json({ message: err.message, notAvailableSeats: err.errSeats })
    })
}
module.exports = {
  bookingTicket
}
