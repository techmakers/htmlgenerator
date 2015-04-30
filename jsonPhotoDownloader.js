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
            console.log(err)
        })
        .pipe(fs.createWriteStream(path)) ;
}

module.exports.main = function(){
    downloadFileList(function(err){
        console.log("filelist",fileList) ;
        downloadPhoto(fileList[0],function(err){
            console.log("err",err) ;
        }) ;
    }) ;
}