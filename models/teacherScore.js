var TeacherScore = require('../lib/mongo').TeacherScore;

module.exports = {
    create: function create(teacherScore){
        return TeacherScore.create(teacherScore).exec();
    },
    //获取老师的分数数据
    getTeacherScore: function getTeacherScore(querySome){
        var query = {};
        if(querySome){
            query = querySome;
        }
        return TeacherScore
            .find(query)
            //.populate({path: 'author',model: 'User'})
            .sort({average: -1})
            .limit(10)
            .addCreatedAt()
            .exec();
    },
    //获取老师的分数数据
    getTeacherScoreAll: function getTeacherScore(querySome){
        var query = {};
        if(querySome){
            query = querySome;
        }
        return TeacherScore
            .find(query)
            //.populate({path: 'author',model: 'User'})
            .sort({average: -1})
            .addCreatedAt()
            .exec();
    }
};