var http = require('http');

function getJsonByHttp(options,callback){
    //创建请求  
    var req=http.request(options,function(res){
        console.log('STATUS:'+res.statusCode);
        console.log('HEADERS:'+JSON.stringify(res.headers));
        res.setEncoding('utf-8');
        var jsonStr = "";
        res.on('data',function(chunk){
            jsonStr += chunk;
        });
        res.on('end',function(){
            callback(JSON.parse(jsonStr));
        });
    });
    req.on('error',function(err){
        //var err = "{'error': '服务器错误'}";
        //callback(JSON.parse(err));
    });
    req.end();
}

module.exports = getJsonByHttp;