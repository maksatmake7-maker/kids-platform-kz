/* ===== Білім Аралы — «Как это движется: Небо, вода, земля» (v3) =====
   Естествознание, 1 класс (цели 1.5.1.1, 1.5.1.2 приказа №399): летает, плавает, движется по земле. Уровни: как движется → найди среди четырёх → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sky',icons:['✈️','🐟','🚲']};
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
function initMovementGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 9 предметов из программы: летает, плавает, движется по земле */
    var ITEMS = [['🐦','bird','flies'],['✈️','plane','flies'],['🦋','butterfly','flies'],['🐟','fish','swims'],['⛵','boat','swims'],['🚗','car','ground'],['🐕','dog','ground'],['⚽','ball','ground'],['🚲','bike','ground']];
    var KINDS = ['flies','swims','ground'];
    var ICON = { flies:'☁️', swims:'🌊', ground:'🛣️' };
    var SAY = { flies:'flysay', swims:'swimsay', ground:'groundsay' };
    var FIND = { flies:'findfly', swims:'findswim', ground:'findground' };
    function btn(k){ var m = msgs(); return k === 'flies' ? (m.move_flies || 'Flies') : k === 'swims' ? (m.move_swims || 'Swims') : (m.move_ground || 'Moves on ground'); }

    (function(){
      if(document.getElementById('mxmv-css')) return;
      var s = document.createElement('style'); s.id = 'mxmv-css';
      s.textContent = ''
      + '.mxmv-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:158px;height:140px;border-radius:26px;background:rgba(255,255,255,.86);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxmv-card b{font:800 1.15rem "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxmv-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxmv-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxmv-scene{display:flex;align-items:center;justify-content:center;gap:10px;width:min(100%,300px);height:120px;border-radius:26px;box-shadow:inset 0 -8px 0 rgba(0,0,0,.12),0 6px 0 rgba(0,0,0,.16);font-size:3.2rem;animation:mxIn .4s backwards;}'
      + '.mxmv-scene .big{font-size:4.6rem;}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon.wide .b .mv{display:flex;flex-direction:column;align-items:center;line-height:1.05;}.mv i{font-style:normal;font-size:1.7rem;}.mv b{font:800 .8rem "Baloo 2",sans-serif;padding:0 3px;text-align:center;}'
      + '.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxmv-card,.mxmv-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    var BG = { flies:'linear-gradient(#8FD3FF,#C9ECFF)', swims:'linear-gradient(#5EC7FF,#2F8FD8)', ground:'linear-gradient(#CFEFA0,#9CD36B)' };
    function hintOf(it){
      var k = it[2];
      return { hintSay:['f:n_' + it[1], 'f:' + SAY[k]], hint:function(el){ el.innerHTML = '<div class="mxmv-info"><span class="e">' + it[0] + '</span><span>→ ' + ICON[k] + ' ' + btn(k) + '</span></div><div class="mxmv-info">' + F()[SAY[k]] + '</div>'; } };
    }
    /* ⭐: как это движется */
    function askTask(it){
      var h = hintOf(it), o = shuffle(KINDS).map(function(k){ return { v:k, h:'<span class="mv"><i>' + ICON[k] + '</i><b>' + btn(k) + '</b></span>' }; });
      return S('a' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'moveq'}), ans:it[2], layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxmv-card"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди, что летает / плавает / движется по земле */
    function findTask(k, it){
      var pool = shuffle(ITEMS.filter(function(x){ return x[2] !== k; })).slice(0, 3), set = shuffle([it].concat(pool)), h = hintOf(it);
      return S('f' + k + it[0], { expr:'', say:V.tpl('q', {k:FIND[k]}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxmv-scene" style="background:' + BG[k] + '"><span class="big">' + ICON[k] + '</span></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть предметов по трём местам */
    function sortTask(){
      var items = [];
      KINDS.forEach(function(k){ shuffle(ITEMS.filter(function(x){ return x[2] === k; })).slice(0, 2).forEach(function(x){ items.push({ h:x[0], k:k, id:x[0] }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortmove'}), hintSay:['f:flysay', 'f:swimsay', 'f:groundsay'],
        buckets:[{ k:'flies', name:btn('flies'), icon:ICON.flies, c1:'#5EC7FF', c2:'#2F9BE6' }, { k:'swims', name:btn('swims'), icon:ICON.swims, c1:'#4FD6C2', c2:'#1FA894' }, { k:'ground', name:btn('ground'), icon:ICON.ground, c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    function L1(){ return askTask(pick(ITEMS)); }
    function L2(){ var it = pick(ITEMS); return findTask(it[2], it); }
    function L3(){ return Math.random() < .2 ? askTask(pick(ITEMS)) : sortTask(); }

    M.run({ root:containerId, key:'movement', need:10, theme:'sky', levels:[L1,L2,L3] });
  });
}
