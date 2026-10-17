/* ===== Білім Аралы — «Сравни множества: Лесной базар» (v3) =====
   Математика, 1 класс (цель 1.4.1.x приказа №399): сравнение множеств — больше, меньше, поровну, пустое множество. Уровни: где больше → где меньше → сделай поровну.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'forest', icons:['🍎','⚖️','✅']};
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
function initSetsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, EMS = ['🍎','⭐','🎈','🐟','🌸','🦋','🍓','🐝','🍒','🐥'];
    (function(){
      if(document.getElementById('mxst-css')) return;
      var s = document.createElement('style'); s.id = 'mxst-css';
      s.textContent = ''
      + '.mxst-wrap{display:flex;gap:12px;justify-content:center;width:min(100%,330px);align-items:stretch;}'
      + '.mxst-box{position:relative;flex:1;min-height:150px;border-radius:22px;background:rgba(255,255,255,.62);box-shadow:inset 0 -6px 0 rgba(0,0,0,.1),0 5px 0 rgba(0,0,0,.14);padding:10px 6px 24px;display:flex;flex-direction:column;align-items:center;gap:6px;}'
      + '.mxst-items{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-content:flex-start;min-height:104px;}'
      + '.mxst-it{font-size:1.8rem;line-height:1;border:none;background:none;padding:2px;border-radius:12px;animation:mxIn .35s backwards;transition:background .25s,transform .25s;}'
      + '.mxst-it.pair{background:rgba(255,201,60,.8);transform:scale(1.12);}'
      + '.mxst-it.extra{background:rgba(255,107,91,.55);animation:mxShake .5s;}'
      + '.mxst-empty{position:absolute;left:0;right:0;top:44px;text-align:center;font:800 1.05rem "Baloo 2",sans-serif;color:#8B95A3;}'
      + '.mxst-plus{position:absolute;left:50%;bottom:-18px;transform:translateX(-50%);width:44px;height:44px;border-radius:50%;border:none;background:linear-gradient(#5BE3A4,#2FBF80);color:#fff;font:800 1.7rem "Baloo 2",sans-serif;box-shadow:0 4px 0 #1F8F5F;cursor:pointer;}'
      + '.mxst-plus:active{transform:translateX(-50%) translateY(3px);box-shadow:0 1px 0 #1F8F5F;}'
      + '.mxst-n{position:absolute;right:8px;top:-12px;min-width:34px;height:34px;border-radius:50%;background:#FF6B5B;color:#fff;font:800 1.2rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(0,0,0,.2);}'
      + '.mxs-balloon .b .arr{font-size:2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxst-it{animation:none}}';
      document.head.appendChild(s);
    })();
    var ARR = { a:'⬅️', b:'➡️', equal:'🟰' };
    function items(n, em, cls){ var h = ''; for(var i=0;i<n;i++) h += '<span class="mxst-it ' + (cls || '') + '" style="animation-delay:' + (i*0.04) + 's">' + em + '</span>'; return h; }
    function box(n, em, who){ return '<div class="mxst-box"><div class="mxst-items" data-s="' + who + '">' + items(n, em) + '</div>' + (n === 0 ? '<div class="mxst-empty">∅</div>' : '') + '</div>'; }
    function arrOpts(){ return [{v:'a', h:'<span class="arr">' + ARR.a + '</span>'},{v:'equal', h:'<span class="arr">' + ARR.equal + '</span>'},{v:'b', h:'<span class="arr">' + ARR.b + '</span>'}]; }
    function whoWin(a, b, more){ if(a === b) return 'equal'; return more ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b'); }
    function pairAnim(el, X, a, b){
      var L = [].slice.call(el.querySelectorAll('.mxst-items[data-s="l"] .mxst-it')), R = [].slice.call(el.querySelectorAll('.mxst-items[data-s="r"] .mxst-it')), i = 0, k = Math.min(L.length, R.length);
      return (function step(){
        if(i < k){ L[i].classList.add('pair'); R[i].classList.add('pair'); X.sfx.tap(i + 1); i++; return X.sleep(330).then(function(ok){ return ok ? step() : null; }); }
        L.slice(k).concat(R.slice(k)).forEach(function(e){ e.classList.add('extra'); });
        return Promise.resolve();
      })();
    }
    function sceneField(a, b, e1, e2){ return function(el, X, task){ el.innerHTML = '<div class="mxst-wrap">' + box(a, e1, 'l') + box(b, e2, 'r') + '</div>'; task.afterSay = function(){ pairAnim(el, X, a, b); }; }; }
    function hintScene(a, b, e1, e2, ans){ return function(el, X){ el.innerHTML = '<div class="mxst-wrap">' + box(a, e1, 'l') + box(b, e2, 'r') + '</div><div class="mxs-expr s">' + eqs([a, OK(M.cmpSym(a, b)), b]) + '</div>'; pairAnim(el, X, a, b); }; }

    function askTask(sig, a, b, more, e1, e2){
      var ans = whoWin(a, b, more);
      return S(sig, {
        expr:'', say:V.tpl('q',{k:more ? 'wheremore' : 'whereless'}), ans:ans, opts:arrOpts(), layout:'sym',
        field:sceneField(a, b, e1, e2), hintSay:ans === 'equal' ? ['f:same'] : [a, b], hintExpr:eqs([a, OK(M.cmpSym(a, b)), b]), hint:hintScene(a, b, e1, e2, ans)
      });
    }
    function eqTask(a, b, e1, e2){
      return S('q'+a+'_'+b+e1, {
        expr:'', say:V.tpl('q',{k:'makeeq'}), ans:'equal', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxst-wrap">' + box(a, e1, 'l') + box(b, e2, 'r') + '</div>';
          var cnt = [a, b], boxes = [].slice.call(el.querySelectorAll('.mxst-box')), its = [].slice.call(el.querySelectorAll('.mxst-items')), em = [e1, e2];
          var badges = boxes.map(function(bx, i){ var n = document.createElement('span'); n.className = 'mxst-n'; n.textContent = cnt[i]; bx.appendChild(n); return n; });
          boxes.forEach(function(bx, i){
            var pl = document.createElement('button'); pl.type = 'button'; pl.className = 'mxst-plus'; pl.textContent = '+'; bx.appendChild(pl);
            function bind(it){ it.style.cursor = 'pointer'; it.addEventListener('click', function(){ if(task._done) return; it.remove(); cnt[i]--; badges[i].textContent = cnt[i]; X.sfx.tap(cnt[i]); }); }
            [].slice.call(its[i].children).forEach(bind);
            pl.addEventListener('click', function(){ if(task._done || cnt[i] >= 10) return; its[i].insertAdjacentHTML('beforeend', items(1, em[i])); bind(its[i].lastChild); cnt[i]++; badges[i].textContent = cnt[i]; X.sfx.tap(cnt[i]); });
          });
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '20px'; go.textContent = '✔'; el.appendChild(go);
          go.addEventListener('click', function(){ if(task._done) return; task._done = true; task.submit(cnt[0] === cnt[1] ? 'equal' : 'no', go); });
          task.auto = function(wrong){
            if(wrong){ go.click(); return; }
            var i = cnt[0] < cnt[1] ? 0 : 1, pl = boxes[i].querySelector('.mxst-plus');
            while(cnt[0] !== cnt[1]){ pl.click(); }
            go.click();
          };
        },
        hintSay:[Math.max(a, b), 'f:same'], hintExpr:eqs([Math.max(a, b), OK('='), Math.max(a, b)]),
        hint:function(el){ var m = Math.max(a, b); el.innerHTML = '<div class="mxst-wrap">' + box(m, e1, 'l') + box(m, e2, 'r') + '</div><div class="mxs-expr s">' + eqs([m, OK('='), m]) + '</div>'; }
      });
    }
    function two(lo, hi, pEq){
      var a = rnd(lo, hi), b = Math.random() < pEq ? a : rnd(lo, hi), e1 = pick(EMS), e2 = pick(EMS.filter(function(e){ return e !== e1; }));
      return [a, b, e1, e2];
    }

    /* ⭐: 1–6, «где больше» */
    function L1(){ var r = two(1, 6, .2); return askTask('m'+r[0]+'_'+r[1]+r[2], r[0], r[1], true, r[2], r[3]); }
    /* ⭐⭐: до 8, пустое множество, «где меньше» */
    function L2(){
      var r = two(0, 8, .2), more = Math.random() < .5;
      if(Math.random() < .25){ r[Math.random() < .5 ? 0 : 1] = 0; if(r[0] === 0 && r[1] === 0) r[1] = rnd(1,5); }
      return askTask('n'+r[0]+'_'+r[1]+r[2]+(more?'m':'l'), r[0], r[1], more, r[2], r[3]);
    }
    /* ⭐⭐⭐: сделай поровну */
    function L3(){
      var t = pick(['eq','eq','eq','more','less']), r, a, b;
      if(t === 'eq'){ a = rnd(1,8); do { b = rnd(1,8); } while(b === a || Math.abs(a - b) > 4); var e1 = pick(EMS), e2 = pick(EMS.filter(function(e){ return e !== e1; })); return eqTask(a, b, e1, e2); }
      r = two(1, 9, .15); return askTask('o'+r[0]+'_'+r[1]+r[2]+t, r[0], r[1], t === 'more', r[2], r[3]);
    }

    M.run({ root:containerId, key:'sets', need:10, theme:'forest', levels:[L1,L2,L3] });
  });
}
