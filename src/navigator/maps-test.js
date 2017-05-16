// <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyD-W_otgWY7Yt3GgObc8iqJeQECehmFQWI"></script>

var $ = require('jquery')
var _ = require('underscore')
 
module.exports = function drawMap()
{
	var poly, map;
	var markers = [];
	var path = new google.maps.MVCArray;

	function getLocation(fn) 
	{
		if (navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(fn);
		} 
		else 
		{
			fn() 
		}
	} 
	function initialize() 
	{
		// debugger;
		$('body').append('<p>this is the map test : </p>'+
			'<div id="map" style="width: 800px; height: 800px"></div>')
		getLocation(function(position)
		{
			var coords = position ? position.coords : {latitude: -25.344, longitude: 131.036}
			drawMap(coords)
		})
	}

	function drawMap(coords)
	{
		var uluru = new google.maps.LatLng(coords.latitude, coords.longitude);

		map = new google.maps.Map(document.getElementById("map"), {
			zoom: 14,
			center: uluru,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		});

		poly = new google.maps.Polygon({
			strokeWeight: 3,
			fillColor: '#5555FF'
		});
		poly.setMap(map);
		poly.setPaths(new google.maps.MVCArray([path]));

		google.maps.event.addListener(map, 'click', function(e){addPointHandler(e.latLng)});
	}

	function addPointHandler(latLng) 
	{
		path.insertAt(path.length, latLng);

		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			draggable: true
		});
		markers.push(marker);
		marker.setTitle("#" + path.length);

		google.maps.event.addListener(marker, 'click', function() 
		{
			marker.setMap(null);
			for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
			markers.splice(i, 1);
			path.removeAt(i);
		});

		google.maps.event.addListener(marker, 'dragend', function() 
		{
			for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
			path.setAt(i, marker.getPosition());
		});
	}

	initialize()
}

// $(document).on('ready', function()
// {
// 	console.log('¡draw map')
// 	drawMap2()
// })
// alert($('body').html())