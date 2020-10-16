const express = require('express')
const path = require('path')
require('dotenv').config();

const PORT = process.env.PORT || 9090
const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`ngphoto app running on port: ${PORT}`)
})