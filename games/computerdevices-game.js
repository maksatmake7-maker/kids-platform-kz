/* ===== Білім Аралы — «Устройства компьютера: Как это называется» (v3) =====
   Цифровая грамотность, 1 класс (цель 1.1.1.2 приказа №399: называть основные устройства компьютера). Те же 8 устройств, что в прежней игре. Уровни: картинка → название / название → картинка → для чего нужно / чем управляем и что показывает или звучит.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'workshop',icons:['🖥️','⌨️','🖱️']};
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
function initComputerDevicesGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function nm(k){ return msgs()['item_' + k] || F()['dv_' + k]; }

    /* 8 устройств из прежней игры (цифровая грамотность, цель 1.1.1.2) */
    var EMO = { monitor:'🖥️', keyboard:'⌨️', mouse:'🖱️', printer:'🖨️', speaker:'🔊', laptop:'💻', headphones:'🎧', joystick:'🕹️' };
    var KEYS = ['monitor','keyboard','mouse','printer','speaker','laptop','headphones','joystick'];
    var CTL = ['keyboard','mouse','joystick'];                       /* ими управляем */
    var OUT = ['monitor','printer','speaker','headphones'];          /* показывают, печатают, звучат */

    (function(){
      if(document.getElementById('mxdv-css')) return;
      var s = document.createElement('style'); s.id = 'mxdv-css';
      s.textContent = ''
      + '.mxdv-big{display:flex;align-items:center;justify-content:center;min-width:150px;height:122px;padding:0 22px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.8rem;line-height:1;margin:0 auto;width:max-content;animation:mxIn .4s backwards;}'
      + '.mxdv-card{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:320px;padding:14px 20px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.2rem/1.3 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;animation:mxIn .4s backwards;}.mxdv-card .e{font-size:2.2rem;line-height:1;}'
      + '.mxdv-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.02rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxdv-info b{font-size:1.35rem;color:#2F9BE6;}'
      + '.mxs-balloon .b .lt{font:800 2.7rem "Baloo 2",sans-serif;}body .mxs-balloon .b .nm{font-size:.95rem!important;font-weight:800;padding:0 2px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:148px;}'
      + '@media (prefers-reduced-motion:reduce){.mxdv-big,.mxdv-card{animation:none}}';
      document.head.appendChild(s);
    })();

    function hintOf(k){
      return { hintSay:['f:dv_' + k, 'f:dv_d_' + k], hint:function(el){ el.innerHTML = '<div class="mxdv-big" style="height:96px;font-size:3.8rem">' + EMO[k] + '</div><div class="mxdv-info"><b>' + nm(k) + '</b></div><div class="mxdv-info" style="margin-top:6px">' + F()['dv_d_' + k] + '</div>'; } };
    }
    function names(k, n){ return shuffle([k].concat(shuffle(KEYS.filter(function(x){ return x !== k; })).slice(0, n - 1))); }
    /* ⭐: картинка → название */
    function nameTask(k, n){
      var h = hintOf(k);
      return S('n' + k + n, { expr:'', say:V.tpl('q', {k:'dvq'}), ans:k, layout:'wide', opts:names(k, n).map(function(x){ return { v:x, h:'<span class="nm">' + nm(x) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxdv-big">' + EMO[k] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: название → картинка */
    function findTask(k, n){
      var h = hintOf(k);
      return S('f' + k + n, { expr:'', say:V.tpl('seq', {list:['f:dv_' + k, 'f:dvfind']}), cap:F().dvfind, ans:k, layout:'wide', opts:names(k, n).map(function(x){ return { v:x, h:'<span class="lt">' + EMO[x] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxdv-card" style="font-size:1.5rem">' + nm(k) + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: для чего нужно → какое устройство */
    function useTask(k){
      var h = hintOf(k);
      return S('u' + k, { expr:'', say:V.tpl('seq', {list:['f:dv_d_' + k, 'f:dvuse']}), cap:F().dvuse, ans:k, layout:'wide', opts:names(k, 4).map(function(x){ return { v:x, h:'<span class="lt">' + EMO[x] + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxdv-card"><span class="e">🔎</span>' + F()['dv_d_' + k] + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: управляем / показывает или звучит */
    function sortTask(){
      var a = CTL.slice(), b = shuffle(OUT).slice(0, 3);
      var items = shuffle(a.map(function(k){ return { h:EMO[k], k:'ctl', id:k }; }).concat(b.map(function(k){ return { h:EMO[k], k:'out', id:k }; })));
      return S('o' + items.map(function(i){ return i.id; }).join('-'), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'dvsort'}), hintSay:['f:dv_hctl', 'f:dv_hout'],
        buckets:[{ k:'ctl', name:F().dv_ctl, icon:'🕹️', c1:'#FFB454', c2:'#E8832F' }, { k:'out', name:F().dv_out, icon:'📺', c1:'#5EC7FF', c2:'#2F9BE6' }] }));
    }

    function L1(){ return Math.random() < .5 ? nameTask(pick(KEYS), 3) : findTask(pick(KEYS), 3); }
    function L2(){ var r = Math.random(); return r < .4 ? nameTask(pick(KEYS), 4) : r < .8 ? findTask(pick(KEYS), 4) : useTask(pick(KEYS)); }
    function L3(){ var r = Math.random(); return r < .4 ? useTask(pick(KEYS)) : r < .7 ? sortTask() : r < .85 ? findTask(pick(KEYS), 4) : nameTask(pick(KEYS), 4); }

    M.run({ root:containerId, key:'computerdevices', need:10, theme:'workshop', levels:[L1,L2,L3] });
  });
}
