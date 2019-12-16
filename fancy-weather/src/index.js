import GetWeatherData from './components/getWeatherData/getWeatherData';
import CreateDom from './components/createDom/createDom';
import './css/index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import setMap from './components/map/map';
import getImage from './components/BackImage/getImage';
import setImage from './components/BackImage/setImage';

const keyLocation = '82d85c7144b574';
const keyWeather = '45362111f590b80880d91dba3cb5bd2b';
const keyMap = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';
const keyImage = 'dd35ccb577f7a4c040a24ecc3709702b42092274a026d730be774e16ff38e6e7';

const init = async (keyLocation, keyWeather) => {
    const data = new GetWeatherData(keyLocation, keyWeather);
    const { loc, city, country } = await data.getLocation();
    //console.log(city, country);
    const { currently, daily } = await data.getWeather(loc, 'si', 'ru');
    console.log(currently, daily.data, loc);
    const content = new CreateDom(city, country, currently.time, currently, daily.data);
    content.create();
    setMap(keyMap, loc);
    console.log(city);
    const imageURL = await getImage(keyImage, city);
    setImage(imageURL);
}

init(keyLocation, keyWeather);