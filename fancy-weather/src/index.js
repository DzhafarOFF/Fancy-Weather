import GetWeatherData from './components/getWeatherData/getWeatherData';
import CreateDom from './components/createDom/createDom';
import './css/index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import setMap from './components/map/map';

const keyLocation = '82d85c7144b574';
const keyWeather = '45362111f590b80880d91dba3cb5bd2b';
const keyMap = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';

const init = async (keyLocation, keyWeather) => {
    const data = new GetWeatherData(keyLocation, keyWeather);
    const { loc, city, country } = await data.getLocation();
    //console.log(city, country);
    const { currently, daily } = await data.getWeather(loc);
    console.log(currently, daily.data, loc);
    const content = new CreateDom(city, country, currently.time, currently, daily.data);
    content.create();
    setMap(keyMap, loc);
}

init(keyLocation, keyWeather);