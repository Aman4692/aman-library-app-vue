<template>
    <div class="container">
        <div class="header">
            <h1>Weather App</h1>
            <div class="search-bar">
                <input type="text" v-model="city" placeholder="Enter City Name" class="search-input">
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>

    <main>
        <div v-if="weatherData">
            <h2>
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<script>
import axios from "axios";

const apikey = "d4b0d44502fcaa2cd9c6d74d2759644e";

export default {
    name: "App",
    data() {
        return {
            city: "",
            weatherData: null,
            hourlyForecast: [],
            dailyForecast: [],
        };
    },
    //computed is a property that is used to define a property that 
    //is dependent on other data properties. 
    //If we using a more easy to understand words to understand the concept: 
    //the derived value such as temperature automatically update when the relevant value change.
    computed: {
        //There are multiple way to obtain the data in Celsius format.
        //Calculation by yourself like below after data is retireved or via API parameters

        //Example of adding additional units requirement, if you choose this, remember to change section 3.1
        //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
        temperature() {
            return this.weatherData
                ? Math.floor(this.weatherData.main.temp - 273)
                : null;
        },
        //Get the current weather icon using the API link
        iconUrl() {
            return this.weatherData
                ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                : null;
        },
    },
    //There are two steps involved in this, 
    //step 1: identify current location 
    //step 2: after identify, get the weather data straight based on the current location.
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async searchByCity() {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;

            try {
                const response = await axios.get(url);
                //Returned data from API is stored as JSON file in weatherData
                this.weatherData = response.data;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }

        },
        //Async in a easy to understand way means the method will run in backend thread, 
        //And it won't occupy the main thread, so the user experience is still smooth
        async fetchCurrentLocationWeather() {
            //The navigator.geolocation object is part of the Web API provided by modern web browsers
            //Please note this function is not belongs to Vue or openweather.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    //API link to obtain the current weather based on the current location browser identified 
                    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    //await means wait for the fetchWeatherData method to complete before proceeding
                    await this.fetchWeatherData(url);
                });
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                //Returned data from API is stored as JSON file in weatherData
                this.weatherData = response.data;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
    }
}

</script>