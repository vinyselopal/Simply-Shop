const express = require('express')
const app = express()
const cors = require('cors')

const { initDB } = require('./config/initDB.js')
app.use(express.json())
app.use(cors())

initDB()


