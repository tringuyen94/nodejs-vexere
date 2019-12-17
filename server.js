require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const appRouter = require("./routes/api")
const config = require("./config")

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to database successfully`)
  })
  .catch(console.log)

const app = express()
app.use(express.json())
app.use("/", express.static("public"))
app.use("/uploads", express.static("./uploads"))

app.use("/api", appRouter)
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 2000
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
