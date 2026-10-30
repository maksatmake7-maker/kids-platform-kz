/* ===== Білім Аралы — набор для игр «Познание мира», 2 класс =====
   Игра описывается данными (SPEC), а три уровня собирает набор:
     ⭐   найди картинку / к какой группе относится (groups)
     ⭐⭐  разложи по корзинам (groups)
     ⭐⭐⭐ вопросы «почему / что будет» (mcq) и «верно или неверно» (tf)
   Движок, голос Барсика и заставка — те же, что в играх по математике и естествознанию 2 класса:
   games/mathx.js, mathx-voice.js, mathx-g2.js, mathx-hero.js подгружаются сами. Режим освоения: 10 заданий подряд без ошибки.

   SPEC = {
     key:'pz2family', theme:'garden', icons:['👪','🏠'],
     askQ:'К какой группе это относится?',                    // вопрос к картинке на уровне ⭐
     sortSay:'Разложи по корзинам.', sortCap:'Выбери картинку, потом корзину', sortHint:'…',
     groups:[ { k, name, ic, c1, c2, find:'здоровую еду', is:'здоровая еда', items:[ [emoji, text, why?], … ] }, … ],
     mcq:[ [вопрос, верный, [неверные…], разбор, emoji?], … ],
     tf:[ [утверждение, true|false, разбор], … ]
   }
*/
(function(){
  if(window.PZ2) return;
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
    window.__mxHeroCfg = { theme:spec.theme, icons:spec.icons };
    boot();
    window.initPz2Game = function(containerId){ __mxLoad(function(){ run(containerId, spec); }); };
  }

  function run(containerId, SPEC){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    var GR = SPEC.groups || [], MC = SPEC.mcq || [], TF = SPEC.tf || [];
    function S(sig, t){ t.sig = sig; return t; }
    function big(e){ return '<span style="font-size:3.4rem;line-height:1">' + e + '</span>'; }
    function word(e){ var n = String(e).replace(/<[^>]*>/g, '').length, fs = n > 45 ? 1.05 : n > 22 ? 1.35 : n > 14 ? 1.8 : 2.6;
      return '<span style="font:800 ' + fs + 'rem/1.2 \'Baloo 2\',sans-serif;color:#25324A' + (fs < 2.6 ? ';display:block;max-width:34rem;margin:0 auto' : '') + '">' + e + '</span>'; }
    function vis(it){ return it[0] ? big(it[0]) : word(it[1]); }
    function hintItem(g, it){
      var t = it[1], why = it[2] || '', sp = it[3] || t;
      return { hintExpr:'<span class="ok">' + g.name + '</span>', hintSay:[G.say(sp + ' — ' + g.is + '.' + (why ? ' ' + why + '.' : ''))],
        hint:G.hintCard(vis(it), '<b>' + t + '</b> — ' + g.is + (why ? '<br>' + why : '')) };
    }
    /* допиши слово: [маска, верный ответ, [неверные…], слово целиком, разбор] */
    var SP = SPEC.spell || [];
    function spellTask(e){
      var opts = [e[1]].concat(e[2]), o5 = e[5] || {};
      return S('sp' + e[0] + e[1] + (o5.cap || ''), Object.assign(G.choice({ q:o5.cap || 'Допиши слово', say:[G.say(o5.say || ('Допиши слово: ' + e[3] + '.'))], opts:opts, ans:e[1], layout:o5.layout || 'wide', expr:word(e[0]) }),
        { expr:word(e[0]), hintSay:[G.say(e[4] + '.')], hint:G.hintCard(word(e[3]), e[4]) }));
    }
    function allItems(){ var a = []; GR.forEach(function(g){ g.items.forEach(function(it){ a.push({ g:g, it:it }); }); }); return a; }
    var ALL = allItems();

    function peers(g){ return GR.filter(function(h){ return (h.set || 0) === (g.set || 0); }); }
    /* ⭐ найди … / к какой группе относится */
    var CTX = { M:M, G:G, S:S, big:big, pick:pick, shuffle:shuffle, rnd:rnd };
    var EX1 = SPEC.extra1 ? SPEC.extra1(CTX) : [], EX3 = SPEC.extra3 ? SPEC.extra3(CTX) : [];
    function L1(){
      if(EX1.length && Math.random() < (GR.length ? .35 : 1)) return pick(EX1)();
      if(SP.length && (!GR.length || Math.random() < .4)) return spellTask(pick(SP));
      var x = pick(ALL), g = x.g, it = x.it, ps = peers(g);
      if(ps.length > 2 && Math.random() < .5){
        var pool = [it], seen = {}; seen[g.k] = 1;
        shuffle(ALL.filter(function(y){ return y.g.k !== g.k && (y.g.set || 0) === (g.set || 0); })).forEach(function(y){ if(pool.length < 4 && !seen[y.g.k]){ seen[y.g.k] = 1; pool.push(y.it); } });
        var q = 'Найди: ' + g.find;
        return S('1p' + g.k + it[1], Object.assign(G.pickPic({ q:q, say:[G.say(q + '.')], items:pool.map(function(p){ return { k:p[1], h:p[0] ? '<span class="e">' + p[0] + '</span>' : '', lab:p[1] }; }), ans:it[1] }), hintItem(g, it)));
      }
      var opts = [g.name].concat(shuffle(ps.filter(function(h){ return h.k !== g.k; })).slice(0, 2).map(function(h){ return h.name; }));
      return S('1c' + g.k + it[1], Object.assign({ expr:vis(it), cap:it[0] ? it[1] + ' — это…' : (g.wordCap || SPEC.wordCap || 'Какое это слово?'), say:[G.say((it[3] || it[1]) + '. ' + (g.ask || SPEC.askQ || 'К какой группе это относится?'))], ans:g.name, opts:G.txtOpts(opts), layout:'card' }, hintItem(g, it)));
    }
    /* ⭐⭐ разложи по корзинам */
    function L2(){
      if(!GR.length) return pick(EX1)();
      var sets = {}; GR.forEach(function(g){ var k = g.set || 0; (sets[k] = sets[k] || []).push(g); });
      var ks = Object.keys(sets).filter(function(k){ return sets[k].length >= 2; }), sk = pick(ks), pool = sets[sk];
      var gs = shuffle(pool).slice(0, Math.min(3, pool.length)), items = [];
      gs.forEach(function(g){ shuffle(g.items).slice(0, gs.length === 2 ? 3 : 2).forEach(function(it){ items.push({ k:g.k, h:it[0] ? it[0] + ' ' + it[1] : it[1] }); }); });
      return S('2s' + gs.map(function(g){ return g.k; }).sort().join('') + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(items), say:[G.say(gs[0].sortSay ? gs[0].sortSay : (SPEC.sortSay || 'Разложи по корзинам.'))], cap:gs[0].sortCap || SPEC.sortCap || 'Выбери картинку, потом корзину',
        buckets:gs.map(function(g){ return { k:g.k, name:g.name, icon:g.ic, c1:g.c1, c2:g.c2 }; }), hintSay:[G.say(gs[0].sortHint || SPEC.sortHint || 'Подумай, к какой группе относится каждый предмет.')] }));
    }
    /* ⭐⭐⭐ вопросы и «верно или неверно» */
    function L3(){
      var r = Math.random();
      if(EX3.length && r < .25) return pick(EX3)();
      if(SP.length && r < .45) return spellTask(pick(SP));
      if(MC.length && (r < .4 || !TF.length)){
        var q = pick(MC), e = q[4] || SPEC.icons[0];
        return S('3q' + q[0], Object.assign(G.choice({ q:q[0], say:q[5] ? [G.say(q[5])] : undefined, opts:[q[1]].concat(q[2]), ans:q[1], layout:'card' }),
          { hintSay:[G.say(q[3] + '.')], hint:G.hintCard(q[4] === '' ? '' : big(e), q[3]) }));
      }
      var t = pick(TF);
      return S('3t' + t[0], G.tf({ q:t[0], truth:t[1], hint:t[2] }));
    }

    M.run({ root:containerId, key:SPEC.key, need:10, theme:SPEC.theme, levels:SPEC.custom ? SPEC.custom(CTX) : [L1, L2, L3] });
  }

  var COL = { green:['#4DC98F','#27976A'], orange:['#FFA24D','#D9741A'], blue:['#4D8FF0','#2760C4'], purple:['#B39DDB','#7E62C0'], red:['#FF7A7A','#D94545'], yellow:['#FFD34D','#D9A21A'], teal:['#4FD1C5','#2A9D93'], pink:['#F27AA8','#CE4E81'] };
  /* g(набор, ключ, название корзины, значок, цвет, «Найди: …», «это …», предметы [[эмодзи, текст, пояснение?]…], вопрос к картинке?) */
  function g(set, k, name, ic, col, find, is, items, ask){ var c = COL[col] || COL.blue; return { set:set, k:k, name:name, ic:ic, c1:c[0], c2:c[1], find:find, is:is, items:items, ask:ask }; }

  window.PZ2 = { define:define, run:run, g:g, COL:COL };
})();
