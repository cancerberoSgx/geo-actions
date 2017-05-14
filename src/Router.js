var Backbone = require('backbone')
var _ = require('underscore')

module.exports = Backbone.Router.extend({

	routes: {
		'polygonEditor': 'polygonEditor',
		'polygonEditor?:options': 'polygonEditor', 

		'currentPosition': 'currentPosition',
		'documentList': 'documentList',
		'documentEditor': 'documentEditor',
		'': 'home'
	},	
	initialize: function(application) 
	{
		this.application = application
	},	
	showView: function(view, resourceName)
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
	},	
	polygonEditor: function(options) 
	{
		options = options || '';
		var params = this.parseOptions(options);	
		var PolygonEditorView = require('./PolygonEditorView')
		var model = this.application.polygonManager.get(params.document, params.polygon)
		var view = new PolygonEditorView(this.application, model)
		this.showView(view)
	},
	currentPosition: function()
	{
		var CurrentPositionView = require('./CurrentPositionView')
		var view = new CurrentPositionView(this.application)
		this.showView(view)
	},
	home: function()
	{
		var HomeView = require('./HomeView')
		var view = new HomeView(this.application)
		this.showView(view)
	},
	documentList: function()
	{
		var DocumentListView = require('./DocumentListView')
		var view = new DocumentListView(this.application)
		this.showView(view)
	},
	documentEditor: function()
	{
		var DocumentEditorView = require('./DocumentEditorView')
		var view = new DocumentEditorView(this.application)
		this.showView(view)
	},
	

 	parseOptions: function(options)
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

