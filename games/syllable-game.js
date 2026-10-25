/* ===== Білім Аралы — «Сколько слогов: Хлопушки Барсика» (v3) =====
   Обучение грамоте, 1 класс (приказ №399): деление слов на слоги. 15 слов с 1–4 слогами. Уровни: сколько слогов → хлопни по слогам → найди слово / разложи по числу слогов.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'play',icons:['👏','🏠','🚲']};
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
function initSyllableGame(containerId){
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
    /* 15 слов из программы: слово с делением на слоги, число слогов, картинка */
    var WORDS = [['ДОМ',1,'🏠'],['КОТ',1,'🐱'],['СЫР',1,'🧀'],['ЛЕВ',1,'🦁'],['РЫ-БА',2,'🐟'],['ЛИ-СА',2,'🦊'],['ПТИ-ЦА',2,'🐦'],['КНИ-ГА',2,'📖'],['МА-ШИ-НА',3,'🚗'],['СО-БА-КА',3,'🐕'],['ЯБ-ЛО-КО',3,'🍎'],['КО-РО-ВА',3,'🐄'],['КРО-КО-ДИЛ',3,'🐊'],['ВЕ-ЛО-СИ-ПЕД',4,'🚲'],['ПО-МИ-ДО-РЫ',4,'🍅']];
    function plain(w){ return w[0].replace(/-/g, ''); }
    function claps(n){ var s = ''; for(var i = 0; i < n; i++) s += '👏'; return s; }

    (function(){
      if(document.getElementById('mxsy-css')) return;
      var s = document.createElement('style'); s.id = 'mxsy-css';
      s.textContent = ''
      + '.mxsy-pic{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:min(88vw,300px);min-height:150px;border-radius:30px;background:rgba(255,255,255,.92);box-shadow:inset 0 -9px 0 rgba(0,0,0,.08),0 7px 0 rgba(0,0,0,.14);font-size:4.6rem;line-height:1;animation:mxIn .4s backwards;padding:8px 6px;}'
      + '.mxsy-pic b{font:800 1.9rem "Baloo 2",sans-serif;color:#25324A;letter-spacing:.05em;text-align:center;}.mxsy-pic b u{text-decoration:none;color:#FF6B5B;margin:0 1px;}'
      + '.mxsy-dots{display:flex;gap:8px;justify-content:center;min-height:30px;margin-top:6px;}.mxsy-dots i{width:24px;height:24px;border-radius:50%;background:#FFB400;box-shadow:0 3px 0 rgba(0,0,0,.2);animation:mxIn .25s backwards;}'
      + '.mxsy-clap{width:120px;height:120px;border-radius:50%;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 8px 0 rgba(0,0,0,.2);font-size:3.4rem;cursor:pointer;margin-top:12px;}.mxsy-clap:active{transform:translateY(4px);box-shadow:0 4px 0 rgba(0,0,0,.2);}'
      + '.mxsy-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxs .mxs-balloon.wide{width:130px;}.mxs-balloon.wide .b .nm{font-size:1.05rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .num{font:800 2.6rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxsy-pic,.mxsy-dots i{animation:none}}';
      document.head.appendChild(s);
    })();

    function hyph(w){ return w[0].split('-').join('<u>·</u>'); }
    function hintOf(w){
      return { hintSay:[WK(w[0]), 'f:syllsay'], hint:function(el){ el.innerHTML = '<div class="mxsy-pic"><span>' + w[2] + '</span><b>' + hyph(w) + '</b></div><div class="mxsy-dots">' + [].map.call(new Array(w[1]), function(){ return '<i></i>'; }).join('') + '</div><div class="mxsy-info">' + w[1] + ' — ' + F().syllsay + '</div>'; } };
    }
    function numOpts(){ return shuffle([1,2,3,4]).map(function(n){ return { v:String(n), h:'<span class="num">' + n + '</span>' }; }); }
    function wordCard(w, split){ return function(el){ el.innerHTML = '<div class="mxsy-pic"><span>' + w[2] + '</span><b>' + (split ? hyph(w) : plain(w)) + '</b></div>'; }; }
    /* ⭐: слово поделено на слоги — сколько слогов */
    function askTask(w, split){
      var h = hintOf(w);
      return S((split ? 'a' : 'b') + plain(w), { expr:'', say:V.tpl('seq', {list:[WK(w[0]), 'f:syllq']}), cap:F().syllq, ans:String(w[1]), layout:'wide', opts:numOpts(), field:wordCard(w, split), hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: хлопни по слогам */
    function clapTask(w){
      var h = hintOf(w);
      return S('c' + plain(w), { expr:'', say:V.tpl('seq', {list:[WK(w[0]), 'f:clapq']}), cap:F().clapq, ans:'ok', gate:false,
        field:function(el, X, task){
          el.innerHTML = '<div class="mxsy-pic"><span>' + w[2] + '</span><b>' + plain(w) + '</b></div><div class="mxsy-dots"></div><button type="button" class="mxsy-clap" aria-label="clap">👏</button>';
          var dots = el.querySelector('.mxsy-dots'), btn = el.querySelector('.mxsy-clap'), n = 0;
          var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.style.marginTop = '14px'; go.textContent = '✔'; el.appendChild(go);
          btn.addEventListener('click', function(){ if(task._done || n >= 8) return; n++; dots.insertAdjacentHTML('beforeend', '<i></i>'); X.sfx.tap(n); });
          function check(){ if(task._done) return; task._done = true; task.submit(n === w[1] ? 'ok' : 'no', go); }
          go.addEventListener('click', check);
          task.auto = function(wrong){ var want = wrong ? w[1] % 4 + 1 : w[1]; while(n < want) btn.click(); check(); };
        },
        hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: найди слово с нужным числом слогов */
    function findTask(n){
      var cand = shuffle(WORDS.filter(function(x){ return x[1] === n; }))[0], pool = shuffle(WORDS.filter(function(x){ return x[1] !== n; })).slice(0, 3), set = shuffle([cand].concat(pool)), h = hintOf(cand);
      return S('f' + n + plain(cand), { expr:'', say:V.tpl('q', {k:'findsyll' + n}), ans:plain(cand), layout:'wide', opts:set.map(function(x){ return { v:plain(x), h:'<span class="nm">' + plain(x) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsy-pic" style="min-height:0;font-size:3rem;">' + claps(n) + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть слов по числу слогов (1, 2, 3) */
    function sortTask(){
      var items = [];
      [1, 2, 3].forEach(function(n){ shuffle(WORDS.filter(function(x){ return x[1] === n; })).slice(0, 2).forEach(function(x){ items.push({ h:plain(x), k:String(n), id:plain(x) }); }); });
      items = shuffle(items);
      var cols = [['#5EC7FF','#2F9BE6'], ['#FFB454','#E8832F'], ['#B58CFF','#7E5BD6']];
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true,
        items:items, say:V.tpl('q', {k:'sortsyll'}), hintSay:['f:syllsay'],
        buckets:[1, 2, 3].map(function(n, i){ return { k:String(n), name:String(n), icon:claps(n), c1:cols[i][0], c2:cols[i][1] }; })
      }));
    }

    function L1(){ return askTask(pick(WORDS), true); }
    function L2(){ var r = Math.random(); return r < .6 ? clapTask(pick(WORDS)) : askTask(pick(WORDS), false); }
    function L3(){ var r = Math.random(); return r < .35 ? findTask(pick([1,2,3,4])) : r < .7 ? sortTask() : clapTask(pick(WORDS)); }

    M.run({ root:containerId, key:'syllable', need:10, theme:'play', levels:[L1,L2,L3] });
  });
}
