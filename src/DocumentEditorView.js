var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var jQuery = require('jquery')

module.exports = AbstractView.extend({

	events: {
		'click .newPolygon': 'newPolygon',
		// 'click .save': 'save',
		'click .removeDocument': 'removeDocument'
	},

	template: 'document-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model || new Backbone.Model()
	},

	newPolygon: function()
	{
		var name = unescape(jQuery('.document-name').val())
		if(!name)
		{
			alert('please add a name') 
			this.$('.document-name').focus()
			return
		}
		Backbone.history.navigate('polygonEditor?document='+escape(name), {trigger: true})
	},

	removeDocument :function()
	{
		if(!confirm('Are you sure you want to remove document '+this.model.get('name')+ '??'))
		{
			return
		}
		this.application.polygonManager.removeDocument(this.model.get('name'))
		Backbone.history.navigate('documentList', {trigger: true})
	}
	// save: function()
	// {
	// 	// console.log(this.$('.document-name').value())
	// 	alert('not impl')
	// }
})