require('dotenv').config();
const request = require('request')

const mbApiKey = process.env.MB_KEY
const language = 'en'

const geocode = (address, callback) => {
  const urlAddress = encodeURIComponent(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=${mbApiKey}&language=${language}&limit=1`
  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback('Unable to connect to location services.', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else if (body.message) {
      callback('message ' + body.message, undefined)
    } else {
      const data = body.features[0]
      callback(undefined, {
        lat: data.center[1],
        long: data.center[0],
        location: data.place_name
      })
    }
  })
}

module.exports = geocode