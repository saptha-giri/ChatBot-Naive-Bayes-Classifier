var mlModel = require('./classifier');

function trainModel(){
	var myClassifier = mlModel.getNewClassifier();
	mlModel.addTraining(myClassifier,"who are you","tellme");
	mlModel.addTraining(myClassifier,"who r you","tellme");
	mlModel.addTraining(myClassifier,"who r u","tellme");
	mlModel.addTraining(myClassifier,"who are u","tellme");
	mlModel.addTraining(myClassifier,"about you","tellme");
	mlModel.addTraining(myClassifier,"tell me about yourself","tellme");
	mlModel.addTraining(myClassifier,"tell me about him","aboutFounder");
	mlModel.addTraining(myClassifier,"tell me about your founder","aboutFounder");
	mlModel.addTraining(myClassifier,"tell me about your creator","aboutFounder");
	mlModel.addTraining(myClassifier,"about your creator","aboutFounder");
	mlModel.addTraining(myClassifier,"about your founder","aboutFounder");
	mlModel.addTraining(myClassifier,"who is your creator","creator");
	mlModel.addTraining(myClassifier,"who is your founder","creator");
	mlModel.addTraining(myClassifier,"don't me about yourself","creator");
	mlModel.addTraining(myClassifier,"are you ok","fine");
	mlModel.addTraining(myClassifier,"are you okay","fine");
	/*mlModel.addTraining(myClassifier,"are you fine?","fine");
	mlModel.addTraining(myClassifier,"are you good?","fine");*/
	mlModel.addTraining(myClassifier,['are', 'you'], 'tellme');
	mlModel.addTraining(myClassifier,['about', 'you'], 'tellme');

	mlModel.saveClassifier(myClassifier,'./model.json');
	console.log("model created");
	return "model created";
}

module.exports = {
	trainModel:trainModel
}