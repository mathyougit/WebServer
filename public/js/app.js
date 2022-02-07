
const locationForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const messageOne = document.querySelector("#message-one")
const messageTwo = document.querySelector("#message-two")


locationForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = locationInput.value
  
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''


    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.geocodeLocation
          messageTwo.textContent = data.weatherForecast
        }
      })
    })
})