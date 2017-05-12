var Backbone = require('backbone')
var _ = require('underscore')

module.exports = Backbone.Router.extend({

	routes: {

		'polygonEditor': 'polygonEditor'
	,	'polygonEditor/:polygonEditor': 'polygonEditor'
	,	'polygonEditor/:polygonEditor?:options': 'polygonEditor'

	// ,	'*': 'unknownPath'
	}

,	initialize: function(application) 
	{
		this.application = application
	}

,	showView: function(view, resourceName)
	{
		if(view.resourceNotFound)
		{
			resourceName = resourceName||Backbone.history.fragment
			this.application.showErrorView('Resource ' + resourceName + ' not found!') 
		}
		else
		{
			this.application.showView(view) 
		}
	}

,	parseOptions: function(options)
	{
		var params = {}
		_(options.split('&')).each(function(p)
		{
			var a = p.split('=') 
			if (a.length >= 2)
			{
				params[a[0]] = a[1] 
			}
		}) 
		return params
	}

,	polygonEditor: function(file, options) 
	{
		options = options || ''
		var params = this.parseOptions(options)
		var PolygonEditorView = require('./PolygonEditorView')
		var view = new PolygonEditorView(this.application)
		this.showView(view)
		console.log('foo')
	}

	// ,unknownPath: function()
	// {
	// 	alert('path not found: '+Backbone.history.hash)
	// }
})

