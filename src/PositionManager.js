/*
I'm a store for named places - given a point I'm able to tell which place it belong.
*/
var _ = require('underscore')
var Backbone = require('backbone')

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
			// debugger;
			self.currentPosition = pos.coords
			// console.log(pos.coords)
			self.trigger('change')
			self.trigger('done')
		}

		function error(err) 
		{
			console.warn('ERROR(' + err.code + '): ' + err.message);
			// alert('You must let your browser/device to track your position in order to use this application, sorry! Error: '+err.code+', '+err.message)
			self.trigger('done')
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
	}
})


module.exports = Class
