var categories =[
	"comuni",
	"affittacamere"
];
var fs = require("fs");
function processcategory(category){
	console.log(category);
	var categoryfilename = __dirname + "/json/" + category + ".json";
	console.log(categoryfilename);
	
	var categorycontent = fs.readFileSync(categoryfilename,"utf8");
	processcategorycontent(category,categorycontent);
}

function processcategorycontent(category,categorycontent){
	//console.log(categorycontent);
	var categorycontentarray = JSON.parse(categorycontent);
	console.log(categorycontentarray.length);
	for (var i=0; i<categorycontentarray.length;i++){
		var categoryelement = categorycontentarray[i];
		processcategoryelement(category,categoryelement);
	}
}

function processcategoryelement(category,categoryelement){
	console.log(category,categoryelement.name);
	
	var categoryfolder = __dirname + "/html/" + category;
	console.log(categoryfolder);
	if (!fs.existsSync(categoryfolder)){
		fs.mkdirSync(categoryfolder);
	}
	
	var filename = categoryelement.name.replace(/[^a-z0-9]/gi,"_").toLowerCase();
	var filename = categoryfolder + "/" + filename + ".html";
	console.log(filename);
	fs.writeFileSync(filename,JSON.stringify(categoryelement));
}

function main(){
	for (var i=0; i<categories.length;i++){
		var category = categories[i];
		processcategory(category);
	}
}
main();