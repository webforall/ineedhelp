iNeedHelp.Views['basePageView'] = Backbone.View.extend({

	// attach to main element and call afterInitialize
	initialize: function () {
		this.setElement($('#main'));

		// if (this.afterInitialize !== undefined) {
		// 	this.afterInitialize();
		// }
	},

	// render template, render subviews by config and call afterRender
	render: function () {
		this.$el.html(this.template(iNeedHelp.models.Config.toJSON()));

		// if (this.afterRender !== undefined) {
		// 	this.afterRender();
		// }

		return this;
	}

});


iNeedHelp.Views['main'] = iNeedHelp.Views['basePageView'].extend({

	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#main-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});

iNeedHelp.Views['gmap'] = iNeedHelp.Views['basePageView'].extend({
	initialize: function () {
		this.setElement($('#content'));
	},
	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#gmap-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});

iNeedHelp.Views['thankyYouForOffer'] = iNeedHelp.Views['basePageView'].extend({

	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#thankyYouForOffer-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});

iNeedHelp.Views['askHelp'] = iNeedHelp.Views['basePageView'].extend({

	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#askHelp-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});

iNeedHelp.Views['listenForOffer'] = iNeedHelp.Views['basePageView'].extend({

	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#listenForOffer-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});

iNeedHelp.Views['marker'] = Backbone.View.extend({
	render: function(){
		$('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true})
			.click(function() {
				$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World! <a href="/offerHelp">click</a>'}, this);
			});
		}
});

iNeedHelp.Views['offerHelp'] = iNeedHelp.Views['basePageView'].extend({

	events: {
		// "click .sort-button": "toggleSortable"
	},

	template: _.template($('#offerHelp-tpl').html())

	// afterRender: function () {
	// 	// do smt
	// }
});