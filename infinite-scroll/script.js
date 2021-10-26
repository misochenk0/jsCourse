const imageContainer = document.getElementById('image-container');
const loader  = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API

const count = 30;
const apiKey  = 'V0bULlx3jRNf4k7rF-vB8GWeHEfUuFP4OAvno9DNG3Q'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(elem, attr) {
    for(const key in attr) {
        elem.setAttribute(key, attr[key])
    }
}
// Create Elements for Links & photos, add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        const image = document.createElement('img');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        image.addEventListener('load', imageLoaded);

        item.appendChild(image);
        imageContainer.appendChild(item)
    })
}


// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
    }
}

//Check scroll

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


getPhotos()