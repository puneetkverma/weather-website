const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b5144870eab9bbfe7b3e3f37f13fc3dc/'+latitude+','+longitude+'?units=si'
    request({ url, json:true}, (error, {body})=>{
        if(error) {
            callback('something went wrong!')
        } else if(body.error){
            callback('unable to find location')
        } else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}

module.exports = forecast