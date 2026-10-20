/* ===== Білім Аралы — «Дни недели: Неделя Барсика» (v3) =====
   Познание мира, 1 класс (цель 1.1.2.5 приказа №399): названия времени суток и дней недели. Какой день после и до, спрятавшийся день, выходные, сегодня-завтра-вчера, порядок недели, время суток.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'rainbow',icons:['📅','🌅','🌙']};
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
function initWeekdaysGame(containerId){
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
    var DAYS = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
    var SHORT = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    var TOD = { morning:['🌅','Утро','Мы умываемся и завтракаем.'], day:['☀️','День','Мы обедаем и гуляем.'], evening:['🌆','Вечер','Мы ужинаем и готовимся ко сну.'], night:['🌙','Ночь','Все спят.'] };
    var TK = ['morning','day','evening','night'];

    (function(){
      if(document.getElementById('mxwk-css')) return;
      var s = document.createElement('style'); s.id = 'mxwk-css';
      s.textContent = ''
      + '.mxwk-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;min-width:170px;padding:14px 22px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.5rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;animation:mxIn .4s backwards;}.mxwk-card small{font-size:.95rem;font-weight:700;color:#6B7A99;}.mxwk-card .e{font-size:3rem;line-height:1;}'
      + '.mxwk-row{display:flex;align-items:center;justify-content:center;gap:6px;}.mxwk-c{display:flex;align-items:center;justify-content:center;min-width:92px;height:62px;padding:0 6px;border-radius:18px;background:rgba(255,255,255,.94);box-shadow:0 5px 0 rgba(0,0,0,.14);font:800 1rem/1.1 "Baloo 2",sans-serif;color:#25324A;text-align:center;}.mxwk-c.q{background:#EDE6FF;border:3px dashed #7E6BD6;color:#7E6BD6;font-size:1.8rem;min-width:70px;}'
      + '.mxwk-strip{display:flex;gap:4px;justify-content:center;margin:0 auto;}.mxwk-strip i{font:800 .9rem/1 "Baloo 2",sans-serif;font-style:normal;width:40px;height:34px;border-radius:9px;background:#fff;color:#25324A;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(0,0,0,.14);}.mxwk-strip i.h{background:#FFB400;transform:scale(1.15);}.mxwk-strip i.we{color:#E5503C;}'
      + '.mxwk-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 14px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 .98rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}'
      + '.mxwk-line{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;min-height:84px;margin:4px 0 8px;max-width:330px;}.mxwk-line b{font:800 .88rem/1 "Baloo 2",sans-serif;padding:7px 9px;border-radius:12px;background:#fff;color:#25324A;box-shadow:0 3px 0 rgba(0,0,0,.16);animation:mxIn .2s;}.mxwk-line b.q{background:rgba(255,255,255,.3);border:3px dashed rgba(255,255,255,.9);color:#fff;padding:4px 14px;}'
      + '.mxwk-pool{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;max-width:330px;margin:0 auto;}.mxwk-pool button{font:800 .98rem/1 "Baloo 2",sans-serif;padding:10px 12px;border-radius:14px;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 5px 0 rgba(0,0,0,.22);color:#25324A;cursor:pointer;animation:mxIn .35s backwards;}.mxwk-pool button.used{visibility:hidden;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:1.02rem!important;font-weight:800;padding:0 4px;text-align:center;}.mxs .mxs-balloon.wide{width:150px;}'
      + '@media (prefers-reduced-motion:reduce){.mxwk-card,.mxwk-pool button,.mxwk-line b{animation:none}}';
      document.head.appendChild(s);
    })();

    function strip(hl){ return '<div class="mxwk-strip">' + SHORT.map(function(n, i){ return '<i class="' + (hl.indexOf(i) >= 0 ? 'h ' : '') + (i > 4 ? 'we' : '') + '">' + n + '</i>'; }).join('') + '</div>'; }
    function hintWeek(hl){ return function(el){ el.innerHTML = strip(hl) + '<div class="mxwk-info">' + DAYS.join(' → ') + '</div>'; }; }
    function mod(i){ return (i % 7 + 7) % 7; }
    function dopts(ans, near){
      var set = [ans]; near.forEach(function(d){ if(set.indexOf(d) < 0 && set.length < 4) set.push(d); });
      shuffle([0,1,2,3,4,5,6].filter(function(d){ return set.indexOf(d) < 0; })).forEach(function(d){ if(set.length < 4) set.push(d); });
      return shuffle(set).map(function(d){ return { v:String(d), h:'<span class="nm">' + DAYS[d] + '</span>' }; });
    }
    function card(i, small){ return '<div class="mxwk-card">' + DAYS[i] + (small ? '<small>' + small + '</small>' : '') + '</div>'; }
    /* ⭐: какой день после / перед */
    function neighTask(n, back){
      var i = rnd(0, 6), ans = mod(i + (back ? -1 : 1)), near = [mod(i + (back ? -2 : 2)), mod(i + (back ? 1 : -1)), mod(i + 3)];
      var opts = dopts(ans, near).slice(0, 4); if(n === 3){ opts = shuffle([ { v:String(ans), h:'<span class="nm">' + DAYS[ans] + '</span>' } ].concat(opts.filter(function(o){ return o.v !== String(ans); }).slice(0, 2))); }
      return S((back ? 'b' : 'a') + i + n, { expr:'', say:V.tpl('seq', {list:[back ? 'f:wd_before' : 'f:wd_after', WK(DAYS[i])]}), cap:back ? F().wd_before : F().wd_after, ans:String(ans), layout:'wide', opts:opts,
        field:function(el){ el.innerHTML = card(i); }, hintSay:['f:r_wd_order'], hintExpr:'', hint:hintWeek([i, ans]) });
    }
    /* ⭐⭐: какой день спрятался между двумя */
    function gapTask(){
      var i = rnd(1, 5);
      return S('g' + i, { expr:'', say:V.tpl('q', {k:'wd_gap'}), ans:String(i), layout:'wide', opts:dopts(i, [i - 1, i + 1]),
        field:function(el){ el.innerHTML = '<div class="mxwk-row"><div class="mxwk-c">' + DAYS[i - 1] + '</div><div class="mxwk-c q">?</div><div class="mxwk-c">' + DAYS[i + 1] + '</div></div>'; }, hintSay:['f:r_wd_order'], hintExpr:'', hint:hintWeek([i - 1, i, i + 1]) });
    }
    /* ⭐⭐: какой день — выходной */
    function weekendTask(){
      var ans = pick([5, 6]), others = shuffle([0,1,2,3,4]).slice(0, 3), set = shuffle([ans].concat(others));
      return S('w' + ans, { expr:'', say:V.tpl('q', {k:'wd_weekend'}), ans:String(ans), layout:'wide', opts:set.map(function(d){ return { v:String(d), h:'<span class="nm">' + DAYS[d] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxwk-card"><span class="e">🏡</span></div>'; }, hintSay:['f:r_wk_end'], hintExpr:'', hint:function(el){ el.innerHTML = strip([5, 6]) + '<div class="mxwk-info">Суббота и воскресенье — выходные.</div>'; } });
    }
    /* ⭐⭐⭐: сегодня … а завтра / вчера / послезавтра? */
    function relTask(){
      var i = rnd(0, 6), kind = pick(['tom','yes','aft']), d = kind === 'tom' ? 1 : kind === 'yes' ? -1 : 2, ans = mod(i + d), key = kind === 'tom' ? 'wd_tomorrow' : kind === 'yes' ? 'wd_yesterday' : 'wd_aftertom';
      return S('r' + kind + i, { expr:'', say:V.tpl('seq', {list:['f:wd_today', WK(DAYS[i]), 'f:' + key]}), cap:F()[key], ans:String(ans), layout:'wide', opts:dopts(ans, [mod(i), mod(i + 1), mod(i - 1), mod(i + 2)]),
        field:function(el){ el.innerHTML = '<div class="mxwk-card"><small>' + F().wd_today + '</small>' + DAYS[i] + '</div>'; }, hintSay:['f:r_wd_order'], hintExpr:'', hint:hintWeek([i, ans]) });
    }
    /* расставь все семь дней по порядку */
    function orderTask(){
      return S('o', { expr:'', say:V.tpl('q', {k:'wd_order'}), ans:'ok', gate:false,
        field:function(el, X, task){
          var tl = shuffle(DAYS.slice()); if(tl.join() === DAYS.join()) tl.reverse();
          el.innerHTML = '<div class="mxwk-line"></div><div class="mxwk-pool">' + tl.map(function(d, i){ return '<button type="button" style="animation-delay:' + (i*.05) + 's">' + d + '</button>'; }).join('') + '</div>';
          var line = el.querySelector('.mxwk-line'), btns = [].slice.call(el.querySelectorAll('.mxwk-pool button')), n = 0;
          function paint(){ line.innerHTML = DAYS.slice(0, n).map(function(d, i){ return '<b>' + (i + 1) + '. ' + d + '</b>'; }).join('') + (n < 7 ? '<b class="q">?</b>' : ''); }
          paint();
          btns.forEach(function(b){ b.addEventListener('click', function(){ if(task._done || b.classList.contains('used')) return;
            if(b.textContent !== DAYS[n]){ task._done = true; X.sfx.no(); task.submit('no', b); return; }
            b.classList.add('used'); n++; X.sfx.tap(n); paint();
            if(n === 7){ task._done = true; X.sleep(350).then(function(ok){ if(ok) task.submit('ok', line); }); } }); });
          task.auto = function(wrong){ if(wrong){ var w = btns.filter(function(b){ return b.textContent !== DAYS[0]; })[0]; w.click(); return; } DAYS.forEach(function(d){ var b = btns.filter(function(x){ return !x.classList.contains('used') && x.textContent === d; })[0]; if(b) b.click(); }); };
        }, hintSay:['f:r_wd_order'], hintExpr:'', hint:hintWeek([0,1,2,3,4,5,6]) });
    }
    /* время суток: когда это бывает */
    function todTask(k){
      return S('t' + k, { expr:'', say:V.tpl('seq', {list:['f:r_todt_' + k, 'f:todq']}), cap:F().todq, ans:k, layout:'wide', opts:shuffle(TK).map(function(x){ return { v:x, h:'<span class="nm" style="font-size:1.35rem!important">' + TOD[x][1] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxwk-card" style="font-size:1.2rem"><span class="e">' + TOD[k][0] + '</span>' + TOD[k][2] + '</div>'; },
        hintSay:[WK(TOD[k][1]), 'f:r_todt_' + k], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxwk-card"><span class="e">' + TOD[k][0] + '</span>' + TOD[k][1] + '</div><div class="mxwk-info">' + TOD[k][2] + '</div>'; } });
    }

    function L1(){ return neighTask(3, Math.random() < .4); }
    function L2(){ var r = Math.random(); return r < .3 ? gapTask() : r < .55 ? neighTask(4, Math.random() < .5) : r < .8 ? weekendTask() : todTask(pick(TK)); }
    function L3(){ var r = Math.random(); return r < .3 ? orderTask() : r < .65 ? relTask() : r < .8 ? gapTask() : todTask(pick(TK)); }

    M.run({ root:containerId, key:'weekdays', need:10, theme:'rainbow', levels:[L1,L2,L3] });
  });
}
