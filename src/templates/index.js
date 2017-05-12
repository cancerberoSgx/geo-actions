var fs = require('fs')
var _ = require('underscore')
var path = require('path')
var templates = [
	{
		name: 'application.html', 
		content: fs.readFileSync(path.join(__dirname, 'application.html')).toString()
	},
	{
		name: 'polygon-editor.html', 
		content: fs.readFileSync(path.join(__dirname, 'polygon-editor.html')).toString()
	},

	{
		name: 'current-position.html', 
		content: fs.readFileSync(path.join(__dirname, 'current-position.html')).toString()
	}
]

module.exports = function getTemplate(name)
{
	var t = _.find(templates, function(t){return t.name==name})
	if(!t)
	{
		throw new Error('template '+name+' not found')
	}
	// console.log(t.content)
	t.compiled = t.compiled || _.template(t.content)
	return t.compiled
}
