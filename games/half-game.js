/* ===== Білім Аралы — «Половина числа: Угощение Барсика» (v3) =====
   Математика, 1 класс (цель 1.1.1.5 приказа №399): половина чисел 2, 4, 6, 8, 10 — ровно эти числа, практическим действием. Уровни: смотрим, как делят → раздай сам → шоколадка пополам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'garden', icons:['🍎','🍽️','½']};
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
function initHalfGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, NUMS = [2,4,6,8,10];
    (function(){
      if(document.getElementById('mxh2-css')) return;
      var s = document.createElement('style'); s.id = 'mxh2-css';
      s.textContent = ''
      + '.mxh2-pool{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:300px;min-height:46px;padding:6px 10px;border-radius:18px;background:rgba(255,255,255,.5);}'
      + '.mxh2-pool .it{border:none;background:none;padding:0;font-size:2.1rem;line-height:1;cursor:pointer;text-shadow:0 3px 0 rgba(0,0,0,.18);transition:transform .12s;-webkit-tap-highlight-color:transparent;}'
      + '.mxh2-pool .it:active{transform:scale(.85);}'
      + '.mxh2-plates{display:flex;gap:14px;justify-content:center;width:min(100%,320px);}'
      + '.mxh2-plate{position:relative;flex:1;min-height:78px;border-radius:12px 12px 70px 70px/12px 12px 46px 46px;background:#fff;box-shadow:inset 0 -8px 0 rgba(0,0,0,.1),0 5px 0 rgba(0,0,0,.14);padding:8px 8px 18px;display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-content:flex-start;}'
      + '.mxh2-plate .it2{font-size:1.7rem;line-height:1;animation:mxIn .35s;}'
      + '.mxh2-who{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);font-size:1.5rem;}'
      + '.mxh2-bar{display:flex;align-items:stretch;justify-content:center;margin:6px 0 4px;}'
      + '.mxh2-cell{width:30px;height:62px;background:linear-gradient(#8A5A3C,#6B4129);border:3px solid #55331F;border-radius:6px;box-shadow:inset 3px 3px 0 rgba(255,255,255,.22);}'
      + '.mxh2-cut{position:relative;width:12px;border:none;background:none;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent;}'
      + '.mxh2-cut:before{content:"";position:absolute;left:50%;top:-6px;bottom:-6px;border-left:3px dashed rgba(255,255,255,.9);}'
      + '.mxh2-cut:hover:before{border-left-color:#FF6B5B;border-left-width:4px;}'
      + '.mxh2-bar.split .mxh2-cut.hit{width:44px;}'
      + '.mxh2-cut{transition:width .5s cubic-bezier(.3,1.5,.5,1);}'
      + '.mxh2-scis{position:absolute;font-size:1.7rem;pointer-events:none;}'
      + '.mxs-balloon .b .gr{display:flex;flex-wrap:wrap;justify-content:center;gap:0;font-size:1rem;line-height:1;padding:6px;}'
      + '@media (prefers-reduced-motion:reduce){.mxh2-plate .it2{animation:none}}';
      document.head.appendChild(s);
    })();
    var PAIR = [['🐯','🐥'],['🐶','🐱'],['🐰','🐻']];
    function plates(who){ return '<div class="mxh2-plates"><div class="mxh2-plate l" data-s="l"><span class="mxh2-who">' + who[0] + '</span></div><div class="mxh2-plate r" data-s="r"><span class="mxh2-who">' + who[1] + '</span></div></div>'; }
    function oneHalfOpts(h){
      var set = [h];[h+1,h-1,h+2,h-2,h+3].forEach(function(c){ if(set.length < 4 && c >= 1 && c <= 6 && set.indexOf(c) < 0) set.push(c); });
      for(var t = 1; set.length < 4 && t <= 6; t++) if(set.indexOf(t) < 0) set.push(t);
      return shuffle(set).map(function(v){ return { v:String(v), h:String(v) }; });
    }
    function plateHint(n, em, who){ return function(el){ el.innerHTML = plates(who); var l = el.querySelector('.l'), r = el.querySelector('.r'); for(var i=0;i<n/2;i++){ l.insertAdjacentHTML('beforeend','<span class="it2">' + em + '</span>'); r.insertAdjacentHTML('beforeend','<span class="it2">' + em + '</span>'); } el.insertAdjacentHTML('beforeend','<div class="mxs-expr s">' + eqs([n/2,'+',n/2,'=',n]) + '</div>'); }; }

    /* общая сцена «раздай по тарелкам» */
    function dealScene(n, em, who, mode){   // mode: 'auto' — предметы раздаются сами, 'tap' — ребёнок раздаёт касанием
      return function(el, X, task){
        var pool = document.createElement('div'); pool.className = 'mxh2-pool';
        el.appendChild(pool); el.insertAdjacentHTML('beforeend', plates(who));
        var L = el.querySelector('.l'), R = el.querySelector('.r'), left = n, side = 0, items = [];
        for(var i=0;i<n;i++){ var b = document.createElement('button'); b.type = 'button'; b.className = 'it'; b.textContent = em; pool.appendChild(b); items.push(b); }
        function move(b){
          if(b.parentNode !== pool) return;
          pool.removeChild(b); var s = document.createElement('span'); s.className = 'it2'; s.textContent = em; (side === 0 ? L : R).appendChild(s); side ^= 1; left--;
          X.sfx.tap(n - left);
          if(left === 0){ task.afterDeal(); }
        }
        task.afterDeal = function(){ task._dealt = true; setTimeout(function(){ task.openAnswers(); X.say(['f:oneplate']); }, 350); };
        if(mode === 'tap'){ items.forEach(function(b){ b.addEventListener('click', function(){ if(!task._dealt) move(b); }); }); task.auto = function(){ items.forEach(function(b){ b.click(); }); }; }
        else {
          pool.style.pointerEvents = 'none';
          task.afterSay = function(){
            (function step(i){ if(i >= items.length) return; move(items[i]); X.sleep(420).then(function(ok){ if(ok) step(i + 1); }); })(0);
          };
        }
      };
    }

    /* ===== Уровень 1 (⭐): смотрим, как делят ===== */
    function L1(){
      var n = pick(NUMS), em = pick(M.EMOJIS), who = pick(PAIR);
      return S('d'+n+em, {
        expr:eqs([n]), cap:null, say:V.tpl('q',{k:'deal'}), ans:String(n/2), opts:oneHalfOpts(n/2), gate:true,
        field:dealScene(n, em, who, 'auto'),
        hintSay:[n/2,'+',n/2,'=',n], hintExpr:eqs([OK(n/2)]), hint:plateHint(n, em, who)
      });
    }

    /* ===== Уровень 2 (⭐⭐): раздай сам ===== */
    function L2(){
      var n = pick(NUMS), em = pick(M.EMOJIS), who = pick(PAIR);
      return S('t'+n+em, {
        expr:eqs([n]), say:V.tpl('q',{k:'deal'}), ans:String(n/2), opts:oneHalfOpts(n/2), gate:true,
        field:dealScene(n, em, who, 'tap'),
        hintSay:[n/2,'+',n/2,'=',n], hintExpr:eqs([OK(n/2)]), hint:plateHint(n, em, who)
      });
    }

    /* ===== Уровень 3 (⭐⭐⭐): шоколадка пополам, найди половину ===== */
    function breakTask(n){
      var who = pick(PAIR), em = '🍫';
      return S('b'+n, {
        expr:eqs([n]), say:V.tpl('q',{k:'breakbar'}), ans:String(n/2),
        field:function(el, X, task){
          var bar = document.createElement('div'); bar.className = 'mxh2-bar';
          var h = '';
          for(var i=0;i<n;i++){ h += '<span class="mxh2-cell"></span>'; if(i < n-1) h += '<button type="button" class="mxh2-cut" data-i="' + (i+1) + '" aria-label="' + (i+1) + '"></button>'; }
          bar.innerHTML = h; el.appendChild(bar);
          bar.querySelectorAll('.mxh2-cut').forEach(function(c){
            c.addEventListener('click', function(){
              if(task._done) return; task._done = true; var k = +c.getAttribute('data-i');
              bar.classList.add('split'); c.classList.add('hit'); X.sfx.tap(k);
              setTimeout(function(){ task.submit(String(k), c); }, 650);
            });
          });
          task.auto = function(wrong){ var k = wrong ? (n/2 === 1 ? 2 : n/2 - 1) : n/2; var c = bar.querySelector('.mxh2-cut[data-i="' + k + '"]'); if(c) c.click(); };
        },
        hintSay:[n/2,'+',n/2,'=',n], hintExpr:eqs([OK(n/2)]),
        hint:function(el){ var hh = '<div class="mxh2-bar split">'; for(var i=0;i<n;i++){ hh += '<span class="mxh2-cell"></span>'; if(i < n-1) hh += '<span class="mxh2-cut' + (i+1 === n/2 ? ' hit' : '') + '" style="' + (i+1 === n/2 ? 'width:44px' : '') + '"></span>'; } el.innerHTML = hh + '</div><div class="mxs-expr s">' + eqs([n/2,'+',n/2,'=',n]) + '</div>'; }
      });
    }
    function groupTask(n){
      var em = pick(M.EMOJIS), k = n/2, who = pick(PAIR);
      var opts = oneHalfOpts(k).map(function(o){ var g = ''; for(var i=0;i<+o.v;i++) g += em; return { v:o.v, h:'<span class="gr">' + g + '</span>' }; });
      return S('g'+n+em, {
        expr:eqs([n]), say:V.tpl('half',{n:n}), ans:String(k), opts:opts, layout:'wide',
        field:function(el){ var g = ''; for(var i=0;i<n;i++) g += M.o(em, i); el.innerHTML = '<div class="mxs-grp">' + g + '</div>'; },
        hintSay:[k,'+',k,'=',n], hintExpr:eqs([OK(k)]), hint:plateHint(n, em, who)
      });
    }
    function numTask(n){
      var em = pick(M.EMOJIS), who = pick(PAIR);
      return S('h'+n, {
        expr:eqs([n]), say:V.tpl('half',{n:n}), ans:String(n/2), opts:oneHalfOpts(n/2),
        hintSay:[n/2,'+',n/2,'=',n], hintExpr:eqs([OK(n/2)]), hint:plateHint(n, em, who)
      });
    }
    function L3(){
      var n = pick(NUMS), t = pick(['break','break','group','num']);
      return t === 'break' ? breakTask(n) : (t === 'group' ? groupTask(n) : numTask(n));
    }

    M.run({ root:containerId, key:'half', need:10, theme:'garden', levels:[L1,L2,L3] });
  });
}
