const request = require('request');

const getWeather = (lat, lng, callback) => {
request({url: `https://api.darksky.net/forecast/dbd31af9ea4f8a1f5084dfbdd3c89cfa/${lat},${lng}`, json: true}, 
        (error, response, body) => { 
            if (!error && response.statusCode === 200){
                callback(undefined, { temperature: body.currently.temperature, apparentTemperature: body.currently.apparentTemperature }) 
            } else {
                callback('unable to reach forecast service');
            }
        });
}

module.exports.getWeather = getWeather;
