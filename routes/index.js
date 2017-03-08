module.exports = function(app){
	app.use('/',require('./wechat'));
	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.render('404');
		}
	});
}