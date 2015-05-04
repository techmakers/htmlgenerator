/*
    Per scaricare la lista:
    http://portofino.celeweb.eu:1337/fileuploads/find

    Per scaricare il singolo:
    http://portofino.celeweb.eu:1337/fileuploads/receive/<id>

 */
var request = require('request');
var async = require('async') ;
var fs = require('fs');

var fileList ;

function downloadFileList(cb){
    request.get({
            url:"http://portofino.celeweb.eu:1337/fileuploads/find",
            jar : true
        },
        function(error,response,body){
            if (error) return cb(error) ;
            if (response.statusCode == 200) {
                fileList = JSON.parse(body) ;
            } else {
                console.log("statuscode",response.statusCode) ;
            }
            cb() ;
        }
    );

}

function downloadPhoto(obj,cb){
    var path = __dirname + "/site/photos/"+ obj.id + ".jpg" ;
    request
        .get("http://portofino.celeweb.eu:1337/fileuploads/receive/"+obj.id)
        .on('error', function(err) {
            console.log(obj.id,err) ;
        })
        .on("end",function(err){
           cb(err);
        })
        .pipe(fs.createWriteStream(path)) ;
}

module.exports.main = function(cb) {

    downloadFileList(function (err) {
        if (err) return console.log("downloadfilelist",err) ;
        // async
        async.eachLimit(
            fileList,
            100,
            downloadPhoto,
            function (err) {
                if (err) console.log("dowloadphoto",err);
                cb(err,fileList);
            }
        );
    });
};
