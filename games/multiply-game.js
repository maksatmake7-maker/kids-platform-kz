/* ===== Білім Аралы — «Умножение: Яйца на ферме» (v3) =====
   Математика, 2 класс (цели 2.1.2.1, 2.1.2.4 приказа №399): умножение как сложение одинаковых слагаемых, таблица умножения на 2, 3, 4, 5.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'farm', icons:['🥚','✖️','🧺']};
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

function initMultiplyGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function basket(n, em){ var h = '<span style="display:inline-flex;flex-wrap:wrap;gap:1px;justify-content:center;width:' + Math.min(n, 5)*22 + 'px;font-size:1.15rem;line-height:1.05">'; for(var i = 0; i < n; i++) h += '<span>' + em + '</span>'; return h + '</span><span style="font-size:1.6rem">🧺</span>'; }
    function addLine(k, n){ var a = []; for(var i = 0; i < k; i++) a.push(n); return a.join(' + '); }
    function hint(k, n, em){
      var r = k*n; return { hintExpr:eqs([k, '×', n, '=', OK(r)]),
        hintSay:[G.say(k + ' ' + G.plural(k, 'раз', 'раза', 'раз') + ' по ' + n + ' — это ' + r + '. Можно сложить: ' + addLine(k, n) + ' равно ' + r + '.')],
        hint:G.hintCard('<div class="g2-tiles">' + Array.apply(null, Array(k)).map(function(){ return '<div class="g2-tile" style="animation:none;cursor:default">' + basket(n, em) + '</div>'; }).join('') + '</div>', addLine(k, n) + ' = <b>' + r + '</b><br>' + k + ' × ' + n + ' = <b>' + r + '</b>') };
    }
    function opts(r, k, n){ var c = [r]; [r + k, r - k, r + n, r - n, r + 1, r - 1].forEach(function(x){ if(x > 0 && c.indexOf(x) < 0 && c.length < 4) c.push(x); }); return M.shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function sayMul(k, n){ return ['f:howmuch', k, 'f:times', n]; }

    /* ⭐ корзины: нажимай на каждую — считаем по k */
    function L1(em){
      var k = rnd(2, 5), n = rnd(2, 6), r = k*n;
      return S('1' + k + n, Object.assign(G.tapSum({ expr:eqs([k, '×', n, '=', Q]), q:k + ' ' + G.plural(k, 'корзина', 'корзины', 'корзин') + ' по ' + n + '. Нажимай на корзины', say:[G.say(k + ' ' + G.plural(k, 'корзина', 'корзины', 'корзин') + ' по ' + n + ' ' + em + '. Нажимай на корзины, считай по ' + n + '. Сколько всего?')],
        units:Array.apply(null, Array(k)).map(function(){ return { h:basket(n, em), val:n }; }), opts:opts(r, k, n), ans:r }), hint(k, n, em)));
    }
    /* ⭐⭐ таблица, сумма → умножение */
    function L2(em){
      var k = pick([2, 3, 4, 5]), n = rnd(2, 10), r = k*n, t = pick(['mul', 'mul', 'sum2mul', 'rev']);
      if(t === 'sum2mul'){
        var m = rnd(3, 6), a = pick([2, 3, 4, 5]);
        return S('2s' + a + m, Object.assign({ expr:'<span>' + addLine(m, a) + '</span><span>=</span><span>' + a + '</span><span>×</span><span class="q">?</span>', small:true, cap:'Замени сложение умножением', say:[G.say('Замени сложение умножением. Сколько раз повторяется число ' + a + '?')], ans:String(m), opts:M.numOpts(m, 2, 7, [a]) }, hint(m, a, em)));
      }
      if(t === 'rev') return S('2r' + k + n, Object.assign({ expr:eqs([n, '×', k, '=', Q]), cap:'Сколько получится?', say:sayMul(n, k), ans:String(r), opts:opts(r, k, n) }, hint(k, n, em), { hintSay:[G.say(n + ' умножить на ' + k + ' — столько же, сколько ' + k + ' умножить на ' + n + ': ' + r + '.')] }));
      return S('2m' + k + n, Object.assign({ expr:eqs([k, '×', n, '=', Q]), cap:'Сколько получится?', say:sayMul(k, n), ans:String(r), opts:opts(r, k, n),
        field:n <= 6 ? function(el){ el.innerHTML = '<div class="g2-tiles">' + Array.apply(null, Array(k)).map(function(){ return '<div class="g2-tile" style="animation:none;cursor:default">' + basket(n, em) + '</div>'; }).join('') + '</div>'; } : undefined }, hint(k, n, em)));
    }
    /* ⭐⭐⭐ неизвестный множитель, «в несколько раз больше», сравнение */
    function L3(em){
      var k = pick([2, 3, 4, 5]), n = rnd(2, 9), r = k*n, t = pick(['miss', 'miss', 'times', 'cmp']);
      if(t === 'miss'){
        return S('3m' + k + n, Object.assign({ expr:eqs([k, '×', QB, '=', r]), say:V.tpl('expr', { tokens:[k, 'f:times', '?', '=', r], q:'missing' }), ans:String(n), opts:M.numOpts(n, 1, 10, [k, r / k + 1]) }, hint(k, n, em), { hintExpr:eqs([k, '×', OK(n), '=', r]), hintSay:[G.say(k + ' умножить на сколько будет ' + r + '? Считаем по ' + k + ': ' + n + ' ' + G.plural(n, 'раз', 'раза', 'раз') + '.')] }));
      }
      if(t === 'times'){
        var a = rnd(2, 6), x = pick([2, 3, 4, 5]), who = pick([['Али', 'Бек', 'Бека'], ['Аружан', 'Мадина', 'Мадины']]), th = pick([['яблоко', 'яблока', 'яблок'], ['конфета', 'конфеты', 'конфет'], ['наклейка', 'наклейки', 'наклеек']]);
        var storyTxt = 'У ' + who[0] + ' ' + a + ' ' + G.plural(a, th[0], th[1], th[2]) + '. У ' + who[2] + ' в ' + x + ' ' + G.plural(x, 'раз', 'раза', 'раз') + ' больше. Сколько ' + th[2] + ' у ' + who[2] + '?';
        return S('3t' + a + x, Object.assign({ expr:'', cap:storyTxt, say:[G.say(storyTxt)], ans:String(a*x),
          field:function(el){ el.innerHTML = '<div class="g2-expl">' + who[0] + ': ' + a + '<br>' + who[1] + ': ' + a + ' × ' + x + ' = ?</div>'; } }, hint(x, a, em), { hintExpr:eqs([a, '×', x, '=', OK(a*x)]) }));
      }
      var a1 = pick([2, 3, 4, 5]), b1 = rnd(2, 7), a2 = pick([2, 3, 4, 5, 6]), b2 = rnd(2, 8); if(a1*b1 === a2*b2) b2 += 1;
      var sy = M.cmpSym(a1*b1, a2*b2);
      return S('3c' + a1 + b1 + a2 + b2, { expr:eqs([a1, '×', b1, QB, a2, '×', b2]), small:true, say:V.tpl('expr', { tokens:[a1, 'f:times', b1, '?', a2, 'f:times', b2], q:'pickSign' }), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a1 + '×' + b1 + '</span>', '<span class="mxs-wt">' + a2 + '×' + b2 + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; },
        hintExpr:eqs([a1 + '×' + b1, '=', OK(a1*b1), '<br>', a2 + '×' + b2, '=', OK(a2*b2)]), hintSay:[G.say(a1 + ' умножить на ' + b1 + ' — ' + a1*b1 + '. ' + a2 + ' умножить на ' + b2 + ' — ' + a2*b2 + '.')], hint:'' });
    }

    M.run({ root:containerId, key:'multiply', need:10, theme:'farm', levels:[L1, L2, L3] });
  });
}
