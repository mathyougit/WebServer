require('dotenv').config();
const request = require('request')

const weatApiKey = process.env.WEATHER_KEY
const language = 'en'

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatApiKey}&units=imperial&lang=${language}`
  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback('Unable to connect to weather services.', undefined)
    } else if (body.cod) {
      callback('Code: ' + body.cod + '. Msg: ' + body.message + '.', undefined)
    } else {
      const curData = body.current
      const dailyData = body.daily
      const curTemp = curData.temp
      const curWeather = curData.weather.map(w => w.main.toLowerCase())
      const dailySunrise = dailyData[0].sunrise
      const dailySunset = dailyData[0].sunset
      const dailyMax = dailyData[0].temp.max
      const dailyMin = dailyData[0].temp.min
      const dailyRain = dailyData[0].rain ? dailyData[0].rain : 0
      callback(undefined, 
        `Curretnly it's ${curTemp} degrees and ${curWeather}.\nToday's max is ${dailyMax} degrees and min is ${dailyMin} degrees.\nThere is expected to be ${dailyRain} mm of rain today.`
      )
    }
  })
}

module.exports = forecast