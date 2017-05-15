var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	initialize: function(application)
	{
		this.application = application
		this.model = new Backbone.Model()
		this.model.on('change', _.bind(this.render, this))
		this.application.positionManager.on('change', _.bind(this.updatePosition, this))
		
	},

	template: 'current-position.html',

	afterRender: function()
	{
		this.updatePosition()
	},

	updatePosition: function()
	{
		var pos = this.application.positionManager.getCurrentPosition()
		// debugger;
		if(!pos || !pos.latitude)
		{
			return
		}
		this.model.set('latitude', pos.latitude)
		this.model.set('longitude', pos.longitude)
	}
})