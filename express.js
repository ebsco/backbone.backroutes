/* jslint --node */
var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname));
app.use(function(req, res, next) {
	if (req.originalUrl.indexOf('.') < 0) {
		fs.createReadStream('example/index.html').pipe(res);
	} else {
		next();
	}
});
module.exports = app;