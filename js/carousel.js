function modulus(n, m) {
  if(n < 0) {
    return (m + (n % m)) % m;
  }
  return n % m;
}

function Carousel(imageURIs, containingDiv) {
  this.images = imageURIs.map(function(imageURI) {
    imgDomElement = document.createElement('img');
    imgDomElement.setAttribute('src', imageURI);
    imgDomElement.style.opacity = 1;
    imgDomElement.style.position = 'absolute';
    imgDomElement.style.top = '0px';
    imgDomElement.style.left = '0px';
    return imgDomElement;
  });
  this.containingDiv = containingDiv;
  this.currentImageIndex = 0;
  this.createDomElements();
}

Carousel.prototype.createDomElements = function () {
  var carousel = this;

  this.nextButton = document.createElement('button');
  this.nextButton.appendChild(document.createTextNode("next"));
  this.nextButton.onclick = function() { carousel.next() };
  
  this.previousButton = document.createElement('button');
  this.previousButton.appendChild(document.createTextNode("previous"));
  this.previousButton.onclick = function() { carousel.previous() };

  buttonDiv = document.createElement('div');
  buttonDiv.appendChild(this.previousButton);
  buttonDiv.appendChild(this.nextButton);
  buttonDiv.setAttribute("class", "carousel-buttons");

  this.containingDiv.appendChild(buttonDiv);
  this.imageDiv = document.createElement('div');
  this.imageDiv.style.position = 'relative';
  this.imageDiv.appendChild(this.images[this.currentImageIndex])
  this.containingDiv.appendChild(this.imageDiv);
  this.fadingIndex = null;
}

Carousel.prototype.setImage = function(newIndex) {
  myFadingIndex = this.currentImageIndex;
  this.fadingIndex = this.currentImageIndex;
  this.currentImageIndex = newIndex;
  this.images[this.currentImageIndex].style.opacity = 0;
  this.imageDiv.appendChild(this.images[this.currentImageIndex]);

  carousel = this;
  myInitialFade = parseFloat(carousel.images[myFadingIndex].style.opacity);
  currentFade = 0;
  function fade() {
    console.log("Fading index: " + myFadingIndex.toLocaleString());
    console.log("Current index: " + carousel.currentImageIndex.toLocaleString());
    if(currentFade >= 1 ||
       (carousel.fadingIndex != myFadingIndex && myInitialFade - currentFade <= 0)) {
      return carousel.endFade(myFadingIndex);
    }
    currentFade += .01;
    if (myFadingIndex == carousel.fadingIndex) {
      carousel.images[carousel.currentImageIndex].style.opacity = currentFade;
    }
    carousel.images[myFadingIndex].style.opacity = myInitialFade - currentFade;
  }
  this.currentTimer = setInterval(fade, 10);
}

Carousel.prototype.endFade = function (indexToRemove) {
  this.imageDiv.removeChild(this.images[indexToRemove]);
  clearInterval(this.currentTimer);
}

Carousel.prototype.next = function () {
  this.setImage(modulus(this.currentImageIndex + 1, this.images.length));
}

Carousel.prototype.previous = function () {
  this.setImage(modulus(this.currentImageIndex - 1, this.images.length));
}

