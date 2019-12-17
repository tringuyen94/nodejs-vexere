const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger/swagger.index")

const router = express.Router()

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

module.exports = router
