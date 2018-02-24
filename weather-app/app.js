const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describre: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;   

geocode.geocodeAddress(argv.a, (geoCodeErrorMsg, geoCodeResults) => {
    if (geoCodeErrorMsg){
        console.log(geoCodeErrorMsg);
    } else {
        console.log(geoCodeResults.address);
        weather.getWeather(geoCodeResults.lat, geoCodeResults.lng, (watherErrorMsg, weatherResults) => {
            if (watherErrorMsg) {
                console.log(watherErrorMsg);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
            }
        })
    }
});


