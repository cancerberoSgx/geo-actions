var Backbone = require('backbone')
var _ = require('underscore')

module.exports = Backbone.Router.extend({

	routes: {
		'polygonEditor': 'polygonEditor',
		'polygonEditor?:options': 'polygonEditor', 

		'currentPosition': 'currentPosition',
		
		'documentList': 'documentList',
		'documentEditor': 'documentEditor',
		'documentEditor?:options': 'documentEditor', 

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
		var model = this.application.polygonManager.getPolygon(params.document, params.polygon)
		var view = new PolygonEditorView(this.application, model)
		// debugger;
		this.showView(view)
	},
	documentEditor: function(options)
	{
		options = options || '';
		var params = this.parseOptions(options);	
		var DocumentEditorView = require('./DocumentEditorView')
		var model = this.application.polygonManager.getDocument(params.document)
		var view = new DocumentEditorView(this.application, model)
		// debugger;
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
		var model = this.application.polygonManager.getDocumentList()
		var view = new DocumentListView(this.application, model)
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

