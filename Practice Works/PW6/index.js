var map;
var service;

function initState() {
    document.getElementById("myButton").onclick = function() {
       initializeMap();
    };  
}

//TODO: Make sure it is actally getting hospitals
//      Issue whenever a user hits enter, nothing shows up (cause its not looking for enter, only for onclick)

function initializeMap() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === "OK") {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: results[0].geometry.location,
            });
            //map.setCenter(results[0].geometry.location);
            //console.log("address coords: " + results[0].geometry.location);
            var request = {
                location: results[0].geometry.location,
                radius: '1500',
                type: ['hospital']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }
        else {
            console.log("Could not geocode the address given");
        }
    });
    //console.log("address inputed: " + address);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //console.log("we chillin");
        for (var i = 0; i < results.length; i++) { 
            new google.maps.Marker({
                map,
                title: results[i].name,
                position: results[i].geometry.location,
            });
        }
    }
    else {
        console.log("Could not get any hospitals near this location");
    }
}