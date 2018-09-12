
window.addEventListener("load", function() {

    var g_latitude = -1;
    var g_longitude = -1;
    var g_weather_opts = undefined;
    var g_forecast_opts = undefined;

    function get_current_weather(lat, lon) {
        var weather_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
            "&lon=" + lon + "&appid=093fef7bb3c2696160c7f75f529ab211";

        if(g_weather_opts == undefined) {
            g_weather_opts = new Promise(function(resolve, reject) {
                window.fetch(weather_url, { mode: "cors" })
                    .then(response => {
                        response.json().then(data => {
                            var opts = {
                                icon: "http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png",
                                city: data["name"],
                                temperature: data["main"]["temp"] - 273.15,
                                humidity: data["main"]["humidity"],
                                pressure: Math.ceil(0.750 * data["main"]["pressure"]),
                                wind_speed: data["wind"]["speed"],
                                wind_angle: data["wind"]["deg"]
                            };
                            resolve(opts);
                    });
                });
            });
        }
        g_weather_opts.then(opts => {
            var current = new MozActivity({
                name: "weathr.weather.current",
                data: opts
            });
            current.onsuccess = function() { } 
        });
    }

    function extract_n_record(n, data) {
        return {
            temp: data["list"][n]["main"]["temp"] - 273.15,
            icon: "http://openweathermap.org/img/w/" + data["list"][n]["weather"][0]["icon"] + ".png",
            humidity: data["list"][n]["main"]["humidity"],
            w_speed: data["list"][n]["wind"]["speed"],
            w_angle: data["list"][n]["wind"]["deg"]
        }
    }

    function get_weather_forecast(lat, lon) {
        var weather_url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat +
            "&lon=" + lon + "&appid=093fef7bb3c2696160c7f75f529ab211";
            if(g_forecast_opts == undefined) {
                g_forecast_opts = new Promise(function(resolve, reject) {
                    window.fetch(weather_url, { mode: "cors" })
                        .then(response => {
                            response.json().then(data => {
                                var opts = {
                                    city: data["city"]["name"],
                                    today: extract_n_record(1, data),
                                    tomorrow: extract_n_record(9, data),
                                    day_after_tomorrow: extract_n_record(17, data)
                                };
                                resolve(opts);
                        });
                    });
                });
            }
            g_forecast_opts.then(opts => {
                var current = new MozActivity({
                    name: "weathr.weather.forecast",
                    data: opts
                });
                current.onsuccess = function() { } 
            });
    }

    if(navigator.onLine) {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                document.querySelector("#infoplacement").removeChild(document.querySelector("#progressbar"));
                document.querySelector("#infoplacement").innerHTML = "Ready";

                g_latitude = pos.coords.latitude.toFixed(2);
                g_longitude = pos.coords.longitude.toFixed(2);

                window.addEventListener('keydown', function(e) {
                    switch(e.key) {
                    case 'SoftLeft':
                        get_weather_forecast(g_latitude, g_longitude);
                        break;
                    case 'SoftRight':
                        get_current_weather(g_latitude, g_longitude);
                        break;
                    }                 
                });
            },
            function(err) {
                document.querySelector("#infoplacement").removeChild(document.querySelector("#progressbar"));
                document.querySelector("#infoplacement").innerHTML = "Geolocation failed";
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        document.querySelector("#infoplacement").removeChild(document.querySelector("#progressbar"));
        document.querySelector("#infoplacement").innerHTML = "Network unreachable";
    }
});
