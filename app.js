var express = require('express');
var bodyParser=require('body-parser');
var path = require('path');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

/********************************** */
/*var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');
const data = [
  [1, 2, 3], 
  [true, false, null, 'sheetjs'], 
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], 
  ['baz', '代立旺', 'qux']
];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
fs.writeFile(path.join(__dirname,'/public/xlsx/test.xlsx'),buffer,function(error) {
  console.log(error);
});*/
/********************************** */

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为 ejs
app.set('view engine', 'ejs');

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

