
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

// train an instance:
KNN.prototype.train = function(newPoints) {
	this.points = this.points.concat(newPoints);
}



//helper functions to be used in predict and predictSingle:

// _distance
KNN.prototype._distance = function(startPt, endPt) {
	if (startPt.length !== endPt.length) throw Error;
	const dimensions = startPt.length;
	let distanceSquared = 0;
	for (let d = 0; d < dimensions; d++) {
		distanceSquared += Math.pow(endPt[d] - startPt[d], 2);
	}
	return Math.sqrt(distanceSquared);
};

// _distances
KNN.prototype._distances = function(vector, trainingDataArr) {
	/*output: [
		[	_distance(vector, trainingDataArr[0]), trainingDataArr[0][1] ],
		[	_distance(vector, trainingDataArr[1]), trainingDataArr[1][1] ],
		//etc.
	 ]
	*/
	return trainingDataArr.reduce((distancesMappedToClasses, data) => {
		const distance = this._distance(vector, data[0]);
		const classification = data[1];
		distancesMappedToClasses.push([
			distance,
			classification
		]);
		return distancesMappedToClasses;
	},[]);
};

// _sorted
KNN.prototype._sorted = function(distancesArr) {
	// distancesArr.reduce((orderedClassifications, [distance, classification]) => {
	// 	if (orderedClassifications.length === 0) {
	// 		orderedClassifications.push()
	// 	}
	// }, []);
	return distancesArr
		.sort((a,b)=>a[0]>b[0])
		.reduce((classifications, [_, classification]) => {
			classifications.push(classification);
			return classifications;
		}, []);
};
KNN.prototype._majority = function(k, classificationsArr) {
	classCounts = {};
	for (let i = 0; i <= k; i++) {
		if (!classCounts.hasOwnProperty(classificationsArr[i])) {
			classCounts[classificationsArr[i]] = 1;
		} else classCounts[classificationsArr[i]]++;
	}
	const majorityValue = Math.max(...Object.values(classCounts));
	for (let prop of Object.keys(classCounts)) {
		if (classCounts[prop] === majorityValue) {
			return +prop;
		}
	}
};

KNN.prototype.predictSingle = function(vector) {
	const distancesArr = this._distances(vector, this.points);
	const classificationsArr = this._sorted(distancesArr);
	return this._majority(this.kSize, classificationsArr);
};

KNN.prototype.predict = function(vectorsArr) {
	return Array.isArray(vectorsArr)
	  ?	vectorsArr.map(vector => {
			if (Array.isArray(vector[0])) vector = vector[0];
			return this.predictSingle(vector);
		})
	  : null;
};

KNN.prototype.score = function(testData) {
	const predictions = this.predict(testData);
	let correctGuesses = 0;
	for (let i = 0; i < testData.length; i++) {
		if (predictions[i] === testData[i][1]) correctGuesses++;
	}
	return correctGuesses / testData.length;
}

module.exports = KNN
