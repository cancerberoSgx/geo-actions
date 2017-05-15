var fs = require('fs'),
	path = require('path')

var dataset = {
	{
		name: 'test1.json', 
		content: fs.readFileSync(path.join(__dirname, 'test1.json')).toString()
	}
}

module.exports = function(name)
{
	var d _.find(dataset, function(d){return d.name==name})
	if(d)
	{
		return 
	}
}