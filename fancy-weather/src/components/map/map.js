import mapboxgl from 'mapbox-gl';

export default (keyMap, location) => {
    let locArr = location.split(',');
    let longitude = locArr[1];
    let latitude = locArr[0];
    console.log(locArr);
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
}