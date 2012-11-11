iNeedHelp.routing = Backbone.Router.extend({
	routes: {
		"": "page",
		'gmap' : 'gmap'
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
	},

	gmap: function(){
		iNeedHelp.views['gmap'] = new iNeedHelp.Views['gmap'];
		iNeedHelp.views['gmap'].render();
	}
});