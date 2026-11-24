if(FB_OK){
 auth.onAuthStateChanged(function(u){
  if(sedangDaftar)return;
  if(!u){
   hentikanSinkron();sesi=null;data=[];users=[];
   tampilLogin("login");
   return;
  }
  if(sesi&&sesi.uid===u.uid)return;
  bukaSesi(u,false);
 });
}
document.getElementById("login").addEventListener("keydown",function(e){if(e.key==="Enter")kirimLogin()});

function tema(){
 let g=document.documentElement.dataset.tema==="gelap";
 document.documentElement.dataset.tema=g?"":"gelap";
 try{localStorage.setItem("temaKasku",g?"":"gelap")}catch(e){}
}
try{document.documentElement.dataset.tema=localStorage.getItem("temaKasku")||""}catch(e){}
terapkanProfil();isiTipe();
if(!FB_OK){
 tampilLogin("login");
 pesanLogin("Gagal memuat Firebase. Periksa koneksi internet lalu muat ulang halaman.");
 $("lgTombol").disabled=true;
}
