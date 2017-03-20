var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');



function makeXlsxFile(fileName, dbData, callback){
    var data = [
        ['大区', '校区', '姓名', '专业', '分数']
    ];
    
    dbData.forEach(function(item, index){
        data[index + 1] = [];
        data[index + 1].push(item.area);
        data[index + 1].push(item.school);
        data[index + 1].push(item.name);
        data[index + 1].push(item.subject);
        data[index + 1].push(item.average);
    });
    
    var buffer = xlsx.build([{name: fileName, data: data}]); // Returns a buffer
    var date = new Date().getTime();
    fs.writeFile(path.join(__dirname,'../public/xlsx/',date+'.xlsx'),buffer,function(error) {
        if(error){
           callback(null,error);
        }else{
            callback(date);
        }
    });
}
module.exports = makeXlsxFile;