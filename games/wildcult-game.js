/* ===== Білім Аралы — «Дикое или культурное: Луг и огород» (v3) =====
   Естествознание, 1 класс (цель 1.2.1.3 приказа №399): дикорастущие и культурные растения. Уровни: растение → найди среди четырёх → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'meadow',icons:['🌼','🥕','🌲']};
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
function initWildCultGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function NM(k){ var F = V.F[V.lang()]; return F['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 10 растений из программы: 5 культурных и 5 дикорастущих */
    var PLANTS = [['🌾','wheat','cult'],['🥕','carrot','cult'],['🍅','tomato','cult'],['🥔','potato','cult'],['🌻','sunflower','cult'],['🌲','spruce','wild'],['🌵','cactus','wild'],['🌿','grass','wild'],['🍀','clover','wild'],['🌼','daisy','wild']];
    function btn(k){ var m = msgs(); return k === 'wild' ? (m.btn_wild || 'Wild') : (m.btn_cultivated || 'Cultivated'); }

    (function(){
      if(document.getElementById('mxwc-css')) return;
      var s = document.createElement('style'); s.id = 'mxwc-css';
      s.textContent = ''
      + '.mxwc-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:158px;height:140px;border-radius:26px;background:rgba(255,255,255,.8);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxwc-card b{font:800 1.15rem "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxwc-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;}'
      + '.mxwc-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxs .mxs-balloon.wide{width:150px;}.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxwc-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function card(p){ return function(el){ el.innerHTML = '<div class="mxwc-card"><span>' + p[0] + '</span><b>' + NM(p[1]) + '</b></div>'; }; }
    function hintOf(p){
      var say = p[2] === 'wild' ? 'f:wildsay' : 'f:cultsay';
      return { hintSay:[say], hintExpr:'', hint:function(el){ el.innerHTML = '<div class="mxwc-info"><span class="e">' + p[0] + '</span><span>→ ' + btn(p[2]) + '</span></div><div class="mxwc-info">' + (V.F[V.lang()][say.slice(2)]) + '</div>'; } };
    }
    function askTask(p){
      var o = shuffle(['wild','cult']).map(function(k){ return { v:k, h:'<span class="nm">' + btn(k) + '</span>' }; });
      var t = { expr:'', say:V.tpl('named', {n:p[1], q:'wildcultq'}), ans:p[2], layout:'wide', opts:o, field:card(p) };
      var h = hintOf(p); t.hintSay = h.hintSay; t.hintExpr = h.hintExpr; t.hint = h.hint;
      return S('a' + p[0], t);
    }
    function findTask(want, p){
      var pool = shuffle(PLANTS.filter(function(x){ return x[2] !== want; })).slice(0, 3), set = shuffle([p].concat(pool));
      var t = { expr:'', say:V.tpl('q', {k:want === 'wild' ? 'findwild' : 'findcult'}), ans:p[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }) };
      var h = hintOf(p); t.hintSay = h.hintSay; t.hintExpr = h.hintExpr; t.hint = h.hint;
      return S('f' + want + p[0], t);
    }
    function sortTask(){
      var nw = pick([2, 3, 3, 4]), wild = shuffle(PLANTS.filter(function(x){ return x[2] === 'wild'; })).slice(0, nw), cult = shuffle(PLANTS.filter(function(x){ return x[2] === 'cult'; })).slice(0, 6 - nw);
      var items = shuffle(wild.concat(cult)).map(function(x){ return { h:x[0], k:x[2], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortplants'}), hintSay:['f:wildsay', 'f:cultsay'],
        buckets:[{ k:'wild', name:btn('wild'), icon:'🌲', c1:'#6BCB77', c2:'#2F9E57' }, { k:'cult', name:btn('cultivated'), icon:'🧺', c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    /* ⭐: растение — дикорастущее или культурное */
    function L1(){ return askTask(pick(PLANTS)); }
    /* ⭐⭐: найди среди четырёх */
    function L2(){ var p = pick(PLANTS); return findTask(p[2], p); }
    /* ⭐⭐⭐: разложи 6 растений по местам */
    function L3(){ return Math.random() < .2 ? askTask(pick(PLANTS)) : sortTask(); }

    M.run({ root:containerId, key:'wildcult', need:10, theme:'meadow', levels:[L1,L2,L3] });
  });
}
