/* ===== Білім Аралы — «Периметр: Забор для грядки» (v3) =====
   Математика, 2 класс (цель 2.3.1.3 приказа №399): периметр прямоугольника, квадрата, треугольника; формулы P=(a+b)·2, P=a·4, P=a+b+c.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'garden', icons:['🌷','📏','🔲']};
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

function initPerimeterGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, V = MXV, rnd = M.rnd, pick = M.pick, OK = M.OKV, Q = M.Q(), QB = M.QB();
    function S(sig, t){ t.sig = sig; return t; }
    function eqs(p){ return M.exprHtml(p); }
    function lab(x, y, t){ return t === '' ? '' : '<g><rect x="' + (x - 17) + '" y="' + (y - 12) + '" width="34" height="22" rx="8" fill="#fff" stroke="#8A5E36" stroke-width="2"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="15" fill="' + (t === '?' ? '#FF6B5B' : '#25324A') + '">' + t + '</text></g>'; }
    // грядка-огород с забором; sides — подписи сторон (или '' = скрыть)
    function plot(kind, s, mid){
      var body, L;
      if(kind === 'tri'){
        body = '<polygon points="110,18 196,128 24,128" fill="#BDEBA0" stroke="#8A5E36" stroke-width="7" stroke-dasharray="11 5" stroke-linejoin="round"/>';
        L = lab(168, 68, s[1]) + lab(52, 68, s[0]) + lab(110, 142, s[2]);
        mid = mid || '🌷';
      } else {
        var w = kind === 'sq' ? 100 : 150, h = kind === 'sq' ? 100 : 90, x0 = (220 - w)/2, y0 = 26;
        body = '<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="6" fill="#BDEBA0" stroke="#8A5E36" stroke-width="7" stroke-dasharray="11 5"/>';
        L = lab(110, y0, s[0]) + lab(x0 + w, y0 + h/2, s[1]) + lab(110, y0 + h, s[2]) + lab(x0, y0 + h/2, s[3]);
      }
      return '<svg viewBox="0 0 220 160" width="200" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 5px 0 rgba(0,0,0,.12))">' + body + '<text x="110" y="' + (kind === 'tri' ? 104 : 84) + '" text-anchor="middle" font-size="' + (mid && mid.length > 3 ? 18 : 30) + '" font-family="Baloo 2,sans-serif" font-weight="800" fill="#25324A">' + (mid || '🥕') + '</text>' + L + '</svg>';
    }
    function opts(r){ var c = [r]; [r + 2, r - 2, r + 4, r - 4, r + 1, r - 1, r + 6].forEach(function(x){ if(x > 3 && c.indexOf(x) < 0 && c.length < 4) c.push(x); }); return M.shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function shapeData(kind){
      var a, b, c, sides, P, f;
      if(kind === 'rect'){ a = rnd(3, 12); do { b = rnd(2, 9); } while(b === a); sides = [a, b, a, b]; P = (a + b)*2; f = '(' + a + ' + ' + b + ') × 2'; }
      else if(kind === 'sq'){ a = rnd(2, 12); sides = [a, a, a, a]; P = a*4; f = a + ' × 4'; }
      else { do { a = rnd(3, 10); b = rnd(3, 10); c = rnd(3, 10); } while(a + b <= c || a + c <= b || b + c <= a); sides = [a, b, c]; P = a + b + c; f = a + ' + ' + b + ' + ' + c; }
      return { kind:kind, sides:sides, P:P, f:f, a:a, b:b, c:c };
    }
    function hintP(d){
      var nm = d.kind === 'rect' ? 'прямоугольника' : d.kind === 'sq' ? 'квадрата' : 'треугольника';
      var txt = d.kind === 'rect' ? 'P = (a + b) × 2<br>P = ' + d.f + ' = <b>' + d.P + '</b>' : d.kind === 'sq' ? 'P = a × 4<br>P = ' + d.f + ' = <b>' + d.P + '</b>' : 'P = a + b + c<br>P = ' + d.f + ' = <b>' + d.P + '</b>';
      return { hintExpr:eqs(['P', '=', OK(d.P)]), hintSay:[G.say('Периметр — это сумма длин всех сторон. Периметр ' + nm + ' равен ' + d.P + '.')], hint:G.hintCard(plot(d.kind, d.sides.map(String)), txt) };
    }
    function full(d){ return d.sides.map(String); }
    function partial(d){ return d.kind === 'rect' ? [String(d.a), String(d.b), '', ''] : d.kind === 'sq' ? [String(d.a), '', '', ''] : full(d); }

    /* ⭐ обойди забор: нажимай на стороны и считай длину */
    function L1(){
      var d = shapeData(pick(['rect', 'sq', 'tri']));
      return S('1' + d.kind + d.sides.join(''), Object.assign(G.tapSum({ pre:plot(d.kind, full(d)), expr:'', q:'Сколько метров забора нужно? Нажимай на стороны', say:[G.say('Сколько метров забора нужно, чтобы огородить грядку? Нажимай на каждую сторону и считай.')],
        units:d.sides.map(function(x, i){ return { h:'<span class="e">🪵</span>' + x + ' м', val:x }; }), opts:opts(d.P), ans:d.P, suffix:' м' }), hintP(d)));
    }
    /* ⭐⭐ видны не все стороны: противоположные равны */
    function L2(){
      var d = shapeData(pick(['rect', 'rect', 'sq', 'tri']));
      return S('2' + d.kind + d.sides.join(''), Object.assign({ expr:'', cap:d.kind === 'rect' ? 'Периметр прямоугольника? Противоположные стороны равны' : d.kind === 'sq' ? 'Периметр квадрата? Все стороны равны' : 'Найди периметр', say:[G.say(d.kind === 'rect' ? 'Найди периметр прямоугольника. Противоположные стороны равны.' : d.kind === 'sq' ? 'Найди периметр квадрата. У квадрата все стороны равны.' : 'Найди периметр треугольника.')],
        ans:String(d.P), opts:opts(d.P), field:function(el){ el.innerHTML = plot(d.kind, partial(d), 'P = ?'); } }, hintP(d)));
    }
    /* ⭐⭐⭐ формулы, задачи, сравнение */
    function L3(){
      var k = pick(['formula', 'word', 'word', 'cmp']), d;
      if(k === 'formula'){
        var kind = pick(['rect', 'sq']); d = shapeData(kind);
        var good = kind === 'rect' ? 'P = (a + b) × 2' : 'P = a × 4', bad = kind === 'rect' ? ['P = a × b', 'P = a + b', 'P = a × 4'] : ['P = a × a', 'P = a + 4', 'P = (a + b) × 2'];
        return S('3f' + kind, Object.assign(G.choice({ q:kind === 'rect' ? 'Как найти периметр прямоугольника?' : 'Как найти периметр квадрата?', opts:[good].concat(bad), ans:good, layout:'card',
          field:function(el){ el.innerHTML = plot(kind, kind === 'rect' ? ['a', 'b', 'a', 'b'] : ['a', 'a', 'a', 'a'], 'P = ?'); } }), hintP(d), { hintExpr:'<span class="ok">' + good + '</span>' }));
      }
      if(k === 'cmp'){
        var d1 = shapeData(pick(['rect', 'sq'])), d2 = shapeData(pick(['rect', 'tri'])), sy = M.cmpSym(d1.P, d2.P);
        return S('3c' + d1.P + d2.P + d1.kind, { expr:eqs(['P₁', QB, 'P₂']), small:true, cap:'Сравни периметры двух грядок', say:[G.say('У какой грядки забор длиннее? Посчитай периметры и сравни.')], ans:sy, opts:M.SYM3, layout:'sym',
          field:function(el, X, task){ var sw = M.seesaw(el, '<span class="mxs-wt" style="font-size:1rem">' + d1.f + '</span>', '<span class="mxs-wt" style="font-size:1rem">' + d2.f + '</span>', X); task.reveal = function(){ sw.reveal(sy); }; },
          hintExpr:eqs([d1.P, '|', d2.P]), hintSay:[G.say('Первый периметр — ' + d1.P + ', второй — ' + d2.P + '.')], hint:G.hintCard('', d1.f + ' = <b>' + d1.P + '</b><br>' + d2.f + ' = <b>' + d2.P + '</b>') });
      }
      var a = rnd(4, 12), b = rnd(2, 9); if(a === b) b = a - 1; var P = (a + b)*2, who = pick(['грядка', 'площадка', 'ковёр', 'картина']);
      d = { kind:'rect', sides:[a, b, a, b], P:P, f:'(' + a + ' + ' + b + ') × 2', a:a, b:b };
      return S('3w' + a + b, Object.assign({ expr:'', cap:'Длина ' + a + ' м, ширина ' + b + ' м. Сколько метров забора вокруг прямоугольной ' + (who === 'грядка' ? 'грядки' : 'площадки') + '?', say:[G.say('Длина прямоугольной грядки ' + a + ' ' + G.plural(a, 'метр', 'метра', 'метров') + ', ширина ' + b + ' ' + G.plural(b, 'метр', 'метра', 'метров') + '. Сколько метров забора нужно вокруг неё?')], ans:String(P), opts:opts(P),
        field:function(el){ el.innerHTML = plot('rect', [String(a), String(b), '', ''], '? м'); } }, hintP(d)));
    }

    M.run({ root:containerId, key:'perimeter', need:10, theme:'garden', levels:[L1, L2, L3] });
  });
}
