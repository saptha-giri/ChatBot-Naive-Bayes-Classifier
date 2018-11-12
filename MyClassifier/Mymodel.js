var mlModel = require('./classifier');

function trainModel(){
	var myClassifier = mlModel.getNewClassifier();
	mlModel.addTraining(myClassifier,"who are you","tellme");
	mlModel.addTraining(myClassifier,"tell me about yourself","tellme");
	mlModel.addTraining(myClassifier,"who is your creator","founder");
	mlModel.addTraining(myClassifier,"who is your founder","founder");

	/*mlModel.addTraining(myClassifier,"are you fine?","fine");
	mlModel.addTraining(myClassifier,"are you good?","fine");
	mlModel.addTraining(myClassifier,['are', 'you'], 'tellme');
	mlModel.addTraining(myClassifier,['about', 'you'], 'tellme');*/

	mlModel.saveClassifier(myClassifier,'./model.json');
	console.log("model created");
	return "model created";
}

module.exports = {
	trainModel:trainModel
}