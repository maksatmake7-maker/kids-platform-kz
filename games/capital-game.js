/* ===== Білім Аралы — «Бас әріппен бе: Большая или маленькая» (v3) =====
   Казахский язык, 1 класс (4-я четверть, цель 1.4.5.2 приказа №399): слова с заглавной буквы — имена людей, названия городов, клички животных. 10 слов из прежней игры. Уровни: как правильно писать → с какой буквы → что это за слово / разложи.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'forest',icons:['А','а','🏙️']};
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
function initCapitalGame(containerId){
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
    /* 10 слов из прежней игры: [слово, вид, значок] */
    var W = [['айгүл','person','👧'],['ерлан','person','👦'],['алматы','city','🏙️'],['астана','city','🏛️'],['ақбар','pet','🐕'],['қала','word','🏙️'],['ит','word','🐕'],['кітап','word','📕'],['үй','word','🏠'],['қыз','word','👧']];
    var CATS = ['person','city','pet','word'];
    function cap(w){ return w.charAt(0).toUpperCase() + w.slice(1); }
    function isBig(w){ return w[1] !== 'word'; }
    function show(w){ return isBig(w) ? cap(w[0]) : w[0]; }

    (function(){
      if(document.getElementById('mxcp-css')) return;
      var s = document.createElement('style'); s.id = 'mxcp-css';
      s.textContent = ''
      + '.mxcp-card{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:190px;padding:12px 24px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 2.1rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;width:max-content;animation:mxIn .4s backwards;}.mxcp-card .e{font-size:3.4rem;line-height:1.1;}.mxcp-card u{text-decoration:none;color:#E5503C;}'
      + '.mxcp-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + 'body .mxs-balloon .b .nm{font-size:1.2rem!important;font-weight:800;padding:0 4px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:150px;}'
      + '@media (prefers-reduced-motion:reduce){.mxcp-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(w){
      var big = isBig(w), rule = big ? 'caprule' : 'caprule2';
      return { hintSay:[KK(w[0]), 'f:' + rule], hint:function(el){ el.innerHTML = '<div class="mxcp-card" style="padding:8px 22px"><span class="e" style="font-size:2.4rem">' + w[2] + '</span>' + (big ? '<u>' + cap(w[0]).charAt(0) + '</u>' + w[0].slice(1) : w[0]) + '</div><div class="mxcp-info">' + F()[rule] + '</div>'; } };
    }
    /* ⭐: два написания — выбери верное */
    function spellTask(w){
      var h = hintOf(w), good = show(w), bad = isBig(w) ? w[0] : cap(w[0]);
      return S('p' + w[0], { expr:'', say:V.tpl('seq', {list:[KK(w[0]), 'f:capq']}), cap:F().capq, ans:good, layout:'wide', opts:shuffle([good, bad]).map(function(x){ return { v:x, h:'<span class="nm" style="font-size:1.6rem!important">' + x + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxcp-card"><span class="e">' + w[2] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: с какой буквы пишется слово */
    function bigTask(w){
      var h = hintOf(w);
      return S('b' + w[0], { expr:'', say:V.tpl('seq', {list:[KK(w[0]), 'f:capyn']}), cap:F().capyn, ans:isBig(w) ? 'big' : 'small', layout:'wide', opts:[{ v:'big', h:'<span class="nm">' + F().cap_big + '</span>' }, { v:'small', h:'<span class="nm">' + F().cap_small + '</span>' }],
        field:function(el){ el.innerHTML = '<div class="mxcp-card"><span class="e">' + w[2] + '</span>' + w[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: что это за слово — имя, город, кличка, обычное слово */
    function catTask(w){
      var h = hintOf(w);
      return S('c' + w[0], { expr:'', say:V.tpl('seq', {list:[KK(w[0]), 'f:capcat']}), cap:F().capcat, ans:w[1], layout:'wide', opts:shuffle(CATS).map(function(c){ return { v:c, h:'<span class="nm">' + F()['cat_' + c] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxcp-card"><span class="e">' + w[2] + '</span>' + show(w) + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть слов */
    function sortTask(){
      var bigs = shuffle(W.filter(isBig)).slice(0, 3), smalls = shuffle(W.filter(function(x){ return !isBig(x); })).slice(0, 3);
      var items = shuffle(bigs.concat(smalls).map(function(x){ return { h:x[0], k:isBig(x) ? 'big' : 'small', id:x[0] }; }));
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'capsort'}), hintSay:['f:caprule', 'f:caprule2'],
        buckets:[{ k:'big', name:F().cap_big, icon:'А', c1:'#FFB454', c2:'#E8832F' }, { k:'small', name:F().cap_small, icon:'а', c1:'#5EC7FF', c2:'#2F9BE6' }] }));
    }

    function L1(){ return spellTask(pick(W)); }
    function L2(){ return Math.random() < .6 ? bigTask(pick(W)) : spellTask(pick(W)); }
    function L3(){ var r = Math.random(); return r < .45 ? catTask(pick(W)) : r < .75 ? sortTask() : bigTask(pick(W)); }

    M.run({ root:containerId, key:'capital', need:10, theme:'forest', levels:[L1,L2,L3] });
  });
}
