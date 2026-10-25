/* ===== Білім Аралы — «Космос и время: Ракета Барсика» (v3) =====
   Естествознание, 1 класс (цели 1.4.2.2, 1.4.3.2 приказа №399): приборы для изучения космоса и средства измерения времени. Уровни: для чего нужен → найди среди четырёх → загадка / разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'space',icons:['🚀','🔭','⏰']};
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
function initSpaceTimeGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    /* 6 понятий из программы: приборы для изучения космоса и средства измерения времени */
    var IT = [['🚀','rocket','space'],['🔭','telescope','space'],['🛰️','satellite','space'],['⏰','clock','time'],['📅','calendar','time'],['⏳','hourglass','time']];
    var KINDS = ['space','time'];
    var ICON = { space:'🌌', time:'⌛' };
    var SAY = { space:'spacesay', time:'timesay' };

    (function(){
      if(document.getElementById('mxst-css')) return;
      var s = document.createElement('style'); s.id = 'mxst-css';
      s.textContent = ''
      + '.mxst-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:158px;height:140px;border-radius:26px;background:rgba(255,255,255,.9);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxst-card b{font:800 1.1rem "Baloo 2",sans-serif;color:#25324A;text-align:center;}'
      + '.mxst-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxst-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxst-scene{display:flex;align-items:center;justify-content:center;gap:12px;width:min(100%,300px);height:120px;border-radius:26px;background:linear-gradient(#2A2F6B,#4B3F8F);box-shadow:inset 0 -8px 0 rgba(0,0,0,.2),0 6px 0 rgba(0,0,0,.2);font-size:3.2rem;animation:mxIn .4s backwards;}'
      + '.mxst-scene .big{font-size:4.6rem;}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon.wide .b .nm{font-size:.95rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon.wide .b .st{display:flex;flex-direction:column;align-items:center;line-height:1.05;}.st i{font-style:normal;font-size:1.7rem;}.st b{font:800 .8rem "Baloo 2",sans-serif;padding:0 3px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxst-card,.mxst-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    function useLbl(k){ return F()['use_' + k]; }
    function hintOf(it){
      return { hintSay:['f:n_' + it[1], 'f:fact_' + it[1], 'f:' + SAY[it[2]]], hint:function(el){ el.innerHTML = '<div class="mxst-info"><span class="e">' + it[0] + '</span><span>' + NM(it[1]) + '</span></div><div class="mxst-info">' + F()['fact_' + it[1]] + '</div><div class="mxst-info"><span class="e">' + ICON[it[2]] + '</span><span>' + F()[SAY[it[2]]] + '</span></div>'; } };
    }
    function cardF(it){ return function(el){ el.innerHTML = '<div class="mxst-card"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div>'; }; }
    /* ⭐: для чего это нужно — космос или время */
    function useTask(it){
      var h = hintOf(it), o = shuffle(KINDS).map(function(k){ return { v:k, h:'<span class="st"><i>' + ICON[k] + '</i><b>' + useLbl(k) + '</b></span>' }; });
      return S('u' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'usewhat'}), ans:it[2], layout:'wide', opts:o, field:cardF(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди по названию среди четырёх */
    function findName(it){
      var set = shuffle([it].concat(shuffle(IT.filter(function(x){ return x !== it; })).slice(0, 3))), h = hintOf(it);
      return S('n' + it[0], { expr:'<span class="mxst-card" style="width:auto;height:auto;padding:4px 18px;font-size:1.5rem;font-weight:800;box-shadow:0 4px 0 rgba(0,0,0,.14)">' + NM(it[1]).toUpperCase() + '</span>', small:true, say:V.tpl('findname', {k:it[1]}), cap:F().findit, ans:it[1], layout:'wide',
        opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди, чем измеряют время / изучают космос */
    function findKind(it){
      var k = it[2], other = k === 'space' ? 'time' : 'space', pool = shuffle(IT.filter(function(x){ return x[2] === other; })).slice(0, 3), set = shuffle([it].concat(pool)), h = hintOf(it);
      return S('k' + k + it[0], { expr:'', say:V.tpl('q', {k:k === 'space' ? 'findspace' : 'findtime'}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxst-scene"><span class="big">' + ICON[k] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: загадка — что это (вопрос про работу прибора) */
    function riddle(it){
      var set = shuffle([it].concat(shuffle(IT.filter(function(x){ return x !== it; })).slice(0, 3))), h = hintOf(it);
      return S('r' + it[0], { expr:'', say:V.tpl('q', {k:'q_' + it[1]}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxst-scene"><span class="big">❓</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть приборов: космос и время */
    function sortTask(){
      var items = shuffle(IT).map(function(x){ return { h:x[0], k:x[2], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortst'}), hintSay:['f:spacesay', 'f:timesay'],
        buckets:[{ k:'space', name:F().cat_space, icon:ICON.space, c1:'#7E6BD6', c2:'#4B3F8F' }, { k:'time', name:F().cat_time, icon:ICON.time, c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    function L1(){ return useTask(pick(IT)); }
    function L2(){ return Math.random() < .5 ? findName(pick(IT)) : findKind(pick(IT)); }
    function L3(){ var r = Math.random(); return r < .4 ? riddle(pick(IT)) : r < .8 ? sortTask() : findKind(pick(IT)); }

    M.run({ root:containerId, key:'spacetime', need:10, theme:'space', levels:[L1,L2,L3] });
  });
}
