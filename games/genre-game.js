/* ===== Білім Аралы — «Какой это жанр: Книжный лес» (v3) =====
   Обучение грамоте, 1 класс (цель 1.2.6.1 приказа №399): жанры — загадка, скороговорка, пословица, сказка, стихотворение, рассказ. Уровни: прочти текст → описание жанра → разложи тексты по жанрам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'autumn',icons:['🧩','🏰','📖']};
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
function initGenreGame(containerId){
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
    var GN = { riddle:'Загадка', tongue:'Скороговорка', proverb:'Пословица', tale:'Сказка', poem:'Стихотворение', story:'Рассказ' };
    var GD = { riddle:'Короткий текст, в котором нужно отгадать, о каком предмете или существе идёт речь.', tongue:'Слова, которые специально трудно произнести быстро подряд.', proverb:'Короткая мудрая фраза с советом или наблюдением о жизни.', tale:'История с волшебством, где часто добро побеждает зло.', poem:'Текст, в котором строчки рифмуются между собой.', story:'История о реальных или похожих на реальные событиях, без волшебства.' };
    var IC = { riddle:'🧩', tongue:'👅', proverb:'💡', tale:'🏰', poem:'🎶', story:'📖' };
    var KEYS = ['riddle','tongue','proverb','tale','poem','story'];
    /* тексты: народные загадки, скороговорки, пословицы, зачины сказок; стихи и рассказы — собственные */
    var T = {
      riddle:['Не лает, не кусает, а в дом не пускает.','Висит груша — нельзя скушать.','Тикают, ходят, а с места не сходят.'],
      tongue:['Шла Саша по шоссе и сосала сушку.','На дворе трава, на траве дрова.','Карл у Клары украл кораллы.'],
      proverb:['Дружба дороже денег.','Без труда не вытащишь и рыбку из пруда.','Семь раз отмерь, один раз отрежь.'],
      tale:['Жили-были дед да баба, и была у них курочка Ряба.','В некотором царстве, в некотором государстве жил-был царь.','Жила-была девочка, и дружил с ней волшебный кот.'],
      poem:['Вот зайчик скачет по лугу, морковку ищет на бегу.','Светит солнышко с утра, во дворе шумит детвора.','Котик мой, пушистый зверь, мягкой лапкой стукнул в дверь.'],
      story:['Вчера мы с папой ходили в парк. Мы кормили уток хлебом.','Утром Аня пошла в школу. По дороге она встретила подругу.','Мальчик Тимур помог бабушке донести сумку.']
    };
    /* короткие тексты для раскладывания (≤ 35 знаков) */
    var SHORT = { riddle:[1,2], tongue:[1,2], proverb:[0,2] };

    (function(){
      if(document.getElementById('mxgn-css')) return;
      var s = document.createElement('style'); s.id = 'mxgn-css';
      s.textContent = ''
      + '.mxgn-card{display:flex;flex-direction:column;align-items:center;gap:6px;max-width:318px;min-height:96px;justify-content:center;padding:14px 18px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.3rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;animation:mxIn .4s backwards;margin:0 auto;}'
      + '.mxgn-card.d{font-size:1.12rem;font-weight:700;}.mxgn-card .e{font-size:2rem;line-height:1;}'
      + '.mxgn-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.05rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxgn-info .e{font-size:2.2rem;line-height:1;}'
      + 'body .mxs-balloon .b .nm{font-size:1.02rem!important;font-weight:800;padding:0 4px;text-align:center;}.mxs .mxs-balloon.wide{width:152px;}'
      + '@media (prefers-reduced-motion:reduce){.mxgn-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function opts(ans, n){
      var set = [ans].concat(shuffle(KEYS.filter(function(k){ return k !== ans; })).slice(0, n - 1));
      return shuffle(set).map(function(k){ return { v:k, h:'<span class="nm">' + GN[k] + '</span>' }; });
    }
    function hintOf(g){
      return { hintSay:['f:r_g_' + g, 'f:r_gd_' + g], hint:function(el){ el.innerHTML = '<div class="mxgn-card" style="min-height:0"><span class="e">' + IC[g] + '</span>' + GN[g] + '</div><div class="mxgn-info">' + GD[g] + '</div>'; } };
    }
    /* текст → жанр */
    function textTask(n){
      var g = pick(KEYS), i = rnd(0, 2), h = hintOf(g);
      return S('t' + g + i + n, { expr:'', say:V.tpl('seq', {list:['f:r_t_' + g + '_' + (i + 1), 'f:genreq']}), cap:F().genreq, ans:g, layout:'wide', opts:opts(g, n),
        field:function(el){ el.innerHTML = '<div class="mxgn-card">' + T[g][i] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* описание → жанр */
    function descTask(n){
      var g = pick(KEYS), h = hintOf(g);
      return S('d' + g + n, { expr:'', say:V.tpl('seq', {list:['f:r_gd_' + g, 'f:genredq']}), cap:F().genredq, ans:g, layout:'wide', opts:opts(g, n),
        field:function(el){ el.innerHTML = '<div class="mxgn-card d"><span class="e">🔎</span>' + GD[g] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* разложи 6 коротких текстов по трём жанрам */
    function sortGenres(){
      var items = [];
      Object.keys(SHORT).forEach(function(g){ SHORT[g].forEach(function(i){ items.push({ h:T[g][i], k:g, id:g + i }); }); });
      var cols = { riddle:['#FFB454','#E8832F'], tongue:['#5EC7FF','#2F9BE6'], proverb:['#7AD36B','#3FA84A'] };
      return S('s' + shuffle(items).map(function(x){ return x.id; }).join(''), M.sortTask({ wide:true, items:shuffle(items), say:V.tpl('q', {k:'genresort'}), hintSay:['f:r_gd_riddle', 'f:r_gd_tongue', 'f:r_gd_proverb'],
        buckets:Object.keys(SHORT).map(function(g){ return { k:g, name:GN[g], icon:IC[g], c1:cols[g][0], c2:cols[g][1] }; }) }));
    }

    function L1(){ return textTask(3); }
    function L2(){ return Math.random() < .6 ? textTask(4) : descTask(3); }
    function L3(){ var r = Math.random(); return r < .4 ? descTask(4) : r < .7 ? sortGenres() : textTask(4); }

    M.run({ root:containerId, key:'genre', need:10, theme:'autumn', levels:[L1,L2,L3] });
  });
}
