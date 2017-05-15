var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var jQuery = require('jquery')

module.exports = AbstractView.extend({

	// events: {
		// 'click .newPolygon': 'newPolygon',
		// 'click .save': 'save'
	// },

	template: 'export-document-list.html',

	initialize: function(application, model)
	{
		// debugger;
		this.application = application
		this.model = model// || new Backbone.Model()
		// this.model.json
		// this.model.set('polygons', [])
		// this.model.set('name', 'unameDocument'+new Date().getTime())
		// this.model.on('change',_.bind(this.render, this))
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
		// var currentPos = this.application.positionManager.getCurrentPosition()
		// console.log(currentPos)
		// var points = this.model.get('points')
		// points.push(currentPos)
		// this.model.set('name', new Date().getTime()+'')
		// this.model.set('points', points)
	},

	save: function()
	{
		// console.log(this.$('.document-name').value())
		alert('not impl')
	}
})