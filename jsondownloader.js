var request = require('request');
var async = require('async') ;
var fs = require('fs');

function downloadCategory(category, categoryelement){
    request.get({
            url:"http://portofino.celeweb.eu:1337/" + category + "/find",
            jar : true

        },
    function(error,response,body){

        if (!error && response.statusCode == 200) {
                 console.log(body);

            var filename = category + ".json";
            fs.writeFileSync(filename,downloadCategory(category,categoryelement));

            } else {
                console.log(error) ;
            }

        });

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


module.exports.main(["comuni","affittacamere"],function(err){
    console.log(err) ;
});



