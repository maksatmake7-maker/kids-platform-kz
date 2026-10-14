/* ===== Білім Аралы — «Сложи и узнай: Базар Барсика» (v3) =====
   Математика, 1 класс: сложение (цели 1.1.2.1, 1.1.2.3, 1.1.2.5, 1.5.2.2, 1.5.2.3, 1.2.1.5 приказа №399).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'market', icons:['🍎','🧺','➕']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initAdditionGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    function solved(tokens, parts, vis){          // разбор после ошибки: решённый пример + картинка
      return { hintExpr: eqs(parts), hintSay: tokens, hint: function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(parts) + '</div>' + (vis || ''); } };
    }
    function pairVis(a, b, em){ return '<div class="mxs-row">' + M.grp(a, em) + '<span class="mxs-plus">+</span>' + M.grp(b, em) + '</div>'; }
    var Q = M.Q(), QB = M.QB(), OK = M.OKV;

    /* ===== Уровень 1 (⭐): сумма до 10, яблоки падают в корзину / «положи столько» ===== */
    function L1(em){
      var a = rnd(1,6), b = rnd(1,Math.min(6,10-a)), s = a+b;
      var h = solved([a,'+',b,'=',s], [a,'+',b,'=',OK(s)], M.grp(s, em));
      if(Math.random() < .5){
        return S('1d'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',Q]), say:V.tpl('sum',{a:a,b:b}), ans:String(s), opts:M.numOpts(s,1,10),
          field:function(el, X, task){ var d = M.dropSum(el, X, a, b, em); task.afterSay = function(){ d.run(); }; }
        }, h));
      }
      return S('1b'+a+b, Object.assign(M.buildBasket({
        target:s, start:0, em:em, shelf:Math.min(s+3,12), expr:eqs([a,'+',b]), say:V.tpl('putsum',{a:a,b:b})
      }), h));
    }

    /* ===== Уровень 2 (⭐⭐): прыжки по числам, пропущенное слагаемое, переместительное свойство, качели ===== */
    function L2(em){
      var t = pick(['hop','hop','missBuild','missPick','comm','seesaw','zero']), a, b, c, d, s, sy;
      if(t === 'hop'){
        a = rnd(1,8); b = rnd(1,10-a); s = a+b;
        return S('2h'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',Q]), say:V.tpl('sum',{a:a,b:b}), ans:String(s), opts:M.numOpts(s,2,10),
          field:function(el, X, task){ var h = M.hops(el, X, a, s, 10); task.afterSay = function(){ h.run(); }; }
        }, solved([a,'+',b,'=',s], [a,'+',b,'=',OK(s)], M.grp(s, em))));
      }
      if(t === 'zero'){
        a = rnd(1,10);
        return S('2z'+a, Object.assign({
          expr:eqs(Math.random()<.5 ? [a,'+',0,'=',Q] : [0,'+',a,'=',Q]), say:V.tpl('expr',{tokens:[a,'+',0,'=','?']}), ans:String(a), opts:M.numOpts(a,0,10,[0]),
          field:function(el){ el.innerHTML = M.grp(a, em); }
        }, solved([a,'+',0,'=',a], [a,'+',0,'=',OK(a)], M.grp(a, em))));
      }
      if(t === 'missBuild'){
        s = rnd(4,10); a = rnd(1,s-2); b = s-a;
        return S('2mb'+a+s, Object.assign(M.buildBasket({
          target:s, start:a, em:em, shelf:b+3, expr:eqs([a,'+',QB,'=',s]), say:V.tpl('addmiss',{a:a,c:s})
        }), solved([a,'+',b,'=',s], [a,'+',OK(b),'=',s], M.grp(s, em))));
      }
      if(t === 'missPick'){
        s = rnd(3,10); a = rnd(1,s-1); b = s-a;
        return S('2mp'+a+s, Object.assign({
          expr:eqs([a,'+',QB,'=',s]), say:V.tpl('expr',{tokens:[a,'+','?','=',s], q:'missing'}), ans:String(b), opts:M.numOpts(b,0,10,[s,a]),
          field:function(el){ el.innerHTML = '<div class="mxs-row">' + M.grp(a, em) + '<span class="mxs-plus">+</span><span class="mxs-wt">?</span><span class="mxs-plus">=</span>' + M.grp(s, em) + '</div>'; }
        }, solved([a,'+',b,'=',s], [a,'+',OK(b),'=',s], M.grp(s, em))));
      }
      if(t === 'comm'){
        do { a = rnd(1,8); b = rnd(1,9-a); } while(a === b);
        return S('2c'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',QB,'+',a]), say:V.tpl('expr',{tokens:[a,'+',b,'=','?','+',a], q:'missing'}), ans:String(b), opts:M.numOpts(b,1,10,[a,a+b]),
          field:function(el){ el.innerHTML = '<div class="mxs-row">' + M.grp(a, em) + '<span class="mxs-plus">+</span>' + M.grp(b, em) + '</div>'; }
        }, solved([a,'+',b,'=',b,'+',a], [a,'+',b,'=',OK(b),'+',a], pairVis(b, a, em))));
      }
      // качели: что больше — a+b или c+d
      a = rnd(1,8); b = rnd(1,10-a);
      if(Math.random() < .3){ s = a+b; c = rnd(1,s-1); d = s-c; } else { c = rnd(1,9); d = rnd(1,10-c); }
      sy = M.cmpSym(a+b, c+d);
      return S('2s'+a+b+c+d, Object.assign({
        expr:eqs([a,'+',b,QB,c,'+',d]), say:V.tpl('expr',{tokens:[a,'+',b,'?',c,'+',d], q:'pickSign'}), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a + '+' + b + '</span>', '<span class="mxs-wt">' + c + '+' + d + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; }
      }, solved([a+b,'=',a+b], [a+'+'+b,'=',OK(a+b),'<br>',c+'+'+d,'=',OK(c+d)], '')));
    }

    /* ===== Уровень 3 (⭐⭐⭐): до 20 без перехода через десяток ===== */
    function L3(em){
      var t = pick(['frame','frame','build','miss','comp','seesaw']), a, b, c, d, s, n, sy, u;
      if(t === 'frame'){
        a = rnd(10,19); b = rnd(1,20-a); s = a+b;
        return S('3f'+a+b, Object.assign({
          expr:eqs([a,'+',b,'=',Q]), say:V.tpl('sum',{a:a,b:b}), ans:String(s), opts:M.numOpts(s,11,20,[a]),
          field:function(el){ el.innerHTML = M.frames(a, em) + '<div class="mxs-row"><span class="mxs-plus">+</span>' + M.grp(b, em) + '</div>'; }
        }, solved([a,'+',b,'=',s], [a,'+',b,'=',OK(s)], M.frames(s, em))));
      }
      if(t === 'build'){
        a = rnd(10,17); b = rnd(2,Math.min(8,20-a)); s = a+b;
        return S('3b'+a+b, Object.assign(M.buildBasket({
          target:s, start:a, em:em, shelf:b+3, expr:eqs([a,'+',b]), say:V.tpl('putsum',{a:a,b:b})
        }), solved([a,'+',b,'=',s], [a,'+',b,'=',OK(s)], M.frames(s, em))));
      }
      if(t === 'miss'){
        a = rnd(10,18); s = rnd(a+1,Math.min(20,a+9)); b = s-a;
        return S('3m'+a+s, Object.assign({
          expr:eqs([a,'+',QB,'=',s]), say:V.tpl('expr',{tokens:[a,'+','?','=',s], q:'missing'}), ans:String(b), opts:M.numOpts(b,1,10,[s,a]),
          field:function(el){ el.innerHTML = M.frames(a, em); }
        }, solved([a,'+',b,'=',s], [a,'+',OK(b),'=',s], M.frames(s, em))));
      }
      if(t === 'comp'){
        n = rnd(11,19); u = n-10;
        return S('3c'+n, Object.assign({
          expr:eqs([n,'=',10,'+',QB]), say:V.tpl('expr',{tokens:[n,'=',10,'+','?'], q:'missing'}), ans:String(u), opts:M.numOpts(u,1,9,[u+1]),
          field:function(el){ el.innerHTML = M.frames(n, em); }
        }, solved([n,'=',10,'+',u], [n,'=',10,'+',OK(u)], M.frames(n, em))));
      }
      a = rnd(10,16); b = rnd(1,20-a);
      if(Math.random() < .3){ c = rnd(10,16); d = a+b-c; if(d < 1 || d > 20-c){ c = a; d = b; } } else { c = rnd(10,16); d = rnd(1,20-c); }
      sy = M.cmpSym(a+b, c+d);
      return S('3s'+a+b+c+d, Object.assign({
        expr:eqs([a,'+',b,QB,c,'+',d]), small:true, say:V.tpl('expr',{tokens:[a,'+',b,'?',c,'+',d], q:'pickSign'}), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt">' + a + '+' + b + '</span>', '<span class="mxs-wt">' + c + '+' + d + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; }
      }, solved([a+b,'=',a+b], [a+'+'+b,'=',OK(a+b),'<br>',c+'+'+d,'=',OK(c+d)], '')));
    }

    M.run({ root:containerId, key:'addition', need:10, theme:'market', levels:[L1,L2,L3] });
  });
}
