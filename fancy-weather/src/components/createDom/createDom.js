export default class CreateDom {
    constructor(city, country, date, currentData, dailyData) {
        this.city = city;
        this.country = country;
        this.date = date;
        this.current = currentData;
        this.daily = dailyData;
    }
    
    createCurrent(){
        let currentDOM = document.createElement('div');
        currentDOM.classList.add('current');

        let locationDOM = document.createElement('div');
        locationDOM.textContent = `${this.city}, ${this.country}`;
        locationDOM.classList.add('current__location');
        currentDOM.appendChild(locationDOM);

        let timeDOM = document.createElement('div');
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timeDOM.textContent = `${new Date(this.date * 1000).toLocaleDateString('en-US', options)}`;
        timeDOM.classList.add('current__date');
        currentDOM.appendChild(timeDOM);

        let temperatureDOM = document.createElement('div');
        temperatureDOM.textContent = `${Math.round(this.current.temperature)} \xB0`;
        temperatureDOM.classList.add('current__temperature');
        currentDOM.appendChild(temperatureDOM);

        let iconDOM = document.createElement('div');
        iconDOM.innerHTML = `<img src="../src/assets/icons/${this.current.icon}.svg">`;
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

    createDaily(){
        let dailyDOM = document.createElement('div');
        dailyDOM.classList.add('daily');
        for(let i = 1; i < 4; i++){
            let wrapper = document.createElement('div');
            wrapper.classList.add('daily__days');

            let dayDOM = document.createElement('div');
            let options = { weekday: 'long' };
            dayDOM.textContent = `${new Date(this.daily[i].time * 1000).toLocaleDateString('en-US', options)}`;
            dayDOM.classList.add('daily__day');
            wrapper.appendChild(dayDOM);

            let temperatureDOM = document.createElement('div');
            temperatureDOM.textContent = `${Math.round((this.daily[i].temperatureMin + this.daily[i].temperatureMax) / 2)} \xB0`;
            temperatureDOM.classList.add('daily__temperature');
            wrapper.appendChild(temperatureDOM);
            
            let iconDOM = document.createElement('div');
            iconDOM.innerHTML = `<img src="../src/assets/icons/${this.daily[i].icon}.svg">`;
            iconDOM.classList.add('daily__icon');
            wrapper.appendChild(iconDOM);

            dailyDOM.appendChild(wrapper);
        }
        return dailyDOM;
    }

    create(){
        let fragment = document.createDocumentFragment();
        fragment.appendChild(this.createCurrent());
        fragment.appendChild(this.createDaily());
        document.body.appendChild(fragment);
    }
}