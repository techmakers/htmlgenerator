/**
 * Created by cashbit on 20/04/15.
 */

var categories =[

    "comuni",
    "affittacamere",
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
    "itinerariomercatini",
    "itinerarioescursioni",
    "itinerarioarteestoria",
    "itinerarioartigianato",
    "itinerariomeravigliedellanatura"
];


var jsondownloader = require("./jsondownloader") ;
var jsondataprocessor = require("./jsondataprocessor") ;
var jsonphotodownloader = require("./jsonPhotoDownloader") ;



jsonphotodownloader.main(function(err,fileList) {
    if (err) return console.log("jsonphotodownloader", err);
    jsondataprocessor.main(fileList, categories);
});
    jsondownloader.main(categories,function(err) {
        if (err) return console.log("jsondowloader", err);

    });

