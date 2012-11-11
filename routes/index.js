
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'iNeedHelp' });
};

exports.channel = function(req, res) {
	res.render('channel');
}