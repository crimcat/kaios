
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

    function weather_informer_as_html(witem, label) {
        return "&nbsp;&nbsp;&nbsp;<img style='vertical-align: middle; height: 40px; width: 40px;' src='" +
            witem.icon + "'/>&nbsp<b>" + Math.round(witem.temp) + "°C</b>";
    }

    navigator.mozSetMessageHandler('activity', function(activity_request) {
        params = activity_request.source
        if(params.name === "weathr.weather.forecast") {
            var opts = params.data;
            document.querySelector("#city_name").innerHTML = "<h3>" + opts.city + "</h3>";
            document.querySelector("#soon").innerHTML = weather_informer_as_html(opts.soon);
            document.querySelector("#label_soon").innerHTML = "<b>Soon&nbsp;</b>";
            document.querySelector("#cast01").innerHTML = weather_informer_as_html(opts.cast_01);
            document.querySelector("#label_cast01").innerHTML = "<b>" + opts.label_01 + "&nbsp;</b>";
            document.querySelector("#cast02").innerHTML = weather_informer_as_html(opts.cast_02);
            document.querySelector("#label_cast02").innerHTML = "<b>" + opts.label_02 + "&nbsp;</b>";
            document.querySelector("#cast03").innerHTML = weather_informer_as_html(opts.cast_03);
            document.querySelector("#label_cast03").innerHTML = "<b>" + opts.label_03 + "&nbsp;</b>";
        }
    });

}, false);
