/**
 * Created by cashbit on 20/04/15.
 */

var categories =[
    "comuni",
    /* "affittacamere",
     "ristoranti",
     "alberghidiffusi",
     "agriturismi",
     "aziendeagricole",
     "bb",
     "campeggi",
     "caseferie",
     "casevacanza",
     "esercizicommerciali",
     "hotel",
     "locande",
     "ostelli",
     "parchivacanza",
     "residenzeepoca",
     "residenzeturistiche",
     "rifugi",
     "strutturericettive",
     "villaggituristici"*/

];
var jsondownloader = require("./jsondownloader") ;
var jsondataprocessor = require("./jsondataprocessor") ;

function processtemplate(category,categoryelement){
	var templatefilename = __dirname + "/templates/" + category + ".tpl";
	var templatecontent = fs.readFileSync(templatefilename,"utf8");

	return Mustache.render(templatecontent, categoryelement);

	var output = Mustache.render(templatecontent, categoryelement);
	return output;

}


jsondownloader.main(categories,function(err){
 if (err) return console.log(err);
 jsondataprocessor.main(categories) ;
}) ;

