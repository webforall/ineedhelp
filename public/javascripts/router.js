iNeedHelp.routing = Backbone.Router.extend({
	routes: {
		"": "page",
		'gmap' : 'gmap',
		'thankyYouForOffer': 'thankyYouForOffer',
		'askHelp': 'askHelp',
		'listenForOffer':'listenForOffer'
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
	},

	thankyYouForOffer: function(){
		iNeedHelp.views['thankyYouForOffer'] = new iNeedHelp.Views['thankyYouForOffer'];
		iNeedHelp.views['thankyYouForOffer'].render();
	},
	askHelp: function(){
		iNeedHelp.views['askHelp'] = new iNeedHelp.Views['askHelp'];
		iNeedHelp.views['askHelp'].render();
	},
	listenForOffer: function(){
		iNeedHelp.views['listenForOffer'] = new iNeedHelp.Views['listenForOffer'];
		iNeedHelp.views['listenForOffer'].render();
	}
});