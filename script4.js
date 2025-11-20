const mapAbout = L.map('map-about', {
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    boxZoom: false,
    keyboard: false,
    zoomControl: false
  }).setView([33.67074368477472, 130.44459982368008], 15);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; OpenStreetMap contributors'
  }).addTo(mapAbout);

const center = [33.67074368477472, 130.44459982368008];
L.circle(center, {
  radius: 1000,     //半径1km（メートル）
  color: '#0067C0', //円の線の色
  weight: 2,        //線の太さ
  fillColor: '#0067C0',
  fillOpacity: 0.1  //塗りの透明度
}).addTo(mapAbout);
