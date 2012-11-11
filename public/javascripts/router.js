iNeedHelp.routing = Backbone.Router.extend({
	routes: {
		"": "page",
		':static' : 'page',
	},

	page: function (page) {
		if (page === undefined) {
			page = 'main';
		}

		if (iNeedHelp.views[page] === undefined) {
			iNeedHelp.views[page] = new iNeedHelp.Views[page]({
				model: iNeedHelp.models.Config
			});
		}

		iNeedHelp.views[page].render();
	}
});