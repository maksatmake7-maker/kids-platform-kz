/* ===== Білім Аралы — «Особые буквы: Қазақ әріптері» (v3) =====
   Казахский язык, 1 класс (цели 1.2.6.1 / 1.4.5.1 приказа №399): особые казахские буквы Ә Ө Ү Ұ І Ң Қ Ғ. Уровни: найди слово с буквой → какая буква в слове → чего не хватает / собери слово.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'rainbow',icons:['Ә','Қ','Ғ']};
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
function initKazLetterGame(containerId){
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
    /* 8 особых казахских букв и слова из прежней игры: [слово, значок] */
    var SP = ['Ә','Ө','Ү','Ұ','І','Ң','Қ','Ғ'];
    var WD = [['ӘЖЕ','👵'],['КӨЛ','🏞️'],['КҮН','☀️'],['ҚҰС','🐦'],['КІТАП','📕'],['ТАҢ','🌅'],['ҚЫЗ','👧'],['АҒАШ','🌳']];
    var ALPHA = 'АӘБВГҒДЕЖЗИЙКҚЛМНҢОӨПРСТУҰҮФХЦЧШЫІЭЮЯ'.split('');
    function specials(w){ return SP.filter(function(l){ return w[0].indexOf(l) >= 0; }); }
    function wordsWith(l){ return WD.filter(function(w){ return w[0].indexOf(l) >= 0; }); }
    function wordsWithout(l){ return WD.filter(function(w){ return w[0].indexOf(l) < 0; }); }

    (function(){
      if(document.getElementById('mxkl-css')) return;
      var s = document.createElement('style'); s.id = 'mxkl-css';
      s.textContent = ''
      + '.mxkl-big{display:flex;align-items:center;justify-content:center;width:130px;height:120px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font:800 5.2rem/1 "Baloo 2",sans-serif;color:#E5503C;margin:0 auto;animation:mxIn .4s backwards;}'
      + '.mxkl-card{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:170px;padding:10px 24px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 2rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;width:max-content;animation:mxIn .4s backwards;}.mxkl-card .e{font-size:3.2rem;line-height:1.1;}.mxkl-card u{text-decoration:none;color:#E5503C;}'
      + '.mxkl-gap{display:flex;gap:5px;justify-content:center;margin-top:8px;}.mxkl-gap b{min-width:44px;height:56px;padding:0 4px;border-radius:13px;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.16);font:800 2rem/56px "Baloo 2",sans-serif;color:#25324A;text-align:center;}.mxkl-gap b.q{background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;line-height:50px;}'
      + '.mxkl-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxkl-slots{display:flex;gap:7px;justify-content:center;margin:12px 0 12px;}.mxkl-slot{height:64px;border-radius:15px;border:4px dashed rgba(255,255,255,.9);background:rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font:800 2rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;}.mxkl-slot.f{border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);animation:mxIn .2s;}'
      + '.mxkl-tiles{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:330px;margin:0 auto;}.mxkl-tile{height:62px;border-radius:15px;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 6px 0 rgba(0,0,0,.22);font:800 1.9rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;animation:mxIn .35s backwards;}.mxkl-tile.used{visibility:hidden;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxkl-big,.mxkl-card,.mxkl-slot,.mxkl-tile{animation:none}}';
      document.head.appendChild(s);
    })();

    function mark(w){ return w[0].split('').map(function(c){ return SP.indexOf(c) >= 0 ? '<u>' + c + '</u>' : c; }).join(''); }
    function hintOf(w){
      return { hintSay:[KK(w[0]), 'f:kletsay'], hint:function(el){ el.innerHTML = '<div class="mxkl-card" style="padding:8px 22px"><span class="e" style="font-size:2.6rem">' + w[1] + '</span>' + mark(w) + '</div><div class="mxkl-info">' + F().kletsay + '</div>'; } };
    }
    /* ⭐: буква → картинка слова, где она есть */
    function findTask(l, n){
      var ans = pick(wordsWith(l)), others = shuffle(wordsWithout(l)).slice(0, n - 1), set = shuffle([ans].concat(others)), h = hintOf(ans);
      return S('f' + l + n, { expr:'', say:V.tpl('seq', {list:['f:kletq', KLK(l)]}), cap:F().kletq, ans:ans[1], layout:'wide', opts:set.map(function(w){ return { v:w[1], h:'<span class="lt">' + w[1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxkl-big">' + l + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    function letOpts(ans, w){
      var pool = shuffle(SP.filter(function(l){ return w[0].indexOf(l) < 0; })).slice(0, 3);
      return shuffle([ans].concat(pool)).map(function(l){ return { v:l, h:'<span class="lt">' + l + '</span>' }; });
    }
    /* ⭐⭐: слово с картинкой → какая особая буква в нём */
    function wordTask(w){
      var ans = pick(specials(w)), h = hintOf(w);
      return S('w' + w[0], { expr:'', say:V.tpl('seq', {list:['f:kletword', KK(w[0])]}), cap:F().kletword, ans:ans, layout:'wide', opts:letOpts(ans, w),
        field:function(el){ el.innerHTML = '<div class="mxkl-card"><span class="e">' + w[1] + '</span>' + w[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: в слове не хватает особой буквы */
    function gapTask(w){
      var ans = pick(specials(w)), ix = w[0].indexOf(ans), h = hintOf(w);
      return S('g' + w[0] + ix, { expr:'', say:V.tpl('seq', {list:['f:kletgap', KK(w[0])]}), cap:F().kletgap, ans:ans, layout:'wide', opts:letOpts(ans, w),
        field:function(el){ el.innerHTML = '<div class="mxkl-card" style="padding:8px 20px"><span class="e">' + w[1] + '</span></div><div class="mxkl-gap">' + w[0].split('').map(function(c, i){ return i === ix ? '<b class="q">?</b>' : '<b>' + c + '</b>'; }).join('') + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: собери слово из букв (с двумя лишними) */
    function buildTask(w){
      var h = hintOf(w), word = w[0], n = word.length, sz = n <= 4 ? 58 : 52;
      return S('b' + word, { expr:'', say:V.tpl('seq', {list:['f:buildq', KK(word)]}), cap:F().buildq, ans:'ok', gate:false,
        field:function(el, X, task){
          var letters = word.split(''), ex = shuffle(ALPHA.filter(function(c){ return word.indexOf(c) < 0; })).slice(0, 2), tl = shuffle(letters.concat(ex));
          if(tl.join('') === word) tl.reverse();
          el.innerHTML = '<div class="mxkl-card" style="padding:6px 20px;min-width:0"><span class="e">' + w[1] + '</span></div><div class="mxkl-slots">' + letters.map(function(){ return '<button type="button" class="mxkl-slot" style="width:' + sz + 'px"></button>'; }).join('') + '</div><div class="mxkl-tiles">' + tl.map(function(c, k){ return '<button type="button" class="mxkl-tile" style="width:' + sz + 'px;animation-delay:' + (k*.05) + 's">' + c + '</button>'; }).join('') + '</div>';
          var slots = [].slice.call(el.querySelectorAll('.mxkl-slot')), tiles = [].slice.call(el.querySelectorAll('.mxkl-tile')), put = [];
          function paint(){ slots.forEach(function(sl, k){ var t = put[k]; sl.textContent = t ? t.textContent : ''; sl.classList.toggle('f', !!t); }); }
          function finish(){ task._done = true; var got = put.map(function(t){ return t.textContent; }).join(''); X.sleep(300).then(function(ok){ if(ok) task.submit(got === word ? 'ok' : 'no', slots[0]); }); }
          tiles.forEach(function(t){ t.addEventListener('click', function(){ if(task._done || t.classList.contains('used') || put.length >= n) return; t.classList.add('used'); put.push(t); X.sfx.tap(put.length); paint(); if(put.length === n) finish(); }); });
          slots.forEach(function(sl, k){ sl.addEventListener('click', function(){ if(task._done || k >= put.length) return; var t = put.splice(k, 1)[0]; t.classList.remove('used'); X.sfx.tap(1); paint(); }); });
          task.auto = function(wrong){
            var order = letters.slice(); if(wrong){ var i2 = 0; while(i2 < order.length - 1 && order[i2] === order[i2 + 1]) i2++; var a = order[i2]; order[i2] = order[i2 + 1]; order[i2 + 1] = a; if(order.join('') === word) order = order.reverse(); }
            order.forEach(function(c){ var t = tiles.filter(function(x){ return !x.classList.contains('used') && x.textContent === c; })[0]; if(t) t.click(); });
          };
        }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }

    function L1(){ return findTask(pick(SP), 3); }
    function L2(){ var r = Math.random(); return r < .4 ? findTask(pick(SP), 4) : r < .75 ? wordTask(pick(WD)) : gapTask(pick(WD)); }
    function L3(){ var r = Math.random(); return r < .4 ? buildTask(pick(WD)) : r < .7 ? gapTask(pick(WD)) : r < .85 ? findTask(pick(SP), 4) : wordTask(pick(WD)); }

    V.forceVoice('kz');   /* казахский язык в русской школе: голос казахский, текст на экране русский */
    M.run({ root:containerId, key:'kazletter', need:10, theme:'rainbow', levels:[L1,L2,L3] });
  });
}
