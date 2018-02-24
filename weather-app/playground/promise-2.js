const request = require('request');

var geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDqkd1pU92xiGtXix-FOWeagbVEQwrH3GI`, json: true}, 
        (error, response, body) => { 
            if (error) {
                reject('unable to connect to google service');
            } else if (body.status === "ZERO_RESULTS") {
                reject('bad call');
            }
            else if (body.status === "OK") {
                resolve({ address: body.results[0].formatted_address, 
                          lat: body.results[0].geometry.location.lat, 
                          lng: body.results[0].geometry.location.lng });                
            }
        });
    });    
};

geoCodeAddress('19146').then((location) => {console.log(JSON.stringify(location, undefined, 2));}, (errorMessage) => { console.log(errorMessage); });