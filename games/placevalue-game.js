/* ===== Білім Аралы — «Десятки и единицы: Конфетная фабрика» (v3) =====
   Математика, 2 класс (цель 2.1.1.3 приказа №399): разрядный состав двузначных чисел, десятки и единицы, разложение на разрядные слагаемые.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'candy', icons:['🍬','📦','🔢']};
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

function initPlaceValueGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function D(n){ return G.plural(n, 'десяток', 'десятка', 'десятков'); }
    function U(n){ return G.plural(n, 'единица', 'единицы', 'единиц'); }
    function words(t, o){ return t + ' ' + D(t) + (o ? ' и ' + o + ' ' + U(o) : ''); }
    function nopts(n, extra){
      var t = Math.floor(n/10), o = n % 10, c = [n];
      (extra || []).concat([o*10 + t, n + 10, n - 10, n + 1, n - 1, n + 2, n - 2]).forEach(function(x){ if(x >= 10 && x <= 99 && c.indexOf(x) < 0 && c.length < 4) c.push(x); });
      return shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; });
    }
    function split(n){ var t = Math.floor(n/10), o = n % 10; return t*10 + (o ? ' + ' + o : ''); }
    function hintN(n, say){
      var t = Math.floor(n/10), o = n % 10;
      return { hintExpr:'<span class="ok">' + n + '</span>', hintSay:[G.say(n + ' — это ' + words(t, o))], hint:G.hintCard(G.blocks(t, o), n + ' = <b>' + split(n) + '</b><br>' + words(t, o)) };
    }

    /* ⭐ картинка → число; собери число из коробок и конфет */
    function seeTask(){
      var t = rnd(1, 9), o = rnd(0, 9), n = t*10 + o;
      return S('1s' + n, Object.assign({ expr:'', cap:'Сколько конфет всего?', say:[G.say('Коробка — это десять конфет. Сколько конфет всего?')], ans:String(n), opts:nopts(n),
        field:function(el){ el.innerHTML = G.blocks(t, o) + '<div class="g2-lab">🟦 — десяток &nbsp; 🟨 — единица</div>'; } }, hintN(n)));
    }
    function buildTask(){
      var n = rnd(11, 98); if(n % 10 === 0 && Math.random() < .6) n += rnd(1, 9);
      var tN = Math.floor(n/10), oN = n % 10;
      return S('1b' + n, Object.assign({ expr:'<span class="g2-chip">' + n + '</span>', cap:'Собери число', say:[G.say('Собери число ' + n + '. Нажимай на коробку — это десять. Нажимай на конфету — это одна.')], ans:String(n), gate:false,
        field:function(el, X, task){
          var tens = 0, ones = 0;
          var show = document.createElement('div'); var row = document.createElement('div'); row.className = 'mxs-row';
          function bt(txt, cls){ var b = document.createElement('button'); b.type = 'button'; b.className = 'g2-tile'; b.innerHTML = txt; return b; }
          var bT = bt('<span class="e">📦</span>+10'), bO = bt('<span class="e">🍬</span>+1'), bR = bt('<span class="e">↺</span>'), ok = document.createElement('button');
          ok.type = 'button'; ok.className = 'g2-go'; ok.textContent = '✔';
          row.appendChild(bT); row.appendChild(bO); row.appendChild(bR);
          el.appendChild(show); el.appendChild(row); el.appendChild(ok);
          function paint(){ show.innerHTML = G.blocks(tens, ones, (tens*10 + ones) + ''); if(!tens && !ones) show.innerHTML = '<div class="g2-blocks" style="min-height:62px;width:150px;color:#7A87A6;font:800 1rem Nunito">пусто</div>'; }
          paint();
          bT.addEventListener('click', function(){ if(task._done || tens >= 9) return; tens++; X.sfx.tap(tens); paint(); });
          bO.addEventListener('click', function(){ if(task._done) return; ones++; X.sfx.tap(ones); if(ones === 10){ ones = 0; if(tens < 9) tens++; } paint(); });
          bR.addEventListener('click', function(){ if(task._done) return; tens = 0; ones = 0; paint(); });
          ok.addEventListener('click', function(){ if(task._done) return; task._done = true; task.submit(String(tens*10 + ones), ok); });
          task.auto = function(wrong){ tens = wrong ? (tN % 9) + 1 : tN; ones = oN; paint(); if(!task._done){ task._done = true; task.submit(String(tens*10 + ones), ok); } };
        } }, hintN(n)));
    }
    function L1(){ return Math.random() < .55 ? seeTask() : buildTask(); }

    /* ⭐⭐ число → десятки и единицы, разложение */
    function L2(){
      var t = rnd(2, 9), o = rnd(1, 9), n = t*10 + o, k = pick(['tens', 'ones', 'split', 'split']);
      if(k === 'tens' || k === 'ones'){
        var ans = k === 'tens' ? t : o;
        return S('2' + k + n, Object.assign({ expr:'<span class="g2-chip">' + n + '</span>', cap:k === 'tens' ? 'Сколько десятков в этом числе?' : 'Сколько единиц в этом числе?',
          say:[G.say(k === 'tens' ? 'Сколько десятков в числе ' + n + '?' : 'Сколько единиц в числе ' + n + '?')], ans:String(ans), opts:M.numOpts(ans, 0, 9, [k === 'tens' ? o : t]),
          field:function(el){ el.innerHTML = G.blocks(t, o); } }, hintN(n)));
      }
      var bad = [o*10 + ' + ' + t, t + ' + ' + o, t*10 + ' + ' + (o + 10)]; var opts = [split(n)]; bad.forEach(function(x){ if(opts.indexOf(x) < 0 && opts.length < 4) opts.push(x); });
      return S('2sp' + n, Object.assign(G.choice({ q:'Разложи число ' + n + ' на десятки и единицы', opts:opts, ans:split(n), layout:'wide' }), { field:function(el){ el.innerHTML = G.blocks(t, o); } }, hintN(n)));
    }

    /* ⭐⭐⭐ сложение разрядов, слова, сравнение, нули */
    function L3(){
      var k = pick(['sum', 'sum', 'words', 'which', 'zero', 'digit']), t = rnd(2, 9), o = rnd(1, 9), n = t*10 + o, a, b;
      if(k === 'sum'){
        return S('3s' + n, Object.assign({ expr:'<span>' + t*10 + '</span><span>+</span><span>' + o + '</span><span>=</span><span class="q">?</span>', cap:'Сколько получится?', say:[G.say(t*10 + ' плюс ' + o + '. Сколько получится?')], ans:String(n), opts:nopts(n) }, hintN(n)));
      }
      if(k === 'words'){
        return S('3w' + n, Object.assign({ expr:'<span class="g2-chip" style="font-size:1.1rem">' + words(t, o) + '</span>', cap:'Какое это число?', say:[G.say(words(t, o) + '. Какое это число?')], ans:String(n), opts:nopts(n),
          field:function(el){ el.innerHTML = G.blocks(t, o); } }, hintN(n)));
      }
      if(k === 'zero'){
        return S('3z' + t, Object.assign({ expr:'<span class="g2-chip" style="font-size:1.1rem">' + words(t, 0) + '</span>', cap:'Какое это число? Единиц нет!', say:[G.say(words(t, 0) + ', единиц нет. Какое это число?')], ans:String(t*10), opts:nopts(t*10, [t, t*10 + 1]),
          field:function(el){ el.innerHTML = G.blocks(t, 0); } }, hintN(t*10)));
      }
      if(k === 'which'){
        a = rnd(2, 9); do { b = rnd(2, 9); } while(b === a);
        var xa = a*10 + rnd(0, 9), xb = b*10 + rnd(0, 9), win = a > b ? xa : xb;
        return S('3c' + xa + xb, Object.assign({ expr:'<span>' + xa + '</span><span>или</span><span>' + xb + '</span>', cap:'В каком числе десятков больше?', say:[G.say('В каком числе десятков больше: ' + xa + ' или ' + xb + '?')], ans:String(win), opts:[{ v:String(xa), h:String(xa) }, { v:String(xb), h:String(xb) }], layout:'wide',
          field:function(el){ el.innerHTML = '<div class="mxs-row">' + G.blocks(a, xa % 10) + G.blocks(b, xb % 10) + '</div>'; } }, hintN(win)));
      }
      var dig = pick(['tens', 'ones']), ans = dig === 'tens' ? t : o;
      return S('3d' + dig + n, Object.assign({ expr:'<span class="g2-chip">' + n + '</span>', cap:dig === 'tens' ? 'Какая цифра стоит в разряде десятков?' : 'Какая цифра стоит в разряде единиц?', say:[G.say(dig === 'tens' ? 'Какая цифра стоит в разряде десятков числа ' + n + '?' : 'Какая цифра стоит в разряде единиц числа ' + n + '?')],
        ans:String(ans), opts:M.numOpts(ans, 1, 9, [dig === 'tens' ? o : t]) }, hintN(n)));
    }

    M.run({ root:containerId, key:'placevalue', need:10, theme:'candy', levels:[L1, L2, L3] });
  });
}
