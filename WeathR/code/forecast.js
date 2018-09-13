
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

    function weather_informer_as_html(witem, day_inc) {
        var now = new Date();
        now.setDate(now.getDate() + day_inc);
        var month = now.getMonth() + 1;
        var day = now.getDate();

        return "<b>" + day + "/" + month + ":</b>&nbsp;" +
            "<img style='vertical-align: middle; height: 40px; width: 40px;' src='" + witem.icon + "'/>&nbsp" +
            "<b>" + Math.round(witem.temp) + "°C</b>";
    }

    navigator.mozSetMessageHandler('activity', function(activity_request) {
        params = activity_request.source
        if(params.name === "weathr.weather.forecast") {
            var opts = params.data;
            document.querySelector("#city_name").innerHTML = "<h3>" + opts.city + "</h3>";
            document.querySelector("#today").innerHTML = weather_informer_as_html(opts.today, 0);
            document.querySelector("#tomorrow").innerHTML = weather_informer_as_html(opts.tomorrow, 1);
            document.querySelector("#day_after_tomorrow").innerHTML = weather_informer_as_html(opts.day_after_tomorrow, 2);
        }
    });

}, false);
