var AbstractView = require('./AbstractView')
var Backbone = require('backbone')

module.exports = AbstractView.extend({

	initialize: function()
	{
		var self = this
		AbstractView.prototype.initialize(self, arguments)
		self.model = new Backbone.Model()
		self.model.on('change', function()
		{
			self.render()
		})
		self.application.positionManager.on('change', function()
		{
			var pos = self.application.positionManager.getCurrentPosition()
			debugger;
			self.model.set('latitude', pos.latitude)
		})
	},

	template: 'current-position.html'
	// ,

	// getContext: function()
	// {
	// 	return {
	// 		model: model
	// 	}
	// }
})