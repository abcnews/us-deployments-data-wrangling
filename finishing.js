var optimist, csv2, rows, argv, fs, csvWriteStream, geocode;

// Dependencies
csv2 = require('csv2');
optimist = require('optimist');
fs = require('fs');
csvWriteStream = require('csv-write-stream');
geocode = require('./geocode');

argv = optimist
    .usage('Usage: $0 -i [input] -o [output]')
    .demand(['i','o'])
    .argv;

out = fs.createWriteStream(argv.o);
fs.createReadStream(argv.i)
	.pipe(csv2())
	.pipe(geocode)
	.pipe(csvWriteStream({sendHeaders:false, headers: ["start","end","conflict","locations","opponents","text","?","coordinates"]}))
	.pipe(out);