/* ===== Білім Аралы — «Как звери готовятся к зиме: Осенний лес» (v3) =====
   Естествознание, 1 класс (цель 1.2.2.3 приказа №399): перелёт птиц, запас корма, спячка. Уровни: животное → кто улетает/запасает/спит → разложи по способам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'autumn',icons:['🦢','🐿️','🐻']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initAdaptationGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function NM(k){ var F = V.F[V.lang()]; return F['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 9 животных из программы: перелёт птиц, запас корма, спячка */
    var AN = [['🦢','swan','migration'],['🦆','duck','migration'],['🐦','bird','migration'],['🐿️','squirrel','foodstore'],['🐹','hamster','foodstore'],['🐜','ant','foodstore'],['🐻','bear','hibernate'],['🦔','hedgehog','hibernate'],['🦇','bat','hibernate']];
    var STR = ['migration','foodstore','hibernate'];
    var ICON = { migration:'✈️', foodstore:'🌰', hibernate:'😴' };
    var WHO = { migration:'whomigrate', foodstore:'whostore', hibernate:'whosleep' };
    function btn(k){ var m = msgs(); return k === 'migration' ? (m.btn_migration || 'Migrates') : k === 'foodstore' ? (m.btn_foodstore || 'Stores food') : (m.btn_hibernate || 'Hibernates'); }

    (function(){
      if(document.getElementById('mxad-css')) return;
      var s = document.createElement('style'); s.id = 'mxad-css';
      s.textContent = ''
      + '.mxad-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:158px;height:140px;border-radius:26px;background:rgba(255,255,255,.84);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxad-card b{font:800 1.15rem "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxad-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;}'
      + '.mxad-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxad-scene{display:flex;align-items:center;justify-content:center;gap:8px;width:min(100%,300px);height:110px;border-radius:26px;background:linear-gradient(#F6C27A,#E59A4B);box-shadow:inset 0 -8px 0 rgba(0,0,0,.12),0 6px 0 rgba(0,0,0,.16);font-size:3rem;animation:mxIn .4s backwards;}'
      + '.mxs .mxs-balloon.wide{width:104px;}.mxs-balloon.wide .b .ad{display:flex;flex-direction:column;align-items:center;line-height:1.05;}.ad i{font-style:normal;font-size:1.6rem;}.ad b{font:800 .72rem "Baloo 2",sans-serif;padding:0 3px;text-align:center;}'
      + '.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxad-card,.mxad-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(a){
      var k = a[2];
      return { hintSay:['f:n_' + a[1], 'f:a_' + k], hint:function(el){ el.innerHTML = '<div class="mxad-info"><span class="e">' + a[0] + '</span><span>→ ' + ICON[k] + ' ' + btn(k) + '</span></div><div class="mxad-info">' + V.F[V.lang()]['a_' + k] + '</div>'; } };
    }
    function askTask(a){
      var h = hintOf(a), o = shuffle(STR).map(function(k){ return { v:k, h:'<span class="ad"><i>' + ICON[k] + '</i><b>' + btn(k) + '</b></span>' }; });
      return S('a' + a[0], {
        expr:'', say:V.tpl('named', {n:a[1], q:'adaptq'}), ans:a[2], layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxad-card"><span>' + a[0] + '</span><b>' + NM(a[1]) + '</b></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint
      });
    }
    /* «кто улетает / запасает / спит?» — выбери животное */
    function whoTask(k, a){
      var pool = shuffle(AN.filter(function(x){ return x[2] !== k; })).slice(0, 3), set = shuffle([a].concat(pool)), h = hintOf(a);
      var sc = { migration:['🍂','☁️','🍂'], foodstore:['🍂','🌰','🍄'], hibernate:['🍂','❄️','🌨️'] }[k];
      return S('w' + k + a[0], {
        expr:'', say:V.tpl('q', {k:WHO[k]}), ans:a[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxad-scene"><span>' + sc[0] + '</span><span style="font-size:3.6rem">' + ICON[k] + '</span><span>' + sc[2] + '</span></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint
      });
    }
    function sortTask(){
      var items = [];
      STR.forEach(function(k){ shuffle(AN.filter(function(x){ return x[2] === k; })).slice(0, 2).forEach(function(x){ items.push({ h:x[0], k:k, id:x[0] }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortwinter'}), hintSay:['f:a_migration', 'f:a_foodstore', 'f:a_hibernate'],
        buckets:[{ k:'migration', name:btn('migration'), icon:ICON.migration, c1:'#5EC7FF', c2:'#2F9BE6' }, { k:'foodstore', name:btn('foodstore'), icon:ICON.foodstore, c1:'#FFB454', c2:'#E8832F' }, { k:'hibernate', name:btn('hibernate'), icon:ICON.hibernate, c1:'#B58CFF', c2:'#7E5BD6' }]
      }));
    }

    /* ⭐: как это животное готовится к зиме */
    function L1(){ return askTask(pick(AN)); }
    /* ⭐⭐: кто улетает / запасает / спит — найди животное */
    function L2(){ var a = pick(AN); return whoTask(a[2], a); }
    /* ⭐⭐⭐: разложи 6 животных по трём способам */
    function L3(){ return Math.random() < .2 ? askTask(pick(AN)) : sortTask(); }

    M.run({ root:containerId, key:'adaptation', need:10, theme:'autumn', levels:[L1,L2,L3] });
  });
}
