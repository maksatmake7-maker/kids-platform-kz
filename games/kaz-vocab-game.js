/* ===== Білім Аралы — «Всё обо мне: Первые казахские слова» (v3) =====
   Казахский язык, 1 класс (лексический минимум «Все обо мне»): 10 слов из прежней игры — оқушы, кітап, қалам, ойыншық, жеті, есім, отыру, мен, сен, ол. Уровни: картинка → слово → слово → картинка → перевод / слушай и найди.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'play',icons:['📕','✏️','🧸']};
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
function initKazVocabGame(containerId){
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
    /* 10 слов из прежней игры («Всё обо мне»): [слово, значок, перевод, номер клипа перевода] */
    var W = [['ОҚУШЫ','👨‍🎓','ученик',1],['КІТАП','📕','книга',2],['ҚАЛАМ','✏️','карандаш',3],['ОЙЫНШЫҚ','🧸','игрушка',4],['ЖЕТІ','7️⃣','семь',5],['ЕСІМ','🏷️','имя',6],['ОТЫРУ','💺','сидеть',7],['МЕН','🙋','я',8],['СЕН','👉','ты',9],['ОЛ','👤','он, она',10]];

    (function(){
      if(document.getElementById('mxkv-css')) return;
      var s = document.createElement('style'); s.id = 'mxkv-css';
      s.textContent = ''
      + '.mxkv-big{display:flex;align-items:center;justify-content:center;min-width:130px;height:116px;padding:0 24px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font:800 2rem/1 "Baloo 2",sans-serif;color:#25324A;margin:0 auto;width:max-content;animation:mxIn .4s backwards;}.mxkv-big .e{font-size:4.6rem;line-height:1;}'
      + '.mxkv-spk{display:flex;align-items:center;justify-content:center;width:120px;height:120px;border-radius:50%;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 7px 0 rgba(0,0,0,.25);font-size:3.6rem;cursor:pointer;margin:0 auto;padding:0;}'
      + '.mxkv-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.1rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxkv-info b{font-size:1.5rem;color:#2F9BE6;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.25rem!important;font-weight:800;padding:0 4px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:150px;}'
      + '@media (prefers-reduced-motion:reduce){.mxkv-big{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(w){
      return { hintSay:[KK(w[0]), 'f:r_tr_' + w[3]], hint:function(el){ el.innerHTML = '<div class="mxkv-big" style="height:92px"><span class="e" style="font-size:3.6rem">' + w[1] + '</span></div><div class="mxkv-info"><b>' + w[0] + '</b><span>— ' + w[2] + '</span></div>'; } };
    }
    function pickN(w, n, f){ return shuffle([w].concat(shuffle(W.filter(function(x){ return x[0] !== w[0]; })).slice(0, n - 1))).map(f); }
    /* ⭐: картинка → казахское слово */
    function picTask(w, n){
      var h = hintOf(w);
      return S('p' + w[0] + n, { expr:'', echo:[KK(w[0]), 'f:r_tr_' + w[3]], say:V.tpl('q', {k:'kvq'}), ans:w[0], layout:'wide', opts:pickN(w, n, function(x){ return { v:x[0], h:'<span class="nm">' + x[0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxkv-big"><span class="e">' + w[1] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: слово → картинка */
    function findTask(w){
      var h = hintOf(w);
      return S('f' + w[0], { expr:'', echo:[KK(w[0]), 'f:r_tr_' + w[3]], say:V.tpl('seq', {list:[KK(w[0]), 'f:kvfind']}), cap:F().kvfind, ans:w[0], layout:'wide', opts:pickN(w, 4, function(x){ return { v:x[0], h:'<span class="lt">' + x[1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxkv-big">' + w[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: слово → перевод */
    function trTask(w){
      var h = hintOf(w);
      return S('t' + w[0], { expr:'', echo:[KK(w[0]), 'f:r_tr_' + w[3]], say:V.tpl('seq', {list:[KK(w[0]), 'f:kvtr']}), cap:F().kvtr, ans:w[0], layout:'wide', opts:pickN(w, 4, function(x){ return { v:x[0], h:'<span class="nm">' + x[2] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxkv-big">' + w[0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: слушай и найди картинку (слово не написано) */
    function listenTask(w){
      var h = hintOf(w);
      return S('l' + w[0], { expr:'', echo:[KK(w[0]), 'f:r_tr_' + w[3]], say:V.tpl('seq', {list:['f:kvlisten', KK(w[0])]}), cap:F().kvlisten, ans:w[0], layout:'wide', opts:pickN(w, 4, function(x){ return { v:x[0], h:'<span class="lt">' + x[1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<button type="button" class="mxkv-spk" aria-label="Слушать">🔊</button>'; var b = el.querySelector('.mxkv-spk'); b.addEventListener('click', function(){ V.say(V.clips([KK(w[0])])); }); }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }

    function L1(){ return picTask(pick(W), 3); }
    function L2(){ return Math.random() < .5 ? picTask(pick(W), 4) : findTask(pick(W)); }
    function L3(){ var r = Math.random(); return r < .4 ? trTask(pick(W)) : r < .7 && V.enabled() ? listenTask(pick(W)) : findTask(pick(W)); }

    M.run({ root:containerId, key:'kazvocab', need:10, theme:'play', levels:[L1,L2,L3] });
  });
}
