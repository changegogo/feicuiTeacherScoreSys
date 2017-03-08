var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);//连接数据库

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});
//用户数据
var User = mongolass.model('User',{
        uuid: {type: 'string'},
    });
User.index({uuid: 1},{unique: true}).exec();
//文章数据
var TeacherScore = mongolass.model('TeacherScore',{
    area: {type: 'string'},//大区
    school: {type: 'string'},//学校
    subject: {type: 'string'},//专业
    name: {type: 'string'},//讲师名称
    critic: {type: 'string'},//评分人
    advice: {type: 'string'},//建议
    one: {type: 'number'},//每道题的分数
    two: {type: 'number'},
    three: {type: 'number'},
    four: {type: 'number'},
    five: {type: 'number'},
    six: {type: 'number'},
    seven: {type: 'number'},
    eight: {type: 'number'},
    nine: {type: 'number'},
    ten: {type: 'number'},
    average: {type: 'number'}//平均分
});
TeacherScore.index({average:-1}).exec();//按创建时间降序查看用户的文章列表

module.exports = {
    User: User,
    TeacherScore: TeacherScore
};