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

			this.settings.markers = [];
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
		},

		setupNow: function (response) {
            // once facebook connect has been checked, user can send msg
            // TODO: move me
            now.ready(function(){
            	iNeedHelp.settings.facebookID = response.id;
            	iNeedHelp.settings.name = response.name;
                now.facebookID = response.id;
                now.name = response.name;

                now.receiveMessage = function (info) {
                    $(".feedbackMessage").html('YAY! ' + info.helperName + ' is goind to help you!! <a href="https://www.facebook.com/' + info.helperId + '">VISIT PROFILE</a>' );
                };

                now.feedback = function (info) {
                    if ($("#gmapTemplate").length) {
                        //
                        console.log(info.lat);
                        console.log(info.lng);
                        var coord = info.lat + ',' + info.lng;
                        console.log(coord);
                        iNeedHelp.settings.markers[info.id] = $('#map_canvas').gmap('addMarker', {'position': coord, 'bounds': true});
	                    iNeedHelp.settings.markers[info.id].click(function() {
				                $('#map_canvas').gmap('openInfoWindow', {'content': 'Help ' + info.name + ' to ' + info.message + ' <a href="javascript:now.offerHelp(\'' + info.id + '\', \'' + iNeedHelp.settings.facebookID + '\', \' ' + iNeedHelp.settings.name + '\');">click</a>'}, this);
				            });
                    } else {

                        $(".feedbackMessage").remove();

                    	if (iNeedHelp.settings.facebookID === info.id) {

	                        $(".hero-unit").append($('<p/>',{
	                            html: "You will get help as soon as someone replies to you, have faith!",
	                            "class": "feedbackMessage"
	                        }));
                    		return;
                    	}

                        $(".hero-unit").append($('<p/>',{
                            html: info.name + ' is asking for help: ' + info.message,
                            "class": "feedbackMessage"
                        }));
                    }
                };

                now.helpFound = function (info) {

                	if (iNeedHelp.settings.facebookID === info.id) {
                		return;
                	};

                	if ($("#gmapTemplate").length) {
                		// console.log(iNeedHelp.settings.markers[info.id]);
                		iNeedHelp.settings.markers[info.id][0].setMap(null);
                	} else {
	                    $(".hero-unit").append($('<p/>', {
	                        html: info.name + ' has found help from ' + info.helperName,
	                        "class": "feedbackMessage"
	                    }));
                	}



                }
            });
		}
	}
})(jQuery, _);

// register application init
$(function(){
	iNeedHelp.init(iNeedHelp.settings.mainViewConfig);
});