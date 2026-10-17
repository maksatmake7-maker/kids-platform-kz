/* ===== Білім Аралы — «Свет: природный или искусственный» (v3) =====
   Естествознание, 1 класс (цель 1.5.2.2 приказа №399): естественные и искусственные источники света. Уровни: источник света → найди среди четырёх → разложи по местам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'night',icons:['☀️','💡','🔦']};
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
function initLightGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    var ITEMS = [["☀️", "sunny", "nat"], ["🌙", "moon", "nat"], ["⚡", "lightning", "nat"], ["💡", "bulb", "art"], ["🕯️", "candle", "art"], ["🔦", "flashlight", "art"]];
    var KINDS = ["nat", "art"];
    var ICON = {"nat": "🌳", "art": "🏭"}, COL = {"nat": ["#6BCB77", "#2F9E57", "linear-gradient(#CFEFA0,#9CD36B)"], "art": ["#FFB454", "#E8832F", "linear-gradient(#FFE29A,#FFB86B)"]}, SAY = {"nat": "natlsay", "art": "artlsay"}, FINDQ = {"nat": "findnat", "art": "findart"};
    var PICK = null;
    function label(k){ var m = msgs(); return (m[{"nat": "btn_natural", "art": "btn_artificial"}[k]] || {"nat": "Natural", "art": "Artificial"}[k]); }
    function of(k){ return ITEMS.filter(function(x){ return x[2] === k; }); }

    (function(){
      if(document.getElementById('mxbn-css-light')) return;
      var s = document.createElement('style'); s.id = 'mxbn-css-light';
      s.textContent = ''
      + '.mxbn-row{display:flex;align-items:center;justify-content:center;gap:10px;}'
      + '.mxbn-sc{font-size:4.2rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxbn-arrow{font:800 2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
      + '.mxbn-item{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:124px;height:124px;border-radius:24px;background:rgba(255,255,255,.9);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:3.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxbn-item b{font:800 .95rem "Baloo 2",sans-serif;color:#25324A;margin-top:2px;text-align:center;}'
      + '.mxbn-play{position:absolute;right:-12px;top:-12px;width:42px;height:42px;border-radius:50%;border:0;background:#FFC93C;box-shadow:0 4px 0 rgba(0,0,0,.2);font-size:1.3rem;cursor:pointer;padding:0;}'
      + '.mxbn-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxbn-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxbn-grid{display:grid;grid-template-columns:repeat(3,92px);gap:10px;justify-content:center;}'
      + '.mxbn-c{height:92px;border-radius:20px;border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.4rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxbn-c b{font:800 .72rem "Baloo 2",sans-serif;color:#25324A;margin-top:3px;}'
      + '.mxbn-c.on{border-color:#33C28A;background:#E8FFF3;transform:translateY(-3px);box-shadow:0 8px 0 rgba(0,0,0,.2);}'
      + '.mxbn-scene{display:flex;align-items:center;justify-content:center;gap:12px;width:min(100%,300px);height:130px;border-radius:26px;box-shadow:inset 0 -8px 0 rgba(0,0,0,.14),0 6px 0 rgba(0,0,0,.18);font-size:3.2rem;animation:mxIn .4s backwards;}'
      + '.mxs .mxs-balloon.wide{width:128px;}.mxs-balloon.wide .b .nm{font-size:.95rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxbn-sc,.mxbn-item,.mxbn-c,.mxbn-scene{animation:none}}'
      + '';
      document.head.appendChild(s);
    })();
    function cardExtra(it){ return ''; }
    function afterCard(el, it){}
    function hintOf(it){
      var k = it[2];
      return { hintSay:['f:n_' + it[1], 'f:' + SAY[k]], hint:function(el){ el.innerHTML = '<div class="mxbn-info"><span class="e">' + it[0] + '</span><span>→ ' + ICON[k] + ' ' + label(k) + '</span></div><div class="mxbn-info">' + F()[SAY[k]] + '</div>'; } };
    }
    function card(it){ return function(el, X){ el.innerHTML = '<div class="mxbn-row"><span class="mxbn-sc">✨</span><span class="mxbn-arrow">?</span><div class="mxbn-item"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b>' + cardExtra(it) + '</div></div>'; afterCard(el, it); }; }
    function opt2(){ return shuffle(KINDS).map(function(k){ return { v:k, h:'<span class="nm">' + label(k) + '</span>' }; }); }
    function askTask(it){
      var h = hintOf(it);
      return S('a' + it[0], { expr:'', say:V.tpl('named', {n:it[1], q:'lightq'}), ans:it[2], layout:'wide', opts:opt2(), field:card(it), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    function findTask(k, it){
      var other = KINDS.filter(function(x){ return x !== k; })[0], pool = shuffle(of(other)).slice(0, 3), set = shuffle([it].concat(pool)), h = hintOf(it);
      return S('f' + k + it[0], { expr:'', say:V.tpl('q', {k:FINDQ[k]}), ans:it[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="em">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxbn-scene" style="background:' + COL[k][2] + '"><span style="font-size:4.4rem">' + ICON[k] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    function pickTask(){
      var pk = PICK.kind, oth = KINDS.filter(function(x){ return x !== pk; })[0];
      var set = shuffle(shuffle(of(pk)).slice(0, 3).concat(shuffle(of(oth)).slice(0, 3)));
      return S('p' + set.map(function(x){ return x[0]; }).join(''), {
        expr:'', say:V.tpl('q', {k:PICK.q}), ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxbn-row" style="margin-bottom:10px"><span class="mxbn-sc">✨</span></div><div class="mxbn-grid">' + set.map(function(x, i){ return '<button type="button" class="mxbn-c" data-k="' + x[1] + '" style="animation-delay:' + (i*.05) + 's"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></button>'; }).join('') + '</div>';
          var cards = [].slice.call(el.querySelectorAll('.mxbn-c')), chosen = {};
          cards.forEach(function(c){ c.addEventListener('click', function(){ if(task._done) return; var k = c.getAttribute('data-k'); chosen[k] = !chosen[k]; c.classList.toggle('on', chosen[k]); X.sfx.tap(chosen[k] ? 2 : 1); }); });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '16px'; go.textContent = '✔'; el.appendChild(go);
          function check(){ if(task._done) return; task._done = true; var ok = set.every(function(x){ return !!chosen[x[1]] === (x[2] === pk); }); task.submit(ok ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ set.forEach(function(x, i){ var want = wrong ? false : x[2] === pk; if(!!chosen[x[1]] !== want) cards[i].click(); }); check(); };
        },
        hintSay:['f:' + SAY[pk]], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxbn-info">' + F()[SAY[pk]] + '</div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px">' + of(pk).map(function(x){ return '<div class="mxbn-item" style="width:70px;height:78px;font-size:2rem;"><span>' + x[0] + '</span><b style="font-size:.62rem">' + NM(x[1]) + '</b></div>'; }).join('') + '</div>'; }
      });
    }
    function sortTask(){
      var items = shuffle(KINDS.reduce(function(a, k){ return a.concat(shuffle(of(k)).slice(0, 3)); }, [])).map(function(x){ return { h:x[0], k:x[2], id:x[0] }; });
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortlight'}), hintSay:KINDS.map(function(k){ return 'f:' + SAY[k]; }),
        buckets:KINDS.map(function(k){ return { k:k, name:label(k), icon:ICON[k], c1:COL[k][0], c2:COL[k][1] }; })
      }));
    }
    function findAny(){ var k = pick(KINDS); return findTask(k, pick(of(k))); }
    var extra = null;
    function L1(){ return askTask(pick(ITEMS)); }
    function L2(){ var r = Math.random(); if(PICK && r < .4) return pickTask(); if(extra && r < .4) return extra(); return findAny(); }
    function L3(){ var r = Math.random(); if(r < .6) return sortTask(); if(extra && r < .8) return extra(); if(PICK && r < .8) return pickTask(); return Math.random() < .5 ? askTask(pick(ITEMS)) : findAny(); }

    M.run({ root:containerId, key:'light', need:10, theme:'night', levels:[L1,L2,L3] });
  });
}
