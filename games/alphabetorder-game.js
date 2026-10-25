/* ===== Білім Аралы — «Что раньше в алфавите: Словарик Барсика» (v3) =====
   Обучение грамоте, 1 класс (цель 1.2.7.1 приказа №399): алфавитный порядок. 30 букв, слова по первой букве. Уровни: какая буква раньше → следующая / спрятавшаяся → расставь по порядку / какое слово раньше в словаре.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sky',icons:['А','Б','В']};
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
function initAlphabetOrderGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var TR = {'А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z','И':'i','Й':'j','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r','С':'s','Т':'t','У':'u','Ф':'f','Х':'h','Ц':'c','Ч':'ch','Ш':'sh','Щ':'shch','Ы':'y','Э':'ye','Ю':'yu','Я':'ya'};
    var TW = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
    function LK(l){ return 'f:r_l_' + TR[l]; }
    function WK(w){ return 'f:r_w_' + w.toLowerCase().replace(/-/g, '').split('').map(function(c){ return TW[c]; }).join(''); }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function cap1(w){ return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }
    /* алфавит из программы (30 букв без Ъ, Ы, Ь) и слова на разные буквы */
    var AB = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я'];
    var WD = [['А','Апельсин','🍊'],['Б','Банан','🍌'],['В','Виноград','🍇'],['Г','Гриб','🍄'],['Д','Дом','🏠'],['Ж','Жук','🐞'],['З','Заяц','🐰'],['К','Кот','🐱'],['Л','Лев','🦁'],['М','Мяч','⚽'],['Н','Носорог','🦏'],['О','Огурец','🥒'],['П','Пингвин','🐧'],['Р','Рыба','🐟'],['С','Слон','🐘'],['Т','Тигр','🐯'],['У','Утка','🦆'],['Ф','Флаг','🚩'],['Х','Хомяк','🐹'],['Ц','Цветок','🌸'],['Ч','Черепаха','🐢'],['Ш','Шар','🎈'],['Я','Яблоко','🍎']];
    function idx(l){ return AB.indexOf(l); }

    (function(){
      if(document.getElementById('mxab-css')) return;
      var s = document.createElement('style'); s.id = 'mxab-css';
      s.textContent = ''
      + '.mxab-pair{display:flex;align-items:center;justify-content:center;gap:12px;}'
      + '.mxab-card{display:flex;align-items:center;justify-content:center;width:104px;height:120px;border-radius:26px;background:rgba(255,255,255,.92);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font:800 4.6rem/1 "Baloo 2",sans-serif;color:#2F9BE6;animation:mxIn .4s backwards;}'
      + '.mxab-card.q{background:#EDE6FF;border:4px dashed #7E6BD6;color:#7E6BD6;}'
      + '.mxab-vs{font:800 1.4rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.25);}'
      + '.mxab-strip{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;max-width:330px;margin-top:6px;}'
      + '.mxab-strip i{font:800 .86rem/1 "Baloo 2",sans-serif;font-style:normal;width:24px;height:26px;border-radius:7px;background:#fff;color:#25324A;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 0 rgba(0,0,0,.14);}'
      + '.mxab-strip i.h{background:#FFB400;transform:scale(1.2);}'
      + '.mxab-order{display:flex;gap:8px;justify-content:center;margin:10px 0 14px;min-height:70px;}'
      + '.mxab-slot{width:58px;height:66px;border-radius:15px;border:4px dashed rgba(255,255,255,.9);background:rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font:800 2.2rem/1 "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxab-slot.f{border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);animation:mxIn .2s;}'
      + '.mxab-tiles{display:flex;gap:9px;justify-content:center;}'
      + '.mxab-tile{width:62px;height:66px;border-radius:16px;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 6px 0 rgba(0,0,0,.22);font:800 2.3rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;animation:mxIn .35s backwards;}'
      + '.mxab-tile.used{visibility:hidden;}'
      + '.mxab-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.1rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxs .mxs-balloon.wide{width:124px;}.mxs-balloon .b .lt{font:800 2.6rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.45rem!important;font-weight:800;padding:0 6px;text-align:center;}'
      + '@media (prefers-reduced-motion:reduce){.mxab-card,.mxab-tile,.mxab-slot{animation:none}}';
      document.head.appendChild(s);
    })();

    function strip(hl, a, b){ var lo = a === undefined ? 0 : a, hi = b === undefined ? AB.length - 1 : b; return '<div class="mxab-strip">' + AB.slice(lo, hi + 1).map(function(l){ return '<i' + (hl.indexOf(l) >= 0 ? ' class="h"' : '') + '>' + l + '</i>'; }).join('') + '</div>'; }
    function hintStrip(hl){ return function(el){ el.innerHTML = strip(hl) + '<div class="mxab-info">' + F().alphsay + '</div>'; }; }
    function opts4(ans, near){
      var set = [ans];
      (near || []).forEach(function(l){ if(l && set.indexOf(l) < 0 && set.length < 4) set.push(l); });
      shuffle(AB.filter(function(l){ return set.indexOf(l) < 0; })).forEach(function(l){ if(set.length < 4) set.push(l); });
      return shuffle(set).map(function(l){ return { v:l, h:'<span class="lt">' + l + '</span>' }; });
    }
    /* ⭐: какая из двух букв раньше в алфавите */
    function firstTask(){
      var i1 = rnd(0, AB.length - 1), i2; do { i2 = rnd(0, AB.length - 1); } while(i2 === i1 || (Math.abs(i1 - i2) < 2 && Math.random() < .5));
      var a = AB[i1], b = AB[i2], ans = i1 < i2 ? a : b;
      return S('a' + a + b, { expr:'', say:V.tpl('q', {k:'alphq'}), ans:ans, layout:'wide', opts:shuffle([a, b]).map(function(l){ return { v:l, h:'<span class="lt">' + l + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxab-pair"><div class="mxab-card">' + a + '</div><span class="mxab-vs">' + (msgs().alphabet_or || '·') + '</span><div class="mxab-card">' + b + '</div></div>'; },
        hintSay:['f:alphsay'], hintExpr:'', hint:hintStrip([a, b]) });
    }
    /* ⭐⭐: какая буква идёт после данной */
    function nextTask(){
      var i = rnd(0, AB.length - 2), l = AB[i], ans = AB[i + 1];
      return S('n' + l, { expr:'', say:V.tpl('seq', {list:['f:nextq', LK(l)]}), cap:F().nextq, ans:ans, layout:'wide', opts:opts4(ans, [AB[i - 1], AB[i + 2], AB[i + 3]]),
        field:function(el){ el.innerHTML = '<div class="mxab-pair"><div class="mxab-card">' + l + '</div><span class="mxab-vs">→</span><div class="mxab-card q">?</div></div>'; },
        hintSay:['f:alphsay'], hintExpr:'', hint:hintStrip([l, ans]) });
    }
    /* ⭐⭐: какая буква спряталась между двумя */
    function gapTask(){
      var i = rnd(1, AB.length - 2), l = AB[i];
      return S('g' + l, { expr:'', say:V.tpl('q', {k:'gapletq'}), ans:l, layout:'wide', opts:opts4(l, [AB[i - 2], AB[i + 2]].filter(Boolean)),
        field:function(el){ el.innerHTML = '<div class="mxab-pair"><div class="mxab-card" style="width:82px">' + AB[i - 1] + '</div><div class="mxab-card q" style="width:82px">?</div><div class="mxab-card" style="width:82px">' + AB[i + 1] + '</div></div>'; },
        hintSay:['f:alphsay'], hintExpr:'', hint:hintStrip([AB[i - 1], l, AB[i + 1]]) });
    }
    /* ⭐⭐⭐: расставь четыре буквы по алфавиту */
    function orderTask(){
      var pickIdx = shuffle(AB.map(function(_, i){ return i; })).slice(0, 4).sort(function(a, b){ return a - b; }), want = pickIdx.map(function(i){ return AB[i]; });
      return S('o' + want.join(''), { expr:'', say:V.tpl('q', {k:'orderq'}), ans:'ok', gate:false,
        field:function(el, X, task){
          var tl = shuffle(want); if(tl.join('') === want.join('')) tl.reverse();
          el.innerHTML = '<div class="mxab-order">' + want.map(function(){ return '<div class="mxab-slot"></div>'; }).join('') + '</div><div class="mxab-tiles">' + tl.map(function(c, i){ return '<button type="button" class="mxab-tile" style="animation-delay:' + (i*.06) + 's">' + c + '</button>'; }).join('') + '</div>';
          var slots = [].slice.call(el.querySelectorAll('.mxab-slot')), tiles = [].slice.call(el.querySelectorAll('.mxab-tile')), n = 0;
          tiles.forEach(function(t){ t.addEventListener('click', function(){ if(task._done || t.classList.contains('used')) return;
            if(t.textContent !== want[n]){ task._done = true; X.sfx.no(); task.submit('no', t); return; }
            t.classList.add('used'); slots[n].textContent = t.textContent; slots[n].classList.add('f'); X.sfx.tap(n + 1); n++;
            if(n === want.length){ task._done = true; X.sleep(350).then(function(ok){ if(ok) task.submit('ok', slots[0]); }); } }); });
          task.auto = function(wrong){ if(wrong){ var w = tiles.filter(function(t){ return t.textContent !== want[0]; })[0]; w.click(); return; } want.forEach(function(c){ var t = tiles.filter(function(x){ return !x.classList.contains('used') && x.textContent === c; })[0]; if(t) t.click(); }); };
        },
        hintSay:['f:alphsay'], hintExpr:'', hint:hintStrip(want) });
    }
    /* ⭐⭐⭐: какое слово в словаре раньше (по первой букве) */
    function dictTask(){
      var pair = shuffle(WD).slice(0, 2), a = pair[0], b = pair[1], ans = idx(a[0]) < idx(b[0]) ? a : b;
      return S('d' + a[0] + b[0], { expr:'', say:V.tpl('seq', {list:['f:dictq']}), ans:ans[1], layout:'wide', opts:[a, b].map(function(x){ return { v:x[1], h:'<span class="nm">' + x[1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxab-pair"><div class="mxab-card" style="font-size:2.6rem;width:116px">' + a[2] + '</div><span class="mxab-vs">·</span><div class="mxab-card" style="font-size:2.6rem;width:116px">' + b[2] + '</div></div>'; },
        hintSay:['f:alphsay', WK(ans[1])], hintExpr:'', hint:hintStrip([a[0], b[0]]) });
    }

    function L1(){ return firstTask(); }
    function L2(){ return Math.random() < .5 ? nextTask() : (Math.random() < .5 ? gapTask() : firstTask()); }
    function L3(){ var r = Math.random(); return r < .4 ? orderTask() : r < .7 ? dictTask() : r < .85 ? gapTask() : nextTask(); }

    M.run({ root:containerId, key:'alphabetorder', need:10, theme:'sky', levels:[L1,L2,L3] });
  });
}
