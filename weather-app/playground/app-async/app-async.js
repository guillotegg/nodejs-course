const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');

const appAsyncLocation = require('./app-async-location');

const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
        d: {
            demand: false,
            alias: 'default',
            describe: 'set default Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var addressToSearchFor;

if (argv.default) {
    // set default and exit
    appAsyncLocation.addLocation(argv.default);
    console.log("a new default location has been set.")
    return;
}

if (!argv.address) {
    const defaultAddress = appAsyncLocation.readLocation();
    if (defaultAddress) {
        addressToSearchFor = defaultAddress.location;
    }
} else {
    addressToSearchFor = argv.address;
} 

if (!addressToSearchFor) {
    console.log('There is no default address to fecth weather for. Please set one.')
    return;
}

const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressToSearchFor)}&key=AIzaSyDqkd1pU92xiGtXix-FOWeagbVEQwrH3GI`;

axios.get(geoCodeURL)
     .then((geoCodeResponse) => {
        if (geoCodeResponse.data.status === "ZERO_RESULTS") {
            throw new Error('no geocode results found');
        }
        const geoCodeResults = geoCodeResponse.data.results[0];
        console.log(geoCodeResults.formatted_address);
        const location = geoCodeResults.geometry.location;        
        const weatherURL = `https://api.darksky.net/forecast/dbd31af9ea4f8a1f5084dfbdd3c89cfa/${location.lat},${location.lng}`;
        axios.get(weatherURL)
        .then((weatherResponse) =>{
            const currently = weatherResponse.data.currently;
            console.log(`It's currently ${currently.temperature} degrees. It feels like ${currently.apparentTemperature} degrees.`);
            console.log(`Humidity is ${currently.humidity * 100}% and Pressure is ${currently.pressure}.`);
            if (currently.precipProbability > 0){
                console.log(`there is ${currently.precipProbability * 100}% probability that it rains.`);                
            } else {
                console.log("seems like it won't rain at all.");
            }
         })
     })    
     .catch((error) => {
         if (error.code==="ENOTFOUND"){
            console.log('unable to reach google geocode service!');
         } else {
             console.log(error.message);
         }
     });


