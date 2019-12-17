const { Station } = require("../../../models/station.model")

const createStation = (req, res, next) => {
  const { name, address, province } = req.body
  const newStation = new Station({ name, address, province })
  newStation
    .save()
    .then(station => res.status(201).json(station))
    .catch(err => res.status(400).json(err))
}
const getStation = (req, res, next) => {
  Station.find()
    .then(stations => res.status(200).json(stations))
    .catch(err => res.status(404).json(err))
}
const getStationById = (req, res, next) => {
  const stationId = req.params
  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({ status: 404, message: "Not found" })
      return res.status(200).json(station)
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message)
      return res.status(500).json(err)
    })
}
const updateStationById = (req, res, next) => {
  const { name, address, province } = req.body
  const stationId = req.params
  Station.findById(stationId)
    .then(station => {
      if (!station) return Promise.reject({ status: 404, message: "Not found" })
      station.name = name
      station.address = address
      station.province = province
      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message)
      return res.status(500).json(err)
    })
}
const deleteStationById = (req, res, next) => {
  const stationId = req.params
  Station.deleteOne({ _id: stationId })
    .then(result => {
      if (result.n == 0)
        return Promise.reject({ status: 404, message: "Not found" })
      return res.status(200).json({ message: "Deleted Successfully" })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(err.message)
      return res.status(500).json(err)
    })
}

module.exports = {
  createStation,
  getStation,
  getStationById,
  updateStationById,
  deleteStationById
}
