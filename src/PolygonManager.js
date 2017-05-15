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

	exportToJson: function()
	{
		// var s = [], self = this
		// _.each(this.documents, function(doc)
		// {
		// 	s.push(self.exportDocumentToJson(doc))
		// })
		// return '['+s.join(',')+']'

		// console.log('exportToJson',this.documents)
		// debugger;
		return JSON.stringify(this.documents, 0, 4)
		// , function replacer(key, value) 
		// {
		// 	if (value instanceof Backbone.Model) 
		// 	{
		// 		// console.log('type of backbone model', value.attributes)
		// 		return value.attribute;
		// 	}
		// 	return value;
		// })
	},
	// exportDocumentToJson: function(doc)
	// {
	// 	// var s = []
	// 	// _.each(doc.get('polygons'), function(p)
	// 	// {
	// 	// 	s.push(self.exportPolygonToJson(p))
	// 	// })
	// 	// return '{polygons: [' + s.join(',') + '}, name: "'+doc.get('name') + '"}'
	// },
	// exportPolygonToJson: function()

	importFromJson: function(jsonString)
	{
		var data = JSON.parse(jsonString)
		this.documents = []
		_.each(data, function(docData)
		{

		})
	}
})
