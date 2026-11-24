/* ===== Dashboard ===== */
function renderDashboard(){
 let now=new Date(),bIni=kb(now),mode=$("periode").value;
 let bs=bulanData(),first=bs[0]||bIni,last=bs.length?bs[bs.length-1]:bIni,mx=last>bIni?last:bIni;
 let J=bangunJurnal(mx);
 let K=mode==="bulan"?hitung(J,bIni,bIni):hitung(J,first,mx);
 let Kp=mode==="bulan"?hitung(J,geser(bIni,-1),geser(bIni,-1)):null;
 let dp=dataDilihat();
 $("subjudul").innerText=(mode==="semua"?"Ringkasan semua waktu":"Ringkasan bulan ini")+" · "+data.length+" transaksi";
 function delta(now_,lalu,naikBaik){
  if(!Kp)return '<span class="delta">Semua waktu</span>';
  if(lalu===0)return '<span class="delta">Belum ada data bulan lalu</span>';
  let pct=(now_-lalu)/Math.abs(lalu)*100,baik=naikBaik?pct>=0:pct<=0;
  return '<span class="'+(baik?"naik":"turun")+'">'+(pct>=0?"▲ ":"▼ ")+Math.abs(pct).toFixed(0)+'%</span> <span class="delta">vs bulan lalu</span>';
 }
 let margin=K.totPend>0?K.laba/K.totPend*100:0;
 let kartu=[
  ["Pendapatan","💰","#107e3e1f",rp(K.totPend),delta(K.totPend,Kp?Kp.totPend:0,true),""],
  ["Total beban","💸","#bb00001a",rp(K.totBebanSemua),delta(K.totBebanSemua,Kp?Kp.totBebanSemua:0,false),""],
  ["Laba bersih","📈","#0a6ed11f",nrp(K.laba),'<span class="delta">Margin '+margin.toFixed(1)+'% · '+(K.laba>=0?"untung":"rugi")+'</span>',K.laba>=0?"var(--hijau)":"var(--merah)"],
  ["Saldo kas","🏦","#e9730c1f",nrp(K.akhir.kas),'<span class="delta">Piutang '+rp(K.akhir.piutang)+' · Utang usaha '+rp(K.akhir.utang_usaha)+'</span>',K.akhir.kas<0?"var(--merah)":""]];
 $("kpi").innerHTML=kartu.map(k=>'<div class="kartu"><span class="ikon" style="background:'+k[2]+'">'+k[1]+'</span><h3>'+k[0]+'</h3><div class="nilai" style="color:'+(k[5]||"inherit")+'">'+k[3]+'</div>'+k[4]+'</div>').join("");

 let bln=[];
 for(let i=5;i>=0;i--){let d=new Date(now.getFullYear(),now.getMonth()-i,1);bln.push({k:kb(d),l:d.toLocaleDateString("id-ID",{month:"short"}),masuk:0,keluar:0})}
 J.forEach(function(l){if(l.akun!=="kas")return;bln.forEach(function(b){if(l.b===b.k){b.masuk+=l.d;b.keluar+=l.k}})});
 let maks=Math.max(1,...bln.map(b=>Math.max(b.masuk,b.keluar)));
 let garis=[1,.75,.5,.25].map(f=>'<div class="gl" style="top:'+((1-f)*100)*0.88+'%"><span>'+singkat(maks*f)+'</span></div>').join("");
 $("grafik").innerHTML=garis+bln.map(b=>'<div class="kol"><b style="height:'+(b.masuk/maks*88)+'%;background:var(--hijau)" title="Kas masuk '+rp(b.masuk)+'"></b><b style="height:'+(b.keluar/maks*88)+'%;background:var(--merah)" title="Kas keluar '+rp(b.keluar)+'"></b><em>'+b.l+'</em></div>').join("");

 let pk={};
 Object.keys(K.beban).forEach(k=>pk[k]=K.beban[k]);
 if(K.hpp>0)pk["Beban pokok penjualan"]=K.hpp;
 if(K.peny>0)pk["Beban penyusutan"]=K.peny;
 if(K.bunga>0)pk["Beban bunga"]=K.bunga;
 if(K.pajak>0)pk["Beban pajak"]=K.pajak;
 let tot=jumlahSum(pk),ks=Object.keys(pk).sort((a,b)=>pk[b]-pk[a]);
 if(ks.length===0||tot<=0){$("donat").innerHTML='<div class="kosong">Belum ada beban</div>'}
 else{
  let acc=0,seg=ks.map(function(k,i){let a=acc/tot*100;acc+=pk[k];return WARNA[i%WARNA.length]+" "+a+"% "+(acc/tot*100)+"%"});
  $("donat").innerHTML='<div class="donat" style="background:conic-gradient('+seg.join(",")+')"><div><span><strong>'+singkat(tot)+'</strong>total</span></div></div>'+
   ks.map((k,i)=>'<div class="lk"><span><i style="background:'+WARNA[i%WARNA.length]+'"></i>'+aman(k)+'</span><b>'+(pk[k]/tot*100).toFixed(0)+'%</b></div>').join("");
 }

 let q=$("cari").value.trim().toLowerCase();
 let tampil=dp.filter(function(d){
  let td=TIPE[d.tipe]||{l:d.tipe,a:"nonkas"};
  return (jenisAktif==="semua"||td.a===jenisAktif)&&(q===""||(d.ket+" "+(d.kat||"")+" "+td.l).toLowerCase().includes(q));
 }).sort((a,b)=>b.tgl.localeCompare(a.tgl)||String(b.id).localeCompare(String(a.id),undefined,{numeric:true}));
 if(tampilan==="dashboard")tampil=tampil.slice(0,6);
 $("isiTabel").innerHTML=tampil.length===0?'<tr><td colspan="5" class="kosong">Tidak ada transaksi ditemukan</td></tr>':
  tampil.map(function(d){
   let td=TIPE[d.tipe]||{l:d.tipe,a:"nonkas",ik:"🧾"};
   let lb=td.a==="masuk"?"Kas masuk":td.a==="keluar"?"Kas keluar":"Non-kas";
   let tanda=td.a==="masuk"?"+":td.a==="keluar"?"-":"";
   let warna=td.a==="masuk"?"hijau":td.a==="keluar"?"merah":"abu";
   return '<tr><td><div class="sel"><div class="ik">'+td.ik+'</div><div>'+aman(d.ket)+'<small>'+aman(td.l)+(d.kat?" · "+aman(d.kat):"")+'</small></div></div></td>'+
    '<td>'+new Date(d.tgl+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})+'</td>'+
    '<td><span class="badge '+td.a+'">'+lb+'</span></td>'+
    '<td class="num" style="font-weight:600;color:var(--'+warna+')">'+tanda+rp(d.jumlah)+'</td>'+
    '<td class="num">'+(bisa("hapus")?'<button class="x" onclick="hapus(\''+d.id+'\')" title="Hapus">🗑️</button>':"")+'</td></tr>';
  }).join("");
}

