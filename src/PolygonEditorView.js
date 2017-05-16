var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var jQuery = require('jquery')
var CurrentPositionView = require('./CurrentPositionView')

module.exports = AbstractView.extend({

	events: {
		'click .mark': 'mark',
		'click .save': 'save',

		'click .remove': 'remove'
	},

	template: 'polygon-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model || new Backbone.Model()
	},

	afterRender: function()
	{
		this.currentPositionView = new CurrentPositionView(this.application)
		this.currentPositionView.render()
		this.$el.append(this.currentPositionView.$el)

		var nav = require('./navigator/maps-test')
		nav()
		// debugger
		// this.__maptest1()
	},
	// __maptest1: function()
	// {
	// 	require('../navigator')()
	// },
	mark: function()
	{
		var currentPos = this.application.positionManager.getCurrentPosition()
		if(!currentPos)
		{
			alert('Cant get current position, aborting')
			return 
		}
		var points = this.model.get('points')
		points.push(this.coordinateToModel(currentPos))
		// this.model.set('points', points, {trigger: true}) // TODO: this doesn't work :(
		this.render()
	},

	remove: function()
	{
		if(!confirm('Are you sure you want to remove polygon '+this.model.get('name')+ '??'))
		{
			return
		}
		this.application.positionManager.removePolygon(this.model)
		Backbone.history.navigate('documentEditor?document=' + this.model.get('documentName'), {trigger: true})
	},

	coordinateToModel: function(c)
	{
		var model = new Backbone.Model()
		model.attributes = {
			accuracy: c.accuracy,
			altitude: c.altitude,
			altitudeAccuracy: c.altitudeAccuracy,
			heading: c.heading,
			latitude: c.latitude,
			longitude: c.longitude,
			speed: c.speed,
			altitude: c.altitude,
			altitudeAccuracy: c.altitudeAccuracy,
			heading: c.heading,
			latitude: c.latitude,
			longitude: c.longitude,
			speed: c.speed
		}
		return model
	},

	save: function()
	{
		var name = unescape(jQuery('.polygon-name').val())
		if(!name)
		{
			alert('please add a name') 
			this.$('.document-name').focus()
			return
		}
		this.application.polygonManager.addPolygon(this.model.get('documentName'), this.model)
		Backbone.history.navigate('documentEditor?document='+escape(this.model.get('documentName')), {trigger: true})
		
	}
})