const express = require("express")
const mongoose = require('mongoose')
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth'

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }))
app.use(express.json())

mongoose.connect(MONGO_URI)
.then(() => {console.log('MongoDB is Connected')})
.catch((err) => console.log(err))

app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})