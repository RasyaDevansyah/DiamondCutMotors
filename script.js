let slideIndex = 1;
let isNext = true; // Track if the next button was clicked
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  isNext = n > 0;
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  isNext = n > slideIndex;
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = slides[i].className.replace(" slide-in-right", "");
    slides[i].className = slides[i].className.replace(" slide-in-left", "");
    slides[i].className = slides[i].className.replace(" slide-out-right", "");
    slides[i].className = slides[i].className.replace(" slide-out-left", "");
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  let currentSlide = slides[slideIndex-1];
  let outgoingSlide = slides[slideIndex-2] || slides[slides.length - 1];

  if (isNext) {
    currentSlide.className += " slide-in-right";
    outgoingSlide.className += " slide-out-left";
  } else {
    currentSlide.className += " slide-in-left";
    outgoingSlide.className += " slide-out-right";
  }

  currentSlide.style.display = "block";
  dots[slideIndex-1].className += " active";
}
