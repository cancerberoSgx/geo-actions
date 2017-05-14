/*
I'm a store for named places - given a point I'm able to tell which place it belong.
*/
var _ = require('underscore')
var Class = function()
{
	this.documents = [] // TODO: be able to load from fs / persist
}
 
module.exports = Class

_.extend(Class.prototype, {

	get: function(documentName, polygonName)
	{
		var document = _.find(this.documents, function(d)
		{
			return d.name==documentName
		})
		if(!document)
		{
			return null
		}
		return _.find(document.polygons, function(p)
		{
			return p.name == polygonName
		})
	}
})
