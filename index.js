var optimist, csv2, rows, argv, fs, csvWriteStream, years, columns;

// Dependencies
rows = require('./consolidate-rows');
columns = require('./columns');
years = require('./years');
clean = require('./clean');
csv2 = require('csv2');
optimist = require('optimist');
fs = require('fs');
csvWriteStream = require('csv-write-stream');

argv = optimist
    .usage('Usage: $0 -i [input] -o [output]')
    .demand(['i','o'])
    .argv;

out = fs.createWriteStream(argv.o);
fs.createReadStream(argv.i)
	.pipe(csv2())
	.pipe(columns)
	.pipe(rows)
	.pipe(years)
	.pipe(csvWriteStream({sendHeaders:false, headers: ["start","end","text"]}))
	.pipe(out);