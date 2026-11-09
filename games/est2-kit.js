/* ===== Білім Аралы — общий набор для игр «Естествознание, 2 класс» (воздух, ресурсы, космос, свет, звук, тепло, магниты и др.) =====
   Каждая игра — только данные (games/est2-*-game.js). Движок games/mathx.js + голос mathx-voice.js + набор mathx-g2.js + заставка mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня: ⭐ найди картинку, ⭐⭐ разложи по корзинам, ⭐⭐⭐ верно/неверно.
*/
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-g2.js'); chain.push(base + 'mathx-hero.js');
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
  var COL = [['#7FD3F0', '#3FA3CE'], ['#FFA24D', '#D9741A'], ['#4DC98F', '#27976A'], ['#B39DDB', '#7E62C0']];
  /* cfg: {key, theme, icons, find:[{q, a:[emoji,label], w:[[emoji,label]x3], h}], sort:[{say, cap, b:[[name,icon]x2], items:[[bucketIndex,emoji,label]...], h}], tf:[[text, truth, hint]]} */
  window.Est2 = {
    make:function(cfg){
      window.__mxHeroCfg = { theme:cfg.theme || 'forest', icons:cfg.icons || ['🔬', '🌍', '✨'] };
      return function(containerId){
        __mxLoad(function(){
          var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
          function S(sig, t){ t.sig = sig; return t; }
          function L1(){
            var f = pick(cfg.find), pool = [f.a].concat(f.w);
            return S('1' + f.q, Object.assign(G.pickPic({ q:f.q, say:[G.say(f.q)], items:pool.map(function(x){ return { k:x[1], h:'<span class="e">' + x[0] + '</span>', lab:x[1] }; }), ans:f.a[1] }),
              { hintExpr:'<span class="ok">' + f.a[1] + '</span>', hintSay:[G.say(f.h)], hint:G.hintCard('<span style="font-size:3.4rem;line-height:1">' + f.a[0] + '</span>', f.h) }));
          }
          function L2(){
            var s = pick(cfg.sort), it = [];
            [0, 1].forEach(function(bi){ shuffle(s.items.filter(function(x){ return x[0] === bi; })).slice(0, 3).forEach(function(x){ it.push({ k:'b' + bi, h:x[1] + ' ' + x[2] }); }); });
            return S('2' + s.cap + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(it), say:[G.say(s.say)], cap:s.cap,
              buckets:s.b.map(function(b, i){ return { k:'b' + i, name:b[0], icon:b[1], c1:COL[i][0], c2:COL[i][1] }; }), hintSay:[G.say(s.h)], hint:G.hintCard('', s.h) }));
          }
          function L3(){
            var t = pick(cfg.tf);
            return S('3t' + t[0], G.tf({ q:t[0], truth:t[1], hint:t[2] }));
          }
          M.run({ root:containerId, key:cfg.key, need:10, theme:cfg.theme || 'forest', levels:[L1, L2, L3] });
        });
      };
    }
  };
})();
