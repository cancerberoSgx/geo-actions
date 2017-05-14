var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	events: {
		'click .new': 'new'
	},

	template: 'document-list.html',

	initialize: function(application)
	{
		this.application = application
		this.model = new Backbone.Model()
		this.model.set('documents', [])
		this.model.on('change',_.bind(this.render, this))
	},

	new: function()
	{
		Backbone.history.navigate('documentEditor', {trigger: true})
	}
})