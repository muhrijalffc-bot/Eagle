/* ===== Mesin akuntansi: jurnal, penyusutan, pajak ===== */
function jurnalTrx(t){
 let d=TIPE[t.tipe];if(!d)return [];
 return [{akun:akunDari(d.dr,t),d:t.jumlah,k:0},{akun:akunDari(d.kr,t),d:0,k:t.jumlah}];
}
function akumAset(t,b){
 let n=Math.round(Number(t.umur)*12);if(!(n>0))return 0;
 let i=selisih(t.tgl.slice(0,7),b)+1;if(i<=0)return 0;
 let tot=t.jumlah-(Number(t.residu)||0),bln=Math.round(tot/n);
 return i>=n?tot:bln*i;
}
function isBeban(a){return a.indexOf("B:")===0||a==="hpp"||a==="penyusutan"||a==="bunga"}
function bulanTrx(t){return t.tgl.slice(0,7)}
function bangunJurnal(sampai){
 let L=[];
 data.forEach(function(t){
  let b=bulanTrx(t);if(b>sampai)return;
  jurnalTrx(t).forEach(function(x){L.push({b:b,tgl:t.tgl,ket:t.ket,tipe:t.tipe,akun:x.akun,d:x.d,k:x.k,oto:false})});
 });
 if(data.length===0)return L;
 let awal=data.reduce((m,t)=>bulanTrx(t)<m?bulanTrx(t):m,"9999-99");
 let aset=data.filter(t=>t.tipe==="beli_aset"&&Number(t.umur)>0);
 let tarif=(Number(p.pajakTarif)||0)/100;
 for(let b=awal;b<=sampai;b=geser(b,1)){
  let tglB=akhirBulan(b);
  aset.forEach(function(t){
   let amt=akumAset(t,b)-akumAset(t,geser(b,-1));
   if(amt<=0)return;
   L.push({b:b,tgl:tglB,ket:"Penyusutan "+t.ket,tipe:"penyusutan",akun:"penyusutan",d:amt,k:0,oto:true});
   L.push({b:b,tgl:tglB,ket:"Penyusutan "+t.ket,tipe:"penyusutan",akun:"akum",d:0,k:amt,oto:true});
  });
  let pend=0,beb=0;
  L.forEach(function(l){
   if(l.b!==b)return;
   if(l.akun.indexOf("P:")===0)pend+=l.k-l.d;else if(isBeban(l.akun))beb+=l.d-l.k;
  });
  let dasar=p.pajakDasar==="laba"?Math.max(0,pend-beb):pend;
  let pj=Math.round(dasar*tarif);
  if(pj>0){
   L.push({b:b,tgl:tglB,ket:"Beban pajak penghasilan "+namaBulan(b),tipe:"pajak",akun:"pajak",d:pj,k:0,oto:true});
   L.push({b:b,tgl:tglB,ket:"Beban pajak penghasilan "+namaBulan(b),tipe:"pajak",akun:"utang_pajak",d:0,k:pj,oto:true});
  }
 }
 return L;
}
function net(J,a,b1,b2){let s=0;for(let i=0;i<J.length;i++){let l=J[i];if(l.akun===a&&(!b1||l.b>=b1)&&l.b<=b2)s+=l.d-l.k}return s}
function gross(J,a,b1,b2,sisi){let s=0;for(let i=0;i<J.length;i++){let l=J[i];if(l.akun===a&&(!b1||l.b>=b1)&&l.b<=b2)s+=l[sisi]}return s}
function akunPL(J){let s={};J.forEach(function(l){if(l.akun.indexOf(":")>0||["hpp","penyusutan","bunga","pajak"].includes(l.akun))s[l.akun]=1});return Object.keys(s)}

function hitung(J,b1,b2){
 let o=geser(b1,-1),K={b1:b1,b2:b2},pl=akunPL(J);
 function pos(u){
  let s={};
  ["kas","piutang","persediaan","dimuka","aset","prive"].forEach(a=>s[a]=net(J,a,"",u));
  ["akum","utang_usaha","utang_pajak","utang_bank_pendek","utang_bank_panjang","modal"].forEach(a=>s[a]=-net(J,a,"",u));
  let lb=0;pl.forEach(a=>{lb-=net(J,a,"",u)});s.laba=lb;
  return s;
 }
 K.awal=pos(o);K.akhir=pos(b2);
 K.pend={};K.beban={};
 pl.forEach(function(a){
  let v=net(J,a,b1,b2);
  if(a.indexOf("P:")===0){if(v!==0)K.pend[a.slice(2)]=-v}
  else if(a.indexOf("B:")===0){if(v!==0)K.beban[a.slice(2)]=v}
 });
 K.totPend=jumlahSum(K.pend);K.totBeban=jumlahSum(K.beban);
 K.hpp=net(J,"hpp",b1,b2);K.peny=net(J,"penyusutan",b1,b2);K.bunga=net(J,"bunga",b1,b2);K.pajak=net(J,"pajak",b1,b2);
 K.labaBruto=K.totPend-K.hpp;
 K.totBebanOps=K.totBeban+K.peny;
 K.labaUsaha=K.labaBruto-K.totBebanOps;
 K.labaSblPajak=K.labaUsaha-K.bunga;
 K.laba=K.labaSblPajak-K.pajak;
 K.totBebanSemua=K.hpp+K.totBebanOps+K.bunga+K.pajak;
 K.setor=-net(J,"modal",b1,b2);
 K.prive=net(J,"prive",b1,b2);
 K.beliAset=net(J,"aset",b1,b2);
 K.terimaPinjam=gross(J,"utang_bank_pendek",b1,b2,"k")+gross(J,"utang_bank_panjang",b1,b2,"k");
 K.bayarPinjam=gross(J,"utang_bank_pendek",b1,b2,"d")+gross(J,"utang_bank_panjang",b1,b2,"d");
 K.pajakBayar=gross(J,"utang_pajak",b1,b2,"d");
 K.dPiut=K.akhir.piutang-K.awal.piutang;
 K.dPers=K.akhir.persediaan-K.awal.persediaan;
 K.dMuka=K.akhir.dimuka-K.awal.dimuka;
 K.dUsaha=K.akhir.utang_usaha-K.awal.utang_usaha;
 K.kasDariOps=K.labaSblPajak+K.peny-K.dPiut-K.dPers-K.dMuka+K.dUsaha;
 K.kasOps=K.kasDariOps-K.pajakBayar;
 K.kasInv=-K.beliAset;
 K.kasDan=K.setor-K.prive+K.terimaPinjam-K.bayarPinjam;
 K.kasNet=K.kasOps+K.kasInv+K.kasDan;
 K.kasCek=Math.round(K.kasNet)===Math.round(K.akhir.kas-K.awal.kas);
 return K;
}

/* ===== Periode ===== */
function bulanData(){return data.map(bulanTrx).sort()}
function resolvePeriode(v){
 let now=kb(new Date()),bs=bulanData(),first=bs[0]||now,last=bs.length?bs[bs.length-1]:now,mx=last>now?last:now,r;
 if(v.indexOf("Y:")===0){
  let y=v.slice(2),b2=y+"-12";if(b2>mx)b2=mx;
  r={b1:y+"-01",b2:b2};r.banding={b1:geser(r.b1,-12),b2:geser(r.b2,-12)};
 }else if(v.indexOf("M:")===0){
  let m=v.slice(2);r={b1:m,b2:m,banding:{b1:geser(m,-1),b2:geser(m,-1)}};
 }else{r={b1:first,b2:mx,banding:null}}
 return r;
}

