<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#070912">
<title>UNIVERSE</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --malam:#070912; --tulang:#e9e6f2; --redup:#a3a5c0;
  --tampil:"Bricolage Grotesque","Segoe UI Variable Display","Segoe UI",system-ui,-apple-system,sans-serif;
  --badan:"Instrument Sans","Segoe UI",system-ui,-apple-system,Roboto,sans-serif;
  --gutter:clamp(20px,5vw,72px);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{min-height:100vh;background:var(--malam);color:var(--tulang);font-family:var(--badan);font-size:17px;line-height:1.55;overflow-x:hidden;-webkit-font-smoothing:antialiased}

.foto{position:fixed;inset:-24px;z-index:0;background:var(--malam) url("milkyway.jpg") 50% 40%/cover no-repeat;transition:transform .6s ease-out;will-change:transform}
.foto::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,18,.6) 0%,rgba(7,9,18,.1) 60%),linear-gradient(180deg,rgba(7,9,18,.4) 0%,rgba(7,9,18,.1) 30%,rgba(7,9,18,.6) 100%)}
.redup{position:fixed;inset:0;z-index:1;background:var(--malam);opacity:0;pointer-events:none}
#bintang{position:fixed;inset:0;z-index:2;pointer-events:none}
.isi{position:relative;z-index:3}

.atas{display:flex;justify-content:space-between;align-items:baseline;padding:26px var(--gutter);position:relative;z-index:2}
.merek{font-family:var(--tampil);font-weight:600;font-size:18px;letter-spacing:.02em;color:var(--tulang);text-decoration:none}
#jam{color:var(--redup);font-size:14px;font-variant-numeric:tabular-nums;text-align:right}

/* hero: tata surya waktu nyata di belakang judul */
.hero{position:relative;min-height:calc(100vh - 80px);min-height:calc(100svh - 80px);display:flex;flex-direction:column;justify-content:flex-end;padding:0 var(--gutter) clamp(36px,8vh,84px)}
#sistem{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab}
#sistem:active{cursor:grabbing}
.hero>:not(canvas){position:relative;pointer-events:none}
.hero a{pointer-events:auto}
.salam{color:var(--redup);font-size:16px;margin-bottom:6px}
h1{font-family:var(--tampil);font-size:clamp(56px,11vw,168px);line-height:.9;font-weight:300;font-stretch:80%;
  font-variation-settings:"wdth" 80,"opsz" 96;letter-spacing:-.045em;margin-left:-.04em;
  text-shadow:0 2px 40px rgba(7,9,18,.55);animation:menguat 2.4s cubic-bezier(.2,.7,.2,1) both}
@keyframes menguat{from{font-weight:200;font-variation-settings:"wdth" 100,"opsz" 12;letter-spacing:.02em;opacity:0}
  to{font-weight:300;font-variation-settings:"wdth" 80,"opsz" 96;letter-spacing:-.045em;opacity:1}}
.sub{max-width:34ch;margin-top:16px;color:var(--tulang);opacity:.82;font-size:clamp(16px,1.6vw,19px)}
.sub:empty{display:none}
.live{margin-top:14px;font-size:13.5px;color:var(--redup);font-variant-numeric:tabular-nums}
.live b{color:#ffd479;font-weight:500}
.tautan{display:flex;flex-wrap:wrap;gap:8px 26px;margin-top:clamp(22px,5vh,44px)}
.lanjut{display:inline-flex;align-items:center;gap:14px;color:var(--redup);text-decoration:none;font-size:15px;width:max-content}
.lanjut i{display:block;width:56px;height:1px;background:currentColor;transform-origin:left;animation:garis 2.6s ease-in-out infinite}
@keyframes garis{0%,100%{transform:scaleX(.35)}50%{transform:scaleX(1)}}
.lanjut:hover{color:var(--tulang)}
.penuh{color:var(--tulang)}
.penuh:hover{color:#ffd479}

#proyek{padding:clamp(40px,10vh,120px) var(--gutter) 40px;max-width:1280px;margin:0 auto}
.judul-bagian{font-family:var(--tampil);font-weight:400;font-size:clamp(18px,2vw,22px);color:var(--redup);margin-bottom:22px}
.daftar{list-style:none;border-top:1px solid rgba(233,230,242,.2)}
.daftar li{border-bottom:1px solid rgba(233,230,242,.2)}
.baris{--w:#8b7bff;position:relative;display:grid;grid-template-columns:34px minmax(0,1.1fr) minmax(0,1fr) 28px;align-items:center;column-gap:clamp(14px,3vw,40px);
  padding:clamp(22px,4vw,38px) 4px;color:inherit;text-decoration:none;outline:none;
  background:linear-gradient(90deg,color-mix(in srgb,var(--w) 0%,transparent),transparent 70%);transition:background .35s,padding .35s}
.baris:hover,.baris:focus-visible{background:linear-gradient(90deg,color-mix(in srgb,var(--w) 20%,transparent),transparent 72%);padding-left:16px}
.baris:focus-visible{box-shadow:inset 0 0 0 2px var(--w)}
.bin{width:26px;height:26px;color:var(--w);filter:brightness(1.35);opacity:.8;transition:transform .5s cubic-bezier(.2,.8,.2,1),opacity .3s}
.baris:hover .bin,.baris:focus-visible .bin{transform:rotate(90deg) scale(1.25);opacity:1}
.nama{font-family:var(--tampil);font-size:clamp(30px,5vw,68px);line-height:1;font-weight:300;font-variation-settings:"wdth" 82,"opsz" 72;letter-spacing:-.03em;transition:font-weight .35s,color .35s}
.baris:hover .nama,.baris:focus-visible .nama{font-weight:500;color:color-mix(in srgb,var(--w) 35%,white)}
.ket{color:var(--redup);font-size:15.5px;max-width:46ch}
.panah{width:24px;height:24px;color:var(--redup);transform:translateX(-6px);opacity:0;transition:transform .3s,opacity .3s}
.baris:hover .panah,.baris:focus-visible .panah{transform:none;opacity:1;color:var(--tulang)}
@media (max-width:760px){
  .baris{grid-template-columns:30px minmax(0,1fr);row-gap:10px}
  .ket{grid-column:2}
  .panah{display:none}
  .baris:hover{padding-left:4px}
}
footer{padding:44px var(--gutter) 56px;color:var(--redup);font-size:14px;max-width:1280px;margin:0 auto}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body>
<div class="foto" id="foto" aria-hidden="true"></div>
<div class="redup" id="redup" aria-hidden="true"></div>
<canvas id="bintang" aria-hidden="true"></canvas>

<div class="isi">
  <header class="atas">
    <a class="merek" href="#" id="merek">UNIVERSE</a>
    <div id="jam"></div>
  </header>

  <main>
    <div class="hero" id="hero">
      <canvas id="sistem" aria-label="Posisi planet tata surya saat ini (waktu nyata)"></canvas>
      <p class="salam" id="salam"></p>
      <h1 id="judul">Welcome</h1>
      <p class="sub" id="subjudul"></p>
      <p class="live" id="live"></p>
      <div class="tautan">
        <a class="lanjut" href="#proyek">Lihat proyek<i></i></a>
        <a class="lanjut penuh" href="tatasurya.html">Buka simulasi lengkap &rarr;</a>
      </div>
    </div>

    <section id="proyek" aria-labelledby="jp">
      <h2 class="judul-bagian" id="jp">Proyek</h2>
      <ul class="daftar" id="daftar"></ul>
    </section>
  </main>

  <footer>Dibuat dengan HTML, CSS, dan JavaScript, <span id="tahun"></span>.</footer>
</div>

<script>
/* ====== UBAH BAGIAN INI UNTUK MENYESUAIKAN ====== */
const NAMA_SITUS = "UNIVERSE";
const JUDUL      = "Welcome";
const SUBJUDUL   = "T";
const HALAMAN = [
  {nama:"Kasku",      ket:"Dashboard akuntansi: penjualan, pembelian, laporan, dan hak akses pengguna.",          href:"kasku.html",    warna:"#8b7bff"},
  {nama:"Saving",     ket:"Catat pemasukan dan pengeluaran harian, atur saldo awal, dan kejar target menabung.",  href:"saving.html",   warna:"#2dd4bf"},
  {nama:"To Do List", ket:"To-do list bergaya pastel dengan daftar, tanggal, dan jam.",                           href:"todolist.html", warna:"#f472b6"},
  {nama:"My file",    ket:"Halaman privasi untuk menyimpan foto atau video dengan sandi.",                        href:"neptune.html",  warna:"#60a5fa"}
];
/* ================================================ */

const $ = id => document.getElementById(id);
function aman(t){return String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

$("merek").innerText = NAMA_SITUS;
$("judul").innerText = JUDUL;
$("subjudul").innerText = SUBJUDUL;
$("tahun").innerText = new Date().getFullYear();
document.title = NAMA_SITUS;

function salam(j){
  if (j >= 4 && j < 11) return "Selamat pagi.";
  if (j >= 11 && j < 15) return "Selamat siang.";
  if (j >= 15 && j < 18) return "Selamat sore.";
  return "Selamat malam.";
}
function tik(){
  let d = new Date();
  $("salam").innerText = salam(d.getHours());
  $("jam").innerText = d.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long"}) + ", " +
    d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(/\./g,":");
}
tik(); setInterval(tik, 1000);

const BINTANG_SVG = '<svg class="bin" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.6 6.6 4.4 10.9 12 12-7.6 1.1-11.4 5.4-12 12-.6-6.6-4.4-10.9-12-12C7.6 10.9 11.4 6.6 12 0z"/></svg>';
const PANAH_SVG = '<svg class="panah" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
$("daftar").innerHTML = HALAMAN.map(function(h){
  return '<li><a class="baris" href="'+aman(h.href)+'" style="--w:'+aman(h.warna)+'">'+BINTANG_SVG+
    '<span class="nama">'+aman(h.nama)+'</span><span class="ket">'+aman(h.ket)+'</span>'+PANAH_SVG+'</a></li>';
}).join("");

function redupkan(){
  let p = Math.min(1, scrollY / Math.max(1, innerHeight*0.9));
  $("redup").style.opacity = (p*0.66).toFixed(3);
}
addEventListener("scroll", redupkan, {passive:true}); redupkan();

/* ====== Bintang berkelip (latar tetap) ====== */
const cv = $("bintang"), g = cv.getContext("2d");
const hemat = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const WARNA_B = ["#ffffff","#cfe0ff","#ffe6d0","#e0d6ff"];
let W, H, bintang = [];
const acak = (a,b) => a + Math.random()*(b-a);
function susun(){
  let r = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W*r; cv.height = H*r; cv.style.width = W+"px"; cv.style.height = H+"px";
  g.setTransform(r,0,0,r,0,0);
  bintang = [];
  let n = Math.min(110, Math.floor(W*H/16000));
  for (let i=0;i<n;i++) bintang.push({x:acak(0,W),y:acak(0,H),r:acak(.3,1.3),a:acak(.35,1),f:acak(.5,2.2),p:acak(0,6.28),c:WARNA_B[(Math.random()*WARNA_B.length)|0]});
}
function kelip(ms){
  g.clearRect(0,0,W,H);
  let t = ms/1000;
  for (let i=0;i<bintang.length;i++){
    let b = bintang[i], k = hemat ? 1 : (0.55 + 0.45*Math.sin(t*b.f + b.p));
    g.globalAlpha = b.a*k; g.fillStyle = b.c;
    g.beginPath(); g.arc(b.x,b.y,b.r,0,6.2832); g.fill();
  }
  g.globalAlpha = 1;
  if (!hemat) requestAnimationFrame(kelip);
}
susun();
addEventListener("resize", function(){ susun(); if (hemat) kelip(0); });
if (hemat) kelip(0); else requestAnimationFrame(kelip);
addEventListener("mousemove", function(e){
  if (hemat) return;
  $("foto").style.transform = "translate("+((e.clientX/W-0.5)*-14)+"px,"+((e.clientY/H-0.5)*-14)+"px)";
});

/* ====== Tata surya waktu nyata (elemen orbit rata-rata JPL, 1800-2050) ======
   [nama, warna, radius px, a,a',e,e',I,I',L,L',varpi,varpi',Omega,Omega'] (derajat, per abad) */
const RAD = Math.PI/180, AU_KM = 149597870.7;
const PL = [
 ["Merkurius","#a8a29e",3.5,0.38709927,0.00000037,0.20563593,0.00001906,7.00497902,-0.00594749,252.25032350,149472.67411175,77.45779628,0.16047689,48.33076593,-0.12534081],
 ["Venus","#e8c98b",5.5,0.72333566,0.00000390,0.00677672,-0.00004107,3.39467605,-0.00078890,181.97909950,58517.81538729,131.60246718,0.00268329,76.67984255,-0.27769418],
 ["Bumi","#4f9be8",6,1.00000261,0.00000562,0.01671123,-0.00004392,-0.00001531,-0.01294668,100.46457166,35999.37244981,102.93768193,0.32327364,0,0],
 ["Mars","#d9693f",4.5,1.52371034,0.00001847,0.09339410,0.00007882,1.84969142,-0.00813131,-4.55343205,19140.30268499,-23.94362959,0.44441088,49.55953891,-0.29257343],
 ["Jupiter","#d8b48a",12,5.20288700,-0.00011607,0.04838624,-0.00013253,1.30439695,-0.00183714,34.39644051,3034.74612775,14.72847983,0.21252668,100.47390909,0.20469106],
 ["Saturnus","#e6cf9c",10,9.53667594,-0.00125060,0.05386179,-0.00050991,2.48599187,0.00193609,49.95424423,1222.49362201,92.59887831,-0.41897216,113.66242448,-0.28867794],
 ["Uranus","#9fe0e6",8,19.18916464,-0.00196176,0.04725744,-0.00004397,0.77263783,-0.00242939,313.23810451,428.48202785,170.95427630,0.40805281,74.01692503,0.04240589],
 ["Neptunus","#4a74e6",8,30.06992276,0.00026291,0.00859048,0.00005105,1.77004347,0.00035372,-55.12002969,218.45945325,44.96476227,-0.32241464,131.78422574,-0.00508664]
];
function elem(p,T){
  const v=i=>p[i]+p[i+1]*T, O=v(13)*RAD;
  return {a:v(3),e:v(5),I:v(7)*RAD,L:v(9),vp:v(11),O:O,w:v(11)*RAD-O};
}
function ekl(xp,yp,I,w,O){
  const cw=Math.cos(w),sw=Math.sin(w),cO=Math.cos(O),sO=Math.sin(O),cI=Math.cos(I),sI=Math.sin(I);
  return [(cw*cO-sw*sO*cI)*xp+(-sw*cO-cw*sO*cI)*yp,
          (cw*sO+sw*cO*cI)*xp+(-sw*sO+cw*cO*cI)*yp,
          (sw*sI)*xp+(cw*sI)*yp];
}
function kepler(M,e){
  M=((M+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  let E=M+e*Math.sin(M);
  for(let i=0;i<8;i++) E-=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));
  return E;
}
function posisi(p,T){
  const q=elem(p,T), E=kepler((q.L-q.vp)*RAD,q.e);
  return ekl(q.a*(Math.cos(E)-q.e), q.a*Math.sqrt(1-q.e*q.e)*Math.sin(E), q.I,q.w,q.O);
}
function jalur(p,T){
  const q=elem(p,T), o=[];
  for(let k=0;k<=120;k++){
    const E=2*Math.PI*k/120;
    o.push(ekl(q.a*(Math.cos(E)-q.e), q.a*Math.sqrt(1-q.e*q.e)*Math.sin(E), q.I,q.w,q.O));
  }
  return o;
}

const sv=$("sistem"), c=sv.getContext("2d"), hero=$("hero");
let SW=0, SH=0, SR=1, RM=300, yaw=-0.6, tilt=0.95, geserX=0, seret=null;
function ukur(){
  SR=Math.min(window.devicePixelRatio||1,2);
  const r=hero.getBoundingClientRect();
  SW=r.width; SH=r.height;
  sv.width=SW*SR; sv.height=SH*SR;
  RM=0.47*Math.min(SW*(SW>900?0.62:1), SH*1.05);
}
new ResizeObserver(ukur).observe(hero); ukur();

function peta(v){
  const r=Math.hypot(v[0],v[1],v[2]); if(r<1e-9) return [0,0,0];
  const f=Math.sqrt(r/30)*RM/r; return [v[0]*f,v[1]*f,v[2]*f];
}
function proy(v,ox,oy){
  const cy=Math.cos(yaw),sy=Math.sin(yaw),ct=Math.cos(tilt),st=Math.sin(tilt);
  const x1=v[0]*cy-v[1]*sy, y1=v[0]*sy+v[1]*cy;
  return [ox+x1, oy-(y1*ct+v[2]*st), -y1*st+v[2]*ct];
}
function cincin(x,y,R,depan){
  const ratio=Math.max(0.12,Math.abs(Math.sin(tilt)));
  c.save(); c.translate(x,y); c.scale(1,ratio);
  c.strokeStyle="rgba(214,190,140,.8)"; c.lineWidth=R*0.38/Math.max(ratio,.4);
  c.beginPath(); depan ? c.arc(0,0,R*1.75,0,Math.PI) : c.arc(0,0,R*1.75,Math.PI,2*Math.PI);
  c.stroke(); c.restore();
}
function sistem(){
  const ms=Date.now(), T=((ms/86400000+2440587.5)-2451545.0)/36525;
  c.setTransform(1,0,0,1,0,0); c.clearRect(0,0,sv.width,sv.height);
  c.setTransform(SR,0,0,SR,0,0);
  if(!seret) yaw+=0.0004; // putaran pelan agar terasa hidup
  const ox=SW>900 ? SW*0.62 : SW/2, oy=SW>900 ? SH*0.46 : SH*0.34;

  PL.forEach(function(p){
    const pts=jalur(p,T);
    c.beginPath();
    pts.forEach(function(v,i){ const s=proy(peta(v),ox,oy); i?c.lineTo(s[0],s[1]):c.moveTo(s[0],s[1]) });
    c.strokeStyle="rgba(233,230,242,.2)"; c.lineWidth=1; c.stroke();
  });

  const daftar=[{n:"Matahari",s:[ox,oy,0]}];
  let jarakBumi=0;
  PL.forEach(function(p){
    const v=posisi(p,T);
    if(p[0]==="Bumi") jarakBumi=Math.hypot(v[0],v[1],v[2]);
    daftar.push({n:p[0],p:p,s:proy(peta(v),ox,oy)});
  });
  daftar.sort((a,b)=>a.s[2]-b.s[2]);

  daftar.forEach(function(o){
    const x=o.s[0], y=o.s[1];
    if(!o.p){
      const gl=c.createRadialGradient(x,y,8,x,y,90);
      gl.addColorStop(0,"rgba(255,190,80,.55)"); gl.addColorStop(1,"rgba(255,160,40,0)");
      c.fillStyle=gl; c.beginPath(); c.arc(x,y,90,0,6.2832); c.fill();
      const gs=c.createRadialGradient(x-5,y-5,1,x,y,19);
      gs.addColorStop(0,"#fff3c4"); gs.addColorStop(.6,"#ffc23f"); gs.addColorStop(1,"#ff8a1f");
      c.fillStyle=gs; c.beginPath(); c.arc(x,y,19,0,6.2832); c.fill();
      return;
    }
    const R=o.p[2];
    let dx=ox-x, dy=oy-y, dl=Math.hypot(dx,dy)||1; dx/=dl; dy/=dl;
    if(o.n==="Saturnus") cincin(x,y,R,false);
    const gr=c.createRadialGradient(x+dx*R*.45,y+dy*R*.45,R*.1,x,y,R*1.15);
    gr.addColorStop(0,"#fff"); gr.addColorStop(.05,o.p[1]); gr.addColorStop(.6,o.p[1]); gr.addColorStop(1,"#05060d");
    c.fillStyle=gr; c.beginPath(); c.arc(x,y,R,0,6.2832); c.fill();
    if(o.n==="Saturnus") cincin(x,y,R,true);
    c.font="500 12.5px 'Instrument Sans',system-ui,sans-serif";
    c.fillStyle=o.n==="Bumi"?"#fff":"rgba(233,230,242,.78)";
    c.fillText(o.n,x+R+6,y+4);
  });
  $("live").innerHTML="<b>Langsung</b>, posisi planet saat ini. Bumi berjarak "+
    jarakBumi.toLocaleString("id-ID",{minimumFractionDigits:4,maximumFractionDigits:4})+" SA dari Matahari ("+
    (jarakBumi*AU_KM/1e6).toLocaleString("id-ID",{maximumFractionDigits:2})+" juta km).";
  requestAnimationFrame(sistem);
}
sistem();

/* seret untuk memutar sudut pandang */
sv.addEventListener("pointerdown",function(e){ seret={x:e.clientX,y:e.clientY}; sv.setPointerCapture(e.pointerId) });
sv.addEventListener("pointermove",function(e){
  if(!seret) return;
  yaw+=(e.clientX-seret.x)*0.008; tilt=Math.max(0.15,Math.min(1.45,tilt+(e.clientY-seret.y)*0.005));
  seret={x:e.clientX,y:e.clientY};
});
["pointerup","pointercancel"].forEach(t=>sv.addEventListener(t,function(){ seret=null }));
</script>
</body>
</html>
