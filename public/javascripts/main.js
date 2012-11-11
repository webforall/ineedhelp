var iNeedHelp = (function ($, _) {

	var
		name = 'I need help',
		version = '0.0.1 alpha',
		debug = true,
		init = false;

	return {
		Views: [], Models: [], Collection: [], router: null,
		views: {}, models: {}, settings: {},

		init: function (config) {
			this.models.Config = new iNeedHelp.Models['config']({
				'name': name,
				'version': version,
				'debug': debug
			});
			init = true;

			this.initRouter();
		},

		reload: function () {
			window.location.reload();
		},

		debug: function () {
			return debug;
		},

		initState: function () {
			return init;
		},

		initRouter: function () {
			iNeedHelp.router = new iNeedHelp.routing();
			Backbone.history.start({pushState: true, silent: false});
		}
	}
})(jQuery, _);

// register application init
$(function(){
	iNeedHelp.init(iNeedHelp.settings.mainViewConfig);
});