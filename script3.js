 // 地図を初期化
 const map = L.map('map').setView([33.663406, 130.444630], 15); 

  // 地図タイルを設定
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const markers = [
    {
      coords: [33.663445, 130.444235],
      image: 'images/img006.png'
    },

  ];

   // 各マーカーを追加
   markers.forEach((item) => {
    const marker = L.marker(item.coords).addTo(map);
    const popupContent = `
      <div>
        <p></p>
         <a href="${item.link}" target="_blank">
           <img src="${item.image}" alt="Location Image" class="popup-img">
         </a>  
      </div>
    `;
    marker.bindPopup(popupContent);
  });


//gyarari
document.addEventListener('DOMContentLoaded', () => {
    const fadeEls = document.querySelectorAll('.fade-in');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    fadeEls.forEach(el => observer.observe(el));
  });
