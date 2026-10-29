/* ===== Білім Аралы — «Что делает часть растения: Грядка» (v3) =====
   Естествознание, 2 класс (цель 2.2.1.3 приказа №399): функции корня, стебля, листа и цветка.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'garden', icons:['🌱','🌿','🌸']};
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

function initPlantFuncGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    (function(){
      if(document.getElementById('g2pf-css')) return;
      var s = document.createElement('style'); s.id = 'g2pf-css';
      s.textContent = '.g2pf{display:block;width:210px;max-width:60vw;height:auto;animation:mxIn .45s backwards;filter:drop-shadow(0 6px 0 rgba(0,0,0,.12));}.g2pf .pt{cursor:pointer;transition:filter .2s}.g2pf .pt:hover{filter:brightness(1.1)}.g2pf .ring{transform-box:fill-box;transform-origin:center;animation:mxSpin 7s linear infinite}@media (prefers-reduced-motion:reduce){.g2pf,.g2pf .ring{animation:none}}';
      document.head.appendChild(s);
    })();
    var NAME = { root:'корень', stem:'стебель', leaf:'лист', flower:'цветок' };
    var FUNC = {
      root:['Впитывает из почвы воду и питательные вещества', 'Удерживает растение в земле'],
      stem:['Передаёт воду и вещества от корня к листьям', 'Держит листья и цветки, поднимает их к свету'],
      leaf:['Улавливает солнечный свет — так растение питается', 'Получает свет и воздух для питания растения'],
      flower:['Из него образуются плоды с семенами', 'Даёт семена для новых растений']
    };
    var CTR = { root:[110, 196, 36], stem:[110, 108, 26], leaf:[110, 114, 44], flower:[110, 42, 30] };
    function ring(k){ var c = CTR[k]; return '<circle class="ring" cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="none" stroke="#FF6B5B" stroke-width="4" stroke-dasharray="7 6"/>'; }
    function plant(hl){
      var GR = '#3FB088', DG = '#2E8F6B', BR = '#C79A63';
      function P(k, inner, hit){ return '<g class="pt" data-part="' + k + '">' + inner + '<g fill="#000" fill-opacity="0">' + hit + '</g></g>' + (hl === k ? ring(k) : ''); }
      var h = '<svg class="g2pf" viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg"><path d="M0 150 Q55 140 110 148 T220 146 V250 H0 Z" fill="#A9774A"/><path d="M0 150 Q55 140 110 148 T220 146 V160 Q165 166 110 160 T0 162 Z" fill="#6CCB6C"/><g fill="#8A5E36"><circle cx="30" cy="205" r="4"/><circle cx="184" cy="214" r="5"/><circle cx="46" cy="238" r="4"/></g>';
      h += P('root', '<g fill="none" stroke="' + BR + '" stroke-width="6" stroke-linecap="round"><path d="M110 150 Q108 188 100 222"/><path d="M110 150 Q114 192 122 232"/><path d="M110 166 Q86 178 68 206"/><path d="M110 170 Q138 182 154 206"/></g>', '<rect x="60" y="150" width="100" height="95"/>');
      h += P('stem', '<path d="M110 148 L110 62" stroke="' + GR + '" stroke-width="11" stroke-linecap="round" fill="none"/>', '<rect x="98" y="60" width="24" height="88"/>');
      h += P('leaf', '<path d="M110 112 Q66 84 48 112 Q80 134 110 112 Z" fill="' + GR + '"/><path d="M110 112 Q78 112 56 112" stroke="' + DG + '" stroke-width="2.5" fill="none"/><path d="M110 130 Q154 102 174 130 Q144 148 110 130 Z" fill="' + GR + '"/><path d="M110 130 Q142 130 164 130" stroke="' + DG + '" stroke-width="2.5" fill="none"/>', '<rect x="44" y="86" width="134" height="64"/>');
      h += P('flower', '<g fill="#FF6B9C"><circle cx="110" cy="22" r="11"/><circle cx="92" cy="36" r="11"/><circle cx="128" cy="36" r="11"/><circle cx="98" cy="56" r="11"/><circle cx="122" cy="56" r="11"/></g><circle cx="110" cy="40" r="10" fill="#FFC93C"/>', '<circle cx="110" cy="40" r="34"/>');
      return h + '</svg>';
    }
    function hintF(k, why){ return { hintExpr:'<span class="ok">' + NAME[k] + '</span>', hintSay:[G.say(NAME[k].charAt(0).toUpperCase() + NAME[k].slice(1) + ': ' + FUNC[k][0].toLowerCase() + '.')], hint:G.hintCard(plant(k), '<b>' + NAME[k] + '</b>: ' + (why || FUNC[k][0].toLowerCase())) }; }
    var CAUSE = [
      ['Растение долго не поливали. Корни остались без воды. Что случится?', 'Растение завянет', ['Растение быстрее вырастет', 'Растение станет цвести чаще', 'Ничего не изменится'], 'root', 'Корни впитывают воду. Нет воды — растение вянет'],
      ['Лист надолго накрыли тёмным колпаком. Чего ему не хватит?', 'Солнечного света', ['Земли', 'Корней', 'Цветков'], 'leaf', 'Листья улавливают свет, чтобы растение питалось'],
      ['Стебель сломался у самой земли. Что не дойдёт до листьев?', 'Вода и питательные вещества', ['Только тень', 'Семена', 'Ничего'], 'stem', 'Стебель — это дорожка от корня к листьям'],
      ['Цветок отцвёл. Что может появиться на его месте?', 'Плод с семенами', ['Новый корень', 'Ещё один стебель', 'Камень'], 'flower', 'Из цветка образуются плоды, а в них — семена'],
      ['Что удерживает растение в почве, чтобы ветер не унёс его?', 'Корень', ['Цветок', 'Лист', 'Семечко'], 'root', 'Корни крепко держатся за землю'],
      ['Какая часть растения похожа на трубочку для воды?', 'Стебель', ['Цветок', 'Лист', 'Корень'], 'stem', 'По стеблю вода поднимается вверх, к листьям']
    ];

    /* ⭐ нажми на часть, которая… */
    function L1(){
      var k = pick(['root', 'stem', 'leaf', 'flower']), f = FUNC[k][rnd(0, 1)];
      return S('1' + k + f.length, Object.assign({ expr:'', cap:'Какая часть: «' + f + '»? Нажми на неё', say:[G.say('Нажми на ту часть растения, которая: ' + f.toLowerCase() + '.')], ans:k, gate:false,
        field:function(el, X, task){
          el.innerHTML = plant();
          var svg = el.querySelector('svg');
          [].slice.call(svg.querySelectorAll('.pt')).forEach(function(g){ g.addEventListener('click', function(){ if(task._done) return; task._done = true; X.sfx.tap(2); task.submit(g.getAttribute('data-part'), g); }); });
          task.reveal = function(){ if(!svg.querySelector('.ring')) svg.insertAdjacentHTML('beforeend', ring(k)); };
          task.auto = function(wrong){ var tgt = svg.querySelector('.pt[data-part="' + (wrong ? Object.keys(NAME).filter(function(x){ return x !== k; })[0] : k) + '"]'); if(!task._done){ task._done = true; task.submit(tgt.getAttribute('data-part'), tgt); } };
        } }, hintF(k, f.toLowerCase())));
    }
    /* ⭐⭐ часть показана кружком — что она делает? */
    function L2(){
      var k = pick(['root', 'stem', 'leaf', 'flower']), good = FUNC[k][rnd(0, 1)], others = shuffle(Object.keys(NAME).filter(function(x){ return x !== k; })).slice(0, 2).map(function(x){ return FUNC[x][0]; });
      return S('2' + k + good.length, Object.assign(G.choice({ q:'Что делает эта часть растения?', say:[G.say('Это ' + NAME[k] + '. Что делает эта часть растения?')], opts:[good].concat(others), ans:good, layout:'card', field:function(el){ el.innerHTML = plant(k); } }), hintF(k)));
    }
    /* ⭐⭐⭐ что будет, если… */
    function L3(){
      var c = pick(CAUSE);
      return S('3' + c[0], Object.assign(G.choice({ q:c[0], opts:[c[1]].concat(c[2]), ans:c[1], layout:'card' }), hintF(c[3], c[4].replace(/^./, function(x){ return x.toLowerCase(); }))));
    }

    M.run({ root:containerId, key:'plantfunc', need:10, theme:'garden', levels:[L1, L2, L3] });
  });
}
