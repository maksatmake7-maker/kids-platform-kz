/* ===== Білім Аралы — «Экстренные службы: Спасатели» (v3) =====
   Познание мира, 1 класс (цель 1.1.4.6 приказа №399): службы экстренной помощи Казахстана — 101 пожарная, 102 полиция, 103 скорая помощь. Уровни: служба → номер → случай → кого позвать → разложи случаи по службам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sunset',icons:['🚒','🚓','🚑']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initEmergencyGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var TR = {'А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z','И':'i','Й':'j','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r','С':'s','Т':'t','У':'u','Ф':'f','Х':'h','Ц':'c','Ч':'ch','Ш':'sh','Щ':'shch','Ы':'y','Э':'ye','Ю':'yu','Я':'ya'};
    var TW = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
    function LK(l){ return 'f:r_l_' + TR[l]; }
    function WK(w){ return 'f:r_w_' + w.toLowerCase().replace(/-/g, '').split('').map(function(c){ return TW[c]; }).join(''); }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function cap1(w){ return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }
    /* реальные номера служб Казахстана: 101 — пожарная, 102 — полиция, 103 — скорая помощь */
    var SV = { fire:['🚒','101'], police:['🚓','102'], amb:['🚑','103'] };
    var KEYS = ['fire','police','amb'];
    var COL = { fire:['#FF8A5B','#E5503C'], police:['#6EC1FF','#2F7BE6'], amb:['#7AD36B','#3FA84A'] };
    /* случаи (собственные, простые): [id, служба, значок, текст] */
    var SIT = [[1,'fire','🔥','В квартире огонь и дым'],[2,'fire','🌲','Загорелся лес'],[3,'police','🧒','Ты потерялся на улице'],[4,'police','🚪','Чужой ломает дверь'],[5,'amb','🤕','Человек упал, ему больно'],[6,'amb','😵','Человеку стало плохо']];

    (function(){
      if(document.getElementById('mxem-css')) return;
      var s = document.createElement('style'); s.id = 'mxem-css';
      s.textContent = ''
      + '.mxem-big{display:flex;align-items:center;justify-content:center;width:150px;height:116px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:5rem;line-height:1;margin:0 auto;animation:mxIn .4s backwards;}'
      + '.mxem-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;padding:14px 20px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.3rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;animation:mxIn .4s backwards;}.mxem-card .e{font-size:3rem;line-height:1;}'
      + '.mxem-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.05rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxem-info b{font-size:1.7rem;color:#E5503C;}'
      + '.mxs-balloon .b .lt{font:800 2.5rem "Baloo 2",sans-serif;}.mxs-balloon .b .nm{font-size:1.5rem!important;font-weight:800;}'
      + '@media (prefers-reduced-motion:reduce){.mxem-big,.mxem-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(k){
      return { hintSay:['f:svnum_' + k], hint:function(el){ el.innerHTML = '<div class="mxem-big" style="height:96px;font-size:4rem">' + SV[k][0] + '</div><div class="mxem-info"><span>' + F()['sv_' + k] + '</span><b>' + SV[k][1] + '</b></div>'; } };
    }
    function numOpts(n){
      var pool = ['101','102','103','104'], ans = null;
      return pool.slice(0, n);
    }
    function nopts(k, n){
      var all = ['101','102','103'].concat(n === 4 ? ['104'] : []);
      return shuffle(all).map(function(v){ return { v:v, h:'<span class="nm">' + v + '</span>' }; });
    }
    /* служба → номер */
    function numTask(k, n){
      var h = hintOf(k);
      return S('n' + k + n, { expr:'', say:V.tpl('seq', {list:['f:sv_' + k, 'f:svq']}), cap:F().svq, ans:SV[k][1], layout:'wide', opts:nopts(k, n),
        field:function(el){ el.innerHTML = '<div class="mxem-big">' + SV[k][0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* случай → какую службу позвать (значок машины) */
    function whoTask(s){
      var k = s[1], h = hintOf(k);
      return S('w' + s[0], { expr:'', say:V.tpl('seq', {list:['f:r_sit_' + s[0], 'f:sitq']}), cap:F().sitq, ans:k, layout:'wide',
        opts:shuffle(KEYS).map(function(x){ return { v:x, h:'<span class="lt">' + SV[x][0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxem-card"><span class="e">' + s[2] + '</span>' + s[3] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* случай → номер */
    function dialTask(s){
      var k = s[1], h = hintOf(k);
      return S('d' + s[0], { expr:'', say:V.tpl('seq', {list:['f:r_sit_' + s[0], 'f:sitnum']}), cap:F().sitnum, ans:SV[k][1], layout:'wide', opts:nopts(k, 4),
        field:function(el){ el.innerHTML = '<div class="mxem-card"><span class="e">' + s[2] + '</span>' + s[3] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* раздай шесть случаев по трём службам */
    function sortTask(){
      var items = shuffle(SIT.map(function(s){ return { h:s[3], k:s[1], id:String(s[0]) }; }));
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'svsort'}), hintSay:['f:svnum_fire', 'f:svnum_police', 'f:svnum_amb'],
        buckets:KEYS.map(function(k){ return { k:k, name:SV[k][1], icon:SV[k][0], c1:COL[k][0], c2:COL[k][1] }; }) }));
    }

    function L1(){ return numTask(pick(KEYS), 3); }
    function L2(){ var r = Math.random(); return r < .4 ? numTask(pick(KEYS), 4) : whoTask(pick(SIT)); }
    function L3(){ var r = Math.random(); return r < .4 ? dialTask(pick(SIT)) : r < .7 ? sortTask() : whoTask(pick(SIT)); }

    M.run({ root:containerId, key:'emergency', need:10, theme:'sunset', levels:[L1,L2,L3] });
  });
}
