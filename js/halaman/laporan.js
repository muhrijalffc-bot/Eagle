/* ===== Laporan keuangan ===== */
function tabel2(rows,K,Kb,hd){
 let kol=Kb?3:2;
 let h='<table><thead><tr><th>Keterangan</th><th class="num">'+hd[0]+'</th>'+(Kb?'<th class="num">'+hd[1]+'</th>':'')+'</tr></thead><tbody>';
 rows.forEach(function(r){
  if(r.g){h+='<tr class="grup"><td colspan="'+kol+'">'+r.g+'</td></tr>';return}
  if(r.h){h+='<tr class="sub"><td colspan="'+kol+'">'+r.h+'</td></tr>';return}
  let a=r.f(K),b=Kb?r.f(Kb):0;
  h+='<tr class="'+(r.c||"")+'"><td'+(r.s?' style="padding-left:'+(r.s*20+8)+'px"':'')+'>'+r.l+'</td><td class="num">'+ang(a)+'</td>'+(Kb?'<td class="num">'+ang(b)+'</td>':'')+'</tr>';
 });
 return h+'</tbody></table>';
}
function unionKey(a,b){let s={};Object.keys(a||{}).forEach(k=>s[k]=1);Object.keys(b||{}).forEach(k=>s[k]=1);return Object.keys(s)}

function lapNeraca(K,Kb,hd){
 let rows=[
  {g:"ASET"},{h:"Aset lancar"},
  {l:"Kas",s:1,f:k=>k.akhir.kas},
  {l:"Piutang usaha",s:1,f:k=>k.akhir.piutang},
  {l:"Persediaan",s:1,f:k=>k.akhir.persediaan},
  {l:"Beban dibayar di muka",s:1,f:k=>k.akhir.dimuka},
  {l:"Total aset lancar",c:"tot",f:k=>k.akhir.kas+k.akhir.piutang+k.akhir.persediaan+k.akhir.dimuka},
  {h:"Aset tidak lancar"},
  {l:"Aset tetap, harga perolehan",s:1,f:k=>k.akhir.aset},
  {l:"Akumulasi penyusutan",s:1,f:k=>-k.akhir.akum},
  {l:"Total aset tidak lancar (aset tetap, neto)",c:"tot",f:k=>k.akhir.aset-k.akhir.akum},
  {l:"TOTAL ASET",c:"akhir",f:k=>k.akhir.kas+k.akhir.piutang+k.akhir.persediaan+k.akhir.dimuka+k.akhir.aset-k.akhir.akum},
  {g:"LIABILITAS DAN EKUITAS"},{h:"Liabilitas jangka pendek"},
  {l:"Utang usaha & beban masih harus dibayar",s:1,f:k=>k.akhir.utang_usaha},
  {l:"Utang pajak penghasilan",s:1,f:k=>k.akhir.utang_pajak},
  {l:"Utang bank jangka pendek",s:1,f:k=>k.akhir.utang_bank_pendek},
  {l:"Total liabilitas jangka pendek",c:"tot",f:k=>k.akhir.utang_usaha+k.akhir.utang_pajak+k.akhir.utang_bank_pendek},
  {h:"Liabilitas jangka panjang"},
  {l:"Utang bank jangka panjang",s:1,f:k=>k.akhir.utang_bank_panjang},
  {l:"Total liabilitas jangka panjang",c:"tot",f:k=>k.akhir.utang_bank_panjang},
  {l:"TOTAL LIABILITAS",c:"tot",f:k=>k.akhir.utang_usaha+k.akhir.utang_pajak+k.akhir.utang_bank_pendek+k.akhir.utang_bank_panjang},
  {h:"Ekuitas"},
  {l:"Modal pemilik",s:1,f:k=>k.akhir.modal},
  {l:"Prive",s:1,f:k=>-k.akhir.prive},
  {l:"Saldo laba",s:1,f:k=>k.akhir.laba},
  {l:"TOTAL EKUITAS",c:"tot",f:k=>k.akhir.modal-k.akhir.prive+k.akhir.laba},
  {l:"TOTAL LIABILITAS DAN EKUITAS",c:"akhir",f:k=>k.akhir.utang_usaha+k.akhir.utang_pajak+k.akhir.utang_bank_pendek+k.akhir.utang_bank_panjang+k.akhir.modal-k.akhir.prive+k.akhir.laba}
 ];
 function tA(k){return k.akhir.kas+k.akhir.piutang+k.akhir.persediaan+k.akhir.dimuka+k.akhir.aset-k.akhir.akum}
 function tL(k){return k.akhir.utang_usaha+k.akhir.utang_pajak+k.akhir.utang_bank_pendek+k.akhir.utang_bank_panjang+k.akhir.modal-k.akhir.prive+k.akhir.laba}
 let seimbang=Math.round(tA(K))===Math.round(tL(K))&&(!Kb||Math.round(tA(Kb))===Math.round(tL(Kb)));
 let neg=[];
 [["kas","Kas"],["piutang","Piutang usaha"],["persediaan","Persediaan"],["dimuka","Beban dibayar di muka"],["utang_usaha","Utang usaha"],["utang_pajak","Utang pajak"],["utang_bank_pendek","Utang bank jangka pendek"],["utang_bank_panjang","Utang bank jangka panjang"]].forEach(function(x){if(Math.round(K.akhir[x[0]])<0)neg.push(x[1])});
 return tabel2(rows,K,Kb,hd)+
  '<p class="'+(seimbang?"ok":"bad")+'">'+(seimbang?"✓ Seimbang: total aset sama dengan total liabilitas dan ekuitas.":"⚠ Tidak seimbang, periksa data transaksi.")+'</p>'+
  (neg.length?'<p class="bad">⚠ Saldo negatif pada: '+neg.join(", ")+'. Periksa pencatatan (mis. HPP melebihi persediaan, atau pelunasan melebihi saldo).</p>':'');
}
function lapLabaRugi(K,Kb,hd){
 let kp=unionKey(K.pend,Kb&&Kb.pend),kb2=unionKey(K.beban,Kb&&Kb.beban);
 let rows=[{g:"PENDAPATAN"}];
 kp.forEach(n=>rows.push({l:aman(n),s:1,f:k=>k.pend[n]||0}));
 if(kp.length===0)rows.push({l:"Tidak ada pendapatan",s:1,f:k=>0});
 rows.push({l:"Total pendapatan",c:"tot",f:k=>k.totPend});
 rows.push({l:"Beban pokok penjualan",f:k=>-k.hpp});
 rows.push({l:"LABA BRUTO",c:"tot",f:k=>k.labaBruto});
 rows.push({g:"BEBAN OPERASIONAL"});
 kb2.forEach(n=>rows.push({l:aman(n),s:1,f:k=>-(k.beban[n]||0)}));
 rows.push({l:"Beban penyusutan",s:1,f:k=>-k.peny});
 rows.push({l:"Total beban operasional",c:"tot",f:k=>-k.totBebanOps});
 rows.push({l:"LABA USAHA",c:"tot",f:k=>k.labaUsaha});
 rows.push({l:"Beban keuangan (bunga)",f:k=>-k.bunga});
 rows.push({l:"LABA SEBELUM PAJAK PENGHASILAN",c:"tot",f:k=>k.labaSblPajak});
 rows.push({l:"Beban pajak penghasilan",f:k=>-k.pajak});
 rows.push({l:"LABA (RUGI) PERIODE BERJALAN",c:"akhir",f:k=>k.laba});
 rows.push({g:"PENGHASILAN KOMPREHENSIF LAIN"});
 rows.push({l:"Penghasilan komprehensif lain (tidak ada)",s:1,f:k=>0});
 rows.push({l:"TOTAL PENGHASILAN KOMPREHENSIF PERIODE BERJALAN",c:"akhir",f:k=>k.laba});
 let mg=K.totPend>0?(K.laba/K.totPend*100).toFixed(1)+"%":"-";
 return tabel2(rows,K,Kb,hd)+'<p class="kecil">Margin laba bersih periode berjalan: '+mg+'. Beban disajikan menurut sifatnya, dengan HPP dipisah untuk menampilkan laba bruto.</p>';
}
function matriksEku(K,judul){
 let a=K.awal,z=K.akhir;
 function tr(l,m,pv,lb,cls){return '<tr class="'+(cls||'')+'"><td>'+l+'</td><td class="num">'+ang(m)+'</td><td class="num">'+ang(pv)+'</td><td class="num">'+ang(lb)+'</td><td class="num">'+ang(m+pv+lb)+'</td></tr>'}
 return '<h4>'+judul+'</h4><div class="bungkus"><table><thead><tr><th>Keterangan</th><th class="num">Modal pemilik</th><th class="num">Prive</th><th class="num">Saldo laba</th><th class="num">Total ekuitas</th></tr></thead><tbody>'+
  tr('Saldo awal',a.modal,-a.prive,a.laba,'tot')+
  tr('Setoran modal',K.setor,0,0)+
  tr('Prive (penarikan pemilik)',0,-K.prive,0)+
  tr('Laba (rugi) periode berjalan',0,0,K.laba)+
  tr('Penghasilan komprehensif lain',0,0,0)+
  tr('Saldo akhir',z.modal,-z.prive,z.laba,'akhir')+'</tbody></table></div>';
}
function lapEkuitas(K,Kb,r){
 let h=matriksEku(K,"Periode berjalan: "+rentang(r.b1,r.b2));
 if(Kb)h+=matriksEku(Kb,"Periode pembanding: "+rentang(r.banding.b1,r.banding.b2));
 return h;
}
function lapArusKas(K,Kb,hd){
 let rows=[
  {g:"ARUS KAS DARI AKTIVITAS OPERASI"},
  {l:"Laba sebelum pajak penghasilan",s:1,f:k=>k.labaSblPajak},
  {l:"Penyesuaian: beban penyusutan",s:1,f:k=>k.peny},
  {l:"(Kenaikan) penurunan piutang usaha",s:1,f:k=>-k.dPiut},
  {l:"(Kenaikan) penurunan persediaan",s:1,f:k=>-k.dPers},
  {l:"(Kenaikan) penurunan beban dibayar di muka",s:1,f:k=>-k.dMuka},
  {l:"Kenaikan (penurunan) utang usaha & beban masih harus dibayar",s:1,f:k=>k.dUsaha},
  {l:"Kas dihasilkan dari operasi",c:"tot",f:k=>k.kasDariOps},
  {l:"Pajak penghasilan dibayar",s:1,f:k=>-k.pajakBayar},
  {l:"Kas bersih dari aktivitas operasi",c:"tot",f:k=>k.kasOps},
  {g:"ARUS KAS DARI AKTIVITAS INVESTASI"},
  {l:"Perolehan aset tetap",s:1,f:k=>-k.beliAset},
  {l:"Kas bersih dari aktivitas investasi",c:"tot",f:k=>k.kasInv},
  {g:"ARUS KAS DARI AKTIVITAS PENDANAAN"},
  {l:"Setoran modal pemilik",s:1,f:k=>k.setor},
  {l:"Prive (penarikan pemilik)",s:1,f:k=>-k.prive},
  {l:"Penerimaan pinjaman bank",s:1,f:k=>k.terimaPinjam},
  {l:"Pembayaran pokok pinjaman bank",s:1,f:k=>-k.bayarPinjam},
  {l:"Kas bersih dari aktivitas pendanaan",c:"tot",f:k=>k.kasDan},
  {l:"KENAIKAN (PENURUNAN) BERSIH KAS",c:"tot",f:k=>k.kasNet},
  {l:"Kas pada awal periode",f:k=>k.awal.kas},
  {l:"KAS PADA AKHIR PERIODE",c:"akhir",f:k=>k.awal.kas+k.kasNet}
 ];
 let cocok=K.kasCek&&(!Kb||Kb.kasCek);
 return tabel2(rows,K,Kb,hd)+
  '<p class="'+(cocok?"ok":"bad")+'">'+(cocok?"✓ Saldo kas akhir sesuai dengan Laporan Posisi Keuangan.":"⚠ Saldo kas akhir tidak sesuai dengan neraca, periksa data.")+'</p>'+
  '<p class="kecil">Metode tidak langsung. Bunga dibayar disajikan dalam aktivitas operasi (sudah termasuk dalam laba sebelum pajak). Prive disajikan dalam aktivitas pendanaan.</p>';
}
function jadwalAset(r){
 let b2=r.b2,ls=data.filter(t=>t.tipe==="beli_aset"&&bulanTrx(t)<=b2);
 if(ls.length===0)return '<p class="kecil">Tidak ada aset tetap.</p>';
 let tc=0,ta=0;
 let h='<div class="bungkus"><table><thead><tr><th>Aset</th><th>Perolehan</th><th class="num">Umur (th)</th><th class="num">Harga perolehan</th><th class="num">Akum. penyusutan</th><th class="num">Nilai buku</th></tr></thead><tbody>';
 ls.sort((a,b)=>a.tgl.localeCompare(b.tgl)).forEach(function(t){
  let ak=akumAset(t,b2);tc+=t.jumlah;ta+=ak;
  h+='<tr><td>'+aman(t.ket)+'</td><td>'+tglPendek(t.tgl)+'</td><td class="num">'+(Number(t.umur)>0?t.umur:"tidak disusutkan")+'</td><td class="num">'+ang(t.jumlah)+'</td><td class="num">'+ang(-ak)+'</td><td class="num">'+ang(t.jumlah-ak)+'</td></tr>';
 });
 return h+'<tr class="tot"><td colspan="3">Total</td><td class="num">'+ang(tc)+'</td><td class="num">'+ang(-ta)+'</td><td class="num">'+ang(tc-ta)+'</td></tr></tbody></table></div>';
}
function lapCalk(K,Kb,r,hd){
 let jumlahTrx=data.filter(t=>bulanTrx(t)>=r.b1&&bulanTrx(t)<=r.b2).length;
 let nMig=data.filter(t=>t.migrasi).length;
 let dasarTxt=p.pajakDasar==="laba"?"laba sebelum pajak per bulan":"pendapatan bruto per bulan";
 let tarif=Number(p.pajakTarif)||0;
 let rows=[
  {h:"Saldo akun utama pada akhir periode"},
  {l:"Kas",s:1,f:k=>k.akhir.kas},
  {l:"Piutang usaha",s:1,f:k=>k.akhir.piutang},
  {l:"Persediaan",s:1,f:k=>k.akhir.persediaan},
  {l:"Beban dibayar di muka",s:1,f:k=>k.akhir.dimuka},
  {l:"Utang usaha & beban masih harus dibayar",s:1,f:k=>k.akhir.utang_usaha},
  {l:"Utang pajak penghasilan",s:1,f:k=>k.akhir.utang_pajak},
  {l:"Utang bank jangka pendek",s:1,f:k=>k.akhir.utang_bank_pendek},
  {l:"Utang bank jangka panjang",s:1,f:k=>k.akhir.utang_bank_panjang},
  {h:"Transaksi dengan pemilik (pihak berelasi) pada periode"},
  {l:"Setoran modal",s:1,f:k=>k.setor},
  {l:"Prive (penarikan)",s:1,f:k=>-k.prive},
  {h:"Pajak penghasilan"},
  {l:"Beban pajak periode berjalan",s:1,f:k=>k.pajak},
  {l:"Pajak dibayar periode berjalan",s:1,f:k=>k.pajakBayar}
 ];
 return '<h4>1. Informasi umum</h4>'+
  '<p>'+aman(p.usaha)+' menyusun laporan keuangan ini untuk periode <b>'+tglPanjang(r.b1+"-01")+' sampai '+tglPanjang(akhirBulan(r.b2))+'</b>. Laporan disajikan dalam Rupiah (Rp). Jumlah transaksi yang dicatat pada periode: <b>'+jumlahTrx+'</b>.</p>'+
  '<h4>2. Dasar penyusunan</h4>'+
  '<p>Laporan keuangan terdiri dari laporan posisi keuangan, laporan laba rugi dan penghasilan komprehensif lain, laporan perubahan ekuitas, laporan arus kas, dan catatan atas laporan keuangan. Laporan disusun dengan mengacu pada prinsip SAK Entitas Privat yang berbasis IFRS for SMEs, menggunakan <b>basis akrual</b> (kecuali laporan arus kas), pengukuran pada biaya historis, dan asumsi kelangsungan usaha. Angka pembanding disajikan untuk periode setara sebelumnya bila tersedia.</p>'+
  '<p class="kecil">Laporan ini dihasilkan aplikasi, belum diaudit, dan belum mencakup seluruh pengungkapan yang disyaratkan standar. Pemakaian untuk bank, investor, atau kewajiban pajak sebaiknya ditinjau akuntan.</p>'+
  '<h4>3. Ringkasan kebijakan akuntansi signifikan</h4>'+
  '<p><b>a. Kas.</b> Terdiri dari kas dan saldo bank yang tersedia.</p>'+
  '<p><b>b. Piutang usaha.</b> Dicatat sebesar jumlah penjualan kredit dikurangi pelunasan. Belum dibentuk penyisihan kerugian piutang.</p>'+
  '<p><b>c. Persediaan.</b> Dicatat sebesar biaya perolehan. Harga pokok penjualan dicatat berkala (periodik) sebesar persediaan yang dipakai pada periode tersebut.</p>'+
  '<p><b>d. Beban dibayar di muka.</b> Dicatat sebagai aset saat dibayar dan diakui sebagai beban sesuai masa manfaatnya.</p>'+
  '<p><b>e. Aset tetap.</b> Dicatat sebesar harga perolehan dikurangi akumulasi penyusutan. Penyusutan memakai metode garis lurus per bulan mulai bulan perolehan, berdasarkan umur manfaat dan nilai residu tiap aset. Aset tanpa umur manfaat (mis. tanah) tidak disusutkan.</p>'+
  '<p><b>f. Liabilitas.</b> Utang usaha, utang pajak, dan pinjaman bank dicatat sebesar pokok. Pinjaman diklasifikasikan jangka pendek atau jangka panjang sesuai pilihan saat pencatatan, tanpa reklasifikasi bagian lancar dari pinjaman jangka panjang.</p>'+
  '<p><b>g. Pengakuan pendapatan.</b> Pendapatan diakui pada tanggal penyerahan barang atau jasa kepada pelanggan, baik tunai maupun kredit.</p>'+
  '<p><b>h. Beban.</b> Diakui pada saat terjadi (basis akrual). Bunga pinjaman diakui sebagai beban saat dibayar.</p>'+
  '<p><b>i. Pajak penghasilan.</b> '+(tarif>0?'Dihitung sebesar '+tarif.toLocaleString("id-ID")+'% dari '+dasarTxt+', diakui sebagai beban dan utang pajak hingga disetor. Pajak tangguhan tidak diakui.':'Tidak dikenakan pada periode ini (tarif 0%). Pajak tangguhan tidak diakui.')+'</p>'+
  '<p><b>j. Ekuitas.</b> Terdiri dari modal pemilik (setoran), prive (penarikan), dan saldo laba.</p>'+
  '<h4>4. Estimasi dan pertimbangan signifikan</h4>'+
  '<p>Umur manfaat dan nilai residu aset tetap ditetapkan oleh pengguna saat aset dicatat. Perubahan estimasi tidak otomatis menyesuaikan angka periode lalu. Tidak ada estimasi lain yang dinilai signifikan.</p>'+
  '<h4>5. Rincian akun</h4>'+
  tabel2(rows,K,Kb,hd)+
  '<h4>Jadwal aset tetap pada akhir periode</h4>'+jadwalAset(r)+
  '<h4>6. Pihak berelasi</h4>'+
  '<p>Transaksi dengan pemilik pada periode berjalan berupa setoran modal sebesar '+rp(K.setor)+' dan prive sebesar '+rp(K.prive)+'. Tidak ada pihak berelasi lain yang dilaporkan.</p>'+
  '<h4>7. Peristiwa setelah periode pelaporan</h4>'+
  '<p>Tidak ada peristiwa penting setelah akhir periode yang diketahui dan perlu diungkapkan.</p>'+
  '<h4>8. Catatan tambahan</h4>'+
  '<p style="white-space:pre-wrap">'+(p.catatan?aman(p.catatan):'<span class="kecil">Tidak ada catatan tambahan. Tambahkan di Pengaturan, bagian Profil usaha.</span>')+'</p>'+
  (nMig>0?'<h4>9. Data dari versi sebelumnya</h4><p>'+nMig+' transaksi berasal dari pencatatan lama berbasis kas. Transaksi tersebut dicatat sebagai transaksi tunai, dan pembelian aset lama diberi umur manfaat 4 tahun tanpa nilai residu. Periksa dan sesuaikan bila perlu.</p>':'');
}
function urutAkun(a){
 let tetap=["kas","piutang","persediaan","dimuka","aset","akum","utang_usaha","utang_pajak","utang_bank_pendek","utang_bank_panjang","modal","prive"];
 let i=tetap.indexOf(a);if(i>=0)return "1"+String(i).padStart(2,"0")+a;
 if(a.indexOf("P:")===0)return "2"+a;
 if(a==="hpp")return "300";
 if(a.indexOf("B:")===0)return "4"+a;
 return {penyusutan:"500",bunga:"501",pajak:"502"}[a]||"9"+a;
}
function lapJurnal(J,r){
 let L=J.filter(l=>l.b>=r.b1&&l.b<=r.b2).sort((a,b)=>a.tgl<b.tgl?-1:a.tgl>b.tgl?1:0);
 if(L.length===0)return '<p class="kecil">Tidak ada jurnal pada periode ini.</p>';
 let td=0,tk=0;
 let h='<div class="bungkus"><table><thead><tr><th>Tanggal</th><th>Akun / keterangan</th><th class="num">Debit</th><th class="num">Kredit</th></tr></thead><tbody>';
 L.forEach(function(l){
  td+=l.d;tk+=l.k;
  let kr=l.k>0;
  h+='<tr><td>'+(kr?"":tglPendek(l.tgl))+'</td><td'+(kr?' style="padding-left:28px"':'')+'>'+aman(akunNama(l.akun))+(kr?"":'<span class="oto">'+aman(l.ket)+(l.oto?" · otomatis":"")+'</span>')+'</td><td class="num">'+(l.d>0?ang(l.d):"")+'</td><td class="num">'+(kr?ang(l.k):"")+'</td></tr>';
 });
 return h+'<tr class="tot"><td colspan="2">Total</td><td class="num">'+ang(td)+'</td><td class="num">'+ang(tk)+'</td></tr></tbody></table></div>'+
  '<p class="'+(Math.round(td)===Math.round(tk)?"ok":"bad")+'">'+(Math.round(td)===Math.round(tk)?"✓ Total debit sama dengan total kredit.":"⚠ Debit dan kredit tidak sama.")+'</p>'+
  '<p class="kecil">Jurnal penyusutan dan beban pajak dibuat otomatis setiap akhir bulan.</p>';
}
function lapSaldo(J,r){
 let ak={};J.forEach(function(l){if(l.b<=r.b2)ak[l.akun]=(ak[l.akun]||0)+l.d-l.k});
 let ks=Object.keys(ak).filter(a=>Math.round(ak[a])!==0).sort((a,b)=>urutAkun(a)<urutAkun(b)?-1:1);
 if(ks.length===0)return '<p class="kecil">Belum ada saldo.</p>';
 let td=0,tk=0;
 let h='<div class="bungkus"><table><thead><tr><th>Akun</th><th class="num">Debit</th><th class="num">Kredit</th></tr></thead><tbody>';
 ks.forEach(function(a){
  let v=ak[a];if(v>0)td+=v;else tk+=-v;
  h+='<tr><td>'+aman(akunNama(a))+'</td><td class="num">'+(v>0?ang(v):"")+'</td><td class="num">'+(v<0?ang(-v):"")+'</td></tr>';
 });
 return h+'<tr class="akhir"><td>Total</td><td class="num">'+ang(td)+'</td><td class="num">'+ang(tk)+'</td></tr></tbody></table></div>'+
  '<p class="'+(Math.round(td)===Math.round(tk)?"ok":"bad")+'">'+(Math.round(td)===Math.round(tk)?"✓ Seimbang.":"⚠ Tidak seimbang.")+'</p>'+
  '<p class="kecil">Akun pendapatan dan beban menunjukkan saldo akumulasi sejak awal pencatatan, bukan hanya periode terpilih.</p>';
}

const JUDUL_LAP={neraca:"Laporan Posisi Keuangan",labarugi:"Laporan Laba Rugi dan Penghasilan Komprehensif Lain",ekuitas:"Laporan Perubahan Ekuitas",aruskas:"Laporan Arus Kas",calk:"Catatan atas Laporan Keuangan",jurnal:"Jurnal Umum",saldo:"Neraca Saldo"};
function renderLaporan(){
 let sel=$("periodeLap"),lama=sel.value;
 let bs=[...new Set(bulanData())],thn=[...new Set(bs.map(b=>b.slice(0,4)))].sort().reverse();
 sel.innerHTML='<option value="semua">Semua waktu</option>'+thn.map(y=>'<option value="Y:'+y+'">Tahun '+y+'</option>').join("")+bs.slice().reverse().map(b=>'<option value="M:'+b+'">'+namaBulan(b)+'</option>').join("");
 let ada=Array.from(sel.options).some(o=>o.value===lama);
 sel.value=ada?lama:(bs.length?"M:"+bs[bs.length-1]:"semua");
 let jenis=$("jenisLap").value;
 let r=resolvePeriode(sel.value);
 let J=bangunJurnal(r.b2);
 let K=hitung(J,r.b1,r.b2),Kb=r.banding?hitung(J,r.banding.b1,r.banding.b2):null;
 let hd=jenis==="neraca"?[tglPendek(akhirBulan(r.b2)),r.banding?tglPendek(akhirBulan(r.banding.b2)):""]:[rentang(r.b1,r.b2),r.banding?rentang(r.banding.b1,r.banding.b2):""];
 let sub;
 if(jenis==="neraca"||jenis==="saldo")sub="Per "+tglPanjang(akhirBulan(r.b2));
 else sub="Untuk periode "+tglPanjang(r.b1+"-01")+" sampai "+tglPanjang(akhirBulan(r.b2));
 let isi;
 if(jenis==="neraca")isi=lapNeraca(K,Kb,hd);
 else if(jenis==="labarugi")isi=lapLabaRugi(K,Kb,hd);
 else if(jenis==="ekuitas")isi=lapEkuitas(K,Kb,r);
 else if(jenis==="aruskas")isi=lapArusKas(K,Kb,hd);
 else if(jenis==="calk")isi=lapCalk(K,Kb,r,hd);
 else if(jenis==="jurnal")isi=lapJurnal(J,r);
 else isi=lapSaldo(J,r);
 if(data.length===0)isi='<p class="kecil">Belum ada transaksi. Tambahkan transaksi atau muat data contoh di Pengaturan.</p>';
 $("lapIsi").innerHTML=
  '<div class="kop"><h2>'+aman(p.usaha)+'</h2><div><b>'+JUDUL_LAP[jenis]+'</b></div><div>'+sub+'</div><div>(Disajikan dalam Rupiah)</div></div>'+
  isi+
  '<p class="kecil" style="margin-top:24px">Dicetak '+tglPanjang(new Date().toISOString().slice(0,10))+'. Disusun oleh '+aman(sesi.nama)+', '+LABEL[sesi.role]+'.</p>';
}

