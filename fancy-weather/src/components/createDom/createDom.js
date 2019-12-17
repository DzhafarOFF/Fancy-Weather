export default class CreateDom {
    constructor(city, country, date, currentData, dailyData) {
        this.city = city;
        this.country = country;
        this.date = date;
        this.current = currentData;
        this.daily = dailyData;
    }
    
    createCurrent(lang){
        let currentDOM = document.createElement('div');
        currentDOM.classList.add('current');

        let locationDOM = document.createElement('div');
        locationDOM.textContent = `${this.city}, ${this.country}`;
        locationDOM.classList.add('current__location');
        currentDOM.appendChild(locationDOM);

        let timeDOM = document.createElement('div');
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timeDOM.textContent = `${new Date(this.date * 1000).toLocaleDateString(lang, options)}`;
        timeDOM.classList.add('current__date');
        currentDOM.appendChild(timeDOM);

        let temperatureDOM = document.createElement('div');
        temperatureDOM.textContent = `${Math.round(this.current.temperature)} \xB0`;
        temperatureDOM.classList.add('current__temperature');
        currentDOM.appendChild(temperatureDOM);

        let iconDOM = document.createElement('div');
        iconDOM.innerHTML = `<img src="./icons/${this.current.icon}.svg">`;
        iconDOM.classList.add('current__icon');
        currentDOM.appendChild(iconDOM);

        let summaryDOM = document.createElement('div');
        summaryDOM.textContent = this.current.summary;
        summaryDOM.classList.add('current__summary');
        currentDOM.appendChild(summaryDOM);

        let apparentTempDOM = document.createElement('div');
        apparentTempDOM.textContent = `Feels like: ${Math.round(this.current.apparentTemperature)} \xB0`;
        apparentTempDOM.classList.add('current__apparent-temperature');
        currentDOM.appendChild(apparentTempDOM);

        let windDOM = document.createElement('div');
        windDOM.textContent = `Wind: ${Math.round(this.current.windSpeed)} m/s`;
        windDOM.classList.add('current__wind-speed');
        currentDOM.appendChild(windDOM);

        let humidityDOM = document.createElement('div');
        humidityDOM.textContent = `Humidity: ${this.current.humidity * 100} %`;
        humidityDOM.classList.add('current__humidity');
        currentDOM.appendChild(humidityDOM);

        return currentDOM;
    }

    createDaily(lang){
        let dailyDOM = document.createElement('div');
        dailyDOM.classList.add('daily');
        for(let i = 1; i < 4; i++){
            let wrapper = document.createElement('div');
            wrapper.classList.add('daily__days');

            let dayDOM = document.createElement('div');
            let options = { weekday: 'long' };
            dayDOM.textContent = `${new Date(this.daily[i].time * 1000).toLocaleDateString(lang, options)}`;
            dayDOM.classList.add('daily__day');
            wrapper.appendChild(dayDOM);

            let temperatureDOM = document.createElement('div');
            temperatureDOM.textContent = `${Math.round((this.daily[i].temperatureMin + this.daily[i].temperatureMax) / 2)} \xB0`;
            temperatureDOM.classList.add('daily__temperature');
            wrapper.appendChild(temperatureDOM);
            
            let iconDOM = document.createElement('div');
            iconDOM.innerHTML = `<img src="./icons/${this.daily[i].icon}.svg">`;
            iconDOM.classList.add('daily__icon');
            wrapper.appendChild(iconDOM);

            dailyDOM.appendChild(wrapper);
        }
        return dailyDOM;
    }

    switchLangDom() {
        let switcher = document.createElement('select');
        let langRU = document.createElement('option');
        langRU.value = 'ru';
        langRU.textContent = 'RU';
        langRU.id = 'ru';
        switcher.appendChild(langRU);
        let langEN = document.createElement('option');
        langEN.value = 'en';
        langEN.textContent = 'EN';
        langEN.id = 'en';
        switcher.appendChild(langEN);
        let langBE = document.createElement('option');
        langBE.value = 'be';
        langBE.textContent = 'BE';
        langBE.id = 'be';
        switcher.appendChild(langBE);
        switcher.id = 'lang';
        return switcher;
    }

    switchUnitsDom() {
        let switcher = document.createElement('select');
        let unitsUS = document.createElement('option');
        unitsUS.value = 'us';
        unitsUS.textContent = 'Fahrenheit';
        unitsUS.id = 'us';
        switcher.appendChild(unitsUS);
        let unitsSI = document.createElement('option');
        unitsSI.value = 'si';
        unitsSI.textContent = 'Celsius';
        unitsSI.id = 'si';
        switcher.appendChild(unitsSI);

        switcher.id = 'units';
        return switcher;
    }

    searchDom() {
        let searcher = document.createElement('div');
        let input = document.createElement('input');
        input.id = 'input';
        input.setAttribute('placeholder', 'Search...');
        let btn = document.createElement('button');
        btn.textContent = 'Search';
        btn.id = 'btn';
        searcher.appendChild(input);
        searcher.appendChild(btn);
        searcher.id = 'search';
        return searcher;
    }

    changeImageDOM() {
        let changer = document.createElement('button');
        changer.innerHTML = '&#8635;';
        changer.id = 'change';
        return changer;
    }

    create(lang = 'us', units = 'si'){
        document.body.innerHTML = '';
        let fragment = document.createDocumentFragment();
        fragment.appendChild(this.createCurrent(lang));
        fragment.appendChild(this.createDaily(lang));
        fragment.appendChild(this.switchLangDom());
        fragment.appendChild(this.switchUnitsDom());
       // fragment.appendChild(this.searchDom());
        fragment.appendChild(this.changeImageDOM());
        document.body.appendChild(fragment);
        document.getElementById(lang).setAttribute('selected', 'selected');
        document.getElementById(units).setAttribute('selected', 'selected');
    }
}