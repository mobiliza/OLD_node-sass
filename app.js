console.time('app');

var sass = require('node-sass'),
	fs = require('fs'),	
	mkdirp = require('mkdirp'),
	generateSassVars = require('./helpers/generateSassVars'),
	requestData = {
		"s3URL": "http://s3/fileManager/assets",
		"_client_id": "autoria", //não precisaria 
		"_pattern_id": "padrao1",
		"file": "geral" // ou editor
	},
	// Dados que estariam no banco
	varObject = {
		r: 130,
		g: 176,
		b: 216,
		logoUrl: 'http://www.mobiliza.com.br/wp-content/uploads/2015/01/logo-mobiliza-assinatura.png',
		fontName: 'OpenSansRegular2'
	},
	varsString = generateSassVars(varObject),
	save = function(err, result) {
		var css = result.css.toString('utf8');
		css = css.replace(/assets/g, requestData["s3URL"]);
		// console.log(css);

		console.timeEnd('app');

		var dir = './',
			file = 	requestData['file'] + '.min.css';

		(!err) 
			? saveToDisk(dir, file, css, result)
			: error(err);
	};


var compileWithVars = function(baseFileUrl, varsString){
	/*
		Encapsulei isso numa função pro causa do "hackzin" abaixo no "data"
		Para o node-sass ou você passa um arquivo ou uma string gigante para compilar.
		Não tem como fazer um misto passando variaveis e um arquivo base,
		Assim simulei um @import do documento que preciso e o bloco de váriaveis vem antes.
	*/
	console.log(varsString);
	var data = varsString +  ' @import "' + baseFileUrl + '"',
		result = sass.render({		
			data: varsString +  ' @import "' + baseFileUrl + '"',
			outputStyle: 'nested', //Aqui pode ser minificado: 'compressed'
			outFile: './css/output.css',
			sourceMap: true,
			includePaths: ['./player/']
		}, save);	
}

var saveToDisk = function(dir, file, css, result){

	mkdirp(dir, function (err) {
		(!err) 
			? writeCss(dir + file, css, result)
			: error(err);
	});
}

var writeCss = function(url, css, result){
	fs.writeFile(url, css, function(err){
		(!err) 
			? console.log('wirten: ', result.stats.duration + 'ms')
			: error(err);		
	});
}

var error = function(err){
	console.log('ERROR: ', err);
}

compileWithVars('./clients/_baseClient/' + requestData['_pattern_id'] + '/css/sass/geral.scss', varsString);





