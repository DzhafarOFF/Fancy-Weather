import GetWeatherData from './components/getWeatherData/getWeatherData';
import CreateDom from './components/createDom/createDom';
import './css/index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
//import setMap from './components/map/map';
import getImage from './components/BackImage/getImage';
import setImage from './components/BackImage/setImage';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const keyLocation = '82d85c7144b574';
const keyWeather = '45362111f590b80880d91dba3cb5bd2b';
const keyMap = 'pk.eyJ1IjoiZGphZmFyIiwiYSI6ImNrNDdnYWx4bjBzM24zbGxmNHlpZXRrd3oifQ.aVZeGMHH56sUL59KJpMihg';
const keyImage = 'dd35ccb577f7a4c040a24ecc3709702b42092274a026d730be774e16ff38e6e7';
let language = 'en';
let units = 'si';

export const init = async (keyLocation, keyWeather, language, units, location = undefined) => {
    const setMap = (keyMap, location) => {
        let locArr = location.split(',');
        let longitude = locArr[1];
        let latitude = locArr[0];
        let wrapper = document.createElement('div');
        wrapper.id = 'map';
        let coordinates = document.createElement('div');
        coordinates.id ='info';
        document.body.appendChild(wrapper);
        document.body.appendChild(coordinates);
        mapboxgl.accessToken = keyMap;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [longitude, latitude],
            zoom: 9
        });
    
        map.on('mousemove', function(e) {
            document.getElementById('info').innerHTML = `Longitude: ${e.lngLat["lng"].toFixed(2)} <br>
                                                         Latitude: ${e.lngLat["lat"].toFixed(2)}`;
        });
        let geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        map.addControl(geocoder);
        geocoder.on('result', (e) =>{
            if (geocoder.inputString != '') {
                let location = {
                    loc: `${e.result.center[1]},${e.result.center[0]}`,
                    city: e.result['text_en-US'],
                    country: e.result.context[1]['text_en-US']
                }
                console.log(location.city, location.country);
                init(keyLocation, keyWeather, language, units, location)
            };
        });
    }
    const data = new GetWeatherData(keyLocation, keyWeather);
    if (!location) {
        const { loc, city, country } = await data.getLocation();
        const { currently, daily } = await data.getWeather(loc, units, language);
        const content = new CreateDom(city, country, currently.time, currently, daily.data);
        content.create(language, units);
        setMap(keyMap, loc);
        const imageURL = await getImage(keyImage, city, currently.icon);
        setImage(imageURL);
        const lang = document.getElementById('lang');
        lang.onchange = async (event) => {
            const newLang = event.target.value;
            init(keyLocation, keyWeather, newLang, units);
        }
        const unitsSys = document.getElementById('units');
        unitsSys.onchange = async (event) => {
            const newUnits = event.target.value;
            init(keyLocation, keyWeather, language, newUnits);
        }
        const changeImage = document.getElementById('change');
        changeImage.onclick = async (event) => {
            init(keyLocation, keyWeather, language, units);
        }
    }
    else {
        const { loc, city, country } = location;
        const { currently, daily } = await data.getWeather(loc, units, language);
        const content = new CreateDom(city, country, currently.time, currently, daily.data);
        content.create(language, units);
        setMap(keyMap, loc);
        const imageURL = await getImage(keyImage, city, currently.icon);
        setImage(imageURL);
        const lang = document.getElementById('lang');
        lang.onchange = async (event) => {
            const newLang = event.target.value;
            init(keyLocation, keyWeather, newLang, units);
        }
        const unitsSys = document.getElementById('units');
        unitsSys.onchange = async (event) => {
            const newUnits = event.target.value;
            init(keyLocation, keyWeather, language, newUnits);
        }
        const changeImage = document.getElementById('change');
        changeImage.onclick = async (event) => {
            init(keyLocation, keyWeather, language, units);
        }
    }
}

init(keyLocation, keyWeather, language, units);