const fs = require('fs');
const fileName = 'location-data.json';

const fetchLocation = () => {
	try {
		const location = fs.readFileSync(fileName);
		return JSON.parse(location);
	} catch(e) {
		return [];
	}
}

const saveLocations = (location) => {	
	fs.writeFileSync(fileName, JSON.stringify(location));
}

let addLocation = (location) => {
	const locationFetch = fetchLocation();
    var currentLocation = locationFetch.filter(l => l.location === location);
    if (currentLocation.length === 0) {        
        currentLocation = [{location}];
    }    
    currentLocation.location = location;
    saveLocations(currentLocation);
};

let readLocation = () => {
	const currentLocation = fetchLocation();		
	if (currentLocation.length === 1) {
		return currentLocation[0];
	}
};

module.exports = {
	addLocation,
	readLocation
};