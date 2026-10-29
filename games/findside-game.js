/* ===== Білім Аралы — «Найди сторону: Загон для зайчат» (v3) =====
   Математика, 2 класс (цели 2.3.1.4, 2.5.1.5 приказа №399): неизвестная сторона квадрата и прямоугольника по периметру.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'forest', icons:['🐰','❓','📐']};
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

function initFindSideGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function lab(x, y, t, big){ return '<g><rect x="' + (x - 20) + '" y="' + (y - 13) + '" width="40" height="25" rx="9" fill="#fff" stroke="#8A5E36" stroke-width="2"/><text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="16" fill="' + (t === '?' ? '#FF6B5B' : '#25324A') + '">' + t + '</text></g>'; }
    function pen(kind, known, P){
      var w = kind === 'sq' ? 100 : 150, h = kind === 'sq' ? 100 : 90, x0 = (220 - w)/2, y0 = 22, L;
      L = kind === 'sq' ? lab(110, y0, '?') : lab(110, y0, String(known)) + lab(x0 + w + 2, y0 + h/2, '?');
      return '<svg viewBox="0 0 220 150" width="200" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 5px 0 rgba(0,0,0,.12))"><rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="6" fill="#D8F2C0" stroke="#8A5E36" stroke-width="7" stroke-dasharray="11 5"/><text x="110" y="' + (y0 + h/2 + 8) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="20" fill="#25324A">🐰 P = ' + P + '</text>' + L + '</svg>';
    }
    function hintSq(side){ var P = side*4; return { hintExpr:eqs(['a', '=', OK(side)]), hintSay:[G.say('У квадрата четыре равные стороны. ' + P + ' разделить на 4 — это ' + side + '.')], hint:G.hintCard(pen('sq', 0, P), P + ' ÷ 4 = <b>' + side + '</b><br>Проверка: ' + side + ' × 4 = ' + P) }; }
    function hintRect(a, b){ var P = (a + b)*2; return { hintExpr:eqs(['b', '=', OK(b)]), hintSay:[G.say('Сначала найдём сумму двух сторон: ' + P + ' разделить на 2 — ' + (a + b) + '. Потом вычтем известную сторону: ' + (a + b) + ' минус ' + a + ' — ' + b + '.')],
      hint:G.hintCard(pen('rect', a, P), P + ' ÷ 2 = ' + (a + b) + ' &nbsp;(это a + b)<br>' + (a + b) + ' − ' + a + ' = <b>' + b + '</b><br>Проверка: (' + a + ' + ' + b + ') × 2 = ' + P) }; }
    function SQ(){ var a = rnd(3, 15); return { a:a, P:a*4 }; }
    function RC(){ var a = rnd(3, 12), b; do { b = rnd(2, 10); } while(b === a); return { a:a, b:b, P:(a + b)*2 }; }

    /* ⭐ квадрат: P ÷ 4 */
    function L1(){
      var q = SQ();
      return S('1' + q.a, Object.assign({ expr:'', cap:'Периметр загона-квадрата ' + q.P + ' м. Чему равна сторона?', say:[G.say('Периметр квадратного загона ' + q.P + ' метров. Чему равна одна сторона?')], ans:String(q.a), opts:M.numOpts(q.a, 2, 16, [q.a*2, q.P - q.a]),
        field:function(el){ el.innerHTML = pen('sq', 0, q.P); } }, hintSq(q.a)));
    }
    /* ⭐⭐ прямоугольник: P ÷ 2 − a */
    function L2(){
      var r = RC();
      return S('2' + r.a + r.b, Object.assign({ expr:'', cap:'Периметр ' + r.P + ' м, одна сторона ' + r.a + ' м. Чему равна другая?', say:[G.say('Периметр прямоугольного загона ' + r.P + ' метров. Одна сторона ' + r.a + ' метров. Чему равна другая сторона?')], ans:String(r.b), opts:M.numOpts(r.b, 1, 14, [r.P/2, r.P - r.a, r.a]),
        field:function(el){ el.innerHTML = pen('rect', r.a, r.P); } }, hintRect(r.a, r.b)));
    }
    /* ⭐⭐⭐ задачи и выбор решения */
    function L3(){
      var k = pick(['word', 'sol', 'sq']);
      if(k === 'sq'){ var q = SQ(); return S('3q' + q.a, Object.assign({ expr:'', cap:'Квадратную клумбу огородили забором ' + q.P + ' м. Какая сторона у клумбы?', say:[G.say('Квадратную клумбу огородили забором длиной ' + q.P + ' метров. Какая сторона у клумбы?')], ans:String(q.a), opts:M.numOpts(q.a, 2, 16, [q.a*2, q.P - q.a]) }, hintSq(q.a))); }
      var r = RC();
      if(k === 'word') return S('3w' + r.a + r.b, Object.assign({ expr:'', cap:'Огород прямоугольный. Периметр ' + r.P + ' м, длина ' + r.a + ' м. Какая ширина?', say:[G.say('Огород прямоугольный. Периметр ' + r.P + ' метров, длина ' + r.a + ' метров. Какая у огорода ширина?')], ans:String(r.b), opts:M.numOpts(r.b, 1, 14, [r.P/2, r.P - r.a, r.a]) }, hintRect(r.a, r.b)));
      var good = r.P + ' ÷ 2 − ' + r.a, bad = [r.P + ' − ' + r.a, r.P + ' ÷ 4', r.P + ' ÷ 2 + ' + r.a];
      return S('3s' + r.a + r.b, Object.assign(G.choice({ q:'Периметр прямоугольника ' + r.P + ' м, сторона ' + r.a + ' м. Как найти другую сторону?', opts:[good].concat(bad), ans:good, layout:'card' }), hintRect(r.a, r.b), { hintExpr:'<span class="ok">' + good + '</span>' }));
    }

    M.run({ root:containerId, key:'findside', need:10, theme:'forest', levels:[L1, L2, L3] });
  });
}
