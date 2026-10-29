/* ===== Білім Аралы — «Единицы длины: Линейка Барсика» (v3) =====
   Математика, 2 класс (цели 2.1.3.3, 2.1.3.4 приказа №399): сантиметр, дециметр, метр; перевод и сравнение.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'workshop', icons:['📏','✏️','🚌']};
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

function initUnitsGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    var TBL = '1 дм = 10 см<br>1 м = 10 дм<br>1 м = 100 см';
    function hint(txt, say, vis){ return { hintSay:[G.say(say)], hint:G.hintCard(vis || '', txt + '<br><span style="opacity:.75">' + TBL + '</span>') }; }
    function numO(ans, lo, hi, ex){ return M.numOpts(ans, lo, hi, ex); }
    var BANK = [['✏️', 'длина карандаша', 'см'], ['🧹', 'длина швабры', 'м'], ['🚌', 'длина автобуса', 'м'], ['🍀', 'длина листика клевера', 'см'], ['🚪', 'высота двери', 'м'], ['📎', 'длина скрепки', 'см'], ['🌳', 'высота дерева', 'м'], ['🐛', 'длина гусеницы', 'см'], ['🏊', 'длина бассейна', 'м'], ['🪥', 'длина зубной щётки', 'см'], ['🦒', 'высота жирафа', 'м'], ['🍬', 'длина конфеты', 'см']];

    /* ⭐ измерь линейкой / чем измерить */
    function L1(){
      if(Math.random() < .55){
        var len = rnd(3, 11), em = pick(['✏️', '🖍️']);
        return S('1r' + len, Object.assign({ expr:'', cap:'Какой длины карандаш? Смотри на линейку', say:[G.say('Какой длины карандаш? Смотри, до какого числа дошёл его кончик.')], ans:String(len), opts:numO(len, 1, 12, [len - 1, len + 1]),
          field:function(el){ el.innerHTML = G.ruler(len, em) + '<div class="g2-lab">на линейке — сантиметры (см)</div>'; } }, hint(len + ' см', 'Карандаш начинается с нуля и заканчивается на числе ' + len + '. Значит, его длина — ' + len + ' ' + G.plural(len, 'сантиметр', 'сантиметра', 'сантиметров') + '.', G.ruler(len, em))));
      }
      var b = pick(BANK);
      return S('1u' + b[1], { expr:'<span style="font-size:2.6rem">' + b[0] + '</span>', cap:b[1] + ': в чём измерить — в см или в м?', say:[G.say(b[1] + '. В чём это удобнее измерить: в сантиметрах или в метрах?')], ans:b[2], layout:'wide', opts:G.txtOpts(['см', 'м']),
        hintExpr:'<span class="ok">' + b[2] + '</span>', hintSay:[G.say(b[2] === 'см' ? 'Это маленький предмет — его измеряют сантиметрами.' : 'Это большой предмет — его измеряют метрами.')], hint:G.hintCard('<span style="font-size:3rem">' + b[0] + '</span>', b[2] === 'см' ? 'Маленькое — в <b>сантиметрах</b>' : 'Большое — в <b>метрах</b>') });
    }
    /* ⭐⭐ дм ↔ см */
    function L2(){
      var k = pick(['d2c', 'c2d', 'd2c', 'c2d', 'm2d']), n;
      if(k === 'm2d'){ n = rnd(1, 9); return S('2m' + n, Object.assign({ expr:eqs([n, 'м', '=', QB, 'дм']), say:[G.say(n + ' ' + G.plural(n, 'метр', 'метра', 'метров') + ' — сколько это дециметров?')], ans:String(n*10), opts:numO(n*10, 10, 90, [n, n*100 > 90 ? 100 : n*10 + 10, n*10 - 10]) }, hint(n + ' м = ' + n + ' × 10 = <b>' + n*10 + ' дм</b>', 'В одном метре десять дециметров. ' + n + ' умножить на десять — ' + n*10 + '.'))); }
      if(k === 'd2c'){ n = rnd(2, 9); return S('2d' + n, Object.assign({ expr:eqs([n, 'дм', '=', QB, 'см']), say:[G.say(n + ' ' + G.plural(n, 'дециметр', 'дециметра', 'дециметров') + ' — сколько это сантиметров?')], ans:String(n*10), opts:numO(n*10, 10, 90, [n, n*10 + 10, n*10 - 10]),
        field:function(el){ el.innerHTML = G.blocks(n, 0, '1 дм = 10 см (одна синяя палочка)'); } }, hint(n + ' дм = ' + n + ' × 10 = <b>' + n*10 + ' см</b>', 'В одном дециметре десять сантиметров. ' + n + ' умножить на десять — ' + n*10 + '.', G.blocks(n, 0)))); }
      n = rnd(2, 9); return S('2c' + n, Object.assign({ expr:eqs([n*10, 'см', '=', QB, 'дм']), say:[G.say(n*10 + ' ' + G.plural(n*10, 'сантиметр', 'сантиметра', 'сантиметров') + ' — сколько это дециметров?')], ans:String(n), opts:numO(n, 1, 10, [n*10, n + 1, n - 1]),
        field:function(el){ el.innerHTML = G.blocks(n, 0, 'каждая палочка — 10 см'); } }, hint(n*10 + ' см = ' + n*10 + ' ÷ 10 = <b>' + n + ' дм</b>', n*10 + ' ' + G.plural(n*10, 'сантиметр', 'сантиметра', 'сантиметров') + ' — это ' + n + ' ' + G.plural(n, 'дециметр', 'дециметра', 'дециметров') + ': в каждом дециметре десять сантиметров.', G.blocks(n, 0))));
    }
    /* ⭐⭐⭐ м ↔ см, сравнение, составные */
    function L3(){
      var k = pick(['m2c', 'c2m', 'comp', 'cmp', 'cmp']), n;
      if(k === 'm2c'){ n = rnd(1, 9); return S('3m' + n, Object.assign({ expr:eqs([n, 'м', '=', QB, 'см']), say:[G.say(n + ' ' + G.plural(n, 'метр', 'метра', 'метров') + ' — сколько это сантиметров?')], ans:String(n*100), opts:numO(n*100, 100, 900, [n*10, n*100 + 100, n*100 - 100].filter(function(x){ return x % 100 === 0 || x === n*10; })) }, hint(n + ' м = ' + n + ' × 100 = <b>' + n*100 + ' см</b>', 'В одном метре сто сантиметров. ' + n + ' умножить на сто — ' + n*100 + '.'))); }
      if(k === 'c2m'){ n = rnd(2, 9); return S('3c' + n, Object.assign({ expr:eqs([n*100, 'см', '=', QB, 'м']), say:[G.say(n*100 + ' ' + G.plural(n*100, 'сантиметр', 'сантиметра', 'сантиметров') + ' — сколько это метров?')], ans:String(n), opts:numO(n, 1, 10, [n*10, n + 1, n - 1]) }, hint(n*100 + ' см = <b>' + n + ' м</b>', 'Сто сантиметров — это один метр. Значит, ' + n*100 + ' ' + G.plural(n*100, 'сантиметр', 'сантиметра', 'сантиметров') + ' — это ' + n + ' ' + G.plural(n, 'метр', 'метра', 'метров') + '.'))); }
      if(k === 'comp'){ var m = rnd(1, 4), d = rnd(1, 9); return S('3k' + m + d, Object.assign({ expr:eqs([m, 'м', d, 'дм', '=', QB, 'дм']), say:[G.say(m + ' ' + G.plural(m, 'метр', 'метра', 'метров') + ' ' + d + ' ' + G.plural(d, 'дециметр', 'дециметра', 'дециметров') + ' — сколько это всего дециметров?')], ans:String(m*10 + d), opts:numO(m*10 + d, 11, 49, [m + d, m*100 + d, d*10 + m]) }, hint(m + ' м = ' + m*10 + ' дм<br>' + m*10 + ' + ' + d + ' = <b>' + (m*10 + d) + ' дм</b>', m + ' ' + G.plural(m, 'метр', 'метра', 'метров') + ' — это ' + m*10 + ' ' + G.plural(m*10, 'дециметр', 'дециметра', 'дециметров') + '. Прибавим ' + d + ' — получится ' + (m*10 + d) + '.'))); }
      // сравнение величин
      var pairs = [], a = rnd(2, 9), x, y, sy, sa, sb, ta, tb;
      var mode = pick(['dm-cm', 'm-dm', 'm-cm']);
      if(mode === 'dm-cm'){ x = a; y = rnd(15, 95); sa = x + ' дм'; sb = y + ' см'; ta = x*10; tb = y; }
      else if(mode === 'm-dm'){ x = rnd(1, 5); y = rnd(8, 55); sa = x + ' м'; sb = y + ' дм'; ta = x*10; tb = y; }
      else { x = rnd(1, 4); y = rnd(50, 450); sa = x + ' м'; sb = y + ' см'; ta = x*100; tb = y; }
      if(ta === tb) { y += 1; tb = y; sb = sb.replace(/\d+/, y); }
      sy = M.cmpSym(ta, tb);
      var unit = mode === 'dm-cm' ? 'см' : mode === 'm-dm' ? 'дм' : 'см';
      return S('3x' + sa + sb, { expr:eqs([sa, QB, sb]), small:true, cap:'Сравни. Сначала переведи в одинаковые единицы', say:[G.say('Сравни длины. Сначала переведи их в одинаковые единицы.')], ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt" style="font-size:1.1rem">' + sa + '</span>', '<span class="mxs-wt" style="font-size:1.1rem">' + sb + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; },
        hintExpr:eqs([ta + ' ' + unit, QB === 0 ? '' : (sy === '=' ? '=' : sy), tb + ' ' + unit]), hintSay:[G.say(sa + ' — это ' + ta + ' ' + (unit === 'см' ? G.plural(ta, 'сантиметр', 'сантиметра', 'сантиметров') : G.plural(ta, 'дециметр', 'дециметра', 'дециметров')) + '. Сравниваем ' + ta + ' и ' + tb + '.')], hint:G.hintCard('', sa + ' = <b>' + ta + ' ' + unit + '</b><br>' + sb + '<br><span style="opacity:.75">' + TBL + '</span>') });
    }

    M.run({ root:containerId, key:'units', need:10, theme:'workshop', levels:[L1, L2, L3] });
  });
}
