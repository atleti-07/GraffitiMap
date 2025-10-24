document.addEventListener("DOMContentLoaded", () => {
  // === ハンバーガーメニュー ===
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("open");
    });
  }

  // === Leaflet 地図 ===
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([33.67074368477472, 130.44459982368008], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers = [
      { coords: [33.670222, 130.449667], image: 'images4/IMG_01.jpg', link:'graffiti01.html'},
      { coords: [33.663406, 130.444630], image: 'images4/IMG_03.jpg', link:'graffiti02.html'},
      { coords: [33.676850, 130.439193], image: 'images4/IMG_15.jpg', link:'graffiti05.html'},
      { coords: [33.667944, 130.443794], image: 'images4/IMG_25.jpg', link:'graffiti03.html'},
      { coords: [33.667460, 130.443007], image: 'images4/IMG_08.jpg', link:'graffiti04.html'},
      { coords: [33.672424, 130.451693], image: 'images4/IMG_43.jpg', link:'graffiti05.html'},
      { coords: [33.673477, 130.441488], image: 'images4/IMG_10.jpg', link:'graffiti06.html'},
    ];

    markers.forEach((item) => {
      const marker = L.marker(item.coords).addTo(map);
      const popupContent = `
        <div>
          <a href="${item.link || '#'}" target="_blank">
            <img src="${item.image}" alt="Location Image" class="popup-img">
          </a>
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }
});

// === Swiper スライダー ===
const swiper = new Swiper(".mySwiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 60,
  grabCursor: true,
  watchSlidesProgress: true,
  resistanceRatio: 0.85,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    progress(swiper) {
      swiper.slides.forEach((slide) => {
        const slideProgress = slide.progress;
        const scale = 1 - Math.min(Math.abs(slideProgress) * 0.15, 0.15);
        const opacity = Math.max(1 - Math.abs(slideProgress) * 0.5, 0.3);
        const translateX = slideProgress * 60;
        slide.style.transform = `scale(${scale}) translateX(${translateX}px)`;
        slide.style.opacity = opacity;
      });
    },
    setTransition(swiper, duration) {
      swiper.slides.forEach((slide) => {
        slide.style.transitionDuration = `${duration}ms`;
      });
    },
    init() {
      updateBackground(this);
      fixLoopVisual(this);
    },
    slideChangeTransitionStart() {
      this.updateSlidesProgress();
    },
    slideChange() {
      updateBackground(this);
    },
    slideChangeTransitionEnd() {
      fixLoopVisual(this);
    },
  },
});

// === 背景更新 ===
function updateBackground(swiperInstance) {
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  const bgImage = activeSlide.style.backgroundImage;
  document.querySelector(".mv").style.setProperty("--bg-image", bgImage);
}

// === 自動ループ時のズレ修正 ===
function fixLoopVisual(swiper) {
  swiper.updateSlidesProgress();
  swiper.updateSlidesClasses();

  // 右の画像がフェードインする前に消えないよう補正
  swiper.slides.forEach((slide) => {
    if (slide.classList.contains("swiper-slide-duplicate-next")) {
      slide.style.opacity = "0.5";
      slide.style.transform = "scale(0.9) translateX(60px)";
    }
  });
}

