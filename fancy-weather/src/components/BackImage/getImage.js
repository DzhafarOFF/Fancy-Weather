export default (key, location, weather) => {
    const url = `https://api.unsplash.com/photos/random?query=${location}+${weather}&client_id=${key}`;
    return fetch(url).then((res) => res.json()).then((data) => data.urls.regular);
}