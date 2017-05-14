var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')

module.exports = AbstractView.extend({

	events: {
		'click .mark': 'mark',
		'click .save': 'save'
	},

	template: 'polygon-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		// this.points = []
		// this.polygonName = 'unamed1'
		this.model = model || new Backbone.Model()
		this.model.set('points', [])
		this.model.set('name', 'unamed - ' + new Date().getTime())
		this.model.on('change', _.bind(this.render, this))
	},

	mark: function()
	{
		var currentPos = this.application.positionManager.getCurrentPosition()
		console.log(currentPos)
		var points = this.model.get('points')
		points.push(currentPos)
		this.model.set('points', points)
		// this.points.push({latitude: currentPos.latitude, longitude: Math.random()})
		// this.application.showView(this)
		// this.render()
		// console.log(this.points.length)
	},

	save: function()
	{
		console.log(this.$('.polygon-name').value())
	}
})