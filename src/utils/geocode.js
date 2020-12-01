const Axios = require("axios");

const geocode = async (address, callback) => {
	address = encodeURIComponent(address);
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;
	try {
		const { data } = await Axios.get(url, {
			params: {
				access_token:
					"pk.eyJ1IjoiYWJoaXRyaXBhdGhpMjMxMiIsImEiOiJja2huZW1zNHIwcHkzMnZybnE4dGpseXdpIn0.LZFl5NqQ4wZFIG9RbqCQmw",
				limit: 1,
			},
		});
		if (data.features.length == 0) {
			callback("No such location found. Try another search.", undefined);
		} else {
			callback(undefined, {
				latitude: data.features[0].center[1],
				longitude: data.features[0].center[0],
				location: data.features[0].place_name,
			});
		}
	} catch (err) {
		callback(err.message, undefined);
	}
};

module.exports = geocode;
