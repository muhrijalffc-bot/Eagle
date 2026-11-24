/* ===== Navigasi & shell ===== */
const JUDUL={dashboard:"Dashboard",transaksi:"Transaksi",laporan:"Laporan",pengaturan:"Pengaturan"};
function toggleSisi(){
 if(window.matchMedia("(max-width:900px)").matches)document.body.classList.toggle("sisiBuka");
 else document.body.classList.toggle("sisiKecil");
}
function menuUser(e){e.stopPropagation();$("menuU").classList.toggle("sembunyi")}
document.addEventListener("click",function(){let m=$("menuU");if(m)m.classList.add("sembunyi")});
function cariGlobal(v){
 if(!sesi)return;
 $("cari").value=v;
 if(tampilan!=="transaksi"&&v.trim()!=="")ganti("transaksi");else render();
}
function ganti(v){
 if(!bisa(v)){toast("Akses ditolak");return}
 tampilan=v;
 document.body.classList.remove("sisiBuka");
 for(let k in JUDUL){$("nav-"+k).classList.toggle("aktif",k===v)}
 $("atas").classList.toggle("sembunyi",v!=="dashboard");
 $("kartuTabel").classList.toggle("sembunyi",v!=="dashboard"&&v!=="transaksi");
 $("halamanLaporan").classList.toggle("sembunyi",v!=="laporan");
 $("halamanPengaturan").classList.toggle("sembunyi",v!=="pengaturan");
 $("periode").classList.toggle("sembunyi",v!=="dashboard");
 $("judulHalaman").innerText=JUDUL[v];
 $("crumb").innerText=JUDUL[v];
 $("judulTabel").innerText=v==="dashboard"?"Transaksi terbaru":"Semua transaksi";
 if(v==="pengaturan")isiFormProfil();
 render();
}
function render(){
 if(!sesi)return;
 renderDashboard();
 if(tampilan==="transaksi")$("subjudul").innerText=dataDilihat().length+" transaksi tercatat";
 if(tampilan==="laporan"){renderLaporan();$("subjudul").innerText="Laporan keuangan basis akrual";}
 if(tampilan==="pengaturan"){renderPengaturan();$("subjudul").innerText="Atur profil, pajak, kategori, dan data";}
}
function filterJ(el){
 jenisAktif=el.dataset.j;
 document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("aktif",c===el));
 render();
}

