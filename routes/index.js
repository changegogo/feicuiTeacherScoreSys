module.exports = function(app){
	app.use('/wechat',require('./wechat'));
	app.use('/',require('./mainpage'));
	app.use('/wxdep',require('./wxdep'));//模拟微信后台
	// 404 page
	app.use(function (req, res) {
		if (!res.headersSent) {
			res.render('404');
		}
	});
}