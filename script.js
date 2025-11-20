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

  // アイコン定義
  const iconUrls = {
    blue: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    red: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
  };

  function createIcon(color) {
    return new L.Icon({
      iconUrl: iconUrls[color],
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }

  // マーカー情報（色も指定）
  const markers = [
    { coords: [33.670222, 130.449667], image: 'images2/IMG_01.webp', link:'graffiti01.html', color: 'blue' },
    { coords: [33.663406, 130.444630], image: 'images2/IMG_03.webp', link:'graffiti02.html', color: 'blue' },
    { coords: [33.676850, 130.439193], image: 'images2/IMG_15.webp', link:'graffiti05.html', color: 'blue' },
    { coords: [33.667944, 130.443794], image: 'images2/IMG_25.jwebp', link:'graffiti03.html', color: 'blue' },
    { coords: [33.667460, 130.443007], image: 'images2/IMG_08.webp', link:'graffiti04.html', color: 'blue' },
    { coords: [33.672424, 130.451693], image: 'images2/IMG_43.webp', link:'graffiti05.html', color: 'blue' },
    { coords: [33.673477, 130.441488], image: 'images2/IMG_10.webp', link:'graffiti06.html', color: 'blue' },
    { coords: [33.669316, 130.443041], image: 'images2/IMG_09.webp', link: null, color: 'red' },
    { coords: [33.675269, 130.441798], image: 'images2/IMG_18.webp', link: null, color: 'red' },
    { coords: [33.667125, 130.442040], image: 'images2/IMG_59.webp', link: null, color: 'red' },
    { coords: [33.675965, 130.439774], image: 'images2/IMG_14.webp', link: null, color: 'red' },
  ];

  markers.forEach((item) => {
    const marker = L.marker(item.coords, { icon: createIcon(item.color) }).addTo(map);
  
    if (item.image) {
      let popupContent;
      
      if (item.color === 'red') {
        // 赤マーカー
        popupContent = `
          <div>
            <img src="${item.image}" alt="Location Image" class="popup-img">
          </div>
        `;
      } else {
        // 青マーカー
        popupContent = `
          <div>
            <a href="${item.link}" target="_blank">
              <img src="${item.image}" alt="Location Image" class="popup-img">
            </a>
          </div>
        `;
      }
  
      marker.bindPopup(popupContent);
    }
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

