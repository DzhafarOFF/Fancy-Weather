import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default (keyMap, location) => {
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
        if (geocoder.inputString != '') `${e.result.center[1]},${e.result.center[0]}`;
    });
}