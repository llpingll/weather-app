const input = document.querySelector("input");
const form = document.querySelector("form");

const getCurrentTemp = (location) => {
    const baseURL = "http://api.weatherapi.com/v1/current.json?";
    const key = "key=57b222cdee564ac38e3110636232508";

    fetch(`${baseURL}${key}&q=${location}`, {mode: "cors"})
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getCurrentTemp(input.value);
});