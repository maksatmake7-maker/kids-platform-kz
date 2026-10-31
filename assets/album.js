/* ===== Білім Аралы — «Альбом наклеек Казахстана» (чердак Дома Барсика): логика =====
   Подключать после house-i18n.js, album-data.js, progress.js, barsik.js, house.js.
   Открытие: i-я наклейка открывается, когда ребёнок заработал за всё время не меньше need(i) звёзд (10, 25, 45, 70, 100 … 1150).
   Звёзды НЕ тратятся: берётся общий заработок (House.earned()), а не баланс магазина.
   Хранение: localStorage 'bilim_album_v1' = { opened:{id:1} } — какие наклейки ребёнок уже «развернул». Только в этом браузере, как и остальной прогресс.
   Голос: assets/audio/barsik/<ru|kz>/album_<фраза>.mp3 и album_s_<id>.mp3 (факт); нет файла — только текст. */
(function(){
  'use strict';
  var KEY = 'bilim_album_v1';
  var S = window.ALBUM_STICKERS, N = S.length;
  var ROOT = (typeof PROGRESS_ROOT === 'string' && PROGRESS_ROOT) ? PROGRESS_ROOT : '../';
  var $ = function(id){ return document.getElementById(id); };

  function need(i){ return Math.round(10 * i + 2.5 * i * (i - 1)); }   /* i = 1..N */
  function load(){ try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') return { opened: s.opened || {} }; } catch(e){} return { opened: {} }; }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(A)); } catch(e){} }
  var A = load(), sel = null;

  function earned(){ return window.House ? House.earned() : 0; }
  function unlocked(){ var e = earned(), n = 0; for (var i = 1; i <= N; i++){ if (need(i) <= e) n = i; else break; } return n; }
  function stateOf(i){ if (need(i + 1) > earned()) return 'locked'; return A.opened[S[i].id] ? 'open' : 'new'; }
  function txt(s){ var t = s.t[HI.lang()] || s.t.ru; return { name: t[0], fact: t[1] }; }
  function svg(s){
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><clipPath id="al-frame"><rect x="9" y="9" width="102" height="102" rx="23"/></clipPath>' +
      '<rect x="3" y="3" width="114" height="114" rx="28" fill="#fff"/><rect x="9" y="9" width="102" height="102" rx="23" fill="' + s.bg + '"/><g clip-path="url(#al-frame)">' + s.art + '</g></svg>';
  }
  var LOCK = '<svg viewBox="0 0 14 16" width="12" height="14" aria-hidden="true"><rect x="1" y="7" width="12" height="8" rx="2" fill="#5A4A36"/><path d="M3.5 7 V5 a3.5 3.5 0 0 1 7 0 V7" fill="none" stroke="#5A4A36" stroke-width="2"/></svg>';
  var QSTAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21.5 12,17.5 5.5,21.5 7.5,14 2,9.5 9,9" fill="#FFC93C" stroke="#C98A00" stroke-width="1.5" stroke-linejoin="round"/><text x="12" y="16" text-anchor="middle" font-family="Baloo 2,Arial,sans-serif" font-weight="800" font-size="11" fill="#7A3B2E">?</text></svg>';

  /* --- голос: цепочка записей; нет файла или язык без записей — молча идём дальше --- */
  var cur = null, chain = 0;
  function speak(files){
    var my = ++chain, i = 0, dir = HI.voiceDir();
    if (cur){ try { cur.pause(); } catch(e){} }
    if (!dir) return;
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

  var bs = $('bs'), bubble = $('bubble'), bt = null;
  var b = Barsik.mount(bs, { grade: 1, track: true });
  function say(id, voice){
    bubble.textContent = HI.t('say_' + id);
    bubble.setAttribute('dir', HI.lang() === 'ug' ? 'rtl' : 'ltr');
    bubble.classList.add('on');
    clearTimeout(bt); bt = setTimeout(function(){ bubble.classList.remove('on'); }, 4200);
    if (voice !== false) speak(['album_' + id.replace(/^album_/, '')]);
  }
  function celebrate(){
    b.react('happy', 1900);
    bs.classList.remove('spin'); void bs.offsetWidth; bs.classList.add('spin');
    setTimeout(function(){ bs.classList.remove('spin'); }, 1000);
  }

  function render(){
    var h = '', n = unlocked(), opened = 0;
    S.forEach(function(s, i){
      var st = stateOf(i), t = txt(s);
      if (st === 'open') opened++;
      var label = st === 'locked' ? HI.t('album_locked', { n: need(i + 1) }) : st === 'new' ? HI.t('album_new') : t.name;
      h += '<button type="button" class="al-st ' + st + (sel === s.id && st === 'open' ? ' sel' : '') + '" data-i="' + i + '" aria-label="' + label + '">' + svg(s) +
        (st === 'new' ? '<span class="al-q">' + QSTAR + '</span><span class="al-badge nw">' + HI.t('album_new') + '</span>' :
         st === 'locked' ? '<span class="al-badge lk">' + LOCK + HI.t('album_locked', { n: need(i + 1) }) + '</span>' :
         '<span class="al-name">' + t.name + '</span>') + '</button>';
    });
    $('grid').innerHTML = h;
    $('goalMain').textContent = HI.t('album_count', { n: n, total: N });
    var next = n < N ? need(n + 1) : null;
    if (next === null){ $('goalSub').textContent = HI.t('album_done_main') + ' ' + HI.t('album_done_sub'); $('goalBar').style.width = '100%'; }
    else {
      var prev = n > 0 ? need(n) : 0;
      $('goalSub').textContent = HI.t('album_next', { n: next - earned() });
      $('goalBar').style.width = Math.max(4, Math.min(100, Math.round((earned() - prev) / (next - prev) * 100))) + '%';
    }
    if (window.House) House.badge();
  }
  function showDetail(s){
    var t = txt(s), d = $('detail');
    d.hidden = false;
    d.querySelector('.pic').innerHTML = svg(s);
    d.querySelector('h3').textContent = t.name; d.querySelector('p').textContent = t.fact;
    d.setAttribute('dir', HI.lang() === 'ug' ? 'rtl' : 'ltr');
  }

  $('grid').addEventListener('click', function(e){
    var btn = e.target.closest('.al-st'); if (!btn) return;
    var i = +btn.getAttribute('data-i'), s = S[i], st = stateOf(i);
    if (st === 'locked'){ say('album_locked'); return; }
    if (st === 'new'){
      A.opened[s.id] = 1; save(); sel = s.id; render(); showDetail(s);
      var el = $('grid').children[i]; if (el) el.classList.add('pop');
      celebrate(); say('album_open', false); bubble.textContent = HI.t('say_album_open');
      speak(['album_open', 'album_s_' + s.id]);
      return;
    }
    sel = s.id; render(); showDetail(s);
    bubble.classList.remove('on');
    speak(['album_s_' + s.id]);
  });
  bs.addEventListener('click', function(){ b.react('happy', 1200); });

  HI.on(function(){ render(); var s = S.filter(function(x){ return x.id === sel; })[0]; if (s) showDetail(s); bubble.classList.remove('on'); });

  render();
  setTimeout(function(){
    var n = unlocked(), fresh = 0;
    for (var i = 0; i < n; i++) if (stateOf(i) === 'new') fresh++;
    if (n === 0) say('album_first');
    else if (fresh) say('album_new');
    else if (n === N) say('album_all');
    else say('album_in');
  }, 450);
})();
