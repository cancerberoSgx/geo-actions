var _ = require('underscore')
var jQuery = require('jquery')
var Backbone = require('backbone')
var templates = require('./templates') 

module.exports = Backbone.View.extend({
	initialize: function(app)
	{
		this.application = app
	},
	render: function()
	{
		this.undelegateEvents()
		var template = templates(this.template)
		var context = this.getContext()
		// console.log('context ', context)
		var html = template(context)
		this.$el.empty()
		this.$el.append(html)
		this.delegateEvents()
		this.afterRender()
	},
	getContext: function()
	{
		return this
	},
	afterRender: function()
	{
		
	}
})