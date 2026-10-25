/* ===== Білім Аралы — «Части растения: Грядка Барсика» (v3) =====
   Естествознание, 1 класс (цель 1.2.1.2 приказа №399): корень, стебель, лист, цветок, плод, семя. Уровни: найди часть на растении → как называется → какой части не хватает.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'garden',icons:['🌱','🌸','🍅']};
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
function initPlantPartsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function NM(k){ var F = V.F[V.lang()]; return F['n_' + k] || k; }
    var PARTS = ['root','stem','leaf','flower','fruit','seed'];
    var CTR = { root:[110,196], stem:[110,112], leaf:[80,106], flower:[110,42], fruit:[158,84], seed:[188,134] };

    (function(){
      if(document.getElementById('mxpp-css')) return;
      var s = document.createElement('style'); s.id = 'mxpp-css';
      s.textContent = ''
      + '.mxpp-plant{display:block;width:218px;max-width:62vw;height:auto;animation:mxIn .45s backwards;filter:drop-shadow(0 6px 0 rgba(0,0,0,.12));}'
      + '.mxpp-plant .pt{cursor:pointer;transition:filter .2s;}.mxpp-plant .pt:hover{filter:brightness(1.1);}'
      + '.mxpp-plant .ring{transform-box:fill-box;transform-origin:center;animation:mxSpin 7s linear infinite;}'
      + '.mxpp-name{font:800 1.5rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 18px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
      + '.mxs-balloon.wide .b .nm{font-size:1.02rem;line-height:1.1;padding:0 6px;text-align:center;}'
      + '@media (prefers-reduced-motion:reduce){.mxpp-plant,.mxpp-plant .ring{animation:none}}';
      document.head.appendChild(s);
    })();

    function ring(k){ var c = CTR[k]; return '<circle class="ring" cx="' + c[0] + '" cy="' + c[1] + '" r="' + (k === 'root' ? 34 : 27) + '" fill="none" stroke="#FF6B5B" stroke-width="4" stroke-dasharray="7 6"/>'; }
    function ghost(k){ var c = CTR[k]; return '<g><circle cx="' + c[0] + '" cy="' + c[1] + '" r="24" fill="rgba(255,255,255,.55)" stroke="#7E6BD6" stroke-width="3.5" stroke-dasharray="6 5"/><text x="' + c[0] + '" y="' + (c[1] + 9) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#7E6BD6">?</text></g>'; }
    /* o: {hl, missing, fc (цвет цветка), frc (цвет плода)} */
    function plant(o){
      o = o || {};
      var G = '#3FB088', DG = '#2E8F6B', BR = '#C79A63', fc = o.fc || '#FF6B9C', frc = o.frc || '#FF5B4B';
      function P(k, inner, hit){
        if(o.missing === k) return ghost(k);
        return '<g class="pt" data-part="' + k + '">' + inner + '<g fill="#000" fill-opacity="0">' + hit + '</g></g>' + (o.hl === k ? ring(k) : '');
      }
      var h = '<svg class="mxpp-plant" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">';
      h += '<path d="M0 150 Q55 140 110 148 T220 146 V260 H0 Z" fill="#A9774A"/><path d="M0 150 Q55 140 110 148 T220 146 V160 Q165 166 110 160 T0 162 Z" fill="#6CCB6C"/>';
      h += '<g fill="#8A5E36"><circle cx="30" cy="200" r="4"/><circle cx="184" cy="214" r="5"/><circle cx="46" cy="236" r="4"/><circle cx="176" cy="180" r="3.5"/></g>';
      h += P('root', '<g fill="none" stroke="' + BR + '" stroke-width="6" stroke-linecap="round"><path d="M110 150 Q108 188 100 220"/><path d="M110 150 Q113 192 120 230"/><path d="M110 164 Q86 176 70 204"/><path d="M110 168 Q138 180 152 204"/><path d="M104 200 Q92 214 86 236"/></g>', '<rect x="62" y="150" width="96" height="100"/>');
      h += P('stem', '<path d="M110 148 L110 62" stroke="' + G + '" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M110 92 Q132 84 150 80" stroke="' + G + '" stroke-width="5" stroke-linecap="round" fill="none"/>', '<rect x="99" y="60" width="22" height="88"/>');
      h += P('leaf', '<path d="M110 108 Q68 82 52 108 Q80 130 110 108 Z" fill="' + G + '"/><path d="M110 108 Q80 108 60 108" stroke="' + DG + '" stroke-width="2.5" fill="none"/><path d="M110 128 Q150 102 170 128 Q142 146 110 128 Z" fill="' + G + '"/><path d="M110 128 Q140 128 160 128" stroke="' + DG + '" stroke-width="2.5" fill="none"/>', '<circle cx="80" cy="108" r="24"/><circle cx="140" cy="128" r="24"/>');
      h += P('fruit', '<circle cx="158" cy="86" r="17" fill="' + frc + '"/><path d="M148 74 L158 80 L168 74 L162 82 L154 82 Z" fill="' + DG + '"/><ellipse cx="152" cy="80" rx="4" ry="2.5" fill="#fff" opacity=".45"/>', '<circle cx="158" cy="86" r="24"/>');
      h += P('flower', '<g fill="' + fc + '"><circle cx="110" cy="24" r="11"/><circle cx="92" cy="37" r="11"/><circle cx="128" cy="37" r="11"/><circle cx="98" cy="57" r="11"/><circle cx="122" cy="57" r="11"/></g><circle cx="110" cy="42" r="10" fill="#FFC93C"/>', '<circle cx="110" cy="42" r="32"/>');
      h += P('seed', '<g transform="rotate(-20 182 132)"><ellipse cx="182" cy="132" rx="6" ry="10" fill="#8A5E36"/></g><g transform="rotate(25 196 128)"><ellipse cx="196" cy="128" rx="6" ry="10" fill="#A9774A"/></g><g transform="rotate(5 190 142)"><ellipse cx="190" cy="143" rx="6" ry="10" fill="#8A5E36"/></g>', '<circle cx="190" cy="134" r="24"/>');
      return h + '</svg>';
    }
    function look(){ return { fc:pick(['#FF6B9C','#FFB400','#C77DFF','#FF8C42']), frc:pick(['#FF5B4B','#FF8C42','#B36BFF']) }; }
    function nameCard(k){ return '<span class="mxpp-name">' + NM(k).toUpperCase() + '</span>'; }
    function hintPlant(k, lk){ return function(el){ el.innerHTML = plant({ hl:k, fc:lk.fc, frc:lk.frc }) + nameCard(k); }; }
    function nameOpts(){ return function(k){ return { v:k, h:'<span class="nm">' + NM(k) + '</span>' }; }; }
    function optsFor(k){ return shuffle([k].concat(shuffle(PARTS.filter(function(x){ return x !== k; })).slice(0, 3))).map(nameOpts()); }

    /* ⭐: найди часть на растении (нажми на неё) */
    function findTask(k){
      var lk = look();
      return S('f' + k + rnd(1, 9), {
        expr:nameCard(k), small:true, say:V.tpl('findpart', {k:k}), ans:k, gate:false, cap:V.F[V.lang()].findpart,
        field:function(el, X, task){
          el.innerHTML = plant(lk);
          var svg = el.querySelector('svg');
          [].slice.call(svg.querySelectorAll('.pt')).forEach(function(g){ g.addEventListener('click', function(){ if(task._done) return; task._done = true; X.sfx.tap(2); task.submit(g.getAttribute('data-part'), g); }); });
          task.reveal = function(){ if(!svg.querySelector('.ring')) svg.insertAdjacentHTML('beforeend', ring(k)); };
          task.auto = function(wrong){ var tgt = wrong ? svg.querySelector('.pt[data-part="' + PARTS.filter(function(x){ return x !== k; })[0] + '"]') : svg.querySelector('.pt[data-part="' + k + '"]'); if(!task._done){ task._done = true; task.submit(tgt.getAttribute('data-part'), tgt); } };
        },
        hintSay:['f:n_' + k], hintExpr:nameCard(k), hint:hintPlant(k, lk)
      });
    }
    /* ⭐⭐: на части кружок — как она называется */
    function nameTask(k){
      var lk = look();
      return S('n' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'namepart'}), ans:k, layout:'wide', opts:optsFor(k),
        field:function(el){ el.innerHTML = plant({ hl:k, fc:lk.fc, frc:lk.frc }); },
        hintSay:['f:n_' + k], hintExpr:nameCard(k), hint:hintPlant(k, lk)
      });
    }
    /* ⭐⭐⭐: какой части не хватает */
    function missTask(k){
      var lk = look();
      return S('m' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'missingpart'}), ans:k, layout:'wide', opts:optsFor(k),
        field:function(el){ el.innerHTML = plant({ missing:k, fc:lk.fc, frc:lk.frc }); },
        hintSay:['f:n_' + k], hintExpr:nameCard(k), hint:hintPlant(k, lk)
      });
    }

    function L1(){ return findTask(pick(PARTS)); }
    function L2(){ return nameTask(pick(PARTS)); }
    function L3(){ return Math.random() < .6 ? missTask(pick(['root','stem','leaf','flower','fruit'])) : (Math.random() < .5 ? nameTask(pick(PARTS)) : findTask(pick(PARTS))); }

    M.run({ root:containerId, key:'plantparts', need:10, theme:'garden', levels:[L1,L2,L3] });
  });
}
