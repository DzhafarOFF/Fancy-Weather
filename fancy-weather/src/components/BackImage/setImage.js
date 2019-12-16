export default (imageURL) => {
    document.body.style.backgroundImage = `url(${imageURL})`;
    document.body.style.backgroundColor = 'rgba(255,255,255,0.4)';
    document.body.style.backgroundBlendMode = 'lighten';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
}