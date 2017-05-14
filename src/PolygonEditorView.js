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
		// console.log('model ', model)
		this.application = application
		// this.points = []
		// this.polygonName = 'unamed1'
		this.model = model || new Backbone.Model()
		this.model.set('points', [])
		this.model.set('name', 'unamed - ' + new Date().getTime())
		// this.model.on('change', _.bind(this.render, this))
	},

	mark: function()
	{
		var currentPos = this.application.positionManager.getCurrentPosition()
		if(!currentPos)
		{
			alert('Cant get current position, aborting')
			return 
		}
		// console.log('currentPos', currentPos)
		var points = this.model.get('points')
		points.push(currentPos)
		// this.model.set('points', points, {trigger: true}) // TODO: this doesn't work :(
		this.render()
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