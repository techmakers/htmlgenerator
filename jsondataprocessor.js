var fs = require("fs");
var Mustache = require("mustache");

function processcategory(category){
	//console.log(category);
	var categoryfilename = __dirname + "/json/" + category + ".json";
	//console.log(categoryfilename);
	
	var categorycontent = fs.readFileSync(categoryfilename,"utf8");
	processcategorycontent(category,categorycontent);
}

function processcategorycontent(category,categorycontent){
	/*
	* Scopo:
	* 	- avere un file index.json contenente solo i category element che hanno il gal, nella cartella degli html della categoria
	* 	- creare il file html solo per i suddetti
	* */

	// aggiungere un array vuoto che verrà poi salvato nel file index.json
	var galfile = [];


	var categorycontentarray = JSON.parse(categorycontent);
	//console.log(categorycontentarray.length);
	for (var i=0; i<categorycontentarray.length;i++){
		var categoryelement = categorycontentarray[i];
		// aggiungere il controllo sul gal e processare solo se ha il gal

		//if(categoryelement.gal !== "" && categoryelement.gal !== null) {
		if (categoryelement.gal) {
			galfile.push(categoryelement);
			processcategoryelement(category, categoryelement);
		}	
	
	}

	var indexfolder = __dirname +"/site/html/"+ category;
	//console.log(categoryfolder);
	if (!fs.existsSync(indexfolder)){
		fs.mkdirSync(indexfolder);
	}
  	
	var nogal = JSON.stringify(galfile);
	var index = indexfolder + "/index"+ ".json";
	fs.writeFileSync(index,nogal,"utf8");

    // scriviamo anche in una cartella dove raggruppiamo tutti i json da passare all'app
	fs.writeFileSync(__dirname + "/site/jsonapp/" + category + ".json",nogal,"utf8");

	// solo se ha il gal, aggiungere il categoryelement all'array
	// salvare l'array nel file index.json, usando JSON.stringify per confertire da array a stringa json e salvare nel file

}


function findPhotoIdByCategoryNameAndId(categoryName,id){
	var result = module.exports.fileList.filter(function(v){
		return (v.classname === categoryName && v.recordid === id);
	}) ;
	return result[0] && result[0].id ;
}

function processcategoryelement(category,categoryelement){
	//console.log(category,categoryelement.name);
	
	var categoryfolder = __dirname + "/site/html/" + category;
	//console.log(categoryfolder);
	if (!fs.existsSync(categoryfolder)){
		fs.mkdirSync(categoryfolder);
	}

	// in fileList, dobbiamo cercare gli elementi che hanno:
	// classname = category
	// e
	// recordid = categoryelement.id


	categoryelement.photoid = findPhotoIdByCategoryNameAndId(category,categoryelement.id) ;

	var filename = categoryelement.name.replace(/[^a-z0-9]/gi,"_").toLowerCase();
	filename = categoryfolder + "/" + filename + ".html";
	fs.writeFileSync(filename,processtemplate(category,categoryelement));
}

function processtemplate(category,categoryelement){
	var templatefilename = __dirname + "/templates/" + category + ".tpl";
	var templatecontent = fs.readFileSync(templatefilename,"utf8");
	return Mustache.render(templatecontent, categoryelement);
}

module.exports.main = function(fileList,categories){
	module.exports.fileList = fileList ;
	for (var i=0; i<categories.length;i++){
		var category = categories[i];
		processcategory(category);
	}
};