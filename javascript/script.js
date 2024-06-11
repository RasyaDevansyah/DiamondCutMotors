let track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);

let nextButton = document.querySelector('.carousel-button-right');
let prevButton = document.querySelector('.carousel-button-left');

let dotsNav = document.querySelector('.carousel-nav');
let dots = Array.from(dotsNav.children)

let slideSize = slides[0].getBoundingClientRect();
let slideWidth = slideSize.width;


//arrange the slides next to 
let setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

let moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  loadCarImages(targetSlide)
}

let updateDots = (currentDot, targetDot) =>{
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}


//when i click right, move slides to the left
prevButton.addEventListener('click', e =>{
  
  let currentSlide = track.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;

  if(!prevSlide){
    prevSlide = slides[slides.length-1]
  }

  let currentDot = dotsNav.querySelector('.current-slide');
  let prevDot = currentDot.previousElementSibling;

  if(!prevDot){
    prevDot = dots[dots.length-1]
  }

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
})


// when i click right, move slides to the right
nextButton.addEventListener('click', e =>{
  let currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;

  if(!nextSlide){
    nextSlide = slides[0]
  }

  let currentDot = dotsNav.querySelector('.current-slide');
  let nextDot = currentDot.nextElementSibling;

  if(!nextDot){
    nextDot = dots[0]
  }

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);

})



// when i click the nav indicators, move to that slide
dotsNav.addEventListener('click', e=>{
  //what indicator was clicked on
  let targetDot = e.target.closest('button');


  if(!targetDot)
    return;

  let currentSlide = track.querySelector('.current-slide');
  let currentDot = dotsNav.querySelector('.current-slide');

  let targetIndex = dots.findIndex(dot => dot === targetDot);
  let targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

})
// Update slide positions on window resize
window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
  
  // Adjust the track position to keep the current slide centered
  let currentSlide = track.querySelector('.current-slide');
  let currentIndex = slides.findIndex(slide => slide === currentSlide);
  track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
});

let loadCarImages = (targetSlide) => {
  const carContainers = document.querySelectorAll(".car-container");
  const targetBrand = targetSlide.dataset.brand;

  carContainers.forEach(container => {
    container.style.opacity = '0';
    container.style.height = '0';
    setTimeout(() => {
      container.style.display = 'none';
    }, 400); 
  });

  carContainers.forEach(container => {
    const carBrand = container.querySelector(".car-brand").textContent;
    if (carBrand === targetBrand || targetBrand === "all") {
      setTimeout(() => { 
        container.style.display = 'block';
        setTimeout(() => {
          container.style.opacity = '1';
          container.style.height = 'auto';
        }, 10);
      }, 400); 
    }
  });
};



document.addEventListener("DOMContentLoaded", () => {
  const carImages = document.querySelectorAll(".car-item .car-image img");
  carImages.forEach(img => {
      if (img.complete) {
          applyGlowColor(img);
      } else {
          img.addEventListener("load", () => {
              applyGlowColor(img);
          });
      }
  });

  function applyGlowColor(img) {
      const carItem = img.closest(".car-item");
      const dominantColor = getDominantColor(img);
      const rgbaColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.6)`;
      carItem.style.setProperty("--glow-color", rgbaColor);
  }

  function getDominantColor(img) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const midX = Math.floor(canvas.width / 2);
      const midY = Math.floor(canvas.height / 2);
      const pixelData = context.getImageData(midX, midY, 1, 1).data;

      return [pixelData[0], pixelData[1], pixelData[2]];
  }
});