/* ===== Білім Аралы — «Отгадай загадку: Ночные загадки» (v3) =====
   Обучение грамоте, 1 класс (приказ №399): народные загадки. 8 загадок. Уровни: выбери отгадку среди 3 → среди 4 → собери слово-отгадку из букв.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'night',icons:['🧩','🌈','⏰']};
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
function initRiddleGame(containerId){
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
    /* народные загадки: [текст, картинка-отгадка, слово-отгадка] */
    var RD = [['Зимой и летом одним цветом.','🌲','ЁЛКА'],['Красная девица сидит в темнице, а коса на улице.','🥕','МОРКОВЬ'],['Сидит дед, во сто шуб одет. Кто его раздевает, тот слёзы проливает.','🧅','ЛУК'],['Само с кулачок, красный бочок, потрогаешь — гладко, а откусишь — сладко.','🍎','ЯБЛОКО'],['Не лает, не кусает, а в дом не пускает.','🔒','ЗАМОК'],['Висит груша — нельзя скушать.','💡','ЛАМПА'],['Тикают, ходят, а с места не сходят.','⏰','ЧАСЫ'],['Разноцветное коромысло над рекой повисло.','🌈','РАДУГА']];
    var ABC = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЯ'.split('');

    (function(){
      if(document.getElementById('mxrd-css')) return;
      var s = document.createElement('style'); s.id = 'mxrd-css';
      s.textContent = ''
      + '.mxrd-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:324px;padding:14px 18px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.22rem/1.32 "Baloo 2",sans-serif;color:#25324A;text-align:center;animation:mxIn .4s backwards;margin:0 auto;}.mxrd-card .e{font-size:1.8rem;line-height:1;}'
      + '.mxrd-pic{display:flex;align-items:center;justify-content:center;width:110px;height:96px;border-radius:24px;background:rgba(255,255,255,.92);box-shadow:0 6px 0 rgba(0,0,0,.14);font-size:3.8rem;line-height:1;margin:0 auto;}'
      + '.mxrd-word{font:800 2rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 22px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);letter-spacing:.1em;margin-top:8px;}'
      + '.mxrd-slots{display:flex;gap:6px;justify-content:center;margin:14px 0 12px;}'
      + '.mxrd-slot{height:62px;border-radius:14px;border:4px dashed rgba(255,255,255,.9);background:rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font:800 2rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;}'
      + '.mxrd-slot.f{border:4px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);animation:mxIn .2s;}'
      + '.mxrd-tiles{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:330px;margin:0 auto;}'
      + '.mxrd-tile{height:60px;border-radius:14px;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 6px 0 rgba(0,0,0,.22);font:800 1.9rem/1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;padding:0;animation:mxIn .35s backwards;}'
      + '.mxrd-tile.used{visibility:hidden;}'
      + '.mxs-balloon .b .lt{font:800 2.8rem "Baloo 2",sans-serif;}'
      + '@media (prefers-reduced-motion:reduce){.mxrd-card,.mxrd-slot,.mxrd-tile{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(r){
      return { hintSay:['f:riddlesay', WK(r[2])], hint:function(el){ el.innerHTML = '<div class="mxrd-pic">' + r[1] + '</div><div style="text-align:center"><span class="mxrd-word">' + r[2] + '</span></div>'; } };
    }
    function cardOf(i){ return '<div class="mxrd-card"><span class="e">🧩</span>' + RD[i][0] + '</div>'; }
    /* загадка → выбери картинку-отгадку */
    function pickTask(i, n){
      var r = RD[i], h = hintOf(r), others = shuffle(RD.filter(function(x, j){ return j !== i; })).slice(0, n - 1), set = shuffle([r].concat(others));
      return S('p' + i + n, { expr:'', say:V.tpl('seq', {list:['f:r_rd_' + (i + 1), 'f:riddleq']}), cap:F().riddleq, ans:r[1], layout:'wide', opts:set.map(function(x){ return { v:x[1], h:'<span class="lt">' + x[1] + '</span>' }; }),
        field:function(el){ el.innerHTML = cardOf(i); }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* загадка → собери слово-отгадку из букв (с двумя лишними) */
    function buildTask(i){
      var r = RD[i], h = hintOf(r), word = r[2], n = word.length;
      var sz = n <= 4 ? 58 : n === 5 ? 52 : 46, fs = n <= 4 ? '2rem' : '1.7rem';
      return S('b' + i, { expr:'', say:V.tpl('seq', {list:['f:r_rd_' + (i + 1), 'f:riddlebuild']}), cap:F().riddlebuild, ans:'ok', gate:false,
        field:function(el, X, task){
          var letters = word.split(''), ex = shuffle(ABC.filter(function(c){ return word.indexOf(c) < 0; })).slice(0, 2), tl = shuffle(letters.concat(ex));
          if(tl.join('') === word) tl.reverse();
          el.innerHTML = cardOf(i) + '<div class="mxrd-slots">' + letters.map(function(){ return '<button type="button" class="mxrd-slot" style="width:' + sz + 'px;font-size:' + fs + '"></button>'; }).join('') + '</div><div class="mxrd-tiles">' + tl.map(function(c, k){ return '<button type="button" class="mxrd-tile" style="width:' + sz + 'px;font-size:' + fs + ';animation-delay:' + (k*.05) + 's">' + c + '</button>'; }).join('') + '</div>';
          var slots = [].slice.call(el.querySelectorAll('.mxrd-slot')), tiles = [].slice.call(el.querySelectorAll('.mxrd-tile')), put = [];
          function paint(){ slots.forEach(function(sl, k){ var t = put[k]; sl.textContent = t ? t.textContent : ''; sl.classList.toggle('f', !!t); }); }
          function finish(){ task._done = true; var got = put.map(function(t){ return t.textContent; }).join(''); X.sleep(300).then(function(ok){ if(ok) task.submit(got === word ? 'ok' : 'no', slots[0]); }); }
          tiles.forEach(function(t){ t.addEventListener('click', function(){ if(task._done || t.classList.contains('used') || put.length >= n) return; t.classList.add('used'); put.push(t); X.sfx.tap(put.length); paint(); if(put.length === n) finish(); }); });
          slots.forEach(function(sl, k){ sl.addEventListener('click', function(){ if(task._done || k >= put.length) return; var t = put.splice(k, 1)[0]; t.classList.remove('used'); X.sfx.tap(1); paint(); }); });
          task.auto = function(wrong){
            var order = letters.slice(); if(wrong){ var a = order[0]; order[0] = order[1]; order[1] = a; if(order.join('') === word){ order = order.reverse(); } }
            order.forEach(function(c){ var t = tiles.filter(function(x){ return !x.classList.contains('used') && x.textContent === c; })[0]; if(t) t.click(); });
          };
        }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    var BUILDABLE = [0, 2, 3, 4, 5, 6, 7];   /* слова до 6 букв (МОРКОВЬ — только выбор картинки) */

    function L1(){ return pickTask(rnd(0, RD.length - 1), 3); }
    function L2(){ return pickTask(rnd(0, RD.length - 1), 4); }
    function L3(){ return Math.random() < .55 ? buildTask(pick(BUILDABLE)) : pickTask(rnd(0, RD.length - 1), 4); }

    M.run({ root:containerId, key:'riddle', need:10, theme:'night', levels:[L1,L2,L3] });
  });
}
