var through2, consolidatedRow;

through2 = require('through2');

function processRow(row, enc, callback) {

	var year, text;

	year = row[0].trim();
	text = row[1].trim();
	
	if (year) {
		if (consolidatedRow) {
			this.push(consolidatedRow);
		}
		consolidatedRow = [
			year,
			text
		];
	} else {
		if (!consolidatedRow) {
			consolidatedRow = ['',''];
		}

		consolidatedRow[1] += (' ' + text);
	}
	callback();
}

function flushFunc() {
	this.push(consolidatedRow);
}

module.exports = through2.obj(processRow, flushFunc);