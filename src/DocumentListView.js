var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	events: {
		'click .new': 'new'
	},

	template: 'document-list.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model || [] 
	},

	new: function()
	{
		Backbone.history.navigate('documentEditor', {trigger: true})
	}
})