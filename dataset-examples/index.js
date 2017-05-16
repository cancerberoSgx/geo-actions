var fs = require('fs'),
	path = require('path'),
	_ = require('underscore')

var dataset = [
	{
		name: 'test1.json', 
		content: require('./test1.json')
	}
]

module.exports = function(name)
{
	var d = _.find(dataset, function(d){return d.name==name})
	return d ? d.content : []
}