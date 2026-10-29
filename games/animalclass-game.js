/* ===== Білім Аралы — «Классы животных: Зоопарк Барсика» (v3) =====
   Естествознание, 2 класс (цель 2.2.2.1 приказа №399): насекомые, рыбы, земноводные, пресмыкающиеся, птицы, млекопитающие.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'forest', icons:['🦁','🐟','🦋']};
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

function initAnimalClassGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var CLS = {
      insect:{ n:'насекомое', pl:'насекомые', ic:'🦋', f:'6 ног и тело из трёх частей', c1:'#FFB347', c2:'#E8851C' },
      fish:{ n:'рыба', pl:'рыбы', ic:'🐟', f:'дышит жабрами, тело в чешуе, плавники', c1:'#4FB8F0', c2:'#2584C4' },
      amphibian:{ n:'земноводное', pl:'земноводные', ic:'🐸', f:'голая влажная кожа, живёт и в воде, и на суше', c1:'#5FCB8E', c2:'#2E9E62' },
      reptile:{ n:'пресмыкающееся', pl:'пресмыкающиеся', ic:'🐍', f:'сухая кожа с чешуёй, яйца откладывает на суше', c1:'#B98A5A', c2:'#8B5F34' },
      bird:{ n:'птица', pl:'птицы', ic:'🐦', f:'тело в перьях, крылья и клюв, откладывает яйца', c1:'#F27AA8', c2:'#CE4E81' },
      mammal:{ n:'млекопитающее', pl:'млекопитающие', ic:'🐻', f:'тело в шерсти, детёнышей выкармливает молоком', c1:'#8C7BE8', c2:'#5D4CC0' }
    };
    var A = [['🦋','бабочка','insect'],['🐝','пчела','insect'],['🐜','муравей','insect'],['🐞','божья коровка','insect'],['🦗','кузнечик','insect'],
      ['🐟','рыба','fish'],['🐠','рыбка','fish'],['🦈','акула','fish'],['🐡','рыба-шар','fish'],
      ['🐸','лягушка','amphibian'],
      ['🐍','змея','reptile'],['🐢','черепаха','reptile'],['🦎','ящерица','reptile'],['🐊','крокодил','reptile'],
      ['🦅','орёл','bird'],['🦉','сова','bird'],['🦆','утка','bird'],['🐓','петух','bird'],['🦜','попугай','bird'],['🐧','пингвин','bird'],['🦢','лебедь','bird'],
      ['🐘','слон','mammal'],['🦁','лев','mammal'],['🐻','медведь','mammal'],['🐺','волк','mammal'],['🐰','заяц','mammal'],['🐴','лошадь','mammal'],['🐄','корова','mammal'],['🐒','обезьяна','mammal'],['🦊','лиса','mammal']];
    var TRAP = [['🐬','дельфин','mammal','Дельфин плавает, как рыба, но дышит лёгкими и выкармливает детёнышей молоком'],['🐋','кит','mammal','Кит — не рыба: он дышит воздухом и кормит детёныша молоком'],['🦇','летучая мышь','mammal','Летучая мышь летает, но покрыта шерстью и кормит малышей молоком'],['🐧','пингвин','bird','Пингвин не летает, но у него перья и крылья, и он откладывает яйца'],['🐢','черепаха','reptile','У черепахи сухая кожа, панцирь, и яйца она откладывает на суше']];
    function byClass(c){ return A.filter(function(a){ return a[2] === c; }); }
    function name(c){ return CLS[c].n; }
    function hintC(a, extra){
      var c = a[2];
      return { hintExpr:'<span class="ok">' + name(c) + '</span>', hintSay:[G.say(a[1] + ' — ' + name(c) + '. ' + CLS[c].f + '.')], hint:G.hintCard('<span style="font-size:3.4rem;line-height:1">' + a[0] + '</span>', '<b>' + a[1] + '</b> — ' + name(c) + '<br>' + (extra || CLS[c].f)) };
    }
    function otherClasses(c, n){ return shuffle(Object.keys(CLS).filter(function(k){ return k !== c; })).slice(0, n); }

    /* ⭐ найди … / к какому классу относится */
    function L1(){
      var a = pick(A);
      if(Math.random() < .5){
        var c = a[2], pool = shuffle(A.filter(function(x){ return x[2] !== c; })), items = [a], seen = {};
        pool.forEach(function(x){ if(items.length < 4 && !seen[x[2]]){ seen[x[2]] = 1; items.push(x); } });
        return S('1f' + a[1], Object.assign(G.pickPic({ q:'Найди: ' + CLS[c].pl, say:[G.say('Найди среди животных: ' + CLS[c].pl + '.')], items:items.map(function(x){ return { k:x[1], h:'<span class="e">' + x[0] + '</span>', lab:x[1] }; }), ans:a[1] }), hintC(a)));
      }
      var opts = [name(a[2])].concat(otherClasses(a[2], 2).map(name));
      return S('1c' + a[1], Object.assign({ expr:'<span style="font-size:3.2rem;line-height:1">' + a[0] + '</span>', cap:a[1] + ' — это…', say:[G.say(a[1] + '. К какому классу относится это животное?')], ans:name(a[2]), opts:G.txtOpts(opts), layout:'card' }, hintC(a)));
    }
    /* ⭐⭐ разложи по классам */
    function L2(){
      var cs = shuffle(Object.keys(CLS)).slice(0, 3), items = [];
      cs.forEach(function(c){ shuffle(byClass(c)).slice(0, 2).forEach(function(a){ items.push({ k:c, h:a[0] }); }); });
      return S('2s' + cs.join(''), M.sortTask({ items:shuffle(items), say:[G.say('Разложи животных по классам: ' + cs.map(function(c){ return CLS[c].pl; }).join(', ') + '.')], cap:'Выбери животное, потом его класс',
        buckets:cs.map(function(c){ return { k:c, name:CLS[c].pl, icon:CLS[c].ic, c1:CLS[c].c1, c2:CLS[c].c2 }; }), hintSay:[G.say('Посмотри на признаки: перья — птицы, чешуя и плавники — рыбы, шерсть и молоко — млекопитающие.')] }));
    }
    /* ⭐⭐⭐ признаки класса, «хитрые» животные */
    function L3(){
      if(Math.random() < .5){
        var t = pick(TRAP), a = [t[0], t[1], t[2]];
        return S('3t' + t[1], Object.assign({ expr:'<span style="font-size:3.2rem;line-height:1">' + t[0] + '</span>', cap:t[1] + ' — к какому классу относится?', say:[G.say(t[1] + '. Осторожно, это хитрое животное! К какому классу оно относится?')], ans:name(t[2]), opts:G.txtOpts([name(t[2])].concat(otherClasses(t[2], 2).map(name))), layout:'card' }, hintC(a, t[3])));
      }
      var c = pick(Object.keys(CLS)), ex = pick(byClass(c));
      return S('3f' + c + ex[1], Object.assign({ expr:'', cap:'Это животное: ' + CLS[c].f + '. Какой это класс?', say:[G.say('Это животное: ' + CLS[c].f + '. К какому классу оно относится?')], ans:name(c), opts:G.txtOpts([name(c)].concat(otherClasses(c, 2).map(name))), layout:'card' }, hintC(ex)));
    }

    M.run({ root:containerId, key:'animalclass', need:10, theme:'forest', levels:[L1, L2, L3] });
  });
}
