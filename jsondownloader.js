var request = require('request');
var async = require('async') ;
var fs = require('fs');

function downloadCategory(category,cb){
    request.get({
            url:"http://portofino.celeweb.eu:1337/" + category + "/find",
            jar : true
        },
        function(error,response,body){
            if (error) return cb(error) ;
            if (response.statusCode == 200) {
                var categoryfilename = __dirname + "/json/" + category + ".json";
                fs.writeFileSync(categoryfilename,body);
            } else {
                console.log("statuscode",response.statusCode) ;
            }
            cb() ;
        }
    );

}


module.exports.main = function(categories, jobdone){
    request.post({
            url:'http://portofino.celeweb.eu:1337/session/create',
            jar : true,
            form: {
                email:'gal@gal.it',
                password: "gal"
            }
        },
        function(error,response,body){
            if (!error && response.statusCode == 302) {
                async.each(categories,downloadCategory,jobdone)
            }

        }
    );
};