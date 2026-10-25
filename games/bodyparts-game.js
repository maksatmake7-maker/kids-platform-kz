/* ===== Білім Аралы — «Части тела: Зарядка Барсика» (v3) =====
   Естествознание, 1 класс (цель 1.2.3.1 приказа №399): глаз, ухо, нос, рот, рука, нога и их работа. Уровни: найди часть тела → как называется / чем мы видим, слышим → для чего нужна / чего не хватает / чем это узнаём.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'candy',icons:['👁️','👂','👃']};
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
function initBodyPartsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function NM(k){ return F()['n_' + k] || k; }
    /* 6 частей тела из программы: глаз, ухо, нос, рот, рука, нога */
    var PARTS = ['eye','ear','nose','mouth','hand','leg'];
    var DO = { eye:'🌈', ear:'🎵', nose:'🌸', mouth:'🍎', hand:'🤝', leg:'🚶' };
    var CTR = { eye:[[92,66],[128,66]], ear:[[58,76],[162,76]], nose:[[110,84]], mouth:[[110,102]], hand:[[44,192],[176,192]], leg:[[95,236],[125,236]] };
    var RAD = { eye:17, ear:18, nose:15, mouth:21, hand:20, leg:27 };

    (function(){
      if(document.getElementById('mxbp-css')) return;
      var s = document.createElement('style'); s.id = 'mxbp-css';
      s.textContent = ''
      + '.mxbp-kid{display:block;width:196px;max-width:56vw;height:auto;animation:mxIn .45s backwards;filter:drop-shadow(0 6px 0 rgba(0,0,0,.12));}'
      + '.mxbp-kid .pt{cursor:pointer;transition:filter .2s;}.mxbp-kid .pt:hover{filter:brightness(1.08);}'
      + '.mxbp-kid .ring{transform-box:fill-box;transform-origin:center;animation:mxSpin 7s linear infinite;}'
      + '.mxbp-name{font:800 1.5rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 18px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
      + '.mxbp-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.12rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin-top:8px;}'
      + '.mxbp-info .e{font-size:2.4rem;line-height:1;}'
      + '.mxbp-scene{display:flex;align-items:center;justify-content:center;width:min(100%,300px);height:120px;border-radius:26px;background:linear-gradient(#FFE29A,#FFB86B);box-shadow:inset 0 -8px 0 rgba(0,0,0,.12),0 6px 0 rgba(0,0,0,.16);font-size:4.6rem;animation:mxIn .4s backwards;}'
      + '.mxs .mxs-balloon.wide{width:140px;}.mxs-balloon.wide .b .nm{font-size:1.02rem;line-height:1.1;padding:0 6px;text-align:center;}.mxs-balloon .b .em{font-size:2.2rem;text-shadow:none;}'
      + '@media (prefers-reduced-motion:reduce){.mxbp-kid,.mxbp-kid .ring,.mxbp-scene{animation:none}}';
      document.head.appendChild(s);
    })();

    function ringsOf(k){ return CTR[k].map(function(c){ return '<circle class="ring" cx="' + c[0] + '" cy="' + c[1] + '" r="' + (RAD[k] + 8) + '" fill="none" stroke="#FF6B5B" stroke-width="4" stroke-dasharray="7 6"/>'; }).join(''); }
    function ghostsOf(k){ return CTR[k].map(function(c){ return '<g><circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + Math.max(15, RAD[k] - 2) + '" fill="rgba(255,255,255,.65)" stroke="#7E6BD6" stroke-width="3.5" stroke-dasharray="6 5"/><text x="' + c[0] + '" y="' + (c[1] + 8) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="22" fill="#7E6BD6">?</text></g>'; }).join(''); }
    /* o: {hl, missing} */
    function kid(o){
      o = o || {};
      var SK = '#FFD0A0', SD = '#F0A878';
      function P(k, inner){
        if(o.missing === k) return ghostsOf(k);
        var hit = CTR[k].map(function(c){ return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + RAD[k] + '"/>'; }).join('');
        return '<g class="pt" data-part="' + k + '">' + inner + '<g fill="#000" fill-opacity="0">' + hit + '</g></g>' + (o.hl === k ? ringsOf(k) : '');
      }
      var h = '<svg class="mxbp-kid" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">';
      /* тело, одежда */
      h += '<rect x="80" y="118" width="60" height="86" rx="20" fill="#4FA8F5"/><rect x="92" y="112" width="36" height="14" rx="7" fill="' + SK + '"/>';
      h += '<path d="M82 128 Q60 150 52 182" stroke="#4FA8F5" stroke-width="17" stroke-linecap="round" fill="none"/><path d="M138 128 Q160 150 168 182" stroke="#4FA8F5" stroke-width="17" stroke-linecap="round" fill="none"/>';
      h += '<rect x="82" y="196" width="56" height="12" rx="6" fill="#2F78C4"/>';
      /* ноги */
      h += P('leg', '<rect x="84" y="204" width="22" height="42" rx="9" fill="#2F78C4"/><rect x="114" y="204" width="22" height="42" rx="9" fill="#2F78C4"/><rect x="86" y="238" width="18" height="8" fill="' + SK + '"/><rect x="116" y="238" width="18" height="8" fill="' + SK + '"/><ellipse cx="92" cy="256" rx="18" ry="9" fill="#E0594B"/><ellipse cx="128" cy="256" rx="18" ry="9" fill="#E0594B"/>');
      /* руки */
      h += P('hand', '<circle cx="44" cy="192" r="12" fill="' + SK + '" stroke="' + SD + '" stroke-width="2"/><circle cx="176" cy="192" r="12" fill="' + SK + '" stroke="' + SD + '" stroke-width="2"/>');
      /* уши */
      h += P('ear', '<circle cx="58" cy="76" r="11" fill="' + SK + '" stroke="' + SD + '" stroke-width="2"/><circle cx="58" cy="76" r="5" fill="' + SD + '"/><circle cx="162" cy="76" r="11" fill="' + SK + '" stroke="' + SD + '" stroke-width="2"/><circle cx="162" cy="76" r="5" fill="' + SD + '"/>');
      /* голова */
      h += '<circle cx="110" cy="74" r="50" fill="' + SK + '"/><path d="M60 66 Q62 20 110 20 Q158 20 160 66 Q146 42 110 42 Q74 42 60 66 Z" fill="#7A4B2A"/>';
      h += '<circle cx="80" cy="92" r="7" fill="#FF9AA8" opacity=".55"/><circle cx="140" cy="92" r="7" fill="#FF9AA8" opacity=".55"/>';
      /* глаза, нос, рот */
      h += P('eye', '<ellipse cx="92" cy="66" rx="9" ry="10" fill="#fff"/><circle cx="93" cy="67" r="5" fill="#2B2F55"/><circle cx="95" cy="64" r="1.8" fill="#fff"/><ellipse cx="128" cy="66" rx="9" ry="10" fill="#fff"/><circle cx="129" cy="67" r="5" fill="#2B2F55"/><circle cx="131" cy="64" r="1.8" fill="#fff"/>');
      h += P('nose', '<path d="M110 76 Q103 90 110 92 Q117 90 110 76 Z" fill="' + SD + '"/><circle cx="106" cy="91" r="1.6" fill="#B9774E"/><circle cx="114" cy="91" r="1.6" fill="#B9774E"/>');
      h += P('mouth', '<path d="M94 100 Q110 120 126 100 Q110 106 94 100 Z" fill="#E0504A"/><path d="M100 106 Q110 114 120 106 Q110 109 100 106 Z" fill="#fff"/>');
      return h + '</svg>';
    }
    function nameCard(k){ return '<span class="mxbp-name">' + NM(k).toUpperCase() + '</span>'; }
    function nmOpt(k){ return { v:k, h:'<span class="nm">' + NM(k) + '</span>' }; }
    function fnOpt(k){ return { v:k, h:'<span class="nm">' + F()['fn_' + k] + '</span>' }; }
    function optsFor(k, fn){ return shuffle([k].concat(shuffle(PARTS.filter(function(x){ return x !== k; })).slice(0, 3))).map(fn ? fnOpt : nmOpt); }
    function hintBody(k, fact){ return function(el){ el.innerHTML = kid({ hl:k }) + nameCard(k) + (fact ? '<div class="mxbp-info"><span class="e">' + DO[k] + '</span><span>' + F()['fact_' + k] + '</span></div>' : ''); }; }

    /* ⭐: найди часть тела (нажми на неё) */
    function findTask(k){
      return S('f' + k + rnd(1, 9), {
        expr:nameCard(k), small:true, say:V.tpl('findbody', {k:k}), ans:k, gate:false, cap:F().findbody,
        field:function(el, X, task){
          el.innerHTML = kid();
          var svg = el.querySelector('svg');
          [].slice.call(svg.querySelectorAll('.pt')).forEach(function(g){ g.addEventListener('click', function(){ if(task._done) return; task._done = true; X.sfx.tap(2); task.submit(g.getAttribute('data-part'), g); }); });
          task.reveal = function(){ if(!svg.querySelector('.ring')) svg.insertAdjacentHTML('beforeend', ringsOf(k)); };
          task.auto = function(wrong){ var tgt = svg.querySelector('.pt[data-part="' + (wrong ? PARTS.filter(function(x){ return x !== k; })[0] : k) + '"]'); if(!task._done){ task._done = true; task.submit(tgt.getAttribute('data-part'), tgt); } };
        },
        hintSay:['f:n_' + k, 'f:fact_' + k], hintExpr:nameCard(k), hint:hintBody(k, true)
      });
    }
    /* ⭐⭐: как называется часть тела (на ней кружок) */
    function nameTask(k){
      return S('n' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'whatbody'}), ans:k, layout:'wide', opts:optsFor(k),
        field:function(el){ el.innerHTML = kid({ hl:k }); },
        hintSay:['f:n_' + k, 'f:fact_' + k], hintExpr:nameCard(k), hint:hintBody(k, true)
      });
    }
    /* ⭐⭐: чем мы видим / слышим / нюхаем… */
    function howTask(k){
      return S('h' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'q_' + k}), ans:k, layout:'wide', opts:optsFor(k),
        field:function(el){ el.innerHTML = '<div class="mxbp-scene"><span>' + DO[k] + '</span></div>'; },
        hintSay:['f:fact_' + k, 'f:n_' + k], hintExpr:nameCard(k), hint:hintBody(k, true)
      });
    }
    /* ⭐⭐⭐: для чего нужна эта часть тела */
    function whatForTask(k){
      return S('w' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'whatfor'}), ans:k, layout:'wide', opts:optsFor(k, true),
        field:function(el){ el.innerHTML = kid({ hl:k }); },
        hintSay:['f:n_' + k, 'f:fact_' + k], hintExpr:nameCard(k), hint:hintBody(k, true)
      });
    }
    /* ⭐⭐⭐: какой части не хватает */
    function missTask(k){
      return S('m' + k + rnd(1, 9), {
        expr:'', say:V.tpl('q', {k:'missingpart'}), ans:k, layout:'wide', opts:optsFor(k),
        field:function(el){ el.innerHTML = kid({ missing:k }); },
        hintSay:['f:n_' + k], hintExpr:nameCard(k), hint:hintBody(k, true)
      });
    }
    /* ⭐⭐⭐: чем мы это узнаём — глазами, ушами или носом */
    var SENSE = { eye:['🌈','🐱','🌳'], ear:['🎵','🔔','🎸'], nose:['🌸','🍕','🍋'] };
    function senseTask(){
      var items = [];
      ['eye','ear','nose'].forEach(function(k){ shuffle(SENSE[k]).slice(0, 2).forEach(function(e){ items.push({ h:e, k:k, id:e }); }); });
      items = shuffle(items);
      return S('s' + items.map(function(i){ return i.id; }).join(''), M.sortTask({
        items:items, say:V.tpl('q', {k:'sensesort'}), hintSay:['f:fact_eye', 'f:fact_ear', 'f:fact_nose'],
        buckets:[{ k:'eye', name:NM('eye'), icon:'👁️', c1:'#5EC7FF', c2:'#2F9BE6' }, { k:'ear', name:NM('ear'), icon:'👂', c1:'#FFB454', c2:'#E8832F' }, { k:'nose', name:NM('nose'), icon:'👃', c1:'#FF8FB1', c2:'#E5588A' }]
      }));
    }

    function L1(){ return findTask(pick(PARTS)); }
    function L2(){ return Math.random() < .5 ? howTask(pick(PARTS)) : nameTask(pick(PARTS)); }
    function L3(){ var r = Math.random(); return r < .3 ? senseTask() : r < .6 ? whatForTask(pick(PARTS)) : r < .85 ? missTask(pick(PARTS)) : findTask(pick(PARTS)); }

    M.run({ root:containerId, key:'bodyparts', need:10, theme:'candy', levels:[L1,L2,L3] });
  });
}
