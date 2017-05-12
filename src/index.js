var Backbone = require('backbone')
var _ = require('underscore')

// console.log(require('jquery')('body'))
var Application = require('./Application')
var app = new Application()
app.start()

// var MyView = Backbone.View.extend({
// 	render: function()
// 	{
// 		var templates = require('./templates') 
// 		var template = templates('application.html')
// 		var html = template({})
// 		this.$el.append(html)
// 	}
// })
// var view1 = new MyView()
// view1.$el = document.body
// view1.render()
