/* ===== Білім Аралы — «Чем измеряем? Мастерская Барсика» (v3) =====
   Математика, 1 класс (цели 1.1.3.1, 1.1.3.2 приказа №399): длина, масса, объём; линейка, весы, мерный стакан; единицы см, дм, кг, л. Уровни: какая величина → чем и в чём измеряем → измеряем сами (линейка, весы, кувшин).
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'workshop',icons:['📏','⚖️','🥛']};
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
function initMeasureGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(parts){ return M.exprHtml(parts); }
    var OK = M.OKV;
    function lg(){ return document.documentElement.getAttribute('data-current') || 'ru'; }
    function tr(o){ var l = lg(); return o[l] || o.en; }
    function msgs(){ return (typeof translations !== 'undefined' && translations[lg()]) ? translations[lg()] : {}; }

    /* Ровно 6 предметов из программы (длина: карандаш, книга; масса: яблоко, арбуз; объём: бутылка, стакан) */
    var ITEMS = [['✏️','length'],['📖','length'],['🍎','mass'],['🍉','mass'],['🍾','volume'],['🥤','volume']];
    var CAT = { length:'📏', mass:'⚖️', volume:'🥛' };
    var CATN = { length:{ru:'Длина (см)',kz:'Ұзындық (см)',en:'Length (cm)',zh:'长度（厘米）'}, mass:{ru:'Масса (кг)',kz:'Масса (кг)',en:'Mass (kg)',zh:'质量（千克）'}, volume:{ru:'Объём (л)',kz:'Көлем (л)',en:'Volume (L)',zh:'体积（升）'} };
    var INST = {
      length:{ ic:'📏', n:{ru:'Линейка',kz:'Сызғыш',en:'Ruler',zh:'尺子'} },
      mass:{ ic:'⚖️', n:{ru:'Весы',kz:'Таразы',en:'Scales',zh:'秤'} },
      volume:{ ic:'🥛', n:{ru:'Мерный стакан',kz:'Өлшеу стақаны',en:'Measuring cup',zh:'量杯'} }
    };
    var UNIT = { length:{ru:'см',kz:'см',en:'cm',zh:'厘米'}, mass:{ru:'кг',kz:'кг',en:'kg',zh:'千克'}, volume:{ru:'л',kz:'л',en:'L',zh:'升'} };
    function catName(c){ var m = msgs(); return m['measure_' + c] || tr(CATN[c]); }

    (function(){
      if(document.getElementById('mxm-css')) return;
      var s = document.createElement('style'); s.id = 'mxm-css';
      s.textContent = ''
      + '.mxs .mxs-balloon.wide{width:150px;}'
      + '.mxm-shelf{display:flex;align-items:center;justify-content:center;width:150px;height:130px;border-radius:26px;background:rgba(255,255,255,.75);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);font-size:4.8rem;animation:mxIn .4s backwards;}'
      + '.mxm-o{display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05;gap:1px;}'
      + '.mxm-o i{font-style:normal;font-size:1.7rem;}.mxm-o b{font:800 .88rem "Baloo 2",sans-serif;padding:0 6px;text-align:center;}'
      + '.mxs-balloon.wide .b .mxm-u{font-size:1.9rem;}'
      + '.mxm-card{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.3rem "Baloo 2",sans-serif;color:#25324A;}'
      + '.mxm-card .e{font-size:2.6rem;}'
      /* линейка */
      + '.mxm-ruler{position:relative;width:300px;height:112px;}'
      + '.mxm-rl{position:absolute;left:0;top:58px;width:300px;height:48px;border-radius:8px;background:linear-gradient(#FFE9A8,#FFD76A);box-shadow:0 4px 0 rgba(0,0,0,.2);}'
      + '.mxm-rl i{position:absolute;top:0;width:2px;height:15px;background:#5A4300;margin-left:-1px;}'
      + '.mxm-rl i.h{height:9px;opacity:.7;}'
      + '.mxm-rl b{position:absolute;top:17px;width:24px;margin-left:-12px;text-align:center;font:800 .95rem "Baloo 2",sans-serif;color:#5A4300;}'
      + '.mxm-pencil{position:absolute;top:18px;height:32px;border-radius:6px 0 0 6px;background:linear-gradient(#FFE04A 0 30%,#F2B90F 30% 70%,#E0A500 70%);box-shadow:0 3px 0 rgba(0,0,0,.18);}'
      + '.mxm-pencil:before{content:"";position:absolute;left:0;top:0;bottom:0;width:11px;border-radius:6px 0 0 6px;background:#FF8FA3;}'
      + '.mxm-pencil:after{content:"";position:absolute;right:-17px;top:0;border-left:17px solid #F6D7A6;border-top:16px solid transparent;border-bottom:16px solid transparent;filter:drop-shadow(0 3px 0 rgba(0,0,0,.14));}'
      + '.mxm-book{position:absolute;top:16px;height:36px;border-radius:5px;background:linear-gradient(90deg,#B83A3A 0 8px,#E65A5A 8px);box-shadow:0 3px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:1.4rem;}'
      + '.mxm-dm{position:absolute;top:22px;height:28px;border:3px solid #25324A;border-bottom:none;border-radius:6px 6px 0 0;text-align:center;font:800 1.1rem/22px "Baloo 2",sans-serif;color:#25324A;background:rgba(255,255,255,.5);}'
      /* весы */
      + '.mxm-bal{position:relative;width:300px;height:190px;}'
      + '.mxm-beam{position:absolute;left:24px;right:24px;top:20px;height:9px;border-radius:5px;background:#6B4A2B;}'
      + '.mxm-post{position:absolute;left:50%;margin-left:-6px;top:20px;width:12px;height:150px;border-radius:6px;background:#6B4A2B;}'
      + '.mxm-base{position:absolute;left:50%;margin-left:-44px;bottom:0;width:88px;height:14px;border-radius:8px;background:#4D3420;}'
      + '.mxm-side{position:absolute;top:32px;width:118px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;}'
      + '.mxm-side:before{content:"";position:absolute;left:12px;right:12px;top:-2px;bottom:16px;border:2px solid rgba(80,58,30,.55);border-bottom:none;border-radius:60px 60px 0 0;}'
      + '.mxm-pan{width:116px;height:16px;border-radius:0 0 60px 60px/0 0 16px 16px;background:linear-gradient(#9AA6BA,#6E7B93);position:relative;z-index:1;}'
      + '.mxm-it{font-size:3rem;line-height:1;position:relative;z-index:1;margin-bottom:-2px;}'
      + '.mxm-ws{display:flex;flex-wrap:wrap-reverse;justify-content:center;gap:3px;width:104px;position:relative;z-index:1;margin-bottom:-1px;}'
      + '.mxm-w{width:32px;height:24px;border-radius:5px;background:linear-gradient(#6F7F9C,#4C5B77);color:#fff;font:800 .72rem/24px "Baloo 2",sans-serif;text-align:center;box-shadow:0 2px 0 rgba(0,0,0,.25);animation:mxIn .3s backwards;}'
      /* мерный кувшин */
      + '.mxm-jug{display:block;width:160px;height:210px;animation:mxIn .4s backwards;}'
      + '@media (prefers-reduced-motion:reduce){.mxm-shelf,.mxm-w,.mxm-jug{animation:none}}';
      document.head.appendChild(s);
    })();

    /* ---------- картинки ---------- */
    var U = 27, X0 = 12;
    function rulerHtml(kind, N, label){
      var t = '';
      for(var i = 0; i <= 10; i++){
        t += '<i style="left:' + (X0 + i*U) + 'px"></i><b style="left:' + (X0 + i*U) + 'px">' + i + '</b>';
        if(i < 10) t += '<i class="h" style="left:' + (X0 + i*U + U/2) + 'px"></i>';
      }
      var obj = '';
      if(kind === 'pencil') obj = '<div class="mxm-pencil" style="left:' + X0 + 'px;width:' + (N*U) + 'px"></div>';
      else if(kind === 'book') obj = '<div class="mxm-book" style="left:' + X0 + 'px;width:' + (N*U) + 'px">📖</div>';
      else if(kind === 'dm') obj = '<div class="mxm-dm" style="left:' + X0 + 'px;width:' + (10*U) + 'px">1 ' + (label || 'дм') + '</div>';
      return '<div class="mxm-ruler">' + obj + '<div class="mxm-rl">' + t + '</div></div>';
    }
    function weights(n){ var h = ''; for(var i = 0; i < n; i++) h += '<span class="mxm-w" style="animation-delay:' + (i*.05) + 's">1 ' + tr(UNIT.mass) + '</span>'; return '<div class="mxm-ws">' + h + '</div>'; }
    function scaleHtml(em, n){
      return '<div class="mxm-bal"><div class="mxm-beam"></div><div class="mxm-post"></div><div class="mxm-base"></div>'
        + '<div class="mxm-side" style="left:12px"><div class="mxm-it">' + em + '</div><div class="mxm-pan"></div></div>'
        + '<div class="mxm-side" style="right:12px">' + weights(n) + '<div class="mxm-pan"></div></div></div>';
    }
    function jugHtml(n, mark){
      var y0 = 186, st = 30, top = y0 - 5*st, w = y0 - n*st, id = 'jg' + rnd(1, 99999), ticks = '';
      for(var k = 1; k <= 5; k++){
        var y = y0 - k*st;
        ticks += '<line x1="38" y1="' + y + '" x2="' + (k === 5 ? 70 : 62) + '" y2="' + y + '" stroke="#5A6B85" stroke-width="2.4"/><text x="30" y="' + (y + 5) + '" text-anchor="end" font-family="Baloo 2,sans-serif" font-weight="800" font-size="15" fill="#25324A">' + k + '</text>';
      }
      var wl = mark ? '<text x="145" y="' + (w + 5) + '" font-family="Baloo 2,sans-serif" font-weight="800" font-size="16" fill="#1FA672">' + n + ' ' + tr(UNIT.volume) + '</text>' : '';
      return '<svg class="mxm-jug" viewBox="0 0 160 210"><defs><clipPath id="' + id + '"><path d="M40 ' + top + ' H110 V' + (y0 - 6) + ' Q110 ' + y0 + ' 104 ' + y0 + ' H46 Q40 ' + y0 + ' 40 ' + (y0 - 6) + ' Z"/></clipPath></defs>'
        + '<path d="M110 ' + (top + 30) + ' Q144 ' + (top + 30) + ' 144 ' + (top + 70) + ' Q144 ' + (top + 110) + ' 110 ' + (top + 110) + '" fill="none" stroke="#9FB4CC" stroke-width="9" stroke-linecap="round"/>'
        + '<path d="M40 ' + top + ' H110 V' + (y0 - 6) + ' Q110 ' + y0 + ' 104 ' + y0 + ' H46 Q40 ' + y0 + ' 40 ' + (y0 - 6) + ' Z" fill="#EAF6FF" stroke="#9FB4CC" stroke-width="4"/>'
        + '<g clip-path="url(#' + id + ')"><rect x="38" y="' + w + '" width="74" height="' + (y0 - w + 4) + '" fill="#3FA7FF" opacity=".85"/><rect x="38" y="' + w + '" width="74" height="5" fill="#8CD0FF"/></g>'
        + ticks + wl + '</svg>';
    }
    function shelf(em){ return function(el){ el.innerHTML = '<div class="mxm-shelf">' + em + '</div>'; }; }
    function hintCat(em, c){
      return function(el){ el.innerHTML = '<div class="mxm-card"><span class="e">' + em + '</span><span>→</span><span class="e">' + CAT[c] + '</span></div><div class="mxm-card">' + catName(c) + '</div>'; };
    }
    function catOpts(){ return shuffle(['length','mass','volume']).map(function(c){ return { v:c, h:'<span class="mxm-o"><i>' + CAT[c] + '</i><b>' + catName(c) + '</b></span>' }; }); }

    /* ---------- задания ---------- */
    function catTask(it){
      return S('c' + it[0], {
        expr:'', say:V.tpl('q',{k:'measq'}), ans:it[1], layout:'wide', opts:catOpts(), field:shelf(it[0]),
        hintSay:['f:m_' + it[1]], hintExpr:'', hint:hintCat(it[0], it[1])
      });
    }
    function instTask(it){
      var o = shuffle(['length','mass','volume']).map(function(c){ return { v:c, h:'<span class="mxm-o"><i>' + INST[c].ic + '</i><b>' + tr(INST[c].n) + '</b></span>' }; });
      return S('i' + it[0], {
        expr:'', say:V.tpl('q',{k:'instq'}), ans:it[1], layout:'wide', opts:o, field:shelf(it[0]),
        hintSay:['f:m_' + it[1]], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxm-card"><span class="e">' + it[0] + '</span><span>→</span><span class="e">' + INST[it[1]].ic + '</span></div><div class="mxm-card">' + tr(INST[it[1]].n) + ' · ' + tr(UNIT[it[1]]) + '</div>'; }
      });
    }
    function unitTask(it){
      var o = shuffle(['length','mass','volume']).map(function(c){ return { v:c, h:'<span class="mxm-u">' + tr(UNIT[c]) + '</span>' }; });
      return S('u' + it[0], {
        expr:'', say:V.tpl('q',{k:'unitq'}), ans:it[1], layout:'wide', opts:o, field:shelf(it[0]),
        hintSay:['f:m_' + it[1]], hintExpr:'',
        hint:function(el){ el.innerHTML = '<div class="mxm-card"><span class="e">' + it[0] + '</span><span>→</span><span>' + catName(it[1]) + '</span></div>'; }
      });
    }
    function numOptsFor(n, lo, hi){ return M.numOpts(n, lo, hi, [n - 1, n + 1, n + 2]); }
    function rulerTask(kind, n){
      var em = kind === 'pencil' ? '✏️' : '📖';
      return S('r' + kind + n, {
        expr:'', say:V.tpl('q',{k:'cmq'}), ans:String(n), opts:numOptsFor(n, 1, 10),
        field:function(el){ el.innerHTML = rulerHtml(kind, n); },
        hintSay:['f:result', n], hintExpr:eqs([OK(n + ' ' + tr(UNIT.length))]),
        hint:function(el){ el.innerHTML = rulerHtml(kind, n) + '<div class="mxs-expr s">' + eqs([OK(n + ' ' + tr(UNIT.length))]) + '</div>'; }
      });
    }
    function scaleTask(em, n){
      return S('s' + em + n, {
        expr:'', say:V.tpl('q',{k:'kgq'}), ans:String(n), opts:numOptsFor(n, 1, 9),
        field:function(el){ el.innerHTML = scaleHtml(em, n); },
        hintSay:['f:result', n], hintExpr:eqs([OK(n + ' ' + tr(UNIT.mass))]),
        hint:function(el){ el.innerHTML = scaleHtml(em, n) + '<div class="mxs-expr s">' + eqs([OK(n + ' ' + tr(UNIT.mass))]) + '</div>'; }
      });
    }
    function jugTask(n){
      return S('j' + n + rnd(1, 9), {
        expr:'', say:V.tpl('q',{k:'lq'}), ans:String(n), opts:numOptsFor(n, 1, 5),
        field:function(el){ el.innerHTML = jugHtml(n, false); },
        hintSay:['f:result', n], hintExpr:eqs([OK(n + ' ' + tr(UNIT.volume))]),
        hint:function(el){ el.innerHTML = jugHtml(n, true); }
      });
    }
    function dmTask(){
      return S('dm', {
        expr:'', say:V.tpl('q',{k:'dmq'}), ans:'10', opts:[{v:'10',h:'10'},{v:'1',h:'1'},{v:'5',h:'5'},{v:'100',h:'100'}].sort(function(a, b){ return Math.random() - .5; }),
        field:function(el){ el.innerHTML = rulerHtml('dm', 10, tr({ru:'дм',kz:'дм',en:'dm',zh:'分米'})); },
        hintSay:['f:result', 10], hintExpr:eqs(['1 ' + tr({ru:'дм',kz:'дм',en:'dm',zh:'分米'}), OK('='), OK('10 ' + tr(UNIT.length))]),
        hint:function(el){ el.innerHTML = rulerHtml('dm', 10, tr({ru:'дм',kz:'дм',en:'dm',zh:'分米'})) + '<div class="mxs-expr s">' + eqs(['1 ' + tr({ru:'дм',kz:'дм',en:'dm',zh:'分米'}), OK('='), OK('10 ' + tr(UNIT.length))]) + '</div>'; }
      });
    }

    /* ⭐: какая это величина — длина, масса или объём */
    function L1(){ return catTask(pick(ITEMS)); }
    /* ⭐⭐: чем измеряем (линейка / весы / мерный стакан) и в чём (см, кг, л) */
    function L2(){ var it = pick(ITEMS); return Math.random() < .5 ? instTask(it) : unitTask(it); }
    /* ⭐⭐⭐: измеряем сами: линейка (см), весы (кг), мерный кувшин (л), 1 дм = 10 см */
    function L3(){
      var t = pick(['ruler','ruler','scale','scale','jug','jug','dm','unit']);
      if(t === 'ruler'){ var k = pick(['pencil','book']); return rulerTask(k, rnd(2, 10)); }
      if(t === 'scale') return scaleTask(pick(['🍎','🍉']), rnd(1, 9));
      if(t === 'jug') return jugTask(rnd(1, 5));
      if(t === 'dm') return dmTask();
      return unitTask(pick(ITEMS));
    }

    M.run({ root:containerId, key:'measure', need:10, theme:'workshop', levels:[L1,L2,L3] });
  });
}
