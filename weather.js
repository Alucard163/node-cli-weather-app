#!usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message)
    }
}
const saveLat = async (lat) => {
    if (!lat.length) {
        printError('Не передано значение lat')
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.lat, lat)
        printSuccess('Значение lat сохранено')
    } catch (e) {
        printError(e.message)
    }
}

const saveLon = async (lon) => {
    if (!lon.length) {
        printError('Не передано значение lon')
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.lon, lon)
        printSuccess('Значение lon сохранено')
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const lat = process.env.lat ?? await getKeyValue(TOKEN_DICTIONARY.lat);
        const lon = process.env.lon ?? await getKeyValue(TOKEN_DICTIONARY.lon);
        const weather = await getWeather(lat, lon);

        printWeather(weather, getIcon(weather?.current?.weather[0]?.icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указаны lat или lon');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}
const initCli = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }

    if (args.lat) {
        return await saveLat(args.lat);
    }

    if (args.lon) {
        return await saveLon(args.lon);
    }

    if (args.t) {
        return saveToken(args.t)
    }

    return await getForecast();
};

initCli();