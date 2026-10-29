/* ===== Білім Аралы — «Порядок действий: Мастерская скобок» (v3) =====
   Математика, 2 класс (цель 2.2.1.6 приказа №399): выражения со скобками и без скобок, порядок действий; умножение и деление раньше сложения и вычитания.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'workshop', icons:['🔧','( )','🔢']};
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

function initOrderOpsGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function sp(tok){ var r = []; tok.forEach(function(t){ r.push(t === '(' ? 'f:lbr' : t === ')' ? '.' : t === '×' ? 'f:times' : t === '÷' ? 'f:divby' : t); }); return r; }
    // виды выражений: функция (a,b,c) → {tok, first, other, steps:[[текст,значение]], r, wrong} или null
    var KINDS = {
      'a+b-c': function(a,b,c){ var x = a + b, r = x - c; if(r < 0) return null; return { tok:[a,'+',b,'−',c], first:a + ' + ' + b, other:b + ' − ' + c, st:[[a + ' + ' + b, x], [x + ' − ' + c, r]], r:r, wrong:a + (b - c) }; },
      'a-b+c': function(a,b,c){ var x = a - b, r = x + c; if(x < 0) return null; return { tok:[a,'−',b,'+',c], first:a + ' − ' + b, other:b + ' + ' + c, st:[[a + ' − ' + b, x], [x + ' + ' + c, r]], r:r, wrong:a - (b + c) }; },
      'a-b-c': function(a,b,c){ var x = a - b, r = x - c; if(r < 0) return null; return { tok:[a,'−',b,'−',c], first:a + ' − ' + b, other:b + ' − ' + c, st:[[a + ' − ' + b, x], [x + ' − ' + c, r]], r:r, wrong:a - (b - c) }; },
      '(a+b)-c': function(a,b,c){ var x = a + b, r = x - c; if(r < 0) return null; return { tok:['(',a,'+',b,')','−',c], first:a + ' + ' + b, other:b + ' − ' + c, st:[[a + ' + ' + b, x], [x + ' − ' + c, r]], r:r, wrong:a + (b - c) }; },
      'a-(b+c)': function(a,b,c){ var x = b + c, r = a - x; if(r < 0) return null; return { tok:[a,'−','(',b,'+',c,')'], first:b + ' + ' + c, other:a + ' − ' + b, st:[[b + ' + ' + c, x], [a + ' − ' + x, r]], r:r, wrong:a - b + c }; },
      '(a-b)+c': function(a,b,c){ var x = a - b, r = x + c; if(x < 0) return null; return { tok:['(',a,'−',b,')','+',c], first:a + ' − ' + b, other:b + ' + ' + c, st:[[a + ' − ' + b, x], [x + ' + ' + c, r]], r:r, wrong:a - (b + c) }; },
      'a+(b-c)': function(a,b,c){ var x = b - c, r = a + x; if(x < 1) return null; return { tok:[a,'+','(',b,'−',c,')'], first:b + ' − ' + c, other:a + ' + ' + b, st:[[b + ' − ' + c, x], [a + ' + ' + x, r]], r:r, wrong:a + b - c + 0 === r ? r + 2 : a + b - c }; },
      'a-(b-c)': function(a,b,c){ var x = b - c, r = a - x; if(x < 1 || r < 0) return null; return { tok:[a,'−','(',b,'−',c,')'], first:b + ' − ' + c, other:a + ' − ' + b, st:[[b + ' − ' + c, x], [a + ' − ' + x, r]], r:r, wrong:a - b - c < 0 ? a - b + c : a - b - c }; },
      'a+b*c': function(a,b,c){ var x = b*c, r = a + x; return { tok:[a,'+',b,'×',c], first:b + ' × ' + c, other:a + ' + ' + b, st:[[b + ' × ' + c, x], [a + ' + ' + x, r]], r:r, wrong:(a + b)*c }; },
      '(a+b)*c': function(a,b,c){ var x = a + b, r = x*c; return { tok:['(',a,'+',b,')','×',c], first:a + ' + ' + b, other:b + ' × ' + c, st:[[a + ' + ' + b, x], [x + ' × ' + c, r]], r:r, wrong:a + b*c }; },
      'a*b+c': function(a,b,c){ var x = a*b, r = x + c; return { tok:[a,'×',b,'+',c], first:a + ' × ' + b, other:b + ' + ' + c, st:[[a + ' × ' + b, x], [x + ' + ' + c, r]], r:r, wrong:a*(b + c) }; },
      'a-b*c': function(a,b,c){ var x = b*c, r = a - x; if(r < 0) return null; return { tok:[a,'−',b,'×',c], first:b + ' × ' + c, other:a + ' − ' + b, st:[[b + ' × ' + c, x], [a + ' − ' + x, r]], r:r, wrong:(a - b)*c }; },
      'a+b/c': function(a,b0,c0){ var c = rnd(2, 5), x = rnd(2, 6), b = c*x, r = a + x; return { tok:[a,'+',b,'÷',c], first:b + ' ÷ ' + c, other:a + ' + ' + b, st:[[b + ' ÷ ' + c, x], [a + ' + ' + x, r]], r:r, wrong:(a + b)/c }; }
    };
    function build(kind, ra, rb, rc){
      for(var i = 0; i < 80; i++){ var e = KINDS[kind](rnd(ra[0], ra[1]), rnd(rb[0], rb[1]), rnd(rc[0], rc[1])); if(e && e.r <= 99){ e.kind = kind; return e; } }
      return KINDS[kind](9, 5, 2);
    }
    function ropts(e){ var c = [e.r]; [e.wrong, e.r + 1, e.r - 1, e.r + 10, e.r - 10, e.r + 2].forEach(function(x){ if(x >= 0 && x !== e.r && c.indexOf(x) < 0 && c.length < 4 && x === Math.floor(x)) c.push(x); }); return M.shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function hintE(e){
      var lines = e.st.map(function(s, i){ return '<div><span class="n">' + (i + 1) + '</span> ' + s[0] + ' = <b>' + s[1] + '</b></div>'; }).join('');
      var say = G.say('Сначала ' + e.st[0][0].replace('−', 'минус').replace('+', 'плюс').replace('×', 'умножить на').replace('÷', 'разделить на') + ' — получится ' + e.st[0][1] + '. Потом ' + e.st[1][0].replace('−', 'минус').replace('+', 'плюс').replace('×', 'умножить на') + ' — получится ' + e.st[1][1] + '.');
      return { hintExpr:eqs(e.tok.concat(['=', OK(e.r)])), hintSay:[say], hint:G.hintCard('<div class="g2-step" style="flex-direction:column;align-items:flex-start;gap:6px">' + lines + '</div>', e.kind.indexOf('(') >= 0 ? 'Скобки: действие в скобках — первое.' : (/[*/]/.test(e.kind) ? '× и ÷ — раньше, чем + и −.' : 'Без скобок считаем слева направо.')) };
    }
    function valueTask(e, tag){
      return S(tag + e.kind + e.tok.join(''), Object.assign({ expr:eqs(e.tok.concat(['=', Q])), small:e.tok.length > 5, cap:'Сколько получится?', say:['f:howmuch'].concat(sp(e.tok)), ans:String(e.r), opts:ropts(e) }, hintE(e)));
    }
    function firstTask(e, tag){
      var third = (function(){ var m = e.first.match(/^(\d+) (.) (\d+)$/); var o = e.other.match(/^(\d+) (.) (\d+)$/); return m && o ? m[1] + ' ' + m[2] + ' ' + o[3] : null; })();
      var opts = [e.first, e.other]; if(third && opts.indexOf(third) < 0) opts.push(third);
      return S(tag + 'f' + e.kind + e.tok.join(''), Object.assign({ expr:eqs(e.tok), small:e.tok.length > 5, cap:'Какое действие делаем первым?', say:sp(e.tok).concat([G.say('Какое действие делаем первым?')]), ans:e.first, opts:G.txtOpts(opts), layout:'wide' }, hintE(e), { hintExpr:eqs(e.tok) }));
    }

    /* ⭐ без скобок, только + и −: слева направо */
    function L1(){
      var e = build(pick(['a+b-c', 'a-b+c', 'a-b-c']), [8, 40], [3, 20], [2, 15]);
      return Math.random() < .35 ? firstTask(e, '1') : valueTask(e, '1');
    }
    /* ⭐⭐ скобки меняют порядок */
    function L2(){
      var e = build(pick(['(a+b)-c', 'a-(b+c)', '(a-b)+c', 'a+(b-c)', 'a-(b-c)']), [10, 50], [3, 20], [2, 14]);
      return Math.random() < .3 ? firstTask(e, '2') : valueTask(e, '2');
    }
    /* ⭐⭐⭐ × и ÷ раньше + и −; расставь скобки */
    function L3(){
      var k = pick(['a+b*c', '(a+b)*c', 'a*b+c', 'a-b*c', 'a+b/c', 'br']);
      if(k === 'br'){
        var a, b, c; do { a = rnd(12, 40); b = rnd(2, 9); c = rnd(2, 9); } while(a - b - c < 1);
        var t = a - b - c, good = a + ' − (' + b + ' + ' + c + ')', bad = '(' + a + ' − ' + b + ') + ' + c;
        return S('3br' + a + b + c, Object.assign(G.choice({ q:'Поставь скобки, чтобы получилось ' + t, say:[G.say('Поставь скобки так, чтобы получилось ' + t + '.')], opts:[good, bad], ans:good, layout:'card',
          field:function(el){ el.innerHTML = '<div class="g2-expl" style="font:800 1.6rem Baloo 2,sans-serif">' + a + ' − ' + b + ' + ' + c + ' = ' + t + '</div>'; } }),
          { hintExpr:'<span class="ok">' + good + '</span>', hintSay:[G.say('В скобках ' + b + ' плюс ' + c + ' — ' + (b + c) + '. Потом ' + a + ' минус ' + (b + c) + ' — ' + t + '.')], hint:G.hintCard('', b + ' + ' + c + ' = ' + (b + c) + '<br>' + a + ' − ' + (b + c) + ' = <b>' + t + '</b>') }));
      }
      var e = build(k, [4, 30], [2, 9], [2, 9]);
      return Math.random() < .25 ? firstTask(e, '3') : valueTask(e, '3');
    }

    M.run({ root:containerId, key:'orderops', need:10, theme:'workshop', levels:[L1, L2, L3] });
  });
}
