let successHandler = function(position) {
  let currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  let map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 8
  });

  let currentMarker = new google.maps.Marker({
    map,
    position: currentLocation,
    animation: google.maps.Animation.DROP,
  });

  let geocoder = new google.maps.Geocoder();

  //smarter way of writing this? Perhaps with closures?
  geocoder.geocode({
    location: currentLocation
  },
  function(geocoderResults) {
    let address = geocoderResults[0].formatted_address;

    let infoWindow = new google.maps.InfoWindow({
      content: '<strong>' + address + '</strong>',
      position: currentLocation
    });

    google.maps.event.addListener(currentMarker, 'click', (event) => {
      infoWindow.open(map);
    });
  });


};
let errorHandler = function(error) {
  console.log(error);
};
let options = {};
navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
