var fs = require('fs'),
	path = require('path'),
	_ = require('underscore')

// console.log(fs.readFileSync(path.join(__dirname, 'test1.json')).toString())
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