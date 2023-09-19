'use strict';

// Form module
const form = (() => {
    const formDOM = document.querySelector("form");
    const input = document.querySelector("input");

    const getCurrentTemp = () => {
        const baseURL = "http://api.weatherapi.com/v1/current.json?";
        const key = "key=57b222cdee564ac38e3110636232508";

        return fetch(`${baseURL}${key}&q=${input.value}`, {mode: "cors"})
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(`Error: City ${input.value} not found`);
                } else {
                    throw new Error("Failed to retrieve data");
                }
            }
            return response.json();
        });
    }

    return {input, formDOM, getCurrentTemp};
})();

// Result display module
const display = (() => {
    const searchResult = document.querySelector(".search-result");
    const fields = document.querySelectorAll(".search-result *")

    const render = (data) => {
        const results = [];
        results.push(`${data.location.name}`);
        results.push(`${data.current.temp_c} °C`);
        results.push(`Feels like: ${data.current.feelslike_c}°C`);
        results.push(`Humidity: ${data.current.humidity} %`);
        results.push(`Wind: ${data.current.wind_kph} km/h`);

        for (let x in results) {
            fields[x].textContent = results[x];
        }

        if (!searchResult.classList.contains("active")) {
            searchResult.classList.add("active");
        }
        
    }

    return {render}
})();

form.formDOM.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.input.value.trim()) {
        return;
    }

    form.getCurrentTemp()
    .then(response => {
        display.render(response)
    })
    .catch(error => {
        alert(error.message);
    });
    form.formDOM.reset();
});