const config = {
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER
    },
    openWeather: {
        apiKey: process.env.OPENWEATHER_API_KEY
    },
    session: {
        secret: process.env.SESSION_SECRET
    }
};

module.exports = config;