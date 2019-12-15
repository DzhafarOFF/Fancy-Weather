export default class CreateDom {
    constructor(city, country, date, currentData, dailyData) {
        this.city = city;
        this.country = country;
        this.date = date;
        this.current = currentData;
        this.daily = dailyData;
    }

    create(){
        let fragment = document.createDocumentFragment();
        let contentCurrent = [
            this.city,
            this.country,
            this.date,
            this.current.summary,
            this.current.icon,
            Math.round(this.current.temperature),
            Math.round(this.current.apparentTemperature),
            Math.round(this.current.windSpeed),
            this.current.humidity
        ];
        let stylesCurrent = [
            'city',
            'country',
            'date',
            'summary',
            'icon',
            'temperature',
            'apparent-temperature',
            'wind-speed',
            'humidity'
        ];
        let contentDaily = [];
        for (let i = 0; i < 3; i++){
            let dayData = [
                this.daily[i].time,
                Math.round((this.daily[i].temperatureMin + this.daily[i].temperatureMax) / 2),
                this.daily[i].icon
            ]
            contentDaily.push(dayData);
        }
        let stylesDaily = [
            'day',
            'temperature',
            'icon'
        ];

        contentCurrent.forEach((elem, index) => {
            let div = document.createElement('div');
            div.textContent = elem;
            div.classList.add(`${stylesCurrent[index]}`);
            fragment.appendChild(div);
        });

        contentDaily.forEach(elem => {
            elem.forEach((innerElem, innerIndex) => {
                let div = document.createElement('div');
                div.textContent = innerElem;
                div.classList.add(`${stylesDaily[innerIndex]}`);
                fragment.appendChild(div);
            })
        });
        
        document.body.appendChild(fragment);
    }
}