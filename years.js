var through2;

through2 = require('through2');

function processRow(row, enc, callback) {

	var original, start, end;

	original = row[0].split('-');

	start = original[0];
	end = original[1] || original[0];
	row.splice(0, 1, start, end);
	this.push(row);
	callback();
}

module.exports = through2.obj(processRow);