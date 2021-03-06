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
			if(!self.currentPosition || pos.timestamp>self.currentPosition.timestamp)
			{
				// TODO: trigger change only if really change the coords
			// if(!self.currentPosition || 
			// 	self.currentPosition.latitude!=pos.coords.latitude && self.currentPosition.longitude!=pos.coords.longitude)
				// console.log('geo success ', pos)
				// debugger
				self.currentPosition = pos
				self.trigger('change')
			}
		}

		function error(err) 
		{
			console.log('geo error ', pos)
			// debugger
			console.warn('ERROR(' + err.code + '): ' + err.message);
			self.trigger('change')
		}

		var options = {
			enableHighAccuracy: true,
			timeout: 4000,
			maximumAge: 0
		}

		// this.watchError = navigator.geolocation.watchPosition(success, error, options)


		self.currentPosition2Id = setInterval(function()
		{
			navigator.geolocation.getCurrentPosition(function(pos)
			{
				if(!self.currentPosition || pos.timestamp>self.currentPosition.timestamp)
				{
					// TODO: trigger change only if really change the coords
					self.currentPosition = pos
					self.trigger('change')
				}
			})
		}, 4000)
	},

	stopWatching: function()
	{
		navigator.geolocation.clearWatch(this.watchError)
	},

	getCurrentPosition: function()
	{
		return this.currentPosition ? this.currentPosition.coords : null
	},

	getCurrentPositionAsync: function()
	{
		var deferred = jQuery.Deferred(), self = this
		this.once('change', function(){deferred.resolve(self.currentPosition)})
		return deferred
	}
})


module.exports = Class
