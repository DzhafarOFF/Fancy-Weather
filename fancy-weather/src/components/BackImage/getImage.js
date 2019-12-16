export default (key, location) => {
    const url = `https://api.unsplash.com/photos/random?query=town,${location}&client_id=${key}`;
    return fetch(url).then((res) => res.json()).then((data) => data.urls.regular);
}