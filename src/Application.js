var _ = require('underscore')
var jQuery = require('jquery')
var Backbone = require('backbone')
var Router = require('./Router')

var PositionManager = require('./PositionManager')
var PolygonManager = require('./PolygonManager')

var datasets = require('../dataset-examples')

var Application = function(data)
{	
};

_(Application.prototype).extend({

	start: function()
	{
		
		this.WIDTH = jQuery(window).width()
		this.HEIGHT = jQuery(window).height()
		
		if(jQuery('#mainContainer').length===0)
		{
			jQuery('body').append('<div id="mainContainer"></div>'); 
		}
		this.$containerEl = jQuery('#mainContainer'); 
		// this.$body = jQuery('.main-view-container');

		this.positionManager = new PositionManager()
		this.positionManager.startWatching()

		this.polygonManager = new PolygonManager()
		this.polygonManager.importFromJson(datasets('test1.json'))
		// console.log('this.polygonManager.documents', this.polygonManager.documents)

		this.router = new Router(this);
		Backbone.history.start();

		// var navigateTo = Backbone.history.getHash() || 'index'; 
		// Backbone.history.navigate(navigateTo, {trigger: true});

	}

,	showView: function(view)
	{
		// this.applicationView = this.applicationView || new ApplicationView(this); 
		if(this.currentView)
		{
			this.currentView.undelegateEvents()
		}
		this.currentView = view;
		this.$containerEl.empty();
		view.$el = this.$containerEl
		view.application = this
		view.render()
		// this.applicationView.renderIn(this.$containerEl);
		document.title = view.title || document.title;
	}

,	showErrorView: function(s) 
	{
		var errorView = new AbstractView();
		errorView.application = this;
		errorView.template = _.template('<h1>'+s+'</h1>');
		this.showView(errorView)
	}

});

module.exports = Application