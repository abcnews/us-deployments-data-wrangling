var through2;

through2 = require('through2');

function processRow(row, enc, callback) {

	if (row.length === 1) {
		row.unshift("");
	}

	this.push(row);

	callback();
}

module.exports = through2.obj(processRow);