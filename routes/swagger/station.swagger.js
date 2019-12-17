const pathStations = {
  post: {
    tags: ["station.controller"],
    summary: "Create new station",
    parameters: [
      {
        name: "station",
        in: "body",
        description: "Station with new values of properties",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    ],
    responses: {
      "200": {
        description: "New station created",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  },
  get: {
    tags: ["station.controller"],
    summary: "Get all stations",
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  }
}

const pathStationsId = {
  parameters: [
    {
      name: "stationId",
      in: "path",
      required: true,
      description: "ID of station that we want to find",
      type: "string"
    }
  ],
  get: {
    tags: ["station.controller"],
    summary: "Get station with given ID",
    responses: {
      "200": {
        description: "Station is found",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  },
  delete: {
    summary: "Delete station with given ID",
    tags: ["station.controller"],
    responses: {
      "200": {
        description: "Station is deleted",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  },
  put: {
    summary: "Update station with give ID",
    tags: ["station.controller"],
    parameters: [
      {
        name: "station",
        in: "body",
        description: "Station with new values of properties",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    ],
    responses: {
      "200": {
        description: "Station is updated",
        schema: {
          $ref: "#/definitions/Station"
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
  $ref: "#/definitions/Station"
}

module.exports = {
  pathStations,
  pathStationsId,
  definitionStation,
  definitionStations
}
