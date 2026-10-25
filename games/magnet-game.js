/* ===== Білім Аралы — «Притянет ли магнит: Мастерская» (v3) =====
   Естествознание, 1 класс (цели 1.5.6.1, 1.5.6.2 приказа №399): что притягивает магнит. Уровни: притянет или нет → найди / выбери всё → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'workshop',icons:['🧲','🔑','🍎']};
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
function initMagnetGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 8 предметов из программы: ключ, гаечный ключ, шестерёнка, молоток — притягиваются; книга, яблоко, шарик, банан — нет */
    var YES = [['🔑','key',true],['🔧','wrench',true],['⚙️','gear',true],['🔨','hammer',true]];
    var NO = [['📖','book',false],['🍎','apple',false],['🎈','balloon',false],['🍌','banana',false]];
    var ALL = YES.concat(NO);
    function yn(k){ var m = msgs(); return k === 'yes' ? (m.btn_attracts || 'Attracts') : (m.btn_not_attracts || "Doesn't attract"); }

    (function(){
      if(document.getElementById('mxmg-css')) return;
      var s = document.createElement('style'); s.id = 'mxmg-css';
      s.textContent = ''
      + '.mxmg-row{display:flex;align-items:center;justify-content:center;gap:10px;}'
      + '.mxmg-mag{font-size:4.2rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxmg-arrow{font:800 2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
      + '.mxmg-item{display:flex;flex-direction:column;align-items:center;justify-content:center;width:118px;height:118px;border-radius:24px;background:rgba(255,255,255,.88);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:3.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxmg-item b{font:800 .95rem "Baloo 2",sans-serif;color:#25324A;margin-top:2px;text-align:center;}'
      + '.mxmg-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxmg-grid{display:grid;grid-template-columns:repeat(3,92px);gap:10px;justify-content:center;}'
      + '.mxmg-c{height:92px;border-radius:20px;border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.4rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxmg-c b{font:800 .72rem "Baloo 2",sans-serif;color:#25324A;margin-top:3px;}'
      + '.mxmg-c.on{border-color:#33C28A;background:#E8FFF3;transform:translateY(-3px);box-shadow:0 8px 0 rgba(0,0,0,.2);}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxmg-mag,.mxmg-item,.mxmg-c{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(it){
      var y = it[2];
      return { hintSay:['f:n_' + it[1], y ? 'f:magyes' : 'f:magno'], hint:function(el){ el.innerHTML = '<div class="mxmg-row"><span class="mxmg-mag">🧲</span><span class="mxmg-arrow">' + (y ? '←' : '✖') + '</span><span class="mxmg-mag">' + it[0] + '</span></div><div class="mxmg-info">' + F()[y ? 'magyes' : 'magno'] + '</div>'; } };
    }
    function card(it){ return function(el){ el.innerHTML = '<div class="mxmg-row"><span class="mxmg-mag">🧲</span><span class="mxmg-arrow">?</span><div class="mxmg-item"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div></div>'; }; }
    /* ⭐: притянет ли магнит */
    function askTask(it){
      var h = hintOf(it), o = shuffle(['yes','no']).map(function(k){ return { v:k, h:'<span class="nm">' + yn(k) + '</span>' }; });
      return S('a' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'magnetq'}), ans:it[2] ? 'yes' : 'no', layout:'wide', opts:o, field:card(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: найди, что притянет / не притянет магнит */
    function findTask(want, it){
      var pool = shuffle(ALL.filter(function(x){ return x[2] !== want; })).slice(0, 3), set = shuffle([it].concat(pool)), h = hintOf(it);
      return S('f' + want + it[0], { expr:'', say:V.tpl('q', {k:want ? 'findmagnet' : 'findnotmagnet'}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxmg-row"><span class="mxmg-mag">🧲</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: выбери всё, что притянет магнит (три притягиваются среди шести) */
    function pickTask(){
      var set = shuffle(shuffle(YES).slice(0, 3).concat(shuffle(NO).slice(0, 3)));
      return S('p' + set.map(function(x){ return x[0]; }).join(''), {
        expr:'', say:V.tpl('q', {k:'pickmagnet'}), ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxmg-row" style="margin-bottom:10px"><span class="mxmg-mag">🧲</span></div><div class="mxmg-grid">' + set.map(function(x, i){ return '<button type="button" class="mxmg-c" data-k="' + x[1] + '" style="animation-delay:' + (i*.05) + 's"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></button>'; }).join('') + '</div>';
          var cards = [].slice.call(el.querySelectorAll('.mxmg-c')), chosen = {};
          cards.forEach(function(c){ c.addEventListener('click', function(){ if(task._done) return; var k = c.getAttribute('data-k'); chosen[k] = !chosen[k]; c.classList.toggle('on', chosen[k]); X.sfx.tap(chosen[k] ? 2 : 1); }); });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '16px'; go.textContent = '✔'; el.appendChild(go);
          function check(){ if(task._done) return; task._done = true; var ok = set.every(function(x){ return !!chosen[x[1]] === x[2]; }); task.submit(ok ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ set.forEach(function(x, i){ var want = wrong ? false : x[2]; if(!!chosen[x[1]] !== want) cards[i].click(); }); check(); };
        },
        hintSay:['f:magyes'], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxmg-row"><span class="mxmg-mag">🧲</span><span class="mxmg-arrow">←</span></div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">' + YES.map(function(x){ return '<div class="mxmg-item" style="width:70px;height:78px;font-size:2rem;"><span>' + x[0] + '</span><b style="font-size:.62rem">' + NM(x[1]) + '</b></div>'; }).join('') + '</div><div class="mxmg-info">' + F().magyes + '</div>'; }
      });
    }
    /* ⭐⭐⭐: разложи шесть предметов: притянет или нет */
    function sortTask(){
      var items = shuffle(shuffle(YES).slice(0, 3).concat(shuffle(NO).slice(0, 3))).map(function(x){ return { h:x[0], k:x[2] ? 'yes' : 'no', id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortmagnet'}), hintSay:['f:magyes', 'f:magno'],
        buckets:[{ k:'yes', name:yn('yes'), icon:'🧲', c1:'#FF6B5B', c2:'#D63C3C' }, { k:'no', name:yn('no'), icon:'🚫', c1:'#9AA7BD', c2:'#6B7A94' }]
      }));
    }

    function L1(){ return askTask(pick(ALL)); }
    function L2(){ return Math.random() < .5 ? pickTask() : (function(){ var w = Math.random() < .6, it = pick(w ? YES : NO); return findTask(w, it); })(); }
    function L3(){ var r = Math.random(); return r < .6 ? sortTask() : r < .8 ? pickTask() : askTask(pick(ALL)); }

    M.run({ root:containerId, key:'magnet', need:10, theme:'workshop', levels:[L1,L2,L3] });
  });
}
