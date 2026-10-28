/* آزمون مارکت — با یک خط <script src="exam-market.js"></script> قبل از </body> در index.html فعال می‌شود */
var EM_CSS="#em-root{direction:rtl}\n.em-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:14px;font-size:.85rem;color:var(--text-secondary)}\n.em-crumb button{background:none;border:none;color:var(--accent);cursor:pointer;font:inherit;padding:2px 4px;border-radius:6px}\n.em-crumb button:hover{background:rgba(255,255,255,.07)}\n.em-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}\n.em-card{border:1px solid color-mix(in srgb,var(--c,#38bdf8) 35%,transparent);background:linear-gradient(145deg,color-mix(in srgb,var(--c,#38bdf8) 14%,transparent),rgba(255,255,255,.03));border-radius:18px;padding:18px 12px;text-align:center;cursor:pointer;color:var(--text-primary);font:inherit;transition:.2s}\n.em-card:hover{transform:translateY(-3px);box-shadow:0 8px 22px color-mix(in srgb,var(--c,#38bdf8) 25%,transparent)}\n.em-card .ic{font-size:2rem;display:block;margin-bottom:6px}\n.em-card .lg{display:grid;place-items:center;width:92px;height:92px;margin:0 auto 10px;background:#fff;border-radius:22px;padding:8px;font-size:2.2rem;box-shadow:0 6px 16px rgba(0,0,0,.3)}\n.em-card .lg img{max-width:100%;max-height:100%;object-fit:contain;display:block}\n.em-card b{display:block;font-size:1rem}\n.em-card small{color:var(--text-secondary)}\n.em-exam{border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);border-radius:16px;margin-bottom:10px;overflow:hidden}\n.em-exam>button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;background:none;border:none;color:var(--text-primary);font:inherit;padding:14px 16px;cursor:pointer;text-align:right}\n.em-exam .dt{color:var(--text-secondary);font-size:.8rem;white-space:nowrap}\n.em-detail{display:none;padding:0 14px 14px;gap:10px;grid-template-columns:1fr 1fr}\n.em-exam.open .em-detail{display:grid}\n.em-sec{border-radius:12px;padding:10px;background:rgba(255,255,255,.04)}\n.em-sec h4{margin:0 0 8px;font-size:.85rem;color:var(--accent)}\n.em-pdf{display:block;width:100%;margin-bottom:6px;padding:9px 10px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:var(--text-primary);font:inherit;font-size:.82rem;cursor:pointer;text-align:right}\n.em-pdf:hover{border-color:var(--accent)}\n.em-none{color:var(--text-secondary);font-size:.8rem}\n.em-msg{padding:22px;text-align:center;color:var(--text-secondary);line-height:2}\n#em-viewer{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.75);display:none;flex-direction:column;padding:10px}\n#em-viewer.show{display:flex}\n#em-viewer .bar{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#12151c;border-radius:12px 12px 0 0;color:#fff;font-size:.9rem}\n#em-viewer .bar span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n#em-viewer .bar a,#em-viewer .bar button{color:#fff;background:rgba(255,255,255,.12);border:none;border-radius:8px;padding:6px 12px;cursor:pointer;text-decoration:none;font:inherit;font-size:.8rem}\n#em-viewer iframe{flex:1;width:100%;border:0;background:#fff;border-radius:0 0 12px 12px}\n@media(max-width:560px){.em-detail{grid-template-columns:1fr}}";
var EM_BTN="<button class=\"tab-btn\" style=\"--tc:#a78bfa\" data-adm-tab=\"tab-exams\" onclick=\"examMarketOpen(this)\"><span class=\"tab-icon\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l1.5-5h15L21 9\"></path><path d=\"M4 9v11h16V9\"></path><path d=\"M9 20v-6h6v6\"></path><path d=\"M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0\"></path></svg></span><span class=\"tab-label\">آزمون مارکت</span></button>";
var EM_PANEL="<div id=\"tab-exams\" class=\"tab-content\">\n        <div class=\"glass-card\">\n            <div class=\"section-title\">🏪 آزمون مارکت</div>\n            <div id=\"em-root\"></div>\n        </div>\n    </div>";
var EM_RAIL="@media (min-width:860px){\nhtml body .tabs{position:fixed!important;top:50%!important;bottom:auto!important;right:18px!important;left:auto!important;transform:translateY(-50%)!important;margin:0!important;max-width:none!important;max-height:calc(100vh - 28px)!important;width:66px!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important;gap:8px!important;padding:12px 8px!important;border-radius:24px!important;overflow-x:hidden!important;overflow-y:auto!important;background:linear-gradient(180deg,#101c3d,#0a1226)!important;border:1px solid rgba(255,255,255,.1)!important;box-shadow:0 14px 40px rgba(0,0,0,.4)!important;z-index:600!important;transition:width .28s cubic-bezier(.2,.8,.2,1) .07s,box-shadow .28s!important}\nhtml body .tabs:hover,html body .tabs:focus-within{width:218px!important;box-shadow:0 22px 60px rgba(0,0,0,.55)!important}\nhtml body .tabs .tab-btn{flex:0 0 auto!important;min-width:0!important;width:100%!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:12px!important;padding:5px!important;border:0!important;border-radius:16px!important;background:transparent!important;position:relative!important;box-shadow:none!important}\nhtml body .tabs .tab-btn:hover{background:rgba(255,255,255,.07)!important}\nhtml body .tabs .tab-btn.active{background:linear-gradient(270deg,rgba(255,255,255,.13),rgba(255,255,255,.03))!important}\nhtml body .tabs .tab-btn.active::after{content:\"\";position:absolute;right:-9px;top:10px;bottom:10px;width:4px;border-radius:4px 0 0 4px;background:var(--tc,#38bdf8)}\nhtml body .tabs .tab-icon{flex:none!important;width:38px!important;height:38px!important;border-radius:12px!important;display:grid!important;place-items:center!important;background:color-mix(in srgb,var(--tc,#38bdf8) 20%,transparent)!important;box-shadow:none!important;transition:background .2s,box-shadow .2s!important}\nhtml body .tabs .tab-icon svg{width:19px!important;height:19px!important;color:var(--tc,#38bdf8)!important;filter:none!important}\nhtml body .tabs .tab-btn.active .tab-icon{background:var(--tc,#38bdf8)!important;box-shadow:0 6px 16px -4px var(--tc,#38bdf8)!important}\nhtml body .tabs .tab-btn.active .tab-icon svg{color:#08112a!important}\nhtml body .tabs .tab-label{font-size:.86rem!important;font-weight:700!important;color:#c3d0ea!important;white-space:nowrap!important;opacity:0;transform:translateX(10px);transition:opacity .15s,transform .2s}\nhtml body .tabs:hover .tab-label,html body .tabs:focus-within .tab-label{opacity:1;transform:none;transition-delay:.12s}\nhtml body .tabs .tab-btn.active .tab-label{color:#fff!important}\nbody.light-mode .tabs{background:linear-gradient(180deg,#ffffff,#f1f5fb)!important;border-color:rgba(15,23,42,.1)!important}\nbody.light-mode .tabs .tab-label{color:#334155!important}\nbody.light-mode .tabs .tab-btn.active .tab-label{color:#0f172a!important}\nbody.light-mode .tabs .tab-btn:hover{background:rgba(15,23,42,.06)!important}\n}";
(function(){
var INST=[{id:'maz',name:'ماز',icon:'🧬',c:'#10b981',img:'exams/logos/maz.png'},{id:'ghalamchi',name:'قلمچی',icon:'✏️',c:'#38bdf8',img:'exams/logos/ghalamchi.png'},{id:'khayli-sabz',name:'خیلی سبز',icon:'🌿',c:'#84cc16',img:'exams/logos/khayli-sabz.png'}];
function logo(i){return '<span class="lg"><img src="'+i.img+'" alt="'+esc(i.name)+'" loading="lazy" data-f="'+i.icon+'" onerror="this.outerHTML=this.dataset.f"></span>'}
var data=null,st={inst:null,year:null,open:null},root=null,viewer=null;
var ESC={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return ESC[c]})}
function pdfUrl(p){return 'exams/'+String(p).split('/').map(encodeURIComponent).join('/')}
function arr(v){return Array.isArray(v)?v:(v?[v]:[])}
function fa(s){return String(s).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
function list(){return (data||[]).filter(function(e){return e&&e.institute&&e.name})}
function instOf(id){return INST.filter(function(i){return i.id===id})[0]}
function load(){
  if(data)return Promise.resolve();
  return fetch('exams/exams.json?v='+Date.now()).then(function(r){if(!r.ok)throw 0;return r.json()})
   .then(function(j){data=Array.isArray(j)?j:(j&&j.exams)||[]});
}
function crumb(){
  var h='<div class="em-crumb"><button data-a="home">آزمون مارکت</button>';
  if(st.inst){var i=instOf(st.inst);h+=' › <button data-a="inst" data-v="'+esc(st.inst)+'">'+esc(i?i.name:st.inst)+'</button>'}
  if(st.year)h+=' › <span>'+esc(fa(st.year))+'</span>';
  return h+'</div>';
}
function render(){
  if(!root)return;
  var L=list(),h=crumb();
  if(!st.inst){
    h+='<div class="em-grid">'+INST.map(function(i){
      var n=L.filter(function(e){return e.institute===i.id}).length;
      return '<button class="em-card" style="--c:'+i.c+'" data-a="inst" data-v="'+i.id+'">'+logo(i)+'<b>'+i.name+'</b><small>'+fa(n)+' آزمون</small></button>'}).join('')+'</div>';
  }else if(!st.year){
    var ys={};L.filter(function(e){return e.institute===st.inst}).forEach(function(e){var y=e.year||'—';ys[y]=(ys[y]||0)+1});
    var keys=Object.keys(ys).sort().reverse(),c=(instOf(st.inst)||{}).c||'#38bdf8';
    h+=keys.length?'<div class="em-grid">'+keys.map(function(y){return '<button class="em-card" style="--c:'+c+'" data-a="year" data-v="'+esc(y)+'"><span class="ic">📅</span><b>'+esc(fa(y))+'</b><small>'+fa(ys[y])+' آزمون</small></button>'}).join('')+'</div>'
      :'<div class="em-msg">هنوز آزمونی برای این موسسه ثبت نشده ✨</div>';
  }else{
    var ex=L.filter(function(e){return e.institute===st.inst&&String(e.year||'—')===st.year}).sort(function(a,b){return String(b.date||'').localeCompare(String(a.date||''))});
    h+=ex.map(function(e,k){
      var q=arr(e.questions),a=arr(e.answers),id=st.inst+'|'+st.year+'|'+k;
      function btns(x,t){return x.length?x.map(function(p,j){return '<button class="em-pdf" data-a="pdf" data-v="'+esc(p)+'" data-t="'+esc(e.name+' — '+t+(x.length>1?' '+fa(j+1):''))+'">📄 '+t+(x.length>1?' '+fa(j+1):'')+'</button>'}).join(''):'<div class="em-none">فایلی ثبت نشده</div>'}
      return '<div class="em-exam'+(st.open===id?' open':'')+'"><button data-a="exam" data-v="'+esc(id)+'"><b>'+esc(e.name)+'</b><span class="dt">'+esc(fa(e.date||''))+'</span></button><div class="em-detail"><div class="em-sec"><h4>📝 سوال</h4>'+btns(q,'سوال')+'</div><div class="em-sec"><h4>✅ پاسخ</h4>'+btns(a,'پاسخ')+'</div></div></div>'}).join('')||'<div class="em-msg">آزمونی برای این سال ثبت نشده ✨</div>';
  }
  root.innerHTML=h;
}
function showError(){root.innerHTML='<div class="em-msg">⚠️ فایل <b>exams/exams.json</b> پیدا یا خوانده نشد.<br>مطمئن شو پوشه <b>exams</b> کنار <b>index.html</b> در GitHub هست و سایت را از آدرس GitHub Pages باز کرده‌ای (نه مستقیم از فایل).<br><button class="em-pdf" style="max-width:200px;margin:10px auto 0;text-align:center" data-a="retry">🔄 تلاش دوباره</button></div>'}
function init(){
  root=document.getElementById('em-root');if(!root)return;
  if(!data)root.innerHTML='<div class="em-msg">در حال بارگذاری...</div>';
  load().then(render).catch(showError);
}
function openPdf(p,t){
  if(!viewer){viewer=document.createElement('div');viewer.id='em-viewer';
    viewer.innerHTML='<div class="bar"><span></span><a target="_blank" rel="noopener">باز کردن در تب جدید ↗</a><button type="button">✕ بستن</button></div><iframe title="pdf"></iframe>';
    document.body.appendChild(viewer);
    viewer.querySelector('button').onclick=closePdf;
    viewer.addEventListener('click',function(e){if(e.target===viewer)closePdf()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closePdf()});}
  var u=pdfUrl(p);viewer.querySelector('span').textContent=t||'';viewer.querySelector('a').href=u;
  viewer.querySelector('iframe').src=u;viewer.classList.add('show');
}
function closePdf(){if(viewer){viewer.classList.remove('show');viewer.querySelector('iframe').src='about:blank'}}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('#em-root [data-a]');if(!b)return;
  var a=b.dataset.a,v=b.dataset.v;
  if(a==='home'){st={inst:null,year:null,open:null}}
  else if(a==='inst'){st={inst:v,year:null,open:null}}
  else if(a==='year'){st.year=v;st.open=null}
  else if(a==='exam'){st.open=(st.open===v?null:v)}
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

function mount(){
  if(document.getElementById('em-style'))return;
  var s=document.createElement('style');s.id='em-style';s.textContent=EM_CSS+EM_RAIL;document.head.appendChild(s);
  var tabs=document.querySelector('.tabs');
  var tmp=document.createElement('div');tmp.innerHTML=EM_BTN.trim();var b=tmp.firstChild;
  var trash=tabs&&tabs.querySelector('[data-adm-tab="tab-trash"]');
  if(tabs){trash?tabs.insertBefore(b,trash):tabs.appendChild(b)}
  var tmp2=document.createElement('div');tmp2.innerHTML=EM_PANEL.trim();var p=tmp2.firstChild;
  var g=document.getElementById('tab-gallery');
  if(g&&g.parentNode)g.parentNode.insertBefore(p,g);else document.body.appendChild(p);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
