const Axios = require("axios");
const api_key = "a1af5e122581fbde76be2179d9187c87";
const forecast = async (lat, long, callback) => {
	if (lat === undefined || long === undefined) {
		const errormsg =
			(lat === undefined ? "Latitude " : "Longitude ") + "not provided";
		callback(errormsg, undefined);
	} else {
		const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${api_key}&exclude=hourly`;
		try {
			const { data } = await Axios.get(url);
			if (!data.current) {
				callback("No forecast available for the location.", undefined);
			}
			callback(undefined, {
				description: data.current.weather[0].description,
				temperature: Math.round((data.current.temp - 273) * 100) / 100,
				humidity: data.current.humidity,
			});
		} catch (err) {
			callback(err, undefined);
		}
	}
};

module.exports = forecast;
