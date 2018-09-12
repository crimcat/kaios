
window.addEventListener('DOMContentLoaded', function() {

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

    navigator.mozSetMessageHandler('activity', function(activity_request) {
        params = activity_request.source
        if(params.name === "weathr.weather.current") {
            var opts = params.data;
            var wicon = new Image();
            wicon.style = "background: white";
            wicon.width = 40;
            wicon.height = 40;
            wicon.onload = function() {
                document.querySelector("#wicon").removeChild(document.querySelector("#wicon").lastChild);
                document.querySelector("#wicon").appendChild(wicon);

                document.querySelector("#name").innerHTML = "<h4>" + opts.city + "</h4>";
                document.querySelector("#temperature").innerHTML = 
                    "<h2>" + Math.ceil(opts.temperature) + "°C</h2>";
                document.querySelector("#humidity").innerHTML = "Humidity: " + opts.humidity + "%";
                document.querySelector("#pressure").innerHTML = "Pressure: " +
                    opts.pressure + " mmHg";
                document.querySelector("#wind").innerHTML = "Wind: " + opts.wind_speed + " m/s " +
                    convertWindToDirection(opts.wind_angle);
            };
            wicon.src = opts.icon;
        }
    });

}, false);
