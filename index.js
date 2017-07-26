const express = require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})