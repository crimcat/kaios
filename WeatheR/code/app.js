
window.addEventListener("load", function() {

    var viewType = 0;

    document.querySelector("#prlogo").src = "icons/owmlogo.png";

    function cleanUpWeatherInformers() {
        document.querySelector("#wicon").innerHTML = "&nbsp;";
        document.querySelector("#wind").innerHTML = "&nbsp;";
        document.querySelector("#humidity").innerHTML = "&nbsp;";
        document.querySelector("#pressure").innerHTML = "&nbsp;";

        document.querySelector("#hdr_txt").innerHTML = viewType == 0 ? "Weather" : "Forecast";
    }

    function convertWindToDirection(wind_dir) {
        if(typeof wind_dir == "undef") {
            return "";
        }
        if((wind_dir >= 337.5) || (wind_dir < 22.5)) return "N";
        if((wind_dir >= 22.5) && (wind_dir < 67.5)) return "NE";
        if((wind_dir >= 67.5) && (wind_dir < 112.5)) return "E";
        if((wind_dir >= 112.5) && (wind_dir < 157.5)) return "SE";
        if((wind_dir >= 157.5) && (wind_dir < 202.5)) return "S";
        if((wind_dir >= 202.5) && (wind_dir < 247.5)) return "SW";
        if((wind_dir >= 247.5) && (wind_dir < 292.5)) return "W";
        if((wind_dir >= 292.5) && (wind_dir < 337.5)) return "NW";
        return "" + (wind_dir).toFixed(1);
    }

    function positioningFailed(err) {
        document.querySelector("#name").innerHTML = "Geolocation";
        document.querySelector("#temperature").innerHTML = "is off or failed";
    }

    function positioningSuccessOWM(pos) {
        var lat = pos.coords.latitude.toFixed(2);
        var lon = pos.coords.longitude.toFixed(2);

        if(viewType == 0) {
            var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
                "&lon=" + lon + "&appid=093fef7bb3c2696160c7f75f529ab211";

            // Obtain current weather
            window.fetch(weatherUrl, { mode: "cors" })
                .then(function(response) {
                    response.json().then(function(data) {
                        var iconUrl = "http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png"; 
                        var wicon = new Image();
                        wicon.style = "background: white";
                        wicon.width = 40;
                        wicon.height = 40;
                        wicon.onload = function() {
                            document.querySelector("#wicon").removeChild(document.querySelector("#wicon").lastChild);
                            document.querySelector("#wicon").appendChild(wicon);

                            document.querySelector("#name").innerHTML = "<h4>" + data["name"] + "</h4>";
                            document.querySelector("#temperature").innerHTML = 
                                "<h2>" + (data["main"]["temp"] - 273.15) + "°C</h2>";
                            document.querySelector("#humidity").innerHTML = "Humidity: " + data["main"]["humidity"] + "%";
                            document.querySelector("#pressure").innerHTML = "Pressure: " +
                                Math.ceil(0.750063755419211 * data["main"]["pressure"]) + " mmHg";
                            document.querySelector("#wind").innerHTML = "Wind: " + data["wind"]["speed"] + " m/s " +
                                convertWindToDirection(data["wind"]["deg"]);
                        };
                        wicon.src = iconUrl;
                    });
                });
        } else {
            var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat +
                "&lon=" + lon +  "&appid=093fef7bb3c2696160c7f75f529ab211";
            window.fetch(forecastUrl, { mode: "cors" })
                .then(function(response) {
                    response.json().then(function(data) {
                        console.log(data);
                    });
                });
        }
    }

    function updateWeatherInformer() {
        cleanUpWeatherInformers();

        if(this.navigator.onLine) {
            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
    
            document.querySelector("#name").innerHTML = "Determining";
            document.querySelector("#temperature").innerHTML = "device's location...";

            navigator.geolocation.getCurrentPosition(positioningSuccessOWM, positioningFailed, options);
        } else {
            document.querySelector("#name").innerHTML = "Network";
            document.querySelector("#temperature").innerHTML = "not reachable";
        }
    }

    function handleKeyDown(e) {
        switch(e.key) {
        case "Enter":
            if(viewType == 0) {
                viewType = 1;
            } else {
                viewType = 0;
            }
            updateWeatherInformer();
            break;
        }
    }
    document.addEventListener("keydown", handleKeyDown);

    updateWeatherInformer();
});
