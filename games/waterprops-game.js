/* ===== Білім Аралы — «Свойства воды: Капелька» (v3) =====
   Естествознание, 2 класс (цель 2.3.3.1–2.3.3.3 приказа №399): свойства воды, лёд, вода и пар, природные источники воды.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'ocean', icons:['💧','🧊','☁️']};
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

function initWaterPropsGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var STATE = { solid:{ n:'твёрдая (лёд, снег)', short:'лёд', ic:'🧊', c1:'#7FD3F0', c2:'#3FA3CE' }, liquid:{ n:'жидкая', short:'вода', ic:'💧', c1:'#4D8FF0', c2:'#2760C4' }, gas:{ n:'пар', short:'пар', ic:'♨️', c1:'#B39DDB', c2:'#7E62C0' } };
    var ITEMS = { solid:[['🧊', 'лёд'], ['❄️', 'снег'], ['🧊', 'сосулька']], liquid:[['💧', 'капля'], ['🌧️', 'дождь'], ['🌊', 'море'], ['🥛', 'вода в стакане']], gas:[['♨️', 'пар над кастрюлей'], ['🫖', 'пар из чайника'], ['🍜', 'пар над супом']] };
    var SRC = { nat:[['🏞️', 'река'], ['🌊', 'море'], ['🏔️', 'ручей в горах'], ['🦆', 'озеро'], ['💧', 'родник']], man:[['🚰', 'водопроводный кран'], ['🍼', 'бутылка воды'], ['🛁', 'ванна'], ['🏊', 'бассейн'], ['🪣', 'ведро']] };
    var TF = [
      ['Вода не имеет вкуса', true, 'Чистая вода безвкусная'], ['Вода не имеет запаха', true, 'Чистая вода ничем не пахнет'], ['Вода принимает форму сосуда, в который её налили', true, 'У воды нет своей формы: в стакане она как стакан, в миске — как миска'],
      ['Вода умеет течь', true, 'Вода текучая: она льётся и течёт по руслу'], ['Когда вода замерзает, она превращается в лёд', true, 'Лёд — это замёрзшая вода'], ['Лёд при тепле тает и снова становится водой', true, 'Лёд нагрелся — растаял'],
      ['Реки, озёра и моря — природные источники воды', true, 'Их создала природа'], ['Когда вода кипит, из неё идёт пар', true, 'Вода при нагревании превращается в пар'], ['Пар на холодном стекле превращается в капельки воды', true, 'Пар остыл — превратился в капли'],
      ['Вода всегда сладкая', false, 'Чистая вода безвкусная'], ['У воды сильный запах', false, 'Чистая вода почти не пахнет'], ['Вода всегда сохраняет форму куба', false, 'У воды нет своей формы'], ['Вода не может течь', false, 'Вода как раз текучая'],
      ['Лёд — это не вода', false, 'Лёд — это вода в твёрдом виде'], ['Вода никогда не превращается в пар', false, 'При нагревании вода испаряется и превращается в пар'], ['Водопроводный кран — природный источник воды', false, 'Кран сделал человек'],
      ['Лёд горячий', false, 'Лёд очень холодный']
    ];
    var Q3 = [
      ['Что будет, если поставить миску со льдом в тёплую комнату?', 'Лёд растает и станет водой', ['Лёд превратится в камень', 'Лёд станет горячим', 'Ничего не изменится'], 'Тепло плавит лёд — он превращается в воду'],
      ['Что будет, если воду из стакана налить в миску?', 'Вода примет форму миски', ['Вода останется стаканом', 'Вода станет льдом', 'Вода исчезнет'], 'У воды нет своей формы'],
      ['Что будет с водой в блюдечке, если оставить её на тёплом солнце надолго?', 'Вода испарится', ['Вода станет сладкой', 'Вода станет твёрдой', 'Воды станет больше'], 'Вода испаряется — превращается в невидимый пар'],
      ['Что получится, если воду поставить в морозилку?', 'Лёд', ['Пар', 'Песок', 'Сок'], 'Вода при замерзании становится льдом'],
      ['Откуда берётся пар над кипящим чайником?', 'Вода при нагревании превращается в пар', ['Из заварки', 'Из крышки', 'Из воздуха в комнате'], 'Горячая вода превращается в пар'],
      ['Что можно сказать про цвет и запах чистой воды?', 'У неё нет ни цвета, ни запаха', ['Она всегда голубая', 'Она всегда пахнет', 'Она всегда белая'], 'Чистая вода прозрачная и без запаха']
    ];
    function hintW(emoji, txt){ return { hintSay:[G.say(txt.replace(/<[^>]+>/g, ''))], hint:G.hintCard('<span style="font-size:3.4rem;line-height:1">' + emoji + '</span>', txt) }; }

    /* ⭐ найди воду в нужном виде */
    function L1(){
      var k = pick(['solid', 'liquid', 'gas']), it = pick(ITEMS[k]), pool = [], seen = {}; seen[k] = 1;
      pool.push(it); ['solid', 'liquid', 'gas'].filter(function(x){ return x !== k; }).forEach(function(x){ pool.push(pick(ITEMS[x])); });
      var q = k === 'solid' ? 'Найди воду в твёрдом виде' : k === 'liquid' ? 'Найди воду в жидком виде' : 'Найди воду в виде пара';
      return S('1' + k + it[1], Object.assign(G.pickPic({ q:q, say:[G.say(q + '.')], items:pool.map(function(x){ return { k:x[1], h:'<span class="e">' + x[0] + '</span>', lab:x[1] }; }), ans:it[1] }),
        { hintExpr:'<span class="ok">' + it[1] + '</span>', hintSay:[G.say(it[1] + ' — это вода ' + (k === 'solid' ? 'в твёрдом виде' : k === 'liquid' ? 'в жидком виде' : 'в виде пара') + '.')], hint:G.hintCard('<span style="font-size:3.4rem">' + it[0] + '</span>', '<b>' + it[1] + '</b> — вода ' + (k === 'solid' ? 'в твёрдом виде' : k === 'liquid' ? 'в жидком виде' : 'в виде пара')) }));
    }
    /* ⭐⭐ разложи: виды воды / источники воды */
    function L2(){
      if(Math.random() < .55){
        var items = []; ['solid', 'liquid', 'gas'].forEach(function(k){ shuffle(ITEMS[k]).slice(0, 2).forEach(function(x){ items.push({ k:k, h:x[0] + ' ' + x[1] }); }); });
        return S('2s' + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(items), say:[G.say('Где вода твёрдая, где жидкая, а где она стала паром? Разложи по корзинам.')], cap:'Лёд — твёрдая, вода — жидкая, пар — газ',
          buckets:['solid', 'liquid', 'gas'].map(function(k){ return { k:k, name:STATE[k].short, icon:STATE[k].ic, c1:STATE[k].c1, c2:STATE[k].c2 }; }), hintSay:[G.say('Лёд и снег — твёрдая вода, капли и реки — жидкая, пар — вода, которая нагрелась.')] }));
      }
      var it = shuffle(SRC.nat).slice(0, 3).map(function(x){ return { k:'nat', h:x[0] + ' ' + x[1] }; }).concat(shuffle(SRC.man).slice(0, 3).map(function(x){ return { k:'man', h:x[0] + ' ' + x[1] }; }));
      return S('2n' + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(it), say:[G.say('Какие источники воды создала природа, а какие сделал человек? Разложи по корзинам.')], cap:'Откуда берётся вода?',
        buckets:[{ k:'nat', name:'природные', icon:'🏞️', c1:'#4DC98F', c2:'#27976A' }, { k:'man', name:'сделал человек', icon:'🚰', c1:'#FFA24D', c2:'#D9741A' }], hintSay:[G.say('Река, озеро, море, родник — природные. Кран, ведро, бассейн — сделал человек.')] }));
    }
    /* ⭐⭐⭐ верно / неверно и «что будет, если» */
    function L3(){
      if(Math.random() < .35){
        var q = pick(Q3);
        return S('3q' + q[0], Object.assign(G.choice({ q:q[0], opts:[q[1]].concat(q[2]), ans:q[1], layout:'card' }), hintW('💧', q[3])));
      }
      var t = pick(TF);
      return S('3t' + t[0], G.tf({ q:t[0], truth:t[1], hint:t[2] }));
    }

    M.run({ root:containerId, key:'waterprops', need:10, theme:'ocean', levels:[L1, L2, L3] });
  });
}
