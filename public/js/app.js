let MAX_IMAGE_COUNT = 9;
let images = [];
var count = 3;

function countDown() {
  let countLabel = document.getElementById("countLabel");

  if (count > 0) {
    countLabel.innerHTML = String(count);
    count--;
    setTimeout(countDown, 1000)
  }
  else {
    countLabel.innerHTML = "";
    count = 3;
    snapPhoto();
  }
}

function snapPhoto() {
  xhr.get("/picture", showPhoto);
}

function showPhoto(err, data) {
  if (data && data.success) {
    let photos = document.getElementById("photos");
    let image = new Image();

    image.width = 128;
    image.height = 96;
    image.src = data.filename;

    images.push(image);

    if (images.length > MAX_IMAGE_COUNT) {
      let firstImage = images.shift();

      photos.removeChild(firstImage);
    }

    photos.appendChild(image);
  }
}
