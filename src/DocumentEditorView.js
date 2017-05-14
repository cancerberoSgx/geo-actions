var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	events: {
		'click .newPolygon': 'newPolygon',
		'click .save': 'save'
	},

	template: 'document-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model || new Backbone.Model()
		this.model.set('polygons', [])
		this.model.set('name', 'unameDocument'+new Date().getTime())
		this.model.on('change',_.bind(this.render, this))
	},

	newPolygon: function()
	{
		var name = unescape(this.$('.document-name').attr('value'))
		if(!name)
		{
			alert('please add a name') 
			this.$('.document-name').focus()
			return
		}
		Backbone.history.navigate('polygonEditor?document='+escape(this.$('.document-name').attr('value')), {trigger: true})
		// var currentPos = this.application.positionManager.getCurrentPosition()
		// console.log(currentPos)
		// var points = this.model.get('points')
		// points.push(currentPos)
		// this.model.set('name', new Date().getTime()+'')
		// this.model.set('points', points)
	},

	save: function()
	{
		console.log(this.$('.document-name').value())
	}
})