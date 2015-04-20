var fs = require("fs");
var Mustache = require("mustache");

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
	filename = categoryfolder + "/" + filename + ".html";
	console.log(filename);
	fs.writeFileSync(filename,processtemplate(category,categoryelement));
}

function processtemplate(category,categoryelement){
	var templatefilename = __dirname + "/templates/" + category + ".tpl";
	var templatecontent = fs.readFileSync(templatefilename,"utf8");
	return Mustache.render(templatecontent, categoryelement);
}

module.exports.main = function(categories){
	for (var i=0; i<categories.length;i++){
		var category = categories[i];
		processcategory(category);
	}
}