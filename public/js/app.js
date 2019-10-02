console.log('client side..')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg-1')
const msgtwo = document.querySelector('#msg-2')

// msgone.textContent = 'from js'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgone.textContent = 'Loading..'
    // console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                // console.log(data.error)
                msgone.textContent = data.error
                msgtwo.textContent = ''
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                const { location, forecast } = data;
                // msgtwo.textContent = `location: ${location}\nforecast: ${forecast}`
                msgone.textContent = forecast
                msgtwo.textContent = location
            }
        })
    })
})