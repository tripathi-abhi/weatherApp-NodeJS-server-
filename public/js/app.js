const weatherForm = document.querySelector("#weatherForm");
const addressInput = document.querySelector(".addressInput");
const errorTag = document.querySelector(".formError");
const forecastTag = document.querySelector(".formForecast");

weatherForm.addEventListener("submit", (e) => {
	errorTag.innerHTML = "";
	forecastTag.innerHTML = "";
	const params = {
		address: addressInput.value,
		errorTag,
		forecastTag,
	};
	errorTag.innerHTML =
		'<img height="150" width="200" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loader">';
	fetchForecast(params);
	e.preventDefault();
});

const fetchForecast = ({ address, errorTag, forecastTag }) => {
	fetch(`/weather?address=${address}`)
		.then((response) => {
			response
				.json()
				.then((data) => {
					if (!data.error) {
						errorTag.innerHTML = "";
						forecastTag.innerHTML = `<span>${data.location}</span> <br /><br /> <span>${data.forecast}</span>`;
					} else {
						errorTag.innerHTML = data.error;
					}
				})
				.catch((error) => {
					errorTag.innerHTML = error.message;
				});
		})
		.catch((error) => {
			errorTag.innerHTML = error.message;
		});
};
