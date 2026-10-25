/* ===== Білім Аралы — «Дорожные знаки: Безопасная дорога» (v3) =====
   Познание мира, 1 класс (цель 1.1.4.4 приказа №399): правила поведения на дороге, значение знаков для пешеходов. 8 знаков из прежней игры, светофор, можно/нельзя.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'meadow',icons:['🚦','🚸','🛑']};
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
function initRoadSignsGame(containerId){
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
    /* 8 знаков из прежней игры: [значок, название, что означает] */
    var SG = { light:['🚦','Светофор','Светофор показывает, когда можно идти, а когда нужно стоять.'], cross:['🚸','Пешеходный переход','Здесь люди переходят дорогу. Будь внимателен.'], stop:['🛑','Знак «Стоп»','Нужно остановиться и посмотреть по сторонам.'], warn:['⚠️','Предупреждающий знак','Будь осторожен: впереди может быть опасность.'], works:['🚧','Дорожные работы','Здесь ремонтируют дорогу. Обойди это место.'], noent:['🚫','Движение запрещено','Здесь двигаться нельзя.'], bus:['🚏','Остановка автобуса','Здесь останавливается автобус. Здесь ждут автобус.'], park:['🅿️','Парковка','Здесь машины стоят на парковке.'] };
    var KEYS = ['light','cross','stop','warn','works','noent','bus','park'];
    var TL = { red:['#E5503C','Стой'], yellow:['#FFC21E','Жди'], green:['#3FBF55','Иди'] };
    var RULES = [['Идти по пешеходному переходу','can'],['Ждать зелёный свет','can'],['Держаться за руку мамы','can'],['Бежать через дорогу','no'],['Играть на проезжей части','no'],['Идти на красный свет','no']];

    (function(){
      if(document.getElementById('mxrs-css')) return;
      var s = document.createElement('style'); s.id = 'mxrs-css';
      s.textContent = ''
      + '.mxrs-sign{display:flex;align-items:center;justify-content:center;width:130px;height:116px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.8rem;line-height:1;margin:0 auto;animation:mxIn .4s backwards;}'
      + '.mxrs-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;padding:14px 20px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.22rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;animation:mxIn .4s backwards;}.mxrs-card .e{font-size:2.2rem;line-height:1;}'
      + '.mxrs-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxrs-tl{width:78px;padding:10px 0;border-radius:22px;background:#2B3347;box-shadow:0 6px 0 rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:center;gap:8px;margin:0 auto;animation:mxIn .4s backwards;}.mxrs-tl i{width:46px;height:46px;border-radius:50%;background:#46506A;display:block;}'
      + '.mxrs-tl i.on.red{background:#FF4B3A;box-shadow:0 0 22px 4px rgba(255,75,58,.8);}.mxrs-tl i.on.yellow{background:#FFC21E;box-shadow:0 0 22px 4px rgba(255,194,30,.8);}.mxrs-tl i.on.green{background:#3FE065;box-shadow:0 0 22px 4px rgba(63,224,101,.8);}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:.84rem!important;font-weight:800;padding:0 2px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:148px;}'
      + '@media (prefers-reduced-motion:reduce){.mxrs-sign,.mxrs-card,.mxrs-tl{animation:none}}';
      document.head.appendChild(s);
    })();

    function lamp(c){ return '<div class="mxrs-tl">' + ['red','yellow','green'].map(function(x){ return '<i class="' + x + (x === c ? ' on' : '') + '"></i>'; }).join('') + '</div>'; }
    function hintOf(k){
      return { hintSay:['f:r_sg_' + k, 'f:r_sgm_' + k], hint:function(el){ el.innerHTML = '<div class="mxrs-sign" style="height:92px;font-size:3.8rem">' + SG[k][0] + '</div><div class="mxrs-info">' + SG[k][2] + '</div>'; } };
    }
    function names(k, n){ return shuffle([k].concat(shuffle(KEYS.filter(function(x){ return x !== k; })).slice(0, n - 1))); }
    /* значок → название */
    function nameTask(k, n){
      var h = hintOf(k);
      return S('n' + k + n, { expr:'', say:V.tpl('q', {k:'rsq'}), ans:k, layout:'wide', opts:names(k, n).map(function(x){ return { v:x, h:'<span class="nm">' + SG[x][1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxrs-sign">' + SG[k][0] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* название → значок */
    function signTask(k){
      var h = hintOf(k);
      return S('s' + k, { expr:'', say:V.tpl('seq', {list:['f:rsfind', 'f:r_sg_' + k]}), cap:F().rsfind, ans:k, layout:'wide', opts:names(k, 4).map(function(x){ return { v:x, h:'<span class="lt">' + SG[x][0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxrs-card" style="font-size:1.45rem">' + SG[k][1] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* что означает → значок */
    function meanTask(k){
      var h = hintOf(k);
      return S('m' + k, { expr:'', say:V.tpl('seq', {list:['f:r_sgm_' + k, 'f:rsmean']}), cap:F().rsmean, ans:k, layout:'wide', opts:names(k, 4).map(function(x){ return { v:x, h:'<span class="lt">' + SG[x][0] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxrs-card"><span class="e">🔎</span>' + SG[k][2] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* светофор → что делает пешеход */
    function lightTask(c){
      return S('l' + c, { expr:'', say:V.tpl('q', {k:'tlq'}), ans:c, layout:'wide', opts:['red','yellow','green'].map(function(x){ return { v:x, h:'<span class="nm" style="font-size:1.5rem!important">' + TL[x][1] + '</span>' }; }),
        field:function(el){ el.innerHTML = lamp(c); }, hintSay:['f:r_tlm_' + c], hintExpr:'', hint:function(el){ el.innerHTML = lamp(c) + '<div class="mxrs-info">' + TL[c][1] + '!</div>'; } });
    }
    /* можно или нельзя */
    function sortRules(){
      var items = shuffle(RULES.map(function(r, i){ return { h:r[0], k:r[1], id:String(i) }; }));
      return S('r' + items.map(function(i){ return i.id; }).join(''), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'rssort'}), hintSay:['f:r_rs_can', 'f:r_rs_no'],
        buckets:[{ k:'can', name:F().rs_can, icon:'✅', c1:'#7AD36B', c2:'#3FA84A' }, { k:'no', name:F().rs_no, icon:'❌', c1:'#FF8A7A', c2:'#E5503C' }] }));
    }

    function L1(){ return nameTask(pick(KEYS), 3); }
    function L2(){ var r = Math.random(); return r < .35 ? signTask(pick(KEYS)) : r < .65 ? nameTask(pick(KEYS), 4) : lightTask(pick(['red','yellow','green'])); }
    function L3(){ var r = Math.random(); return r < .35 ? meanTask(pick(KEYS)) : r < .6 ? sortRules() : r < .8 ? lightTask(pick(['red','yellow','green'])) : signTask(pick(KEYS)); }

    M.run({ root:containerId, key:'roadsigns', need:10, theme:'meadow', levels:[L1,L2,L3] });
  });
}
