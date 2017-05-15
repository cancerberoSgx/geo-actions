/*
I'm a store for named places - given a point I'm able to tell which place it belong.
*/
var _ = require('underscore')
var Backbone = require('backbone')

var Class = function()
{
	this.documents = [] // TODO: be able to load from fs / persist
}
 
module.exports = Class

_.extend(Class.prototype, {

	getPolygon: function(documentName, polygonName)
	{
		var document = this.getDocument(documentName)
		var polygon = _.find(document.get('polygons'), function(p)
		{
			return p.get('name') == polygonName
		})
		if(!polygon)
		{
			polygon = new Backbone.Model()
			polygon.set('name', polygonName)
			polygon.set('points', [])
			// polygon.set('documentName', documentName)
		}
		polygon.set('documentName', polygon.get('documentName') || documentName) 
		return polygon
	},
	addPolygon: function(documentName, pol)
	{
		var document = this.getDocument(documentName)
		var polygon = _.find(document.get('polygons'), function(p)
		{
			return p.get('name')==pol.get('name')
		})
		if(polygon)
		{
			polygon.attributes = pol.attributes //update it
			polExists=true
		}
		else
		{
			pol.set('documentName', pol.get('documentName') || documentName)
			document.set('polygons', document.get('polygons').concat([pol]))
		}
		// console.log('documents polygons: ', document.get('polygons'))
	},
	getDocument: function(name)
	{
		var document =  _.find(this.documents, function(d)
		{
			return d.get('name')==name
		})
		if(!document)
		{
			document = new Backbone.Model()
			document.set('name', name || 'unameDocument'+new Date().getTime())
			document.set('polygons', [])
			this.documents.push(document)
		}
		return document
	},

	getDocumentList: function()
	{
		var model = new Backbone.Model()
		model.set('documents', this.documents)
		return model
	},


	// export / import 

	exportToJson: function()
	{
		return JSON.stringify(this.documents, 0, 4)
	},

	importFromJson: function(data)
	{
		// var data = JSON.parse(jsonString), 
		var self = this
		// console.log('importFromJson', data)
		this.documents = []
		_.each(data, function(docData)
		{
			self.documents.push(self.importDocument(docData))
		})
	},

	importDocument: function(docData)
	{
		var model = new Backbone.Model(), self = this
		model.set('name', docData.name)
		var polygons = []
		_.each(docData.polygons, function(p)
		{
			polygons.push(self.importPolygon(p))
		})
		model.set('polygons', polygons)
		return model
	},

	importPolygon: function(p)
	{
		var model = new Backbone.Model()
		model.set('name', p.name)
		model.set('documentName', p.documentName)
		var points = []
		_.each(p.points, function(point)
		{
			var pointModel = new Backbone.Model()
			_.each(point, function(val, name)
			{
				pointModel.set(name, val)
			})
			points.push(pointModel)
		})
		model.set('points', points)
		return model
	}
})
