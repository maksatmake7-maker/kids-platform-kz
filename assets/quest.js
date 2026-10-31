/* ===== Білім Аралы — «Квесты Барсика»: логика =====
   Подключать после house-i18n.js, quest-data.js, progress.js, barsik.js.
   Ход: список квестов → главы (рассказ, рисунок, три варианта ответа) → финал. Ошибка — не штраф: Барсик подсказывает, можно пробовать снова.
   Звёзды (только за учёбу): 1 звезда за главу, решённую с первой попытки; в конце recordGameResult('quest_<id>', звёзды, число глав).
   Хранение: localStorage 'bilim_quest_v1' = { <id>: { best, done } } — только в этом браузере.
   Голос: assets/audio/barsik/<ru|kz>/quest_<id>_<ключ>.mp3. Пока записей нет, VOICE = false (иначе браузер ходит за несуществующими файлами). */
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
  function bubbleSay(key, files){
    bubble.textContent = key ? HI.t(key) : '';
    bubble.setAttribute('dir', HI.lang() === 'ug' ? 'rtl' : 'ltr');
    bubble.style.display = key ? '' : 'none';
    if (files) speak(files);
  }

  /* --- состояние --- */
  var S = { screen: 'list', q: null, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: null };
  function quest(){ return QS.filter(function(q){ return q.id === S.q; })[0]; }
  function tq(k){ return HI.t('qa_' + k); }

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
  var SCENES = {
    horses: function(){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="96" width="360" height="54" fill="#8FD08A"/><path d="M0 120 Q90 100 180 118 T360 112 V150 H0Z" fill="#7CC47F"/>' +
        '<rect y="118" width="360" height="32" fill="#5CB8E8"/><path d="M0 128 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>';
      [10, 50, 90].forEach(function(x){ h += '<use href="#q-horse" x="' + x + '" y="66" width="42" height="33" style="color:#8B5A2B"/>'; });
      [176, 212, 248, 284].forEach(function(x){ h += '<use href="#q-horse" x="' + x + '" y="66" width="42" height="33" style="color:#C98B52"/>'; });
      return h + '<path d="M136 80 H160 M152 72 L162 80 L152 88" fill="none" stroke="#1D3557" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
    },
    bridge: function(){
      var seq = ['circle', 'square', 'circle', 'square', 'circle'], h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="96" width="360" height="54" fill="#5CB8E8"/><path d="M0 112 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>' +
        '<rect x="0" y="86" width="14" height="64" fill="#8FD08A"/><rect x="346" y="86" width="14" height="64" fill="#8FD08A"/>';
      seq.forEach(function(k, i){ var x = 16 + i * 56; h += '<rect x="' + x + '" y="52" width="50" height="36" rx="6" fill="#C98B52" stroke="#7A4620" stroke-width="2.5"/>' + shape(k, x + 25, 70, 10, k === 'circle' ? '#FFD34D' : '#FF8FA3', '#7A4620'); });
      return h + '<rect x="296" y="52" width="50" height="36" rx="6" fill="none" stroke="#7A4620" stroke-width="3" stroke-dasharray="7 5"/><text x="321" y="80" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#7A4620">?</text>';
    },
    steppe: function(){
      return '<rect width="360" height="150" fill="#CFEAFB"/><circle cx="300" cy="34" r="20" fill="#FFD34D"/><circle cx="300" cy="34" r="28" fill="#FFE27A" opacity=".4"/>' +
        '<path d="M0 100 Q70 66 150 96 T360 88 V150 H0Z" fill="#9CD97F"/><path d="M0 122 Q110 98 220 120 T360 112 V150 H0Z" fill="#7CC47F"/>' +
        '<g transform="translate(70 80)"><path d="M-22 18 A22 20 0 0 1 22 18Z" fill="#FFF7E3" stroke="#B9A98A" stroke-width="2"/><rect x="-22" y="18" width="44" height="2" fill="#B9A98A"/><path d="M-6 18 V6 h12 V18Z" fill="#7A3B2E"/></g>' +
        '<g fill="none" stroke="#5CAA62" stroke-width="2.5" stroke-linecap="round"><path d="M200 134 l-3 -12 M204 134 l1 -14 M208 134 l4 -11"/><path d="M270 138 l-3 -12 M274 138 l1 -14 M278 138 l4 -11"/><path d="M120 140 l-3 -10 M124 140 l1 -12 M128 140 l4 -9"/></g>' +
        '<g fill="#3B2A1A" opacity=".55"><path d="M236 40 q5 -6 10 0 q5 -6 10 0 q-5 2 -10 5 q-5 -3 -10 -5Z"/></g>';
    },
    yurt: function(){
      var h = '<rect width="360" height="150" fill="#CFEAFB"/><rect y="104" width="360" height="46" fill="#8FD08A"/>' +
        '<g transform="translate(70 104)"><path d="M-52 0 A52 46 0 0 1 52 0Z" fill="#FFF7E3" stroke="#B9A98A" stroke-width="3"/><rect x="-52" y="-4" width="104" height="6" fill="#E8584A"/><path d="M-14 0 V-26 h28 V0Z" fill="#7A3B2E"/><circle cx="0" cy="-48" r="7" fill="#E8584A"/></g>';
      ['#FF8FA3', '#5CC8E1', '#B58CF0', '#FFB347'].forEach(function(c, i){ var x = 176 + i * 42; h += '<circle cx="' + x + '" cy="82" r="11" fill="#FFE4A8" stroke="#7A4620" stroke-width="2"/><path d="M' + (x - 14) + ' 118 Q' + x + ' 80 ' + (x + 14) + ' 118Z" fill="' + c + '" stroke="#7A4620" stroke-width="2"/><circle cx="' + (x - 4) + '" cy="81" r="1.4" fill="#3B2A1A"/><circle cx="' + (x + 4) + '" cy="81" r="1.4" fill="#3B2A1A"/>'; });
      return h + '<g transform="translate(136 118)"><path d="M-14 0 C-18 -18 -10 -26 0 -26 C10 -26 18 -18 14 0Z" fill="#C98B52" stroke="#7A4620" stroke-width="2.5"/><path d="M-8 -26 L0 -34 L8 -26" fill="none" stroke="#7A4620" stroke-width="3" stroke-linecap="round"/><text x="0" y="-8" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="15" fill="#fff">10</text></g>';
    },
    stars: function(){
      var h = '<rect width="360" height="150" fill="#1D2B5E"/><rect y="118" width="360" height="32" fill="#2F5E4A"/><g fill="#fff" opacity=".8"><circle cx="24" cy="22" r="1.5"/><circle cx="110" cy="14" r="1.2"/><circle cx="212" cy="20" r="1.5"/><circle cx="330" cy="26" r="1.4"/><circle cx="60" cy="108" r="1.2"/><circle cx="290" cy="104" r="1.4"/></g>', xs = [40, 108, 176, 244], nums = [2, 4, 6, 8], i;
      for (i = 0; i < 4; i++) h += star(xs[i], 66, 26, '#FFD34D', '#C98A00') + '<text x="' + xs[i] + '" y="75" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="22" fill="#7A4620">' + nums[i] + '</text>';
      return h + star(312, 66, 26, 'none', '#FFD34D').replace('stroke-width="2"', 'stroke-width="3" stroke-dasharray="6 5"') + '<text x="312" y="76" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#FFD34D">?</text>';
    }
  };

  /* --- экраны --- */
  function optHtml(ch, o, i){
    var inner, label;
    if (ch.kind === 'num'){ inner = String(o); label = String(o); }
    else if (ch.kind === 'shape'){ inner = '<svg viewBox="0 0 44 44" aria-hidden="true">' + shape(o, 22, 22, 15, o === 'circle' ? '#FFD34D' : o === 'square' ? '#FF8FA3' : '#5CC8E1', '#7A4620') + '</svg>'; label = HI.t('qa_shape_' + o); }
    else { inner = esc(tq(ch.id + '_' + o)); label = tq(ch.id + '_' + o); }
    var st = S.wrong[i] ? ' bad' : (S.solved && i === ch.ans ? ' good' : '');
    return '<button type="button" class="qs-opt' + (ch.kind === 'text' ? ' txt' : '') + st + '" data-i="' + i + '" aria-label="' + esc(label) + '"' + (S.solved || S.wrong[i] ? ' disabled' : '') + '>' + inner + '</button>';
  }
  function dots(q){ var h = '<div class="qs-dots" aria-hidden="true">'; q.chapters.forEach(function(c, i){ h += '<i class="' + (i < S.ci || (i === S.ci && S.solved) ? 'on' : i === S.ci ? 'now' : '') + '"></i>'; }); return h + '</div>'; }

  function renderList(){
    var rec = load(), h = '<div class="qs-card"><p>' + esc(HI.t('q_lead')) + '</p></div>';
    QS.forEach(function(q){
      var r = rec[q.id], m = q.chapters.length;
      h += '<div class="qs-card" style="margin-top:14px"><h2>' + esc(tq('title')) + '</h2>' + (r && r.done ? '<span class="qs-badge">' + esc(HI.t('q_done', { n: r.best, m: m })) + '</span>' : '') +
        '<p>' + esc(tq('desc')) + '</p><div class="qs-row"><button type="button" class="qs-btn" data-act="start" data-q="' + q.id + '">' + esc(HI.t('q_start')) + '</button></div></div>';
    });
    panel.innerHTML = h;
    bubbleSay(null);
  }
  function renderPlay(){
    var q = quest(), ch = q.chapters[S.ci], m = q.chapters.length;
    var h = dots(q) + '<div class="qs-card"><div class="lbl">' + esc(HI.t('q_chapter', { n: S.ci + 1, m: m })) + '</div>' +
      '<svg class="qs-scene" viewBox="0 0 360 150" role="img" aria-label="">' + SCENES[ch.scene]() + '</svg>' +
      '<p class="qs-story">' + esc(tq(ch.id + '_story')) + '</p>' +
      '<div class="qs-opts" role="group" aria-label="' + esc(HI.t('q_pick')) + '">' + ch.opts.map(function(o, i){ return optHtml(ch, o, i); }).join('') + '</div>' +
      (S.solved ? '<div class="qs-row"><button type="button" class="qs-btn" data-act="next">' + esc(HI.t('q_next')) + '</button></div>' : '') + '</div>';
    panel.innerHTML = h;
    var svg = panel.querySelector('.qs-scene'); if (svg) svg.removeAttribute('aria-label');
    bubbleSay(S.say);
  }
  function renderEnd(){
    var q = quest(), m = q.chapters.length;
    panel.innerHTML = '<div class="qs-card qs-final"><div class="big">' + esc(HI.t('q_final_h')) + '</div><div class="st">' + esc(HI.t('q_stars', { n: S.score, m: m })) + '</div>' +
      '<p>' + esc(tq('outro')) + '</p><div class="qs-row" style="justify-content:center"><button type="button" class="qs-btn" data-act="again">' + esc(HI.t('q_again')) + '</button><button type="button" class="qs-btn alt" data-act="list">' + esc(HI.t('q_list')) + '</button></div></div>';
    bubbleSay('qa_outro');
  }
  function render(){
    if (S.screen === 'list') renderList(); else if (S.screen === 'play') renderPlay(); else renderEnd();
    var h1 = document.querySelector('.hs-top h1'); if (h1) h1.textContent = HI.t('q_h1');
  }

  /* --- действия --- */
  function start(id){
    S = { screen: 'play', q: id, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: 'qa_intro' };
    b.set('idle');
    render();
    speak(['quest_' + id + '_intro', 'quest_' + id + '_' + quest().chapters[0].id + '_story']);
  }
  function choose(i){
    var q = quest(), ch = q.chapters[S.ci];
    if (S.solved || S.wrong[i]) return;
    if (i === ch.ans){
      S.solved = true; S.say = 'qa_' + ch.id + '_ok';
      if (!S.bad) S.score++;
      b.react('happy', 1800);
      render(); speak(['quest_' + q.id + '_' + ch.id + '_ok']);
      var nx = panel.querySelector('[data-act=next]'); if (nx) nx.focus();
    } else {
      S.wrong[i] = 1; S.bad++; S.say = 'qa_' + ch.id + '_hint';
      b.react('oops', 1400);
      render(); speak(['quest_' + q.id + '_' + ch.id + '_hint']);
    }
  }
  function next(){
    var q = quest();
    if (S.ci + 1 < q.chapters.length){
      S.ci++; S.solved = false; S.bad = 0; S.wrong = {}; S.say = null;
      b.set('idle'); render(); speak(['quest_' + q.id + '_' + q.chapters[S.ci].id + '_story']);
      return;
    }
    S.screen = 'end';
    var rec = load(), r = rec[q.id] || { best: 0, done: 0 };
    r.best = Math.max(r.best || 0, S.score); r.done = 1; rec[q.id] = r; save(rec);
    try { if (typeof recordGameResult === 'function') recordGameResult('quest_' + q.id, S.score, q.chapters.length); } catch(e){}
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
    else if (a === 'list'){ S = { screen: 'list', q: null, ci: 0, score: 0, bad: 0, solved: false, wrong: {}, say: null }; render(); }
  });
  HI.on(function(){ render(); });
  render();
  window.__quest = { state: function(){ return S; } };
})();
