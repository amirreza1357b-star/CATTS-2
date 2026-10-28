/* آزمون مارکت v2 — با یک خط <script src="exams/exam-market.js"></script> قبل از </body> در index.html فعال می‌شود */
(function(){
if(window.__emLoaded)return;window.__emLoaded=1;
var P={
store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
check:'<circle cx="12" cy="12" r="9"/><path d="M8.3 12.4l2.5 2.5 4.9-5.3"/>',
cal:'<rect x="3.5" y="5" width="17" height="15" rx="3.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
dl:'<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 20h14"/>',
ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
chev:'<path d="M15 6l-6 6 6 6"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
layers:'<path d="M12 3L3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/>',
inbox:'<path d="M4 13l2.5-7.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 13h4.5a1.5 1.5 0 0 1 1.5 1.5 2 2 0 0 0 4 0 1.5 1.5 0 0 1 1.5-1.5H20"/>'
};
function ic(n,s){s=s||18;return '<svg class="i" viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>'}
var INST=[
{id:'maz',name:'ماز',icon:'🧬',c:'#10b981',img:'exams/logos/maz.png'},
{id:'ghalamchi',name:'قلمچی',icon:'✏️',c:'#38bdf8',img:'exams/logos/ghalamchi.png'},
{id:'khayli-sabz',name:'خیلی سبز',icon:'🌿',c:'#84cc16',img:'exams/logos/khayli-sabz.png'}];
var data=null,st={inst:null,year:null,open:null},root=null,viewer=null;
var ESC={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return ESC[c]})}
function fa(s){return String(s).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
function arr(v){return Array.isArray(v)?v:(v?[v]:[])}
function url(p){return 'exams/'+String(p).split('/').map(encodeURIComponent).join('/')}
function list(){return (data||[]).filter(function(e){return e&&e.institute&&e.name})}
function inst(id){return INST.filter(function(i){return i.id===id})[0]}
function nfiles(e){return arr(e.questions).length+arr(e.answers).length}
function logo(i){return '<span class="em-lg"><img src="'+i.img+'" alt="'+esc(i.name)+'" loading="lazy" data-f="'+i.icon+'" onerror="this.outerHTML=this.dataset.f"></span>'}
function load(){
 if(data)return Promise.resolve();
 return fetch('exams/exams.json?v='+Date.now()).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){data=Array.isArray(j)?j:(j&&j.exams)||[]});
}
function hero(L){
 var f=L.reduce(function(a,e){return a+nfiles(e)},0);
 return '<header class="em-hero"><div class="em-ht"><span class="em-hi">'+ic('store',26)+'</span><div><h2>آزمون مارکت</h2><p>دفترچه سوال و پاسخ آزمون‌های آزمایشی، یک‌جا و مرتب</p></div></div><div class="em-stats"><span><b>'+fa(L.length)+'</b>آزمون</span><span><b>'+fa(f)+'</b>فایل PDF</span><span><b>'+fa(INST.length)+'</b>موسسه</span></div></header>';
}
function crumb(){
 var h='<nav class="em-crumb"><button data-a="home">'+ic('layers',15)+' همه موسسه‌ها</button>';
 if(st.inst){var i=inst(st.inst);h+=ic('chev',14)+'<button data-a="inst" data-v="'+esc(st.inst)+'">'+esc(i?i.name:st.inst)+'</button>'}
 if(st.year)h+=ic('chev',14)+'<span class="cur">'+esc(fa(st.year))+'</span>';
 return h+'</nav>';
}
function empty(t,s){return '<div class="em-empty">'+ic('inbox',40)+'<b>'+t+'</b><span>'+s+'</span></div>'}
function fileRows(x,t,e){
 if(!x.length)return '<div class="em-none">فایلی ثبت نشده</div>';
 return x.map(function(p,j){
  var n=t+(x.length>1?' '+fa(j+1):''),u=url(p);
  return '<div class="em-file"><button class="em-view" data-a="pdf" data-v="'+esc(p)+'" data-t="'+esc(e.name+' — '+n)+'"><span class="fi">'+ic('file',18)+'</span><span class="fn">'+n+'</span><span class="fo">مشاهده '+ic('chev',14)+'</span></button><a class="em-dl" href="'+u+'" download title="دانلود" aria-label="دانلود '+esc(n)+'">'+ic('dl',18)+'</a></div>';
 }).join('');
}
function render(){
 if(!root)return;
 var L=list(),h=hero(L)+crumb(),k=0;
 if(!st.inst){
  h+='<div class="em-grid">'+INST.map(function(i){
   var xs=L.filter(function(e){return e.institute===i.id}),ys={};
   xs.forEach(function(e){ys[e.year||'—']=1});
   var yc=Object.keys(ys).sort().reverse().slice(0,3).map(function(y){return '<i>'+fa(y)+'</i>'}).join('');
   return '<button class="em-inst" style="--c:'+i.c+';--k:'+(k++)+'" data-a="inst" data-v="'+i.id+'">'+logo(i)+'<b>'+i.name+'</b><span class="em-cnt">'+fa(xs.length)+' آزمون</span><span class="em-yrs">'+yc+'</span><span class="em-go">'+ic('chev',18)+'</span></button>';
  }).join('')+'</div>';
 }else if(!st.year){
  var ys={};L.filter(function(e){return e.institute===st.inst}).forEach(function(e){var y=e.year||'—';ys[y]=(ys[y]||0)+1});
  var ks=Object.keys(ys).sort().reverse(),c=(inst(st.inst)||{}).c||'#38bdf8';
  h+=ks.length?'<div class="em-grid sm">'+ks.map(function(y){return '<button class="em-year" style="--c:'+c+';--k:'+(k++)+'" data-a="year" data-v="'+esc(y)+'"><strong>'+esc(fa(y))+'</strong><span>'+fa(ys[y])+' آزمون</span><span class="em-go">'+ic('chev',18)+'</span></button>'}).join('')+'</div>'
   :empty('هنوز آزمونی ثبت نشده','فایل‌ها را در پوشه exams آپلود و به exams.json اضافه کنید');
 }else{
  var c2=(inst(st.inst)||{}).c||'#38bdf8',ex=L.filter(function(e){return e.institute===st.inst&&String(e.year||'—')===st.year}).sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''))});
  h+=ex.length?'<div class="em-list" style="--c:'+c2+'">'+ex.map(function(e,n){
   var q=arr(e.questions),a=arr(e.answers),id=st.inst+'|'+st.year+'|'+n;
   return '<article class="em-exam'+(st.open===id?' open':'')+'" style="--k:'+n+'"><button class="em-eh" data-a="exam" data-v="'+esc(id)+'" aria-expanded="'+(st.open===id)+'"><span class="em-n">'+fa(n+1)+'</span><span class="em-et"><b>'+esc(e.name)+'</b><span class="em-meta"><span class="chip">'+ic('cal',14)+' '+esc(fa(e.date||'—'))+'</span><span class="chip q">'+ic('file',14)+' '+fa(q.length)+' دفترچه سوال</span><span class="chip a">'+ic('check',14)+' '+fa(a.length)+' پاسخ‌نامه</span></span></span><span class="em-cv">'+ic('chev',18)+'</span></button><div class="em-body"><div class="em-in"><div class="em-cols"><section class="em-col q"><h4>'+ic('file',16)+' سوال‌ها</h4>'+fileRows(q,'سوال',e)+'</section><section class="em-col a"><h4>'+ic('check',16)+' پاسخ‌ها</h4>'+fileRows(a,'پاسخ',e)+'</section></div></div></div></article>';
  }).join('')+'</div>':empty('آزمونی برای این سال ثبت نشده','با افزودن آزمون به exams.json اینجا نمایش داده می‌شود');
 }
 root.innerHTML=h;
}
function skeleton(){root.innerHTML='<div class="em-sk"><i></i><i></i><i></i></div>'}
function showError(){root.innerHTML=empty('فایل exams/exams.json خوانده نشد','پوشه exams باید کنار index.html باشد و سایت از آدرس GitHub Pages باز شود.')+'<div style="text-align:center"><button class="em-btn" data-a="retry">تلاش دوباره</button></div>'}
function init(){root=document.getElementById('em-root');if(!root)return;if(!data)skeleton();load().then(render).catch(showError)}
function openPdf(p,t){
 if(!viewer){
  viewer=document.createElement('div');viewer.id='em-viewer';
  viewer.innerHTML='<div class="vb"><div class="vh"><span class="vt"></span><a class="vx" target="_blank" rel="noopener" title="باز کردن در تب جدید">'+ic('ext',17)+'</a><a class="vd" download title="دانلود">'+ic('dl',17)+'</a><button type="button" class="vc" title="بستن (Esc)">'+ic('x',17)+'</button></div><iframe title="pdf"></iframe></div>';
  document.body.appendChild(viewer);
  viewer.querySelector('.vc').onclick=closePdf;
  viewer.addEventListener('click',function(e){if(e.target===viewer)closePdf()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePdf()});
 }
 var u=url(p);viewer.querySelector('.vt').textContent=t||'';
 viewer.querySelector('.vx').href=u;viewer.querySelector('.vd').href=u;
 viewer.querySelector('iframe').src=u;viewer.classList.add('show');document.documentElement.style.overflow='hidden';
}
function closePdf(){if(viewer){viewer.classList.remove('show');viewer.querySelector('iframe').src='about:blank';document.documentElement.style.overflow=''}}
document.addEventListener('click',function(e){
 var b=e.target.closest&&e.target.closest('#em-root [data-a]');if(!b)return;
 var a=b.dataset.a,v=b.dataset.v;
 if(a==='home')st={inst:null,year:null,open:null};
 else if(a==='inst')st={inst:v,year:null,open:null};
 else if(a==='year'){st.year=v;st.open=null}
 else if(a==='exam'){var ex=b.closest('.em-exam');st.open=(st.open===v?null:v);if(ex){ex.classList.toggle('open',st.open===v);b.setAttribute('aria-expanded',st.open===v);document.querySelectorAll('#em-root .em-exam.open').forEach(function(o){if(o!==ex){o.classList.remove('open')}});return}}
 else if(a==='pdf'){openPdf(v,b.dataset.t);return}
 else if(a==='retry'){data=null;init();return}
 render();
});
window.examMarketOpen=function(btn){
 if(typeof window.switchTab==='function'){window.switchTab('tab-exams',btn)}
 else{
  document.querySelectorAll('.tab-content').forEach(function(x){x.classList.remove('active')});
  document.querySelectorAll('.tabs .tab-btn').forEach(function(x){x.classList.remove('active')});
  var p=document.getElementById('tab-exams');if(p)p.classList.add('active');
  if(btn)btn.classList.add('active');
 }
 init();
};
var CSS=`
#tab-exams{padding:0}
#em-root{--bd:rgba(255,255,255,.09);--sf:rgba(255,255,255,.045);--sf2:rgba(255,255,255,.08);--tx:var(--text-primary,#e8ecf5);--tx2:var(--text-secondary,#9aa5bd);--ac:var(--accent,#38bdf8);direction:rtl;color:var(--tx);padding:4px 2px 24px}
body.light-mode #em-root{--bd:rgba(15,23,42,.1);--sf:rgba(15,23,42,.035);--sf2:rgba(15,23,42,.07)}
#em-root .i{flex:none}
#em-root button,#em-root a{font-family:inherit}
@keyframes emUp{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
@keyframes emSh{to{background-position:-200% 0}}
.em-hero{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;padding:22px 24px;margin-bottom:16px;border-radius:26px;border:1px solid var(--bd);background:radial-gradient(90% 160% at 100% 0%,rgba(167,139,250,.28),transparent 60%),radial-gradient(70% 140% at 0% 100%,rgba(56,189,248,.2),transparent 60%),var(--sf);position:relative;overflow:hidden;animation:emUp .5s both}
.em-ht{display:flex;align-items:center;gap:14px}
.em-hi{width:54px;height:54px;border-radius:18px;display:grid;place-items:center;color:#fff;background:linear-gradient(145deg,#a78bfa,#6366f1);box-shadow:0 12px 26px -8px #7c6cf6}
.em-hero h2{margin:0;font-size:1.45rem;font-weight:800;letter-spacing:-.01em}
.em-hero p{margin:4px 0 0;color:var(--tx2);font-size:.86rem}
.em-stats{display:flex;gap:10px;flex-wrap:wrap}
.em-stats span{display:flex;flex-direction:column;align-items:center;min-width:78px;padding:9px 14px;border-radius:16px;background:var(--sf2);border:1px solid var(--bd);font-size:.72rem;color:var(--tx2)}
.em-stats b{font-size:1.2rem;color:var(--tx);line-height:1.2}
.em-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 16px;color:var(--tx2)}
.em-crumb button,.em-crumb .cur{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:999px;border:1px solid var(--bd);background:var(--sf);color:var(--tx);font-size:.82rem;font-weight:600;cursor:pointer;transition:.2s}
.em-crumb button:hover{background:var(--sf2);border-color:var(--ac);transform:translateY(-1px)}
.em-crumb .cur{background:linear-gradient(135deg,rgba(56,189,248,.25),rgba(167,139,250,.25));border-color:transparent;cursor:default}
.em-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}
.em-grid.sm{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}
.em-inst,.em-year{position:relative;overflow:hidden;text-align:right;border-radius:24px;border:1px solid color-mix(in srgb,var(--c) 30%,transparent);background:radial-gradient(120% 120% at 100% 0%,color-mix(in srgb,var(--c) 22%,transparent),transparent 62%),var(--sf);color:var(--tx);cursor:pointer;transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,border-color .3s;animation:emUp .5s both;animation-delay:calc(var(--k)*70ms)}
.em-inst{display:flex;flex-direction:column;gap:6px;padding:20px 20px 22px;min-height:218px}
.em-year{display:flex;flex-direction:column;gap:2px;padding:20px;min-height:128px}
.em-inst:hover,.em-year:hover{transform:translateY(-6px);border-color:var(--c);box-shadow:0 24px 44px -20px var(--c)}
.em-lg{display:grid;place-items:center;width:76px;height:76px;margin-bottom:10px;padding:8px;border-radius:22px;background:#fff;box-shadow:0 10px 22px -8px rgba(0,0,0,.5);font-size:2.2rem}
.em-lg img{max-width:100%;max-height:100%;object-fit:contain;display:block}
.em-inst b{font-size:1.15rem;font-weight:800}
.em-cnt{color:var(--tx2);font-size:.82rem}
.em-yrs{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}
.em-yrs i{font-style:normal;font-size:.72rem;padding:3px 9px;border-radius:999px;background:color-mix(in srgb,var(--c) 20%,transparent);color:var(--tx)}
.em-go{position:absolute;left:16px;bottom:16px;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 22%,transparent);color:var(--c);transition:.3s}
.em-inst:hover .em-go,.em-year:hover .em-go{background:var(--c);color:#06101f;transform:translateX(-4px)}
.em-year strong{font-size:2.3rem;font-weight:900;line-height:1.3;background:linear-gradient(135deg,#fff,var(--c));-webkit-background-clip:text;background-clip:text;color:transparent}
body.light-mode .em-year strong{background:none;color:var(--c)}
.em-year span:not(.em-go){color:var(--tx2);font-size:.82rem}
.em-list{display:flex;flex-direction:column;gap:12px}
.em-exam{border-radius:22px;border:1px solid var(--bd);background:var(--sf);overflow:hidden;position:relative;transition:border-color .3s,box-shadow .3s;animation:emUp .45s both;animation-delay:calc(var(--k)*60ms)}
.em-exam::before{content:"";position:absolute;inset-block:0;right:0;width:4px;background:linear-gradient(var(--c),transparent)}
.em-exam.open{border-color:color-mix(in srgb,var(--c) 55%,transparent);box-shadow:0 18px 40px -22px var(--c)}
.em-eh{width:100%;display:flex;align-items:center;gap:14px;padding:16px 18px;background:none;border:0;color:var(--tx);cursor:pointer;text-align:right}
.em-n{flex:none;width:42px;height:42px;border-radius:14px;display:grid;place-items:center;font-weight:800;color:#06101f;background:linear-gradient(145deg,var(--c),color-mix(in srgb,var(--c) 55%,#fff))}
.em-et{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.em-et b{font-size:1rem;font-weight:700}
.em-meta{display:flex;gap:8px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:.74rem;background:var(--sf2);color:var(--tx2)}
.chip.q{background:rgba(56,189,248,.14);color:#38bdf8}.chip.a{background:rgba(52,211,153,.14);color:#34d399}
.em-cv{flex:none;width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:var(--sf2);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
.em-exam.open .em-cv{transform:rotate(-90deg);background:var(--c);color:#06101f}
.em-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s cubic-bezier(.22,1,.36,1)}
.em-exam.open .em-body{grid-template-rows:1fr}
.em-in{overflow:hidden;min-height:0}
.em-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:2px 16px 16px}
.em-col{padding:12px;border-radius:18px;background:var(--sf);border:1px solid var(--bd)}
.em-col h4{display:flex;align-items:center;gap:7px;margin:0 0 10px;font-size:.84rem;font-weight:700}
.em-col.q h4{color:#38bdf8}.em-col.a h4{color:#34d399}
.em-file{display:flex;gap:8px;margin-bottom:8px}.em-file:last-child{margin-bottom:0}
.em-view{flex:1;min-width:0;display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:14px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx);cursor:pointer;transition:.2s;text-align:right}
.em-view:hover{transform:translateY(-2px);border-color:var(--c);box-shadow:0 10px 22px -14px var(--c)}
.em-view .fi{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 20%,transparent);color:var(--c)}
.em-col.q .fi{background:rgba(56,189,248,.16);color:#38bdf8}.em-col.a .fi{background:rgba(52,211,153,.16);color:#34d399}
.em-view .fn{flex:1;font-weight:600;font-size:.88rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.em-view .fo{display:flex;align-items:center;gap:3px;font-size:.74rem;color:var(--tx2)}
.em-dl{flex:none;width:46px;display:grid;place-items:center;border-radius:14px;border:1px solid var(--bd);background:var(--sf2);color:var(--tx);text-decoration:none;transition:.2s}
.em-dl:hover{background:var(--c);color:#06101f;border-color:var(--c);transform:translateY(-2px)}
.em-none{color:var(--tx2);font-size:.8rem;padding:6px 2px}
.em-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:46px 16px;text-align:center;color:var(--tx2);border:1px dashed var(--bd);border-radius:24px}
.em-empty b{color:var(--tx)}
.em-btn{margin-top:14px;padding:9px 20px;border-radius:14px;border:0;cursor:pointer;color:#06101f;font-weight:700;background:linear-gradient(135deg,#38bdf8,#a78bfa)}
.em-sk{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}
.em-sk i{height:200px;border-radius:24px;background:linear-gradient(90deg,var(--sf) 30%,var(--sf2) 50%,var(--sf) 70%) 0 0/200% 100%;animation:emSh 1.4s linear infinite}
#em-viewer{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(4,8,18,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
#em-viewer.show{display:flex;animation:emUp .25s both}
#em-viewer .vb{width:min(1200px,100%);height:100%;display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:#0d1326;border:1px solid rgba(255,255,255,.12);box-shadow:0 40px 100px -20px #000}
#em-viewer .vh{display:flex;align-items:center;gap:8px;padding:10px 14px;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent);direction:rtl}
#em-viewer .vt{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;font-size:.92rem}
#em-viewer .vh a,#em-viewer .vh button{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;border:0;cursor:pointer;color:#fff;background:rgba(255,255,255,.1);transition:.2s}
#em-viewer .vh a:hover,#em-viewer .vh button:hover{background:rgba(255,255,255,.2)}
#em-viewer .vc:hover{background:#f43f5e!important}
#em-viewer iframe{flex:1;width:100%;border:0;background:#fff}
@media(max-width:640px){.em-cols{grid-template-columns:1fr}.em-hero{padding:18px}.em-stats span{min-width:64px}}
@media(prefers-reduced-motion:reduce){#em-root *,#em-viewer{animation:none!important;transition-duration:.01ms!important}}
`;
var RAIL=`
.em-rail-head{display:none}
@media (min-width:860px){
html body .tabs{position:fixed!important;top:50%!important;bottom:auto!important;right:16px!important;left:auto!important;transform:translateY(-50%)!important;margin:0!important;max-width:none!important;max-height:calc(100vh - 24px)!important;width:68px!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important;gap:3px!important;padding:10px 8px!important;border-radius:28px!important;overflow-x:hidden!important;overflow-y:auto!important;scrollbar-width:none!important;background:linear-gradient(180deg,rgba(26,34,62,.78),rgba(9,13,27,.84))!important;backdrop-filter:blur(24px) saturate(180%)!important;-webkit-backdrop-filter:blur(24px) saturate(180%)!important;border:1px solid rgba(255,255,255,.09)!important;box-shadow:0 0 0 1px rgba(0,0,0,.45),0 28px 70px -14px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.09)!important;z-index:600!important;transition:width .34s cubic-bezier(.22,1,.36,1) .05s,box-shadow .3s!important}
html body .tabs::-webkit-scrollbar{display:none}
html body .tabs:hover,html body .tabs:focus-within{width:236px!important;box-shadow:0 0 0 1px rgba(0,0,0,.45),0 34px 90px -14px rgba(0,0,0,.75),0 0 60px -20px rgba(129,140,248,.55),inset 0 1px 0 rgba(255,255,255,.11)!important}
.em-rail-head{display:flex;flex:none;align-items:center;gap:12px;padding:5px 4px 12px;margin-bottom:6px;border-bottom:1px solid rgba(255,255,255,.07)}
.em-rail-head .lg{flex:none;width:38px;height:38px;border-radius:13px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:1.05rem;background:conic-gradient(from 200deg,#38bdf8,#818cf8,#f472b6,#38bdf8);box-shadow:0 8px 22px -8px #818cf8}
.em-rail-head .tx{display:flex;flex-direction:column;line-height:1.35;white-space:nowrap;opacity:0;transform:translateX(10px);transition:opacity .15s,transform .25s}
.em-rail-head b{color:#fff;font-size:.92rem;letter-spacing:.04em}
.em-rail-head small{color:#7f8cab;font-size:.68rem}
html body .tabs:hover .em-rail-head .tx,html body .tabs:focus-within .em-rail-head .tx{opacity:1;transform:none;transition-delay:.12s}
html body .tabs .tab-btn{flex:0 0 auto!important;min-width:0!important;width:100%!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:12px!important;padding:4px!important;border:0!important;border-radius:17px!important;background:transparent!important;box-shadow:none!important;position:relative!important;transition:background .25s!important}
html body .tabs .tab-btn:hover{background:rgba(255,255,255,.06)!important}
html body .tabs .tab-btn.active{background:linear-gradient(270deg,color-mix(in srgb,var(--tc,#38bdf8) 24%,transparent),transparent 88%)!important}
html body .tabs .tab-btn.active::after{content:"";position:absolute;right:-9px;top:50%;width:4px;height:24px;transform:translateY(-50%);border-radius:4px 0 0 4px;background:var(--tc,#38bdf8);box-shadow:0 0 16px 1px var(--tc,#38bdf8)}
html body .tabs .tab-icon{flex:none!important;width:38px!important;height:38px!important;border-radius:13px!important;display:grid!important;place-items:center!important;background:color-mix(in srgb,var(--tc,#38bdf8) 13%,rgba(255,255,255,.03))!important;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tc,#38bdf8) 26%,transparent)!important;transition:transform .35s cubic-bezier(.34,1.56,.64,1),background .25s,box-shadow .25s!important}
html body .tabs .tab-btn:hover .tab-icon{transform:scale(1.1) rotate(-5deg)!important}
html body .tabs .tab-icon svg{width:19px!important;height:19px!important;color:var(--tc,#38bdf8)!important;filter:none!important}
html body .tabs .tab-btn.active .tab-icon{background:linear-gradient(145deg,var(--tc,#38bdf8),color-mix(in srgb,var(--tc,#38bdf8) 55%,#000))!important;box-shadow:0 10px 22px -6px var(--tc,#38bdf8),inset 0 1px 0 rgba(255,255,255,.35)!important}
html body .tabs .tab-btn.active .tab-icon svg{color:#fff!important}
html body .tabs .tab-label{font-size:.87rem!important;font-weight:600!important;letter-spacing:0!important;color:#aab6d3!important;white-space:nowrap!important;opacity:0;transform:translateX(10px);transition:opacity .15s,transform .25s}
html body .tabs:hover .tab-label,html body .tabs:focus-within .tab-label{opacity:1;transform:none;transition-delay:.12s}
html body .tabs .tab-btn:hover .tab-label{color:#fff!important}
html body .tabs .tab-btn.active .tab-label{color:#fff!important;font-weight:700!important}
body.light-mode .tabs{background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(240,244,252,.92))!important;border-color:rgba(15,23,42,.1)!important;box-shadow:0 20px 50px -18px rgba(15,23,42,.35),inset 0 1px 0 #fff!important}
body.light-mode .tabs .tab-label{color:#475569!important}
body.light-mode .tabs .tab-btn:hover .tab-label,body.light-mode .tabs .tab-btn.active .tab-label{color:#0f172a!important}
body.light-mode .tabs .tab-btn:hover{background:rgba(15,23,42,.05)!important}
body.light-mode .em-rail-head{border-color:rgba(15,23,42,.08)}
body.light-mode .em-rail-head b{color:#0f172a}
}
@media (prefers-reduced-motion:reduce){html body .tabs,html body .tabs *{transition-duration:.01ms!important}}
`;
function mount(){
 if(document.getElementById('em-style'))return;
 var s=document.createElement('style');s.id='em-style';s.textContent=CSS+RAIL;document.head.appendChild(s);
 var tabs=document.querySelector('.tabs');
 var t=document.createElement('div');
 t.innerHTML='<button class="tab-btn" style="--tc:#a78bfa" data-adm-tab="tab-exams" onclick="examMarketOpen(this)"><span class="tab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+P.store+'</svg></span><span class="tab-label">آزمون مارکت</span></button>';
 var b=t.firstChild,trash=tabs&&tabs.querySelector('[data-adm-tab="tab-trash"]');
 if(tabs){
  trash?tabs.insertBefore(b,trash):tabs.appendChild(b);
  var h=document.createElement('div');h.className='em-rail-head';
  h.innerHTML='<span class="lg">C</span><span class="tx"><b>CATTS</b><small>سامانه تحلیل و تست‌زنی</small></span>';
  tabs.insertBefore(h,tabs.firstChild);
 }
 var t2=document.createElement('div');t2.innerHTML='<div id="tab-exams" class="tab-content"><div id="em-root"></div></div>';
 var p=t2.firstChild,g=document.getElementById('tab-gallery');
 if(g&&g.parentNode)g.parentNode.insertBefore(p,g);else document.body.appendChild(p);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
