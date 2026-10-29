/* ===== Білім Аралы — «Виды углов: Уголки Барсика» (v3) =====
   Математика, 2 класс (цель 2.3.1.1 приказа №399): острый, прямой и тупой углы.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'rainbow', icons:['📐','🔺','🔷']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-g2.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initAngleTypeGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var NAME = { acute:'острый', right:'прямой', obtuse:'тупой' };
    var RULE = { acute:'Острый угол <b>меньше</b> прямого', right:'Прямой угол — как угол листа тетради (квадратик в углу)', obtuse:'Тупой угол <b>больше</b> прямого, но меньше развёрнутого' };
    function deg(t){ return t === 'acute' ? rnd(25, 75) : t === 'right' ? 90 : rnd(105, 160); }
    function hintA(t, d){ return { hintExpr:'<span class="ok">' + NAME[t] + '</span>', hintSay:[G.say(t === 'acute' ? 'Этот угол меньше прямого. Он острый.' : t === 'right' ? 'Этот угол прямой, как угол тетради.' : 'Этот угол больше прямого. Он тупой.')], hint:G.hintCard(G.angle(d, { size:150 }), RULE[t]) }; }
    var OBJ = [['📖', 'угол страницы тетради', 'right'], ['🖼️', 'угол картины', 'right'], ['🧱', 'угол кирпича', 'right'], ['🪟', 'угол окна', 'right'], ['✏️', 'кончик карандаша', 'acute'], ['🍕', 'кусочек пиццы (острый конец)', 'acute'], ['✂️', 'чуть раскрытые ножницы', 'acute'], ['🔺', 'вершина треугольника-«ёлочки»', 'acute'], ['📖', 'широко раскрытая книга', 'obtuse'], ['🏠', 'угол в «ломаной» крыше-шалаше', 'obtuse'], ['🪑', 'откинутая спинка кресла', 'obtuse'], ['🚪', 'дверь, открытая широко', 'obtuse']];

    /* ⭐ какой это угол? / найди прямой */
    function L1(){
      var t = pick(['acute', 'right', 'obtuse']), d = deg(t);
      if(Math.random() < .5){
        return S('1i' + t + d, Object.assign({ expr:'', cap:'Какой это угол?', say:[G.say('Какой это угол: острый, прямой или тупой?')], ans:NAME[t], opts:G.txtOpts(['острый', 'прямой', 'тупой']), layout:'wide', field:function(el){ el.innerHTML = G.angle(d); } }, hintA(t, d)));
      }
      var tg = pick(['acute', 'right', 'obtuse']), ds = { acute:deg('acute'), right:90, obtuse:deg('obtuse') };
      return S('1f' + tg + ds.acute, Object.assign(G.pickPic({ q:'Найди ' + NAME[tg] + ' угол', say:[G.say('Найди ' + NAME[tg] + ' угол. Нажми на него.')], items:['acute', 'right', 'obtuse'].map(function(k){ return { k:k, h:G.angle(ds[k], { size:92 }) }; }), ans:tg }), hintA(tg, ds[tg])));
    }
    /* ⭐⭐ разложи уголки по корзинам */
    function L2(){
      var items = [], ks = ['acute', 'acute', 'right', 'right', 'obtuse', 'obtuse'];
      shuffle(ks).forEach(function(k){ items.push({ k:k, h:G.angle(deg(k), { size:46 }) }); });
      return S('2s' + rnd(1, 99999), M.sortTask({ items:items, say:[G.say('Разложи углы по корзинам: острые, прямые и тупые.')], cap:'Выбери угол, потом корзину',
        buckets:[{ k:'acute', name:'острые', icon:'🔺', c1:'#FF8A65', c2:'#E5533D' }, { k:'right', name:'прямые', icon:'📐', c1:'#4DB6AC', c2:'#26897F' }, { k:'obtuse', name:'тупые', icon:'🔷', c1:'#7E8BEF', c2:'#5560CC' }],
        hintSay:[G.say('Острый меньше прямого, прямой — как угол тетради, тупой — больше прямого.')] }));
    }
    /* ⭐⭐⭐ предметы вокруг, больше / меньше прямого */
    function L3(){
      var k = pick(['obj', 'obj', 'cmp', 'cmp']);
      if(k === 'obj'){
        var o = pick(OBJ);
        return S('3o' + o[1], { expr:'<span style="font-size:2.6rem">' + o[0] + '</span>', cap:o[1] + ' — какой угол?', say:[G.say(o[1] + '. Какой это угол: острый, прямой или тупой?')], ans:NAME[o[2]], opts:G.txtOpts(['острый', 'прямой', 'тупой']), layout:'wide',
          hintExpr:'<span class="ok">' + NAME[o[2]] + '</span>', hintSay:[G.say(RULE[o[2]].replace(/<[^>]+>/g, ''))], hint:G.hintCard('<span style="font-size:3rem">' + o[0] + '</span>', RULE[o[2]]) });
      }
      var more = Math.random() < .5, tg = more ? 'obtuse' : 'acute', ds = { acute:deg('acute'), right:90, obtuse:deg('obtuse') };
      return S('3c' + tg + ds.acute, Object.assign(G.pickPic({ q:more ? 'Какой угол БОЛЬШЕ прямого?' : 'Какой угол МЕНЬШЕ прямого?', say:[G.say(more ? 'Какой угол больше прямого?' : 'Какой угол меньше прямого?')], items:['acute', 'right', 'obtuse'].map(function(x){ return { k:x, h:G.angle(ds[x], { size:92 }) }; }), ans:tg }), hintA(tg, ds[tg])));
    }

    M.run({ root:containerId, key:'angletype', need:10, theme:'rainbow', levels:[L1, L2, L3] });
  });
}
