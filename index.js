#!/usr/bin/env node

let express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

// create app
var app = express();

// app configuration
app.set('port', (process.env.PORT || 8081));

// configure middleware
app.use(morgan('dev'));
app.use(express.static('public'));

// configure routes
app.get('/picture', (req, res) => {
    var request = require("request");
    var MjpegConsumer = require("mjpeg-consumer");
    var FileOnWrite = require("file-on-write");

    var consumer = new MjpegConsumer();
    var writer = new FileOnWrite({ 
        path: './public/photos',
        ext: '.jpg',
        onwrite: (filename) => {
            // trim off "public/" so the web page can access the image with the result value
            filename = filename.substr("public/".length);

            let result = {
                success: true,
                filename: filename
            };

            // close the mjpeg input stream
            // consumer.end();
            streamRequest.abort();

            // send result
            res.end(JSON.stringify(result));
        }
    });

    var streamRequest = request("http://localhost:8080/stream/video.mjpeg");
    streamRequest.pipe(consumer).pipe(writer);
});

// start server
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;

    console.log("Server listening on port %s", port);
});
