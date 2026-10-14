/* ===== Білім Аралы — игра «Сложи и узнай» (v3, «Игры 2.0») =====
   Математика, 1 класс: сложение (цели 1.1.2.1, 1.1.2.3, 1.1.2.5, 1.5.2.2, 1.5.2.3, 1.2.1.5 приказа №399).
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

function initAdditionGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, T = M.T, eq = M.eq, BOX = M.BOX, ok = M.ok;
    function S(sig, t){ t.sig = sig; return t; }
    // слагаемые для суммы s: a в [lo..], b = s-a
    function split(s, lo){ var a = rnd(lo, s-lo); return [a, s-a]; }

    // Уровень 1 (⭐): картинки, сумма до 10
    function L1(em){
      var a = rnd(1,6), b = rnd(1,Math.min(6,10-a)), s = a+b;
      return S('1:'+a+'+'+b, T(
        M.pair(M.objs(a,em), M.op('+'), M.objs(b,em)) + eq(['=',M.box('?')]),
        s, M.numOpts(s,1,10),
        eq([a,'+',b,'=',ok(s)],true) + M.objs(s,em,{hl:b})));
    }

    // Уровень 2 (⭐⭐): цифры, пропущенное слагаемое, переместительное свойство, сравнение сумм, числовой луч, ноль
    function L2(em){
      var t = pick(['num','num','miss','comm','cmp','line','zero']), a, b, c, d, s, sy;
      if(t === 'num'){
        a = rnd(2,9); b = rnd(1,10-a); s = a+b;
        return S('n'+a+'+'+b, T(eq([a,'+',b,'=',M.box('?')]), s, M.numOpts(s,2,10),
          eq([a,'+',b,'=',ok(s)],true) + M.objs(s,em,{hl:b})));
      }
      if(t === 'zero'){
        a = rnd(1,10);
        return S('z'+a, T(eq(Math.random()<.5 ? [a,'+',0,'=',M.box('?')] : [0,'+',a,'=',M.box('?')]),
          a, M.numOpts(a,0,10,[0]),
          eq([a,'+',0,'=',ok(a)],true) + M.objs(a,em)));
      }
      if(t === 'miss'){
        s = rnd(3,10); a = rnd(1,s-1); b = s-a;
        return S('m'+a+'+'+s, T(eq([a,'+',BOX(),'=',s]), b, M.numOpts(b,0,10,[s,a]),
          eq([a,'+',ok(b),'=',s],true) + M.objs(s,em,{hl:b})));
      }
      if(t === 'comm'){
        do { a = rnd(1,8); b = rnd(1,9-a); } while(a === b);
        return S('c'+a+'+'+b, T(eq([a,'+',b,'=',BOX(),'+',a]), b, M.numOpts(b,1,10,[a,a+b]),
          eq([a,'+',b,'=',ok(b),'+',a],true) + M.pair(M.objs(a,em), M.op('+'), M.objs(b,em))));
      }
      if(t === 'cmp'){
        a = rnd(1,8); b = rnd(1,10-a);
        if(Math.random() < .3){ var p = split(a+b,1); c = p[0]; d = p[1]; }
        else { c = rnd(1,9); d = rnd(1,10-c); }
        sy = M.cmpSym(a+b,c+d);
        return S('k'+a+b+c+d, T(eq([a,'+',b,BOX(),c,'+',d]), sy, M.SYM3,
          eq([a+'+'+b,'=',ok(a+b)],true) + eq([c+'+'+d,'=',ok(c+d)],true) + eq([a+b,ok(sy),c+d],true), 'sym'));
      }
      a = rnd(1,8); b = rnd(1,10-a); s = a+b;   // числовой луч: прыжок вперёд на b
      return S('l'+a+'+'+b, T(
        M.numline(10,[{v:a,color:'#3B82F6'}],[a,s]) + eq([a,'+',b,'=',M.box('?')],true), s, M.numOpts(s,2,10),
        eq([a,'+',b,'=',ok(s)],true) + M.numline(10,[{v:s,color:'#3FB68B'}],[a,s])));
    }

    // Уровень 3 (⭐⭐⭐): в пределах 20 без перехода через десяток; состав числа; сравнение сумм; луч до 20
    function L3(em){
      var t = pick(['num','num','miss','comp','cmp','line']), a, b, c, d, s, n, sy;
      if(t === 'num'){
        a = rnd(10,19); b = rnd(1,20-a); s = a+b;
        return S('N'+a+'+'+b, T(eq([a,'+',b,'=',M.box('?')]), s, M.numOpts(s,11,20,[a]),
          eq([a,'+',b,'=',ok(s)],true) + M.frames(s,em)));
      }
      if(t === 'miss'){
        a = rnd(10,18); s = rnd(a+1,Math.min(20,a+9)); b = s-a;
        return S('M'+a+'+'+s, T(eq([a,'+',BOX(),'=',s]), b, M.numOpts(b,1,10,[s,a]),
          eq([a,'+',ok(b),'=',s],true) + M.frames(s,em)));
      }
      if(t === 'comp'){ // разрядные слагаемые
        n = rnd(11,19); var u = n-10;
        if(Math.random() < .5)
          return S('C'+n, T(eq([n,'=',10,'+',BOX()]), u, M.numOpts(u,1,9,[n-10+1]),
            eq([n,'=',10,'+',ok(u)],true) + M.frames(n,em)));
        return S('D'+n, T(eq([BOX(),'+',u,'=',n]), 10, M.numOpts(10,1,20,[u,n]),
          eq([ok(10),'+',u,'=',n],true) + M.frames(n,em)));
      }
      if(t === 'cmp'){
        a = rnd(10,16); b = rnd(1,20-a);
        if(Math.random() < .3){ c = rnd(10,16); d = a+b-c; if(d < 1 || d > 20-c) { c = a; d = b; } }
        else { c = rnd(10,16); d = rnd(1,20-c); }
        sy = M.cmpSym(a+b,c+d);
        return S('K'+a+b+c+d, T(eq([a,'+',b,BOX(),c,'+',d],true), sy, M.SYM3,
          eq([a+'+'+b,'=',ok(a+b)],true) + eq([c+'+'+d,'=',ok(c+d)],true) + eq([a+b,ok(sy),c+d],true), 'sym'));
      }
      a = rnd(10,18); b = rnd(1,Math.min(5,20-a)); s = a+b;
      return S('L'+a+'+'+b, T(
        M.numline(20,[{v:a,color:'#3B82F6'}],[a,s]) + eq([a,'+',b,'=',M.box('?')],true), s, M.numOpts(s,11,20),
        eq([a,'+',b,'=',ok(s)],true) + M.numline(20,[{v:s,color:'#3FB68B'}],[a,s])));
    }

    M.run({ root:containerId, key:'addition', need:10, levels:[L1,L2,L3] });
  });
}
