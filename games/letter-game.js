/* ===== Білім Аралы — «Найди букву: Радужная азбука» (v3) =====
   Обучение грамоте, 1 класс (приказ №399): звуки и буквы, первая буква слова. 23 буквы со словами из программы. Уровни: найди картинку на букву → с какой буквы слово → чего не хватает / раздай картинки.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'rainbow',icons:['🅰️','🍊','🐱']};
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
function initLetterGame(containerId){
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
    /* 23 буквы из программы: буква → слово и картинка */
    var LET = [['А','Апельсин','🍊'],['Б','Банан','🍌'],['В','Виноград','🍇'],['Г','Гриб','🍄'],['Д','Дом','🏠'],['Ж','Жук','🐞'],['З','Заяц','🐰'],['К','Кот','🐱'],['Л','Лев','🦁'],['М','Мяч','⚽'],['Н','Носорог','🦏'],['О','Огурец','🥒'],['П','Пингвин','🐧'],['Р','Рыба','🐟'],['С','Слон','🐘'],['Т','Тигр','🐯'],['У','Утка','🦆'],['Ф','Флаг','🚩'],['Х','Хомяк','🐹'],['Ц','Цветок','🌸'],['Ч','Черепаха','🐢'],['Ш','Шар','🎈'],['Я','Яблоко','🍎']];

    (function(){
      if(document.getElementById('mxlt-css')) return;
      var s = document.createElement('style'); s.id = 'mxlt-css';
      s.textContent = ''
      + '.mxlt-card{display:flex;flex-direction:column;align-items:center;justify-content:center;width:150px;height:150px;border-radius:30px;background:rgba(255,255,255,.92);box-shadow:inset 0 -9px 0 rgba(0,0,0,.08),0 7px 0 rgba(0,0,0,.14);font:800 5.6rem/1 "Baloo 2",sans-serif;color:#7E6BD6;animation:mxIn .4s backwards;}'
      + '.mxlt-pic{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:170px;height:150px;border-radius:30px;background:rgba(255,255,255,.92);box-shadow:inset 0 -9px 0 rgba(0,0,0,.08),0 7px 0 rgba(0,0,0,.14);font-size:4.6rem;line-height:1;animation:mxIn .4s backwards;}'
      + '.mxlt-pic b{font:800 1.5rem "Baloo 2",sans-serif;color:#25324A;letter-spacing:.06em;}.mxlt-pic b i{font-style:normal;color:#FF6B5B;}'
      + '.mxlt-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.2rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxlt-info .e{font-size:2.6rem;line-height:1;}.mxlt-info .L{font-size:2.6rem;color:#7E6BD6;}'
      + '.mxs .mxs-balloon.wide{width:120px;}.mxs-balloon .b .em{font-size:2.3rem;text-shadow:none;}.mxs-balloon .b .lt{font:800 2.2rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxlt-card,.mxlt-pic{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(e){
      return { hintSay:[LK(e[0]), WK(e[1])], hint:function(el){ el.innerHTML = '<div class="mxlt-info"><span class="L">' + e[0] + '</span><span class="e">' + e[2] + '</span><span>' + e[1] + '</span></div>'; } };
    }
    function picOpts(e){
      var set = shuffle([e].concat(shuffle(LET.filter(function(x){ return x[0] !== e[0]; })).slice(0, 3)));
      return set.map(function(x){ return { v:x[0], h:'<span class="em">' + x[2] + '</span>' }; });
    }
    function letOpts(e){
      var set = shuffle([e].concat(shuffle(LET.filter(function(x){ return x[0] !== e[0]; })).slice(0, 3)));
      return set.map(function(x){ return { v:x[0], h:'<span class="lt">' + x[0] + '</span>' }; });
    }
    /* ⭐: дана буква — найди картинку на эту букву */
    function findPic(e){
      var h = hintOf(e);
      return S('p' + e[0], { expr:'', say:V.tpl('seq', {list:['f:findpic', LK(e[0])]}), cap:F().findpic, ans:e[0], layout:'wide', opts:picOpts(e),
        field:function(el){ el.innerHTML = '<div class="mxlt-card">' + e[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: дана картинка и слово — с какой буквы начинается */
    function findLetter(e){
      var h = hintOf(e);
      return S('l' + e[0], { expr:'', say:V.tpl('seq', {list:[WK(e[1]), 'f:letterq']}), cap:F().letterq, ans:e[0], layout:'wide', opts:letOpts(e),
        field:function(el){ el.innerHTML = '<div class="mxlt-pic"><span>' + e[2] + '</span><b>' + e[1].toUpperCase() + '</b></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: у слова нет первой буквы */
    function missFirst(e){
      var h = hintOf(e);
      return S('m' + e[0], { expr:'', say:V.tpl('seq', {list:['f:missfirst', WK(e[1])]}), cap:F().missfirst, ans:e[0], layout:'wide', opts:letOpts(e),
        field:function(el){ el.innerHTML = '<div class="mxlt-pic"><span>' + e[2] + '</span><b><i>_</i>' + e[1].slice(1).toUpperCase() + '</b></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: раздай три картинки по их буквам */
    function sortPics(){
      var set = shuffle(LET).slice(0, 3), items = shuffle(set).map(function(x){ return { h:x[2], k:x[0], id:x[2] }; });
      var cols = [['#5EC7FF','#2F9BE6'], ['#FFB454','#E8832F'], ['#B58CFF','#7E5BD6']];
      return S('s' + set.map(function(x){ return x[0]; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sortpics'}),
        hintSay:set.reduce(function(a, x){ return a.concat([LK(x[0]), WK(x[1])]); }, []),
        buckets:set.map(function(x, i){ return { k:x[0], name:'', icon:'<span style="font:800 2.6rem/1 Baloo 2,sans-serif">' + x[0] + '</span>', c1:cols[i][0], c2:cols[i][1] }; })
      }));
    }

    function L1(){ return findPic(pick(LET)); }
    function L2(){ return Math.random() < .75 ? findLetter(pick(LET)) : findPic(pick(LET)); }
    function L3(){ var r = Math.random(); return r < .5 ? missFirst(pick(LET)) : r < .8 ? sortPics() : findLetter(pick(LET)); }

    M.run({ root:containerId, key:'letter', need:10, theme:'rainbow', levels:[L1,L2,L3] });
  });
}
