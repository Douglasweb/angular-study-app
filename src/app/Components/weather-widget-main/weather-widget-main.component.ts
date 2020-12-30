import {Component, OnInit} from '@angular/core';

@Component({selector: 'app-weather-widget-main', templateUrl: './weather-widget-main.component.html', styleUrls: ['./weather-widget-main.component.css']})
export class WeatherWidgetMainComponent implements OnInit {

    WeatherData : any;

    constructor() {}

    ngOnInit() : void {

        this.WeatherData = {
            main: {},
            isDay: true
        };

        this.getWeatherData();
        //console.log(this.WeatherData);
    }

    getWeatherData() {

        fetch('https://api.openweathermap.org/data/2.5/weather?q=araxa&appid=ccb3a42ac8d090d52ea20bb95a086fa6')
            .then(response => response.json())
            .then(data => {
                this.setWeatherData(data);
            })
    }

    setWeatherData(data) {
        this.WeatherData = data;
        let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
        let currentDate = new Date();
        this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
        this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
        this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
        this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
        this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
        this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

    }
}
