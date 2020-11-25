
const request = require('request')

const geocode = (location,callback) => {

    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic2Fpa3Jpc2huYW5nIiwiYSI6ImNrZWU4eGFvNjEwOXcyc21pNjlib3Y3M2oifQ.AFLcOaF6gQD5q185d5iR6Q&limit=1`

    request({url : geoCodeUrl,json: true}, (error,response) => {

        if(error)
        {
            callback('Unable to connect to location services !!',null)
        }

        if(response.body['message'] || !response.body['features'].length)
        {
            callback('Please check your location. Try another location !!',null)
        }

        const lat = response.body.features[0].center[1]
        const long = response.body.features[0].center[0]
        const loc = response.body.features[0].place_name

        callback(null,{
            latitude : lat,
            longitude : long,
            location : loc
        })
    })
}

module.exports = geocode