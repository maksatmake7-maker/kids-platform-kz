/* ===== Білім Аралы — «Собери слово: Морская азбука» (v3) =====
   Обучение грамоте, 1 класс (приказ №399): составление слов из букв. 10 трёхбуквенных слов из программы. Уровни: собери слово → какой буквы не хватает → собери с лишними буквами / какое слово к картинке.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'ocean',icons:['🐱','🏠','🦁']};
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
function initWordGame(containerId){
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
    /* 10 трёхбуквенных слов из программы */
    var WORDS = [['КОТ','🐱'],['ДОМ','🏠'],['ЛЕВ','🦁'],['СОК','🧃'],['МЯЧ','⚽'],['ЖУК','🐞'],['ЛУК','🧅'],['СЫР','🧀'],['ЧАЙ','🍵'],['КУБ','🧊']];
    var ABC = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЯ'.split('');

    (function(){
      if(document.getElementById('mxwd-css')) return;
      var s = document.createElement('style'); s.id = 'mxwd-css';
      s.textContent = ''
      + '.mxwd-pic{display:flex;align-items:center;justify-content:center;width:130px;height:110px;border-radius:26px;background:rgba(255,255,255,.92);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.4rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxwd-slots{display:flex;gap:8px;justify-content:center;margin:14px 0 12px;}'
      + '.mxwd-slot{width:62px;height:70px;border-radius:16px;border:4px dashed rgba(255,255,255,.9);background:rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font:800 2.5rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;}'
      + '.mxwd-slot.f{border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);animation:mxIn .2s;}'
      + '.mxwd-tiles{display:flex;gap:9px;justify-content:center;flex-wrap:wrap;max-width:330px;}'
      + '.mxwd-tile{width:62px;height:66px;border-radius:16px;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 6px 0 rgba(0,0,0,.22);font:800 2.3rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;animation:mxIn .35s backwards;}'
      + '.mxwd-tile.used{visibility:hidden;}'
      + '.mxwd-word{font:800 2rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 22px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);letter-spacing:.12em;margin-top:6px;}'
      + '.mxwd-gap{display:flex;gap:6px;justify-content:center;margin-top:10px;}.mxwd-gap b{width:50px;height:60px;border-radius:14px;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.16);font:800 2.2rem/60px "Baloo 2",sans-serif;color:#25324A;text-align:center;}.mxwd-gap b.q{background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;line-height:54px;}'
      + '.mxs .mxs-balloon.wide{width:120px;}.mxs-balloon .b .lt{font:800 2.6rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.45rem!important;font-weight:800;padding:0 6px;text-align:center;letter-spacing:.06em;}'
      + '@media (prefers-reduced-motion:reduce){.mxwd-pic,.mxwd-slot,.mxwd-tile{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(w){
      return { hintSay:['f:spellsay', WK(w[0])], hint:function(el){ el.innerHTML = '<div class="mxwd-pic" style="margin:0 auto">' + w[1] + '</div><div style="text-align:center"><span class="mxwd-word">' + w[0].split('').join(' ') + '</span></div>'; } };
    }
    function letOpts(w, idx){
      var ans = w[0][idx], pool = shuffle(ABC.filter(function(c){ return c !== ans; })).slice(0, 3);
      return shuffle([ans].concat(pool)).map(function(c){ return { v:c, h:'<span class="lt">' + c + '</span>' }; });
    }
    /* ⭐ / ⭐⭐⭐: собери слово из перемешанных букв (extra — лишние буквы) */
    function buildTask(w, extra){
      var h = hintOf(w), n = w[0].length;
      return S((extra ? 'x' : 'b') + w[0], { expr:'', say:V.tpl('seq', {list:['f:buildq', WK(w[0])]}), cap:F().buildq, ans:'ok', gate:false,
        field:function(el, X, task){
          var letters = w[0].split(''), ex = extra ? shuffle(ABC.filter(function(c){ return w[0].indexOf(c) < 0; })).slice(0, 2) : [];
          var tl = shuffle(letters.concat(ex));
          if(tl.join('') === w[0]) tl = tl.reverse();
          el.innerHTML = '<div class="mxwd-pic" style="margin:0 auto">' + w[1] + '</div><div class="mxwd-slots">' + letters.map(function(){ return '<button type="button" class="mxwd-slot"></button>'; }).join('') + '</div><div class="mxwd-tiles">' + tl.map(function(c, i){ return '<button type="button" class="mxwd-tile" style="animation-delay:' + (i*.05) + 's">' + c + '</button>'; }).join('') + '</div>';
          var slots = [].slice.call(el.querySelectorAll('.mxwd-slot')), tiles = [].slice.call(el.querySelectorAll('.mxwd-tile')), put = [];
          function paint(){ slots.forEach(function(sl, i){ var t = put[i]; sl.textContent = t ? t.textContent : ''; sl.classList.toggle('f', !!t); }); }
          function finish(){ task._done = true; var got = put.map(function(t){ return t.textContent; }).join(''); X.sleep(300).then(function(ok){ if(ok) task.submit(got === w[0] ? 'ok' : 'no', slots[0]); }); }
          tiles.forEach(function(t, i){ t.addEventListener('click', function(){ if(task._done || t.classList.contains('used') || put.length >= n) return; t.classList.add('used'); put.push(t); X.sfx.tap(put.length); paint(); if(put.length === n) finish(); }); });
          slots.forEach(function(sl, i){ sl.addEventListener('click', function(){ if(task._done || i >= put.length) return; var t = put.splice(i, 1)[0]; t.classList.remove('used'); X.sfx.tap(1); paint(); }); });
          task.auto = function(wrong){
            var order = letters.slice(); if(wrong){ var a = order[0]; order[0] = order[1]; order[1] = a; }
            order.forEach(function(c){ var t = tiles.filter(function(x){ return !x.classList.contains('used') && x.textContent === c; })[0]; if(t) t.click(); });
          };
        }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: в слове не хватает буквы */
    function gapTask(w){
      var idx = rnd(0, w[0].length - 1), h = hintOf(w);
      return S('g' + w[0] + idx, { expr:'', say:V.tpl('seq', {list:['f:gapq', WK(w[0])]}), cap:F().gapq, ans:w[0][idx], layout:'wide', opts:letOpts(w, idx),
        field:function(el){ el.innerHTML = '<div class="mxwd-pic" style="margin:0 auto">' + w[1] + '</div><div class="mxwd-gap">' + w[0].split('').map(function(c, i){ return i === idx ? '<b class="q">?</b>' : '<b>' + c + '</b>'; }).join('') + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: какое слово подходит к картинке */
    function whichTask(w){
      var h = hintOf(w), set = shuffle([w].concat(shuffle(WORDS.filter(function(x){ return x[0] !== w[0]; })).slice(0, 3)));
      return S('w' + w[0], { expr:'', say:V.tpl('q', {k:'whichword'}), ans:w[0], layout:'wide', opts:set.map(function(x){ return { v:x[0], h:'<span class="nm">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxwd-pic" style="margin:0 auto;height:120px">' + w[1] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }

    function L1(){ return buildTask(pick(WORDS), false); }
    function L2(){ var r = Math.random(); return r < .6 ? gapTask(pick(WORDS)) : buildTask(pick(WORDS), false); }
    function L3(){ var r = Math.random(); return r < .45 ? buildTask(pick(WORDS), true) : r < .75 ? whichTask(pick(WORDS)) : gapTask(pick(WORDS)); }

    M.run({ root:containerId, key:'word', need:10, theme:'ocean', levels:[L1,L2,L3] });
  });
}
