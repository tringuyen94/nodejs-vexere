const {
  pathStations,
  definitionStation,
  definitionStations
} = require("./stations")

const config = require("../../config")

module.exports = {
  swagger: "2.0",
  host: config.host,
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: ["application / json"],
  produces: ["application / json"],
  paths: {
    "/stations": pathStations
  },
  definitions: {
    Station: definitionStation,
    Stations: definitionStations
  }
}
