/* ===== Білім Аралы — «Квесты Барсика»: логика =====
   Подключать после house-i18n.js, quest-data.js, progress.js, barsik.js.
   Ход: список квестов → главы (рассказ, рисунок, три варианта ответа) → финал. Ошибка — не штраф: Барсик подсказывает, можно пробовать снова.
   Класс: ?grade=1..4 (ссылки со страниц классов) → иначе последний выбранный (bilim_quest_level) → 1. На списке квестов класс можно сменить: сильный ребёнок берёт выше, слабый — ниже.
   Звёзды (только за учёбу): 1 звезда за главу, решённую с первой попытки; в конце recordGameResult('quest_<id>_g<класс>', звёзды, число глав).
   Хранение: localStorage 'bilim_quest_v1' = { <id>: { levels: { <класс>: { best, done } } } } — только в этом браузере.
   Голос: assets/audio/barsik/<ru|kz>/quest_<id>_g<класс>_<глава>_<story|hint|ok>.mp3 (+ quest_<id>_intro, quest_<id>_outro). Пока записей нет, VOICE = false (иначе браузер ходит за несуществующими файлами). */
(function(){
  'use strict';
  var VOICE = false;
  var KEY = 'bilim_quest_v1';
  var ROOT = (typeof PROGRESS_ROOT === 'string' && PROGRESS_ROOT) ? PROGRESS_ROOT : '../';
  var QS = window.QUESTS || [];
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load(){ try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') return s; } catch(e){} return {}; }
  function save(o){ try { localStorage.setItem(KEY, JSON.stringify(o)); } catch(e){} }

  /* --- голос: цепочка записей; нет записей или язык без них — молча --- */
  var cur = null, chain = 0;
  function speak(files){
    var my = ++chain, i = 0, dir = HI.voiceDir();
    if (cur){ try { cur.pause(); } catch(e){} }
    if (!VOICE || !dir) return;
    (function next(){
      if (my !== chain || i >= files.length) return;
      var f = files[i++], a, fired = false;
      function nx(){ if (fired) return; fired = true; next(); }
      try {
        a = new Audio(ROOT + 'assets/audio/barsik/' + dir + '/' + f + '.mp3'); cur = a;
        a.addEventListener('ended', nx); a.addEventListener('error', nx);
        var p = a.play(); if (p && p.catch) p.catch(nx);
      } catch(e){ nx(); }
    })();
  }

  var bs = $('bs'), bubble = $('bubble'), panel = $('panel');
  var b = Barsik.mount(bs, { grade: 1, track: true });
  function bubbleSay(text){
    bubble.textContent = text || '';
    bubble.setAttribute('dir', HI.lang() === 'ug' ? 'rtl' : 'ltr');
    bubble.style.display = text ? '' : 'none';
  }

  /* --- класс (уровень заданий) --- */
  var LKEY = 'bilim_quest_level';
  function levels(){ return (QS[0] && QS[0].levels) || [1]; }
  function clampLevel(n){ n = parseInt(n, 10); var L = levels(); if (!n || n < L[0]) return L[0]; if (n > L[L.length - 1]) return L[L.length - 1]; return n; }
  function startLevel(){
    var m = /[?&]grade=(\d+)/.exec(location.search);
    if (m) return clampLevel(m[1]);
    try { var v = localStorage.getItem(LKEY); if (v) return clampLevel(v); } catch(e){}
    return levels()[0];
  }
  var LEVEL = startLevel();
  function setLevel(n){ LEVEL = clampLevel(n); try { localStorage.setItem(LKEY, String(LEVEL)); } catch(e){} }

  /* --- состояние --- */
  var S = { screen: 'list', q: null, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: null, level: LEVEL };
  function quest(){ return QS.filter(function(q){ return q.id === S.q; })[0]; }
  function chap(){ var q = quest(); return q.chapters[S.ci].levels[S.level]; }
  function vid(){ return 'quest_' + S.q + '_g' + S.level + '_' + quest().chapters[S.ci].id; }

  /* --- тексты: {a} — число, {seq} — ряд чисел, {a:horse} — число с существительным в нужной форме (qa_nn_horse …) --- */
  function plural(n){
    var l = HI.lang(), forms = 2;
    if (l === 'ru'){ var m10 = n % 10, m100 = n % 100; return (m10 === 1 && m100 !== 11) ? 0 : (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) ? 1 : 2; }
    if (l === 'en') return n === 1 ? 0 : 1;
    return 0;
  }
  function noun(n, key){
    var f = HI.t('qa_nn_' + key);
    if (Array.isArray(f)) return n + ' ' + (f[plural(n)] || f[f.length - 1]);
    return String(f).replace('{n}', n);
  }
  function fmt(text, v, L){
    var vars = {}, k; for (k in (v || {})) vars[k] = v[k];
    if (L && L.nums) vars.seq = L.nums.join(', ');
    return String(text).replace(/\{(\w+)(?::(\w+))?\}/g, function(all, name, nn){
      if (vars[name] === undefined) return all;
      return nn ? noun(vars[name], nn) : vars[name];
    });
  }
  function T(prefix, key, L){ return fmt(HI.t('qa_' + prefix + '_' + key), L && L.v, L); }
  function tq(k){ return HI.t('qa_' + k); }
  function gradeText(n){ return HI.t('q_grade', { n: n }); }

  /* --- рисунки сцен (viewBox 360×150) --- */
  function star(cx, cy, r, fill, stroke){
    var p = [], i; for (i = 0; i < 10; i++){ var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); }
    return '<polygon points="' + p.join(' ') + '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="2" stroke-linejoin="round"/>';
  }
  function shape(kind, cx, cy, r, fill, stroke){
    var st = ' fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="2.5" stroke-linejoin="round"';
    if (kind === 'circle') return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"' + st + '/>';
    if (kind === 'square') return '<rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + 2 * r + '" height="' + 2 * r + '" rx="3"' + st + '/>';
    return '<polygon points="' + cx + ',' + (cy - r) + ' ' + (cx + r * 1.1) + ',' + (cy + r * .9) + ' ' + (cx - r * 1.1) + ',' + (cy + r * .9) + '"' + st + '/>';
  }
  var WAVE = 'q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0';
  var SCENES = {
    horses: function(){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="96" width="360" height="54" fill="#8FD08A"/><path d="M0 120 Q90 100 180 118 T360 112 V150 H0Z" fill="#7CC47F"/>' +
        '<rect y="118" width="360" height="32" fill="#5CB8E8"/><path d="M0 128 ' + WAVE + '" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>';
      [10, 50, 90].forEach(function(x){ h += '<use href="#q-horse" x="' + x + '" y="66" width="42" height="33" style="color:#8B5A2B"/>'; });
      [176, 212, 248, 284].forEach(function(x){ h += '<use href="#q-horse" x="' + x + '" y="66" width="42" height="33" style="color:#C98B52"/>'; });
      return h + '<path d="M136 80 H160 M152 72 L162 80 L152 88" fill="none" stroke="#1D3557" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    },
    corral: function(){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="70" width="360" height="80" fill="#9CD97F"/><path d="M0 96 Q110 78 220 94 T360 90 V150 H0Z" fill="#8FD08A"/>' +
        '<rect y="124" width="360" height="26" fill="#5CB8E8"/><path d="M0 134 ' + WAVE + '" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>' +
        '<g stroke="#8B5A2B" stroke-width="5" stroke-linecap="round"><path d="M20 58 V106 M100 58 V106 M180 58 V106 M260 58 V106 M340 58 V106 M12 70 H348 M12 88 H348"/></g>';
      [[22, 62, '#8B5A2B'], [64, 66, '#C98B52'], [112, 62, '#5B3A1E'], [194, 66, '#8B5A2B'], [236, 62, '#C98B52'], [284, 66, '#5B3A1E']].forEach(function(p){ h += '<use href="#q-horse" x="' + p[0] + '" y="' + p[1] + '" width="42" height="33" style="color:' + p[2] + '"/>'; });
      return h;
    },
    bridge: function(L){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="96" width="360" height="54" fill="#5CB8E8"/><path d="M0 112 ' + WAVE + '" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>' +
        '<rect x="0" y="86" width="14" height="64" fill="#8FD08A"/><rect x="346" y="86" width="14" height="64" fill="#8FD08A"/>';
      var items = L.seq || L.nums;
      items.forEach(function(it, i){
        var x = 16 + i * 56;
        h += '<rect x="' + x + '" y="52" width="50" height="36" rx="6" fill="#C98B52" stroke="#7A4620" stroke-width="2.5"/>';
        if (L.seq) h += shape(it, x + 25, 70, 10, it === 'circle' ? '#FFD34D' : '#FF8FA3', '#7A4620');
        else h += '<text x="' + (x + 25) + '" y="79" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + (String(it).length > 2 ? 20 : 24) + '" fill="#fff" stroke="#7A4620" stroke-width=".8">' + it + '</text>';
      });
      return h + '<rect x="296" y="52" width="50" height="36" rx="6" fill="none" stroke="#7A4620" stroke-width="3" stroke-dasharray="7 5"/><text x="321" y="80" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#7A4620">?</text>';
    },
    steppe: function(){
      return '<rect width="360" height="150" fill="#CFEAFB"/><circle cx="300" cy="34" r="20" fill="#FFD34D"/><circle cx="300" cy="34" r="28" fill="#FFE27A" opacity=".4"/>' +
        '<path d="M0 100 Q70 66 150 96 T360 88 V150 H0Z" fill="#9CD97F"/><path d="M0 122 Q110 98 220 120 T360 112 V150 H0Z" fill="#7CC47F"/>' +
        '<g transform="translate(70 80)"><path d="M-22 18 A22 20 0 0 1 22 18Z" fill="#FFF7E3" stroke="#B9A98A" stroke-width="2"/><rect x="-22" y="18" width="44" height="2" fill="#B9A98A"/><path d="M-6 18 V6 h12 V18Z" fill="#7A3B2E"/></g>' +
        '<g fill="none" stroke="#5CAA62" stroke-width="2.5" stroke-linecap="round"><path d="M200 134 l-3 -12 M204 134 l1 -14 M208 134 l4 -11"/><path d="M270 138 l-3 -12 M274 138 l1 -14 M278 138 l4 -11"/><path d="M120 140 l-3 -10 M124 140 l1 -12 M128 140 l4 -9"/></g>' +
        '<g fill="#3B2A1A" opacity=".55"><path d="M236 40 q5 -6 10 0 q5 -6 10 0 q-5 2 -10 5 q-5 -3 -10 -5Z"/></g>';
    },
    mountains: function(){
      return '<rect width="360" height="150" fill="#CFEAFB"/><circle cx="64" cy="32" r="18" fill="#FFD34D"/><circle cx="64" cy="32" r="26" fill="#FFE27A" opacity=".4"/>' +
        '<path d="M0 120 L80 50 L140 100 L210 30 L290 110 L330 70 L360 96 V150 H0Z" fill="#8FA4BC"/><path d="M210 30 L238 58 L222 54 L210 66 L196 54 L184 58Z" fill="#fff"/><path d="M80 50 L100 68 L88 66 L80 76 L68 66 L58 70Z" fill="#fff"/>' +
        '<path d="M0 132 Q90 108 180 126 T360 118 V150 H0Z" fill="#7CC47F"/><path d="M0 144 Q100 128 200 140 T360 136 V150 H0Z" fill="#6AB070"/>' +
        '<g fill="#6B7F95"><path d="M250 128 l8 -12 l9 12Z"/><path d="M130 134 l6 -9 l7 9Z"/></g>';
    },
    map: function(){
      return '<rect width="360" height="150" fill="#E8D5A8"/><rect x="10" y="8" width="340" height="134" rx="12" fill="#F6E7BF" stroke="#B9955A" stroke-width="4"/>' +
        '<path d="M40 70 C50 40 90 36 120 44 C150 30 200 34 230 46 C270 40 316 52 322 78 C318 104 270 120 230 112 C190 126 140 120 110 110 C80 118 44 100 40 70Z" fill="#CBE8A8" stroke="#8FB36A" stroke-width="3"/>' +
        '<path d="M120 100 C150 70 170 96 200 74 C220 60 250 64 276 56" fill="none" stroke="#E8584A" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>' +
        '<circle cx="120" cy="100" r="6" fill="#FFD34D" stroke="#7A4620" stroke-width="2"/><circle cx="200" cy="74" r="6" fill="#FFD34D" stroke="#7A4620" stroke-width="2"/>' +
        star(276, 56, 13, '#FF6B5B', '#8E2F3A') + '<g stroke="#7A4620" stroke-width="2" fill="none" stroke-linecap="round"><path d="M70 120 H84 M77 113 V127"/></g>';
    },
    yurt: function(L){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="104" width="360" height="46" fill="#8FD08A"/>' +
        '<g transform="translate(70 104)"><path d="M-52 0 A52 46 0 0 1 52 0Z" fill="#FFF7E3" stroke="#B9A98A" stroke-width="3"/><rect x="-52" y="-4" width="104" height="6" fill="#E8584A"/><path d="M-14 0 V-26 h28 V0Z" fill="#7A3B2E"/><circle cx="0" cy="-48" r="7" fill="#E8584A"/></g>';
      var cols = ['#FF8FA3', '#5CC8E1', '#B58CF0', '#FFB347', '#7BD389', '#FFD34D'], n = L.kids || 0, step = n > 4 ? 32 : 42, x0 = 190;
      for (var i = 0; i < n; i++){ var x = x0 + i * step, c = cols[i % 6]; h += '<circle cx="' + x + '" cy="82" r="10" fill="#FFE4A8" stroke="#7A4620" stroke-width="2"/><path d="M' + (x - 13) + ' 118 Q' + x + ' 80 ' + (x + 13) + ' 118Z" fill="' + c + '" stroke="#7A4620" stroke-width="2"/><circle cx="' + (x - 3.5) + '" cy="81" r="1.3" fill="#3B2A1A"/><circle cx="' + (x + 3.5) + '" cy="81" r="1.3" fill="#3B2A1A"/>'; }
      var bx = n ? 146 : 200;
      return h + '<g transform="translate(' + bx + ' 118)"><path d="M-17 0 C-22 -22 -12 -32 0 -32 C12 -32 22 -22 17 0Z" fill="#C98B52" stroke="#7A4620" stroke-width="2.5"/><path d="M-9 -32 L0 -41 L9 -32" fill="none" stroke="#7A4620" stroke-width="3" stroke-linecap="round"/><text x="0" y="-9" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + (String(L.bag).length > 2 ? 14 : 17) + '" fill="#fff">' + L.bag + '</text></g>';
    },
    stars: function(L){
      var nums = L.nums, n = nums.length, gap = n > 4 ? 56 : 68, x0 = n > 4 ? 36 : 40, r = n > 4 ? 23 : 26, i;
      var h = '<rect width="360" height="150" fill="#1D2B5E"/><rect y="118" width="360" height="32" fill="#2F5E4A"/><g fill="#fff" opacity=".8"><circle cx="24" cy="22" r="1.5"/><circle cx="110" cy="14" r="1.2"/><circle cx="212" cy="20" r="1.5"/><circle cx="330" cy="26" r="1.4"/><circle cx="60" cy="108" r="1.2"/><circle cx="290" cy="104" r="1.4"/></g>';
      for (i = 0; i < n; i++) h += star(x0 + i * gap, 66, r, '#FFD34D', '#C98A00') + '<text x="' + (x0 + i * gap) + '" y="75" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + (String(nums[i]).length > 1 ? 20 : 22) + '" fill="#7A4620">' + nums[i] + '</text>';
      var qx = x0 + n * gap;
      return h + star(qx, 66, r, 'none', '#FFD34D').replace('stroke-width="2"', 'stroke-width="3" stroke-dasharray="6 5"') + '<text x="' + qx + '" y="76" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#FFD34D">?</text>';
    }
  };

  /* --- экраны --- */
  function optHtml(L, o, i){
    var inner, label;
    if (L.kind === 'num'){ inner = String(o); label = String(o); }
    else if (L.kind === 'shape'){ inner = '<svg viewBox="0 0 44 44" aria-hidden="true">' + shape(o, 22, 22, 15, o === 'circle' ? '#FFD34D' : o === 'square' ? '#FF8FA3' : '#5CC8E1', '#7A4620') + '</svg>'; label = HI.t('qa_shape_' + o); }
    else { label = tq(L.opt + '_o' + (o + 1)); inner = esc(label); }
    var st = S.wrong[i] ? ' bad' : (S.solved && i === L.ans ? ' good' : '');
    return '<button type="button" class="qs-opt' + (L.kind === 'text' ? ' txt' : '') + st + '" data-i="' + i + '" aria-label="' + esc(label) + '"' + (S.solved || S.wrong[i] ? ' disabled' : '') + '>' + inner + '</button>';
  }
  function dots(q){ var h = '<div class="qs-dots" aria-hidden="true">'; q.chapters.forEach(function(c, i){ h += '<i class="' + (i < S.ci || (i === S.ci && S.solved) ? 'on' : i === S.ci ? 'now' : '') + '"></i>'; }); return h + '</div>'; }

  function levelPills(){
    var h = '<div class="qs-lv" role="group" aria-label="' + esc(HI.t('q_grade_label')) + '"><span class="qs-lvl">' + esc(HI.t('q_grade_label')) + '</span>';
    levels().forEach(function(n){ h += '<button type="button" class="qs-pill' + (n === LEVEL ? ' on' : '') + '" data-act="level" data-n="' + n + '" aria-pressed="' + (n === LEVEL) + '">' + esc(gradeText(n)) + '</button>'; });
    return h + '</div>';
  }
  function renderList(){
    var rec = load(), h = '<div class="qs-card"><p>' + esc(HI.t('q_lead')) + '</p>' + levelPills() + '</div>';
    QS.forEach(function(q){
      var r = rec[q.id] && rec[q.id].levels && rec[q.id].levels[LEVEL], m = q.chapters.length;
      h += '<div class="qs-card" style="margin-top:14px"><h2>' + esc(tq('title')) + '</h2>' + (r && r.done ? '<span class="qs-badge">' + esc(HI.t('q_done', { n: r.best, m: m })) + '</span>' : '') +
        '<p>' + esc(tq('desc')) + '</p><div class="qs-row"><button type="button" class="qs-btn" data-act="start" data-q="' + q.id + '">' + esc(HI.t('q_start')) + '</button></div></div>';
    });
    panel.innerHTML = h;
    bubbleSay(null);
  }
  function renderPlay(){
    var q = quest(), L = chap(), m = q.chapters.length;
    var h = dots(q) + '<div class="qs-card"><div class="lbl">' + esc(HI.t('q_chapter', { n: S.ci + 1, m: m })) + ' · ' + esc(gradeText(S.level)) + '</div>' +
      '<svg class="qs-scene" viewBox="0 0 360 150" role="img">' + SCENES[L.scene](L) + '</svg>' +
      '<p class="qs-story">' + esc(T('s', L.story, L)) + '</p>' +
      '<div class="qs-opts" role="group" aria-label="' + esc(HI.t('q_pick')) + '">' + L.opts.map(function(o, i){ return optHtml(L, o, i); }).join('') + '</div>' +
      (S.solved ? '<div class="qs-row"><button type="button" class="qs-btn" data-act="next">' + esc(HI.t('q_next')) + '</button></div>' : '') + '</div>';
    panel.innerHTML = h;
    var svg = panel.querySelector('.qs-scene'); if (svg) svg.setAttribute('aria-hidden', 'true');
    bubbleSay(sayOf(S.say, L));
  }
  function renderEnd(){
    var q = quest(), m = q.chapters.length;
    panel.innerHTML = '<div class="qs-card qs-final"><div class="big">' + esc(HI.t('q_final_h')) + '</div><div class="st">' + esc(HI.t('q_stars', { n: S.score, m: m })) + '</div>' +
      '<p>' + esc(tq('outro')) + '</p><div class="qs-row" style="justify-content:center"><button type="button" class="qs-btn" data-act="again">' + esc(HI.t('q_again')) + '</button><button type="button" class="qs-btn alt" data-act="list">' + esc(HI.t('q_list')) + '</button></div></div>';
    bubbleSay(tq('outro'));
  }
  /* реплика Барсика: 'intro' | 'HINT' | 'OK' → готовый текст для пузыря */
  function sayOf(tok, L){
    if (tok === 'intro') return tq('intro');
    if (tok === 'HINT') return T('h', L.hint, L);
    if (tok === 'OK') return T('o', L.ok, L);
    return null;
  }
  function render(){
    if (S.screen === 'list') renderList(); else if (S.screen === 'play') renderPlay(); else renderEnd();
    var h1 = document.querySelector('.hs-top h1'); if (h1) h1.textContent = HI.t('q_h1');
  }

  /* --- действия --- */
  function start(id){
    S = { screen: 'play', q: id, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: 'intro', level: LEVEL };
    b.set('idle');
    render();
    speak(['quest_' + id + '_intro', vid() + '_story']);
  }
  function choose(i){
    var L = chap();
    if (S.solved || S.wrong[i]) return;
    if (i === L.ans){
      S.solved = true; S.say = 'OK';
      if (!S.bad) S.score++;
      b.react('happy', 1800);
      render(); speak([vid() + '_ok']);
      var nx = panel.querySelector('[data-act=next]'); if (nx) nx.focus();
    } else {
      S.wrong[i] = 1; S.bad++; S.say = 'HINT';
      b.react('oops', 1400);
      render(); speak([vid() + '_hint']);
    }
  }
  function next(){
    var q = quest();
    if (S.ci + 1 < q.chapters.length){
      S.ci++; S.solved = false; S.bad = 0; S.wrong = {}; S.say = null;
      b.set('idle'); render(); speak([vid() + '_story']);
      return;
    }
    S.screen = 'end';
    var rec = load(), r = rec[q.id] || {}; r.levels = r.levels || {};
    var x = r.levels[S.level] || { best: 0, done: 0 };
    x.best = Math.max(x.best || 0, S.score); x.done = 1; r.levels[S.level] = x; rec[q.id] = r; save(rec);
    try { if (typeof recordGameResult === 'function') recordGameResult('quest_' + q.id + '_g' + S.level, S.score, q.chapters.length); } catch(e){}
    b.react('cheer', 2600);
    render(); speak(['quest_' + q.id + '_outro']);
  }

  panel.addEventListener('click', function(e){
    var t = e.target.closest('button'); if (!t) return;
    if (t.classList.contains('qs-opt')) return choose(+t.getAttribute('data-i'));
    var a = t.getAttribute('data-act');
    if (a === 'start') start(t.getAttribute('data-q'));
    else if (a === 'next') next();
    else if (a === 'again') start(S.q);
    else if (a === 'level'){ setLevel(+t.getAttribute('data-n')); S.level = LEVEL; render(); }
    else if (a === 'list'){ S = { screen: 'list', q: null, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: null, level: LEVEL }; render(); }
  });
  HI.on(function(){ render(); });
  render();
  window.__quest = { state: function(){ return S; }, level: function(){ return LEVEL; } };
})();
