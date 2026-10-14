/* ===== Білім Аралы — игра «Посчитай и узнай» (v3, «Игры 2.0») =====
   Математика, 1 класс: счёт и числа 1–20 (цели 1.1.1.1, 1.1.1.3, 1.1.1.5, 1.4.3.1, 1.5.2.3 приказа №399).
   «Игры 2.0»: 3 уровня, разные типы заданий, картинка-разбор после ошибки.
   Работает на движке games/mathx.js (подгружается сам — страницу менять не надо).
   Нужно ответить верно 10 раз подряд.
*/
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxLoad = window.__mxLoad || function(cb){
    if(window.MX) return cb();
    var s = document.createElement('script'); s.src = base + 'mathx.js'; s.onload = cb;
    document.head.appendChild(s);
  };
})();

function initCountingGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, T = M.T, eq = M.eq, BOX = M.BOX, ok = M.ok;
    function S(sig, t){ t.sig = sig; return t; }
    function seqLine(arr, blankIdx){
      var h = '<div class="mx-eq">';
      arr.forEach(function(v,i){
        h += ((i === blankIdx || v === null) ? BOX() : '<span>' + v + '</span>');
        if(i < arr.length-1) h += '<span style="color:#8B95A3">,</span>';
      });
      return h + '</div>';
    }
    // варианты-картинки: группы по n предметов (значение = n)
    function picOpts(ans, lo, hi, em){
      var o = M.numOpts(ans, lo, hi);
      return o.map(function(x){ var n = +x.v; return {v:x.v, h:'<span class="mx-pg">' + new Array(n+1).join(em) + '</span>'}; });
    }
    function scatter(n, em){
      var h = '<div class="mx-grp" style="max-width:300px">';
      for(var i=0;i<n;i++) h += '<span class="count-obj" style="animation-delay:' + (i*0.05) + 's;font-size:' + (2.2 - (n>10?0.5:0)) + 'rem">' + em + '</span>';
      return h + '</div>';
    }

    // Уровень 1 (⭐): числа до 10 — посчитай, найди группу, соседи
    function L1(em){
      var t = pick(['count','count','group','next','prev','between']), n, a;
      if(t === 'count'){
        n = rnd(1,10);
        return S('c'+n, T(scatter(n,em), n, M.numOpts(n,1,10), eq([ok(n)]) + M.objs(n,em)));
      }
      if(t === 'group'){
        n = rnd(2,10);
        return S('g'+n, T(eq([n]), n, picOpts(n,1,10,em), M.objs(n,em), 'pic'));
      }
      if(t === 'next'){      // 3, 4, ☐
        a = rnd(1,7); var arr = [a,a+1,a+2];
        return S('x'+a, T(seqLine([a,a+1,null]), a+2, M.numOpts(a+2,1,10), seqLine(arr,-1)));
      }
      if(t === 'prev'){      // обратный счёт: 8, 7, ☐
        a = rnd(3,10);
        return S('p'+a, T(seqLine([a,a-1,null]), a-2, M.numOpts(a-2,1,10), seqLine([a,a-1,a-2],-1)));
      }
      a = rnd(2,8);          // 4 , ☐ , 6
      return S('b'+a, T(seqLine([a-1,null,a+1]), a, M.numOpts(a,1,10), seqLine([a-1,a,a+1],-1)));
    }

    // Уровень 2 (⭐⭐): числа 11–20, десятковая рамка, соседи, счёт по 2
    function L2(em){
      var t = pick(['frame','frame','nb','after','before','two']), n, a, arr;
      if(t === 'frame'){
        n = rnd(11,20);
        return S('f'+n, T(M.frames(n,em), n, M.numOpts(n,11,20,[n-1,n+1]), eq([ok(n)]) + M.frames(n,em)));
      }
      if(t === 'nb'){        // число-сосед: ☐ , 14 , 15
        n = rnd(12,19);
        return S('n'+n, T(seqLine([n-1,null,n+1]), n, M.numOpts(n,11,20), seqLine([n-1,n,n+1],-1)));
      }
      if(t === 'after'){
        a = rnd(10,17);
        return S('a'+a, T(seqLine([a,a+1,a+2,null]), a+3, M.numOpts(a+3,11,20), seqLine([a,a+1,a+2,a+3],-1)));
      }
      if(t === 'before'){    // обратно: 17, 16, 15, ☐
        a = rnd(13,20);
        return S('r'+a, T(seqLine([a,a-1,a-2,null]), a-3, M.numOpts(a-3,10,19), seqLine([a,a-1,a-2,a-3],-1)));
      }
      a = rnd(0,6)*2; if(a === 0) a = 2;       // по 2: 2, 4, ☐
      arr = [a,a+2,a+4,a+6]; var bi = rnd(2,3);
      return S('t'+a+bi, T(seqLine(arr,bi), arr[bi], M.numOpts(arr[bi],2,20,[arr[bi]+1,arr[bi]-1]),
        seqLine(arr,-1)));
    }

    // Уровень 3 (⭐⭐⭐): обратный счёт, по 2 вперёд/назад, «между», рамка с пропуском
    function L3(em){
      var t = pick(['back','two','twoBack','between','frame2','gap']), a, arr, bi, n;
      if(t === 'back'){
        a = rnd(14,20); bi = rnd(1,3);
        arr = [a,a-1,a-2,a-3];
        return S('B'+a+bi, T(seqLine(arr,bi), arr[bi], M.numOpts(arr[bi],10,20), seqLine(arr,-1)));
      }
      if(t === 'two'){
        a = rnd(1,7)*2; arr = [a,a+2,a+4,a+6]; bi = rnd(1,3);
        if(arr[3] > 20){ arr = [a-6,a-4,a-2,a]; }
        return S('W'+arr[0]+bi, T(seqLine(arr,bi), arr[bi], M.numOpts(arr[bi],0,20,[arr[bi]+1,arr[bi]-1]), seqLine(arr,-1)));
      }
      if(t === 'twoBack'){
        a = rnd(4,10)*2; arr = [a,a-2,a-4,a-6]; bi = rnd(1,3);
        if(arr[3] < 2){ a = 12; arr = [12,10,8,6]; }
        return S('V'+arr[0]+bi, T(seqLine(arr,bi), arr[bi], M.numOpts(arr[bi],0,20,[arr[bi]+1,arr[bi]-1]), seqLine(arr,-1)));
      }
      if(t === 'between'){   // 12 , ☐ , 14  или 15 ☐ 17
        a = rnd(11,18);
        return S('Z'+a, T(seqLine([a-1,null,a+1]), a, M.numOpts(a,10,20,[a-2,a+2]), seqLine([a-1,a,a+1],-1)));
      }
      if(t === 'frame2'){    // сколько не хватает до 20
        n = rnd(11,19);
        return S('Y'+n, T(M.frames(n,em) + eq([n,'+',BOX(),'=',20],true), 20-n, M.numOpts(20-n,1,9,[n-10]),
          eq([n,'+',ok(20-n),'=',20],true) + M.frames(20,em)));
      }
      n = rnd(11,19);        // сколько до 10
      var m = rnd(1,9);
      return S('X'+m, T(M.frames(m,em) + eq([m,'+',BOX(),'=',10],true), 10-m, M.numOpts(10-m,1,9,[m]),
        eq([m,'+',ok(10-m),'=',10],true) + M.frames(10,em)));
    }

    M.run({ root:containerId, key:'count', need:10, levels:[L1,L2,L3] });
  });
}
