/* Білім Аралы — «Мой режим» (assets/a11y.js)
   Пять переключателей для удобства чтения и спокойной работы:
     big   — крупнее текст
     read  — читаемый шрифт и больше места между буквами и строками
     calm  — меньше движения (без прыжков, облаков и плавных переходов)
     focus — чёткие рамки у кнопок и ссылок, ссылки подчёркнуты
     contrast — выше контрастность и насыщенность цветов
   Выбор хранится только в этом браузере (ключ bilim_a11y_v1) и переносится вместе с прогрессом.
   Подключается из assets/i18n.js. Кнопка «Мой режим» появляется под подвалом страницы, рядом с «Отзывами». */
(function(){
  'use strict';
  if (window.BilimA11y) return;
  var KEY = 'bilim_a11y_v1';
  var OPTS = ['big', 'read', 'calm', 'focus', 'contrast'];

  var TXT = {
    ru: { btn: '👁 Мой режим', h: 'Мой режим', lead: 'Выбери, как тебе удобнее. Это запомнится на этом устройстве.',
      hint: 'Удобно, если мелкий текст читать трудно или быстро устаёшь от движения на экране.',
      big: 'Крупнее текст', read: 'Читаемый шрифт', calm: 'Меньше движения', focus: 'Чёткие рамки у кнопок', contrast: 'Выше контрастность', close: 'Готово', reset: 'Сбросить всё' },
    kz: { btn: '👁 Менің режимім', h: 'Менің режимім', lead: 'Өзіңе ыңғайлысын таңда. Бұл осы құрылғыда сақталады.',
      hint: 'Ұсақ мәтінді оқу қиын болса немесе экрандағы қозғалыстан тез шаршасаң, ыңғайлы.',
      big: 'Мәтін үлкенірек', read: 'Оқуға ыңғайлы қаріп', calm: 'Қозғалыс аз', focus: 'Батырмалардың анық жиектері', contrast: 'Контраст жоғары', close: 'Дайын', reset: 'Бәрін тастау' },
    en: { btn: '👁 My mode', h: 'My mode', lead: 'Choose what is easier for you. It is remembered on this device.',
      hint: 'Handy if small text is hard to read or motion on the screen tires you out.',
      big: 'Bigger text', read: 'Easy-to-read font', calm: 'Less motion', focus: 'Clear outlines on buttons', contrast: 'Higher contrast', close: 'Done', reset: 'Reset all' }
  };

  var CSS =
    'html.a11y-big{font-size:112.5%}' +
    'html.a11y-big body{font-size:1.06em}' +
    'html.a11y-big body,html.a11y-read body{overflow-wrap:break-word}' +
    'html.a11y-read body,html.a11y-read body *:not(code):not(pre):not(.emoji){font-family:Verdana,Tahoma,"Segoe UI",Arial,sans-serif!important;letter-spacing:.04em;word-spacing:.14em}' +
    'html.a11y-read body p,html.a11y-read body li,html.a11y-read body label,html.a11y-read body .pr-note{line-height:1.7}' +
    'html.a11y-calm,html.a11y-calm *,html.a11y-calm *::before,html.a11y-calm *::after{animation-duration:.001s!important;animation-iteration-count:1!important;animation-delay:0s!important;transition-duration:.001s!important;scroll-behavior:auto!important}' +
    'html.a11y-calm .cloud{display:none!important}' +
    'html.a11y-focus a,html.a11y-focus button,html.a11y-focus summary,html.a11y-focus [role=button],html.a11y-focus input,html.a11y-focus select,html.a11y-focus textarea{outline:3px solid #1D3557!important;outline-offset:2px!important}' +
    'html.a11y-focus a:not(.logo):not(.back-link):not([class*=card]):not([class*=btn]){text-decoration:underline!important}' +
    'html.a11y-focus a:focus-visible,html.a11y-focus button:focus-visible,html.a11y-focus input:focus-visible,html.a11y-focus summary:focus-visible{outline:4px solid #E8590C!important;outline-offset:3px!important}' +
    'html.a11y-contrast{filter:contrast(1.28) saturate(1.12)}' +
    '.a11y-open{display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(255,255,255,.75);border:2px solid rgba(29,53,87,.22);color:#1D3557;font:700 .82rem/1.3 Nunito,Arial,sans-serif;cursor:pointer}' +
    '.a11y-open:hover{background:#FFE08A}' +
    '.a11y-back{position:fixed;inset:0;z-index:99999;background:rgba(29,53,87,.55);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.a11y-box{width:100%;max-width:420px;background:#fff;border-radius:24px;padding:22px 20px;box-shadow:0 10px 0 rgba(0,0,0,.12);color:#1D3557;font-family:Nunito,Arial,sans-serif}' +
    '.a11y-box h2{font:800 1.4rem/1.2 "Baloo 2",Nunito,Arial,sans-serif;margin:0 0 6px}' +
    '.a11y-box p.a11y-hint{margin:0 0 12px;font-weight:600;font-size:.88rem;color:#4A6076}' +
    '.a11y-box p{margin:0 0 12px;color:#41566E;font-weight:700;font-size:.95rem;line-height:1.4}' +
    '.a11y-row{display:flex;align-items:center;gap:12px;padding:12px 10px;border-radius:14px;background:#F5F8FA;margin:8px 0;font-weight:800;font-size:1rem;cursor:pointer}' +
    '.a11y-row input{width:26px;height:26px;accent-color:#2F8FD1;flex:none}' +
    '.a11y-act{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}' +
    '.a11y-act button{border:0;border-radius:14px;padding:10px 18px;font:800 1rem "Baloo 2",Nunito,Arial,sans-serif;cursor:pointer}' +
    '.a11y-ok{background:#FFC93C;color:#1D3557;box-shadow:0 4px 0 #E0A620}' +
    '.a11y-reset{background:#E3E9F0;color:#41566E}';

  function lang(){
    try { var s = localStorage.getItem('bilim_lang_v1'); if (s && TXT[s]) return s; } catch(e){}
    return 'ru';
  }
  var cur = null; // язык, выбранный в этом открытии страницы (applyLang), иначе из памяти браузера
  function t(k){ return (TXT[cur || lang()] || TXT.ru)[k] || TXT.ru[k]; }

  function load(){
    var o = {};
    try { var raw = JSON.parse(localStorage.getItem(KEY) || '{}'); OPTS.forEach(function(k){ o[k] = raw && raw[k] === true; }); }
    catch(e){ OPTS.forEach(function(k){ o[k] = false; }); }
    return o;
  }
  function save(o){ try { localStorage.setItem(KEY, JSON.stringify(o)); } catch(e){} }
  function apply(o){
    var c = document.documentElement.classList;
    OPTS.forEach(function(k){ if (o[k]) c.add('a11y-' + k); else c.remove('a11y-' + k); });
  }

  var st = document.createElement('style'); st.id = 'a11y-css'; st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);
  apply(load());

  var lastFocus = null, back = null;
  function close(){
    if (!back) return;
    document.removeEventListener('keydown', onKey, true);
    back.parentNode.removeChild(back); back = null;
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch(e){}
  }
  function onKey(e){
    if (!back) return;
    if (e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if (e.key === 'Tab'){
      var f = back.querySelectorAll('input,button'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }
  function open(){
    if (back) return;
    lastFocus = document.activeElement;
    var o = load();
    back = document.createElement('div'); back.className = 'a11y-back';
    var box = document.createElement('div'); box.className = 'a11y-box';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'a11y-h');
    var h = document.createElement('h2'); h.id = 'a11y-h'; h.textContent = t('h');
    var p = document.createElement('p'); p.textContent = t('lead');
    var hn = document.createElement('p'); hn.className = 'a11y-hint'; hn.textContent = t('hint');
    box.appendChild(h); box.appendChild(p); box.appendChild(hn);
    var inputs = {};
    OPTS.forEach(function(k){
      var row = document.createElement('label'); row.className = 'a11y-row';
      var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!o[k];
      cb.onchange = function(){ var cur = load(); cur[k] = cb.checked; save(cur); apply(cur); };
      inputs[k] = cb;
      var sp = document.createElement('span'); sp.textContent = t(k);
      row.appendChild(cb); row.appendChild(sp); box.appendChild(row);
    });
    var act = document.createElement('div'); act.className = 'a11y-act';
    var ok = document.createElement('button'); ok.type = 'button'; ok.className = 'a11y-ok'; ok.textContent = t('close'); ok.onclick = close;
    var rs = document.createElement('button'); rs.type = 'button'; rs.className = 'a11y-reset'; rs.textContent = t('reset');
    rs.onclick = function(){ var z = {}; OPTS.forEach(function(k){ z[k] = false; inputs[k].checked = false; }); save(z); apply(z); };
    act.appendChild(ok); act.appendChild(rs); box.appendChild(act);
    back.appendChild(box);
    back.addEventListener('click', function(e){ if (e.target === back) close(); });
    document.body.appendChild(back);
    document.addEventListener('keydown', onKey, true);
    inputs[OPTS[0]].focus();
  }

  function paintBtn(){
    var b = document.querySelectorAll('.a11y-open');
    for (var i = 0; i < b.length; i++){ b[i].textContent = t('btn'); b[i].setAttribute('aria-label', t('btn').replace(/^\S+\s/, '')); }
  }
  function addButton(tries){
    if (document.querySelector('.a11y-open')) return;
    var w = document.querySelector('.feedback-wrap');
    if (!w){ if (tries > 0) setTimeout(function(){ addButton(tries - 1); }, 250); return; }
    var b = document.createElement('button'); b.type = 'button'; b.className = 'a11y-open'; b.textContent = t('btn');
    b.setAttribute('aria-label', t('btn').replace(/^\S+\s/, ''));
    b.setAttribute('aria-haspopup', 'dialog');
    b.onclick = open;
    w.insertBefore(b, w.firstChild);
  }

  window.BilimA11y = { open: open };
  var orig = window.applyLang;
  window.applyLang = function(l){ if (orig) orig(l); cur = TXT[l] ? l : 'ru'; paintBtn(); };
  function init(){ addButton(20); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
