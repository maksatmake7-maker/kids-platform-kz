/* ===== Білім Аралы — «Собери историю: Картинки по порядку» (v3) =====
   Казахский язык, 1 класс (цель 1.2.4.1 приказа №399): пересказ по картинкам. 6 историй из прежней игры. Уровни: что первое/последнее → что дальше / чего не хватает → расставь по порядку.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sunset',icons:['🌅','☀️','🌙']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initStoryGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var TR = {'А':'a','Б':'b','В':'v','Г':'g','Д':'d','Е':'e','Ё':'yo','Ж':'zh','З':'z','И':'i','Й':'j','К':'k','Л':'l','М':'m','Н':'n','О':'o','П':'p','Р':'r','С':'s','Т':'t','У':'u','Ф':'f','Х':'h','Ц':'c','Ч':'ch','Ш':'sh','Щ':'shch','Ы':'y','Э':'ye','Ю':'yu','Я':'ya'};
    var TW = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
    function LK(l){ return 'f:r_l_' + TR[l]; }
    function WK(w){ return 'f:r_w_' + w.toLowerCase().replace(/-/g, '').split('').map(function(c){ return TW[c]; }).join(''); }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function cap1(w){ return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }
    var TK = {'а':'a','ә':'ae','б':'b','в':'v','г':'g','ғ':'gh','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','қ':'q','л':'l','м':'m','н':'n','ң':'ng','о':'o','ө':'oe','п':'p','р':'r','с':'s','т':'t','у':'u','ұ':'uu','ү':'ue','ф':'f','х':'h','һ':'hh','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','і':'ie','ь':'','э':'e','ю':'yu','я':'ya'};
    function KK(w){ return 'f:k_w_' + w.toLowerCase().replace(/[?\s]/g, '').split('').map(function(c){ return TK[c]; }).join(''); }
    function KLK(l){ return 'f:k_l_' + TK[l.toLowerCase()]; }
    /* 6 историй из прежней игры (картинки по порядку) и казахские подписи там, где слова надёжно известны */
    var ST = [['🛌','⏰','🦷','🎒'],['🥚','🐣','🐥','🐔'],['🌰','🌱','🌿','🌳'],['🌅','☀️','🌇','🌙'],['☁️','🌧️','💧','🌈'],['🥚','🐛','🦋','🌸']];
    var CAP = { 3:['Таң','Күн','Кеш','Түн'], 4:['Бұлт','Жаңбыр','Тамшы','Кемпірқосақ'] };
    var ALL = []; ST.forEach(function(s){ s.forEach(function(e){ if(ALL.indexOf(e) < 0) ALL.push(e); }); });

    (function(){
      if(document.getElementById('mxst-css')) return;
      var s = document.createElement('style'); s.id = 'mxst-css';
      s.textContent = ''
      + '.mxst-row{display:flex;align-items:center;justify-content:center;gap:3px;flex-wrap:wrap;max-width:340px;margin:0 auto;}'
      + '.mxst-c{display:flex;flex-direction:column;align-items:center;justify-content:center;width:54px;height:66px;border-radius:16px;background:rgba(255,255,255,.94);box-shadow:0 5px 0 rgba(0,0,0,.14);font-size:2rem;line-height:1;animation:mxIn .35s backwards;}.mxst-c.h{width:auto;min-width:54px;padding:0 4px;}.mxst-c small{font:800 .58rem/1.1 "Baloo 2",sans-serif;color:#6B7A99;margin-top:2px;}'
      + '.mxst-c.q{background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;font:800 2rem "Baloo 2",sans-serif;}.mxst-ar{font:800 .9rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.25);}'
      + '.mxst-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxst-line{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:78px;margin:6px 0 10px;max-width:330px;}.mxst-line b{width:62px;height:70px;border-radius:16px;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.16);font-size:2.1rem;line-height:70px;text-align:center;animation:mxIn .2s;}.mxst-line b.q{background:rgba(255,255,255,.3);border:3px dashed rgba(255,255,255,.9);font:800 1.4rem/64px "Baloo 2",sans-serif;color:#fff;}'
      + '.mxst-pool{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:330px;margin:0 auto;}.mxst-pool button{width:66px;height:70px;border-radius:18px;border:0;background:linear-gradient(#FFE27A,#F5B82E);box-shadow:0 6px 0 rgba(0,0,0,.22);font-size:2.3rem;cursor:pointer;padding:0;animation:mxIn .35s backwards;}.mxst-pool button.used{visibility:hidden;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxst-c,.mxst-line b,.mxst-pool button{animation:none}}';
      document.head.appendChild(s);
    })();

    function strip(si, gap){
      var s = ST[si];
      return '<div class="mxst-row">' + s.map(function(e, i){ return (i ? '<span class="mxst-ar">→</span>' : '') + (i === gap ? '<div class="mxst-c q">?</div>' : '<div class="mxst-c">' + e + '</div>'); }).join('') + '</div>';
    }
    function hintOf(si){
      var s = ST[si], cap = CAP[si];
      var say = ['f:st_hint']; if(cap) cap.forEach(function(w){ say.push(KK(w)); });
      return { hintSay:say, hint:function(el){ el.innerHTML = '<div class="mxst-row">' + s.map(function(e, i){ return (i ? '<span class="mxst-ar">→</span>' : '') + '<div class="mxst-c h">' + e + (cap ? '<small>' + cap[i] + '</small>' : '') + '</div>'; }).join('') + '</div><div class="mxst-info">' + F().st_hint + '</div>'; } };
    }
    function outsiders(si, n){
      var inS = ST[si], pool = shuffle(ALL.filter(function(e){ return inS.indexOf(e) < 0; }));
      return pool.slice(0, n);
    }
    function emo(arr){ return arr.map(function(e){ return { v:e, h:'<span class="lt">' + e + '</span>' }; }); }
    /* ⭐: какая картинка первая / последняя */
    function endTask(si, last){
      var s = ST[si], ans = last ? s[3] : s[0], h = hintOf(si), others = shuffle(s.filter(function(e){ return e !== ans; })).slice(0, 2);
      return S((last ? 'l' : 'f') + si, { expr:'', say:V.tpl('q', {k:last ? 'stq_last' : 'stq_first'}), ans:ans, layout:'wide', opts:emo(shuffle([ans].concat(others))),
        field:function(el){ var sh = shuffle(s.slice()); if(sh.join() === s.join()) sh.reverse(); el.innerHTML = '<div class="mxst-row">' + sh.map(function(e){ return '<div class="mxst-c">' + e + '</div>'; }).join('') + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: что будет дальше */
    function nextTask(si){
      var s = ST[si], k = rnd(1, 3), ans = s[k], h = hintOf(si), early = s[rnd(0, k - 1)], set = shuffle([ans, early].concat(outsiders(si, 2)));
      return S('n' + si + k, { expr:'', say:V.tpl('q', {k:'stq_next'}), ans:ans, layout:'wide', opts:emo(set),
        field:function(el){ el.innerHTML = '<div class="mxst-row">' + s.slice(0, k).map(function(e, i){ return (i ? '<span class="mxst-ar">→</span>' : '') + '<div class="mxst-c">' + e + '</div>'; }).join('') + '<span class="mxst-ar">→</span><div class="mxst-c q">?</div></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: какой картинки не хватает */
    function gapTask(si){
      var s = ST[si], g = rnd(1, 2), ans = s[g], h = hintOf(si), set = shuffle([ans, s[g === 1 ? 3 : 0]].concat(outsiders(si, 2)));
      return S('g' + si + g, { expr:'', say:V.tpl('q', {k:'stq_gap'}), ans:ans, layout:'wide', opts:emo(set),
        field:function(el){ el.innerHTML = strip(si, g); }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: нажимай все картинки по порядку */
    function orderTask(si){
      var s = ST[si], h = hintOf(si);
      return S('o' + si, { expr:'', say:V.tpl('q', {k:'stq_order'}), ans:'ok', gate:false,
        field:function(el, X, task){
          var tl = shuffle(s.slice()); if(tl.join() === s.join()) tl.reverse();
          el.innerHTML = '<div class="mxst-line"></div><div class="mxst-pool">' + tl.map(function(e, i){ return '<button type="button" style="animation-delay:' + (i*.06) + 's">' + e + '</button>'; }).join('') + '</div>';
          var line = el.querySelector('.mxst-line'), btns = [].slice.call(el.querySelectorAll('.mxst-pool button')), n = 0;
          function paint(){ line.innerHTML = s.slice(0, n).map(function(e){ return '<b>' + e + '</b>'; }).join('') + (n < s.length ? '<b class="q">?</b>' : ''); }
          paint();
          btns.forEach(function(b){ b.addEventListener('click', function(){ if(task._done || b.classList.contains('used')) return;
            if(b.textContent !== s[n]){ task._done = true; X.sfx.no(); task.submit('no', b); return; }
            b.classList.add('used'); n++; X.sfx.tap(n); paint();
            if(n === s.length){ task._done = true; X.sleep(350).then(function(ok){ if(ok) task.submit('ok', line); }); } }); });
          task.auto = function(wrong){ if(wrong){ var w = btns.filter(function(b){ return b.textContent !== s[0]; })[0]; w.click(); return; } s.forEach(function(e){ var b = btns.filter(function(x){ return !x.classList.contains('used') && x.textContent === e; })[0]; if(b) b.click(); }); };
        }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    function si(){ return rnd(0, ST.length - 1); }

    function L1(){ return endTask(si(), Math.random() < .4); }
    function L2(){ var r = Math.random(); return r < .4 ? nextTask(si()) : r < .8 ? gapTask(si()) : endTask(si(), Math.random() < .5); }
    function L3(){ var r = Math.random(); return r < .5 ? orderTask(si()) : r < .75 ? gapTask(si()) : nextTask(si()); }

    M.run({ root:containerId, key:'story', need:10, theme:'sunset', levels:[L1,L2,L3] });
  });
}
