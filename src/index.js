require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

const signupRouter = require("./resources/auth/router")
const tradesRouter = require("./resources/trades/router")
const userRouter = require("./resources/users/router")
const {protect} = require('./utils/authentication')

/* SETUP MIDDLEWARE */

app.disable("x-powered-by")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

/* SETUP ROUTES */

app.use("/auth", signupRouter)
app.use("/trades", protect, tradesRouter)
app.use("/users", protect, userRouter)

app.get("*", (req, res) => {
  res.json({ ok: true })
})

/* START SERVER */

const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`)
})