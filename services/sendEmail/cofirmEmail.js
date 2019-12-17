const config = require("../../config")
const nodemailer = require("nodemailer")

const fs = require("fs")
const hogan = require("hogan.js")
const template = fs.readFileSync(
  "services/sendEmail/templateEmail.hjs",
  "utf-8"
)
const compiledTemlate = hogan.compile(template)
module.exports.sendConfirmEmail = (ticket, trip, user) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD
    }
  }
  const transporter = nodemailer.createTransport(transport)
  const mailOption = {
    from: config.EMAIL,
    to: user.email,
    subject: "Mail xac nhan ban da mua ve xe thanh cong",
    html: compiledTemlate.render({
      email: user.email,
      name: user.fullName,
      fromStation: trip.fromStation.name,
      toStation: trip.toStation.name,
      price: trip.price,
      time: trip.time,
      amount: ticket.seats.length,
      seats: ticket.seats.map(seat => seat.code.toString()),
      total: ticket.totalPrice
    })
  }
  transporter.sendMail(mailOption, err => {
    if (err) {
      console.log(err.message)
    }
    console.log("success")
  })
}
