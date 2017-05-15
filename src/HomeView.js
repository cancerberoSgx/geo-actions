var AbstractView = require('./AbstractView')
var Backbone = require('backbone')
var _ = require('underscore')
var CurrentPositionView = require('./CurrentPositionView')

module.exports = AbstractView.extend({
	template: 'home.html',
	afterRender: function()
	{
		this.currentPositionView = new CurrentPositionView(this.application)
		this.currentPositionView.render()
		this.$el.append(this.currentPositionView.$el)
	}
})