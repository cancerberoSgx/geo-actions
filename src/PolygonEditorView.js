var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var jQuery = require('jquery')

module.exports = AbstractView.extend({

	events: {
		'click .mark': 'mark',
		'click .save': 'save'
	},

	template: 'polygon-editor.html',

	initialize: function(application, model)
	{
		this.application = application
		this.model = model || new Backbone.Model()
		this.model.set('points', [])
		this.model.set('name', 'unamed - ' + new Date().getTime())
	},

	mark: function()
	{
		var currentPos = this.application.positionManager.getCurrentPosition()
		if(!currentPos)
		{
			alert('Cant get current position, aborting')
			return 
		}
		// console.log('currentPos', this.coordinateToModel(currentPos))
		var points = this.model.get('points')
		// debugger;
		points.push(this.coordinateToModel(currentPos))
		// this.model.set('points', points, {trigger: true}) // TODO: this doesn't work :(
		this.render()
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
		// debugger;
		// console.log(this.model.attributes)
		this.application.polygonManager.addPolygon(this.model.get('documentName'), this.model)
		Backbone.history.navigate('documentEditor?document='+escape(this.model.get('documentName')), {trigger: true})
		
	}
})