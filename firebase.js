const KUNCI="dashboardAkuntansi",KUNCI_P="kaskuPengaturan";
const WARNA=["#0a6ed1","#e9730c","#107e3e","#bb0000","#5899da","#a9705f","#6a6d70"];

/* ===== Firebase ===== */
const firebaseConfig={
  apiKey:"AIzaSyCCD80eM6w_Lsv6adAsy7jIprV2lBlBNwQ",
  authDomain:"benevolent-saber.firebaseapp.com",
  projectId:"benevolent-saber",
  storageBucket:"benevolent-saber.firebasestorage.app",
  messagingSenderId:"618752593746",
  appId:"1:618752593746:web:2cc9a88c34bd45069f348b",
  measurementId:"G-DMBLDE1LNC"
};
const FB_OK=typeof firebase!=="undefined";
let auth=null,db=null;
if(FB_OK){
 firebase.initializeApp(firebaseConfig);
 auth=firebase.auth();
 db=firebase.firestore();
 try{db.enablePersistence({synchronizeTabs:true}).catch(function(){})}catch(e){}
}

/* ===== Penyimpanan di Firebase ===== */
function refBisnis(){return db.collection("bisnis").doc(sesi.bisnis)}
function refTrx(){return refBisnis().collection("transaksi")}
function simpanP(){
 if(!sesi||!bisa("pengaturan"))return;
 refBisnis().set(p).catch(function(e){toast("Gagal menyimpan pengaturan: "+pesanAuth(e))});
}
async function tulisSemua(arr){
 for(let i=0;i<arr.length;i+=400){
  let b=db.batch();
  arr.slice(i,i+400).forEach(function(t){b.set(refTrx().doc(String(t.id)),t)});
  await b.commit();
 }
}
async function hapusSemua(){
 let s=await refTrx().get();
 for(let i=0;i<s.docs.length;i+=400){
  let b=db.batch();
  s.docs.slice(i,i+400).forEach(function(d){b.delete(d.ref)});
  await b.commit();
 }
}

