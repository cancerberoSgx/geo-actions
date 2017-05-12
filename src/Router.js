var Backbone = require('backbone')
var _ = require('underscore')

module.exports = Backbone.Router.extend({

	routes: {
		'polygonEditor': 'polygonEditor',
		'currentPosition': 'currentPosition'
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

,	polygonEditor: function() 
	{
		var PolygonEditorView = require('./PolygonEditorView')
		var view = new PolygonEditorView(this.application)
		this.showView(view)
	}

	,currentPosition: function()
	{
		var CurrentPositionView = require('./CurrentPositionView')
		var view = new CurrentPositionView(this.application)
		this.showView(view)
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
})

