/* Білім Аралы — окно «Отзывы и предложения» (assets/feedback.js)
   Красивое окно прямо на сайте вместо перехода на Google-форму. Ответы уходят в ту же Google-форму
   (она работает «за кулисами» как приёмник), поэтому свой сервер не нужен и данные детей не собираются.
   Если в форме не заданы номера полей (ENTRY ниже) или что-то не загрузилось — кнопка работает как раньше:
   открывает саму Google-форму в новой вкладке.
   Подключается из assets/i18n.js. Кнопка «Отзывы и предложения» — a.feedback-link под подвалом страницы. */
(function(){
  'use strict';
  if (window.BilimFeedback) return;

  /* === НАСТРОЙКА: номера полей Google-формы (из «предварительно заполненной ссылки»: entry.123456789) ===
     Пока type и text пустые — окно не включается, работает обычная ссылка на форму. */
  var ENTRY = { type: '', text: '', page: '', device: '' };
  var FORM_VIEW = 'https://docs.google.com/forms/d/e/1FAIpQLSdGioSuVXgR6nnKvrKNDBCOVKtouZHGFHxuXdoOvkTK_vMUSw/viewform';
  var FORM_POST = FORM_VIEW.replace(/\/viewform.*$/, '/formResponse');

  /* Значения вариантов должны ТОЧНО совпадать с вариантами в Google-форме (русский / казахский в одной строке). */
  var TYPES = [
    { v: 'Ошибка на сайте, что-то не работает / Сайттағы қате, бірдеңе жұмыс істемейді',
      ru: 'Ошибка на сайте, что-то не работает', kz: 'Сайттағы қате, бірдеңе жұмыс істемейді', en: 'A bug: something does not work' },
    { v: 'Идея или предложение / Идея немесе ұсыныс',
      ru: 'Идея или предложение', kz: 'Идея немесе ұсыныс', en: 'An idea or suggestion' },
    { v: 'Вопрос / Сұрақ',
      ru: 'Вопрос', kz: 'Сұрақ', en: 'A question' },
    { v: 'Спасибо, что понравилось / Рахмет, ұнағаны',
      ru: 'Спасибо, что понравилось', kz: 'Рахмет, ұнағаны', en: 'Thanks, what I liked' },
    { v: 'Ошибка в задании или в тексте / Тапсырмадағы немесе мәтіндегі қате',
      ru: 'Ошибка в задании или в тексте', kz: 'Тапсырмадағы немесе мәтіндегі қате', en: 'A mistake in a task or text' },
    { v: 'Другое / Басқа',
      ru: 'Другое', kz: 'Басқа', en: 'Other' }
  ];

  var TXT = {
    ru: { h: 'Расскажите, что думаете', t: 'О чём вы хотите написать?', pick: 'Выберите вариант', d: 'Расскажите подробнее',
      ph: 'Что вы делали на сайте, что ожидали и что получилось?',
      warn: 'Пожалуйста, НЕ пишите имя и фамилию ребёнка, телефон, адрес, школу и другие личные данные. Достаточно описать, что произошло. Ответ по почте пока не отправляется.',
      priv: 'Политика конфиденциальности', cancel: 'Отмена', send: 'Отправить', sending: 'Отправляем…',
      need: 'Выберите, о чём вы пишете, и напишите пару слов.', fail: 'Не получилось отправить. Проверьте интернет и попробуйте ещё раз.', wait: 'Сообщение только что отправлено. Подождите немного.',
      okh: 'Спасибо!', ok: 'Сообщение получено. Автор читает все отзывы.', close: 'Закрыть', adults: 'Для взрослых: родителей и учителей.' },
    kz: { h: 'Ойыңызды айтыңыз', t: 'Не туралы жазғыңыз келеді?', pick: 'Нұсқаны таңдаңыз', d: 'Толығырақ жазыңыз',
      ph: 'Сайтта не істедіңіз, не күттіңіз, не болды?',
      warn: 'Өтінеміз, баланың аты-жөнін, телефонын, мекенжайын, мектебін және басқа жеке деректерді ЖАЗБАҢЫЗ. Не болғанын сипаттау жеткілікті. Электрондық пошта арқылы жауап әзірге жіберілмейді.',
      priv: 'Құпиялылық саясаты', cancel: 'Бас тарту', send: 'Жіберу', sending: 'Жіберілуде…',
      need: 'Не туралы жазатыныңызды таңдап, бірнеше сөз жазыңыз.', fail: 'Жіберу мүмкін болмады. Интернетті тексеріп, қайта көріңіз.', wait: 'Хабарлама жаңа ғана жіберілді. Сәл күте тұрыңыз.',
      okh: 'Рахмет!', ok: 'Хабарлама қабылданды. Автор барлық пікірді оқиды.', close: 'Жабу', adults: 'Ересектерге: ата-аналар мен мұғалімдерге.' },
    en: { h: 'Tell us what you think', t: 'What would you like to write about?', pick: 'Please choose an option', d: 'Tell us more',
      ph: 'What were you doing on the site, what did you expect and what happened?',
      warn: 'Please do NOT include a child’s name, phone number, address, school or other personal details. Just describe what happened. Replies by email are not sent yet.',
      priv: 'Privacy policy', cancel: 'Cancel', send: 'Send', sending: 'Sending…',
      need: 'Choose what you are writing about and add a few words.', fail: 'Could not send. Check your internet and try again.', wait: 'Your message was just sent. Please wait a little.',
      okh: 'Thank you!', ok: 'Your message was received. The author reads every message.', close: 'Close', adults: 'For adults: parents and teachers.' }
  };

  var CSS =
    '.fb-back{position:fixed;inset:0;z-index:99998;background:rgba(29,53,87,.55);display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto}' +
    '.fb-box{position:relative;width:100%;max-width:460px;background:#fff;border-radius:24px;padding:22px 22px 20px;box-shadow:0 10px 0 rgba(0,0,0,.12);color:#1D3557;font-family:Nunito,Arial,sans-serif}' +
    '.fb-box h2{font:800 1.35rem/1.2 "Baloo 2",Nunito,Arial,sans-serif;margin:0 34px 4px 0}' +
    '.fb-sub{margin:0 0 14px;color:#5C7690;font-weight:700;font-size:.85rem}' +
    '.fb-x{position:absolute;right:12px;top:12px;width:36px;height:36px;border:0;border-radius:50%;background:#EEF3F8;color:#1D3557;font-size:1.2rem;font-weight:800;cursor:pointer;line-height:1}' +
    '.fb-box label{display:block;font-weight:800;font-size:.95rem;margin:12px 0 6px}' +
    '.fb-box select,.fb-box textarea{width:100%;box-sizing:border-box;border:2px solid #B9C8D8;border-radius:12px;padding:10px 12px;font:600 1rem Nunito,Arial,sans-serif;color:#1D3557;background:#fff}' +
    '.fb-box textarea{min-height:110px;resize:vertical}' +
    '.fb-box select:focus,.fb-box textarea:focus{outline:3px solid #2F8FD1;outline-offset:1px;border-color:#2F8FD1}' +
    '.fb-warn{margin:12px 0 0;padding:10px 12px;border-radius:12px;background:#FFF6DA;color:#5B4300;font-weight:700;font-size:.82rem;line-height:1.4}' +
    '.fb-links{margin:10px 0 0;font-size:.82rem;font-weight:700}.fb-links a{color:#1D5FA8}' +
    '.fb-err{margin:10px 0 0;color:#B3261E;font-weight:800;font-size:.9rem;min-height:1.2em}' +
    '.fb-act{display:flex;gap:10px;justify-content:flex-end;margin-top:12px}' +
    '.fb-act button{border:0;border-radius:14px;padding:10px 20px;font:800 1rem "Baloo 2",Nunito,Arial,sans-serif;cursor:pointer}' +
    '.fb-send{background:#FFC93C;color:#1D3557;box-shadow:0 4px 0 #E0A620}.fb-send[disabled]{opacity:.6;cursor:default}' +
    '.fb-cancel{background:#E3E9F0;color:#41566E}' +
    '.fb-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}' +
    '.fb-thanks{text-align:center;padding:10px 0 4px}.fb-thanks .fb-big{font-size:3rem}.fb-thanks p{font-weight:700;margin:6px 0 14px}';

  var cur = null, back = null, lastFocus = null;
  function lang(){ try { var s = localStorage.getItem('bilim_lang_v1'); if (s && TXT[s]) return s; } catch(e){} return 'ru'; }
  function L(){ return cur || lang(); }
  function t(k){ return (TXT[L()] || TXT.ru)[k] || TXT.ru[k]; }
  function ready(){ return !!(ENTRY.type && ENTRY.text); }

  function addStyle(){
    if (document.getElementById('fb-css')) return;
    var st = document.createElement('style'); st.id = 'fb-css'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  function device(){
    var ua = navigator.userAgent || '', w = Math.min(screen.width || 0, screen.height || 0) || window.innerWidth;
    if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'Планшет';
    if (/Mobi|iPhone|Android/i.test(ua) || w < 600) return 'Телефон';
    return 'Компьютер';
  }
  function el(tag, cls, txt){ var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

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
      var f = back.querySelectorAll('select,textarea,button:not([disabled]),a[href]'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  function privHref(){
    var me = document.querySelector('script[src*="feedback.js"]');
    return (me && me.src) ? me.src.replace(/assets\/feedback\.js.*$/, 'privacy.html') : 'privacy.html';
  }

  function open(){
    if (back) return;
    addStyle(); lastFocus = document.activeElement;
    back = el('div', 'fb-back');
    var box = el('div', 'fb-box'); box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'fb-h');
    var x = el('button', 'fb-x', '×'); x.type = 'button'; x.setAttribute('aria-label', t('close')); x.onclick = close;
    var h = el('h2', null, t('h')); h.id = 'fb-h';
    var sub = el('p', 'fb-sub', t('adults'));
    var l1 = el('label', null, t('t')); l1.htmlFor = 'fb-type';
    var sel = el('select'); sel.id = 'fb-type';
    var o0 = el('option', null, t('pick')); o0.value = ''; sel.appendChild(o0);
    TYPES.forEach(function(it){ var o = el('option', null, it[L()] || it.ru); o.value = it.v; sel.appendChild(o); });
    var l2 = el('label', null, t('d')); l2.htmlFor = 'fb-text';
    var ta = el('textarea'); ta.id = 'fb-text'; ta.maxLength = 2000; ta.placeholder = t('ph');
    var hp = el('input', 'fb-hp'); hp.type = 'text'; hp.tabIndex = -1; hp.setAttribute('autocomplete', 'off'); hp.setAttribute('aria-hidden', 'true'); hp.name = 'website';
    var warn = el('p', 'fb-warn', t('warn')); warn.id = 'fb-warn'; ta.setAttribute('aria-describedby', 'fb-warn');
    var links = el('p', 'fb-links'); var pa = el('a', null, t('priv')); pa.href = privHref(); pa.target = '_blank'; pa.rel = 'noopener'; links.appendChild(pa);
    var err = el('p', 'fb-err'); err.setAttribute('role', 'alert');
    var act = el('div', 'fb-act');
    var cn = el('button', 'fb-cancel', t('cancel')); cn.type = 'button'; cn.onclick = close;
    var sd = el('button', 'fb-send', t('send')); sd.type = 'button';
    act.appendChild(cn); act.appendChild(sd);
    [x, h, sub, l1, sel, l2, ta, hp, warn, links, err, act].forEach(function(n){ box.appendChild(n); });
    back.appendChild(box);
    back.addEventListener('mousedown', function(e){ if (e.target === back) close(); });

    sd.onclick = function(){
      err.textContent = '';
      var txt = ta.value.replace(/\s+/g, ' ').trim();
      if (!sel.value || txt.length < 3){ err.textContent = t('need'); return; }
      if (hp.value) { thanks(box); return; }                          /* робот: делаем вид, что отправили */
      try { var last = +sessionStorage.getItem('bilim_fb_last') || 0; if (Date.now() - last < 20000){ err.textContent = t('wait'); return; } } catch(e){}
      sd.disabled = true; sd.textContent = t('sending');
      var body = new URLSearchParams();
      body.append(ENTRY.type, sel.value);
      body.append(ENTRY.text, txt);
      if (ENTRY.page) body.append(ENTRY.page, location.pathname + (document.title ? ' — ' + document.title : ''));
      if (ENTRY.device) body.append(ENTRY.device, device());
      fetch(FORM_POST, { method: 'POST', mode: 'no-cors', body: body }).then(function(){
        try { sessionStorage.setItem('bilim_fb_last', String(Date.now())); } catch(e){}
        thanks(box);
      }).catch(function(){
        sd.disabled = false; sd.textContent = t('send'); err.textContent = t('fail');
      });
    };

    document.body.appendChild(back);
    document.addEventListener('keydown', onKey, true);
    sel.focus();
  }
  function thanks(box){
    box.innerHTML = '';
    var x = el('button', 'fb-x', '×'); x.type = 'button'; x.setAttribute('aria-label', t('close')); x.onclick = close;
    var w = el('div', 'fb-thanks'); w.appendChild(el('div', 'fb-big', '💌'));
    var h = el('h2', null, t('okh')); h.id = 'fb-h'; h.style.margin = '0';
    w.appendChild(h); w.appendChild(el('p', null, t('ok')));
    var b = el('button', 'fb-send', t('close')); b.type = 'button'; b.style.cssText = 'border:0;border-radius:14px;padding:10px 24px;font:800 1rem "Baloo 2",Nunito,Arial,sans-serif;cursor:pointer';
    b.onclick = close; w.appendChild(b);
    box.appendChild(x); box.appendChild(w); b.focus();
  }

  window.BilimFeedback = { open: open, ready: ready };

  /* Перехватываем нажатие на кнопку «Отзывы и предложения»; без настроенных полей или при сбое остаётся обычная ссылка. */
  document.addEventListener('click', function(e){
    try {
      var a = e.target && e.target.closest ? e.target.closest('a.feedback-link') : null;
      if (!a || !ready() || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
      e.preventDefault(); open();
    } catch(err){}
  }, true);

  var orig = window.applyLang;
  window.applyLang = function(l){ if (orig) orig(l); cur = TXT[l] ? l : 'ru'; };
})();
