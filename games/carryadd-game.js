/* ===== Білім Аралы — «Сложение через десяток: Воздушные шары» (v3) =====
   Математика, 2 класс (цели 2.1.2.4, 2.1.2.5 приказа №399): таблица сложения однозначных чисел с переходом через десяток, вычитание с переходом.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'sky', icons:['🎈','🔟','➕']};
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

function initCarryAddGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    // разбор «через десяток»: a + b = a + x + y = 10 + y
    function hintAdd(a, b, em){
      var x = 10 - a, y = b - x, s = a + b;
      return { hintExpr:eqs([a, '+', b, '=', OK(s)]),
        hintSay:[G.say(a + ' плюс ' + b + '. Сначала дополним до десяти: ' + a + ' плюс ' + x + ' — десять. Потом десять плюс ' + y + ' — ' + s + '.')],
        hint:G.hintCard(M.frames(s, em), a + ' + ' + b + ' = ' + a + ' + <b>' + x + '</b> + ' + y + '<br>' + a + ' + ' + x + ' = 10, &nbsp;10 + ' + y + ' = <b>' + s + '</b>') };
    }
    function hintSub(s, b, em){
      var x = s - 10, y = b - x, r = s - b;
      return { hintExpr:eqs([s, '−', b, '=', OK(r)]),
        hintSay:[G.say(s + ' минус ' + b + '. Сначала отнимем ' + x + ', чтобы получилось десять. Потом ещё ' + y + '. Получится ' + r + '.')],
        hint:G.hintCard(M.frames(s, em), s + ' − ' + b + ' = ' + s + ' − <b>' + x + '</b> − ' + y + '<br>' + s + ' − ' + x + ' = 10, &nbsp;10 − ' + y + ' = <b>' + r + '</b>') };
    }
    function pair(){ var a, b; do { a = rnd(2, 9); b = rnd(2, 9); } while(a + b <= 10); return [a, b]; }

    /* ⭐ дополни до десятка → сумма с рамками */
    function L1(em){
      var p = pair(), a = p[0], b = p[1], s = a + b;
      if(Math.random() < .45){
        var need = 10 - a;
        return S('1n' + a, Object.assign({ expr:eqs([a, '+', QB, '=', 10]), cap:'Сколько не хватает до десяти?', say:[G.say('Сколько не хватает до десяти? Нужно заполнить рамку.')], ans:String(need), opts:M.numOpts(need, 1, 8, [a]),
          field:function(el){ el.innerHTML = M.frames(a, em); } }, hintAdd(a, b, em), { hintSay:[G.say('До десяти не хватает ' + need + '. Ведь ' + a + ' плюс ' + need + ' — десять.')] }));
      }
      return S('1s' + a + b, Object.assign({ expr:eqs([a, '+', b, '=', Q]), say:V.tpl('sum', { a:a, b:b }), ans:String(s), opts:M.numOpts(s, 11, 18, [10 + a - 1, s + 1]),
        field:function(el){ el.innerHTML = M.frames(a, em) + '<div class="mxs-row"><span class="mxs-plus">+</span>' + M.grp(b, em) + '</div>'; } }, hintAdd(a, b, em)));
    }

    /* ⭐⭐ таблица сложения: ответ, пропущенное слагаемое */
    function L2(em){
      var p = pair(), a = p[0], b = p[1], s = a + b, k = pick(['sum', 'sum', 'miss', 'tens']);
      if(k === 'miss'){
        return S('2m' + a + s, Object.assign({ expr:eqs([a, '+', QB, '=', s]), say:V.tpl('expr', { tokens:[a, '+', '?', '=', s], q:'missing' }), ans:String(b), opts:M.numOpts(b, 2, 9, [s - 10, a]),
          field:function(el){ el.innerHTML = M.frames(s, em); } }, hintAdd(a, b, em), { hintExpr:eqs([a, '+', OK(b), '=', s]) }));
      }
      if(k === 'tens'){
        var x = 10 - a, y = b - x;
        return S('2t' + a + b, Object.assign({ expr:eqs([a, '+', b, '=', '10', '+', QB]), cap:'Разбей число ' + b + ': сначала до десяти', say:[G.say(a + ' плюс ' + b + '. Сначала до десяти, потом сколько останется? Десять плюс сколько?')], ans:String(y), opts:M.numOpts(y, 1, 8, [x, b]) }, hintAdd(a, b, em)));
      }
      return S('2s' + a + b, Object.assign({ expr:eqs([a, '+', b, '=', Q]), say:V.tpl('sum', { a:a, b:b }), ans:String(s), opts:M.numOpts(s, 11, 18, [s - 1, s + 1, s - 10 + 1]) }, hintAdd(a, b, em)));
    }

    /* ⭐⭐⭐ вычитание через десяток, сравнение выражений */
    function L3(em){
      var k = pick(['sub', 'sub', 'subm', 'cmp']), s, b, r, a, c, d, sy;
      if(k === 'sub' || k === 'subm'){
        do { s = rnd(11, 18); b = rnd(s - 9, 9); } while(b < 2 || s - b >= 10 || b > s - 1);
        r = s - b;
        if(k === 'sub') return S('3s' + s + b, Object.assign({ expr:eqs([s, '−', b, '=', Q]), say:['f:howmuch', s, '−', b], ans:String(r), opts:M.numOpts(r, 2, 9, [r + 1, 10 - r]),
          field:function(el){ el.innerHTML = M.frames(s, em); } }, hintSub(s, b, em)));
        return S('3m' + s + r, Object.assign({ expr:eqs([s, '−', QB, '=', r]), say:V.tpl('expr', { tokens:[s, '−', '?', '=', r], q:'missing' }), ans:String(b), opts:M.numOpts(b, 2, 9, [s - 10, r]) }, hintSub(s, b, em), { hintExpr:eqs([s, '−', OK(b), '=', r]) }));
      }
      var p1 = pair(), p2 = pair(); a = p1[0]; b = p1[1]; c = p2[0]; d = p2[1];
      if(Math.random() < .3){ d = a + b - c; if(d < 2 || d > 9) { c = a; d = b; } }
      sy = M.cmpSym(a + b, c + d);
      return S('3c' + a + b + c + d, { expr:eqs([a, '+', b, QB, c, '+', d]), small:true, say:V.tpl('expr', { tokens:[a, '+', b, '?', c, '+', d], q:'pickSign' }), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a + '+' + b + '</span>', '<span class="mxs-wt">' + c + '+' + d + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; },
        hintExpr:eqs([a + '+' + b, '=', OK(a + b), '<br>', c + '+' + d, '=', OK(c + d)]), hintSay:[G.say(a + ' плюс ' + b + ' — ' + (a + b) + '. ' + c + ' плюс ' + d + ' — ' + (c + d) + '.')], hint:'' });
    }

    M.run({ root:containerId, key:'carryadd', need:10, theme:'sky', levels:[L1, L2, L3] });
  });
}
