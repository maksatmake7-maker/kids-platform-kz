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
    window.initPz2Game = function(containerId){ __mxLoad(function(){
      var l = ''; try { l = document.documentElement.getAttribute('data-current') || localStorage.getItem('bilim_lang_v1') || ''; } catch(e){}
      if(!l || l === 'ru'){ run(containerId, spec); return; }
      /* ui-i18n.js подгружается отдельно и позже: ждём его (до ~15 с), потом ждём пакеты слов страницы */
      var tries = 0;
      (function wait(){
        if(window.UI_I18N_WHEN){ UI_I18N_WHEN(l, function(){ withRW(spec, l, function(){ run(containerId, trSpec(spec, l)); }); }); return; }
        if(++tries > 300){ run(containerId, spec); return; }
        setTimeout(wait, 50);
      })();
    }); };
  }

  /* Русские слова уроков русского языка (assets/ru-words.js): в интерфейсе на другом языке показываем «русский — перевод» */
  /* + тексты игр чтения 1 класса на казахском и английском (ui-<язык>-rdg1.js дописываются в словарь интерфейса) */
  function withRW(spec, l, cb){
    var steps = [], key = spec.key || '', pk = null;
    if(!window.RU_WORDS) steps.push(base + '../assets/ru-words.js');
    if(/^bk1/.test(key) && (l === 'kz' || l === 'en')) pk = 'rdg1';           /* игры «Грамоты» 1 класса */
    else if(/^ru1/.test(key) && l !== 'kz' && l !== 'ru') pk = 'rus1k';       /* уроки русского, казахское отделение 1 класса */
    else if(/^(rus2|lit2)/.test(key) && l !== 'ru') pk = 'rus2';              /* «Русский язык» и «Литература», 2 класс (русское отделение) */
    window.__rwPk = window.__rwPk || {};
    if(pk && !window.__rwPk[pk + l]) steps.push(base + '../assets/ui-' + l + '-' + pk + '.js');
    (function next(){ if(!steps.length){ if(pk) window.__rwPk[pk + l] = 1; cb(); return; } load(steps.shift(), next); })();
  }
  function isWordish(x){ return /^[А-Яа-яЁё]{1,}([ -][А-Яа-яЁё]+)*[.?!]?$/.test(x) && x.length < 90; }
  function bil(x, l){
    var RW = window.RU_WORDS || {}, e = RW[x];
    if(!e) return null;
    var t = e[l];
    if(!t || t === x) return x;
    return x.indexOf(' — ') > -1 ? x + ' (' + t + ')' : x + ' — ' + t;
  }

  /* Перевод спецификации игры по словарю интерфейса (kz и др.): строки берутся из ui-<lang>-*.js, чего нет в словаре — остаётся по-русски */
  var TR_SKIP = { k:1, key:1, theme:1, c1:1, c2:1, ic:1, icons:1, set:1 };
  function trSpec(spec, l){
    var ru1 = /^ru1/.test(spec.key || ''), r2 = /^(rus2|lit2)/.test(spec.key || '');   /* уроки русского, казахское отделение 1 класса: слова «русский — перевод», подписи на языке интерфейса */
    if(spec.noTr && !ru1) return spec;   /* noTr:1 — остальные уроки русского для казахских школ пока без перевода */
    var nAll = 0, nTr = 0;
    var RW0 = window.RU_WORDS || {}, rwg = !!spec.rw || /^bk1/.test(spec.key || '') || ru1;   /* уроки русского языка (чтение, 1 класс; другие игры включаются флагом rw:1): слова показываем «русский — перевод» */
    function LK(x){ var r = window.UI_I18N_LOOKUP(l, x); if(r === undefined && r2 && RW0[x] && RW0[x][l]) r = RW0[x][l]; return r; }
    function T(x){ if(ru1 && (l === 'kz' || RW0[x])) return x;   /* казахский — подписи уже по-казахски; русские слова не переводим */
      var r = LK(x);
      var cnt = r2 ? (/[А-Яа-яЁё]{2}/.test(x) && x.indexOf(' ') > -1) : rwg ? (/[А-Яа-яЁё]{2}/.test(x) && (x.indexOf(' ') > -1 || RW0[x])) : /[А-Яа-яЁё]/.test(x);   /* в играх со словами: считаем фразы и слова из списка; буквы, звуки и варианты написания — нет */
      if(cnt){ nAll++; if(r !== undefined || RW0[x]) nTr++; } return r === undefined ? x : r; }
    function walk(v, k){
      if(k in TR_SKIP) return v;
      if(typeof v === 'string') return T(v);
      if(Array.isArray(v)) return v.map(function(x){ return walk(x); });
      if(v && typeof v === 'object'){ var o = {}; for(var kk in v) o[kk] = walk(v[kk], kk); return o; }
      return v;
    }
    var sp = walk(spec);
    /* учебные слова: карточки и варианты ответов-слов показываем как «русский — перевод» */
    var RW = rwg ? (window.RU_WORDS || {}) : {};
    (spec.groups || []).forEach(function(g, i){
      (g.items || []).forEach(function(it, j){
        var b = RW[it[1]] ? bil(it[1], l) : null;
        if(b === null) return;
        var o = sp.groups[i].items[j];
        if(o[1] !== b){ if(it[3] === undefined || it[3] === '') o[3] = it[1]; o[1] = b; }
      });
    });
    if(ru1) (spec.groups || []).forEach(function(g, i){ var b = RW[g.name] ? bil(g.name, l) : null; if(b !== null) sp.groups[i].name = b; });
    if(rwg && !ru1) (spec.mcq || []).forEach(function(q, i){
      var opts = [q[1]].concat(q[2]).filter(function(x){ return /[А-Яа-яЁё]/.test(x); });
      if(!opts.length) return;
      var ok = opts.every(function(x){ return RW[x]; });                       /* все варианты — учебные слова: «русский — перевод» */
      if(!ok && !opts.every(function(x){ return isWordish(x) && x.indexOf(' ') < 0; })) return;   /* варианты-фразы — обычный перевод */
      var m = sp.mcq[i];                                                        /* варианты написания («ручька», «айдар») — остаются как есть, без подсказки переводом */
      m[1] = ok ? bil(q[1], l) : q[1];
      m[2] = q[2].map(function(x){ return ok && RW[x] ? bil(x, l) : x; });
    });
    if(r2){   /* учебные слова, ответы и названия групп — «русский — перевод»; варианты написания («ручька») остаются как есть */
      var B = function(x){ var t = LK(x); if(t === undefined || t === x) return x; return x.indexOf(' — ') > -1 ? x + ' (' + t + ')' : x + ' — ' + t; };
      var fixOpts = function(c, w){ var all = [c].concat(w), a = all.filter(function(x){ return /[А-Яа-яЁё]{2}/.test(x); });
        if(!a.length) return null;
        if(!a.every(function(x){ return LK(x) !== undefined; })) return [c, w];
        return [B(c), w.map(B)]; };
      (spec.groups || []).forEach(function(g, i){
        sp.groups[i].name = B(g.name);
        (g.items || []).forEach(function(it, j){ var b = B(it[1]); if(b === it[1]) return; var o = sp.groups[i].items[j]; if(it[3] === undefined || it[3] === '') o[3] = it[1]; o[1] = b; });
      });
      (spec.mcq || []).forEach(function(q, i){ var f = fixOpts(q[1], q[2]); if(f){ sp.mcq[i][1] = f[0]; sp.mcq[i][2] = f[1]; } });
      (spec.spell || []).forEach(function(q, i){ var f = fixOpts(q[1], q[2]); if(f){ sp.spell[i][1] = f[0]; sp.spell[i][2] = f[1]; } });
    }
    if(!(ru1 && l === 'kz') && nAll && nTr / nAll < 0.7) return spec;   /* игра переведена не целиком — не смешиваем языки, оставляем как есть */
    sp.__l = l; sp.__T = T; if(!r2) sp.spell = [];
    (sp.groups || []).forEach(function(g, i){
      var full = window.UI_I18N_LOOKUP(l, 'Найди: ' + spec.groups[i].find);
      if(full !== undefined){ g.find = full; g.findFull = 1; }
    });
    ['custom','extra1','extra3'].forEach(function(f){ if(spec[f]) sp[f] = spec[f]; });
    return sp;
  }

  function run(containerId, SPEC){
    var TT = SPEC.__T || function(x){ return x; };
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
      return S('sp' + e[0] + e[1] + (o5.cap || ''), Object.assign(G.choice({ q:o5.cap || TT('Допиши слово'), say:[G.say(o5.say || ('Допиши слово: ' + e[3] + '.'))], opts:opts, ans:e[1], layout:o5.layout || 'wide', expr:word(e[0]) }),
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
        var q = g.findFull ? g.find : TT('Найди: ') + g.find;
        return S('1p' + g.k + it[1], Object.assign(G.pickPic({ q:q, say:[G.say(q + '.')], items:pool.map(function(p){ return { k:p[1], h:p[0] ? '<span class="e">' + p[0] + '</span>' : '', lab:p[1] }; }), ans:it[1] }), hintItem(g, it)));
      }
      var opts = [g.name].concat(shuffle(ps.filter(function(h){ return h.k !== g.k; })).slice(0, 2).map(function(h){ return h.name; }));
      return S('1c' + g.k + it[1], Object.assign({ expr:vis(it), cap:it[0] ? it[1] + TT(' — это…') : (g.wordCap || (SPEC.askAsCap ? (g.ask || SPEC.askQ) : '') || SPEC.wordCap || TT('Какое это слово?')), say:[G.say((it[3] || it[1]) + '. ' + (g.ask || SPEC.askQ || TT('К какой группе это относится?')))], ans:g.name, opts:G.txtOpts(opts), layout:'card' }, hintItem(g, it)));
    }
    /* ⭐⭐ разложи по корзинам */
    function L2(){
      if(!GR.length) return pick(EX1)();
      var sets = {}; GR.forEach(function(g){ var k = g.set || 0; (sets[k] = sets[k] || []).push(g); });
      var ks = Object.keys(sets).filter(function(k){ return sets[k].length >= 2; }), sk = pick(ks), pool = sets[sk];
      var gs = shuffle(pool).slice(0, Math.min(3, pool.length)), items = [];
      gs.forEach(function(g){ shuffle(g.items).slice(0, gs.length === 2 ? 3 : 2).forEach(function(it){ items.push({ k:g.k, h:it[0] ? it[0] + ' ' + it[1] : it[1] }); }); });
      return S('2s' + gs.map(function(g){ return g.k; }).sort().join('') + rnd(1, 99999), M.sortTask({ wide:true, items:shuffle(items), say:[G.say(gs[0].sortSay ? gs[0].sortSay : (SPEC.sortSay || TT('Разложи по корзинам.')))], cap:gs[0].sortCap || SPEC.sortCap || TT('Выбери картинку, потом корзину'),
        buckets:gs.map(function(g){ return { k:g.k, name:g.name, icon:g.ic, c1:g.c1, c2:g.c2 }; }), hintSay:[G.say(gs[0].sortHint || SPEC.sortHint || TT('Подумай, к какой группе относится каждый предмет.'))] }));
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
