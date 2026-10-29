/* ===== Білім Аралы — «Тело и здоровье: Зарядка с Барсиком» (v3) =====
   Естествознание, 2 класс (цель 2.2.3.1–2.2.3.5 приказа №399): скелет и мышцы, осанка, личная гигиена, уход за зубами.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'meadow', icons:['🦴','💪','🦷']};
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

function initBodyHealthGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function hintB(emoji, ans, why){ return { hintExpr:'<span class="ok">' + ans + '</span>', hintSay:[G.say(why.replace(/<[^>]+>/g, ''))], hint:G.hintCard('<span style="font-size:3.4rem;line-height:1">' + emoji + '</span>', why) }; }
    // «нажми картинку»: вопрос, правильная (эмодзи, подпись), неправильные
    var FIND = [
      ['Что даёт телу опору и держит его форму?', ['🦴', 'скелет'], [['💪', 'мышцы'], ['🧠', 'мозг'], ['🫁', 'лёгкие']], 'Скелет — опора тела: он держит нашу форму и защищает внутренние органы'],
      ['Что сокращается, когда мы двигаемся?', ['💪', 'мышцы'], [['🦴', 'скелет'], ['🦷', 'зубы'], ['👀', 'глаза']], 'Мышцы сокращаются и двигают кости — так мы ходим, бегаем и прыгаем'],
      ['Что надо сделать перед едой?', ['🧼', 'вымыть руки'], [['📺', 'включить телевизор'], ['🍬', 'съесть конфету'], ['🛋️', 'лечь на диван']], 'Перед едой моют руки с мылом: так смываем микробов'],
      ['Чем чистят зубы утром и вечером?', ['🪥', 'зубная щётка'], [['🧽', 'мочалка'], ['🖍️', 'карандаш'], ['🧦', 'носок']], 'Зубы чистят щёткой и пастой два раза в день — утром и вечером'],
      ['Как сидеть за партой, чтобы спина была здорова?', ['🧍', 'ровно, спина прямая'], [['🐢', 'сгорбившись'], ['🛌', 'лёжа'], ['🙇', 'низко над тетрадью']], 'Ровная осанка бережёт позвоночник'],
      ['Что полезно для крепких мышц?', ['🏃', 'зарядка и игры'], [['🛋️', 'лежать весь день'], ['🍟', 'есть чипсы'], ['📱', 'сидеть в телефоне']], 'Движение укрепляет мышцы'],
      ['Что нужно телу ночью, чтобы отдохнуть?', ['😴', 'сон'], [['🎮', 'видеоигры'], ['🍭', 'сладости'], ['📺', 'мультики']], 'Во сне тело отдыхает и набирается сил']
    ];
    var HAB = [['🧼', 'мыть руки', 'good'], ['🪥', 'чистить зубы', 'good'], ['🏃', 'зарядка', 'good'], ['🛌', 'спать ночью', 'good'], ['🥕', 'есть овощи', 'good'], ['🧍', 'прямая спина', 'good'],
      ['🍬', 'много конфет', 'bad'], ['🐢', 'горбиться за партой', 'bad'], ['🥤', 'сладкая газировка', 'bad'], ['📱', 'телефон до ночи', 'bad'], ['🍟', 'чипсы каждый день', 'bad'], ['🙈', 'не мыть руки', 'bad']];
    var TF = [
      ['Скелет поддерживает тело и защищает внутренние органы', true, 'Кости скелета держат тело и прячут сердце, лёгкие и мозг'],
      ['Мышцы сокращаются и помогают нам двигаться', true, 'Мышцы тянут кости — получается движение'],
      ['Прямая осанка бережёт позвоночник', true, 'Ровная спина — здоровый позвоночник'],
      ['Руки нужно мыть перед едой и после улицы', true, 'Так мы смываем микробов'],
      ['Зубы надо чистить утром и вечером', true, 'Чистка убирает остатки еды, и зубы не болят'],
      ['Зарядка укрепляет мышцы', true, 'Мышцы, как и всё тело, становятся сильнее от движения'],
      ['Чем меньше сладкого, тем здоровее зубы', true, 'От сладкого на зубах быстрее появляются дырочки (кариес)'],
      ['Скелет мешает нам двигаться', false, 'Наоборот: кости и мышцы работают вместе, и мы двигаемся'],
      ['Мышцы не участвуют в движении', false, 'Без мышц мы не смогли бы пошевелиться'],
      ['Сутулиться полезно для спины', false, 'Сутулость портит осанку и утомляет спину'],
      ['Руки достаточно мыть раз в неделю', false, 'Мыть руки надо часто: перед едой, после улицы и туалета'],
      ['Зубы можно не чистить, если они не болят', false, 'Чистить надо всегда, чтобы зубы не заболели'],
      ['Личная гигиена не влияет на здоровье', false, 'Чистота помогает не болеть'],
      ['Кости — это самая мягкая часть тела', false, 'Кости твёрдые и прочные'],
      ['Мышцы у нас только на руках и ногах', false, 'Мышцы есть по всему телу: на спине, животе, лице']
    ];

    /* ⭐ нажми нужную картинку */
    function L1(){
      var f = pick(FIND), items = [f[1]].concat(f[2]);
      return S('1' + f[0], Object.assign(G.pickPic({ q:f[0], say:[G.say(f[0])], items:items.map(function(x){ return { k:x[1], h:'<span class="e">' + x[0] + '</span>', lab:x[1] }; }), ans:f[1][1] }), hintB(f[1][0], f[1][1], f[3])));
    }
    /* ⭐⭐ полезно / вредно */
    function L2(){
      var g = shuffle(HAB.filter(function(h){ return h[2] === 'good'; })).slice(0, 3), b = shuffle(HAB.filter(function(h){ return h[2] === 'bad'; })).slice(0, 3);
      var items = shuffle(g.concat(b)).map(function(h){ return { k:h[2], h:h[0] + ' ' + h[1] }; });
      return S('2s' + rnd(1, 99999), M.sortTask({ wide:true, items:items, say:[G.say('Что полезно для здоровья, а что вредно? Разложи по корзинам.')], cap:'Полезно или вредно?',
        buckets:[{ k:'good', name:'полезно', icon:'👍', c1:'#4DC98F', c2:'#27976A' }, { k:'bad', name:'вредно', icon:'👎', c1:'#FF8A65', c2:'#D9553A' }], hintSay:[G.say('Полезно: чистота, зарядка, сон, прямая спина. Вредно: много сладкого, сутулость, недосып.')] }));
    }
    /* ⭐⭐⭐ верно / неверно + «почему» */
    function L3(){
      var t = pick(TF);
      return S('3' + t[0], G.tf({ q:t[0], truth:t[1], hint:t[2] }));
    }

    M.run({ root:containerId, key:'bodyhealth', need:10, theme:'meadow', levels:[L1, L2, L3] });
  });
}
