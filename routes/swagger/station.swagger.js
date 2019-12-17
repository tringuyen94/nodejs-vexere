const pathStations = {
  post: {
    tags: ["Stations"],
    summary: "Create new station",
    parameters: [
      {
        name: "station",
        in: "body",
        description: "Station with new values of properties",
        schema: {
          $ref: "#/definitions/Stations"
        }
      }
    ],
    responses: {
      "200": {
        description: "New station created",
        schema: {}
      }
    }
  },
  get: {
    tags: ["Stations"],
    summary: "Get all stations",
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/Stations"
        }
      }
    }
  }
}

const definitionStation = {
  required: ["name", "address", "province"],
  properties: {
    name: {
      type: "string"
    },
    address: {
      type: "string"
    },
    province: {
      type: "string"
    }
  }
}

const definitionStations = {
  type: "array",
  $ref: "#/definitions/station.model"
}

module.exports = {
  pathStations,
  definitionStation,
  definitionStations
}
