/* ===== Білім Аралы — «Форма Земли: Круглая планета» (v3) =====
   Естествознание, 1 класс (цель 1.4.1.1 приказа №399): Земля круглая, как её модель — глобус. Уровни: круглый или нет → найди / выбери всё → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'night',icons:['🌍','⚽','🎲']};
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
function initEarthShapeGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 8 предметов из программы: глобус (модель Земли), мяч, апельсин, шарик — круглые; книга, кубик, линейка, угольник — нет */
    var RND = [['🌍','globe',true],['⚽','ball',true],['🍊','orange',true],['🎈','balloon',true]];
    var NOT = [['📖','book',false],['🎲','dice',false],['📏','ruler',false],['📐','triangle',false]];
    var ALL = RND.concat(NOT);
    function yn(k){ var m = msgs(); return k === 'yes' ? (m.btn_round || 'Round, like Earth') : (m.btn_not_round || 'Not round'); }

    (function(){
      if(document.getElementById('mxes-css')) return;
      var s = document.createElement('style'); s.id = 'mxes-css';
      s.textContent = ''
      + '.mxes-row{display:flex;align-items:center;justify-content:center;gap:10px;}'
      + '.mxes-earth{font-size:4.2rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxes-arrow{font:800 2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
      + '.mxes-item{display:flex;flex-direction:column;align-items:center;justify-content:center;width:118px;height:118px;border-radius:24px;background:rgba(255,255,255,.9);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:3.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxes-item b{font:800 .95rem "Baloo 2",sans-serif;color:#25324A;margin-top:2px;text-align:center;}'
      + '.mxes-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxes-grid{display:grid;grid-template-columns:repeat(3,92px);gap:10px;justify-content:center;}'
      + '.mxes-c{height:92px;border-radius:20px;border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.4rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxes-c b{font:800 .72rem "Baloo 2",sans-serif;color:#25324A;margin-top:3px;}'
      + '.mxes-c.on{border-color:#33C28A;background:#E8FFF3;transform:translateY(-3px);box-shadow:0 8px 0 rgba(0,0,0,.2);}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon.wide .b .nm{font-size:.95rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxes-earth,.mxes-item,.mxes-c{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(it){
      var y = it[2];
      return { hintSay:['f:n_' + it[1], y ? 'f:roundsay' : 'f:notroundsay'], hint:function(el){ el.innerHTML = '<div class="mxes-row"><span class="mxes-earth">🌍</span><span class="mxes-arrow">' + (y ? '=' : '≠') + '</span><span class="mxes-earth">' + it[0] + '</span></div><div class="mxes-info">' + F()[y ? 'roundsay' : 'notroundsay'] + '</div>'; } };
    }
    function card(it){ return function(el){ el.innerHTML = '<div class="mxes-row"><span class="mxes-earth">🌍</span><span class="mxes-arrow">?</span><div class="mxes-item"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div></div>'; }; }
    /* ⭐: круглый, как Земля, или нет */
    function askTask(it){
      var h = hintOf(it), o = shuffle(['yes','no']).map(function(k){ return { v:k, h:'<span class="nm">' + yn(k) + '</span>' }; });
      return S('a' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'roundq'}), ans:it[2] ? 'yes' : 'no', layout:'wide', opts:o, field:card(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди предмет, похожий на Землю / не круглый */
    function findTask(want, it){
      var pool = shuffle(ALL.filter(function(x){ return x[2] !== want; })).slice(0, 3), set = shuffle([it].concat(pool)), h = hintOf(it);
      return S('f' + want + it[0], { expr:'', say:V.tpl('q', {k:want ? 'findround' : 'findnotround'}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxes-row"><span class="mxes-earth">🌍</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: выбери всё, что круглое, как Земля (три круглых среди шести) */
    function pickTask(){
      var set = shuffle(shuffle(RND).slice(0, 3).concat(shuffle(NOT).slice(0, 3)));
      return S('p' + set.map(function(x){ return x[0]; }).join(''), {
        expr:'', say:V.tpl('q', {k:'pickround'}), ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxes-row" style="margin-bottom:10px"><span class="mxes-earth">🌍</span></div><div class="mxes-grid">' + set.map(function(x, i){ return '<button type="button" class="mxes-c" data-k="' + x[1] + '" style="animation-delay:' + (i*.05) + 's"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></button>'; }).join('') + '</div>';
          var cards = [].slice.call(el.querySelectorAll('.mxes-c')), chosen = {};
          cards.forEach(function(c){ c.addEventListener('click', function(){ if(task._done) return; var k = c.getAttribute('data-k'); chosen[k] = !chosen[k]; c.classList.toggle('on', chosen[k]); X.sfx.tap(chosen[k] ? 2 : 1); }); });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '16px'; go.textContent = '✔'; el.appendChild(go);
          function check(){ if(task._done) return; task._done = true; var ok = set.every(function(x){ return !!chosen[x[1]] === x[2]; }); task.submit(ok ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ set.forEach(function(x, i){ var want = wrong ? false : x[2]; if(!!chosen[x[1]] !== want) cards[i].click(); }); check(); };
        },
        hintSay:['f:roundsay'], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxes-row"><span class="mxes-earth">🌍</span><span class="mxes-arrow">=</span></div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">' + RND.map(function(x){ return '<div class="mxes-item" style="width:70px;height:78px;font-size:2rem;"><span>' + x[0] + '</span><b style="font-size:.62rem">' + NM(x[1]) + '</b></div>'; }).join('') + '</div><div class="mxes-info">' + F().roundsay + '</div>'; }
      });
    }
    /* ⭐⭐⭐: разложи шесть предметов: круглые и не круглые */
    function sortTask(){
      var items = shuffle(shuffle(RND).slice(0, 3).concat(shuffle(NOT).slice(0, 3))).map(function(x){ return { h:x[0], k:x[2] ? 'yes' : 'no', id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortround'}), hintSay:['f:roundsay', 'f:notroundsay'],
        buckets:[{ k:'yes', name:yn('yes'), icon:'🌍', c1:'#5EC7FF', c2:'#2F9BE6' }, { k:'no', name:yn('no'), icon:'📐', c1:'#FFB454', c2:'#E8832F' }]
      }));
    }

    function L1(){ return askTask(pick(ALL)); }
    function L2(){ var w = Math.random() < .6; return Math.random() < .35 ? pickTask() : findTask(w, pick(w ? RND.slice(1) : NOT)); }
    function L3(){ return Math.random() < .65 ? sortTask() : (Math.random() < .5 ? pickTask() : askTask(pick(ALL))); }

    M.run({ root:containerId, key:'earthshape', need:10, theme:'night', levels:[L1,L2,L3] });
  });
}
