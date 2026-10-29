/* ===== Білім Аралы — «Повороты: Барсик-путешественник» (v3) =====
   Математика, 2 класс (цель 2.3.2.4 приказа №399): направление и движение, четверть, половина и полный оборот, по часовой и против часовой стрелки.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'forest', icons:['🐯','↻','🧭']};
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

function initTurnsGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var DIR = { 0:'⬆ вверх', 90:'➡ вправо', 180:'⬇ вниз', 270:'⬅ влево' };
    function norm(d){ return ((d % 360) + 360) % 360; }
    var CMD = { cw4:{ t:'повернись направо (четверть оборота по часовой стрелке)', s:'направо, на четверть оборота по часовой стрелке', d:90 }, ccw4:{ t:'повернись налево (четверть оборота против часовой стрелки)', s:'налево, на четверть оборота против часовой стрелки', d:-90 },
      half:{ t:'повернись кругом (половина оборота)', s:'кругом, на половину оборота', d:180 }, full:{ t:'сделай полный оборот', s:'на полный оборот', d:360 }, fwd:{ t:'иди прямо', s:'иди прямо, не поворачивайся', d:0 } };
    var SHORT = { cw4:'направо', ccw4:'налево', half:'кругом', full:'полный оборот', fwd:'прямо' };
    function opts(ans){ return G.txtOpts([0, 90, 180, 270].map(function(d){ return DIR[d]; })); }
    function turnTask(sig, start, cmds, text, sayText){
      var end = norm(start + cmds.reduce(function(a, k){ return a + CMD[k].d; }, 0)), x = {}; 
      var steps = []; var cur = start; cmds.forEach(function(k){ cur = norm(cur + CMD[k].d); steps.push(SHORT[k] + ' → ' + DIR[cur]); });
      return S(sig, { expr:'', cap:text, say:[G.say(sayText || text)], ans:DIR[end], opts:opts(end), layout:'wide',
        field:function(el, X, task){ el.innerHTML = G.compass(start); task.reveal = function(){ var g = el.querySelector('.g2-cmp'); if(g) g.style.transform = 'rotate(' + (start + cmds.reduce(function(a, k){ return a + CMD[k].d; }, 0)) + 'deg)'; }; },
        hintExpr:'<span class="ok">' + DIR[end] + '</span>', hintSay:[G.say('Смотрит ' + DIR[end].replace(/^\S+ /, '') + '.')],
        hint:G.hintCard(G.compass(end), 'Смотрел: ' + DIR[start] + '<br>' + steps.join('<br>')) });
    }

    /* ⭐ Барсик смотрит вверх: один поворот */
    function L1(){
      var k = pick(['cw4', 'ccw4', 'half', 'fwd']);
      return turnTask('1' + k, 0, [k], 'Барсик смотрит вверх. ' + CMD[k].t.charAt(0).toUpperCase() + CMD[k].t.slice(1) + '. Куда он смотрит теперь?', 'Барсик смотрит вверх. Он ' + (k === 'fwd' ? 'идёт прямо' : 'поворачивается ' + CMD[k].s) + '. Куда он смотрит теперь?');
    }
    /* ⭐⭐ любое начало, четверть/половина/полный оборот */
    function L2(){
      var start = pick([0, 90, 180, 270]), k = pick(['cw4', 'ccw4', 'half', 'full', 'cw4', 'ccw4']);
      return turnTask('2' + start + k, start, [k], 'Барсик смотрит ' + DIR[start].replace(/^\S+ /, '') + '. Он поворачивается ' + CMD[k].s + '. Куда он смотрит теперь?');
    }
    /* ⭐⭐⭐ два поворота подряд, сколько оборота */
    function L3(){
      if(Math.random() < .3){
        var items = [['cw4', 'четверть оборота'], ['half', 'половина оборота'], ['full', 'полный оборот']], it = pick(items), start = pick([0, 90, 180, 270]), end = norm(start + CMD[it[0]].d);
        return S('3q' + start + it[0], { expr:'', cap:'Барсик смотрел ' + DIR[start].replace(/^\S+ /, '') + ', а теперь смотрит ' + DIR[end].replace(/^\S+ /, '') + '. Как он повернулся?', say:[G.say('Барсик смотрел ' + DIR[start].replace(/^\S+ /, '') + ', а теперь смотрит ' + DIR[end].replace(/^\S+ /, '') + '. Как он повернулся: на четверть, на половину оборота или на полный оборот?')],
          ans:it[1], opts:G.txtOpts(['четверть оборота', 'половина оборота', 'полный оборот']), layout:'card',
          field:function(el, X, task){ el.innerHTML = G.compass(start); task.reveal = function(){ var g = el.querySelector('.g2-cmp'); if(g) g.style.transform = 'rotate(' + (start + CMD[it[0]].d) + 'deg)'; }; },
          hintExpr:'<span class="ok">' + it[1] + '</span>', hintSay:[G.say('Это ' + it[1] + '.')], hint:G.hintCard(G.compass(end), DIR[start] + ' → ' + DIR[end] + '<br>' + (it[0] === 'cw4' ? 'Вправо от вверха — четверть оборота' : it[0] === 'half' ? 'Туда-обратно — это половина оборота' : 'Вернулся туда же — полный оборот')) });
      }
      var start2 = pick([0, 90, 180, 270]), a = pick(['cw4', 'ccw4', 'half']), b = pick(['cw4', 'ccw4', 'half']);
      return turnTask('3' + start2 + a + b, start2, [a, b], 'Барсик смотрит ' + DIR[start2].replace(/^\S+ /, '') + '. Сначала: ' + SHORT[a] + ', потом: ' + SHORT[b] + '. Куда он смотрит?');
    }

    M.run({ root:containerId, key:'turns', need:10, theme:'forest', levels:[L1, L2, L3] });
  });
}
