var request = require('request');
var async = require('async') ;


function downloadCategory(category){
    request.get({
            url:"http://portofino.celeweb.eu:1337/" + category + "/find",
            jar : true
        },
        function(error,response,body){
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log(error) ;
            }
        }) ;
}

module.exports.main = function(categories,jobdone){
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
}

module.exports.main(["comuni","affittacamere"],function(err){
    console.log(err) ;
});



