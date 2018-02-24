const request = require('request');

const geocodeAddress = (address, callback) => {
    request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDqkd1pU92xiGtXix-FOWeagbVEQwrH3GI`, json: true}, 
        (error, response, body) => { 
            if (error) {
                callback('unable to connect to google service');
            } else if (body.status === "ZERO_RESULTS") {
                callback('bad call');
            }
            else if (body.status === "OK") {
                callback(undefined, { address: body.results[0].formatted_address, 
                                      lat: body.results[0].geometry.location.lat, 
                                      lng: body.results[0].geometry.location.lng });                
                }
            });
    }

module.exports.geocodeAddress = geocodeAddress;