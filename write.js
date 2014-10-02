var through2, consolidatedRow;

through2 = require('through2');

function processRow(row, enc, callback) {
	this.push(row.join);
	callback();
}

module.exports = through2.obj(processRow);