var AbstractView = require('./AbstractView')

module.exports = AbstractView.extend({

	events: {
		'click .mark': 'mark',
		'click .save': 'save'
	},

	template: 'polygon-editor.html',

	initialize: function()
	{
		AbstractView.prototype.initialize(this, arguments)
		this.points = []
		this.polygonName = 'unamed1'
	},

	mark: function()
	{
		this.points.push({latitude: Math.random(), longitude: Math.random()})
		// this.application.showView(this)
		this.render()
		console.log(this.points.length)
	},

	save: function()
	{
		console.log(this.$('.polygon-name').value())
	}
})