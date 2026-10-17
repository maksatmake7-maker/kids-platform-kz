/* ===== Білім Аралы — «Числа 11–20: Конфетная фабрика Барсика» (v3) =====
   Математика, 1 класс (цели 1.1.1.1–1.1.1.3 приказа №399): числа 11–20, счёт, десяток и единицы, состав числа. Уровни: считаем в рамках → десятки и единицы → набери число.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'candy', icons:['🍬','🔟','✅']};
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
function initTeensGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, QB = M.QB(), EM = '🍬';
    function solved(n){   // подсказка: 10 и n-10 в рамках
      return function(el){ el.innerHTML = M.frames(n, EM) + '<div class="mxs-expr s">' + eqs([n, '=', 10, '+', OK(n - 10)]) + '</div>'; };
    }
    function framesField(n){ return function(el){ el.innerHTML = M.frames(n, EM); }; }

    /* ⭐: считаем в рамках, дополняем десяток */
    function L1(){
      var n = rnd(11,15), t = pick(['read','read','add']);
      if(t === 'read') return S('r'+n, { expr:'', say:V.tpl('q',{k:'howmany'}), ans:String(n), opts:M.numOpts(n,11,20,[n-1,n+1]), field:framesField(n), hintSay:[n], hintExpr:eqs([OK(n)]), hint:solved(n) });
      return S('a'+n, Object.assign(M.buildBasket({ target:n, start:10, em:EM, shelf:n-10+3, expr:eqs([10,'+',QB,'=',n]), say:V.tpl('addmiss',{a:10,c:n}) }),
        { hintSay:[10,'+',n-10,'=',n], hintExpr:eqs([10,'+',OK(n-10),'=',n]), hint:solved(n) }));
    }

    /* ⭐⭐: десятки и единицы */
    function L2(){
      var t = pick(['read','ones','tens','sum','sum','decomp']), n;
      if(t === 'read'){ n = rnd(11,20); return S('R'+n, { expr:'', say:V.tpl('q',{k:'howmany'}), ans:String(n), opts:M.numOpts(n,11,20,[n-1,n+1,n+2]), field:framesField(n), hintSay:[n], hintExpr:eqs([OK(n)]), hint:solved(n) }); }
      if(t === 'ones'){ n = rnd(11,19); return S('o'+n, { expr:eqs([n]), say:V.tpl('onesin',{n:n}), ans:String(n-10), opts:M.numOpts(n-10,1,9,[n-9,n-11]), field:framesField(n), hintSay:[n-10], hintExpr:eqs([n,'=',10,'+',OK(n-10)]), hint:solved(n) }); }
      if(t === 'tens'){ n = rnd(11,20); var k = Math.floor(n/10); return S('t'+n, { expr:eqs([n]), say:V.tpl('tensin',{n:n}), ans:String(k), opts:M.numOpts(k,0,4,[k-1,k+1]), field:framesField(n), hintSay:[k], hintExpr:eqs([n,'=',OK(k)]), hint:solved(n) }); }
      if(t === 'sum'){ n = rnd(11,19); var b = n - 10, rev = Math.random() < .35;
        return S('s'+n+(rev?'r':''), { expr:eqs(rev ? [b,'+',10,'=',QB] : [10,'+',b,'=',QB]), say:V.tpl('sum', rev ? {a:b,b:10} : {a:10,b:b}), ans:String(n), opts:M.numOpts(n,11,20,[n-1,n+1]), hintSay:[10,'+',b,'=',n], hintExpr:eqs([10,'+',b,'=',OK(n)]), hint:solved(n) }); }
      n = rnd(11,19);
      return S('d'+n, { expr:eqs([n,'=',10,'+',QB]), say:V.tpl('expr',{tokens:[n,'=',10,'+','?'], q:'missing'}), ans:String(n-10), opts:M.numOpts(n-10,1,9,[n-9,n-11]), hintSay:[n,'=',10,'+',n-10], hintExpr:eqs([n,'=',10,'+',OK(n-10)]), hint:solved(n) });
    }

    /* ⭐⭐⭐: набери число, составь число, до 20 */
    function L3(){
      var t = pick(['build','build','ones','sum','decomp','tens']), n;
      if(t === 'build'){
        n = rnd(11,20); var st = (n > 13 || Math.random() < .4) ? 10 : 0;
        return S('b'+n+st, Object.assign(M.buildBasket({ target:n, start:st, em:EM, shelf:n - st + 2, expr:eqs([n]), say:V.tpl('put',{n:n}) }),
          { hintSay:[n], hintExpr:eqs([OK(n)]), hint:solved(n === 20 ? 20 : n) }));
      }
      if(t === 'ones'){ n = rnd(11,19); return S('o'+n, { expr:eqs([n]), say:V.tpl('onesin',{n:n}), ans:String(n-10), opts:M.numOpts(n-10,1,9,[n-9,n-11]), hintSay:[n-10], hintExpr:eqs([n,'=',10,'+',OK(n-10)]), hint:solved(n) }); }
      if(t === 'tens'){ n = rnd(11,20); var k = Math.floor(n/10); return S('t'+n, { expr:eqs([n]), say:V.tpl('tensin',{n:n}), ans:String(k), opts:M.numOpts(k,0,4,[k-1,k+1]), hintSay:[k], hintExpr:eqs([n,'=',OK(k)]), hint:solved(n) }); }
      if(t === 'sum'){ n = rnd(11,19); var b = n - 10; return S('s'+n, { expr:eqs([10,'+',b,'=',QB]), say:V.tpl('sum',{a:10,b:b}), ans:String(n), opts:M.numOpts(n,11,20,[n-1,n+1,n+10 > 20 ? n-2 : n+2]), hintSay:[10,'+',b,'=',n], hintExpr:eqs([10,'+',b,'=',OK(n)]), hint:solved(n) }); }
      n = rnd(11,19);
      return S('d'+n, { expr:eqs([n,'=',10,'+',QB]), say:V.tpl('expr',{tokens:[n,'=',10,'+','?'], q:'missing'}), ans:String(n-10), opts:M.numOpts(n-10,1,9,[n-9,n-11]), hintSay:[n,'=',10,'+',n-10], hintExpr:eqs([n,'=',10,'+',OK(n-10)]), hint:solved(n) });
    }

    M.run({ root:containerId, key:'teens', need:10, theme:'candy', levels:[L1,L2,L3] });
  });
}
