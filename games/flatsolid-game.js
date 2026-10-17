/* ===== Білім Аралы — «Плоская или пространственная: Игрушечная комната» (v3) =====
   Математика, 1 класс (цель 1.3.1.2 приказа №399): плоские и пространственные фигуры, предметы вокруг. Уровни: предмет → фигура (круг, квадрат, треугольник, прямоугольник / шар, куб, цилиндр, конус) → разложи по корзинам.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'play',icons:['⚽','🟦','🎁']};
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
function initFlatSolidGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function lg(){ return document.documentElement.getAttribute('data-current') || 'ru'; }
    function tr(o){ var l = lg(); return o[l] || o.en; }
    function msgs(){ return (typeof translations !== 'undefined' && translations[lg()]) ? translations[lg()] : {}; }

    /* Предметы из программы (10 штук) + геометрические фигуры: плоские — круг, квадрат, треугольник, прямоугольник; объёмные — шар, куб, цилиндр, конус */
    var EM_ITEMS = [['📖','flat'],['🍕','flat'],['🍪','flat'],['🎫','flat'],['🚩','flat'],['🎲','solid'],['⚽','solid'],['🥫','solid'],['🍦','solid'],['🎁','solid']];
    var FIG = {
      flat:['circle','square','triangle','rectangle'],
      solid:['sphere','cube','cylinder','cone']
    };
    var FNAME = {
      circle:{ru:'Круг',kz:'Дөңгелек',en:'Circle',zh:'圆'}, square:{ru:'Квадрат',kz:'Шаршы',en:'Square',zh:'正方形'}, triangle:{ru:'Треугольник',kz:'Үшбұрыш',en:'Triangle',zh:'三角形'}, rectangle:{ru:'Прямоугольник',kz:'Төртбұрыш',en:'Rectangle',zh:'长方形'},
      sphere:{ru:'Шар',kz:'Шар',en:'Sphere',zh:'球'}, cube:{ru:'Куб',kz:'Куб',en:'Cube',zh:'立方体'}, cylinder:{ru:'Цилиндр',kz:'Цилиндр',en:'Cylinder',zh:'圆柱'}, cone:{ru:'Конус',kz:'Конус',en:'Cone',zh:'圆锥'}
    };
    var BASK = { flat:{ru:'Плоские',kz:'Жазық',en:'Flat',zh:'平面'}, solid:{ru:'Пространственные',kz:'Көлемді',en:'Solid',zh:'立体'} };
    var HINTTXT = {
      flat:{ru:'Плоская: как рисунок на бумаге',kz:'Жазық: қағаздағы сурет сияқты',en:'Flat: like a drawing on paper',zh:'平面：像纸上的图画'},
      solid:{ru:'Пространственная: её можно взять в руки',kz:'Көлемді: оны қолға алуға болады',en:'Solid: you can hold it in your hands',zh:'立体：可以拿在手里'}
    };
    function btnName(k){ var m = msgs(); return k === 'flat' ? (m.btn_flat || tr(BASK.flat)) : (m.btn_solid || tr(BASK.solid)); }

    (function(){
      if(document.getElementById('mxf-css')) return;
      var s = document.createElement('style'); s.id = 'mxf-css';
      s.textContent = ''
      + '.mxs .mxs-balloon.wide{width:150px;}'
      + '.mxf-shelf{display:flex;align-items:center;justify-content:center;width:150px;height:130px;border-radius:26px;background:rgba(255,255,255,.78);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.8rem;animation:mxIn .4s backwards;}'
      + '.mxf-shelf svg{width:96px;height:96px;}'
      + '.mxf-pill{display:flex;align-items:center;justify-content:center;}.mxf-pill svg{width:56px;height:56px;}'
      + '.mxs-balloon.wide .b .nm{font-size:.9rem;line-height:1.1;padding:0 6px;text-align:center;}'
      + '.mxf-card{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.15rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;}'
      + '.mxf-card .e{font-size:2.4rem;line-height:1;}.mxf-card svg{width:46px;height:46px;}'
      /* сортировка */
      + '.mxf-sort{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(100%,330px);}'
      + '.mxf-items{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;min-height:70px;}'
      + '.mxf-it{width:64px;height:64px;border-radius:18px;border:3px solid transparent;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.18);font-size:2.2rem;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
      + '.mxf-it svg{width:46px;height:46px;}'
      + '.mxf-it.sel{border-color:#FFB400;transform:translateY(-6px) scale(1.08);box-shadow:0 10px 0 rgba(0,0,0,.2);}'
      + '.mxf-bks{display:flex;gap:12px;width:100%;}'
      + '.mxf-bk{flex:1;min-height:104px;border-radius:20px;border:none;padding:6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;font:800 .95rem/1.1 "Baloo 2",sans-serif;color:#fff;box-shadow:inset 0 -6px 0 rgba(0,0,0,.16),0 5px 0 rgba(0,0,0,.2);}'
      + '.mxf-bk.flat{background:linear-gradient(#5EC7FF,#2F9BE6);}.mxf-bk.solid{background:linear-gradient(#FF9A5E,#E8672F);}'
      + '.mxf-bk .t{font-size:1.5rem;line-height:1;}.mxf-bk .got{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;}'
      + '.mxf-bk .got span{background:#fff;border-radius:10px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;animation:mxIn .3s;}'
      + '.mxf-bk .got span svg{width:26px;height:26px;}'
      + '@media (prefers-reduced-motion:reduce){.mxf-shelf,.mxf-it{animation:none}}';
      document.head.appendChild(s);
    })();

    var PAL = [['#FF8C42','#C25E12'],['#3FA7FF','#1F6FB5'],['#33C28A','#1B8A5F'],['#FFB400','#C28300'],['#C77DFF','#8A45C8'],['#FF6B9C','#C73F6E']];
    function fig(name){
      var id = 'g' + rnd(1, 99999), c = pick(PAL), a = c[0], d = c[1], sh = '<ellipse cx="40" cy="73" rx="24" ry="4" fill="rgba(0,0,0,.2)"/>', b;
      if(name === 'circle') b = '<circle cx="40" cy="40" r="29" fill="' + a + '" stroke="' + d + '" stroke-width="3"/>';
      else if(name === 'square') b = '<rect x="13" y="13" width="54" height="54" rx="4" fill="' + a + '" stroke="' + d + '" stroke-width="3"/>';
      else if(name === 'triangle') b = '<polygon points="40,10 71,66 9,66" fill="' + a + '" stroke="' + d + '" stroke-width="3" stroke-linejoin="round"/>';
      else if(name === 'rectangle') b = '<rect x="6" y="21" width="68" height="40" rx="4" fill="' + a + '" stroke="' + d + '" stroke-width="3"/>';
      else if(name === 'sphere') b = sh + '<defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="' + a + '"/><stop offset="1" stop-color="' + d + '"/></radialGradient></defs><circle cx="40" cy="38" r="29" fill="url(#' + id + ')"/>';
      else if(name === 'cube') b = sh + '<polygon points="40,8 68,22 40,36 12,22" fill="' + a + '"/><polygon points="12,22 40,36 40,68 12,54" fill="' + d + '" opacity=".78"/><polygon points="40,36 68,22 68,54 40,68" fill="' + d + '"/><polygon points="40,8 68,22 40,36 12,22" fill="#fff" opacity=".28"/>';
      else if(name === 'cylinder') b = sh + '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="' + d + '"/><stop offset=".45" stop-color="' + a + '"/><stop offset="1" stop-color="' + d + '"/></linearGradient></defs><path d="M16 18 V60 A24 9 0 0 0 64 60 V18 Z" fill="url(#' + id + ')"/><ellipse cx="40" cy="18" rx="24" ry="9" fill="' + a + '"/><ellipse cx="40" cy="18" rx="24" ry="9" fill="#fff" opacity=".35"/>';
      else b = sh + '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="' + d + '"/><stop offset=".4" stop-color="' + a + '"/><stop offset="1" stop-color="' + d + '"/></linearGradient></defs><path d="M40 6 L66 60 A26 9 0 0 1 14 60 Z" fill="url(#' + id + ')"/>';
      return '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">' + b + '</svg>';
    }
    function figItem(name, cls){ return { h:fig(name), k:(FIG.flat.indexOf(name) >= 0 ? 'flat' : 'solid'), name:name }; }

    function shelf(h){ return function(el){ el.innerHTML = '<div class="mxf-shelf">' + h + '</div>'; }; }
    function twoOpts(){ return shuffle(['flat','solid']).map(function(k){ return { v:k, h:'<span class="nm">' + btnName(k) + '</span>' }; }); }
    function hintClass(h, k, name){
      return function(el){
        el.innerHTML = '<div class="mxf-card"><span class="e">' + h + '</span><span>→</span><span>' + btnName(k) + '</span></div>'
          + (name ? '<div class="mxf-card">' + tr(FNAME[name]) + '</div>' : '') + '<div class="mxf-card">' + tr(HINTTXT[k]) + '</div>';
      };
    }

    function classTask(sig, h, k, name){
      return S(sig, {
        expr:'', say:V.tpl('q',{k:'flatq'}), ans:k, layout:'wide', opts:twoOpts(), field:shelf(h),
        hintSay:['f:' + (k === 'flat' ? 'flatsay' : 'solidsay')], hintExpr:'', hint:hintClass(h, k, name)
      });
    }
    function findTask(wantK, name){
      var other = wantK === 'flat' ? 'solid' : 'flat', set = [name], icons = {};
      shuffle(FIG[other]).slice(0, 3).forEach(function(n){ set.push(n); });
      set = shuffle(set);
      set.forEach(function(n){ icons[n] = fig(n); });
      return S('f' + wantK + name, {
        expr:'', say:V.tpl('q',{k:wantK === 'flat' ? 'findflat' : 'findsolid'}), ans:name, layout:'wide',
        opts:set.map(function(n){ return { v:n, h:'<span class="mxf-pill">' + icons[n] + '</span>' }; }),
        hintSay:['f:' + (wantK === 'flat' ? 'flatsay' : 'solidsay')], hintExpr:'', hint:hintClass(icons[name], wantK, name)
      });
    }
    /* сортировка по корзинам: нажми предмет, потом корзину */
    function sortTask(items){
      var key = items.map(function(i){ return i.id; }).join('');
      return S('s' + key, {
        expr:'', say:V.tpl('q',{k:'sortq'}), ans:'ok', gate:false,
        field:function(el, X, task){
          var left = items.length, sel = null, cards = [];
          el.innerHTML = '<div class="mxf-sort"><div class="mxf-items"></div><div class="mxf-bks">'
            + ['flat','solid'].map(function(k){ return '<button type="button" class="mxf-bk ' + k + '" data-k="' + k + '"><span class="t">' + (k === 'flat' ? '📄' : '🧊') + '</span><span>' + tr(BASK[k]) + '</span><div class="got"></div></button>'; }).join('') + '</div></div>';
          var row = el.querySelector('.mxf-items');
          items.forEach(function(it, i){
            var b = document.createElement('button'); b.type = 'button'; b.className = 'mxf-it'; b.innerHTML = it.h; b.style.animationDelay = (i*.06) + 's'; b._it = it;
            b.addEventListener('click', function(){ if(task._done || b._placed) return; cards.forEach(function(c){ c.classList.remove('sel'); }); sel = b; b.classList.add('sel'); X.sfx.tap(i + 1); });
            row.appendChild(b); cards.push(b);
          });
          function drop(k, b){
            if(task._done || !b || b._placed) return;
            if(b._it.k !== k){ task._done = true; X.sfx.tap(1); task.submit('no', b); return; }
            b._placed = true; b.classList.remove('sel'); sel = null;
            var bk = el.querySelector('.mxf-bk.' + k + ' .got'), sp = document.createElement('span'); sp.innerHTML = b._it.h; bk.appendChild(sp); b.style.visibility = 'hidden';
            X.sfx.drop(); left--;
            if(left === 0){ task._done = true; X.sleep(450).then(function(ok){ if(ok) task.submit('ok', bk); }); }
          }
          [].slice.call(el.querySelectorAll('.mxf-bk')).forEach(function(bk){ bk.addEventListener('click', function(){ if(sel) drop(bk.getAttribute('data-k'), sel); }); });
          task.auto = function(wrong){
            var rem = cards.filter(function(c){ return !c._placed; });
            if(wrong){ var c0 = rem[0]; drop(c0._it.k === 'flat' ? 'solid' : 'flat', c0); return; }
            rem.forEach(function(c){ drop(c._it.k, c); });
          };
        },
        hintSay:['f:flatsay'], hintExpr:'',
        hint:function(el){
          function col(k){ return '<div class="mxf-card" style="flex-direction:column;gap:4px;"><b>' + (k === 'flat' ? '📄 ' : '🧊 ') + tr(BASK[k]) + '</b><div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">' + items.filter(function(i){ return i.k === k; }).map(function(i){ return '<span class="e" style="font-size:1.9rem;display:inline-flex;width:40px;height:40px;align-items:center;justify-content:center;">' + i.h + '</span>'; }).join('') + '</div></div>'; }
          el.innerHTML = '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">' + col('flat') + col('solid') + '</div>';
          el.querySelectorAll('svg').forEach(function(s){ s.style.width = '34px'; s.style.height = '34px'; });
        }
      });
    }

    var uid = 0;
    function emItem(p){ return { h:p[0], k:p[1], id:p[0] }; }
    function figIt(n){ var f = figItem(n); f.id = n; return f; }

    /* ⭐: предмет из жизни — плоский или пространственный */
    function L1(){ var p = pick(EM_ITEMS); return classTask('c' + p[0], p[0], p[1]); }
    /* ⭐⭐: фигуры: найди плоскую / пространственную; «какая это?» */
    function L2(){
      var k = pick(['flat','solid']), n = pick(FIG[k]);
      if(Math.random() < .55) return findTask(k, n);
      var h = fig(n); return classTask('d' + n + rnd(1, 99), h, k, n);
    }
    /* ⭐⭐⭐: разложи 4 предмета по корзинам */
    function L3(){
      var pool = [];
      EM_ITEMS.forEach(function(p){ pool.push(emItem(p)); });
      ['circle','square','triangle','rectangle','sphere','cube','cylinder','cone'].forEach(function(n){ pool.push(figIt(n)); });
      var nf = pick([1, 2, 2, 3]), flats = shuffle(pool.filter(function(i){ return i.k === 'flat'; })).slice(0, nf), solids = shuffle(pool.filter(function(i){ return i.k === 'solid'; })).slice(0, 4 - nf);
      return sortTask(shuffle(flats.concat(solids)));
    }

    M.run({ root:containerId, key:'flatsolid', need:10, theme:'play', levels:[L1,L2,L3] });
  });
}
