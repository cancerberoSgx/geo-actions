/*
I'm a store for named places - given a point I'm able to tell which place it belong.
*/
var _ = require('underscore')
var Backbone = require('backbone')

var Class = function()
{
}

module.exports = Class

_.extend(Class.prototype, Backbone.Events)

_.extend(Class.prototype, {

	startWatching: function()
	{
		var self = this
		function success(pos) 
		{
			// debugger;
			self.currentPosition = pos.coords
			console.log(pos.coords)
			self.trigger('change')
		};

		function error(err) 
		{
			console.warn('ERROR(' + err.code + '): ' + err.message);
		};

		var options = {
			enableHighAccuracy: true,
			timeout: 3000,
			maximumAge: 0
		};

		this.watchError = navigator.geolocation.watchPosition(success, error, options);
	},

	stopWatching: function()
	{
		navigator.geolocation.clearWatch(this.watchError);
	},

	getCurrentPosition: function()
	{
		return this.currentPosition
	}
})