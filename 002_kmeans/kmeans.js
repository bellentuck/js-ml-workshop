class KMeans {

	constructor(options) {
		if (options === undefined) options = {};
		this.minClusterMove = options.minClusterMove || 0.0001;
		this.clusterAttempts = 10;
		this.points = [];
	}

	train (newPoints) {
		this.points = this.points.concat(newPoints);
	}

	clusters () {

	}

	_distance (start, end) {
		return Math.sqrt(start.reduce((dist, startPoint, dimension) =>
			dist + Math.pow(end[dimension] - startPoint, 2), 0));
	}

	_max (arr, fn) {
		let highest = { result: null, value: null };
		for (let n = 0; n < arr.length; n++) {
			if (fn.length === 1) {
				let result = fn(arr[n]);
				if (highest.result === null || result > highest.result) {
					highest = {
						result,
						value: arr[n]
					}
				}
			}
			if (fn.length === 2) { // with index
				let result = fn(arr[n], n);
				if (highest.result === null || result > highest.result) {
					highest = {
						result,
						value: arr[n]
					}
				}
			}
		}
		return highest.value;
	}

	_clusterEvaluator () {

	}
}

module.exports = KMeans
