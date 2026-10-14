/* ===== Білім Аралы — игра «Вычти и узнай» (v3, «Игры 2.0») =====
   Математика, 1 класс: вычитание (цели 1.1.2.1, 1.1.2.2, 1.1.2.5, 1.5.2.2, 1.5.2.3 приказа №399).
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

function initSubtractionGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, T = M.T, eq = M.eq, BOX = M.BOX, ok = M.ok;
    function S(sig, t){ t.sig = sig; return t; }

    // Уровень 1 (⭐): картинки, часть предметов убрали
    function L1(em){
      var a = rnd(3,10), b = rnd(1,a-1), r = a-b;
      return S('1:'+a+'-'+b, T(
        M.objs(a,em,{cross:b}) + eq([a,'−',b,'=',M.box('?')]),
        r, M.numOpts(r,1,10),
        eq([a,'−',b,'=',ok(r)],true) + M.objs(a,em,{cross:b})));
    }

    // Уровень 2 (⭐⭐): цифры, ноль, пропущенное число, обратное действие, сравнение, луч
    function L2(em){
      var t = pick(['num','num','missSub','missMin','inv','cmp','line','zero']), a, b, c, d, r, s, sy;
      if(t === 'num'){
        a = rnd(3,10); b = rnd(1,a-1); r = a-b;
        return S('n'+a+'-'+b, T(eq([a,'−',b,'=',M.box('?')]), r, M.numOpts(r,1,10),
          eq([a,'−',b,'=',ok(r)],true) + M.objs(a,em,{cross:b})));
      }
      if(t === 'zero'){
        a = rnd(1,10);
        var z = Math.random() < .5;           // a − 0  или  a − a
        r = z ? a : 0;
        return S('z'+a+z, T(eq(z ? [a,'−',0,'=',M.box('?')] : [a,'−',a,'=',M.box('?')]), r, M.numOpts(r,0,10,[a,0]),
          eq(z ? [a,'−',0,'=',ok(a)] : [a,'−',a,'=',ok(0)],true) + M.objs(a,em,{cross: z ? 0 : a})));
      }
      if(t === 'missSub'){   // a − ☐ = c
        a = rnd(3,10); r = rnd(1,a-1); b = a-r;
        return S('s'+a+'-'+r, T(eq([a,'−',BOX(),'=',r]), b, M.numOpts(b,1,10,[r,a]),
          eq([a,'−',ok(b),'=',r],true) + M.objs(a,em,{cross:b})));
      }
      if(t === 'missMin'){   // ☐ − b = c
        b = rnd(1,8); r = rnd(1,10-b); a = b+r;
        return S('m'+a+'-'+b, T(eq([BOX(),'−',b,'=',r]), a, M.numOpts(a,2,10,[r,b]),
          eq([ok(a),'−',b,'=',r],true) + M.objs(a,em,{cross:b})));
      }
      if(t === 'inv'){       // 4 + 3 = 7  →  7 − 3 = ☐
        a = rnd(1,8); b = rnd(1,9-a); s = a+b;
        return S('i'+a+'+'+b, T(eq([a,'+',b,'=',s],true) + eq([s,'−',b,'=',BOX()]), a, M.numOpts(a,1,9,[b,s]),
          eq([s,'−',b,'=',ok(a)],true) + M.objs(s,em,{cross:b})));
      }
      if(t === 'cmp'){
        a = rnd(3,10); b = rnd(1,a-1); c = rnd(3,10); d = rnd(1,c-1);
        if(Math.random() < .3){ c = rnd(3,10); d = c - (a-b); if(d < 1){ c = a; d = b; } }
        sy = M.cmpSym(a-b,c-d);
        return S('k'+a+b+c+d, T(eq([a,'−',b,BOX(),c,'−',d]), sy, M.SYM3,
          eq([a+'−'+b,'=',ok(a-b)],true) + eq([c+'−'+d,'=',ok(c-d)],true) + eq([a-b,ok(sy),c-d],true), 'sym'));
      }
      a = rnd(3,10); b = rnd(1,a-1); r = a-b;      // числовой луч: прыжок назад
      return S('l'+a+'-'+b, T(
        M.numline(10,[{v:a,color:'#3B82F6'}],[a,r]) + eq([a,'−',b,'=',M.box('?')],true), r, M.numOpts(r,1,10),
        eq([a,'−',b,'=',ok(r)],true) + M.numline(10,[{v:r,color:'#3FB68B'}],[a,r])));
    }

    // Уровень 3 (⭐⭐⭐): в пределах 20 без перехода через десяток
    function L3(em){
      var t = pick(['num','num','missSub','missMin','inv','cmp','tens']), a, b, c, d, r, s, sy;
      if(t === 'num'){
        a = rnd(11,20); b = rnd(1,a-10); r = a-b;
        return S('N'+a+'-'+b, T(eq([a,'−',b,'=',M.box('?')]), r, M.numOpts(r,10,19,[a]),
          eq([a,'−',b,'=',ok(r)],true) + M.frames(a,em)));
      }
      if(t === 'tens'){      // 10 + b − b  /  1x − 10
        a = rnd(11,20); b = a-10;
        return S('T'+a, T(eq([a,'−',10,'=',M.box('?')]), b, M.numOpts(b,1,10,[a]),
          eq([a,'−',10,'=',ok(b)],true) + M.frames(a,em)));
      }
      if(t === 'missSub'){
        a = rnd(11,20); r = rnd(10,a-1); b = a-r;
        return S('S'+a+'-'+r, T(eq([a,'−',BOX(),'=',r]), b, M.numOpts(b,1,10,[r,a]),
          eq([a,'−',ok(b),'=',r],true) + M.frames(a,em)));
      }
      if(t === 'missMin'){
        b = rnd(1,9); r = rnd(10,20-b); a = b+r;
        return S('M'+a+'-'+b, T(eq([BOX(),'−',b,'=',r]), a, M.numOpts(a,11,20,[r,b]),
          eq([ok(a),'−',b,'=',r],true) + M.frames(a,em)));
      }
      if(t === 'inv'){
        a = rnd(10,19); b = rnd(1,20-a); s = a+b;
        return S('I'+a+'+'+b, T(eq([a,'+',b,'=',s],true) + eq([s,'−',b,'=',BOX()]), a, M.numOpts(a,10,19,[b,s]),
          eq([s,'−',b,'=',ok(a)],true) + M.frames(s,em)));
      }
      a = rnd(11,20); b = rnd(1,a-10); c = rnd(11,20); d = rnd(1,c-10);
      if(Math.random() < .3){ c = rnd(11,20); d = c - (a-b); if(d < 1 || d > c-10){ c = a; d = b; } }
      sy = M.cmpSym(a-b,c-d);
      return S('K'+a+b+c+d, T(eq([a,'−',b,BOX(),c,'−',d],true), sy, M.SYM3,
        eq([a+'−'+b,'=',ok(a-b)],true) + eq([c+'−'+d,'=',ok(c-d)],true) + eq([a-b,ok(sy),c-d],true), 'sym'));
    }

    M.run({ root:containerId, key:'subtract', need:10, levels:[L1,L2,L3] });
  });
}
