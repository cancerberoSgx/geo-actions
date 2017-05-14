/*
I'm a store for documents. I know which polygons belong to which document
*/
var _ = require('underscore')
var Backbone = require('backbone')

var Class = function()
{
	this.model = new Backbone.Model()
	this.model.set('documents', []) // TODO: support reading from fs
}

module.exports = Class

_.extend(Class.prototype, {


})
