## Install Node

- Make sure all existing node packages have been removed
	- use `dpkg-query -l | grep node` to list all node packages
	- use `apt-get` to remove those packages. For example: `sudo apt-get remove nodejs nodejs-legacy nodered`
- install `n`, a node version manager
	- `curl -L https://git.io/n-install | bash`
	- Allow the script to alter your bash profile
	- The latest stable version will be installed
	- Either `source` your profile or close and reopen you terminal
- Switch to node 6.11 using `n 6.11.0`

## Setup Static IP Address

- Edit `/etc/dhcpcd.conf`
- Add the following to the end of the file;
```
interface eth0
static ip_address=192.168.0.1/24
```
- reboot
	- `sudo reboot`
- check ip address. It should match the static address in the .conf file
	- `ifconfig eth0`

## Setup uv4l

- `curl http://www.linux-projects.org/listing/uv4l_repo/lrkey.asc | sudo apt-key add -`
- Add `deb http://www.linux-projects.org/listing/uv4l_repo/raspbian/ jessie main` to `/etc/apt/sources.list`
- `sudo apt-get update`
- `sudo apt-get install uv4l uv4l-raspicam uv4l-server uv4l-raspicam-extras`
- Update`/etc/uv4l/uv4l-raspicam.conf`
	- Uncomment and set
		- encoding = mjpeg
		- width = 1296
		- height = 976
		- framerate = 24
		- quality = 10
		- nopreview = yes
	- Restart the service with `sudo service u4vl_raspicam restart`

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
