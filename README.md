<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#05060f">
<title>Galaksiku ✦ Beranda</title>
<style>
:root{--ungu:#8b7bff;--pink:#f472b6;--biru:#60a5fa;--teks:#eef0ff;--redup:#a9b0d6}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{min-height:100vh;color:var(--teks);font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;
  background:radial-gradient(ellipse at 20% 10%,#17133d 0%,transparent 55%),radial-gradient(ellipse at 85% 90%,#2a0f3a 0%,transparent 55%),linear-gradient(180deg,#04050d,#080b1f 60%,#05060f);
  background-attachment:fixed;overflow-x:hidden}
/* lapisan latar */
.foto{position:fixed;inset:-24px;z-index:0;background:#05060f url("milkyway.jpg") 50% 50%/cover no-repeat;transition:transform .5s ease-out;will-change:transform}
.foto::after{content:"";position:absolute;inset:0;background:
  radial-gradient(ellipse at 50% 42%,rgba(4,5,13,.55),transparent 62%),
  linear-gradient(180deg,rgba(4,5,13,.50) 0%,rgba(4,5,13,.18) 38%,rgba(4,5,13,.30) 70%,rgba(4,5,13,.80) 100%)}
#bintang{position:fixed;inset:0;z-index:1;pointer-events:none}
/* konten */
.isi{position:relative;z-index:2}
.atas{display:flex;justify-content:space-between;align-items:center;padding:20px clamp(18px,5vw,56px)}
.merek{font-weight:700;letter-spacing:.14em;font-size:14px;text-transform:uppercase}
.merek span{color:var(--pink)}
#jam{font-variant-numeric:tabular-nums;color:var(--redup);font-size:14px}
.hero{min-height:78vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:30px 20px}
.salam{color:var(--redup);letter-spacing:.2em;text-transform:uppercase;font-size:13px;margin-bottom:14px}
h1{font-size:clamp(40px,9vw,96px);font-weight:800;line-height:1.05;letter-spacing:-.02em;
  background:linear-gradient(100deg,#fff 10%,#d8ccff 40%,#ffb6e1 70%,#9cc7ff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 22px rgba(160,130,255,.45))}
.sub{max-width:560px;margin:18px auto 30px;color:var(--redup);font-size:clamp(15px,2.2vw,19px);line-height:1.6}
.btn{display:inline-block;padding:13px 28px;border-radius:40px;text-decoration:none;color:#fff;font-weight:600;
  background:linear-gradient(100deg,var(--ungu),var(--pink));box-shadow:0 0 30px rgba(139,123,255,.5);transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 0 44px rgba(244,114,182,.6)}
.turun{margin-top:46px;color:var(--redup);font-size:22px;animation:naik 2s ease-in-out infinite}
@keyframes naik{50%{transform:translateY(8px)}}
section{padding:40px clamp(18px,5vw,56px) 70px;max-width:1100px;margin:0 auto}
h2{font-size:clamp(24px,4vw,34px);text-align:center;margin-bottom:8px}
.ket{text-align:center;color:var(--redup);margin-bottom:34px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.kartu{--w:#8b7bff;position:relative;display:block;text-decoration:none;color:inherit;padding:24px;border-radius:20px;
  background:linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.14);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:transform .25s,box-shadow .25s,border-color .25s;overflow:hidden}
.kartu::before{content:"";position:absolute;width:160px;height:160px;right:-50px;top:-60px;border-radius:50%;
  background:var(--w);opacity:.22;filter:blur(40px);transition:opacity .25s}
.kartu:hover,.kartu:focus-visible{transform:translateY(-8px);border-color:var(--w);box-shadow:0 14px 44px color-mix(in srgb,var(--w) 40%,transparent);outline:none}
.kartu:hover::before{opacity:.45}
.ikon{font-size:34px;width:60px;height:60px;border-radius:16px;display:grid;place-items:center;margin-bottom:16px;
  background:color-mix(in srgb,var(--w) 22%,transparent);border:1px solid color-mix(in srgb,var(--w) 55%,transparent)}
.kartu h3{font-size:20px;margin-bottom:6px}
.kartu p{color:var(--redup);font-size:14.5px;line-height:1.55;margin-bottom:16px}
.buka{font-size:13px;font-weight:600;color:var(--w);filter:brightness(1.4)}
footer{text-align:center;padding:30px 20px 40px;color:var(--redup);font-size:13px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body>
<div class="foto" id="foto" aria-hidden="true"></div>
<canvas id="bintang" aria-hidden="true"></canvas>

<div class="isi">
  <div class="atas">
    <div class="merek">✦ <span id="merek">Galaksiku</span></div>
    <div id="jam"></div>
  </div>

  <div class="hero">
    <div class="salam" id="salam"></div>
    <h1 id="judul">Hi Traveler</h1>
    <p class="sub" id="subjudul"></p>
    <a class="btn" href="#proyek">Jelajahi proyek ✦</a>
    <div class="turun">⌄</div>
  </div>

  <section id="proyek">
    <h2>Rasi Bintang Proyekku</h2>
    <p class="ket">Setiap kartu adalah satu bintang. Klik untuk menjelajah.</p>
    <div class="grid" id="daftar"></div>
  </section>

  <footer>Dibuat dengan HTML, CSS, dan JavaScript · <span id="tahun"></span> ✨</footer>
</div>

<script>
/* ====== UBAH BAGIAN INI UNTUK MENYESUAIKAN ====== */
const NAMA_SITUS = "UNIVERSE";
const JUDUL      = "Welcome";
const SUBJUDUL   = "T";
const HALAMAN = [
  {ikon:"💼", nama:"Kasku",             ket:"Dashboard akuntansi: penjualan, pembelian, laporan, dan hak akses pengguna.", href:"kasku.html",    warna:"#8b7bff"},
  {ikon:"$", nama:"Saving",        ket:"Catat pemasukan dan pengeluaran harian, atur saldo awal, dan kejar target menabung.", href:"saving.html", warna:"#2dd4bf"},
  {ikon:"✅", nama:"To Do List",         ket:"To-do list bergaya pastel dengan daftar, tanggal, dan jam.",                  href:"todolist.html",     warna:"#f472b6"},
  {ikon:"🧪", nama:"My file",ket:"Halaman privasi, untuk menyimpan foto atau video anda dengan privasi.",           href:"neptune.html",  warna:"#60a5fa"}
];
/* ================================================ */

const $ = id => document.getElementById(id);
function aman(t){return String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

/* Teks, salam, jam, dan kartu */
$("merek").innerText = NAMA_SITUS;
$("judul").innerText = JUDUL;
$("subjudul").innerText = SUBJUDUL;
$("tahun").innerText = new Date().getFullYear();
document.title = NAMA_SITUS + " ✦ Beranda";

function salam(jam){
  if (jam >= 4 && jam < 11) return "Selamat pagi, penjelajah";
  if (jam >= 11 && jam < 15) return "Selamat siang, penjelajah";
  if (jam >= 15 && jam < 18) return "Selamat sore, penjelajah";
  return "Selamat malam, penjelajah";
}
function tik(){
  let d = new Date();
  $("salam").innerText = salam(d.getHours());
  $("jam").innerText = d.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"short"}) + " · " + d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(/\./g,":");
}
tik(); setInterval(tik, 1000);

$("daftar").innerHTML = HALAMAN.map(function(h){
  return '<a class="kartu" href="'+aman(h.href)+'" style="--w:'+aman(h.warna)+'">' +
    '<div class="ikon">'+h.ikon+'</div><h3>'+aman(h.nama)+'</h3><p>'+aman(h.ket)+'</p><span class="buka">Buka halaman →</span></a>';
}).join("");

/* ====== Langit Bima Sakti (canvas) ====== */
const cv = $("bintang"), g = cv.getContext("2d");
const hemat = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const WARNA_B = ["#ffffff","#cfe0ff","#ffd9f0","#e0d0ff","#fff1c9"];
let W, H, bintang = [], meteor = [];
const acak = (a,b) => a + Math.random()*(b-a);

function susun(){
  let r = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W*r; cv.height = H*r; cv.style.width = W+"px"; cv.style.height = H+"px";
  g.setTransform(r,0,0,r,0,0);

  bintang = [];
  let n = Math.min(130, Math.floor(W*H/14000));   // bintang berkelip tipis di atas foto
  for (let i=0;i<n;i++) bintang.push({x:acak(0,W),y:acak(0,H),r:acak(.3,1.4),a:acak(.35,1),f:acak(.6,2.4),p:acak(0,6.28),c:WARNA_B[(Math.random()*WARNA_B.length)|0]});
}

function meteorBaru(x,y){
  let s = acak(0.15,0.4)*Math.PI;       // arah turun ke kanan
  let v = acak(9,15);
  meteor.push({x:x!==undefined?x:acak(0,W*0.8), y:y!==undefined?y:acak(0,H*0.4), vx:Math.cos(s)*v, vy:Math.sin(s)*v, umur:0, maks:acak(40,70)});
}

let t0 = 0, berikut = acak(2500,6000);
function gambar(ms){
  g.clearRect(0,0,W,H);
  let t = ms/1000;
  for (let i=0;i<bintang.length;i++){
    let b = bintang[i];
    let k = hemat ? 1 : (0.55 + 0.45*Math.sin(t*b.f + b.p));
    g.globalAlpha = b.a*k;
    g.fillStyle = b.c;
    g.beginPath(); g.arc(b.x,b.y,b.r,0,6.2832); g.fill();
    if (b.r > 1.15){ g.globalAlpha = b.a*k*0.25; g.beginPath(); g.arc(b.x,b.y,b.r*3,0,6.2832); g.fill(); }
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
  if (!hemat && ms - t0 > berikut){ meteorBaru(); t0 = ms; berikut = acak(3500,8000); }
  if (!hemat) requestAnimationFrame(gambar);
}

susun();
addEventListener("resize", function(){ susun(); if (hemat) gambar(0); });
if (hemat){ gambar(0) } else { requestAnimationFrame(gambar) }

/* Interaksi: foto bergeser lembut mengikuti kursor, klik = bintang jatuh */
addEventListener("mousemove", function(e){
  if (hemat) return;
  $("foto").style.transform = "translate("+((e.clientX/W-0.5)*-16)+"px,"+((e.clientY/H-0.5)*-16)+"px)";
});
addEventListener("click", function(e){
  if (hemat || e.target.closest("a")) return;
  meteorBaru(e.clientX, e.clientY);
});
</script>
</body>
</html>
