/* ===== Білім Аралы — «Верно или неверно: Космодром чисел» (v3) =====
   Математика, 2 класс (цели 2.4.1.2, 2.4.2.1 приказа №399): классификация чисел (чётные, однозначные, двузначные), истинные и ложные утверждения.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'space', icons:['🚀','🔢','✅']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-g2.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initSetsLogicGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function chipN(n){ return '<b style="font:800 1.5rem Baloo 2,sans-serif">' + n + '</b>'; }
    function pickNums(count, pred, lo, hi){ var r = []; var t = 0; while(r.length < count && t++ < 500){ var n = rnd(lo, hi); if(pred(n) && r.indexOf(n) < 0) r.push(n); } return r; }
    var ev = function(n){ return n % 2 === 0; }, od = function(n){ return n % 2 === 1; };
    function why(st){ return st.why; }
    // утверждения о числах: {t (текст), truth, why}
    function stmt(kind, truth){
      var n, a, b;
      if(kind === 'even'){
        n = truth ? pick(pickNums(1, ev, 10, 48)) : pick(pickNums(1, od, 11, 49));
        return { t:'Число ' + n + ' — чётное', truth:truth, why:ev(n) ? n + ' можно разделить на 2 поровну: ' + n + ' ÷ 2 = ' + n/2 + '. Значит, оно <b>чётное</b>' : n + ' на 2 поровну не делится — останется 1. Значит, оно <b>нечётное</b>' };
      }
      if(kind === 'digits'){
        var two = Math.random() < .5; n = two ? rnd(10, 99) : rnd(1, 9);
        var claim = truth ? two : !two;
        return { t:'В записи числа ' + n + ' ' + (claim ? 'две цифры' : 'одна цифра'), truth:(claim === two), why:'В числе ' + n + ' ' + (two ? 'две цифры (десятки и единицы)' : 'одна цифра') };
      }
      if(kind === 'cmp'){
        a = rnd(21, 89); b = a + rnd(3, 9);
        var x = truth ? b : a, y = truth ? a : b;
        return { t:x + ' больше, чем ' + y, truth:truth, why:b + ' больше, чем ' + a + '. Сравниваем десятки, потом единицы' };
      }
      n = rnd(12, 88);
      var mid = truth ? n : n + pick([2, 3, -2, -3]);
      return { t:'Число ' + mid + ' больше, чем ' + (n - 1) + ', и меньше, чем ' + (n + 1), truth:truth, why:'Число <b>' + n + '</b> больше, чем ' + (n - 1) + ', и меньше, чем ' + (n + 1) };
    }

    /* ⭐ разложи числа по корзинам-множествам */
    function L1(){
      if(Math.random() < .55){
        var items = shuffle(pickNums(3, ev, 10, 48).map(function(n){ return { k:'even', h:chipN(n) }; }).concat(pickNums(3, od, 11, 49).map(function(n){ return { k:'odd', h:chipN(n) }; })));
        return S('1e' + rnd(1, 99999), M.sortTask({ items:items, say:[G.say('Разложи числа по корзинам: чётные и нечётные. Чётное число делится на два поровну.')], cap:'Чётные — делятся на 2 поровну',
          buckets:[{ k:'even', name:'чётные', icon:'👯', c1:'#4DB6AC', c2:'#26897F' }, { k:'odd', name:'нечётные', icon:'☝️', c1:'#FF9F6B', c2:'#E06A33' }], hintSay:[G.say('Чётные делятся на два поровну, нечётные — нет.')] }));
      }
      var it2 = shuffle(pickNums(3, function(n){ return n < 10; }, 1, 9).map(function(n){ return { k:'one', h:chipN(n) }; }).concat(pickNums(3, function(n){ return n >= 10; }, 10, 99).map(function(n){ return { k:'two', h:chipN(n) }; })));
      return S('1d' + rnd(1, 99999), M.sortTask({ items:it2, say:[G.say('Разложи числа по корзинам: однозначные и двузначные. Посмотри, сколько цифр в записи.')], cap:'Сколько цифр в числе?',
        buckets:[{ k:'one', name:'одна цифра', icon:'1️⃣', c1:'#7E8BEF', c2:'#5560CC' }, { k:'two', name:'две цифры', icon:'2️⃣', c1:'#FF8AB3', c2:'#E5538A' }], hintSay:[G.say('В однозначных числах одна цифра, в двузначных — две.')] }));
    }
    /* ⭐⭐ верно или неверно */
    function L2(){
      var k = pick(['even', 'digits', 'cmp', 'between']), truth = Math.random() < .5, s = stmt(k, truth);
      return S('2' + s.t, G.tf({ q:s.t, truth:s.truth, hint:s.why }));
    }
    /* ⭐⭐⭐ лишнее число, подходящее число, верное утверждение */
    function L3(){
      var k = pick(['odd', 'odd', 'fit', 'true']);
      if(k === 'odd'){
        var byEven = Math.random() < .5, base = byEven ? pickNums(3, ev, 10, 48) : pickNums(3, function(n){ return n >= 10; }, 10, 99), out = byEven ? pickNums(1, od, 11, 49)[0] : rnd(1, 9);
        var all = base.concat([out]);
        return S('3o' + all.join(','), Object.assign(G.pickPic({ q:'Какое число лишнее?', say:[G.say(byEven ? 'Три числа чётные, одно нет. Какое число лишнее?' : 'У трёх чисел по две цифры, у одного — одна. Какое число лишнее?')], items:all.map(function(n){ return { k:n, h:'<span style="font:800 1.8rem Baloo 2,sans-serif">' + n + '</span>' }; }), ans:out }),
          { hintExpr:'<span class="ok">' + out + '</span>', hintSay:[G.say(byEven ? out + ' — нечётное, а остальные чётные.' : out + ' — однозначное, а у остальных по две цифры.')], hint:G.hintCard('', byEven ? '<b>' + out + '</b> — нечётное, остальные чётные' : '<b>' + out + '</b> — одна цифра, у остальных две') }));
      }
      if(k === 'fit'){
        var good = pickNums(1, function(n){ return ev(n); }, 10, 98)[0], bad = [pickNums(1, od, 11, 99)[0], rnd(1, 4)*2, pickNums(1, od, 11, 99)[0]].filter(function(x, i, a){ return a.indexOf(x) === i && x !== good; });
        var all2 = shuffle([good].concat(bad)).slice(0, 4);
        return S('3f' + all2.join(','), Object.assign(G.pickPic({ q:'Найди число: двузначное и чётное', say:[G.say('Найди число, которое двузначное и чётное.')], items:all2.map(function(n){ return { k:n, h:'<span style="font:800 1.8rem Baloo 2,sans-serif">' + n + '</span>' }; }), ans:good }),
          { hintExpr:'<span class="ok">' + good + '</span>', hintSay:[G.say(good + ' — две цифры и делится на два поровну.')], hint:G.hintCard('', '<b>' + good + '</b>: две цифры и чётное') }));
      }
      var sT = stmt(pick(['even', 'digits', 'cmp', 'between']), true), kinds = ['even', 'digits', 'cmp', 'between'], falses = [];
      while(falses.length < 2){ var f = stmt(pick(kinds), false); if(f.t !== sT.t && falses.every(function(x){ return x.t !== f.t; })) falses.push(f); }
      return S('3t' + sT.t, Object.assign(G.choice({ q:'Какое утверждение верное?', say:[G.say('Какое утверждение верное?')], opts:[sT.t, falses[0].t, falses[1].t], ans:sT.t, layout:'card' }), { hintExpr:'<span class="ok">Верно:</span>', hintSay:[G.say('Верное утверждение: ' + sT.t)], hint:G.hintCard('', sT.why) }));
    }

    M.run({ root:containerId, key:'setslogic', need:10, theme:'space', levels:[L1, L2, L3] });
  });
}
