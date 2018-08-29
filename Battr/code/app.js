

window.addEventListener("load", function() {

    Number.prototype.pad = function(size) {
        var s = String(this);
        while(s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    }

    function refreshBatteryStatus() {
        navigator.getBattery().then(function(battery) {

            document.querySelector('#level').textContent = '' + battery.level * 100 + '%';
            document.querySelector('#health').textContent = battery.health;

            document.querySelector('#charging').textContent = battery.charging ? 'yes' : 'no';

            var batteryTime = battery.charging ? battery.chargingTime : battery.dischargingTime;
            var prefix = battery.charging ? 'Time to charge:  ' : 'Time to discharge:  ';

            if(isFinite(batteryTime)) {
                var ch = Math.floor(batteryTime / 3600);
                var paddingZeros = ch > 100 ? 3 : 2;
                var cm = Math.floor(batteryTime % 3600 / 60);
                document.querySelector('#batteryTiming').textContent = prefix + (ch).pad(paddingZeros) + ':' + (cm).pad(2);
            } else {
                document.querySelector('#batteryTiming').textContent = prefix + 'n/a';
            }

            document.querySelector('#temperature').textContent = '' + battery.temperature + '°C';
        });

    }

    function handleKeyDown(e) {
        switch(e.key) {
            case 'Enter':
                refreshBatteryStatus();
            break;
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    refreshBatteryStatus();
});
