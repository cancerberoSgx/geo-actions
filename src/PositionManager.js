/*
I'm a store for named places - given a point I'm able to tell which place it belong.
*/
var _ = require('underscore')
var Backbone = require('backbone')
var jQuery = require('jquery')

var Class = function()
{
}

_.extend(Class.prototype, Backbone.Events)

_.extend(Class.prototype, {

	startWatching: function()
	{ 
		var self = this

		if(!navigator.geolocation || !navigator.geolocation.watchPosition)
		{
			alert('Your browser/device doesn\'t support geolocation, sorry!')
		}
		function success(pos) 
		{
			if(!self.currentPosition || 
				self.currentPosition.latitude!=pos.coords.latitude && self.currentPosition.longitude!=pos.coords.longitude)
			{
				self.currentPosition = pos.coords
				self.trigger('change')
			}
		}

		function error(err) 
		{
			console.warn('ERROR(' + err.code + '): ' + err.message);
			self.trigger('change')
		}

		var options = {
			enableHighAccuracy: true,
			timeout: 4000,
			maximumAge: 0
		}

		this.watchError = navigator.geolocation.watchPosition(success, error, options)
	},

	stopWatching: function()
	{
		navigator.geolocation.clearWatch(this.watchError)
	},

	getCurrentPosition: function()
	{
		return this.currentPosition
	},

	getCurrentPositionAsync: function()
	{
		var deferred = jQuery.Deferred(), self = this
		this.once('change', function(){deferred.resolve(self.currentPosition)})
		return deferred
	}
})


module.exports = Class
