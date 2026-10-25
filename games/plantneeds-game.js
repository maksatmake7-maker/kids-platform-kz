/* ===== Білім Аралы — «Что нужно растению: Теплица Барсика» (v3) =====
   Естествознание, 1 класс (цель 1.2.1.4 приказа №399): вода, свет, тепло. Уровни: нужно или нет → выбери всё нужное → чего не хватает растению.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'greenhouse',icons:['💧','☀️','🌡️']};
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
function initPlantNeedsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function NM(k){ var F = V.F[V.lang()]; return F['n_' + k] || k; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    /* 10 предметов из программы: растению нужны вода, свет, тепло; остальное не нужно */
    var NEED = [['💧','water'],['☀️','sun'],['🌡️','warmth']];
    var NOT = [['🍬','candy'],['🧸','toy'],['📱','phone'],['🎮','console'],['👟','shoes'],['⚽','ball'],['🚗','car']];
    var ALL = NEED.map(function(x){ return [x[0], x[1], true]; }).concat(NOT.map(function(x){ return [x[0], x[1], false]; }));
    function yn(k){ var m = msgs(); return k === 'yes' ? (m.btn_needed || 'Needed') : (m.btn_not_needed || 'Not needed'); }

    (function(){
      if(document.getElementById('mxpn-css')) return;
      var s = document.createElement('style'); s.id = 'mxpn-css';
      s.textContent = ''
      + '.mxpn-row{display:flex;align-items:center;justify-content:center;gap:10px;}'
      + '.mxpn-pot{font-size:4.2rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxpn-arrow{font:800 2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
      + '.mxpn-item{display:flex;flex-direction:column;align-items:center;justify-content:center;width:118px;height:118px;border-radius:24px;background:rgba(255,255,255,.85);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:3.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxpn-item b{font:800 1rem "Baloo 2",sans-serif;color:#25324A;margin-top:2px;}'
      + '.mxpn-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;}'
      + '.mxpn-info .e{font-size:2.4rem;line-height:1;}'
      /* карточки выбора */
      + '.mxpn-grid{display:grid;grid-template-columns:repeat(3,92px);gap:10px;justify-content:center;}'
      + '.mxpn-c{height:92px;border-radius:20px;border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.4rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxpn-c b{font:800 .72rem "Baloo 2",sans-serif;color:#25324A;margin-top:3px;}'
      + '.mxpn-c.on{border-color:#33C28A;background:#E8FFF3;transform:translateY(-3px);box-shadow:0 8px 0 rgba(0,0,0,.2);}'
      /* сцена «чего не хватает» */
      + '.mxpn-scene{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;width:min(100%,300px);height:130px;border-radius:26px;box-shadow:inset 0 -8px 0 rgba(0,0,0,.12),0 6px 0 rgba(0,0,0,.16);font-size:3.2rem;animation:mxIn .4s backwards;}'
      + '.mxpn-scene .big{font-size:4.6rem;}'
      + '.mxs .mxs-balloon.wide{width:104px;}.mxs-balloon.wide .b .mxpn-o{display:flex;flex-direction:column;align-items:center;line-height:1.05;}.mxpn-o i{font-style:normal;font-size:1.7rem;}.mxpn-o b{font:800 .85rem "Baloo 2",sans-serif;}'
      + '.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}'
      + '@media (prefers-reduced-motion:reduce){.mxpn-pot,.mxpn-item,.mxpn-c,.mxpn-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(it){
      return it[2]
        ? { hintSay:['f:n_' + it[1], 'f:needsay'], hint:function(el){ el.innerHTML = '<div class="mxpn-row"><span class="mxpn-pot">🌿</span><span class="mxpn-arrow">←</span><span class="mxpn-pot">' + it[0] + '</span></div><div class="mxpn-info">' + V.F[V.lang()].needsay + '</div>'; } }
        : { hintSay:['f:n_' + it[1], 'f:notneedsay'], hint:function(el){ el.innerHTML = '<div class="mxpn-row"><span class="mxpn-pot">🌿</span><span class="mxpn-arrow">✖</span><span class="mxpn-pot">' + it[0] + '</span></div><div class="mxpn-info">' + V.F[V.lang()].notneedsay + ' ' + V.F[V.lang()].needsay + '</div>'; } };
    }
    /* ⭐: нужно ли это растению */
    function askTask(it){
      var h = hintOf(it), o = shuffle(['yes','no']).map(function(k){ return { v:k, h:'<span class="nm">' + yn(k) + '</span>' }; });
      return S('a' + it[0], {
        expr:'', say:V.tpl('named', {n:it[1], q:'needq'}), ans:it[2] ? 'yes' : 'no', layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxpn-row"><span class="mxpn-pot">🌿</span><span class="mxpn-arrow">←</span><div class="mxpn-item"><span>' + it[0] + '</span><b>' + NM(it[1]) + '</b></div></div>'; },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint
      });
    }
    /* ⭐⭐: выбери всё, что нужно, чтобы расти (три нужных среди шести) */
    function pickTask(){
      var set = shuffle(NEED.map(function(x){ return [x[0], x[1], true]; }).concat(shuffle(NOT).slice(0, 3).map(function(x){ return [x[0], x[1], false]; })));
      return S('p' + set.map(function(x){ return x[0]; }).join(''), {
        expr:'', say:V.tpl('q', {k:'givegrow'}), ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxpn-row" style="margin-bottom:10px"><span class="mxpn-pot">🌿</span></div><div class="mxpn-grid">' + set.map(function(x, i){ return '<button type="button" class="mxpn-c" data-k="' + x[1] + '" style="animation-delay:' + (i*.05) + 's"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></button>'; }).join('') + '</div>';
          var cards = [].slice.call(el.querySelectorAll('.mxpn-c')), chosen = {};
          cards.forEach(function(c){ c.addEventListener('click', function(){ if(task._done) return; var k = c.getAttribute('data-k'); chosen[k] = !chosen[k]; c.classList.toggle('on', chosen[k]); X.sfx.tap(chosen[k] ? 2 : 1); }); });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '16px'; go.textContent = '✔'; el.appendChild(go);
          function check(){ if(task._done) return; task._done = true; var ok = set.every(function(x){ return !!chosen[x[1]] === x[2]; }); task.submit(ok ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ set.forEach(function(x, i){ var want = wrong ? false : x[2]; if(!!chosen[x[1]] !== want) cards[i].click(); }); check(); };
        },
        hintSay:['f:needsay'], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxpn-row"><span class="mxpn-pot">🌿</span><span class="mxpn-arrow">←</span></div><div style="display:flex;gap:10px;justify-content:center;">' + NEED.map(function(x){ return '<div class="mxpn-item" style="width:92px;height:92px;font-size:2.6rem;"><span>' + x[0] + '</span><b>' + NM(x[1]) + '</b></div>'; }).join('') + '</div><div class="mxpn-info">' + V.F[V.lang()].needsay + '</div>'; }
      });
    }
    /* ⭐⭐⭐: растению плохо — чего ему не хватает */
    var LACK = {
      water:{ bg:'linear-gradient(#FFE9A8,#F6C26B)', em:['☀️','🥀','🏜️'], say:'f:lack_water' },
      light:{ bg:'linear-gradient(#232850,#3B3F7A)', em:['🌑','🥀','🌑'], say:'f:lack_light' },
      warmth:{ bg:'linear-gradient(#CDEBFF,#9FD3F5)', em:['❄️','🥀','🥶'], say:'f:lack_warm' }
    };
    var LACKEM = { water:'💧', light:'☀️', warmth:'🌡️' };
    function lackTask(k){
      var o = shuffle(['water','light','warmth']).map(function(x){ return { v:x, h:'<span class="mxpn-o"><i>' + LACKEM[x] + '</i><b>' + NM(x === 'light' ? 'sun' : x) + '</b></span>' }; });
      var sc = LACK[k];
      return S('l' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'whatlacks'}), ans:k, layout:'wide', opts:o,
        field:function(el){ el.innerHTML = '<div class="mxpn-scene" style="background:' + sc.bg + '"><span>' + sc.em[0] + '</span><span class="big">' + sc.em[1] + '</span><span>' + sc.em[2] + '</span></div>'; },
        hintSay:[sc.say], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxpn-row"><span class="mxpn-pot">🌿</span><span class="mxpn-arrow">←</span><span class="mxpn-pot">' + LACKEM[k] + '</span></div><div class="mxpn-info">' + V.F[V.lang()][sc.say.slice(2)] + '</div>'; }
      });
    }

    function L1(){ return askTask(pick(ALL)); }
    function L2(){ return Math.random() < .55 ? pickTask() : askTask(pick(ALL)); }
    function L3(){ return Math.random() < .7 ? lackTask(pick(['water','light','warmth'])) : pickTask(); }

    M.run({ root:containerId, key:'plantneeds', need:10, theme:'greenhouse', levels:[L1,L2,L3] });
  });
}
