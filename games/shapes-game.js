/* ===== Білім Аралы — «Найди линию: Остров фигур» (v3) =====
   Математика, 1 класс (цель 1.3.1.1 приказа №399): точка, прямая, кривая, ломаная, отрезок, луч, угол, замкнутая и незамкнутая линии. Уровни: найди по названию → что это → замкнутая или нет.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'sky', icons:['📐','👆','✅']};
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
function initShapesGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV, INK = '#1D3557', RED = '#FF6B5B';
    (function(){
      if(document.getElementById('mxsh-css')) return;
      var s = document.createElement('style'); s.id = 'mxsh-css';
      s.textContent = ''
      + '.mxsh-card{background:#fff;border-radius:22px;padding:10px 18px;box-shadow:0 5px 0 rgba(0,0,0,.14);animation:mxIn .4s;}'
      + '.mxsh-card svg{display:block;width:210px;height:126px;}'
      + '.mxsh-pill{display:flex;align-items:center;justify-content:center;width:92px;height:56px;background:#fff;border-radius:18px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.08);}'
      + '.mxsh-pill svg{width:80px;height:48px;}'
      + '.mxsh-name.l{font-size:1.05rem;padding:3px 12px;max-width:100%;line-height:1.1;}'
      + '.mxsh-name{font:800 1.5rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:18px;padding:2px 18px;display:inline-block;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
      + '.mxs-balloon.wide .b .nm{font-size:1rem;line-height:1.1;padding:0 6px;text-align:center;}'
      + '.mxs-balloon.wide.sh{width:124px;}.mxs-balloon.wide.sh .b{height:66px;top:4px;}';
      document.head.appendChild(s);
    })();
    var I = INK;
    function st(extra){ return 'fill="none" stroke="' + I + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" ' + (extra || ''); }
    var ICON = {
      tochka:[function(){ return '<circle cx="50" cy="30" r="6" fill="' + I + '"/>'; }],
      pryamaya:[function(){ return '<line x1="10" y1="30" x2="90" y2="30" stroke="' + I + '" stroke-width="4"/><path d="M16 24 L9 30 L16 36" ' + st() + '/><path d="M84 24 L91 30 L84 36" ' + st() + '/>'; },
                function(){ return '<line x1="14" y1="52" x2="86" y2="8" stroke="' + I + '" stroke-width="4"/><path d="M14 44 L12 54 L22 52" ' + st() + '/><path d="M78 6 L88 6 L86 16" ' + st() + '/>'; }],
      krivaya:[function(){ return '<path d="M10 45 Q35 5 50 30 Q65 55 90 15" ' + st() + '/>'; }, function(){ return '<path d="M10 40 Q50 -5 90 40" ' + st() + '/>'; }, function(){ return '<path d="M12 20 C30 60 45 0 60 30 S85 45 90 20" ' + st() + '/>'; }],
      lomanaya:[function(){ return '<polyline points="10,45 30,15 50,45 70,15 90,40" ' + st() + '/>'; }, function(){ return '<polyline points="12,40 30,12 48,38 62,14 88,46" ' + st() + '/>'; }],
      otrezok:[function(){ return '<line x1="15" y1="30" x2="85" y2="30" stroke="' + I + '" stroke-width="4"/><circle cx="15" cy="30" r="5" fill="' + I + '"/><circle cx="85" cy="30" r="5" fill="' + I + '"/>'; },
               function(){ return '<line x1="18" y1="48" x2="82" y2="12" stroke="' + I + '" stroke-width="4"/><circle cx="18" cy="48" r="5" fill="' + I + '"/><circle cx="82" cy="12" r="5" fill="' + I + '"/>'; }],
      luch:[function(){ return '<line x1="15" y1="30" x2="86" y2="30" stroke="' + I + '" stroke-width="4"/><circle cx="15" cy="30" r="5" fill="' + I + '"/><path d="M78 23 L90 30 L78 37" ' + st() + '/>'; },
            function(){ return '<line x1="20" y1="50" x2="82" y2="14" stroke="' + I + '" stroke-width="4"/><circle cx="20" cy="50" r="5" fill="' + I + '"/><path d="M72 13 L86 11 L80 24" ' + st() + '/>'; }],
      ugol:[function(){ return '<line x1="20" y1="50" x2="20" y2="10" stroke="' + I + '" stroke-width="4"/><line x1="20" y1="50" x2="85" y2="50" stroke="' + I + '" stroke-width="4"/><path d="M20 38 A12 12 0 0 1 32 50" fill="none" stroke="' + RED + '" stroke-width="3"/>'; },
            function(){ return '<line x1="25" y1="50" x2="75" y2="10" stroke="' + I + '" stroke-width="4"/><line x1="25" y1="50" x2="88" y2="50" stroke="' + I + '" stroke-width="4"/><path d="M42 50 A17 17 0 0 0 38 40" fill="none" stroke="' + RED + '" stroke-width="3"/>'; }]
    };
    var CLOSED = [function(){ return '<ellipse cx="50" cy="30" rx="34" ry="22" ' + st() + '/>'; }, function(){ return '<polygon points="50,6 88,52 12,52" ' + st() + '/>'; }, function(){ return '<rect x="22" y="8" width="56" height="44" rx="2" ' + st() + '/>'; },
                  function(){ return '<polygon points="14,40 24,12 56,6 86,22 72,52 30,52" ' + st() + '/>'; }, function(){ return '<path d="M20 30 C20 6 80 6 80 30 C80 54 20 54 20 30 Z" ' + st() + '/>'; }];
    var OPEN = [function(){ return '<path d="M16 46 A34 34 0 1 1 84 46" ' + st() + '/>'; }, function(){ return '<polyline points="12,44 34,12 56,44 80,14" ' + st() + '/>'; }, function(){ return '<path d="M10 40 Q35 -8 60 30 T92 22" ' + st() + '/>'; },
                 function(){ return '<polyline points="22,10 22,50 78,50" ' + st() + '/>'; }, function(){ return '<path d="M30 14 L70 14 L70 46 L38 46" ' + st() + '/>'; }];
    function svg(inner, cls){ return '<svg viewBox="0 0 100 60" class="' + (cls || '') + '">' + inner + '</svg>'; }
    function icon(key){ return svg(pick(ICON[key])()); }
    var CORE = ['tochka','pryamaya','krivaya','lomanaya','otrezok','luch','ugol'];
    var CLS = { closed:{ru:'ЗАМКНУТАЯ ЛИНИЯ',kz:'ТҰЙЫҚ СЫЗЫҚ',en:'CLOSED LINE',zh:'封闭线'}, open:{ru:'НЕЗАМКНУТАЯ ЛИНИЯ',kz:'АШЫҚ СЫЗЫҚ',en:'OPEN LINE',zh:'不封闭线'} };
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function nameOf(k){
      var l = document.documentElement.getAttribute('data-current') || 'ru';
      if(k === 'closed' || k === 'open') return CLS[k][l] || CLS[k].en;
      var m = msgs(); return m['shape_' + k] || k;
    }
    function nameCard(k){ var n = nameOf(k); return '<span class="mxsh-name' + (n.length > 11 ? ' l' : '') + '">' + n + '</span>'; }
    function pill(inner){ return '<span class="mxsh-pill">' + inner + '</span>'; }
    function hintShape(k, inner){ return function(el){ el.innerHTML = '<div class="mxsh-card">' + svg(inner, '') + '</div>' + nameCard(k); }; }
    function others(k, n, pool){ var p = shuffle((pool || CORE).filter(function(x){ return x !== k; })); return p.slice(0, n); }

    function findTask(sig, k, pool){   // имя → найди рисунок
      var keys = shuffle([k].concat(others(k, 3, pool)));
      var inner = {}; keys.forEach(function(x){ inner[x] = pick(ICON[x])(); });
      return S(sig, {
        expr:nameCard(k), small:true, say:V.tpl('findshape',{k:k}), ans:k, layout:'wide', cap:'',
        opts:keys.map(function(x){ return { v:x, h:pill(svg(inner[x])) }; }),
        hintSay:['f:sh_' + k], hintExpr:nameCard(k), hint:hintShape(k, inner[k])
      });
    }
    function nameTask(sig, k){   // рисунок → название
      var inner = pick(ICON[k])(), keys = shuffle([k].concat(others(k, 3)));
      return S(sig, {
        expr:'', say:V.tpl('q',{k:'whatis'}), ans:k, layout:'wide',
        opts:keys.map(function(x){ return { v:x, h:'<span class="nm">' + nameOf(x) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxsh-card">' + svg(inner) + '</div>'; },
        hintSay:['f:sh_' + k], hintExpr:nameCard(k), hint:hintShape(k, inner)
      });
    }
    function closedTask(sig, wantClosed){
      var pool = wantClosed ? CLOSED : OPEN, other = wantClosed ? OPEN : CLOSED, key = wantClosed ? 'closed' : 'open';
      var good = pick(pool)(), bads = shuffle(other.slice()).slice(0, 3).map(function(f){ return f(); }), ids = shuffle(['g','x','y','z']);
      var map = { g:good, x:bads[0], y:bads[1], z:bads[2] };
      return S(sig, {
        expr:nameCard(key), small:true, say:V.tpl('q',{k:wantClosed ? 'findclosed' : 'findopen'}), ans:'g', layout:'wide', cap:'',
        opts:ids.map(function(i){ return { v:i, h:pill(svg(map[i])) }; }),
        hintSay:['f:sh_' + key], hintExpr:nameCard(key), hint:hintShape(key, good)
      });
    }

    /* ⭐: по названию найти рисунок (точка, прямая, кривая, ломаная) */
    function L1(){ var k = pick(['tochka','pryamaya','krivaya','lomanaya']); return findTask('f'+k+rnd(1,9), k, ['tochka','pryamaya','krivaya','lomanaya','otrezok']); }
    /* ⭐⭐: все 7 понятий + «что это?» */
    function L2(){ var k = pick(CORE); return Math.random() < .6 ? findTask('F'+k+rnd(1,9), k) : nameTask('n'+k+rnd(1,9), k); }
    /* ⭐⭐⭐: замкнутая / незамкнутая, всё вперемешку */
    function L3(){
      var t = pick(['closed','open','name','find']);
      if(t === 'closed') return closedTask('c'+rnd(1,99), true);
      if(t === 'open') return closedTask('o'+rnd(1,99), false);
      var k = pick(CORE); return t === 'name' ? nameTask('N'+k+rnd(1,9), k) : findTask('G'+k+rnd(1,9), k);
    }

    M.run({ root:containerId, key:'shapes', need:10, theme:'sky', levels:[L1,L2,L3] });
  });
}
