var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var jQuery = require('jquery')
var google = require('./google')

module.exports = AbstractView.extend({

	template: 'polygon-visual-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model
	},

	afterRender: function()
	{
		var self = this
		// this.application.positionManager.getCurrentPositionAsync().then(function(currentPosition)
		// {
			if(this.model.get('points').length)
			{
				self.drawMap()
			}
			else
			{
				console.log('cannot show map because polygon has no points')
			}
		// })
	},

	drawMap: function()
	{
		// console.log('drawmap')
		// try 
		// {

		var self = this
		this.path = new google.maps.MVCArray
		this.markers = []

		var center = new google.maps.LatLng(
			this.model.get('points')[0].get('latitude'), this.model.get('points')[0].get('longitude'))

		this.$('.map-container').css({
			width: (this.application.WIDTH-10)+'px', 
			height: (this.application.HEIGHT/1.5)+'px'
		})
		this.map = new google.maps.Map(this.$('.map-container').get(0), {
			zoom: 40,
			center: center,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		})

		self.poly = new google.maps.Polygon({
			strokeWeight: 3,
			fillColor: '#5555FF'
		})

		self.poly.setMap(this.map)
		self.poly.setPaths(new google.maps.MVCArray([this.path]))

		google.maps.event.addListener(this.map, 'click', function(e)
		{
			self.addPointHandler(e.latLng)
		})

		self.showPointsInMap()

		// }
		// catch(ex)
		// {
		// 	console.log('error drawing map', ex, ex.message, ex.stack)
		// }
	},

	showPointsInMap: function()
	{
		var self = this
		// self.path = []
		self.poly.setPaths(new google.maps.MVCArray([this.path]))
		_.each(self.model.get('points'), function(point)
		{
			var coord = new google.maps.LatLng(point.get('latitude'), point.get('longitude'))
			self.addPointHandler(coord)
		})
	},

	addPointHandler: function(latLng) 
	{
		var self = this
		this.path.insertAt(this.path.length, latLng)

		var marker = new google.maps.Marker({
			position: latLng,
			map: this.map,
			draggable: true
		})
		self.markers.push(marker)
		marker.setTitle("#" + this.path.length)

		google.maps.event.addListener(marker, 'click', function() 
		{
			marker.setMap(null)
			for (var i = 0, I = self.markers.length; i < I && self.markers[i] != marker; ++i){}
			self.markers.splice(i, 1)
			this.path.removeAt(i)
		})

		google.maps.event.addListener(marker, 'dragend', function() 
		{
			for (var i = 0, I = self.markers.length; i < I && self.markers[i] != marker; ++i){}
			self.path.setAt(i, marker.getPosition())
		})
	}


})