var mlModel = require('./classifier');

function getAction(sentance){
	return new Promise(function(resolve,reject){
		mlModel.loadClassifier('./model.json').then(function(classifier){
			mlModel.train(classifier).then(function(){
				let detectedLabel = mlModel.predict(classifier,sentance);
				return resolve(detectedLabel);
			});
		}, function(){
			return reject("Could not load the Model");
		});
	});
}


module.exports = {
	getAction:getAction
}