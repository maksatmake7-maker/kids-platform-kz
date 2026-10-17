/* ===== Білім Аралы — «Что нужно ребёнку: Домик Барсика» (v3) =====
   Естествознание, 1 класс (цель 1.2.3.3 приказа №399): питание и отдых нужны для роста. Уровни: нужно или нет → питание, отдых или не нужно → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sunset',icons:['🍎','😴','👦']};
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
function initHumanNeedsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 10 предметов из программы: питание и отдых нужны для роста, остальное — нет */
    var NEED = [['🍎','apple','food'],['🥛','milk','food'],['😴','sleep','rest'],['🛏️','bed','rest']];
    var NOT = [['🎮','console','not'],['🧸','toy','not'],['⚽','ball','not'],['🚗','car','not'],['🎈','balloon','not'],['🎩','hat','not']];
    var ALL = NEED.concat(NOT);
    var CATICON = { food:'🍽️', rest:'🛌', not:'❌' };
    var CATSAY = { food:'f:foodsay', rest:'f:restsay', not:'f:notkidsay' };
    function yn(k){ var m = msgs(); return k === 'yes' ? (m.btn_needed || 'Needed') : (m.btn_not_needed || 'Not needed'); }
    function cat(k){ return F()['cat_' + k]; }

    (function(){
      if(document.getElementById('mxhn-css')) return;
      var s = document.createElement('style'); s.id = 'mxhn-css';
      s.textContent = ''
      + '.mxhn-row{display:flex;align-items:center;justify-content:center;gap:10px;}'
      + '.mxhn-kid{font-size:4.2rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxhn-arrow{font:800 2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
      + '.mxhn-item{display:flex;flex-direction:column;align-items:center;justify-content:center;width:118px;height:118px;border-radius:24px;background:rgba(255,255,255,.86);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:3.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxhn-item b{font:800 1rem "Baloo 2",sans-serif;color:#25324A;margin-top:2px;}'
      + '.mxhn-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxhn-grid{display:grid;grid-template-columns:repeat(3,92px);gap:10px;justify-content:center;}'
      + '.mxhn-c{height:92px;border-radius:20px;border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.4rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxhn-c b{font:800 .72rem "Baloo 2",sans-serif;color:#25324A;margin-top:3px;}'
      + '.mxhn-c.on{border-color:#33C28A;background:#E8FFF3;transform:translateY(-3px);box-shadow:0 8px 0 rgba(0,0,0,.2);}'
      + '.mxs .mxs-balloon.wide{width:112px;}.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}.mxhn-o{display:flex;flex-direction:column;align-items:center;line-height:1.05;}.mxhn-o i{font-style:normal;font-size:1.7rem;}.mxhn-o b{font:800 .85rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxhn-kid,.mxhn-item,.mxhn-c{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(it){
      var k = it[2], need = k !== 'not';
      return { hintSay:['f:n_' + it[1], need ? 'f:' + (k === 'food' ? 'foodsay' : 'restsay') : 'f:notkidsay', 'f:kidsay'],
        hint:function(el){ el.innerHTML = '<div class="mxhn-row"><span class="mxhn-kid">👦</span><span class="mxhn-arrow">' + (need ? '←' : '✖') + '</span><span class="mxhn-kid">' + it[0] + '</span></div><div class="mxhn-info">' + F()[need ? (k === 'food' ? 'foodsay' : 'restsay') : 'notkidsay'] + '</div><div class="mxhn-info">' + F().kidsay + '</div>'; } };
    }
    function card(it){ return function(el){ el.innerHTML = '<div class="mxhn-row"><span class="mxhn-kid">👦</span><span class="mxhn-arrow">←</span><div class="mxhn-item"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div></div>'; }; }
    /* ⭐: нужно ли это ребёнку, чтобы расти */
    function askTask(it){
      var h = hintOf(it), o = shuffle(['yes','no']).map(function(k){ return { v:k, h:'<span class="nm">' + yn(k) + '</span>' }; });
      return S('a' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'needkid'}), ans:it[2] !== 'not' ? 'yes' : 'no', layout:'wide', opts:o, field:card(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: питание, отдых или не нужно */
    function catTask(it){
      var h = hintOf(it), o = shuffle(['food','rest','not']).map(function(k){ return { v:k, h:'<span class="mxhn-o"><i>' + CATICON[k] + '</i><b>' + cat(k) + '</b></span>' }; });
      return S('c' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'needkid'}), ans:it[2], layout:'wide', opts:o, field:card(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: выбери всё, что нужно ребёнку (три нужных среди шести) */
    function pickTask(){
      var set = shuffle(shuffle(NEED).slice(0, 3).concat(shuffle(NOT).slice(0, 3)));
      return S('p' + set.map(function(x){ return x[0]; }).join(''), {
        expr:'', say:V.tpl('q', {k:'pickkid'}), ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxhn-row" style="margin-bottom:10px"><span class="mxhn-kid">👦</span></div><div class="mxhn-grid">' + set.map(function(x, i){ return '<button type="button" class="mxhn-c" data-k="' + x[1] + '" style="animation-delay:' + (i*.05) + 's"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></button>'; }).join('') + '</div>';
          var cards = [].slice.call(el.querySelectorAll('.mxhn-c')), chosen = {};
          cards.forEach(function(c){ c.addEventListener('click', function(){ if(task._done) return; var k = c.getAttribute('data-k'); chosen[k] = !chosen[k]; c.classList.toggle('on', chosen[k]); X.sfx.tap(chosen[k] ? 2 : 1); }); });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '16px'; go.textContent = '✔'; el.appendChild(go);
          function check(){ if(task._done) return; task._done = true; var ok = set.every(function(x){ return !!chosen[x[1]] === (x[2] !== 'not'); }); task.submit(ok ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ set.forEach(function(x, i){ var want = wrong ? false : x[2] !== 'not'; if(!!chosen[x[1]] !== want) cards[i].click(); }); check(); };
        },
        hintSay:['f:kidsay'], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxhn-row"><span class="mxhn-kid">👦</span><span class="mxhn-arrow">←</span></div><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' + NEED.map(function(x){ return '<div class="mxhn-item" style="width:76px;height:84px;font-size:2.2rem;"><span>' + x[0] + '</span><b style="font-size:.68rem">' + NM(x[1]) + '</b></div>'; }).join('') + '</div><div class="mxhn-info">' + F().kidsay + '</div>'; }
      });
    }
    /* ⭐⭐⭐: разложи шесть предметов: питание, отдых, не нужно */
    function sortTask(){
      var items = [];
      ['food','rest','not'].forEach(function(k){ shuffle(ALL.filter(function(x){ return x[2] === k; })).slice(0, 2).forEach(function(x){ items.push({ h:x[0], k:k, id:x[0] }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortkid'}), hintSay:['f:foodsay', 'f:restsay', 'f:notkidsay'],
        buckets:[{ k:'food', name:cat('food'), icon:CATICON.food, c1:'#FFB454', c2:'#E8832F' }, { k:'rest', name:cat('rest'), icon:CATICON.rest, c1:'#B58CFF', c2:'#7E5BD6' }, { k:'not', name:cat('not'), icon:CATICON.not, c1:'#9AA7BD', c2:'#6B7A94' }]
      }));
    }

    function L1(){ return askTask(pick(ALL)); }
    function L2(){ return Math.random() < .5 ? pickTask() : catTask(pick(ALL)); }
    function L3(){ var r = Math.random(); return r < .6 ? sortTask() : r < .8 ? catTask(pick(ALL)) : pickTask(); }

    M.run({ root:containerId, key:'humanneeds', need:10, theme:'sunset', levels:[L1,L2,L3] });
  });
}
