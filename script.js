document.addEventListener("DOMContentLoaded", () => {
  // --- Architecture DOM State Access ---
  const introOverlay = document.getElementById("introOverlay");
  const introHeart = document.getElementById("introHeart");
  const introBtn = document.getElementById("introBtn");
  const mainTrack = document.getElementById("mainTrack");
  const dotNav = document.getElementById("dotNav");
  const miniPlayer = document.getElementById("miniPlayer");
  const musicCd = document.getElementById("musicCd");
  const playBtn = document.getElementById("playBtn");
  
  // Slide 3 Elements
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const animationZone = document.getElementById("animationZone");
  const interactiveKiss = document.getElementById("interactiveKiss");
  const flowerBouquet = document.getElementById("flowerBouquet");

  // Slide 5 Elements
  const finaleTitle = document.getElementById("finaleTitle");
  const photoWrapper = document.getElementById("photoWrapper");

  let currentSlide = 0;
  const totalSlides = 5;
  let isTransitioning = false;
  let musicPlaying = false;

  // --- Intro Portal Timeline Management ---
  introBtn.addEventListener("click", () => {
    introHeart.classList.add("burst");
    setTimeout(() => {
      introOverlay.classList.add("opening");
      miniPlayer.classList.remove("hidden");
    }, 400);
  });

  // --- Track Layout Matrix Navigation ---
  function updateSlidePosition(targetIndex) {
    isTransitioning = true;
    currentSlide = targetIndex;
    
    // Perform track conversion translation offset calculation
    mainTrack.style.transform = `translateY(-${currentSlide * 100}vh)`;
    
    // Update Side Dot Nodes Active State
    Array.from(dotNav.children).forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });

    // Trigger Final Slide pop actions when sliding into view
    if (currentSlide === 4) {
      setTimeout(() => {
        finaleTitle.classList.remove("hidden");
        photoWrapper.classList.remove("hidden");
      }, 300);
    }

    setTimeout(() => { isTransitioning = false; }, 700);
  }

  // --- Input Vector Listeners (Wheel & Swipe) ---
  window.addEventListener("wheel", (e) => {
    if (isTransitioning || introOverlay.style.display === 'none' && !introOverlay.classList.contains("opening")) return;
    if (e.deltaY > 25 && currentSlide < totalSlides - 1) {
      updateSlidePosition(currentSlide + 1);
    } else if (e.deltaY < -25 && currentSlide > 0) {
      updateSlidePosition(currentSlide - 01);
    }
  }, { passive: true });

  // Touch Tracking Vectors
  let touchStart = 0;
  window.addEventListener("touchstart", (e) => { touchStart = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    if (isTransitioning) return;
    if (diff > 50 && currentSlide < totalSlides - 1) updateSlidePosition(currentSlide + 1);
    if (diff < -50 && currentSlide > 0) updateSlidePosition(currentSlide - 1);
  }, { passive: true });

  dotNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot") && !isTransitioning) {
      updateSlidePosition(parseInt(e.target.dataset.index));
    }
  });

  // --- Audio Engine Emulator Embellishments ---
  playBtn.addEventListener("click", () => {
    musicPlaying = !musicPlaying;
    musicCd.classList.toggle("spinning", musicPlaying);
    playBtn.innerHTML = musicPlaying ? `<span class="icon">⏸</span>` : `<span class="icon">▶</span>`;
  });

  // --- Slide 3 Interactive System Logic ---
  // The Evasive No-Button Mechanism Matrix
  noBtn.addEventListener("mouseover", repositionNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    repositionNoButton();
  });

  function repositionNoButton() {
    noBtn.classList.add("dodging");
    const verticalBound = window.innerHeight - 60;
    const horizontalBound = window.innerWidth - 100;
    
    const randomX = Math.floor(Math.random() * horizontalBound);
    const randomY = Math.floor(Math.random() * verticalBound);
    
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  }

  // Dynamic Kiss and Bouquet Sequential Sequence Handler
  yesBtn.addEventListener("click", () => {
    // Reveal hidden processing canvas zone
    animationZone.classList.remove("hidden");
    interactiveKiss.classList.remove("hidden");
    flowerBouquet.classList.add("hidden");

    // Hide choice selectors immediately to isolate background view
    yesBtn.style.visibility = "hidden";
    noBtn.style.visibility = "hidden";

    // Sequence Time Anchor 1: When kiss animation finishes scaling up closer, clear it and swap in wrapped bouquet
    setTimeout(() => {
      interactiveKiss.classList.add("hidden");
      flowerBouquet.classList.remove("hidden");
    }, 1500); 
  });
});
