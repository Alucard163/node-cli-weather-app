import https from 'node:https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from "axios";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};
const getWeather = async (lat, lon) => {

    const token = process.env.token ?? await getKeyValue(TOKEN_DICTIONARY.token);

    if (!token) {
        throw new Error('Не задан ключ API, задайте его через -t [API_KEY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
            lat: lat,
            lon: lon,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    })

    return data;
}

export { getWeather, getIcon }