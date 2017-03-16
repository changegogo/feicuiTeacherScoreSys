var express = require('express');
var bodyParser=require('body-parser');
var path = require('path');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var config = require('config-lite');
var session = require('express-session');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为 ejs
app.set('view engine', 'ejs');

// session中间件
app.use(session({
    name: config.session.key, // 设置cookie中保存 session id 的字段名称
    secret: config.session.secret, //通过设置 secret 来计算hash值并放在cookie中，使产生的signedCookie防篡改
    cookie: {
        maxAge: config.session.maxAge //过期时间，过期后 cookie 中的session id自动删除
    },
    store: new MongoStore({ //将session存储到 mongodb
        url: config.mongodb // mongodb地址
    })
}));
// flash 中间件，用来显示通知
app.use(flash());
//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//设置请求体解析器
app.use(bodyParser.urlencoded({extended:true}));
// 设置express-promise
//app.use(require('express-promise')());
//设置模板全局变量
app.locals.blog = {
    title: '博客',
    description: pkg.description
};

// 路由
routes(app);

// error page
app.use(function (err, req, res, next) {
  res.render('error', {
    error: err
  });
});

if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}

