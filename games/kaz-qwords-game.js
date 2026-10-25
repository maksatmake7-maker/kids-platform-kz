/* ===== Білім Аралы — «Вопросительные слова: Кім? Не? Қандай? Неше?» (v3) =====
   Казахский язык, 1 класс (цель 1.3.4.1 приказа №399): вопросы к картинке — кім? не? қандай? неше? Уровни: вопрос к картинке → картинка к вопросу → разложи по вопросам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'ocean',icons:['🙋','📦','🔢']};
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
function initKazQwordsGame(containerId){
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
    /* 10 сценариев из прежней игры: [значок, сколько штук, вопрос] */
    var SC = [['🧒',1,'kim'],['👩‍🏫',1,'kim'],['📕',1,'ne'],['✏️',1,'ne'],['🧸',1,'ne'],['sw:#E53935',1,'qandai'],['sw:#43A047',1,'qandai'],['🍎',3,'neshe'],['⭐',5,'neshe'],['📕',2,'neshe']];
    var QW = { kim:'КІМ?', ne:'НЕ?', qandai:'ҚАНДАЙ?', neshe:'НЕШЕ?' };
    var QK = ['kim','ne','qandai','neshe'];
    var QI = { kim:'🙋', ne:'📦', qandai:'🎨', neshe:'🔢' };
    function pic(sc){ if(sc[0].indexOf('sw:') === 0) return '<span class="sw" style="background:' + sc[0].slice(3) + '"></span>'; var a = []; for(var i = 0; i < sc[1]; i++) a.push(sc[0]); return a.join(''); }
    function sizeOf(sc){ return sc[1] >= 5 ? '1.8rem' : sc[1] >= 3 ? '2.6rem' : '4.2rem'; }

    (function(){
      if(document.getElementById('mxqw-css')) return;
      var s = document.createElement('style'); s.id = 'mxqw-css';
      s.textContent = ''
      + '.mxqw-big{display:flex;align-items:center;justify-content:center;min-width:140px;max-width:320px;min-height:116px;padding:8px 20px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);line-height:1.1;margin:0 auto;width:max-content;animation:mxIn .4s backwards;word-break:break-all;text-align:center;}'
      + '.mxqw-q{font:800 2.4rem/1 "Baloo 2",sans-serif;color:#2F9BE6;}'
      + '.mxqw-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + 'body .mxs-balloon .b .nm{font-size:1.25rem!important;font-weight:800;padding:0 4px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:150px;}.mxs-balloon .b .pc{display:block;text-align:center;line-height:1.1;word-break:break-all;}'
      + '.sw{display:inline-block;width:1em;height:1em;border-radius:22%;box-shadow:inset 0 -.08em 0 rgba(0,0,0,.18),0 .04em 0 rgba(0,0,0,.2);vertical-align:middle;}'
      + '@media (prefers-reduced-motion:reduce){.mxqw-big{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(q, sc){
      return { hintSay:[KK(QW[q]), 'f:qm_' + q], hint:function(el){ el.innerHTML = (sc ? '<div class="mxqw-big" style="min-height:80px"><span style="font-size:' + sizeOf(sc) + '">' + pic(sc) + '</span></div>' : '') + '<div class="mxqw-info"><b style="font-size:1.5rem;color:#2F9BE6">' + QW[q] + '</b><span>' + F()['qm_' + q] + '</span></div>'; } };
    }
    /* ⭐: картинка → вопросительное слово */
    function qTask(sc, n){
      var q = sc[2], h = hintOf(q, sc), set = shuffle([q].concat(shuffle(QK.filter(function(x){ return x !== q; })).slice(0, n - 1)));
      return S('q' + SC.indexOf(sc) + n, { expr:'', echo:[KK(QW[q])], say:V.tpl('q', {k:'qwq'}), ans:q, layout:'wide', opts:set.map(function(x){ return { v:x, h:'<span class="nm">' + QW[x] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxqw-big"><span style="font-size:' + sizeOf(sc) + '">' + pic(sc) + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: вопросительное слово → подходящая картинка */
    function findTask(q){
      var byQ = function(k){ var a = SC.filter(function(x){ return x[2] === k; }); return a[rnd(0, a.length - 1)]; };
      var target = byQ(q), set = shuffle(QK.map(function(k){ return k === q ? target : byQ(k); })), h = hintOf(q, target);
      return S('f' + q + set.map(function(x){ return SC.indexOf(x); }).join('-'), { expr:'', echo:[KK(QW[q])], say:V.tpl('seq', {list:[KK(QW[q]), 'f:qwfind']}), cap:F().qwfind, ans:String(SC.indexOf(target)), layout:'wide',
        opts:set.map(function(x){ return { v:String(SC.indexOf(x)), h:'<span class="pc" style="font-size:' + (x[1] >= 5 ? '1.3rem' : x[1] >= 3 ? '1.7rem' : '2.5rem') + '">' + pic(x) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxqw-big"><span class="mxqw-q">' + QW[q] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: разложи шесть картинок по трём вопросам */
    function sortTask(){
      var three = shuffle(QK).slice(0, 3), items = [], cols = { kim:['#FF8FB1','#E8527F'], ne:['#FFB454','#E8832F'], qandai:['#7AD36B','#3FA84A'], neshe:['#5EC7FF','#2F9BE6'] };
      three.forEach(function(k){ shuffle(SC.map(function(x, i){ return [x, i]; }).filter(function(p){ return p[0][2] === k && (p[0][1] === 1 || k === 'neshe'); })).slice(0, 2).forEach(function(p){ items.push({ h:pic(p[0]), k:k, id:String(p[1]) }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'qwsort'}), hintSay:three.map(function(k){ return 'f:qm_' + k; }),
        buckets:three.map(function(k){ return { k:k, name:QW[k], icon:QI[k], c1:cols[k][0], c2:cols[k][1] }; }) }));
    }

    function L1(){ return qTask(pick(SC), 3); }
    function L2(){ return Math.random() < .5 ? qTask(pick(SC), 4) : findTask(pick(QK)); }
    function L3(){ var r = Math.random(); return r < .4 ? sortTask() : r < .75 ? findTask(pick(QK)) : qTask(pick(SC), 4); }

    M.run({ root:containerId, key:'kazqwords', need:10, theme:'ocean', levels:[L1,L2,L3] });
  });
}
