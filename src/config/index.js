import 'dotenv/config'

export const Config = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    OPEN_WEATHER_API_URL: process.env.OPEN_WEATHER_API_URL,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    API_PREFIX: '/api',
    API_VERSION: 'v1',
}