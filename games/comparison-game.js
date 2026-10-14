/* ===== Білім Аралы — игра «Сравни числа» (v3, «Игры 2.0») =====
   Математика, 1 класс: сравнение чисел и выражений, знаки <, =, >, ≠ (цели 1.1.1.2, 1.2.1.5, 1.5.2.2, 1.5.2.3 приказа №399).
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

function initComparisonGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, T = M.T, eq = M.eq, BOX = M.BOX, ok = M.ok;
    function S(sig, t){ t.sig = sig; return t; }
    var NE = [{v:'=',h:'='},{v:'≠',h:'≠'}];

    // Уровень 1 (⭐): картинки, 1–10
    function L1(em, em2){
      var a = rnd(1,10), b = Math.random() < .2 ? a : rnd(1,10);
      var e1 = pick(M.EMOJIS), e2 = pick(M.EMOJIS.filter(function(e){ return e !== e1; }));
      var sy = M.cmpSym(a,b);
      return S('1:'+a+'_'+b, T(
        M.pair(M.objs(a,e1), M.box('?'), M.objs(b,e2)), sy, M.SYM3,
        eq([a,ok(sy),b],true) + M.pair(M.objs(a,e1), '<span></span>', M.objs(b,e2)), 'sym'));
    }

    // Уровень 2 (⭐⭐): цифры 0–20, числовой луч, «равно / не равно»
    function L2(em){
      var t = pick(['num','num','teen','line','ne','zero']), a, b, sy;
      if(t === 'num'){
        a = rnd(1,10); b = Math.random() < .15 ? a : rnd(1,10);
        sy = M.cmpSym(a,b);
        return S('n'+a+'_'+b, T(eq([a,BOX(),b]), sy, M.SYM3, eq([a,ok(sy),b],true) + M.numline(10,[{v:a,color:'#3B82F6'},{v:b,color:'#F2A93B'}]), 'sym'));
      }
      if(t === 'zero'){
        a = rnd(1,10); b = 0;
        if(Math.random()<.5){ var x=a; a=b; b=x; }
        sy = M.cmpSym(a,b);
        return S('z'+a+'_'+b, T(eq([a,BOX(),b]), sy, M.SYM3, eq([a,ok(sy),b],true) + M.numline(10,[{v:a,color:'#3B82F6'},{v:b,color:'#F2A93B'}]), 'sym'));
      }
      if(t === 'teen'){
        a = rnd(10,20); b = Math.random() < .15 ? a : rnd(10,20);
        sy = M.cmpSym(a,b);
        return S('t'+a+'_'+b, T(eq([a,BOX(),b]), sy, M.SYM3, eq([a,ok(sy),b],true) + M.numline(20,[{v:a,color:'#3B82F6'},{v:b,color:'#F2A93B'}]), 'sym'));
      }
      if(t === 'line'){      // два кружка на числовом луче: левее — меньше
        a = rnd(0,10); b = Math.random() < .12 ? a : rnd(0,10);
        if(a === b){ b = a; }
        sy = M.cmpSym(a,b);
        var pts = a === b ? [{v:a,color:'#8B5CF6'}] : [{v:a,color:'#3B82F6',label:'1'},{v:b,color:'#F2A93B',label:'2'}];
        return S('l'+a+'_'+b, T(
          '<div class="mx-row"><span class="mx-eq s" style="color:#3B82F6">①</span>' + BOX() + '<span class="mx-eq s" style="color:#E08A00">②</span></div>' + M.numline(10,pts),
          sy, M.SYM3,
          eq(['①',ok(sy),'②'],true) + M.numline(10,pts), 'sym'));
      }
      // равно / не равно
      a = rnd(1,10); b = Math.random() < .5 ? a : rnd(1,10);
      sy = a === b ? '=' : '≠';
      return S('e'+a+'_'+b, T(eq([a,BOX(),b]), sy, NE, eq([a,ok(sy),b],true), 'sym2'));
    }

    // Уровень 3 (⭐⭐⭐): сравнение выражений, соседи, «≠»
    function L3(em){
      var t = pick(['expr','expr','expr2','tens','ne']), a, b, c, d, sy;
      if(t === 'expr'){      // 7 ☐ 3 + 5
        a = rnd(2,20); b = rnd(1,9); c = rnd(1,10); if(Math.random()<.3) a = b + c;
        if(a > 20) a = 20;
        sy = M.cmpSym(a, b+c);
        return S('e'+a+'_'+b+'_'+c, T(eq([a,BOX(),b,'+',c]), sy, M.SYM3,
          eq([b+'+'+c,'=',ok(b+c)],true) + eq([a,ok(sy),b+c],true), 'sym'));
      }
      if(t === 'expr2'){     // 9 − 4 ☐ 6
        b = rnd(3,10); c = rnd(1,b-1); a = rnd(1,10); if(Math.random()<.3) a = b - c;
        sy = M.cmpSym(b-c, a);
        return S('f'+b+'_'+c+'_'+a, T(eq([b,'−',c,BOX(),a]), sy, M.SYM3,
          eq([b+'−'+c,'=',ok(b-c)],true) + eq([b-c,ok(sy),a],true), 'sym'));
      }
      if(t === 'tens'){      // 10 + 3 ☐ 14
        a = rnd(11,19); b = rnd(11,19); c = a-10; if(Math.random() < .5) b = a;
        sy = M.cmpSym(a,b);
        return S('t'+a+'_'+b, T(eq([10,'+',c,BOX(),b]), sy, M.SYM3,
          eq([10+'+'+c,'=',ok(a)],true) + eq([a,ok(sy),b],true), 'sym'));
      }
      a = rnd(2,10); b = rnd(1,9); c = rnd(1,10);    // 5 + 4 ☐ 9 : равно или нет
      if(Math.random() < .5){ d = a + b; } else { do { d = a + b + pick([-2,-1,1,2]); } while(d < 0 || d > 20); }
      sy = (a+b === d) ? '=' : '≠';
      return S('n'+a+'_'+b+'_'+d, T(eq([a,'+',b,BOX(),d]), sy, NE,
        eq([a+'+'+b,'=',ok(a+b)],true) + eq([a+b,ok(sy),d],true), 'sym2'));
    }

    M.run({ root:containerId, key:'compare', need:10, levels:[L1,L2,L3] });
  });
}
