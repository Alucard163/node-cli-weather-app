# Node.js OpenWeather console app
This console application main use case is showing weather forecast with help of ```https://api.openweathermap.org/data/3.0/onecall```. \
To run in console use ``node weather.js``.\
Arguments list:\
Without params - return weather forecast for saved coords (lat and lon)\
```-lat [lat coordinates]``` lat coordinate \
```-lon [lon coordinates]``` lon coordinate \
```-h``` for help\
```-t [API_KEY]``` for saving token\
First time you need to save token(```node weather.js -t [token-value]```), then lat and lon values. \
After this you are ready to use app. 
