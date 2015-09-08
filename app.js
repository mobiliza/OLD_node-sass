var sass = require('node-sass'),
	fs = require('fs'),	
	mkdirp = require('mkdirp'),
	Mustache = require('mustache'),
	requestData = {
		"_client_id": "autoria",
		"_pattern_id": "padrao1",
		"file": "geral" // ou editor
	},
	save = function(err, result) { // node-style callback from v3.0.0 onwards
		var dir = './clients/_dist/' + requestData['_client_id'] +  '/' + requestData['_pattern_id'] + '/css/',
			file = 	requestData['file'] + '.min.css';

		(!err) 
			? saveToDisk(dir, file, result)
			: error(err);
	};


var compileWithVars = function(baseFileUrl, varsString){
	/*
		Encapsulei isso numa função para "hackzin" abaixo no "data"
		Para o node-sass ou você passa um arquivo ou uma string gigante para compilar.
		Não tem como fazer um misto passando variaveis e um bloco de dados,
		Assim simulei um @import do documento que preciso e o bloco de váriaveis vem antes.
	*/
	var data = varsString +  ' @import "' + baseFileUrl + '"',
		result = sass.render({		
			data: varsString +  ' @import "' + baseFileUrl + '"',
			outputStyle: 'compressed', //Aqui pode ser minificado: 'compressed'
			outFile: './css/output.css',
			sourceMap: true,
			includePaths: ['./player/']
		}, save);	
}

var saveToDisk = function(dir, file, result){
	mkdirp(dir, function (err) {
		(!err) 
			? writeCss(dir + file, result)
			: error(err);
	});
}

var writeCss = function(url, result){
	fs.writeFile(url, result.css, function(err){
		(!err) 
			? console.log('wirten: ', result.stats.duration + 'ms')
			: error(err);		
	});
}

var error = function(err){
	console.log('ERROR: ', err);
}

//Essa leitura teria que ser de um template que estaria na pasta do _baseClient do padrão referente, algo assim
// fs.readFile('./client/_baseClient/padrao1/css/varTemplate.scss', 'utf8', function (err,data) {	
fs.readFile('./template.scss', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
  	
  	//Dados que estariam no banco
	var view = {
		color: {
			r: 130,
			g: 176,
			b: 0
		},
		font: {
			name: 'OpenSansRegular'
		},
		logo: {
			url: "assets/images/logo.png"
		}
	};

	var output = Mustache.render(data, view);
	// console.log(output);
	compileWithVars('./clients/_baseClient/' + requestData['_pattern_id'] + '/css/sass/geral.scss', output);
});




// console.log(result);