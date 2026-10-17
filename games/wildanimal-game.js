/* ===== Білім Аралы — «Дикое или домашнее: Ферма и лес» (v3) =====
   Естествознание, 1 класс (цель 1.2.2.2 приказа №399): дикие и домашние животные. Уровни: животное → кто здесь живёт → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'farm',icons:['🐄','🦊','🏡']};
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
function initWildAnimalGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function NM(k){ var F = V.F[V.lang()]; return F['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 10 животных из программы: 5 диких и 5 домашних */
    var AN = [['🦁','lion','wild'],['🐺','wolf','wild'],['🦊','fox','wild'],['🐻','bear','wild'],['🦌','deer','wild'],['🐄','cow','dom'],['🐑','sheep','dom'],['🐔','hen','dom'],['🐕','dog','dom'],['🐈','cat','dom']];
    function btn(k){ var m = msgs(); return k === 'wild' ? (m.btn_wildanimal || 'Wild') : (m.btn_domestic || 'Domestic'); }

    (function(){
      if(document.getElementById('mxwa-css')) return;
      var s = document.createElement('style'); s.id = 'mxwa-css';
      s.textContent = ''
      + '.mxwa-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:158px;height:140px;border-radius:26px;background:rgba(255,255,255,.82);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxwa-card b{font:800 1.15rem "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxwa-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;}'
      + '.mxwa-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxwa-place{display:flex;align-items:flex-end;justify-content:center;gap:4px;width:min(100%,300px);height:130px;border-radius:26px;box-shadow:inset 0 -8px 0 rgba(0,0,0,.12),0 6px 0 rgba(0,0,0,.16);font-size:3.2rem;line-height:1;padding-bottom:12px;animation:mxIn .4s backwards;}'
      + '.mxwa-place .big{font-size:4.6rem;}'
      + '.mxs .mxs-balloon.wide{width:150px;}.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxwa-card,.mxwa-place{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(a){
      var say = a[2] === 'wild' ? 'wildansay' : 'domsay';
      return { hintSay:['f:' + say], hint:function(el){ el.innerHTML = '<div class="mxwa-info"><span class="e">' + a[0] + '</span><span>→ ' + btn(a[2]) + '</span></div><div class="mxwa-info">' + V.F[V.lang()][say] + '</div>'; } };
    }
    function askTask(a){
      var h = hintOf(a), o = shuffle(['wild','dom']).map(function(k){ return { v:k, h:'<span class="nm">' + btn(k) + '</span>' }; });
      return S('a' + a[0], {
        expr:'', say:V.tpl('named', {n:a[1], q:'wildanimalq'}), ans:a[2], layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxwa-card"><span>' + a[0] + '</span><b>' + NM(a[1]) + '</b></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint
      });
    }
    /* «кто здесь живёт?»: лес или ферма */
    function placeTask(kind, a){
      var pool = shuffle(AN.filter(function(x){ return x[2] !== kind; })).slice(0, 3), set = shuffle([a].concat(pool)), h = hintOf(a);
      var bg = kind === 'wild' ? 'linear-gradient(#9BE08A,#4FB85A)' : 'linear-gradient(#FFE08A,#E0B15A)', sc = kind === 'wild' ? ['🌲','🌳','🌲'] : ['🏡','🌾','🐴'];
      sc = kind === 'wild' ? ['🌲','🌳','🌲'] : ['🌾','🏡','🌾'];
      return S('p' + kind + a[0], {
        expr:'', say:V.tpl('q', {k:'wholives'}), ans:a[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxwa-place" style="background:' + bg + '"><span>' + sc[0] + '</span><span class="big">' + sc[1] + '</span><span>' + sc[2] + '</span></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint
      });
    }
    function sortTask(){
      var nw = pick([2, 3, 3, 4]), wild = shuffle(AN.filter(function(x){ return x[2] === 'wild'; })).slice(0, nw), dom = shuffle(AN.filter(function(x){ return x[2] === 'dom'; })).slice(0, 6 - nw);
      var items = shuffle(wild.concat(dom)).map(function(x){ return { h:x[0], k:x[2], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortanimals'}), hintSay:['f:wildansay', 'f:domsay'],
        buckets:[{ k:'wild', name:btn('wild'), icon:'🌲', c1:'#6BCB77', c2:'#2F9E57' }, { k:'dom', name:btn('dom'), icon:'🏡', c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    /* ⭐: животное — дикое или домашнее */
    function L1(){ return askTask(pick(AN)); }
    /* ⭐⭐: кто живёт в лесу / на ферме */
    function L2(){ var a = pick(AN); return placeTask(a[2], a); }
    /* ⭐⭐⭐: разложи 6 животных */
    function L3(){ return Math.random() < .2 ? askTask(pick(AN)) : sortTask(); }

    M.run({ root:containerId, key:'wildanimal', need:10, theme:'farm', levels:[L1,L2,L3] });
  });
}
