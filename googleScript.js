const button2 = document.getElementById("submit2");
button2.addEventListener("click", onClick);
function onClick() {
    navigator.geolocation.getCurrentPosition((location) => {
        var lat = location.coords.latitude;
        var lang = location.coords.longitude;
        displayLocation(location);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&units=imperial&APPID=${apikey}`)
            .then(weather => weather.json())
            .then(displayResults)
    }, onError,
        { enableHighAccuracy: true, timeout: 20000 })
}
function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// google.maps.event.addDomListener(window, 'load', onClick);

function displayLocation(location) {
    console.log(location, 'weather');
    var lat = location.coords.latitude;
    var lang = location.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lang);
    var mapOptions = {
        zoom: 15,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });
}
