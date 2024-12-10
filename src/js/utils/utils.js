const wpUtils = {
	generateData: generateData,
};

function generateData() {
	const dataset = [];
	// for 7 days
	for (let i = 0; i < 7; i++) {
		// for 24 hours
		for (let j = 0; j < 24; j++) {
			// for 10 minutes
			dataset.push({ height: getRandomInt(500, 503), date: getPreviousHourByCount(i, j) });
		}
	}
	return dataset.reverse();
}
function getPreviousHourByCount(day, hour) {
	var date = new Date();
	var last = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
	return new Date(last.getTime() - hour * 60 * 60 * 1000);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { wpUtils };
