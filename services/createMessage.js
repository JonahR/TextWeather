function createMessage(user, weatherData) {
    let message = '';

    if(user.main.temp) {
        const temp = weatherData.main.temp;
        message = `${message}Temp: ${temp}\n`;
    }
    if(user.wind.speed) {
        const wind = weatherData.wind.speed;
        message = `${message}Wind: ${wind}\n`
    }

    return message;
}

module.exports = createMessage;