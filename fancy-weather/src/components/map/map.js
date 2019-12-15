import mapboxgl from 'mapbox-gl';

export default (keyMap, location) => {
    let locArr = location.split(',');
    let longitude = locArr[1];
    let latitude = locArr[0];
    console.log(locArr);
    let wrapper = document.createElement('div');
    wrapper.id = 'map';
    document.body.appendChild(wrapper);
    mapboxgl.accessToken = keyMap;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [longitude, latitude],
        zoom: 9
    });
}