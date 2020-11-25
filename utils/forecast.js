
const request = require('request')

const forecast = (geographicDetails,callback) => {

    const {latitude,longitude,location} = geographicDetails

    const weatherUrl = `http://api.weatherstack.com/current?access_key=d3fc7990b90235d43f9a00f1eef5368d&query=${latitude},${longitude}&units=m`

    request({url : weatherUrl,json:true},(error,response) => {
        if(error)
        {
            callback('Unable to connect to weather services !!',null)
        }

        if(response.body['error'])
        {
            if(response.body.error.code === 601)
            {
                callback(`No weather data for the location ${location}`,null)
                
            }
        }

        const weather = response.body.current.temperature

        callback(null,{weather,location})
    })
}


module.exports = forecast