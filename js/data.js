/* ===== Jenis transaksi -> jurnal otomatis =====
   dr / kr = akun debit / kredit. "P" = akun pendapatan (kategori), "B" = akun beban (kategori). */
const TIPE={
 jual_tunai:{l:"Penjualan tunai",a:"masuk",ik:"🛍️",dr:"kas",kr:"P",kat:"P"},
 jual_kredit:{l:"Penjualan kredit (piutang)",a:"nonkas",ik:"🧾",dr:"piutang",kr:"P",kat:"P"},
 terima_piutang:{l:"Terima pelunasan piutang",a:"masuk",ik:"📥",dr:"kas",kr:"piutang"},
 beli_persediaan_tunai:{l:"Beli persediaan (tunai)",a:"keluar",ik:"📦",dr:"persediaan",kr:"kas"},
 beli_persediaan_kredit:{l:"Beli persediaan (kredit)",a:"nonkas",ik:"📦",dr:"persediaan",kr:"utang_usaha"},
 bayar_utang:{l:"Bayar utang usaha",a:"keluar",ik:"📤",dr:"utang_usaha",kr:"kas"},
 hpp:{l:"Harga pokok penjualan (pakai persediaan)",a:"nonkas",ik:"🏷️",dr:"hpp",kr:"persediaan"},
 beban_tunai:{l:"Beban (dibayar tunai)",a:"keluar",ik:"💸",dr:"B",kr:"kas",kat:"B"},
 beban_kredit:{l:"Beban (belum dibayar)",a:"nonkas",ik:"🧮",dr:"B",kr:"utang_usaha",kat:"B"},
 beban_dimuka:{l:"Bayar beban di muka",a:"keluar",ik:"🗓️",dr:"dimuka",kr:"kas"},
 amortisasi_dimuka:{l:"Akui beban dibayar di muka",a:"nonkas",ik:"⏳",dr:"B",kr:"dimuka",kat:"B"},
 bunga:{l:"Bayar bunga pinjaman",a:"keluar",ik:"🏦",dr:"bunga",kr:"kas"},
 bayar_pajak:{l:"Setor pajak penghasilan",a:"keluar",ik:"🏛️",dr:"utang_pajak",kr:"kas"},
 beli_aset:{l:"Beli aset tetap (tunai)",a:"keluar",ik:"🏗️",dr:"aset",kr:"kas",aset:1},
 setor_modal:{l:"Setoran modal pemilik",a:"masuk",ik:"💼",dr:"kas",kr:"modal"},
 prive:{l:"Prive (penarikan pemilik)",a:"keluar",ik:"🙋",dr:"prive",kr:"kas"},
 pinjam_pendek:{l:"Terima pinjaman jangka pendek",a:"masuk",ik:"🤝",dr:"kas",kr:"utang_bank_pendek"},
 bayar_pinjam_pendek:{l:"Bayar pokok pinjaman jangka pendek",a:"keluar",ik:"🤝",dr:"utang_bank_pendek",kr:"kas"},
 pinjam_panjang:{l:"Terima pinjaman jangka panjang",a:"masuk",ik:"🤝",dr:"kas",kr:"utang_bank_panjang"},
 bayar_pinjam_panjang:{l:"Bayar pokok pinjaman jangka panjang",a:"keluar",ik:"🤝",dr:"utang_bank_panjang",kr:"kas"}
};
const GRUP=[
 ["Penjualan & pendapatan",["jual_tunai","jual_kredit","terima_piutang"]],
 ["Persediaan & utang usaha",["beli_persediaan_tunai","beli_persediaan_kredit","bayar_utang","hpp"]],
 ["Beban",["beban_tunai","beban_kredit","beban_dimuka","amortisasi_dimuka","bunga"]],
 ["Aset tetap",["beli_aset"]],
 ["Modal & pinjaman",["setor_modal","prive","pinjam_pendek","bayar_pinjam_pendek","pinjam_panjang","bayar_pinjam_panjang"]],
 ["Pajak",["bayar_pajak"]]];
const AKUN_NAMA={kas:"Kas",piutang:"Piutang usaha",persediaan:"Persediaan",dimuka:"Beban dibayar di muka",aset:"Aset tetap (harga perolehan)",akum:"Akumulasi penyusutan",
 utang_usaha:"Utang usaha & beban masih harus dibayar",utang_pajak:"Utang pajak penghasilan",utang_bank_pendek:"Utang bank jangka pendek",utang_bank_panjang:"Utang bank jangka panjang",
 modal:"Modal pemilik",prive:"Prive",hpp:"Beban pokok penjualan",penyusutan:"Beban penyusutan",bunga:"Beban bunga",pajak:"Beban pajak penghasilan"};
function akunNama(a){if(a.indexOf("P:")===0)return "Pendapatan – "+a.slice(2);if(a.indexOf("B:")===0)return "Beban – "+a.slice(2);return AKUN_NAMA[a]||a}
function akunDari(k,t){return (k==="P"||k==="B")?k+":"+(t.kat||"Lainnya"):k}

function buatContoh(){
 let a=[],id=1;
 function t(tgl,ket,tipe,jumlah,kat,x){a.push(Object.assign({id:id++,tgl:tgl,ket:ket,tipe:tipe,jumlah:jumlah},kat?{kat:kat}:{},x||{}))}
 t("2026-05-01","Setoran modal awal","setor_modal",50000000);
 t("2026-05-02","Peralatan usaha","beli_aset",8000000,null,{umur:4,residu:0});
 t("2026-05-03","Stok barang dagang awal","beli_persediaan_tunai",20000000);
 t("2026-05-05","Penjualan produk A","jual_tunai",12500000,"Penjualan");
 t("2026-05-10","Sewa toko 12 bulan (Mei–April)","beban_dimuka",12000000);
 t("2026-05-31","HPP bulan Mei","hpp",7500000);
 t("2026-06-01","Pinjaman bank 3 tahun","pinjam_panjang",10000000);
 t("2026-06-05","Penjualan produk B – Toko Maju","jual_kredit",15200000,"Penjualan");
 t("2026-06-12","Gaji karyawan","beban_tunai",6500000,"Gaji");
 t("2026-06-20","Stok dari Supplier X","beli_persediaan_kredit",9000000);
 t("2026-06-30","HPP bulan Juni","hpp",9100000);
 t("2026-07-02","Penjualan online","jual_tunai",11800000,"Penjualan");
 t("2026-07-08","Pelunasan Toko Maju","terima_piutang",15200000);
 t("2026-07-15","Bayar Supplier X","bayar_utang",9000000);
 t("2026-07-20","Bunga pinjaman bank","bunga",150000);
 t("2026-07-31","HPP bulan Juli","hpp",7000000);
 t("2026-08-02","Restok barang dagang","beli_persediaan_tunai",15000000);
 t("2026-08-04","Penjualan grosir – CV Berkah","jual_kredit",18900000,"Penjualan");
 t("2026-08-20","Iklan media sosial","beban_tunai",1500000,"Pemasaran");
 t("2026-08-31","HPP bulan Agustus","hpp",11300000);
 t("2026-09-06","Penjualan produk A","jual_tunai",14300000,"Penjualan");
 t("2026-09-10","Setor PPh final Mei–Agustus","bayar_pajak",292000);
 t("2026-09-15","Pelunasan sebagian CV Berkah","terima_piutang",10000000);
 t("2026-09-18","Listrik dan air","beban_tunai",950000,"Listrik & Air");
 t("2026-09-25","Angsuran pokok pinjaman","bayar_pinjam_panjang",2000000);
 t("2026-09-30","Prive pemilik","prive",1000000);
 t("2026-09-30","HPP bulan September","hpp",8600000);
 t("2026-10-01","Penjualan harian","jual_tunai",5400000,"Penjualan");
 t("2026-10-02","Gaji karyawan","beban_tunai",6500000,"Gaji");
 t("2026-10-05","Restok barang dagang","beli_persediaan_tunai",10000000);
 t("2026-10-15","Tagihan listrik Oktober (belum dibayar)","beban_kredit",800000,"Listrik & Air");
 ["05","06","07","08","09","10"].forEach(function(m){t("2026-"+m+"-28","Pengakuan sewa dibayar di muka","amortisasi_dimuka",1000000,"Sewa")});
 return a;
}
const contoh=buatContoh();

const PDEF={v:2,usaha:"Kasku",catatan:"",pajakTarif:0.5,pajakDasar:"pendapatan",
 katPend:["Penjualan","Pendapatan Jasa","Pendapatan Lain-lain"],
 katBeban:["Gaji","Sewa","Listrik & Air","Pemasaran","Perlengkapan","Transportasi","Lainnya"]};
const KELAS_LAMA={"Modal Pemilik":"ekuitas","Aset Tetap":"aset","Pinjaman":"utang"};

/* ===== Data lama di browser (hanya dibaca untuk diunggah ke Firebase) ===== */
function konversi(t,kelas){
 if(t.tipe)return t;
 let k=kelas[t.kat]||"operasi",m=t.jenis==="masuk",n=Object.assign({},t);
 delete n.jenis;
 if(k==="ekuitas"){n.tipe=m?"setor_modal":"prive";delete n.kat}
 else if(k==="aset"){if(m){n.tipe="jual_tunai";n.kat="Pendapatan Lain-lain"}else{n.tipe="beli_aset";n.umur=4;n.residu=0;delete n.kat}}
 else if(k==="utang"){n.tipe=m?"pinjam_panjang":"bayar_pinjam_panjang";delete n.kat}
 else n.tipe=m?"jual_tunai":"beban_tunai";
 n.migrasi=true;
 return n;
}
let data=[],p=null,dataLokal=null;
(function muatAwal(){
 let rawP=null,rawD=null;
 try{let x=localStorage.getItem(KUNCI_P);if(x)rawP=JSON.parse(x)}catch(e){}
 try{let x=localStorage.getItem(KUNCI);if(x)rawD=JSON.parse(x)}catch(e){}
 let np=JSON.parse(JSON.stringify(PDEF));
 let kelas=Object.assign({},KELAS_LAMA,(rawP&&rawP.kelas)||{});
 if(rawP&&rawP.v===2){np=Object.assign(np,rawP)}
 else{
  if(rawP){["usaha","catatan"].forEach(function(k){if(rawP[k]!==undefined)np[k]=rawP[k]})}
  let pend=new Set(PDEF.katPend),beb=new Set(PDEF.katBeban);
  ((rawP&&rawP.kategori)||[]).forEach(function(k){if((kelas[k]||"operasi")==="operasi"&&!pend.has(k)&&!beb.has(k))beb.add(k)});
  (rawD||[]).forEach(function(t){if(t.tipe)return;if((kelas[t.kat]||"operasi")!=="operasi")return;if(t.jenis==="masuk")pend.add(t.kat);else beb.add(t.kat)});
  np.katPend=Array.from(pend);np.katBeban=Array.from(beb);
 }
 delete np.kelas;
 p=np;
 if(rawD!==null){dataLokal=rawD.map(function(t){return konversi(t,kelas)})}
})();
let tampilan="dashboard",jenisAktif="semua";
const $=id=>document.getElementById(id);
const dlg=$("dlg");
function rp(n){return "Rp "+Math.abs(Math.round(n)).toLocaleString("id-ID")}
function nrp(n){return (Math.round(n)<0?"-":"")+rp(n)}
function ang(n){n=Math.round(n);if(n===0)return "-";let s=Math.abs(n).toLocaleString("id-ID");return n<0?"("+s+")":s}
function singkat(n){return n>=1e6?(n/1e6).toFixed(n>=1e7?0:1)+" jt":n>=1e3?Math.round(n/1e3)+" rb":String(n)}
function aman(t){return String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function kb(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")}
function geser(b,n){let q=b.split("-").map(Number);return kb(new Date(q[0],q[1]-1+n,1))}
function selisih(b1,b2){let x=b1.split("-").map(Number),y=b2.split("-").map(Number);return (y[0]-x[0])*12+y[1]-x[1]}
function akhirBulan(b){let q=b.split("-").map(Number),d=new Date(q[0],q[1],0);return b+"-"+String(d.getDate()).padStart(2,"0")}
function namaBulan(b){return new Date(b+"-01T00:00:00").toLocaleDateString("id-ID",{month:"long",year:"numeric"})}
function bPendek(b){return new Date(b+"-01T00:00:00").toLocaleDateString("id-ID",{month:"short",year:"numeric"})}
function tglPanjang(s){return new Date(s+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}
function tglPendek(s){return new Date(s+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}
function rentang(b1,b2){return b1===b2?bPendek(b1):bPendek(b1)+" – "+bPendek(b2)}
function jumlahSum(o){return Object.keys(o).reduce((a,k)=>a+o[k],0)}
function toast(t){let e=$("toast");e.innerText=t;e.classList.add("tampil");setTimeout(()=>e.classList.remove("tampil"),2600)}

