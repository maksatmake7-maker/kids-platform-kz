/* ===== Білім Аралы — «Бұл қандай жанр: Өлең, ертегі, жұмбақ» (v3) =====
   Казахский язык, 1 класс (цель 1.3.3.1 приказа №399): жанры — стихотворение (өлең), сказка (ертегі), загадка (жұмбақ). Уровни: описание → казахское название → картинка / зачин сказки.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'candy',icons:['🎶','🏰','🧩']};
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
function initKazGenreGame(containerId){
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
    /* 3 жанра из программы: стихотворение, сказка, загадка */
    var G = { poem:['Өлең','Стихотворение','🎶','Текст, в котором строчки рифмуются между собой.'], tale:['Ертегі','Сказка','🏰','История с волшебством, где часто добро побеждает зло.'], riddle:['Жұмбақ','Загадка','🧩','Короткий текст, в котором нужно отгадать, о каком предмете или существе идёт речь.'] };
    var KEYS = ['poem','tale','riddle'];

    (function(){
      if(document.getElementById('mxkg-css')) return;
      var s = document.createElement('style'); s.id = 'mxkg-css';
      s.textContent = ''
      + '.mxkg-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;min-width:160px;padding:14px 20px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.25rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;width:max-content;animation:mxIn .4s backwards;}.mxkg-card .e{font-size:3rem;line-height:1;}.mxkg-card.d{font-size:1.1rem;font-weight:700;width:auto;}'
      + '.mxkg-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.45rem!important;font-weight:800;}'
      + '@media (prefers-reduced-motion:reduce){.mxkg-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(g){
      return { hintSay:[KK(G[g][0]), 'f:r_g_' + g, 'f:r_gd_' + g], hint:function(el){ el.innerHTML = '<div class="mxkg-card" style="padding:8px 22px"><span class="e">' + G[g][2] + '</span>' + G[g][0] + ' — ' + G[g][1] + '</div><div class="mxkg-info">' + G[g][3] + '</div>'; } };
    }
    function names(g){ return shuffle(KEYS).map(function(k){ return { v:k, h:'<span class="nm">' + G[k][0] + '</span>' }; }); }
    /* описание (по-русски) → казахское название жанра */
    function descTask(g){
      var h = hintOf(g);
      return S('d' + g, { expr:'', echo:[KK(G[g][0])], say:V.tpl('seq', {list:['f:r_gd_' + g, 'f:genredq']}), cap:F().genredq, ans:g, layout:'wide', opts:names(g),
        field:function(el){ el.innerHTML = '<div class="mxkg-card d"><span class="e">🔎</span>' + G[g][3] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* русское название → казахское */
    function nameTask(g){
      var h = hintOf(g);
      return S('n' + g, { expr:'', echo:[KK(G[g][0])], say:V.tpl('seq', {list:['f:r_g_' + g, 'f:kgname']}), cap:F().kgname, ans:g, layout:'wide', opts:names(g),
        field:function(el){ el.innerHTML = '<div class="mxkg-card"><span class="e">' + G[g][2] + '</span>' + G[g][1] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* казахское название → картинка жанра */
    function iconTask(g){
      var h = hintOf(g);
      return S('i' + g, { expr:'', echo:[KK(G[g][0])], say:V.tpl('seq', {list:[KK(G[g][0]), 'f:kgicon']}), cap:F().kgicon, ans:g, layout:'wide', opts:shuffle(KEYS).map(function(k){ return { v:k, h:'<span class="lt">' + G[k][2] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxkg-card" style="font-size:2rem">' + G[g][0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* традиционный зачин сказки */
    function openTask(){
      var h = hintOf('tale');
      return S('o', { expr:'', echo:[KK(G.tale[0])], say:V.tpl('seq', {list:['f:k_t_erte', 'f:genreq']}), cap:F().genreq, ans:'tale', layout:'wide', opts:names('tale'),
        field:function(el){ el.innerHTML = '<div class="mxkg-card" style="font-size:1.6rem">Ерте, ерте, ертеде…</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }

    function L1(){ return descTask(pick(KEYS)); }
    function L2(){ var r = Math.random(); return r < .4 ? nameTask(pick(KEYS)) : r < .75 ? iconTask(pick(KEYS)) : descTask(pick(KEYS)); }
    function L3(){ var r = Math.random(); return r < .25 ? openTask() : r < .55 ? descTask(pick(KEYS)) : r < .8 ? nameTask(pick(KEYS)) : iconTask(pick(KEYS)); }

    M.run({ root:containerId, key:'kazgenre', need:10, theme:'candy', levels:[L1,L2,L3] });
  });
}
