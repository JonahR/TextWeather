function createMessage(user, weatherData) {
    const metric = user.metric;

    let message = '';
    
    if(weatherData.cod !== 200) {
        return weatherData.message
    }
    if(user.main) {
        const main = weatherData.weather[0].main;
        message = `${message}Current: ${main}\n`;
    }
    if(user.description) {
        const description = weatherData.weather[0].description;
        message = `${message}Description: ${description}\n`;
    }
    if(user.temp) {
        const temp = weatherData.main.temp;
        message = `${message}Temperature: ${temp} ${metric ? 'C' : 'F'}\n`;
    }
    if(user.pressure) {
        const pressure = weatherData.main.pressure;
        message = `${message}Pressure: ${pressure} hPa\n`;
    }
    if(user.humidity) {
        const humidity = weatherData.main.humidity;
        message = `${message}Humidity: ${humidity}%\n`;
    }
    if(user.temp_min) {
        const temp_min = weatherData.main.temp_min;
        message = `${message}Min Temp: ${temp_min} ${metric ? 'C' : 'F'}\n`;
    }
    if(user.temp_max) {
        const temp_max = weatherData.main.temp_max;
        message = `${message}Max Temp: ${temp_max} ${metric ? 'C' : 'F'}\n`;
    }
    if(user.speed) {
        const speed = weatherData.wind.speed;
        message = `${message}Wind Speed: ${speed} ${metric ? 'm/s' : 'mph'}\n`;
    }
    if(user.deg) {
        const deg = weatherData.wind.deg;
        message = `${message}Direction: ${deg} deg\n`
    }
    if(user.all) {
        const all = weatherData.clouds.all;
        message = `${message}Cloud Coverage: ${all}%\n`
    }
    if(user.sunrise) {
        const sunrise = new Date(weatherData.sys.sunrise * 1000);
        const minutes = sunrise.getMinutes();
        let hours = sunrise.getHours();
        let timeOfDay = 'AM'
        if (!metric && hours > 12) {
            hours = hours - 12;
            timeOfDay = 'PM'
        }
        message = `${message}Sunset: ${metric ? hours + ':' + minutes : hours + ':' + minutes + ' ' + timeOfDay}\n`
    }
    if(user.sunset) {
        const sunset = new Date(weatherData.sys.sunset * 1000);
        const minutes = sunset.getMinutes();
        let hours = sunset.getHours();
        let timeOfDay = 'AM'
        if (!metric && hours > 12) {
            hours = hours - 12;
            timeOfDay = 'PM'
        }
        message = `${message}Sunset: ${metric ? hours + ':' + minutes : hours + ':' + minutes + ' ' + timeOfDay}\n`
    }
    if(user.notRegistered) {
        message = `${message}Sign up: Soon to be made\n`
    }

    return message;
}

module.exports = createMessage;