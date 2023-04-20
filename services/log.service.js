import chalk from 'chalk';
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' Weather ')} Погода в lat ${res?.lat} lon ${res?.lon}
        Timezone ${res?.timezone}
        ${icon} ${ res?.current?.weather[0]?.description }
        Температура ${res?.current?.temp} (ощущается как ${res?.current?.feels_like })
        Влажность ${res?.current?.humidity}%
        Скорость ветра: ${res?.current?.wind_speed}
        `
    )
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -lat [lat coordinates] координаты lat 
        -lon [lon coordinates] координаты lon
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `
    )
}

export { printError, printSuccess, printHelp, printWeather }