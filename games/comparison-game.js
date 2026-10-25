/* ===== Білім Аралы — «Сравни числа: Качели Барсика» (v3) =====
   Математика, 1 класс: сравнение чисел и выражений <, =, >, ≠ (цели 1.1.1.2, 1.2.1.5, 1.5.2.2 приказа №399).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'play', icons:['⚖️','👆','🎈']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initComparisonGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var Q = M.Q(), QB = M.QB(), OK = M.OKV;
    function wt(x){ return '<span class="mxs-wt">' + x + '</span>'; }
    function pan(n, em){ var h = ''; for(var i=0;i<n;i++) h += M.o(em, i); return h; }
    function seeTask(sig, a, b, leftHtml, rightHtml, opts, layout, tokens, solvedParts, small){
      var sy = (opts === M.NE) ? (a === b ? '=' : '≠') : M.cmpSym(a, b);
      return S(sig, {
        expr:eqs(tokens.expr), small:small, say:V.tpl('expr',{tokens:tokens.say, q:'pickSign'}), ans:sy, opts:opts, layout:layout,
        field:function(el, X, task){ var sw = M.seesaw(el, leftHtml, rightHtml, X); task.reveal = function(){ sw.reveal(opts === M.NE ? (a === b ? '=' : (a > b ? '>' : '<')) : sy); }; },
        hintExpr:eqs(solvedParts), hintSay:['f:look'],
        hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(solvedParts) + '</div>'; }
      });
    }

    /* ===== Уровень 1 (⭐): предметы на качелях, 1–10 ===== */
    function L1(em){
      var a = rnd(1,10), b = Math.random() < .2 ? a : rnd(1,10);
      var e1 = pick(M.EMOJIS), e2 = pick(M.EMOJIS.filter(function(e){ return e !== e1; }));
      var sy = M.cmpSym(a,b);
      return seeTask('1:'+a+'_'+b, a, b, pan(a,e1), pan(b,e2), M.SYM3, 'sym', {expr:[a,QB,b], say:[a,'?',b]}, [a,OK(sy),b], false);
    }

    /* ===== Уровень 2 (⭐⭐): цифры 0–20, «равно / не равно» ===== */
    function L2(em){
      var t = pick(['num','num','teen','zero','ne']), a, b;
      if(t === 'num'){ a = rnd(1,10); b = Math.random() < .15 ? a : rnd(1,10); return seeTask('n'+a+'_'+b, a, b, wt(a), wt(b), M.SYM3, 'sym', {expr:[a,QB,b], say:[a,'?',b]}, [a,OK(M.cmpSym(a,b)),b]); }
      if(t === 'zero'){ a = rnd(1,10); b = 0; if(Math.random() < .5){ var x = a; a = b; b = x; } return seeTask('z'+a+'_'+b, a, b, wt(a), wt(b), M.SYM3, 'sym', {expr:[a,QB,b], say:[a,'?',b]}, [a,OK(M.cmpSym(a,b)),b]); }
      if(t === 'teen'){ a = rnd(10,20); b = Math.random() < .15 ? a : rnd(10,20); return seeTask('t'+a+'_'+b, a, b, wt(a), wt(b), M.SYM3, 'sym', {expr:[a,QB,b], say:[a,'?',b]}, [a,OK(M.cmpSym(a,b)),b]); }
      a = rnd(1,10); b = Math.random() < .5 ? a : rnd(1,10);
      return seeTask('e'+a+'_'+b, a, b, wt(a), wt(b), M.NE, 'sym2', {expr:[a,QB,b], say:[a,'?',b]}, [a,OK(a === b ? '=' : '≠'),b]);
    }

    /* ===== Уровень 3 (⭐⭐⭐): сравнение выражений ===== */
    function L3(em){
      var t = pick(['expr','expr','expr2','tens','ne']), a, b, c, d;
      if(t === 'expr'){
        b = rnd(1,9); c = rnd(1,10); a = rnd(2,19); if(Math.random() < .3) a = b + c; if(a > 20) a = 20;
        return seeTask('e'+a+'_'+b+'_'+c, a, b+c, wt(a), wt(b+'+'+c), M.SYM3, 'sym', {expr:[a,QB,b,'+',c], say:[a,'?',b,'+',c]}, [b+'+'+c,'=',OK(b+c),'<br>',a,OK(M.cmpSym(a,b+c)),b+c], true);
      }
      if(t === 'expr2'){
        b = rnd(3,10); c = rnd(1,b-1); a = rnd(1,10); if(Math.random() < .3) a = b-c;
        return seeTask('f'+b+'_'+c+'_'+a, b-c, a, wt(b+'−'+c), wt(a), M.SYM3, 'sym', {expr:[b,'−',c,QB,a], say:[b,'−',c,'?',a]}, [b+'−'+c,'=',OK(b-c),'<br>',b-c,OK(M.cmpSym(b-c,a)),a], true);
      }
      if(t === 'tens'){
        a = rnd(11,19); b = rnd(11,19); if(Math.random() < .5) b = a; c = a-10;
        return seeTask('t'+a+'_'+b, a, b, wt('10+'+c), wt(b), M.SYM3, 'sym', {expr:[10,'+',c,QB,b], say:[10,'+',c,'?',b]}, [a,OK(M.cmpSym(a,b)),b], true);
      }
      a = rnd(2,10); b = rnd(1,9); var s = a+b, dd;
      if(Math.random() < .5) dd = s; else { do { dd = s + pick([-2,-1,1,2]); } while(dd < 0 || dd > 20); }
      return seeTask('n'+a+'_'+b+'_'+dd, s, dd, wt(a+'+'+b), wt(dd), M.NE, 'sym2', {expr:[a,'+',b,QB,dd], say:[a,'+',b,'?',dd]}, [a+'+'+b,'=',OK(s),'<br>',s,OK(s === dd ? '=' : '≠'),dd], true);
    }

    M.run({ root:containerId, key:'compare', need:10, theme:'play', levels:[L1,L2,L3] });
  });
}
