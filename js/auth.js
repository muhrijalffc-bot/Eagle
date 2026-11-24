/* ===== Login (Firebase Authentication) & hak akses ===== */
const LABEL={pemilik:"Pemilik",akuntan:"Akuntan",kasir:"Kasir"};
const IZIN={
 pemilik:["dashboard","transaksi","laporan","pengaturan","tambah","hapus","ekspor","pengguna"],
 akuntan:["dashboard","transaksi","laporan","tambah","hapus","ekspor"],
 kasir:["transaksi","tambah"]
};
let users=[],sesi=null,modeLogin="login",gagal=0,kunciSampai=0,sedangDaftar=false,perluPilihData=false,unsub=[];
function bisa(x){return !!sesi&&IZIN[sesi.role].includes(x)}
function dataDilihat(){return data}

function pesanAuth(e){
 let m={
  "auth/invalid-email":"Format email tidak valid.",
  "auth/user-not-found":"Email atau password salah.",
  "auth/wrong-password":"Email atau password salah.",
  "auth/invalid-credential":"Email atau password salah.",
  "auth/invalid-login-credentials":"Email atau password salah.",
  "auth/email-already-in-use":"Email ini sudah terdaftar.",
  "auth/weak-password":"Password terlalu lemah (minimal 6 karakter).",
  "auth/too-many-requests":"Terlalu banyak percobaan. Coba lagi beberapa menit lagi.",
  "auth/network-request-failed":"Tidak ada koneksi internet.",
  "auth/operation-not-allowed":"Metode Email/Password belum diaktifkan di Firebase Authentication.",
  "permission-denied":"Akses ditolak oleh aturan keamanan Firestore. Pastikan Rules sudah dipublikasikan."
 };
 return m[e&&e.code]||("Terjadi kesalahan: "+((e&&(e.code||e.message))||e));
}
function pesanLogin(t,ok){let e=$("lgErr");e.innerText=t||"";e.style.color=ok?"var(--hijau)":"var(--merah)"}
function tampilLogin(mode){
 modeLogin=mode;
 $("login").classList.remove("sembunyi");
 $("kotakLogin").classList.remove("sembunyi");
 document.body.classList.add("terkunci");
 let setup=mode==="setup";
 $("lgJudul").innerText=setup?"Buat akun Pemilik":p.usaha;
 $("lgSub").innerText=setup?"Daftar sebagai Pemilik dengan akses penuh. Kasir dan akuntan ditambahkan nanti dari Pengaturan.":"Masuk untuk melanjutkan";
 $("lgSetup").classList.toggle("sembunyi",!setup);
 $("lgUlang").classList.toggle("sembunyi",!setup);
 $("lgTombol").innerText=setup?"Buat akun & masuk":"Masuk";
 $("lgLupa").classList.toggle("sembunyi",setup);
 $("lgGanti").innerText=setup?"Sudah punya akun? Masuk":"Belum punya akun? Daftar sebagai Pemilik";
 $("lgPass").autocomplete=setup?"new-password":"current-password";
 pesanLogin("");
 $("lgPass").value="";$("lgPass2").value="";
}
function gantiModeLogin(){tampilLogin(modeLogin==="setup"?"login":"setup")}
function lihatPw(t){$("lgPass").type=t?"text":"password";$("lgPass2").type=t?"text":"password"}
async function kirimLogin(){
 pesanLogin("");
 let email=$("lgUser").value.trim().toLowerCase(),pw=$("lgPass").value;
 if(!/^\S+@\S+\.\S+$/.test(email)){pesanLogin("Masukkan email yang valid.");return}
 if(modeLogin==="setup"){
  let nama=$("lgNama").value.trim();
  if(nama===""){pesanLogin("Isi nama lengkap.");return}
  if(pw.length<6){pesanLogin("Password minimal 6 karakter.");return}
  if(pw!==$("lgPass2").value){pesanLogin("Konfirmasi password tidak sama.");return}
  $("lgTombol").disabled=true;
  sedangDaftar=true;
  try{
   let cred=await auth.createUserWithEmailAndPassword(email,pw);
   try{
    let uid=cred.user.uid;
    await db.collection("users").doc(uid).set({nama:nama,email:email,role:"pemilik",bisnis:uid});
    await db.collection("bisnis").doc(uid).set(p);
   }catch(e2){
    try{await cred.user.delete()}catch(x){}
    throw e2;
   }
   sedangDaftar=false;
   perluPilihData=true;
   await bukaSesi(cred.user,true);
  }catch(e){
   sedangDaftar=false;
   pesanLogin(pesanAuth(e));
  }finally{$("lgTombol").disabled=false}
  return;
 }
 if(Date.now()<kunciSampai){pesanLogin("Terlalu banyak percobaan. Coba lagi dalam "+Math.ceil((kunciSampai-Date.now())/1000)+" detik.");return}
 $("lgTombol").disabled=true;
 try{await auth.signInWithEmailAndPassword(email,pw)}
 catch(e){gagal++;if(gagal>=5){kunciSampai=Date.now()+30000;gagal=0}pesanLogin(pesanAuth(e))}
 finally{$("lgTombol").disabled=false}
}
async function kirimReset(){
 let email=$("lgUser").value.trim().toLowerCase();
 if(!/^\S+@\S+\.\S+$/.test(email)){pesanLogin("Isi emailmu di kolom Email dulu, lalu klik Lupa password.");return}
 try{
  await auth.sendPasswordResetEmail(email);
  pesanLogin("Jika email terdaftar, tautan reset password sudah dikirim. Cek kotak masuk dan folder spam.",true);
 }catch(e){pesanLogin(pesanAuth(e))}
}
async function bukaSesi(u,baru){
 try{
  let s=await db.collection("users").doc(u.uid).get();
  if(!s.exists){
   await auth.signOut();
   tampilLogin("login");
   pesanLogin("Akun ini belum terdaftar di Kasku atau aksesnya sudah dicabut pemilik.");
   return;
  }
  let d=s.data();
  sesi={id:u.uid,uid:u.uid,email:u.email||d.email,nama:d.nama,role:d.role,bisnis:d.bisnis};
 }catch(e){
  tampilLogin("login");
  pesanLogin(pesanAuth(e));
  return;
 }
 $("login").classList.add("sembunyi");
 document.body.classList.remove("terkunci");
 $("lgUser").value="";$("lgPass").value="";
 terapkanProfil();terapkanHak();
 mulaiSinkron();
 ganti(bisa("dashboard")?"dashboard":"transaksi");
 if(baru&&sesi.role==="pemilik"&&perluPilihData)bukaData();
}
function keluar(){if(auth)auth.signOut()}
function terapkanHak(){
 for(let k in JUDUL){$("nav-"+k).classList.toggle("sembunyi",!bisa(k))}
 $("btnEkspor").classList.toggle("sembunyi",!bisa("ekspor"));
 $("btnTambah").classList.toggle("sembunyi",!bisa("tambah"));
}

/* ===== Sinkronisasi realtime ===== */
function galatSinkron(e){console.error(e);toast("Sinkronisasi gagal: "+pesanAuth(e))}
function hentikanSinkron(){unsub.forEach(function(f){try{f()}catch(e){}});unsub=[]}
function mulaiSinkron(){
 hentikanSinkron();
 let ref=refBisnis();
 /* perubahan peran/nama akun sendiri */
 unsub.push(db.collection("users").doc(sesi.uid).onSnapshot(function(s){
  if(!sesi)return;
  if(!s.exists){toast("Akses akunmu sudah dicabut");auth.signOut();return}
  let d=s.data(),ubahPeranSendiri=d.role!==sesi.role;
  sesi.nama=d.nama;sesi.role=d.role;
  terapkanProfil();terapkanHak();
  if(ubahPeranSendiri){
   mulaiSinkron();
   ganti(bisa(tampilan)?tampilan:(bisa("dashboard")?"dashboard":"transaksi"));
  }
 },galatSinkron));
 /* profil usaha, pajak, kategori */
 unsub.push(ref.onSnapshot(function(s){
  p=Object.assign(JSON.parse(JSON.stringify(PDEF)),s.exists?s.data():{});
  terapkanProfil();render();
 },galatSinkron));
 /* transaksi (kasir hanya melihat miliknya sendiri) */
 let q=ref.collection("transaksi");
 if(sesi.role==="kasir")q=q.where("oleh","==",sesi.uid);
 unsub.push(q.onSnapshot(function(s){
  data=s.docs.map(function(d){return Object.assign({id:d.id},d.data())});
  data.forEach(function(t){if(!isNaN(Number(t.id)))t.id=Number(t.id)});
  render();
 },galatSinkron));
 /* daftar pengguna (hanya pemilik) */
 if(sesi.role==="pemilik"){
  unsub.push(db.collection("users").where("bisnis","==",sesi.bisnis).onSnapshot(function(s){
   users=s.docs.map(function(d){return Object.assign({id:d.id},d.data())}).sort((a,b)=>String(a.nama).localeCompare(String(b.nama)));
   if(tampilan==="pengaturan")renderUser();
  },galatSinkron));
 }
}
