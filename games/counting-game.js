/* ===== Білім Аралы — «Посчитай и узнай: Звёздная ночь» (v3) =====
   Математика, 1 класс: счёт и числа 1–20 (цели 1.1.1.1, 1.1.1.3, 1.1.1.5, 1.4.3.1, 1.5.2.3 приказа №399).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js подгружаются сами —
   страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  window.__mxLoad = window.__mxLoad || function(cb){
    if(window.MX) return cb();
    if(window.__mxLoading){ window.__mxLoading.push(cb); return; }
    window.__mxLoading = [cb];
    var chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js');
    (function next(){ if(!chain.length){ var q = window.__mxLoading; window.__mxLoading = null; q.forEach(function(f){ f(); }); return; } load(chain.shift(), next); })();
  };
})();

function initCountingGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var Q = M.Q(), QB = M.QB(), OK = M.OKV;
    var STAR = '⭐';
    function seqParts(arr, bi){ var r = []; arr.forEach(function(v,i){ r.push(i === bi ? QB : v); if(i < arr.length-1) r.push('<span style="color:#8B95A3">,</span>'); }); return r; }
    function seqTokens(arr, bi){ return arr.map(function(v,i){ return i === bi ? '?' : v; }); }
    function seqTask(sig, arr, bi, lo, hi, extra, small, hopMax){
      var ans = arr[bi], solvedParts = arr.map(function(v,i){ return i === bi ? M.OKV(v) : v; }), parts2 = [];
      solvedParts.forEach(function(v,i){ parts2.push(v); if(i < arr.length-1) parts2.push('<span style="color:#8B95A3">,</span>'); });
      return S(sig, {
        expr:eqs(seqParts(arr, bi)), small:small, say:V.tpl('expr',{tokens:seqTokens(arr,bi), q:'missing'}), ans:String(ans), opts:M.numOpts(ans, lo, hi, extra),
        field:hopMax ? function(el, X, task){ var first = arr[0], second = arr[1] === undefined ? first : arr[1]; var h = M.hops(el, X, first, second, hopMax); task.afterSay = function(){ h.run(); }; } : null,
        hintExpr:eqs(parts2), hintSay:arr,
        hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(parts2) + '</div>'; }
      });
    }
    function starHint(n){ return function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs([OK(n)]) + '</div>' + (n > 10 ? M.frames(n, STAR) : M.grp(n, STAR)); }; }

    /* ===== Уровень 1 (⭐): числа до 10 ===== */
    function L1(em){
      var t = pick(['count','count','build','next','prev','between']), n, a, arr;
      if(t === 'count'){
        n = rnd(2,10);
        return S('c'+n, Object.assign(M.countTap({ n:n, em:STAR, expr:'<span class="mxs-expr s">⭐ ⭐ ⭐ ?</span>', say:V.tpl('q',{k:'count'}), opts:M.numOpts(n,1,10) }), { hintSay:[n], hintExpr:eqs([OK(n)]), hint:starHint(n) }));
      }
      if(t === 'build'){
        n = rnd(2,10);
        return S('b'+n, Object.assign(M.buildBasket({ target:n, start:0, em:STAR, shelf:Math.min(n+3,13), expr:eqs([n]), say:V.tpl('put',{n:n}) }), { hintSay:[n], hintExpr:eqs([OK(n)]), hint:starHint(n) }));
      }
      if(t === 'next'){ a = rnd(1,7); return seqTask('x'+a, [a,a+1,a+2], 2, 1, 10, [], false, 10); }
      if(t === 'prev'){ a = rnd(3,10); return seqTask('p'+a, [a,a-1,a-2], 2, 1, 10, [], false, 10); }
      a = rnd(2,9); return seqTask('w'+a, [a-1,a,a+1], 1, 1, 10, [a-2,a+2], false, 10);
    }

    /* ===== Уровень 2 (⭐⭐): числа 11–20, рамки, соседи, счёт по 2 ===== */
    function L2(em){
      var t = pick(['tap','frame','nb','after','before','two']), n, a, arr, bi;
      if(t === 'tap'){
        n = rnd(11,20);
        return S('t'+n, Object.assign(M.countTap({ n:n, em:STAR, expr:'<span class="mxs-expr s">⭐ ⭐ ⭐ ?</span>', say:V.tpl('q',{k:'count'}), opts:M.numOpts(n,11,20,[n-1,n+1]) }), { hintSay:[n], hintExpr:eqs([OK(n)]), hint:starHint(n) }));
      }
      if(t === 'frame'){
        n = rnd(11,20);
        return S('f'+n, Object.assign({
          expr:'<span class="mxs-expr s">⭐ ⭐ ⭐ ?</span>', say:V.tpl('q',{k:'howmany'}), ans:String(n), opts:M.numOpts(n,11,20,[n-1,n+1]),
          field:function(el){ el.innerHTML = M.frames(n, STAR); }
        }, { hintSay:[n], hintExpr:eqs([OK(n)]), hint:starHint(n) }));
      }
      if(t === 'nb'){ n = rnd(12,19); return seqTask('n'+n, [n-1,n,n+1], 1, 11, 20, [], false, 0); }
      if(t === 'after'){ a = rnd(10,17); return seqTask('a'+a, [a,a+1,a+2,a+3], 3, 11, 20, [], false, 0); }
      if(t === 'before'){ a = rnd(13,20); return seqTask('r'+a, [a,a-1,a-2,a-3], 3, 10, 19, [], false, 0); }
      a = rnd(1,6)*2; arr = [a,a+2,a+4,a+6]; bi = rnd(2,3);
      return seqTask('t'+a+bi, arr, bi, 2, 20, [arr[bi]+1, arr[bi]-1], false, 0);
    }

    /* ===== Уровень 3 (⭐⭐⭐): обратный счёт, по 2, «до десяти», «до двадцати» ===== */
    function L3(em){
      var t = pick(['back','two','twoBack','between','to20','to10']), a, arr, bi, n, m;
      if(t === 'back'){ a = rnd(14,20); bi = rnd(1,3); arr = [a,a-1,a-2,a-3]; return seqTask('B'+a+bi, arr, bi, 10, 20, [], false, 0); }
      if(t === 'two'){ a = rnd(1,7)*2; arr = [a,a+2,a+4,a+6]; bi = rnd(1,3); if(arr[3] > 20) arr = [a-6,a-4,a-2,a]; return seqTask('W'+arr[0]+bi, arr, bi, 0, 20, [arr[bi]+1, arr[bi]-1], false, 0); }
      if(t === 'twoBack'){ a = rnd(4,10)*2; arr = [a,a-2,a-4,a-6]; bi = rnd(1,3); if(arr[3] < 2){ arr = [12,10,8,6]; } return seqTask('V'+arr[0]+bi, arr, bi, 0, 20, [arr[bi]+1, arr[bi]-1], false, 0); }
      if(t === 'between'){ a = rnd(11,18); return seqTask('Z'+a, [a-1,a,a+1], 1, 10, 20, [a-2,a+2], false, 0); }
      if(t === 'to20'){
        n = rnd(11,19);
        return S('Y'+n, Object.assign(M.buildBasket({ target:20, start:n, em:STAR, shelf:20-n+3, expr:eqs([n,'+',QB,'=',20]), say:V.tpl('addmiss',{a:n,c:20}) }),
          { hintSay:[n,'+',20-n,'=',20], hintExpr:eqs([n,'+',OK(20-n),'=',20]), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs([n,'+',OK(20-n),'=',20]) + '</div>' + M.frames(20, STAR); } }));
      }
      m = rnd(1,9);
      return S('X'+m, Object.assign(M.buildBasket({ target:10, start:m, em:STAR, shelf:10-m+3, expr:eqs([m,'+',QB,'=',10]), say:V.tpl('addmiss',{a:m,c:10}) }),
        { hintSay:[m,'+',10-m,'=',10], hintExpr:eqs([m,'+',OK(10-m),'=',10]), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs([m,'+',OK(10-m),'=',10]) + '</div>' + M.frames(10, STAR); } }));
    }

    M.run({ root:containerId, key:'count', need:10, theme:'night', levels:[L1,L2,L3] });
  });
}
