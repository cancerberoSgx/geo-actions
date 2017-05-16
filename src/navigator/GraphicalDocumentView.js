// var AbstractView = require('../AbstractView')
// var Backbone = require('backbone')
// var _ = require('underscore')
// var jQuery = require('jquery')

// module.exports = AbstractView.extend({

// 	template: 'export-document-list.html',

// 	initialize: function(application, model)
// 	{
// 		this.application = application
// 		this.model = model
// 	},

// 	newPolygon: function()
// 	{
// 		var name = unescape(jQuery('.document-name').val())
// 		if(!name)
// 		{
// 			alert('please add a name') 
// 			this.$('.document-name').focus()
// 			return
// 		}
// 		Backbone.history.navigate('polygonEditor?document=' + escape(name), {trigger: true})
// 	},

// 	save: function()
// 	{
// 		// console.log(this.$('.document-name').value())
// 		alert('not impl')
// 	}
// })