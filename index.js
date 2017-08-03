const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const router = express.Router()
const router2 = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//=======Next('route')=======

app.get('/hero/:name', function (req, res, next) {
  if (req.params.name === 'valhein') next('route')
  else next()
}, function (req, res, next) {
  res.send('this hero is good')
})

app.get('/hero/:name', function (req, res, next) {
  res.send(`P'Note play valhein so noob`)
})

//=========Next('router')==========

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  const path = req.originalUrl
  const law = new RegExp('\/dota.*')
  const isDota = law.test(path)

  if (isDota) return next('router')
  next()
})

router.use('/hero/:name', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

router.get('/hero/:name', function (req, res, next) {
  if (req.params.name === 'valhein') next('route')
  else next()
}, function (req, res, next) {
  console.log('any hero except valhein')
  res.send('any hero except valhein')
})

router.get('/hero/:name', function (req, res, next) {
  console.log(req.params.name)
  res.send(`P'note still gago bobo`)
})

router2.get('/', function (req, res, next) {
  res.send('this is router 2 DOTA')
})

app.use('/rov', router)
app.use('/dota', router)
app.use('/dota', router2)

//=========Start Server=========
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//========Use View Pug===========
// app.set('view engine', 'pug')
// app.get('/', function (req, res) {
//   res.render('index2', { title: 'Hey', message: 'Hello there!' })
// })

//======Error Handler=======
// app.use(function (err, req, res, next) {
//   console.error(err)
//   res.status(500).send('Something broke!')
// })