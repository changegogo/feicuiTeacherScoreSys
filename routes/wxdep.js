var express = require('express');
var router = express.Router();
var http=require('http');
var querystring=require('querystring');
var getJsonByHttp = require('../lib/httpLib');
var querystring=require('querystring');
var path = require('path');

router.get('/sns/oauth2/access_token',function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    res.json({ 
        "access_token":"ACCESS_TOKEN",
        "expires_in":7200,
        "refresh_token":"REFRESH_TOKEN",
        "openid":"OPENID",
        "scope":"SCOPE",
        "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    });
});

router.get('/sns/userinfo',function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    res.json({ 
        "openid":"OPENID",
        "nickname":"NICKNAME",
        "sex":1,
        "province":"PROVINCE",
        "city":"CITY",
        "country":"COUNTRY",
        "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        "privilege":[
            "PRIVILEGE1", 
            "PRIVILEGE2"
        ],
        "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    });
});


module.exports = router;