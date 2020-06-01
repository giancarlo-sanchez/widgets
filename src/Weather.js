import React from 'react'


const toQueryString = (params) => {
    const parts = [];
    for (let key in params) {
      let val = encodeURIComponent(params[key]);

      if (params[key]) {
        parts.push(`${key}=${val}`);
      }
    }
    return parts.join('&');
  }


class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weather:null
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.pollWeather);
    }

    pollWeather = (location) => {
        let url = 'http://api.openweathermap.org/data/2.5/weather?';
        const params = {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        };

    /* Remember that it's unsafe to expose your API key! In production,
    you would definitely save your key in an environment variable.
    To keep API keys simple during the development of your project,
    you can set an `apiKey` variable in this file for now. */
    const apiKey = 'f352b5cc00985b904681560837fac66d';

    url += toQueryString(params);
    url += `&APPID=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((weather) => this.setState({ weather }));
  }

  render() {
    const weather = this.state.weather;
    let content = <div className='loading'>loading weather...</div>;

    if (weather) {
      const temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content = <div>
        <p>{weather.name}</p>
        <p>{temp.toFixed(1)} degrees</p>
      </div>;
    }
    return (
        <div className='weather-tab'>
          <h1 className="weather-title">Weather</h1>
          <div className='weather'>
            {content}
          </div>
        </div>
      );
    }


}

export default Weather;


//http://api.openweathermap.org/data/2.5/weather?q=Oklahoma%20city&appid=f352b5cc00985b904681560837fac66d
