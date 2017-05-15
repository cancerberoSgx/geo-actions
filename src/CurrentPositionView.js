var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	initialize: function(application)
	{
		var self = this
		self.application = application
		self.model = new Backbone.Model()
		self.model.on('change', function()
		{
			self.render()
		})
		self.application.positionManager.on('change', function()
		{
			var pos = self.application.positionManager.getCurrentPosition()
			self.model.set('latitude', pos.latitude)
			self.model.set('longitude', pos.longitude)
		})
	},

	template: 'current-position.html'
})