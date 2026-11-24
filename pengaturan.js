/* ===== Data awal / data baru ===== */
function bukaData(){
 $("btnDataAda").classList.toggle("sembunyi",!(dataLokal&&dataLokal.length));
 document.getElementById("dlgData").showModal();
}
async function pilihData(mode){
 document.getElementById("dlgData").close();
 perluPilihData=false;
 try{
  if(mode==="contoh"){await tulisSemua(JSON.parse(JSON.stringify(contoh)))}
  else if(mode==="ada"&&dataLokal&&dataLokal.length){await tulisSemua(JSON.parse(JSON.stringify(dataLokal)))}
  toast(mode==="kosong"?"Data baru (kosong) siap dipakai ✓":mode==="contoh"?"Data contoh dimuat":"Data lama berhasil diunggah ✓");
 }catch(e){toast("Gagal menyimpan data: "+pesanAuth(e))}
}
function bukaBaru(){
 if(!bisa("pengaturan"))return;
 $("baruKonfirm").value="";$("errBaru").innerText="";
 $("baruCadangan").checked=data.length>0;
 document.getElementById("dlgBaru").showModal();
}
async function jalankanBaru(){
 if(!bisa("pengaturan"))return;
 if($("baruKonfirm").value.trim().toUpperCase()!=="BARU"){$("errBaru").innerText='Ketik "BARU" untuk melanjutkan.';return}
 if($("baruCadangan").checked&&data.length>0){ekspor()}
 try{
  await hapusSemua();
  document.getElementById("dlgBaru").close();
  toast("Data baru siap dipakai ✓");
 }catch(e){$("errBaru").innerText="Gagal menghapus: "+pesanAuth(e)}
}

/* ===== Kelola pengguna ===== */
function jumlahPemilik(){return users.filter(u=>u.role==="pemilik").length}
function renderUser(){
 if(!bisa("pengguna")){$("daftarUser").innerHTML="";return}
 $("daftarUser").innerHTML=users.map(u=>'<tr><td><b>'+aman(u.nama)+'</b><small style="display:block;color:var(--abu)">'+aman(u.email||"")+(u.id===sesi.uid?" (kamu)":"")+'</small></td>'+
  '<td><select class="btn" onchange="ubahPeran(\''+u.id+'\',this.value)">'+Object.keys(LABEL).map(r=>'<option value="'+r+'"'+(u.role===r?" selected":"")+">"+LABEL[r]+"</option>").join("")+"</select></td>"+
  '<td class="num"><button class="btn" onclick="resetPwUser(\''+u.id+'\')">🔑 Reset password</button> <button class="btn" style="color:var(--merah)" onclick="hapusUser(\''+u.id+'\')">Hapus</button></td></tr>').join("");
}
async function tambahUser(){
 if(!bisa("pengguna"))return;
 let err=$("errUser");err.innerText="";
 let nama=$("uNama").value.trim(),email=$("uUser").value.trim().toLowerCase(),pw=$("uPass").value,role=$("uPeran").value;
 if(nama===""){err.innerText="Isi nama lengkap.";return}
 if(!/^\S+@\S+\.\S+$/.test(email)){err.innerText="Isi email yang valid.";return}
 if(pw.length<6){err.innerText="Password minimal 6 karakter.";return}
 if(users.some(x=>x.email===email)){err.innerText="Email sudah dipakai pengguna lain.";return}
 let app2=firebase.apps.find(a=>a.name==="sekunder")||firebase.initializeApp(firebaseConfig,"sekunder");
 let a2=app2.auth(),cred=null;
 try{
  cred=await a2.createUserWithEmailAndPassword(email,pw);
  await db.collection("users").doc(cred.user.uid).set({nama:nama,email:email,role:role,bisnis:sesi.bisnis});
  $("uNama").value="";$("uUser").value="";$("uPass").value="";
  toast("Pengguna ditambahkan ✓");
 }catch(e){
  if(cred){try{await cred.user.delete()}catch(x){}}
  err.innerText=e&&e.code==="auth/email-already-in-use"?"Email ini sudah terdaftar di Firebase. Pakai email lain, atau hapus akun lamanya di Firebase Console → Authentication.":pesanAuth(e);
 }finally{try{await a2.signOut()}catch(x){}}
}
function ubahPeran(id,role){
 if(!bisa("pengguna"))return;
 let u=users.find(x=>x.id===id);if(!u)return;
 if(u.role==="pemilik"&&role!=="pemilik"&&jumlahPemilik()<=1){toast("Harus ada minimal 1 Pemilik");renderUser();return}
 db.collection("users").doc(id).update({role:role}).then(function(){toast("Peran diperbarui")}).catch(function(e){toast(pesanAuth(e));renderUser()});
}
function hapusUser(id){
 if(!bisa("pengguna"))return;
 let u=users.find(x=>x.id===id);if(!u)return;
 if(id===sesi.uid){toast("Akun yang sedang dipakai tidak bisa dihapus");return}
 if(u.role==="pemilik"&&jumlahPemilik()<=1){toast("Harus ada minimal 1 Pemilik");return}
 if(!confirm("Cabut akses "+u.nama+"? Orang ini tidak bisa lagi masuk ke Kasku."))return;
 db.collection("users").doc(id).delete().then(function(){toast("Akses pengguna dicabut")}).catch(function(e){toast(pesanAuth(e))});
}
function resetPwUser(id){
 if(!bisa("pengguna"))return;
 let u=users.find(x=>x.id===id);if(!u||!u.email)return;
 auth.sendPasswordResetEmail(u.email).then(function(){toast("Email reset password dikirim ke "+u.email)}).catch(function(e){toast(pesanAuth(e))});
}

/* ===== Profil, pajak, kategori ===== */
function terapkanProfil(){
 $("namaUsaha").innerText=p.usaha;
 document.title=p.usaha+" — Dashboard Akuntansi";
 if(sesi){
  $("namaPengguna").innerText=sesi.nama;
  $("peranPengguna").innerText=LABEL[sesi.role];
  $("avatar").innerText=(sesi.nama||"?").charAt(0).toUpperCase();
 }
}
function isiFormProfil(){
 $("sUsaha").value=p.usaha;$("sCatatan").value=p.catatan||"";
 $("sTarif").value=p.pajakTarif;$("sDasar").value=p.pajakDasar;
}
function simpanProfil(){
 if(!bisa("pengaturan"))return;
 p.usaha=$("sUsaha").value.trim()||"Kasku";
 p.catatan=$("sCatatan").value.trim();
 simpanP();terapkanProfil();toast("Profil disimpan ✓");
}
function simpanPajak(){
 if(!bisa("pengaturan"))return;
 let t=Number($("sTarif").value);
 if(!(t>=0)||t>100){toast("Tarif harus antara 0 dan 100");return}
 p.pajakTarif=t;p.pajakDasar=$("sDasar").value;
 simpanP();toast("Pengaturan pajak disimpan ✓");
}
function daftarKat(j){return j==="P"?p.katPend:p.katBeban}
function tambahKat(j){
 if(!bisa("pengaturan"))return;
 let el=$(j==="P"?"katBaruP":"katBaruB"),k=el.value.replace(/[,;]/g," ").trim();
 if(k==="")return;
 if(daftarKat(j).some(x=>x.toLowerCase()===k.toLowerCase())){toast("Kategori sudah ada");return}
 daftarKat(j).push(k);simpanP();el.value="";renderPengaturan();
}
function hapusKat(j,i){
 if(!bisa("pengaturan"))return;
 let lst=daftarKat(j),k=lst[i];
 if(data.some(d=>d.kat===k&&TIPE[d.tipe]&&TIPE[d.tipe].kat===j)){toast("Kategori masih dipakai transaksi");return}
 if(lst.length<=1){toast("Minimal harus ada 1 kategori");return}
 lst.splice(i,1);simpanP();renderPengaturan();
}
function renderPengaturan(){
 renderUser();
 $("daftarKatP").innerHTML=p.katPend.map((k,i)=>'<span class="tag">'+aman(k)+' <button class="x" onclick="hapusKat(\'P\','+i+')" title="Hapus">✕</button></span>').join("");
 $("daftarKatB").innerHTML=p.katBeban.map((k,i)=>'<span class="tag">'+aman(k)+' <button class="x" onclick="hapusKat(\'B\','+i+')" title="Hapus">✕</button></span>').join("");
 $("infoData").innerText=data.length+" transaksi tersimpan di Firebase dan sinkron ke semua perangkat.";
}

/* ===== Impor / ekspor / reset ===== */
function urai(t){
 let baris=[],b=[],s="",q=false;
 for(let i=0;i<t.length;i++){
  let c=t[i];
  if(q){if(c==='"'){if(t[i+1]==='"'){s+='"';i++}else{q=false}}else{s+=c}}
  else if(c==='"'){q=true}
  else if(c===","||c===";"){b.push(s);s=""}
  else if(c==="\n"||c==="\r"){
   if(c==="\r"&&t[i+1]==="\n")i++;
   b.push(s);s="";
   if(b.some(x=>x.trim()!==""))baris.push(b);
   b=[];
  }else{s+=c}
 }
 b.push(s);if(b.some(x=>x.trim()!==""))baris.push(b);
 return baris;
}
function normTgl(x){
 x=(x||"").trim();
 if(/^\d{4}-\d{2}-\d{2}$/.test(x))return x;
 let m=x.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
 return m?m[3]+"-"+m[2].padStart(2,"0")+"-"+m[1].padStart(2,"0"):"";
}
function normJenis(x){
 x=(x||"").trim().toLowerCase();
 if(["masuk","pemasukan","income","in","debit"].includes(x))return "masuk";
 if(["keluar","pengeluaran","expense","out","kredit"].includes(x))return "keluar";
 return "";
}
function normTipe(x){
 x=(x||"").trim().toLowerCase();
 if(TIPE[x])return x;
 for(let k in TIPE){if(TIPE[k].l.toLowerCase()===x)return k}
 return "";
}
function parseJml(x){let m=String(x||"").trim();return /^\d+(\.\d+)?$/.test(m)?Number(m):Number(m.replace(/[^0-9]/g,""))}
function pastikanKat(j,kat){
 let lst=daftarKat(j),ada=lst.find(x=>x.toLowerCase()===kat.toLowerCase());
 if(ada)return ada;lst.push(kat);return kat;
}
function impor(el){
 if(!bisa("pengaturan"))return;
 let f=el.files[0];if(!f)return;
 let r=new FileReader();
 r.onload=async function(){
  let rows=urai(String(r.result).replace(/^﻿/,""));
  if(rows.length&&/tanggal|date/i.test(rows[0][0]))rows.shift();
  let ok=0,lewat=0,baru=[];
  rows.forEach(function(c,i){
   let tgl=normTgl(c[0]);if(tgl===""){lewat++;return}
   let ket=(c[1]||"").trim()||"(tanpa keterangan)",jl=normJenis(c[3]),t;
   if(jl!==""){
    let jml=parseJml(c[4]),kat=(c[2]||"").trim()||"Lainnya";
    if(!(jml>0)){lewat++;return}
    t=konversi({id:Date.now()+i,tgl:tgl,ket:ket,kat:kat,jenis:jl,jumlah:jml},KELAS_LAMA);
    if(t.tipe==="jual_tunai")t.kat=pastikanKat("P",t.kat||"Penjualan");
    else if(t.tipe==="beban_tunai")t.kat=pastikanKat("B",t.kat||"Lainnya");
   }else{
    let tp=normTipe(c[2]),jml=parseJml(c[4]);
    if(tp===""||!(jml>0)){lewat++;return}
    t={id:Date.now()+i,tgl:tgl,ket:ket,tipe:tp,jumlah:jml};
    let d=TIPE[tp];
    if(d.kat)t.kat=pastikanKat(d.kat,(c[3]||"").trim()||(d.kat==="P"?"Penjualan":"Lainnya"));
    if(d.aset){let u=Number(c[5]);t.umur=u>=0&&String(c[5]||"").trim()!==""?u:4;t.residu=Math.max(0,Number(c[6])||0)}
   }
   baru.push(t);ok++;
  });
  try{
   await tulisSemua(baru);
   simpanP();
   toast(ok+" baris diimpor"+(lewat?", "+lewat+" dilewati":""));
  }catch(e){toast("Gagal impor: "+pesanAuth(e))}
  el.value="";
 };
 r.readAsText(f);
}
async function resetContoh(){
 if(!bisa("pengaturan"))return;
 if(!confirm("Ganti semua data dengan data contoh?"))return;
 try{
  await hapusSemua();
  await tulisSemua(JSON.parse(JSON.stringify(contoh)));
  ["Penjualan","Pendapatan Jasa","Pendapatan Lain-lain"].forEach(k=>pastikanKat("P",k));
  ["Gaji","Sewa","Listrik & Air","Pemasaran"].forEach(k=>pastikanKat("B",k));
  simpanP();
  toast("Data contoh dikembalikan");
 }catch(e){toast("Gagal: "+pesanAuth(e))}
}
function ekspor(){
 if(!bisa("ekspor"))return;
 function q(x){return '"'+String(x).replace(/"/g,'""')+'"'}
 let baris=["tanggal,keterangan,tipe,kategori,jumlah,umur_tahun,residu"].concat(data.map(d=>[d.tgl,q(d.ket),d.tipe,q(d.kat||""),d.jumlah,d.umur!==undefined?d.umur:"",d.residu!==undefined?d.residu:""].join(",")));
 let a=document.createElement("a");
 a.href=URL.createObjectURL(new Blob([baris.join("\n")],{type:"text/csv"}));
 a.download="transaksi.csv";a.click();toast("File CSV diunduh");
}

