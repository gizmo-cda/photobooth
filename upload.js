#!/usr/bin/env node

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: process.env.FLICKR_KEY,
        secret: process.env.FLICKR_SECRET,
        user_id: process.env.FLICKR_USER_ID,
        access_token: process.env.FLICKR_ACCESS_TOKEN,
        access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET,
        permissions: 'delete'
    };

var uploadOptions = {
    photos: [{
        title: "Test Upload",
        tags: [ "me", "test" ],
        photo: "./test.jpg"
    }]
};

Flickr.upload(uploadOptions, flickrOptions, function(err, result) {
    if (err) {
        return console.error(err);
    }

    console.log("photos uploaded", result);

    process.exit(1);
});
