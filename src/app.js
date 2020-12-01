const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { query } = require("express");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || "3000";

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
// setup static directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Abhishek",
		surname: "Tripathi",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Abhishek",
		surname: "Tripathi",
	});
});

const helpObj = {
	title: "Help",
	message: "This is were you can come for help",
	name: "Abhishek",
	surname: "Tripathi",
};

app.get("/help", (req, res) => {
	res.render("help", helpObj);
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address query required",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error,
				});
			}
			forecast(
				latitude,
				longitude,
				(
					error,
					{ description, temperature, humidity, max_temp, min_temp } = {}
				) => {
					if (error) {
						res.send({
							error,
						});
					}

					res.send({
						forecast: `The place has ${description}. Temperature outside is ${temperature} deg C with humidity of ${humidity}.\n\nThe maximum and minimum temperature will be ${max_temp} deg C and ${min_temp} deg C respectively!`,
						location,
						address: req.query.address,
						Weather_description: description,
						temperature,
						humidity,
					});
				}
			);
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404page", {
		errMsg: "Help article not found",
		name: "Abhishek",
		title: "404 Help",
	});
});

app.get("*", (req, res) => {
	res.render("404page", {
		title: "404",
		errMsg: "404 Page not found",
		name: "Abhishek",
	});
});

const usedPort = port;

app.listen(usedPort, () => {
	console.log(`Server is up on port ${usedPort}`);
});
