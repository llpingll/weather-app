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
                    // console.log("Error 400");
                    throw new Error(`Error: City ${input.value} not found`);
                } else {
                    // console.log("Error failed");
                    throw new Error("Failed to retrieve data");
                }
            }
            return response.json();
        });
    }

    return {input, formDOM, getCurrentTemp};
})();

form.formDOM.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.input.value.trim()) {
        return;
    }

    form.getCurrentTemp()
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        alert(error.message);
    });
    // .finally(display.render());
    formDOM.reset();
});