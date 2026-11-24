/* ===== Form transaksi ===== */
function isiTipe(){
 $("fTipe").innerHTML=GRUP.map(g=>'<optgroup label="'+aman(g[0])+'">'+g[1].map(k=>'<option value="'+k+'">'+aman(TIPE[k].l)+'</option>').join("")+'</optgroup>').join("");
}
function ubahTipe(){
 let k=$("fTipe").value,d=TIPE[k];
 $("rowKat").classList.toggle("sembunyi",!d.kat);
 $("rowAset").classList.toggle("sembunyi",!d.aset);
 if(d.kat){
  let lama=$("fKat").value,lst=daftarKat(d.kat);
  $("lblKat").innerText=d.kat==="P"?"Kategori pendapatan":"Kategori beban";
  $("fKat").innerHTML=lst.map(x=>'<option>'+aman(x)+'</option>').join("");
  if(lst.includes(lama))$("fKat").value=lama;
 }
 let t={kat:d.kat?$("fKat").value:""};
 $("fInfo").innerHTML="<b>Jurnal otomatis:</b><br>Debit: "+aman(akunNama(akunDari(d.dr,t)))+"<br>Kredit: "+aman(akunNama(akunDari(d.kr,t)));
}
$("fKat").addEventListener("change",ubahTipe);
function buka(){
 $("fTgl").value=new Date().toISOString().slice(0,10);$("err").innerText="";
 $("fUmur").value=4;$("fResidu").value=0;
 ubahTipe();dlg.showModal();
}
function tambah(){
 if(!bisa("tambah"))return;
 let tgl=$("fTgl").value,ket=$("fKet").value.trim(),jumlah=Number($("fJumlah").value),tp=$("fTipe").value,d=TIPE[tp];
 if(tgl===""||ket===""||!(jumlah>0)){$("err").innerText="Lengkapi tanggal, keterangan, dan jumlah (lebih dari 0).";return}
 let t={id:Date.now(),tgl:tgl,ket:ket,tipe:tp,jumlah:jumlah,oleh:sesi.uid};
 if(d.kat)t.kat=$("fKat").value;
 if(d.aset){
  let u=Number($("fUmur").value),rs=Number($("fResidu").value)||0;
  if(!(u>=0)){$("err").innerText="Umur manfaat tidak valid (isi 0 jika tidak disusutkan).";return}
  if(rs<0||rs>=jumlah){$("err").innerText="Nilai residu harus lebih kecil dari harga perolehan.";return}
  t.umur=u;t.residu=rs;
 }
 refTrx().doc(String(t.id)).set(t).catch(function(e){toast("Gagal menyimpan transaksi: "+pesanAuth(e))});
 $("fKet").value="";$("fJumlah").value="";dlg.close();toast("Transaksi berhasil ditambahkan ✓");
}
function hapus(id){
 if(!bisa("hapus"))return;
 if(!confirm("Hapus transaksi ini?"))return;
 refTrx().doc(String(id)).delete().then(function(){toast("Transaksi dihapus")}).catch(function(e){toast("Gagal menghapus: "+pesanAuth(e))});
}

