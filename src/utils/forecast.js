const request = require('request')



const forecast = (lat,long,callback) =>{
    const url ='http://api.weatherapi.com/v1/forecast.json?key=611a4899556848bda6513200212409&q='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&days=10&aqi=yes&alerts=yes?'

        
        request({url, json: true}, (error, {body}) => {
            if (error){
               callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location please provide valid location', undefined)
            } else {
              callback(undefined,`${body.forecast.forecastday[0].day.condition.text}. It is currently ${body.current.temp_c}c° degrees out. There is a ${body.forecast.forecastday[0].day.totalprecip_mm}% chance of rain.`)
            }
        })

}

module.exports = forecast