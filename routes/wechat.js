var express = require('express');
var router = express.Router();
var http=require('http');
var querystring=require('querystring');
var getJsonByHttp = require('../lib/httpLib');
var querystring=require('querystring');
var path = require('path');

var TSModle = require('../models/teacherScore');
var makeXlsxFile = require('../lib/xlsx');

var common = require('../lib/common');

router.get('/login.do',function(req, res, next){
    //生成state
    common.state = Math.random()+"";
    var query = {
        appid: common.appid,
        redirect_uri: common.redirect_uri,
        response_type: "code",
        scope: "snsapi_login",
        state: common.state
    }
    query = querystring.stringify(query);
    //拼接微信url
    var url = common.wxhost+'?'+query+'#wechat_redirect';

    url = "callback.do?code=asdfghjklkdsfge2342d&state="+common.state;
    res.redirect(url);
});

router.get('/callback.do', function(req, res, next){
    var query = req.query;
    if(query.state != common.state){
        res.json({error: "禁止访问"});
    }else{
        //res.json(query);
        //使用code，获取access_token，openid
        var queryData = {
            appid: common.appid,
            secrect: common.secrect,
            code: query.code,
            grant_type: "authorization_code"
        };
        queryData = querystring.stringify(queryData);
        var options={
            hostname:'127.0.0.1',
            port: 5000,
            path:'/wxdep/sns/oauth2/access_token?'+queryData,
            method:'GET'
        }
        getJsonByHttp(options,function(jsonObj){
            var access_token = jsonObj.access_token;
            var openid = jsonObj.openid;
            var queryData = {
                access_token: access_token,
                openid: openid
            };
            queryData = querystring.stringify(queryData);
            var options={
                hostname:'127.0.0.1',
                port: 5000,
                path:'/wxdep/sns/userinfo?'+queryData,
                method:'GET'
            }
            getJsonByHttp(options,function(jsonObj){
                var unionid = jsonObj.unionid;
                req.session.wxid = unionid;
                console.log('wxid1-->'+unionid);
                res.redirect("/lyz");
            });
        });
    }
});



/*router.get('/lyz',function(req, res, next){
    res.render('lyz');
});



router.get('/xlsx',function(req, res, next){
    res.render('xlsx');
});

router.get('/test',function(req, res, next){
    res.render('test');
});

//http://platform.okbuy.com/app/v12/focus/list/?os=android&size=640_846
//http://api.breadtrip.com/v2/index/?lat=%25s40.03710800000001&lng=%25s116.37021400000003
router.get('/pics',function(req, res, next){
    var queryData = querystring.stringify({
        lat:'%25s40.03710800000001',
        lng:'%25s116.37021400000003'
    });
    var options={
        hostname:'api.breadtrip.com',  
        port:80,
        path:'/v2/index/?'+queryData,
        method:'GET'
    }
    getJsonByHttp(options,function(jsonObj){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.json(jsonObj);
    });
});
//返回查询的数据
router.post('/down',function(req, res, next){
    var data = {};
    if(req.body.area != ''){
        data.area = req.body.area;
    }
    if(req.body.school != ''){
        data.school = req.body.school;
    }
    if(req.body.subject != ''){
        data.subject = req.body.subject;
    }
    TSModle.getTeacherScoreAll(data)
    .then(function(tss){
        if(tss.length <= 0 ){
            res.json({code:103,msg: '没有数据'});
        }else{
            //生成xlsx文件
            makeXlsxFile(data.area || '全部', tss, function (fileName, error) {
                if(error){
                    res.json({code:103,msg: '没有数据'});
                }else{
                    res.json({
                        msg: 'success',
                        filePath: fileName+'.xlsx'
                    });
                }
            });
        }
    });
});

//返回排名数据
router.post('/score',function(req, res, next){
    var data = req.body;
    //如果同一个userid对同一个老师进行评论是禁止的
    TSModle.getTeacherScore({critic: data.user_Id,name: data.tea_Name})
        .then(function(tss){
            if(tss.length > 0){
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                
                res.json({code:100,msg: '已经评论过了',data: []});
            }else{
                var ts = dataReady(data);
                TSModle.create(ts)
                    .then(function(result){
                        ts = result.ops[0];
                        //返回排名前10的数据
                        TSModle.getTeacherScore({area: ts.area,subject: ts.subject})
                            .then(function(tss){
                                res.header("Access-Control-Allow-Origin", "*");
                                res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                                res.json({code:200,msg: '评论成功',data: tss});
                            })
                            .catch(next);
                    })
                    .catch(next);
            }
        })
        .catch(next);
    
    
});

function dataReady(data){
    var ts = {
		area: data.large_Area,//大区
        school: data.sch_Name,//学校
        subject: data.cus_Name,//专业
        name: data.tea_Name,//讲师名称
        critic: data.user_Id,//评分人
        advice: data.stu_Advice,//建议
        one: Number.parseInt(data.tea_Attendance),//每道题的分数
        two: Number.parseInt(data.cls_Explain),
        three: Number.parseInt(data.cls_Quesions),
        four: Number.parseInt(data.ques_Answer),
        five: Number.parseInt(data.cls_Coach),
        six: Number.parseInt(data.cls_Discipline),
        seven: Number.parseInt(data.cls_Skill),
        eight: Number.parseInt(data.cls_Progress),
        nine: Number.parseInt(data.exam_Explain),
        ten: Number.parseInt(data.class_Homework)
	};
    //计算平均分
    var average = (ts.one+ts.two+ts.three+ts.four+ts.five+ts.six+ts.seven+ts.eight+ts.nine+ts.ten)/10;
    ts.average = average;
    return ts;
}
*/
module.exports = router;