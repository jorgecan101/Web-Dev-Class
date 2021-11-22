var map; //Global variable for our map

function initMap() {
    var geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 3
    });
    createInitialQuakes();
    changeLocation(geocoder);
}

function createInitialQuakes() {
    $.ajax({
        url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-10-01&endtime=2021-10-15&minmagnitude=5",
        type: "GET",
        crossDomain: true,
        success: function(result) {
            quakeData = result.features;
            quakeData.forEach(function(i) {
                var longitude = i.geometry.coordinates[0];
                var latitude = i.geometry.coordinates[1];
                var title = i.properties.title;
                var magnitude = i.properties.mag;
                new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map,
                    title: title,
                    icon: getCircle(magnitude)
                });
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function changeLocation(geocoder) {
    $("#myButton").on('click', function() {
        var address = document.getElementById("address").value;
        geocoder.geocode({'address' : address}, function(results, status) {
            if (status === "OK") {
                map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 4,
                    center: results[0].geometry.location,
                })
                populateNewLocation(address);
            }
            else {
                console.log("Could not geolocate the location given");
            }
        });
    });
}

function populateNewLocation(address) {
    $.ajax({
        url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-10-01&endtime=2021-10-15&minmagnitude=5",
        type: "GET",
        crossDomain: true,
        success: function(result) { 
            quakeData = result.features;
            quakeData.forEach(function(i) {
                if (JSON.stringify(i.properties.place).includes(address)) {
                    var longitude = i.geometry.coordinates[0];
                    var latitude = i.geometry.coordinates[1];
                    var title = i.properties.title; 
                    var magnitude = i.properties.mag;   
                    new google.maps.Marker({
                        position: new google.maps.LatLng(latitude, longitude),
                        map,
                        title: title,
                        icon: getCircle(magnitude)
                    });
                }
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "red",
        fillOpacity: 0.2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "white",
        strokeWeight: 0.5
    };
}