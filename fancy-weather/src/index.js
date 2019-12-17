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
let language = 'en';
let units = 'si';

export const init = async (keyLocation, keyWeather, language, units, location = undefined) => {
    if (!location){
        //todo: change dom
    }
    const data = new GetWeatherData(keyLocation, keyWeather);
    const { loc, city, country } = await data.getLocation();
    const { currently, daily } = await data.getWeather(loc, units, language);
    const content = new CreateDom(city, country, currently.time, currently, daily.data);
    content.create(language, units);
    setMap(keyMap, loc, init);
    const imageURL = await getImage(keyImage, city, currently.icon);
    setImage(imageURL);
    const lang = document.getElementById('lang');
    lang.onchange = async (event) => {
        const newLang = event.target.value;
        console.log(newLang);
        //event.target.setAttribute('selected','selected');
        init(keyLocation, keyWeather, newLang, units);
    }
    const unitsSys = document.getElementById('units');
    unitsSys.onchange = async (event) => {
        const newUnits = event.target.value;
        console.log(newUnits);
        //event.target.setAttribute('selected','selected');
        init(keyLocation, keyWeather, language, newUnits);
    }
    const changeImage = document.getElementById('change');
    changeImage.onclick = async (event) => {
        init(keyLocation, keyWeather, language, units);
    }
}

init(keyLocation, keyWeather, language, units);