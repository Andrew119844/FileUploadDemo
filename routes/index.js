'use strict';
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/*POST upload page. */
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files.upload);
        //update file name
        files.upload.name = fields.title = '.' + files.upload.name.split('.')[1];
        console.log(files.upload.name);
        //upload file to server
        fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
            if (err) console.log(err);
        });
        console.log('received');
    });
    form.on('end', function (err, fields, files) {
        console.log('file successfully uploaded');
        res.end('file successfully uploaded');
    });
});

module.exports = router;

