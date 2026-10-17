/* ===== Білім Аралы — «Десятки: Морская лесенка Барсика» (v3) =====
   Математика, 1 класс (цели 1.1.1.4, 1.4.3.1 приказа №399): десяток как единица счёта, счёт десятками до 100, закономерность, сравнение. Уровни: считаем десятками → лесенка → сколько десятков и сравнение.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'ocean', icons:['🔟','👆','💯']};
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
function initTensGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, Q = M.Q(), QB = M.QB();
    (function(){
      if(document.getElementById('mxt-css')) return;
      var s = document.createElement('style'); s.id = 'mxt-css';
      s.textContent = ''
      + '.mxt-rods{position:relative;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:320px;min-height:96px;padding:8px 6px;}'
      + '.mxt-rod{position:relative;width:22px;height:78px;border:3px solid #B86B00;border-radius:8px;background:repeating-linear-gradient(#FFC93C 0 6px,#FF9F1C 6px 7.8px);box-shadow:inset 3px 0 0 rgba(255,255,255,.4),0 4px 0 rgba(0,0,0,.2);cursor:pointer;padding:0;transition:transform .15s;-webkit-tap-highlight-color:transparent;animation:mxIn .4s backwards;}'
      + '.mxt-rod.on{transform:translateY(-8px) scale(1.08);background:repeating-linear-gradient(#7FE0A8 0 6px,#2FBF80 6px 7.8px);border-color:#1F8F5F;}'
      + '.mxt-rod .lb{position:absolute;left:50%;top:-24px;transform:translateX(-50%);background:#FF6B5B;color:#fff;border-radius:12px;padding:0 7px;font:800 .95rem "Baloo 2",sans-serif;min-width:28px;text-align:center;}'
      + '.mxt-mini{display:inline-block;width:9px;height:34px;margin:0 1px;border:2px solid #B86B00;border-radius:4px;background:repeating-linear-gradient(#FFC93C 0 3px,#FF9F1C 3px 4px);}'
      + '.mxt-stairs{display:flex;align-items:flex-end;gap:3px;justify-content:center;height:150px;padding:0 4px;width:min(100%,330px);}'
      + '.mxt-st{flex:1;max-width:32px;border-radius:7px 7px 0 0;background:rgba(255,255,255,.35);display:flex;align-items:flex-start;justify-content:center;font:800 .8rem "Baloo 2",sans-serif;color:#25324A;padding-top:3px;box-sizing:border-box;}'
      + '.mxt-st.on{background:linear-gradient(#FFC93C,#FF9F1C);box-shadow:inset 0 -4px 0 rgba(0,0,0,.14),0 3px 0 rgba(0,0,0,.18);}'
      + '.mxt-st.gap{background:linear-gradient(#FF8A7A,#FF6B5B);color:#fff;font-size:1.1rem;animation:mxBump .9s ease-in-out infinite alternate;}'
      + '.mxt-st.ok{background:linear-gradient(#7FE0A8,#2FBF80);color:#fff;}'
      + '.mxt-big{font:800 2.6rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.3);min-height:1.2em;}'
      + '@media (max-width:480px){.mxt-st{font-size:.7rem}}';
      document.head.appendChild(s);
    })();
    function rods(k, tapMode, X, task){
      var w = document.createElement('div'); w.className = 'mxt-rods'; var counted = 0, list = [];
      for(var i=0;i<k;i++){
        var b = document.createElement(tapMode ? 'button' : 'span'); b.className = 'mxt-rod'; b.style.animationDelay = (i*0.06) + 's'; if(tapMode) b.type = 'button';
        w.appendChild(b); list.push(b);
        if(tapMode) b.addEventListener('click', function(){
          if(this.classList.contains('on')) return; this.classList.add('on'); counted++;
          var lb = document.createElement('span'); lb.className = 'lb'; lb.textContent = counted * 10; this.appendChild(lb);
          X.sfx.tap(counted); X.say([counted * 10]);
        });
      }
      if(tapMode) task.auto = function(){ list.forEach(function(b){ b.click(); }); };
      return w;
    }
    function tensOpts(ans, lo, hi){
      var set = [ans];
      shuffle([10,-10,20,-20,30,-30]).forEach(function(d){ var c = ans + d; if(set.length < 4 && c >= lo && c <= hi && set.indexOf(c) < 0) set.push(c); });
      for(var t = lo; set.length < 4 && t <= hi; t += 10) if(set.indexOf(t) < 0) set.push(t);
      return shuffle(set).map(function(v){ return { v:String(v), h:String(v) }; });
    }
    function miniRods(k){ var h = ''; for(var i=0;i<k;i++) h += '<span class="mxt-mini"></span>'; return h; }
    function solvedRods(k){ return function(el){ var w = rods(k, false); el.innerHTML = ''; el.appendChild(w); el.insertAdjacentHTML('beforeend', '<div class="mxs-expr s">' + eqs([k + ' ' + {ru:'дес.',kz:'ондық',en:'tens'}[V.lang()], '=', OK(k*10)]) + '</div>'); }; }

    function tapTask(k){
      return S('t'+k, {
        expr:'', say:V.tpl('expr',{tokens:['f:countten'], q:'howmany'}), ans:String(k*10), opts:tensOpts(k*10, 10, 100),
        field:function(el, X, task){ el.appendChild(rods(k, true, X, task)); },
        hintSay:[k*10], hintExpr:eqs([OK(k*10)]), hint:solvedRods(k)
      });
    }
    // лесенка десятков: arr — 4 последовательных числа, bi — какое спрятано
    function seqTask(sig, arr, bi){
      var ans = arr[bi], parts = [], solved = [];
      arr.forEach(function(v, i){ parts.push(i === bi ? QB : v); solved.push(i === bi ? OK(v) : v); if(i < arr.length-1){ parts.push('<span style="color:#8B95A3">,</span>'); solved.push('<span style="color:#8B95A3">,</span>'); } });
      var tokens = arr.map(function(v, i){ return i === bi ? '?' : v; });
      return S(sig, {
        expr:eqs(parts), small:true, say:V.tpl('expr',{tokens:tokens, q:'missing'}), ans:String(ans), opts:tensOpts(ans, 10, 100),
        field:function(el){
          var st = document.createElement('div'); st.className = 'mxt-stairs';
          for(var i=1;i<=10;i++){
            var d = document.createElement('div'), v = i*10; d.className = 'mxt-st'; d.style.height = (22 + i*12) + 'px';
            if(arr.indexOf(v) >= 0){ if(v === ans){ d.classList.add('gap'); d.textContent = '?'; } else { d.classList.add('on'); d.textContent = v; } }
            st.appendChild(d);
          }
          el.appendChild(st);
        },
        hintSay:arr, hintExpr:eqs(solved), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs(solved) + '</div>'; }
      });
    }
    function seqUp(lo, hiStart){ var a = rnd(1, hiStart) * 10, arr = [a, a+10, a+20, a+30], bi = rnd(1,3); return seqTask('u'+a+bi, arr, bi); }
    function seqDown(){ var a = rnd(4, 10) * 10, arr = [a, a-10, a-20, a-30], bi = rnd(1,3); return seqTask('d'+a+bi, arr, bi); }

    function digitsTask(k){
      return S('g'+k, {
        expr:eqs([k*10]), say:V.tpl('tensin',{n:k*10}), ans:String(k), opts:M.numOpts(k, 1, 10, [k-1, k+1, k+2]),
        hintSay:[k*10], hintExpr:eqs([OK(k)]), hint:solvedRods(k)
      });
    }
    function cmpTask(a, b){
      var sy = M.cmpSym(a, b);
      return S('c'+a+'_'+b, {
        expr:eqs([a, QB, b]), say:V.tpl('expr',{tokens:[a,'?',b], q:'pickSign'}), ans:sy, opts:M.SYM3, layout:'sym',
        field:function(el, X, task){ var sw = M.seesaw(el, miniRods(a/10), miniRods(b/10), X); task.reveal = function(){ sw.reveal(sy); }; },
        hintSay:['f:look'], hintExpr:eqs([a, OK(sy), b]), hint:function(el){ el.innerHTML = '<div class="mxs-expr s">' + eqs([a, OK(sy), b]) + '</div>'; }
      });
    }

    function L1(){ var t = pick(['tap','tap','tap','up']); return t === 'tap' ? tapTask(rnd(1,5)) : seqUp(1, 4); }
    function L2(){ var t = pick(['tap','up','up','down']); return t === 'tap' ? tapTask(rnd(4,10)) : (t === 'up' ? seqUp(1, 7) : seqDown()); }
    function L3(){
      var t = pick(['digits','digits','cmp','cmp','down','up']), a, b;
      if(t === 'digits') return digitsTask(rnd(1,10));
      if(t === 'cmp'){ a = rnd(1,10) * 10; b = Math.random() < .2 ? a : rnd(1,10) * 10; return cmpTask(a, b); }
      return t === 'down' ? seqDown() : seqUp(1, 7);
    }

    M.run({ root:containerId, key:'tens', need:10, theme:'ocean', levels:[L1,L2,L3] });
  });
}
