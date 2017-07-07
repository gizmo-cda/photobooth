#!/usr/bin/env node

let express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    request = require("request"),
    MjpegConsumer = require("mjpeg-consumer"),
    FileOnWrite = require("file-on-write");

// create app
var app = express();

// app configuration
app.set('port', (process.env.PORT || 8081));

// configure middleware
app.use(morgan('dev'));
app.use(express.static('public'));

// configure routes
app.get('/picture', (req, res) => {
    let streamRequest = request("http://localhost:8080/stream/video.mjpeg");
    let consumer = new MjpegConsumer();
    let writer = new FileOnWrite({ 
        path: './public/photos',
        ext: '.jpg',
        onwrite: (filename) => {
            // abort stream request
            streamRequest.abort();

            // create result
            let result = {
                success: true,
                filename: filename.substr("public/".length)
            };

            // send result
            res.end(JSON.stringify(result));
        }
    });

    // strart processing stream
    streamRequest.pipe(consumer).pipe(writer);
});

// start server
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;

    console.log("Server listening on port %s", port);
});
