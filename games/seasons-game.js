/* ===== Білім Аралы — «Времена года и отдых: Круглый год» (v3) =====
   Познание мира, 1 класс (цель 1.2.3.1 приказа №399): занятия на природе в разные времена года. 4 пары из прежней игры: зима — лыжи, весна — велосипед, лето — плавание, осень — школа; приметы и круг времён года.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'garden',icons:['❄️','🌸','☀️']};
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
function initSeasonsGame(containerId){
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
    /* четыре пары из программы: время года → занятие */
    var SE = { winter:['❄️','⛷️','Зима'], spring:['🌸','🚴','Весна'], summer:['☀️','🏊','Лето'], autumn:['🍂','🎒','Осень'] };
    var KEYS = ['winter','spring','summer','autumn'];
    var CLUE = { winter:'Лежит снег, холодно.', spring:'Тает снег, цветут первые цветы.', summer:'Жарко, можно купаться.', autumn:'Падают жёлтые листья, идёт дождь.' };
    var HINT = { winter:'Зимой можно кататься на лыжах.', spring:'Весной можно ездить на велосипеде.', summer:'Летом можно плавать.', autumn:'Осенью пора собираться в школу.' };

    (function(){
      if(document.getElementById('mxsn-css')) return;
      var s = document.createElement('style'); s.id = 'mxsn-css';
      s.textContent = ''
      + '.mxsn-big{display:flex;align-items:center;justify-content:center;gap:8px;min-width:150px;height:116px;padding:0 22px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font:800 1.5rem/1 "Baloo 2",sans-serif;color:#25324A;margin:0 auto;animation:mxIn .4s backwards;width:max-content;}.mxsn-big .e{font-size:4.6rem;line-height:1;}'
      + '.mxsn-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;padding:14px 20px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.3rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;animation:mxIn .4s backwards;}.mxsn-card .e{font-size:2.4rem;line-height:1;}'
      + '.mxsn-row{display:flex;align-items:center;justify-content:center;gap:6px;}.mxsn-c{display:flex;align-items:center;justify-content:center;width:68px;height:78px;border-radius:20px;background:rgba(255,255,255,.94);box-shadow:0 5px 0 rgba(0,0,0,.14);font-size:2.4rem;}.mxsn-c.q{background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;font:800 2rem "Baloo 2",sans-serif;}.mxsn-ar{font:800 1.2rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.25);}'
      + '.mxsn-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.05rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxsn-info .e{font-size:2.2rem;line-height:1;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}.mxs-balloon .b .nm{font-size:1.4rem!important;font-weight:800;}'
      + '@media (prefers-reduced-motion:reduce){.mxsn-big,.mxsn-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(k){
      return { hintSay:['f:r_sh_' + k], hint:function(el){ el.innerHTML = '<div class="mxsn-big" style="height:92px"><span class="e" style="font-size:3.4rem">' + SE[k][0] + '</span><span class="e" style="font-size:3.4rem">' + SE[k][1] + '</span></div><div class="mxsn-info">' + HINT[k] + '</div>'; } };
    }
    function emo(arr){ return arr.map(function(k){ return { v:k, h:'<span class="lt">' + SE[k][0] + '</span>' }; }); }
    function others(k, n){ return shuffle(KEYS.filter(function(x){ return x !== k; })).slice(0, n - 1); }
    /* время года → занятие */
    function actTask(k, n){
      var h = hintOf(k), set = shuffle([k].concat(others(k, n)));
      return S('a' + k + n, { expr:'', say:V.tpl('seq', {list:[WK(SE[k][2]), 'f:seasq']}), cap:F().seasq, ans:k, layout:'wide', opts:set.map(function(x){ return { v:x, h:'<span class="lt">' + SE[x][1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsn-big"><span class="e">' + SE[k][0] + '</span>' + SE[k][2] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* занятие → время года (значки) */
    function seasonTask(k){
      var h = hintOf(k);
      return S('b' + k, { expr:'', say:V.tpl('q', {k:'seasq2'}), ans:k, layout:'wide', opts:emo(shuffle(KEYS)),
        field:function(el){ el.innerHTML = '<div class="mxsn-big"><span class="e">' + SE[k][1] + '</span></div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* по приметам → время года (названия) */
    function clueTask(k){
      var h = hintOf(k);
      return S('c' + k, { expr:'', say:V.tpl('seq', {list:['f:r_sc_' + k, 'f:seasclue']}), cap:F().seasclue, ans:k, layout:'wide', opts:shuffle(KEYS).map(function(x){ return { v:x, h:'<span class="nm">' + SE[x][2] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsn-card">' + CLUE[k] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* что идёт после / какое пропущено */
    function nextTask(){
      var i = rnd(0, 3), k = KEYS[i], nx = KEYS[(i + 1) % 4], h = hintOf(nx);
      return S('n' + k, { expr:'', say:V.tpl('seq', {list:['f:seasnext', WK(SE[k][2])]}), cap:F().seasnext, ans:nx, layout:'wide', opts:emo(shuffle(KEYS)),
        field:function(el){ el.innerHTML = '<div class="mxsn-row"><div class="mxsn-c">' + SE[k][0] + '</div><span class="mxsn-ar">→</span><div class="mxsn-c q">?</div></div>'; }, hintSay:['f:seasq2'], hintExpr:'', hint:function(el){ el.innerHTML = '<div class="mxsn-row">' + KEYS.concat([KEYS[0]]).map(function(x, j){ return (j ? '<span class="mxsn-ar">→</span>' : '') + '<div class="mxsn-c" style="width:50px;height:60px;font-size:1.8rem">' + SE[x][0] + '</div>'; }).join('') + '</div><div class="mxsn-info">' + SE.winter[2] + ' → ' + SE.spring[2] + ' → ' + SE.summer[2] + ' → ' + SE.autumn[2] + '</div>'; } });
    }
    function gapTask(){
      var i = rnd(0, 3), k = KEYS[i], row = [0, 1, 2, 3].map(function(j){ return KEYS[(i + 1 + j) % 4]; });
      var gi = rnd(1, 2), ans = row[gi];
      return S('g' + k + gi, { expr:'', say:V.tpl('q', {k:'seasgap'}), ans:ans, layout:'wide', opts:emo(shuffle(KEYS.filter(function(x){ return true; }))),
        field:function(el){ el.innerHTML = '<div class="mxsn-row">' + row.map(function(x, j){ return j === gi ? '<div class="mxsn-c q">?</div>' : '<div class="mxsn-c" style="width:58px">' + SE[x][0] + '</div>'; }).join('') + '</div>'; },
        hintSay:['f:seasq2'], hintExpr:'', hint:function(el){ el.innerHTML = '<div class="mxsn-row">' + row.map(function(x){ return '<div class="mxsn-c" style="width:58px">' + SE[x][0] + '</div>'; }).join('') + '</div><div class="mxsn-info">' + row.map(function(x){ return SE[x][2]; }).join(' → ') + '</div>'; } });
    }

    function L1(){ return actTask(pick(KEYS), 3); }
    function L2(){ var r = Math.random(); return r < .4 ? actTask(pick(KEYS), 4) : r < .8 ? seasonTask(pick(KEYS)) : nextTask(); }
    function L3(){ var r = Math.random(); return r < .35 ? clueTask(pick(KEYS)) : r < .6 ? gapTask() : r < .8 ? seasonTask(pick(KEYS)) : actTask(pick(KEYS), 4); }

    M.run({ root:containerId, key:'seasons', need:10, theme:'garden', levels:[L1,L2,L3] });
  });
}
