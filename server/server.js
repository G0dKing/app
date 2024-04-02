// Server.js

// Initialize
const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const PORT = process.env.PORT || 3001

require("dotenv").config()

const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middleware
app.use(cors())
app.use(helmet())
app.use(limiter())

// Static Path
app.use(express.static(path.join(__dirname, "..", "client", "dist"), {
  maxAge: '1d',
}))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"), {
    cacheControl: true,
  })
})

// API Endpoints

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})