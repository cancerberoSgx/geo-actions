var AbstractView = require('./AbstractView')

module.exports = AbstractView.extend({
	template: 'current-position.html',
	getContext: function()
	{
		return {}
	}
})