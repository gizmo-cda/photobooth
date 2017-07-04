## Get an API key for the app

- Create an Application Key in the [App Garden](https://www.flickr.com/services/apps/create)
	- This will require you to authenticate as the user that owns the app
	- Kevin Lindsey has already done this, but Gizmo should do this so they can manage the API key
	- You will receive two key/value pairs: **FLICKR_KEY** and **FLICKR_SECRET**

## Get authentication keys for the user account

- Run `auth.js`
- This will open a browser page
	- Sign into Flickr using the account you wish to upload to
	- After you grant privileges to the app, you will be presented with a code
	- Copy and paste this code into the console where you ran `auth.js`
	- You will recieve three key/value pairs: **FLICKR_USER_ID**, **FLICKR_ACCESS_TOKEN**, and **FLICKR_ACCESS_TOKEN_SECRET**

## Uploading an Image

- Currently, `index.js` is setup for testing only
- Load all key/value pairs listed above into your environment
	- I do this by creating a `.env` file
	- Each key/value is placed on their own line
	- Each entry follows this format: `KEY=VALUE`
	- I use the following bash function to load that file:

```bash
dotenv () {
  set -a
  [ -f .env ] && . .env
  set +a
}
```

- Run `./index.js`
	- This file is currently setup for testing only
	- It will upload a file named `test.jpg` in the same directory as `index.js`
