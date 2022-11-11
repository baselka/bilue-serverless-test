import axios from "axios";
import { Config } from "../config/index.js";
import { CustomError } from "../errors/index.js";

const {OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY} = Config

export const getWeather = async (req, res) => {
    
    const {post_code, country_code} = req.query

    if(!post_code || !country_code) {
        throw new CustomError('Missing post_code or country_code!', 401)
    }

    try {
      const response = await axios.get(`${OPEN_WEATHER_API_URL}/data/2.5/weather?zip=${post_code},${country_code}&appid=${OPEN_WEATHER_API_KEY}`)
    
      const data = {
        "lon": response.data.coord.lon,
        "lat":response.data.coord.lat,
        "main": response.data.weather[0].main,
        "description": response.data.weather[0].description,
        "temp": response.data.main.temp,
        "feels_like":response.data.main.feels_like,
        "temp_min":response.data.main.temp_min,
        "temp_max": response.data.main.temp_max,
        "pressure": response.data.main.pressure,
        "humidity": response.data.main.humidity
    }
      res.status(200).send(data)
    } catch (error) {
        throw new CustomError(error, 500)
    }
}