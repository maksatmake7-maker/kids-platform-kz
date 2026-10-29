/* ===== Білім Аралы — «Римские цифры: Часы с римскими цифрами» (v3) =====
   Математика, 2 класс (цель 2.1.1.3 приказа №399): римская нумерация до 12.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'night', icons:['⏰','Ⅻ','🔢']};
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

function initRomanGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle, OK = M.OKV, QB = M.QB();
    var R = G.RIM;
    function S(sig, t){ t.sig = sig; return t; }
    var PARTS = ['', 'I', 'II', 'III', 'V − I', 'V', 'V + I', 'V + II', 'V + III', 'X − I', 'X', 'X + I', 'X + II'];
    function hintR(n){
      var tip = n === 4 || n === 9 ? 'Маленькая цифра <b>перед</b> большой — вычитаем' : n === 6 || n === 7 || n === 8 || n === 11 || n === 12 ? 'Маленькая цифра <b>после</b> большой — прибавляем' : 'I = 1, V = 5, X = 10';
      return { hintExpr:'<span class="ok">' + R[n - 1] + ' = ' + n + '</span>', hintSay:[G.say(R[n - 1] + ' — это ' + n + '. ' + tip.replace(/<[^>]+>/g, ''))], hint:G.hintCard(G.clock(n, 0, { roman:true, nohands:true, size:130 }), R[n - 1] + ' = ' + PARTS[n] + ' = <b>' + n + '</b><br>' + tip) };
    }
    function ropts(n){ var c = [R[n - 1]], pool = [n + 1, n - 1, n === 4 ? 6 : n === 6 ? 4 : n === 9 ? 11 : n === 11 ? 9 : n + 2, n - 2]; pool.forEach(function(x){ if(x >= 1 && x <= 12 && c.indexOf(R[x - 1]) < 0 && c.length < 4) c.push(R[x - 1]); }); return G.txtOpts(c).map(function(o){ return { v:o.v, h:o.v }; }); }

    /* ⭐ циферблат: какая римская цифра у стрелки / арабское → римское */
    function L1(){
      var n = rnd(1, 12);
      if(Math.random() < .5){
        return S('1c' + n, Object.assign({ expr:'', cap:'Короткая стрелка показывает ' + n + ' ч. Какая это римская цифра?', say:[G.say('Короткая стрелка показывает ' + n + ' ' + G.plural(n, 'час', 'часа', 'часов') + '. Какая это римская цифра на циферблате?')], ans:R[n - 1], opts:ropts(n), layout:'wide', field:function(el){ el.innerHTML = G.clock(n, 0, { roman:true }); } }, hintR(n)));
      }
      return S('1a' + n, Object.assign({ expr:'<span class="g2-chip">' + n + '</span>', cap:'Как записать это число римскими цифрами?', say:[G.say('Как записать число ' + n + ' римскими цифрами?')], ans:R[n - 1], opts:ropts(n), layout:'wide' }, hintR(n)));
    }
    /* ⭐⭐ римское → арабское, арабское → римское */
    function L2(){
      var n = rnd(1, 12);
      if(Math.random() < .55){
        return S('2r' + n, Object.assign({ expr:'<span class="g2-chip">' + R[n - 1] + '</span>', cap:'Какое это число?', say:[G.say('Какое это число? Римская цифра ' + R[n - 1])], ans:String(n), opts:M.numOpts(n, 1, 12, [n + 1, n - 1, n === 4 ? 6 : n === 6 ? 4 : n === 9 ? 11 : n === 11 ? 9 : n + 2]) }, hintR(n)));
      }
      return S('2a' + n, Object.assign({ expr:'<span class="g2-chip">' + n + '</span>', cap:'Как записать римскими цифрами?', say:[G.say('Как записать число ' + n + ' римскими цифрами?')], ans:R[n - 1], opts:ropts(n), layout:'wide' }, hintR(n)));
    }
    /* ⭐⭐⭐ ряд, сумма, сравнение */
    function L3(){
      var k = pick(['seq', 'seq', 'sum', 'cmp']), n;
      if(k === 'seq'){
        n = rnd(3, 11); var a = n - 1, b = n, c = n + 1, d = Math.min(12, n + 2), pos = pick([1, 2]);
        var list = [n - 1, n, n + 1, Math.min(12, n + 2)].filter(function(x, i, arr){ return arr.indexOf(x) === i; }); if(list.length < 4) list = [n - 2, n - 1, n, n + 1];
        var miss = list[pos]; var shown = list.map(function(x, i){ return i === pos ? QB : '<span class="g2-chip">' + R[x - 1] + '</span>'; });
        return S('3q' + list.join(','), Object.assign({ expr:'<span style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;font-size:1.3rem">' + shown.map(function(x){ return x === QB ? '<span class="q">?</span>' : x; }).join('') + '</span>', cap:'Какая римская цифра пропущена?', say:[G.say('Какая римская цифра пропущена в ряду?')], ans:R[miss - 1], opts:ropts(miss), layout:'wide' }, hintR(miss)));
      }
      if(k === 'sum'){
        var x = rnd(1, 8), y = rnd(1, 12 - x), s = x + y;
        return S('3s' + x + y, Object.assign({ expr:'<span>' + R[x - 1] + '</span><span>+</span><span>' + R[y - 1] + '</span><span>=</span><span class="q">?</span>', cap:'Сложи и запиши ответ римскими цифрами', say:[G.say(R[x - 1] + ' плюс ' + R[y - 1] + '. Сколько получится? Ответ запиши римскими цифрами.')], ans:R[s - 1], opts:ropts(s), layout:'wide' },
          { hintExpr:'<span class="ok">' + R[s - 1] + '</span>', hintSay:[G.say(x + ' плюс ' + y + ' — ' + s + '. Это ' + R[s - 1] + '.')], hint:G.hintCard('', R[x - 1] + ' = ' + x + ', &nbsp;' + R[y - 1] + ' = ' + y + '<br>' + x + ' + ' + y + ' = ' + s + ' = <b>' + R[s - 1] + '</b>') }));
      }
      var p = rnd(2, 12), q; do { q = rnd(2, 12); } while(q === p);
      var win = p > q ? p : q;
      return S('3c' + p + q, Object.assign({ expr:'<span>' + R[p - 1] + '</span><span>или</span><span>' + R[q - 1] + '</span>', cap:'Какое число больше?', say:[G.say('Какое число больше: ' + R[p - 1] + ' или ' + R[q - 1] + '?')], ans:R[win - 1], opts:G.txtOpts([R[p - 1], R[q - 1]]).map(function(o){ return { v:o.v, h:o.v }; }), layout:'wide' }, hintR(win),
        { hintExpr:'<span class="ok">' + R[p - 1] + ' = ' + p + ', ' + R[q - 1] + ' = ' + q + '</span>', hintSay:[G.say(R[p - 1] + ' — это ' + p + ', а ' + R[q - 1] + ' — это ' + q + '. Больше ' + R[win - 1] + '.')] }));
    }

    M.run({ root:containerId, key:'roman', need:10, theme:'night', levels:[L1, L2, L3] });
  });
}
