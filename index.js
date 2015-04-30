/**
 * Created by cashbit on 20/04/15.
 */

var categories =[
    "comuni",
    "affittacamere"/*,
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
    "villaggituristici",
    "itinerarioenogastronomico",
    "itinerarioagroalimentare",
    "itinerariocultura",
    "itinerarioescursionistico"*/
];


var jsondownloader = require("./jsondownloader") ;
var jsondataprocessor = require("./jsondataprocessor") ;
var jsonphotodownloader = require("./jsonPhotoDownloader") ;

jsondownloader.main(categories,function(err){
    if (err) return console.log(err);
    jsondataprocessor.main(categories) ;
}) ;


jsonphotodownloader.main();