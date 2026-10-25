/* ===== Білім Аралы — «Продолжи узор: Бусы Барсика» (v3) =====
   Математика, 1 класс (цель 1.4.3.1 приказа №399): закономерность в последовательности рисунков, фигур, символов. Уровни: АБАБ → ААБ, АББ, АБВ → спрятанная бусина и «продолжи узор».
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'rainbow',icons:['🔴','🟡','🔵']};
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
function initSymbolSeqGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    var POOL = ['⭐','❤️','🔵','🟡','🌸','🍎','🦋','🎈','🍓','🌙','🔺','🟩','🐟','🍄','🔶','🐞'];

    (function(){
      if(document.getElementById('mxq-css')) return;
      var s = document.createElement('style'); s.id = 'mxq-css';
      s.textContent = ''
      + '.mxq-thread{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;width:min(100%,326px);padding:12px 8px 14px;border-radius:22px;background:rgba(255,255,255,.55);box-shadow:inset 0 -6px 0 rgba(0,0,0,.08),0 5px 0 rgba(0,0,0,.12);}'
      + '.mxq-bd{width:38px;height:38px;border-radius:50%;background:#fff;border:3px solid #fff;box-shadow:0 3px 0 rgba(0,0,0,.2),inset -3px -4px 0 rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;font-size:1.3rem;line-height:1;animation:mxIn .35s backwards;position:relative;}'
      + '.mxq-thread.dense .mxq-bd{width:31px;height:31px;font-size:1.05rem;border-width:2px;}.mxq-thread.dense{gap:3px;}'
      + '.mxq-bd.q{background:#FF6B5B;border-color:#FFB4AA;color:#fff;font:800 1.35rem "Baloo 2",sans-serif;box-shadow:0 3px 0 #D9483A;animation:mxIn .35s backwards,mxBob 1.6s ease-in-out infinite alternate;}'
      + '.mxq-bd.u{border-color:#FFC93C;box-shadow:0 0 0 3px rgba(255,201,60,.55),0 3px 0 rgba(0,0,0,.2);}'
      + '.mxq-bd.ok{border-color:#33C28A;box-shadow:0 0 0 3px rgba(51,194,138,.55),0 3px 0 rgba(0,0,0,.2);}'
      + '.mxq-bd.slot{background:rgba(255,255,255,.4);border:3px dashed #7E6BD6;box-shadow:none;cursor:pointer;color:#7E6BD6;font:800 1.2rem "Baloo 2",sans-serif;}'
      + '.mxq-bd.slot.f{background:#fff;border:3px solid #7E6BD6;box-shadow:0 3px 0 rgba(0,0,0,.2);}'
      + '.mxq-tray{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px;}'
      + '.mxq-tr{width:54px;height:54px;border-radius:16px;border:none;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.2);font-size:1.9rem;line-height:1;cursor:pointer;animation:mxIn .35s backwards;}'
      + '.mxq-tr:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.2);}'
      + '.mxs-balloon .b .em{font-size:2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxq-bd,.mxq-tr{animation:none !important}}';
      document.head.appendChild(s);
    })();

    function bead(e, cls, i){ return '<span class="mxq-bd ' + (cls || '') + '" style="animation-delay:' + ((i || 0)*0.04) + 's">' + e + '</span>'; }
    function seqOf(unit, n){ var a = []; for(var i = 0; i < n; i++) a.push(unit[i % unit.length]); return a; }
    function pickUnit(len){ return shuffle(POOL).slice(0, len); }
    function unitShape(len){            // 2: АБ; 3: ААБ, АББ, АБВ
      if(len === 2) return [0, 1];
      return pick([[0,0,1],[0,1,1],[0,1,2],[0,1,2]]);
    }
    function makeUnit(shape){ var k = Math.max.apply(null, shape) + 1, em = pickUnit(k); return shape.map(function(i){ return em[i]; }); }
    function optsFor(ans, unit){
      var set = [ans];
      shuffle(unit.filter(function(e, i, a){ return e !== ans && a.indexOf(e) === i; })).forEach(function(e){ if(set.length < 3) set.push(e); });
      shuffle(POOL.filter(function(e){ return set.indexOf(e) < 0 && unit.indexOf(e) < 0; })).forEach(function(e){ if(set.length < 4) set.push(e); });
      return shuffle(set).map(function(e){ return { v:e, h:'<span class="em">' + e + '</span>' }; });
    }
    function thread(seq, hidden, unitLen, okIdx){
      var h = '<div class="mxq-thread' + (seq.length > 8 ? ' dense' : '') + '">';
      seq.forEach(function(e, i){
        if(hidden.indexOf(i) >= 0) h += bead('?', 'q', i);
        else h += bead(e, (i < unitLen ? 'u ' : '') + (okIdx && okIdx.indexOf(i) >= 0 ? 'ok' : ''), i);
      });
      return h + '</div>';
    }
    function hintThread(full, unitLen, okIdx){
      return function(el){ el.innerHTML = thread(full, [], unitLen, okIdx); };
    }

    /* «какая бусина следующая?» */
    function nextTask(unit, n){
      var seq = seqOf(unit, n + 1), ans = seq[n], shown = seq.slice(0, n);
      return S('n' + unit.join('') + n, {
        expr:'', say:V.tpl('q',{k:'nextbead'}), ans:ans, opts:optsFor(ans, unit),
        field:function(el){ el.innerHTML = thread(shown.concat(['?']), [n], 0); },
        hintSay:['f:repeats'], hintExpr:'', hint:hintThread(seq, unit.length, [n])
      });
    }
    /* «какая бусина спряталась?» в середине узора */
    function midTask(unit, n, idx){
      var seq = seqOf(unit, n), ans = seq[idx];
      return S('m' + unit.join('') + n + idx, {
        expr:'', say:V.tpl('q',{k:'missbead'}), ans:ans, opts:optsFor(ans, unit),
        field:function(el){ el.innerHTML = thread(seq, [idx], 0); },
        hintSay:['f:repeats'], hintExpr:'', hint:hintThread(seq, unit.length, [idx])
      });
    }
    /* «продолжи узор»: выбери две бусины подряд */
    function buildTask(unit, n){
      var seq = seqOf(unit, n + 2), a1 = seq[n], a2 = seq[n + 1], shown = seq.slice(0, n);
      var set = unit.filter(function(e, i, a){ return a.indexOf(e) === i; });
      shuffle(POOL.filter(function(e){ return set.indexOf(e) < 0; })).forEach(function(e){ if(set.length < 4) set.push(e); });
      var trayItems = shuffle(set);
      return S('b' + unit.join('') + n, {
        expr:'', say:V.tpl('q',{k:'buildbeads'}), ans:a1 + '|' + a2, gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxq-thread' + (n + 2 > 8 ? ' dense' : '') + '">' + shown.map(function(e, i){ return bead(e, i < unit.length ? 'u' : '', i); }).join('') + bead('', 'slot', n) + bead('', 'slot', n + 1) + '</div><div class="mxq-tray">'
            + trayItems.map(function(e, i){ return '<button type="button" class="mxq-tr" data-e="' + e + '" style="animation-delay:' + (i*.05) + 's">' + e + '</button>'; }).join('') + '</div>';
          var slots = [].slice.call(el.querySelectorAll('.slot')), val = [null, null];
          function fin(){ if(val[0] && val[1] && !task._done){ task._done = true; X.sleep(350).then(function(ok){ if(ok) task.submit(val[0] + '|' + val[1], slots[1]); }); } }
          function put(e){ if(task._done) return false; var i = val[0] ? (val[1] ? -1 : 1) : 0; if(i < 0) return false; val[i] = e; slots[i].textContent = e; slots[i].classList.add('f'); X.sfx.tap(i + 1); fin(); return true; }
          slots.forEach(function(sl, i){ sl.addEventListener('click', function(){ if(task._done || !val[i]) return; if(i === 0 && val[1]) return; val[i] = null; sl.textContent = ''; sl.classList.remove('f'); }); });
          [].slice.call(el.querySelectorAll('.mxq-tr')).forEach(function(b){ b.addEventListener('click', function(){ put(b.getAttribute('data-e')); }); });
          task.auto = function(wrong){
            if(wrong){ var bad = trayItems.filter(function(e){ return e !== a1; })[0]; put(bad); put(a2); }
            else { put(a1); put(a2); }
          };
        },
        hintSay:['f:repeats'], hintExpr:'', hint:hintThread(seq, unit.length, [n, n + 1])
      });
    }

    /* ⭐: узор из двух бусин (АБАБА…), что дальше */
    function L1(){ var u = makeUnit(unitShape(2)); return nextTask(u, pick([5, 5, 7])); }
    /* ⭐⭐: узор из трёх (ААБ, АББ, АБВ), что дальше */
    function L2(){ var u = makeUnit(unitShape(3)); return nextTask(u, pick([7, 8, 7])); }
    /* ⭐⭐⭐: спрятана бусина в середине / продолжи узор двумя бусинами */
    function L3(){
      var len = pick([2, 3, 3]), u = makeUnit(unitShape(len)), t = pick(['mid','mid','build']);
      if(t === 'mid'){ var n = pick([8, 9]); return midTask(u, n, rnd(len, n - 2)); }
      return buildTask(u, pick([6, 7]));
    }

    M.run({ root:containerId, key:'symbolseq', need:10, theme:'rainbow', levels:[L1,L2,L3] });
  });
}
