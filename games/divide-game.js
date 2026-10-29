/* ===== Білім Аралы — «Деление: Угощение для друзей» (v3) =====
   Математика, 2 класс (цели 2.1.2.2, 2.1.2.4 приказа №399): деление на равные части и по содержанию, связь умножения и деления.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'sunset', icons:['🍪','➗','🍽️']};
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

function initDivideGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function plates(k, per, em){ var h = '<div class="mxs-row">'; for(var i = 0; i < k; i++){ h += '<div class="g2-plate">' + Array.apply(null, Array(per)).map(function(){ return '<span>' + em + '</span>'; }).join('') + '</div>'; } return h + '</div>'; }
    function hint(total, k, em){
      var q = total / k; return { hintExpr:eqs([total, '÷', k, '=', OK(q)]),
        hintSay:[G.say(total + ' разделить на ' + k + ' — это ' + q + '. Проверим: ' + k + ' умножить на ' + q + ' равно ' + total + '.')],
        hint:G.hintCard(plates(k, q, em), total + ' ÷ ' + k + ' = <b>' + q + '</b><br>Проверка: ' + q + ' × ' + k + ' = ' + total) };
    }
    function sayDiv(a, b){ return ['f:howmuch', a, 'f:divby', b]; }

    /* ⭐ раздай поровну: тарелки */
    function L1(em){
      var k = rnd(2, 5), per = rnd(1, 5), total = k*per;
      return S('1' + k + per, Object.assign(G.deal({ expr:eqs([total, '÷', k, '=', Q]), q:'Раздай ' + total + ' ' + em + ' на ' + k + ' ' + G.plural(k, 'тарелку', 'тарелки', 'тарелок') + ' поровну', say:[G.say('Раздай ' + total + ' поровну на ' + k + ' ' + G.plural(k, 'тарелку', 'тарелки', 'тарелок') + '. Нажимай «Раздать». Сколько на каждой тарелке?')],
        plates:k, total:total, em:em, ans:per, opts:M.numOpts(per, 1, 6, [k, total - per]) }), hint(total, k, em)));
    }
    /* ⭐⭐ по содержанию, таблица деления */
    function L2(em){
      var k = pick([2, 3, 4, 5]), q = rnd(2, 10), total = k*q, t = pick(['expr', 'expr', 'content']);
      if(t === 'content'){
        var m = pick([2, 3, 4, 5]), c = rnd(2, 5), tot = m*c;
        return S('2c' + m + c, Object.assign({ expr:eqs([tot, '÷', m, '=', Q]), cap:'Раскладываем по ' + m + ' ' + em + ' в пакет. Сколько пакетов?', say:[G.say(tot + ' ' + em + ' раскладывают по ' + m + ' в пакет. Сколько получится пакетов?')], ans:String(c), opts:M.numOpts(c, 1, 8, [m, tot - m]),
          field:function(el){ el.innerHTML = '<div class="mxs-grp">' + Array.apply(null, Array(tot)).map(function(){ return '<span class="mxs-o sm">' + em + '</span>'; }).join('') + '</div>'; } }, hint(tot, m, em), { hintSay:[G.say(tot + ' разделить на ' + m + ' — это ' + c + ' ' + G.plural(c, 'пакет', 'пакета', 'пакетов') + '.')] }));
      }
      return S('2e' + k + q, Object.assign({ expr:eqs([total, '÷', k, '=', Q]), cap:'Сколько получится?', say:sayDiv(total, k), ans:String(q), opts:M.numOpts(q, 1, 10, [k, q + 1, q - 1]) }, hint(total, k, em)));
    }
    /* ⭐⭐⭐ деление и умножение — обратные действия */
    function L3(em){
      var k = pick([2, 3, 4, 5]), q = rnd(2, 9), total = k*q, t = pick(['inv', 'inv', 'fact', 'miss']);
      if(t === 'inv'){
        return S('3i' + k + q, Object.assign({ expr:eqs([QB, '×', k, '=', total]), say:V.tpl('expr', { tokens:['?', 'f:times', k, '=', total], q:'missing' }), ans:String(q), opts:M.numOpts(q, 1, 10, [k, total - k]) }, hint(total, k, em),
          { hintExpr:eqs([OK(q), '×', k, '=', total]), hintSay:[G.say('Какое число умножить на ' + k + ', чтобы получить ' + total + '? Делим: ' + total + ' на ' + k + ' — ' + q + '.')] }));
      }
      if(t === 'miss'){
        return S('3d' + total + k, Object.assign({ expr:eqs([total, '÷', QB, '=', q]), say:V.tpl('expr', { tokens:[total, 'f:divby', '?', '=', q], q:'missing' }), ans:String(k), opts:M.numOpts(k, 2, 10, [q, total / 2 | 0]) }, hint(total, k, em),
          { hintExpr:eqs([total, '÷', OK(k), '=', q]), hintSay:[G.say(total + ' разделить на сколько, чтобы получилось ' + q + '? Проверяем: ' + q + ' умножить на ' + k + ' — ' + total + '.')] }));
      }
      var good = total + ' ÷ ' + k + ' = ' + q, bad = [total + ' ÷ ' + k + ' = ' + (q + k), total + ' ÷ ' + q + ' = ' + (q + 1), k + ' ÷ ' + total + ' = ' + q];
      return S('3f' + k + q, Object.assign(G.choice({ q:'Выбери верное равенство', say:[G.say('Выбери верное равенство. Помни: деление проверяют умножением.')], opts:[good].concat(bad).slice(0, 4), ans:good, layout:'card',
        field:function(el){ el.innerHTML = '<div class="g2-expl">' + k + ' × ' + q + ' = ' + total + '</div>'; } }), hint(total, k, em), { hintExpr:'<span class="ok">' + good + '</span>' }));
    }

    M.run({ root:containerId, key:'divide', need:10, theme:'sunset', levels:[L1, L2, L3] });
  });
}
