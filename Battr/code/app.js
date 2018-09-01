

window.addEventListener("load", function() {

    function refreshBatteryStatus() {
        navigator.getBattery().then(function(battery) {

            document.querySelector("#level").textContent = "" + battery.level * 100 + "%";
            document.querySelector("#health").textContent = battery.health;

            document.querySelector("#charging").textContent = battery.charging ? "Charging" : "On battery";

            var batteryTime = battery.charging ? battery.chargingTime : battery.dischargingTime;
            var prefix = battery.charging ? "Battery charge time:  " : "Battery lifetime:  ";

            if(isFinite(batteryTime)) {
                var timingStr = prefix;
                var minutes = Math.floor(batteryTime / 60);
                if(minutes < 60) {
                    timingStr += "" + minutes + " min";
                } else {
                    var hours = Math.floor(minutes / 60);
                    timingStr += "" + hours;
                    if(minutes % 60 > 30) {
                        timingStr += ".5 hours";
                    } else {
                        timingStr += hours > 1 ? " hours" : "hour";
                    }
                }
                document.querySelector("#batteryTiming").textContent = timingStr;
            } else {
                document.querySelector("#batteryTiming").textContent = prefix + "n/a";
            }

            document.querySelector('#temperature').textContent = "" + battery.temperature + "°C";
        });

    }

    function handleKeyDown(e) {
        switch(e.key) {
            case "Enter":
                refreshBatteryStatus();
            break;
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    refreshBatteryStatus();
});
