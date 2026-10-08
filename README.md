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

/* langit: foto asli, makin gelap saat di-scroll supaya daftar tetap terbaca */
.foto{position:fixed;inset:-24px;z-index:0;background:var(--malam) url("milkyway.jpg") 50% 40%/cover no-repeat;transition:transform .6s ease-out;will-change:transform}
.foto::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,18,.55) 0%,rgba(7,9,18,0) 55%),linear-gradient(180deg,rgba(7,9,18,.35) 0%,rgba(7,9,18,0) 30%,rgba(7,9,18,.55) 100%)}
.redup{position:fixed;inset:0;z-index:1;background:var(--malam);opacity:0;pointer-events:none}
#bintang{position:fixed;inset:0;z-index:2;pointer-events:none}
.isi{position:relative;z-index:3}

.atas{display:flex;justify-content:space-between;align-items:baseline;padding:26px var(--gutter)}
.merek{font-family:var(--tampil);font-weight:600;font-size:18px;letter-spacing:.02em;color:var(--tulang);text-decoration:none}
#jam{color:var(--redup);font-size:14px;font-variant-numeric:tabular-nums;text-align:right}

/* hero: judul besar di kiri-bawah, langit dibiarkan terlihat */
.hero{min-height:calc(100vh - 80px);min-height:calc(100svh - 80px);display:flex;flex-direction:column;justify-content:flex-end;padding:0 var(--gutter) clamp(36px,8vh,84px)}
.salam{color:var(--redup);font-size:16px;margin-bottom:6px}
h1{font-family:var(--tampil);font-size:clamp(64px,17.5vw,260px);line-height:.9;font-weight:300;font-stretch:80%;
  font-variation-settings:"wdth" 80,"opsz" 96;letter-spacing:-.045em;margin-left:-.04em;
  text-shadow:0 2px 40px rgba(7,9,18,.45);animation:menguat 2.4s cubic-bezier(.2,.7,.2,1) both}
@keyframes menguat{from{font-weight:200;font-variation-settings:"wdth" 100,"opsz" 12;letter-spacing:.02em;opacity:0}
  to{font-weight:300;font-variation-settings:"wdth" 80,"opsz" 96;letter-spacing:-.045em;opacity:1}}
.sub{max-width:34ch;margin-top:20px;color:var(--tulang);opacity:.82;font-size:clamp(16px,1.6vw,19px)}
.sub:empty{display:none}
.lanjut{margin-top:clamp(28px,6vh,56px);display:inline-flex;align-items:center;gap:14px;color:var(--redup);text-decoration:none;font-size:15px;width:max-content}
.lanjut i{display:block;width:56px;height:1px;background:currentColor;transform-origin:left;animation:garis 2.6s ease-in-out infinite}
@keyframes garis{0%,100%{transform:scaleX(.35)}50%{transform:scaleX(1)}}
.lanjut:hover{color:var(--tulang)}

/* daftar proyek */
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
    <div class="hero">
      <p class="salam" id="salam"></p>
      <h1 id="judul">Welcome</h1>
      <p class="sub" id="subjudul"></p>
      <a class="lanjut" href="#proyek">Lihat proyek<i></i></a>
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
    d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}).replace(/\./g,":");
}
tik(); setInterval(tik, 20000);

const BINTANG_SVG = '<svg class="bin" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.6 6.6 4.4 10.9 12 12-7.6 1.1-11.4 5.4-12 12-.6-6.6-4.4-10.9-12-12C7.6 10.9 11.4 6.6 12 0z"/></svg>';
const PANAH_SVG = '<svg class="panah" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
$("daftar").innerHTML = HALAMAN.map(function(h){
  return '<li><a class="baris" href="'+aman(h.href)+'" style="--w:'+aman(h.warna)+'">'+BINTANG_SVG+
    '<span class="nama">'+aman(h.nama)+'</span><span class="ket">'+aman(h.ket)+'</span>'+PANAH_SVG+'</a></li>';
}).join("");

/* Langit meredup pelan saat di-scroll */
function redupkan(){
  let p = Math.min(1, scrollY / Math.max(1, innerHeight*0.9));
  $("redup").style.opacity = (p*0.66).toFixed(3);
}
addEventListener("scroll", redupkan, {passive:true}); redupkan();

/* ====== Bintang berkelip & bintang jatuh (canvas) ====== */
const cv = $("bintang"), g = cv.getContext("2d");
const hemat = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const WARNA_B = ["#ffffff","#cfe0ff","#ffe6d0","#e0d6ff"];
let W, H, bintang = [], meteor = [];
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
function meteorBaru(x,y){
  let s = acak(0.15,0.4)*Math.PI, v = acak(9,15);
  meteor.push({x:x!==undefined?x:acak(0,W*0.8), y:y!==undefined?y:acak(0,H*0.4), vx:Math.cos(s)*v, vy:Math.sin(s)*v, umur:0, maks:acak(40,70)});
}
let t0 = 0, berikut = acak(3000,6500);
function gambar(ms){
  g.clearRect(0,0,W,H);
  let t = ms/1000;
  for (let i=0;i<bintang.length;i++){
    let b = bintang[i], k = hemat ? 1 : (0.55 + 0.45*Math.sin(t*b.f + b.p));
    g.globalAlpha = b.a*k; g.fillStyle = b.c;
    g.beginPath(); g.arc(b.x,b.y,b.r,0,6.2832); g.fill();
  }
  g.globalAlpha = 1;
  for (let i=meteor.length-1;i>=0;i--){
    let m = meteor[i];
    m.x += m.vx; m.y += m.vy; m.umur++;
    let a = 1 - m.umur/m.maks;
    if (a <= 0){ meteor.splice(i,1); continue; }
    let gr = g.createLinearGradient(m.x,m.y,m.x-m.vx*7,m.y-m.vy*7);
    gr.addColorStop(0,"rgba(255,255,255,"+a+")"); gr.addColorStop(1,"rgba(160,140,255,0)");
    g.strokeStyle = gr; g.lineWidth = 2; g.beginPath(); g.moveTo(m.x,m.y); g.lineTo(m.x-m.vx*7,m.y-m.vy*7); g.stroke();
  }
  if (!hemat && ms - t0 > berikut){ meteorBaru(); t0 = ms; berikut = acak(4500,9000); }
  if (!hemat) requestAnimationFrame(gambar);
}
susun();
addEventListener("resize", function(){ susun(); if (hemat) gambar(0); });
if (hemat){ gambar(0) } else { requestAnimationFrame(gambar) }

addEventListener("mousemove", function(e){
  if (hemat) return;
  $("foto").style.transform = "translate("+((e.clientX/W-0.5)*-14)+"px,"+((e.clientY/H-0.5)*-14)+"px)";
});
addEventListener("click", function(e){
  if (hemat || e.target.closest("a")) return;
  meteorBaru(e.clientX, e.clientY);
});
</script>
</body>
</html>
