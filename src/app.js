const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'This be the Oranga Weather App',
    name: 'Mathyou'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help is Here!',
    name: 'Mathyou',
    helpText: 'I sure wish I could help.'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mathyou',
    errorMsg: 'Help article not found.'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About This..',
    name: 'Mathyou'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide search address.'
    })
  }

  geocode(req.query.address, (err, {lat, long, location} = {}) => {
    if (err) { 
      return res.send({error: err})
    }

    forecast(lat, long, (err, data) => {
      if (err) {
        return res.send({error: err}) 
      }

      res.send({
      searchLocation: req.query.address,
      geocodeLocation: location,
      weatherForecast: data
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mathyou',
    errorMsg: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server up on port 3k.')
})
