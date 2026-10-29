/* ===== Білім Аралы — «Задачи на умножение и деление: Зимняя ярмарка» (v3) =====
   Математика, 2 класс (цели 2.5.1.3, 2.5.1.4, 2.5.1.7 приказа №399): задачи на равные группы, деление, увеличение и уменьшение в несколько раз, в два действия.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'snow', icons:['⛄','✖️','➗']};
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

function initMultDivProblemGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var ITEMS = [['🍎', 'яблоко', 'яблока', 'яблок'], ['🍬', 'конфета', 'конфеты', 'конфет'], ['✏️', 'карандаш', 'карандаша', 'карандашей'], ['🥚', 'яйцо', 'яйца', 'яиц'], ['⚽', 'мяч', 'мяча', 'мячей'], ['📚', 'книга', 'книги', 'книг'], ['🍪', 'печенье', 'печенья', 'печений'], ['🌷', 'тюльпан', 'тюльпана', 'тюльпанов'], ['🐟', 'рыбка', 'рыбки', 'рыбок']];
    var CONT = [['коробках', '📦'], ['корзинах', '🧺'], ['пакетах', '🛍️'], ['вазах', '💐'], ['тарелках', '🍽️']];
    function nn(n, it){ return n + ' ' + G.plural(n, it[1], it[2], it[3]); }
    function raz(m){ return m + ' ' + G.plural(m, 'раз', 'раза', 'раз'); }
    function opts(r, bad){ var c = [r]; (bad || []).concat([r + 1, r - 1, r + 2, r - 2, r + 3]).forEach(function(x){ if(x > 0 && c.indexOf(x) < 0 && c.length < 4) c.push(x); }); return shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function groups(k, n, it, cont){ var h = '<div class="g2-tiles">'; for(var i = 0; i < k; i++){ h += '<div class="g2-tile" style="animation:none;cursor:default;min-width:64px;min-height:60px;padding:4px"><span style="display:inline-flex;flex-wrap:wrap;gap:1px;justify-content:center;max-width:' + (Math.min(n, 5)*20) + 'px;font-size:1.05rem;line-height:1.05">' + Array.apply(null, Array(n)).map(function(){ return '<span>' + it[0] + '</span>'; }).join('') + '</span><span style="font-size:1.3rem">' + cont[1] + '</span></div>'; } return h + '</div>'; }
    function hintMul(k, n, it, cont, extra){ var r = k*n; return { hintExpr:'<span class="ok">' + k + ' × ' + n + ' = ' + r + '</span>', hintSay:[G.say(k + ' раза по ' + n + ' — это ' + k + ' умножить на ' + n + '. Получается ' + r + '.')], hint:G.hintCard(groups(k, n, it, cont), (extra ? extra + '<br>' : '') + k + ' × ' + n + ' = <b>' + r + '</b>') }; }
    function hintDiv(T, k, it, say){ var q = T/k; return { hintExpr:'<span class="ok">' + T + ' ÷ ' + k + ' = ' + q + '</span>', hintSay:[G.say(say || (T + ' разделить на ' + k + ' — это ' + q + '. Проверка: ' + q + ' умножить на ' + k + ' — ' + T + '.'))], hint:G.hintCard('<span style="font-size:3rem;line-height:1">' + it[0] + '</span>', T + ' ÷ ' + k + ' = <b>' + q + '</b><br>Проверка: ' + q + ' × ' + k + ' = ' + T) }; }
    function mk(sig, story, q, ans, bad, fldH, hint){ return S(sig, Object.assign({ expr:'', cap:story + ' ' + q, say:[G.say(story + ' ' + q)], ans:String(ans), opts:opts(ans, bad), field:fldH }, hint)); }
    function tCont(){ return pick(CONT); }
    function fImg(it, n){ return function(el){ el.innerHTML = M.grp(Math.min(n, 24), it[0], 'sm'); }; }

    var T = {
      mul:function(){ var it = pick(ITEMS), c = tCont(), k = rnd(2, 5), n = rnd(2, 8); return { r:k*n, mk:function(){ return mk('m' + k + n + it[1], 'В ' + k + ' ' + c[0] + ' по ' + nn(n, it) + '.', 'Сколько ' + it[3] + ' всего?', k*n, [k + n], function(el){ el.innerHTML = groups(k, n, it, c); }, hintMul(k, n, it, c)); }, expr:k + ' × ' + n, bad:[k + ' + ' + n, n + ' − ' + k, k + ' ÷ ' + n], op:'умножение' }; },
      divp:function(){ var it = pick(ITEMS), k = rnd(2, 5), q = rnd(2, 8), Tn = k*q; return { mk:function(){ return mk('d' + Tn + k + it[1], nn(Tn, it) + ' разделили поровну между ' + k + ' детьми.', 'Сколько получил каждый?', q, [k, Tn - q], fImg(it, Tn), hintDiv(Tn, k, it)); }, expr:Tn + ' ÷ ' + k, bad:[Tn + ' × ' + k, Tn + ' − ' + k, k + ' ÷ ' + Tn], op:'деление' }; },
      cont:function(){ var it = pick(ITEMS), c = pick(['пакеты', 'коробки', 'корзины']), n = rnd(2, 5), q = rnd(2, 7), Tn = n*q; return { mk:function(){ return mk('c' + Tn + n + it[1], nn(Tn, it) + ' разложили по ' + n + ' в ' + c + '.', 'Сколько получилось ' + ({ пакеты:'пакетов', коробки:'коробок', корзины:'корзин' })[c] + '?', q, [n, Tn - n], fImg(it, Tn), hintDiv(Tn, n, it, Tn + ' разделить на ' + n + ' — получится ' + q + '. Столько ' + ({ пакеты:'пакетов', коробки:'коробок', корзины:'корзин' })[c] + '.')); }, expr:Tn + ' ÷ ' + n, bad:[Tn + ' × ' + n, Tn + ' − ' + n, n + ' ÷ ' + Tn], op:'деление' }; },
      more:function(){ var it = pick(ITEMS), a = rnd(2, 7), m = rnd(2, 5), pr = pick([['Али', 'Бека'], ['Аружан', 'Мадины']]); return { mk:function(){ return mk('x' + a + m + it[1], 'У ' + pr[0] + ' ' + nn(a, it) + '. У ' + pr[1] + ' в ' + raz(m) + ' больше.', 'Сколько ' + it[3] + ' у ' + pr[1] + '?', a*m, [a + m, a*m - a], fImg(it, a*m), hintMul(m, a, it, ['', ''], 'В ' + raz(m) + ' больше — значит, умножаем')); }, expr:a + ' × ' + m, bad:[a + ' + ' + m, a + ' ÷ ' + m, m + ' − ' + a], op:'умножение' }; },
      less:function(){ var it = pick(ITEMS), m = rnd(2, 5), q = rnd(2, 6), a = m*q, pr = pick([['Али', 'Бека'], ['Аружан', 'Мадины']]); return { mk:function(){ return mk('l' + a + m + it[1], 'У ' + pr[0] + ' ' + nn(a, it) + '. У ' + pr[1] + ' в ' + raz(m) + ' меньше.', 'Сколько ' + it[3] + ' у ' + pr[1] + '?', q, [m, a - q], fImg(it, a), hintDiv(a, m, it, 'В ' + raz(m) + ' меньше — значит, делим. ' + a + ' разделить на ' + m + ' — это ' + q + '.')); }, expr:a + ' ÷ ' + m, bad:[a + ' × ' + m, a + ' − ' + m, a + ' + ' + m], op:'деление' }; },
      two:function(){
        var it = pick(ITEMS), c = tCont(), k = rnd(2, 5), n = rnd(2, 7), tot = k*n, sub = Math.random() < .5, x = rnd(2, Math.min(7, tot - 1)), r = sub ? tot - x : tot + x;
        return { mk:function(){ return mk('t' + k + n + x + (sub ? 's' : 'a'), 'В ' + k + ' ' + c[0] + ' по ' + nn(n, it) + '. ' + (sub ? 'Потом ' + nn(x, it) + ' забрали.' : 'Потом положили ещё ' + nn(x, it) + '.'), 'Сколько ' + it[3] + (sub ? ' осталось?' : ' стало?'), r, [tot, k + n + (sub ? -x : x)],
            function(el){ el.innerHTML = groups(k, n, it, c); }, { hintExpr:'<span class="ok">' + k + ' × ' + n + (sub ? ' − ' : ' + ') + x + ' = ' + r + '</span>', hintSay:[G.say('Сначала узнаем, сколько всего: ' + k + ' умножить на ' + n + ' — ' + tot + '. Потом ' + (sub ? 'вычтем ' : 'прибавим ') + x + ' — получится ' + r + '.')],
              hint:G.hintCard(groups(k, n, it, c), '<div class="g2-step" style="flex-direction:column;align-items:flex-start;gap:6px"><span><span class="n">1</span> ' + k + ' × ' + n + ' = <b>' + tot + '</b></span><span><span class="n">2</span> ' + tot + (sub ? ' − ' : ' + ') + x + ' = <b>' + r + '</b></span></div>') }); },
          expr:k + ' × ' + n + (sub ? ' − ' : ' + ') + x, bad:[k + ' + ' + n + (sub ? ' − ' : ' + ') + x, k + ' × (' + n + (sub ? ' − ' : ' + ') + x + ')', k + ' × ' + n + (sub ? ' + ' : ' − ') + x], op:'два действия' };
      }
    };
    function task(kinds){ var g = T[pick(kinds)](); return g; }

    /* ⭐ равные группы и деление поровну */
    function L1(){ return task(['mul', 'mul', 'divp']).mk(); }
    /* ⭐⭐ «в несколько раз», деление по содержанию */
    function L2(){ return task(['more', 'less', 'cont', 'more', 'less']).mk(); }
    /* ⭐⭐⭐ выбор действия и задачи в два действия */
    function L3(){
      var k = pick(['two', 'two', 'op', 'expr']);
      if(k === 'two') return T.two().mk();
      var g = T[pick(['mul', 'divp', 'cont', 'more', 'less'])](), t = g.mk();
      if(k === 'op'){
        return S('3o' + t.sig, Object.assign({}, t, { cap:t.cap.replace(/ ?Сколько[^?]*\?$/, '') + ' Какое действие выбрать?', say:[G.say(t.cap.replace(/Сколько[^?]*\?$/, '') + 'Какое действие нужно, чтобы решить задачу?')], ans:g.op, opts:G.txtOpts(['умножение', 'деление']), layout:'wide' }));
      }
      return S('3x' + t.sig, Object.assign({}, t, { cap:t.cap + ' Какое выражение?', say:[G.say(t.cap + ' Какое выражение подходит к задаче?')], ans:g.expr, opts:G.txtOpts([g.expr].concat(g.bad)), layout:'card' }));
    }

    M.run({ root:containerId, key:'multdivproblem', need:10, theme:'snow', levels:[L1, L2, L3] });
  });
}
