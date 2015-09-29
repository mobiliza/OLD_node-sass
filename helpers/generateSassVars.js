module.exports = function(varObject){
	var sassVar = '';

	for (var key in varObject) {
		if (varObject.hasOwnProperty(key)) {
			sassVar += '$' + key + ': "' + varObject[key] + '";' + '\n';
		}
	}

	console.log(sassVar)
	return sassVar;
}