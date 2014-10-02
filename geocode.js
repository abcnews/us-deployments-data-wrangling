var geocode, geocoder, through2, async;

through2 = require('through2');
geocode = require('node-geocoder').getGeocoder('google', 'http');
async = require('async');

function processRow(row, enc, callback) {

	var locations, coordiantes, _this;

	_this = this;

	locations = row[3].split('|').filter(function(l){
		return l.length;
	});

	if (locations.length === 0) {
		row.push('');
		_this.push(row);
		callback();
		return;
	}

	console.log(locations);
	
	async.map(locations, geocodeLocation, function(err, results){
		if (err) {
			console.log(err);
		}
		row.push(results.join('|'));
		_this.push(row);
		callback();
	});

}

function geocodeLocation(location, cb) {
	geocode.geocode(location)
		.then(function(res){
			cb(null, (res.length > 0) ? res[0].latitude + ',' + res[0].longitude : '');
		})
		.catch(function(err){
			cb(null, '');
		});
}



module.exports = through2.obj(processRow);