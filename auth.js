#!/usr/bin/env node

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: process.env.FLICKR_KEY,
        secret: process.env.FLICKR_SECRET,
        permissions: 'delete'
    };

Flickr.authenticate(flickrOptions, function(err, flickr) {
    if (err) {
        return console.error(err);
    }

    console.log("auth completed");

    process.exit(1);
});
