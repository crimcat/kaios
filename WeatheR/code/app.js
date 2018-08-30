

window.addEventListener("load", function() {

    if(this.navigator.onLine) {
        document.querySelector("#weatheri").innerHTML = `
<a href="https://clck.yandex.ru/redir/dtype=stred/pid=7/cid=1228/*https://yandex.ru/pogoda/2" target="_blank">
<img src="https://info.weather.yandex.net/2/2.ru.png?domain=ru" border="0" alt="Яндекс.Погода"/>
<img width="1" height="1" src="https://clck.yandex.ru/click/dtype=stred/pid=7/cid=1227/*https://img.yandex.ru/i/pix.gif" alt="" border="0"/>
</a>
        `;
    }
});
