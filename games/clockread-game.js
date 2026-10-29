/* ===== Білім Аралы — «Который час: Закатные часы» (v3) =====
   Математика, 2 класс (цель 2.1.3.5 приказа №399): время по циферблату, часы и минуты, четверти часа.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'sunset', icons:['🕒','⏰','🌇']};
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

function initClockReadGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, OK = M.OKV;
    function S(sig, t){ t.sig = sig; return t; }
    function pad(n){ return n < 10 ? '0' + n : String(n); }
    function tm(h, m){ return h + ':' + pad(m); }
    function say(h, m){
      var H = ['двенадцать', 'час', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать'][h % 12];
      return m === 0 ? (h % 12 === 1 ? 'час' : H + ' ' + (h % 12 >= 2 && h % 12 <= 4 ? 'часа' : 'часов')) : m === 30 ? 'половина ' + ['первого', 'второго', 'третьего', 'четвёртого', 'пятого', 'шестого', 'седьмого', 'восьмого', 'девятого', 'десятого', 'одиннадцатого', 'двенадцатого'][h % 12] : tm(h, m);
    }
    function hr(){ return rnd(1, 12); }
    function wrongTimes(h, m, n){
      var c = [tm(h, m)], tries = 0, mins = [0, 15, 30, 45];
      while(c.length < n && tries++ < 100){ var hh = [h, h, h + 1, h - 1, m === 0 ? 12 : h][rnd(0, 4)]; hh = ((hh - 1 + 12) % 12) + 1; var mm = pick(mins); var t = tm(hh, mm); if(c.indexOf(t) < 0) c.push(t); }
      return c;
    }
    function hintC(h, m){
      var long = m === 0 ? 'Короткая стрелка на ' + h + ', длинная на 12 — ровно ' + h + ':00.' : m === 15 ? 'Длинная стрелка на 3 — это 15 минут (четверть часа).' : m === 30 ? 'Длинная стрелка на 6 — это 30 минут (половина часа).' : 'Длинная стрелка на 9 — это 45 минут (без четверти).';
      return { hintExpr:'<span class="ok">' + tm(h, m) + '</span>', hintSay:[G.say(long + ' Время: ' + tm(h, m) + '.')], hint:G.hintCard(G.clock(h, m, { size:150 }), 'Короткая стрелка — часы, длинная — минуты<br>' + long) };
    }
    /* ⭐ целые часы и половина */
    function L1(){
      var h = hr(), m = pick([0, 0, 30]);
      return S('1' + h + m, Object.assign({ expr:'', cap:'Который час?', say:[G.say('Который час?')], ans:tm(h, m), opts:G.txtOpts(wrongTimes(h, m, 4)).map(function(o){ return { v:o.v, h:o.v }; }), layout:'wide',
        field:function(el){ el.innerHTML = G.clock(h, m); } }, hintC(h, m)));
    }
    /* ⭐⭐ четверти: 15 и 45; найди часы с таким временем */
    function L2(){
      var h = hr(), m = pick([15, 45, 15, 45, 0, 30]);
      if(Math.random() < .5){
        return S('2f' + h + m, Object.assign({ expr:'<span class="g2-chip">' + tm(h, m) + '</span>', cap:'Найди часы, которые показывают это время', say:[G.say('Найди часы, которые показывают ' + tm(h, m) + '.')], ans:tm(h, m), gate:false,
          field:function(el, X, task){
            var wr = wrongTimes(h, m, 4), w = document.createElement('div'); w.className = 'g2-tiles'; el.appendChild(w); var bs = [];
            M.shuffle(wr).forEach(function(t, i){ var p = t.split(':'), b = document.createElement('button'); b.type = 'button'; b.className = 'g2-tile'; b.setAttribute('data-k', t); b.style.animationDelay = (i*.06) + 's'; b.innerHTML = G.clock(+p[0], +p[1], { size:104, ticks:false }); bs.push(b);
              b.addEventListener('click', function(){ if(task._done) return; task._done = true; X.sfx.tap(2); b.classList.add(t === tm(h, m) ? 'on' : 'no'); task.submit(t, b); }); w.appendChild(b); });
            task.auto = function(wrong){ var b = bs.filter(function(x){ return (x.getAttribute('data-k') === tm(h, m)) === !wrong; })[0]; if(b) b.click(); };
          } }, hintC(h, m)));
      }
      return S('2r' + h + m, Object.assign({ expr:'', cap:'Который час?', say:[G.say('Который час?')], ans:tm(h, m), opts:G.txtOpts(wrongTimes(h, m, 4)).map(function(o){ return { v:o.v, h:o.v }; }), layout:'wide', field:function(el){ el.innerHTML = G.clock(h, m); } }, hintC(h, m)));
    }
    /* ⭐⭐⭐ время идёт: что покажут часы через… */
    function L3(){
      var h = hr(), m = pick([0, 15, 30, 45]), add = pick([15, 30, 45, 60]), t = h*60 + m + add, h2 = ((Math.floor(t/60) - 1) % 12) + 1, m2 = t % 60;
      var words = add === 60 ? '1 час' : add + ' минут';
      return S('3' + h + m + add, Object.assign({ expr:'<span class="g2-chip">' + tm(h, m) + '</span>', cap:'Сейчас ' + tm(h, m) + '. Что покажут часы через ' + words + '?', say:[G.say('Сейчас ' + tm(h, m) + '. Что покажут часы через ' + words + '?')], ans:tm(h2, m2), layout:'wide', opts:G.txtOpts((function(){ var c = [tm(h2, m2)], x = [tm(h, m2), tm(h2, (m2 + 30) % 60), tm(((h2) % 12) + 1, m2), tm(h2, (m2 + 15) % 60)]; x.forEach(function(q){ if(c.indexOf(q) < 0 && c.length < 4) c.push(q); }); return c; })()).map(function(o){ return { v:o.v, h:o.v }; }),
        field:function(el){ el.innerHTML = '<div class="mxs-row">' + G.clock(h, m, { size:120 }) + '<span style="font-size:2rem">➜</span><span style="font-size:3rem">⏳</span></div>'; } },
        { hintExpr:'<span class="ok">' + tm(h2, m2) + '</span>', hintSay:[G.say(tm(h, m) + ' и ещё ' + words + ' — получится ' + tm(h2, m2) + '.')], hint:G.hintCard('<div class="mxs-row">' + G.clock(h, m, { size:100 }) + '<span style="font-size:1.6rem">+ ' + add + ' мин</span>' + G.clock(h2, m2, { size:100 }) + '</div>', tm(h, m) + ' + ' + words + ' = <b>' + tm(h2, m2) + '</b>') }));
    }

    M.run({ root:containerId, key:'clockread', need:10, theme:'sunset', levels:[L1, L2, L3] });
  });
}
