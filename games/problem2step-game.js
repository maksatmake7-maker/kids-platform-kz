/* ===== Білім Аралы — «Задачи в два действия: Осенний урожай» (v3) =====
   Математика, 2 класс (цели 2.5.1.1, 2.5.1.7, 2.5.1.8 приказа №399): составные задачи в два действия, решение числовым выражением.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'autumn', icons:['🍎','📝','2️⃣']};
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

function initProblem2StepGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var ITEMS = [['🍎', 'яблоко', 'яблока', 'яблок'], ['🍬', 'конфета', 'конфеты', 'конфет'], ['🌷', 'тюльпан', 'тюльпана', 'тюльпанов'], ['🥚', 'яйцо', 'яйца', 'яиц'], ['⚽', 'мяч', 'мяча', 'мячей'], ['📚', 'книга', 'книги', 'книг'], ['🐟', 'рыбка', 'рыбки', 'рыбок'], ['🍪', 'печенье', 'печенья', 'печений'], ['🚗', 'машинка', 'машинки', 'машинок'], ['⭐', 'звезда', 'звезды', 'звёзд']];
    var WHO = [{ n:'Али', s:'Он', d:'ему', v:'' }, { n:'Бек', s:'Он', d:'ему', v:'' }, { n:'Аружан', s:'Она', d:'ей', v:'а' }, { n:'Мадина', s:'Она', d:'ей', v:'а' }, { n:'Дана', s:'Она', d:'ей', v:'а' }, { n:'Тимур', s:'Он', d:'ему', v:'' }];
    var NG = { 'Али':'Али', 'Бек':'Бека', 'Тимур':'Тимура', 'Аружан':'Аружан', 'Мадина':'Мадины', 'Дана':'Даны' };
    function nn(n, it){ return n + ' ' + G.plural(n, it[1], it[2], it[3]); }
    var NOUN = function(it){ return it[3]; };
    // тип → { story, q1 (вопрос про первое действие), q2 (итоговый вопрос), st:[[текст, значение]], r, expr, bad:[…] }
    function gen(){
      var t = pick(['asm', 'sma', 'aaa', 'sms', 'more', 'less']), it = pick(ITEMS), a, b, c, w, w2, o = { it:it };
      if(t === 'asm'){ a = rnd(6, 18); b = rnd(2, 9); c = rnd(2, a + b - 2); o.story = 'В корзине было ' + nn(a, it) + '. Потом положили ещё ' + nn(b, it) + ', а затем ' + c + ' взяли.'; o.q1 = 'Сколько стало, когда положили ещё?'; o.q2 = 'Сколько ' + NOUN(it) + ' стало в корзине?'; o.st = [[a + ' + ' + b, a + b], [(a + b) + ' − ' + c, a + b - c]]; o.expr = a + ' + ' + b + ' − ' + c; o.bad = [a + ' + ' + b + ' + ' + c, a + ' − ' + b + ' − ' + c, a + ' − ' + b + ' + ' + c]; o.a = a; }
      else if(t === 'sma'){ w = pick(WHO); a = rnd(12, 24); b = rnd(3, 9); c = rnd(2, 8); o.story = 'У ' + NG[w.n] + ' было ' + nn(a, it) + '. ' + w.s + ' отдал' + w.v + ' ' + nn(b, it) + ' другу. Потом ' + w.d + ' подарили ещё ' + nn(c, it) + '.'; o.q1 = 'Сколько осталось, когда ' + w.s.toLowerCase() + ' отдал' + w.v + ' другу?'; o.q2 = 'Сколько ' + NOUN(it) + ' стало у ' + NG[w.n] + '?'; o.st = [[a + ' − ' + b, a - b], [(a - b) + ' + ' + c, a - b + c]]; o.expr = a + ' − ' + b + ' + ' + c; o.bad = [a + ' − ' + b + ' − ' + c, a + ' + ' + b + ' + ' + c, a + ' + ' + b + ' − ' + c]; o.a = a; }
      else if(t === 'aaa'){ a = rnd(4, 12); b = rnd(4, 12); c = rnd(4, 12); o.story = 'В понедельник в магазин привезли ' + nn(a, it) + ', во вторник — ' + nn(b, it) + ', в среду — ' + nn(c, it) + '.'; o.q1 = 'Сколько привезли за понедельник и вторник?'; o.q2 = 'Сколько ' + NOUN(it) + ' привезли за три дня?'; o.st = [[a + ' + ' + b, a + b], [(a + b) + ' + ' + c, a + b + c]]; o.expr = a + ' + ' + b + ' + ' + c; o.bad = [a + ' + ' + b + ' − ' + c, a + ' − ' + b + ' + ' + c, a + ' × ' + b + ' + ' + c]; o.a = a; }
      else if(t === 'sms'){ a = rnd(20, 40); b = rnd(4, 12); c = rnd(4, 12); o.story = 'На полке стояло ' + nn(a, it) + '. Утром забрали ' + nn(b, it) + ', днём — ' + nn(c, it) + '.'; o.q1 = 'Сколько осталось после утра?'; o.q2 = 'Сколько ' + NOUN(it) + ' осталось на полке?'; o.st = [[a + ' − ' + b, a - b], [(a - b) + ' − ' + c, a - b - c]]; o.expr = a + ' − ' + b + ' − ' + c; o.bad = [a + ' − ' + b + ' + ' + c, a + ' + ' + b + ' − ' + c, a + ' − ' + c + ' + ' + b]; o.a = a; }
      else {
        w = pick(WHO.slice(0, 2)); w2 = pick(WHO.slice(2)); a = rnd(8, 22); b = rnd(2, 7); var more = t === 'more';
        var g2 = NG[w2.n], N1g = NG[w.n];
        o.story = 'У ' + N1g + ' ' + nn(a, it) + '. У ' + g2 + ' на ' + b + ' ' + (more ? 'больше' : 'меньше') + '.';
        o.q1 = 'Сколько ' + NOUN(it) + ' у ' + g2 + '?'; o.q2 = 'Сколько ' + NOUN(it) + ' у них вместе?';
        var second = more ? a + b : a - b; o.st = [[a + ' ' + (more ? '+' : '−') + ' ' + b, second], [a + ' + ' + second, a + second]];
        o.expr = a + ' + (' + a + ' ' + (more ? '+' : '−') + ' ' + b + ')'; o.bad = [a + ' + ' + b, a + ' − ' + b, a + ' × ' + b]; o.a = a;
      }
      o.t = t; o.r = o.st[1][1]; o.v1 = o.st[0][1]; return o;
    }
    function opts(r, bad){ var c = [r]; (bad || []).concat([r + 1, r - 1, r + 2, r - 2, r + 10, r - 10]).forEach(function(x){ if(x > 0 && c.indexOf(x) < 0 && c.length < 4) c.push(x); }); return shuffle(c).map(function(v){ return { v:String(v), h:String(v) }; }); }
    function hintO(o){
      var lines = o.st.map(function(s, i){ return '<div><span class="n">' + (i + 1) + '</span> ' + s[0] + ' = <b>' + s[1] + '</b></div>'; }).join('');
      return { hintExpr:'<span class="ok">' + o.r + '</span>', hintSay:[G.say('В задаче два действия. Первое: ' + o.st[0][0].replace('+', 'плюс').replace('−', 'минус') + ' — это ' + o.st[0][1] + '. Второе: ' + o.st[1][0].replace('+', 'плюс').replace('−', 'минус') + ' — это ' + o.st[1][1] + '.')],
        hint:G.hintCard('<span style="font-size:3rem;line-height:1">' + o.it[0] + '</span>', '<div class="g2-step" style="flex-direction:column;align-items:flex-start;gap:6px">' + lines + '</div>Ответ: <b>' + o.r + '</b>') };
    }
    function fld(o){ return function(el){ el.innerHTML = o.a <= 24 ? M.grp(o.a, o.it[0], 'sm') : '<span style="font-size:3rem">' + o.it[0] + '</span>'; }; }

    /* ⭐ первое действие: промежуточный вопрос */
    function L1(){
      var o = gen();
      return S('1' + o.story, Object.assign({ expr:'', cap:o.story + ' ' + o.q1, say:[G.say(o.story + ' ' + o.q1)], ans:String(o.v1), opts:opts(o.v1, [o.r]), field:fld(o) }, hintO(o)));
    }
    /* ⭐⭐ полный ответ */
    function L2(){
      var o = gen();
      return S('2' + o.story, Object.assign({ expr:'', cap:o.story + ' ' + o.q2, say:[G.say(o.story + ' ' + o.q2)], ans:String(o.r), opts:opts(o.r, [o.v1]), field:fld(o) }, hintO(o)));
    }
    /* ⭐⭐⭐ запиши решение выражением / ответ */
    function L3(){
      var o = gen();
      if(Math.random() < .6){
        return S('3e' + o.story, Object.assign(G.choice({ q:o.story + ' ' + o.q2 + ' Какое выражение подходит?', say:[G.say(o.story + ' ' + o.q2 + ' Какое выражение подходит к задаче?')], opts:[o.expr].concat(o.bad), ans:o.expr, layout:'card', field:fld(o) }), hintO(o), { hintExpr:'<span class="ok">' + o.expr + ' = ' + o.r + '</span>' }));
      }
      return S('3a' + o.story, Object.assign({ expr:'', cap:o.story + ' ' + o.q2, say:[G.say(o.story + ' ' + o.q2)], ans:String(o.r), opts:opts(o.r, [o.v1]), field:fld(o) }, hintO(o)));
    }

    M.run({ root:containerId, key:'problem2step', need:10, theme:'autumn', levels:[L1, L2, L3] });
  });
}
