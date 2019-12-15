export default class GetWeatherData{
    constructor(keyLocation, keyWeather){
        this.keyLocation = keyLocation;
        this.keyWeather = keyWeather;
        this.location = '';
    }

    getLocation(){
        return fetch(`https://ipinfo.io?token=${this.keyLocation}`).then(response => response.json());
        //const location = await response.json();
        //return location;
    }

    getWeather(location){
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        return fetch(`${proxyUrl}https://api.darksky.net/forecast/${this.keyWeather}/${location}`).then(response => response.json());
        //const weather = await response.json();
        //return weather;
    }
}