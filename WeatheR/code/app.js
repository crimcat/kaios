

window.addEventListener("load", function() {

    var weatherProviderId = 0; // OpenWeatherMap, other values are Yandex.Погода

    function convertWind(a) {
        if((a >= 337.5) || (a < 22.5)) return "N";
        if((a >= 22.5) && (a < 67.5)) return "NE";
        if((a >= 67.5) && (a < 112.5)) return "E";
        if((a >= 112.5) && (a < 157.5)) return "SE";
        if((a >= 157.5) && (a < 202.5)) return "S";
        if((a >= 202.5) && (a < 247.5)) return "SW";
        if((a >= 247.5) && (a < 292.5)) return "W";
        if((a >= 292.5) && (a < 337.5)) return "NW";
        return "OOPS";
    }

    function positioningSuccessOWM(pos) {
        var lat = pos.coords.latitude.toFixed(2);
        var lon = pos.coords.longitude.toFixed(2);

        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +
            "&lon=" + lon + "&appid=093fef7bb3c2696160c7f75f529ab211";

        window.fetch(weatherUrl, { mode: 'cors' })
            .then(function(response) {
                response.json().then(function(data) {
                    console.log(data);

                    var iconUrl = "http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png"; 
                    console.log(iconUrl);

                    var wicon = new Image();
                    wicon.style = "background: white";
                    wicon.width = 48;
                    wicon.height = 48;
                    wicon.onload = function() {
                        document.querySelector("#wicon").removeChild(document.querySelector("#wicon").lastChild);
                        document.querySelector("#wicon").appendChild(wicon);

                        document.querySelector("#name").innerHTML = "<h2>" + data["name"] + "</h2>";
                        document.querySelector("#temperature").innerHTML =
                            "<h2>" + (data["main"]["temp"] - 273.15) + "°C</h2>";
                        document.querySelector("#humidity").innerHTML = "Humidity: " + data["main"]["humidity"] + "%";
                        document.querySelector("#pressure").innerHTML = "Pressure: " +
                            Math.ceil(0.750063755419211 * data["main"]["pressure"]) + " mmHg";
                        document.querySelector("#wind").innerHTML = "Wind: " + data["wind"]["speed"] + " m/s - " +
                            convertWind(data["wind"]["deg"]);
                    };
                    wicon.src = iconUrl;
                });
            });
    }

    function positioningSuccessYW(pos) {
        var lat = pos.coords.latitude.toFixed(2);
        var lon = pos.coords.longitude.toFixed(2);
    }

    function positioningFailed(err) {
        document.querySelector("#name").innerHTML = "Geolocation";
        document.querySelector("#temperature").innerHTML = "is off or failed";
    }

    function updateWeatherInformer(providerId) {

        document.querySelector("#wicon").innerHTML = "&nbsp;";
        document.querySelector("#wind").innerHTML = "&nbsp;";
        document.querySelector("#humidity").innerHTML = "&nbsp;";
        document.querySelector("#pressure").innerHTML = "&nbsp;";

        document.querySelector("#prlogo").src =
            weatherProviderId == 0 ? "icons/owmlogo.png" : "icons/ywlogo.png"; 

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
                weatherProviderId = (weatherProviderId + 1) % 2;
                updateWeatherInformer(weatherProviderId);
            break;
        }
    }
    document.addEventListener("keydown", handleKeyDown);

    updateWeatherInformer(0);
});
