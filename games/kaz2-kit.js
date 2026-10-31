/* ===== Білім Аралы — набор для игр «Казахский язык», 2 класс (школы с русским языком обучения) =====
   Барсик объясняет по-русски, казахские слова и фразы звучат казахским клипом (kz:true, файл assets/audio/barsik/kz/f_g2k_<хеш>.mp3).
   Движок, голос и заставка — те же: games/mathx.js, mathx-voice.js, mathx-g2.js, mathx-hero.js подгружаются сами.

   KZ2.define({
     key:'kz2me', theme:'play', icons:[…],
     groups:[ { k, name, c1, c2, words:[ [казахское, русское], … ] }, … ],   // темы для раскладывания по корзинам
     extra:[ [казахское, русское], … ],                                      // слова вне корзин
     dialogs:[ [вопрос по-казахски, перевод вопроса, верный ответ, [неверные…], перевод ответа], … ],
     forms:[ [слово, форма множественного числа, [неверные формы…]], … ],
     letters:[ [слово, перевод, особая буква], … ]
   } */
(function(){
  if(window.KZ2) return;
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  function boot(){
    if(window.__mxLoad) return;
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
  function define(spec){
    window.__mxHeroCfg = { theme:spec.theme, icons:spec.icons || [] };
    boot();
    window.initPz2Game = function(containerId){ __mxLoad(function(){ run(containerId, spec); }); };
  }

  var PLAIN = { 'ә':'а', 'ө':'о', 'ү':'у', 'ұ':'у', 'і':'ы', 'ң':'н', 'қ':'к', 'ғ':'г' };
  var SIB = { 'ә':'ө', 'ө':'ә', 'ү':'ұ', 'ұ':'ү', 'і':'ү', 'ң':'ә', 'қ':'ә', 'ғ':'ә' };

  function run(containerId, SPEC){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function hsh(s){ var x = 5381; for(var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }
    function kz(t){ return { id:'f_g2k_' + hsh(t), text:t, kz:true }; }
    function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function big(t){ var n = String(t).length, fs = n > 30 ? 1.2 : n > 16 ? 1.7 : n > 10 ? 2.2 : 3; return '<span style="font:800 ' + fs + 'rem/1.2 \'Baloo 2\',sans-serif;color:#25324A;display:block;max-width:34rem;margin:0 auto;text-align:center">' + esc(t) + '</span>'; }
    function same(a, b){ return a.toLowerCase() === b.toLowerCase(); }

    var GR = SPEC.groups || [], W = [];
    GR.forEach(function(g){ g.words.forEach(function(w){ W.push({ kz:w[0], ru:w[1], g:g }); }); });
    (SPEC.extra || []).forEach(function(w){ W.push({ kz:w[0], ru:w[1], g:null }); });
    var DL = SPEC.dialogs || [], FM = SPEC.forms || [], LT = SPEC.letters || [];
    var COL = [['#4DC98F', '#27976A'], ['#FFA24D', '#D9741A'], ['#4D8FF0', '#2760C4']];

    function others(w, n, key){ return shuffle(W.filter(function(x){ return !same(x.ru, w.ru) && !same(x.kz, w.kz); })).slice(0, n).map(function(x){ return x[key]; }); }
    function hintW(w){ return { hintSay:[kz(w.kz), G.say(w.ru + '.')], hint:G.hintCard(big(w.kz), '<b>' + esc(w.kz) + '</b> — ' + esc(w.ru)) }; }

    /* ⭐ слышу казахское слово → выбираю перевод */
    function w2r(){
      var w = pick(W), o = [w.ru].concat(others(w, 2, 'ru'));
      return S('w2r' + w.kz, Object.assign(G.choice({ q:'Что значит это слово?', say:[G.say('Послушай слово.'), kz(w.kz)], opts:o, ans:w.ru, layout:'card', expr:big(w.kz) }), hintW(w), { echo:[kz(w.kz)] }));
    }
    /* ⭐ вижу русское слово → выбираю казахское */
    function r2w(){
      var w = pick(W), o = [w.kz].concat(others(w, 2, 'kz'));
      return S('r2w' + w.kz, Object.assign(G.choice({ q:'Как это сказать по-казахски?', say:[G.say('Как по-казахски: ' + w.ru + '?')], opts:o, ans:w.kz, layout:'wide', expr:big(w.ru) }), hintW(w), { echo:[kz(w.kz)] }));
    }
    /* ⭐⭐ раскладываю слова по темам */
    function sortT(){
      var pool = GR.filter(function(g){ return g.words.length >= 3; });
      if(pool.length < 2) return w2r();
      var gs = shuffle(pool).slice(0, Math.min(3, pool.length)), items = [];
      gs.forEach(function(g, i){ g._c = COL[i % 3]; shuffle(g.words).slice(0, gs.length === 2 ? 3 : 2).forEach(function(w){ items.push({ k:g.k, h:esc(w[0]) }); }); });
      return S('s' + gs.map(function(g){ return g.k; }).sort().join('') + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(items), say:[G.say('Разложи слова по темам.')], cap:'Выбери слово, потом корзину',
        buckets:gs.map(function(g){ return { k:g.k, name:g.name, icon:'', c1:g._c[0], c2:g._c[1] }; }), hintSay:[G.say('Подумай, к какой теме относится слово. Нажми на слово, чтобы услышать его.')] }));
    }
    /* ⭐⭐⭐ диалог: выбираю ответ */
    function dlg(){
      var d = pick(DL), o = [d[2]].concat(shuffle(d[3]).slice(0, 2));
      return S('d' + d[0], Object.assign(G.choice({ q:'Выбери подходящий ответ', say:[G.say('Послушай вопрос.'), kz(d[0]), G.say('Выбери ответ.')], opts:o, ans:d[2], layout:'card', expr:big(d[0]) }),
        { echo:[kz(d[2])], hintSay:[G.say('Вопрос значит: ' + d[1] + ' Ответ значит: ' + d[4])], hint:G.hintCard(big(d[0]), '<b>' + esc(d[0]) + '</b> — ' + esc(d[1]) + '<br><b>' + esc(d[2]) + '</b> — ' + esc(d[4])) }));
    }
    /* ⭐⭐⭐ много: как сказать */
    function frm(){
      var f = pick(FM), o = [f[1]].concat(shuffle(f[2]).slice(0, 2)), suf = f[1].slice(f[0].length);
      return S('f' + f[0], Object.assign(G.choice({ q:'Как сказать, когда их много?', say:[G.say('Как сказать во множественном числе?'), kz(f[0])], opts:o, ans:f[1], layout:'wide', expr:big(f[0]) }),
        { echo:[kz(f[1])], hintSay:[kz(f[0]), kz(f[1]), G.say('Когда предметов много, к слову добавляют окончание ' + suf.replace(/^-/, '') + '.')], hint:G.hintCard(big(f[1]), '<b>' + esc(f[0]) + '</b> → <b>' + esc(f[1]) + '</b><br>Когда предметов много, к слову добавляют окончание -' + esc(suf)) }));
    }
    /* ⭐⭐⭐ какой буквы не хватает */
    function lm(){
      var e = pick(LT), ch = e[2], i = e[0].toLowerCase().indexOf(ch), mask = e[0].slice(0, i) + '_' + e[0].slice(i + 1);
      var o = [ch, PLAIN[ch], SIB[ch]];
      return S('lm' + e[0], Object.assign(G.choice({ q:'Какой буквы не хватает?', say:[G.say('Какой буквы не хватает?'), kz(e[0])], opts:o, ans:ch, layout:'wide', expr:big(mask) }),
        { echo:[kz(e[0])], hintSay:[kz(e[0]), G.say(e[1] + '.')], hint:G.hintCard(big(e[0]), '<b>' + esc(e[0]) + '</b> — ' + esc(e[1]) + '<br>Здесь пишется особая буква «' + esc(ch) + '»') }));
    }
    /* ⭐⭐⭐ найди слово с буквой */
    function lf(){
      var e = pick(LT), ch = e[2], bad = shuffle(LT.filter(function(x){ return x[0].toLowerCase().indexOf(ch) < 0; })).slice(0, 2);
      if(bad.length < 2) return lm();
      var o = [e[0]].concat(bad.map(function(x){ return x[0]; }));
      return S('lf' + e[0] + ch, Object.assign(G.choice({ q:'В каком слове есть эта буква?', say:[G.say('В каком слове есть эта буква?')], opts:o, ans:e[0], layout:'wide', expr:big(ch.toUpperCase() + ch) }),
        { echo:[kz(e[0])], hintSay:[kz(e[0]), G.say(e[1] + '.')], hint:G.hintCard(big(e[0]), '<b>' + esc(e[0]) + '</b> — ' + esc(e[1]) + '<br>В этом слове есть буква «' + esc(ch) + '»') }));
    }
    /* ⭐⭐⭐ верно ли перевели */
    function tfw(){
      var w = pick(W), truth = Math.random() < .5, ru = truth ? w.ru : others(w, 1, 'ru')[0], q = '«' + w.kz + '» — это «' + ru + '»';
      return S('t' + w.kz + ru, Object.assign(G.choice({ q:q, say:[G.say('Слово'), kz(w.kz), G.say('значит: ' + ru + '. Верно или неверно?')], opts:['Верно', 'Неверно'], ans:truth ? 'Верно' : 'Неверно', layout:'wide', expr:big(w.kz) }),
        { echo:[kz(w.kz)], hintSay:[kz(w.kz), G.say('значит: ' + w.ru + '.')], hint:G.hintCard(big(w.kz), '<b>' + esc(w.kz) + '</b> — ' + esc(w.ru)) }));
    }
    function L1(){ if(LT.length && !W.length) return Math.random() < .5 ? lm() : lf(); return Math.random() < .5 ? w2r() : r2w(); }
    function L2(){ if(GR.length > 1 && W.length) return sortT(); if(LT.length) return lf(); return r2w(); }
    function L3(){
      var pool = [];
      if(DL.length) pool.push(dlg, dlg);
      if(FM.length) pool.push(frm, frm);
      if(LT.length) pool.push(lm, lf, lm, lf);
      if(W.length) pool.push(tfw);
      return pick(pool)();
    }
    M.run({ root:containerId, key:SPEC.key, need:10, theme:SPEC.theme, levels:[L1, L2, L3] });
  }
  window.KZ2 = { define:define };
})();
