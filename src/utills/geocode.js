const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHVuZWV0a3YiLCJhIjoiY2swcGpsYmxzMDc5NzNkb3Z0ODIwcmQ1MCJ9.BBi13NUALNkbHixrnd5FDQ&limit=1'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            const center = body.features[0].center
            callback(undefined, {
                latitude: center[1],
                logitude: center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode