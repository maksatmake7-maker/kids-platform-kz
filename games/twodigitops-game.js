/* ===== Білім Аралы — «Двузначные числа: Космические вычисления» (v3) =====
   Математика, 2 класс (цели 2.1.2.7, 2.1.2.8 приказа №399): сложение и вычитание двузначных чисел, в том числе с переходом через разряд.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'space', icons:['🚀','🔢','➕']};
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

function initTwoDigitOpsGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function T(n){ return Math.floor(n/10); } function O(n){ return n % 10; }
    function opts2(r, extra){
      var c = [r]; (extra || []).concat([r + 10, r - 10, r + 1, r - 1, r + 2, r - 2, r + 9, r - 9]).forEach(function(x){ if(x >= 0 && x <= 100 && c.indexOf(x) < 0 && c.length < 4) c.push(x); });
      return M.shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; });
    }
    // разбор «по частям»: a ± b = (a ± десятки b) ± единицы b
    function steps(a, op, b){
      var bt = T(b)*10, bo = O(b), m = op === '+' ? a + bt : a - bt, r = op === '+' ? a + b : a - b, w = op === '+' ? 'плюс' : 'минус';
      var txt = !bt ? a + ' ' + op + ' ' + b + ' = <b>' + r + '</b>' : bo ? a + ' ' + op + ' ' + bt + ' = ' + m + '<br>' + m + ' ' + op + ' ' + bo + ' = <b>' + r + '</b>' : a + ' ' + op + ' ' + bt + ' = <b>' + r + '</b>';
      return { hintExpr:eqs([a, op === '+' ? '+' : '−', b, '=', OK(r)]),
        hintSay:[G.say(bt ? a + ' ' + w + ' ' + b + '. Сначала ' + w + ' ' + bt + ' — получится ' + m + (bo ? '. Потом ' + w + ' ' + bo + ' — ' + r + '.' : '.') : a + ' ' + w + ' ' + b + ' — это ' + r + '.')],
        hint:G.hintCard('<div class="mxs-row">' + G.blocks(T(a), O(a)) + '</div>', txt) };
    }
    function vis(a, op, b){ return function(el){ el.innerHTML = '<div class="mxs-row" style="align-items:flex-end">' + G.blocks(T(a), O(a)) + '<span class="mxs-plus" style="font-size:2.2rem">' + (op === '+' ? '+' : '−') + '</span>' + G.blocks(T(b), O(b)) + '</div>'; }; }
    function exTok(a, op, b){ return ['f:howmuch', a, op === '+' ? '+' : '−', b]; }
    function mk(sig, a, op, b, fld){
      var r = op === '+' ? a + b : a - b;
      return S(sig + a + op + b, Object.assign({ expr:eqs([a, op === '+' ? '+' : '−', b, '=', Q]), say:exTok(a, op, b), ans:String(r), opts:opts2(r, op === '+' ? [a + bTens(b) + 0, r - 10 + 0] : []), field:fld === false ? undefined : vis(a, op, b) }, steps(a, op, b)));
    }
    function bTens(b){ return T(b)*10; }

    /* ⭐ без перехода (34+23, 57−23) — блоки на экране */
    function L1(){
      var a, b, op = Math.random() < .5 ? '+' : '-';
      if(op === '+'){ do { a = rnd(11, 74); b = rnd(11, 25); } while(O(a) + O(b) >= 10 || a + b > 99); }
      else { do { a = rnd(35, 99); b = rnd(11, 40); } while(O(a) < O(b) || a - b < 10); }
      return mk('1', a, op, b);
    }
    /* ⭐⭐ с переходом (45+19, 57−28) и с круглыми (47+33, 80−47, 100−35) */
    function L2(){
      var a, b, op = Math.random() < .5 ? '+' : '-', k = pick(['carry', 'carry', 'round']);
      if(k === 'round'){
        if(op === '+'){ var rr = pick([70, 80, 90, 100]); do { a = rnd(21, rr - 21); } while(O(a) === 0); b = rr - a; }
        else { a = pick([60, 70, 80, 90, 100]); do { b = rnd(11, a - 5); } while(O(b) === 0); }
        return mk('2r', a, op, b);
      }
      if(op === '+'){ do { a = rnd(21, 79); b = rnd(11, 29); } while(O(a) + O(b) < 10 || a + b > 99); }
      else { do { a = rnd(41, 99); b = rnd(11, 39); } while(O(a) >= O(b) || a - b < 10); }
      return mk('2c', a, op, b);
    }
    /* ⭐⭐⭐ устно ±9, неизвестное, сравнение */
    function L3(){
      var k = pick(['nine', 'nine', 'miss', 'cmp']), a, b, r, op;
      if(k === 'nine'){
        op = Math.random() < .5 ? '+' : '-'; b = pick([9, 8, 7, 19, 18]);
        if(op === '+'){ a = rnd(21, 80 - b); } else { a = rnd(30, 99); if(a - b < 10) a += 20; if(a > 99) a = 99; }
        return mk('3n', a, op, b);
      }
      if(k === 'miss'){
        a = rnd(11, 60); b = rnd(11, 35); r = a + b;
        var showA = Math.random() < .5;
        return S('3m' + a + b, Object.assign({ expr:showA ? eqs([QB, '+', b, '=', r]) : eqs([a, '+', QB, '=', r]), say:V.tpl('expr', { tokens:showA ? ['?', '+', b, '=', r] : [a, '+', '?', '=', r], q:'missing' }), ans:String(showA ? a : b), opts:opts2(showA ? a : b, [r]) },
          { hintExpr:eqs([showA ? OK(a) : a, '+', showA ? b : OK(b), '=', r]), hintSay:[G.say('Чтобы найти неизвестное слагаемое, из суммы вычтем известное: ' + r + ' минус ' + (showA ? b : a) + ' — ' + (showA ? a : b) + '.')], hint:G.hintCard('', r + ' − ' + (showA ? b : a) + ' = <b>' + (showA ? a : b) + '</b>') }));
      }
      var x = rnd(21, 69), y = rnd(11, 29), z = pick([70, 80, 90, 100, 60]), sy = M.cmpSym(x + y, z);
      return S('3c' + x + y + z, { expr:eqs([x, '+', y, QB, z]), small:true, say:V.tpl('expr', { tokens:[x, '+', y, '?', z], q:'pickSign' }), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + x + '+' + y + '</span>', '<span class="mxs-wt">' + z + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; },
        hintExpr:eqs([x + '+' + y, '=', OK(x + y)]), hintSay:[G.say(x + ' плюс ' + y + ' — ' + (x + y) + '. Сравниваем с ' + z + '.')], hint:'' });
    }

    M.run({ root:containerId, key:'twodigitops', need:10, theme:'space', levels:[L1, L2, L3] });
  });
}
