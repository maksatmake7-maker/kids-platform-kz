/* ===== Білім Аралы — быстрые кнопки «Дом Барсика» и «Подарок дня» на первых страницах =====
   Три кнопки: «Дом Барсика», «Квесты Барсика», «Подарок дня» (+ установка на экран).
   Разметка: <div data-quick></div> (необязательно data-root="../" — путь к корню сайта, data-kz — страница открывается сразу по-казахски).
   Название дома — на выбранном языке страницы и в ссылке ?lang=, чтобы дом открылся на том же языке. «Подарок дня» пока только на русском: на других языках его прячет CSS.
   Третья кнопка — «Установить на экран» (скрыта, пока браузер не готов предложить установку; на iPhone показывает подсказку) — управляется assets/pwa.js.
   Подключать после progress.js. */
(function(){
  'use strict';
  var CSS = '.qk{display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:12px; margin:16px 0 4px;}' +
    '.qk a,.qk button{display:inline-flex; align-items:center; gap:10px; min-height:48px; padding:6px 18px 6px 12px; border-radius:999px; background:#fff; color:#1D3557; text-decoration:none; border:3px solid #F8AE3F; box-shadow:0 4px 0 rgba(29,53,87,.14); font-family:"Baloo 2",sans-serif; font-weight:800; font-size:1.1rem; transition:transform .15s;}' +
    '.qk button{cursor:pointer; padding-left:12px;} .qk button[hidden]{display:none;} .qk .inst{border-color:#3F8F6B;}' +
    '.qk a:hover,.qk button:hover{transform:translateY(-2px);} .qk a:focus-visible,.qk button:focus-visible{outline:3px dashed #FF6B5B; outline-offset:3px;}' +
    '.qk-hint{flex-basis:100%; max-width:30em; margin:0 auto; text-align:center; font-weight:700; font-size:.95rem; color:#fff; background:rgba(18,35,94,.85); border:2px solid #F8AE3F; border-radius:16px; padding:8px 14px;} .qk-hint[hidden]{display:none;}' +
    '.qk .ic{flex:none; width:34px; height:30px; display:block;} .qk .ic svg{display:block; width:100%; height:100%;}' +
    'html[data-current]:not([data-current="ru"]) .qk .gift-ru{display:none;}' +
    '.qk .quest{border-color:#2F8FD1;} .qk .house{border-color:#E8584A;} .qk em{font-style:normal; font-size:.78rem; background:#D9483A; color:#fff; border-radius:999px; padding:2px 10px;} .qk .got em{background:#3F8F6B;}';
  var HOUSE = '<svg viewBox="0 0 34 30" aria-hidden="true"><rect x="22" y="3" width="4" height="8" fill="#7A3B2E"/><polygon points="1,16 17,3 33,16" fill="#E8584A" stroke="#8E2F3A" stroke-width="1.5" stroke-linejoin="round"/><rect x="6" y="15" width="22" height="14" fill="#FFF7E3" stroke="#7A3B2E" stroke-width="1.5"/><rect x="14" y="19" width="6" height="10" rx="1" fill="#7A3B2E"/><circle cx="17" cy="10" r="2.6" fill="#F8AE3F" stroke="#7A4620" stroke-width=".8"/></svg>';
  var GIFT = '<svg viewBox="0 0 34 30" aria-hidden="true"><rect x="5" y="12" width="24" height="16" rx="2" fill="#E8584A"/><rect x="15" y="12" width="4" height="16" fill="#FFC93C"/><rect x="3" y="8" width="28" height="6" rx="2" fill="#F0746A"/><rect x="15" y="8" width="4" height="6" fill="#FFD34D"/><path d="M17 8 C12 1 7 4 11 7 C13 9 16 8 17 8Z M17 8 C22 1 27 4 23 7 C21 9 18 8 17 8Z" fill="#FFC93C" stroke="#D99A00" stroke-width="1.2"/></svg>';
  function got(){
    try { var g = JSON.parse(localStorage.getItem('bilim_gift_v1')), d = new Date(), k = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); return !!(g && g.days && g.days[k]); } catch(e){ return false; }
  }
  var MAP = '<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M3 6 L12 3 L22 7 L31 4 V24 L22 27 L12 23 L3 26Z" fill="#FFF7E3" stroke="#1D3557" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 3 V23 M22 7 V27" stroke="#1D3557" stroke-width="1.4" opacity=".5"/><path d="M8 18 C12 12 18 20 25 11" fill="none" stroke="#E8584A" stroke-width="2" stroke-dasharray="3 3" stroke-linecap="round"/><path d="M24 8 l4 3 M28 8 l-4 3" stroke="#E8584A" stroke-width="2" stroke-linecap="round"/></svg>';
  var PHONE = '<svg viewBox="0 0 34 30" aria-hidden="true"><rect x="10" y="2" width="14" height="26" rx="3" fill="#FFF7E3" stroke="#1D3557" stroke-width="2"/><path d="M17 8 V19 M13 15 L17 19 L21 15" fill="none" stroke="#3F8F6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  /* подписи кнопки установки и подсказка для iPhone */
  var INST = {ru:'Установить на экран', kz:'Экранға орнату', en:'Add to home screen', zh:'添加到主屏幕', uz:'Бош экранга қўшиш', tg:'Ба экрани асосӣ илова кун', ug:'ئاساسىي ئېكرانغا قوشۇش'};
  var IOS = {ru:'Нажми «Поделиться», затем «На экран Домой».', kz:'«Бөлісу» түймесін басып, «Басты экранға» таңда.', en:'Tap Share, then Add to Home Screen.', zh:'点按“分享”，再选“添加到主屏幕”。', uz:'«Улашиш» тугмасини босиб, «Бош экранга қўшиш»ни танланг.', tg:'«Мубодила»-ро пахш карда, «Ба экрани асосӣ»-ро интихоб кунед.', ug:'«ھەمبەھىرلەش» نى بېسىپ، «ئاساسىي ئېكرانغا قوشۇش» نى تاللاڭ.'};
  /* названия дома — те же слова, что в assets/house-i18n.js */
  var HOUSE_NAME = {ru:'Дом Барсика', kz:'Барсиктің үйі', en:"Barsik's House", zh:'巴雷斯的家', uz:'Барсикнинг уйи', tg:'Хонаи Барсик', ug:'بارىسنىڭ ئۆيى'};
  /* названия раздела квестов — те же слова, что в assets/quest-data.js */
  var QUEST_NAME = {ru:'Квесты Барсика', kz:'Барсик квесттері', en:"Barsik's Quests", zh:'巴雷斯的冒险', uz:'Барсик квестлари', tg:'Квестҳои Барсик', ug:'بارىسنىڭ سەرگۈزەشتىلىرى'};
  function curLang(el){
    var l = document.documentElement.getAttribute('data-current');
    if (l) return l;
    return (el.hasAttribute('data-kz') || /[?&]dir=kz/.test(location.search)) ? 'kz' : 'ru';
  }
  function build(el){
    var root = el.getAttribute('data-root') || '';
    var g = got();
    el.className = 'qk';
    el.innerHTML = '<a class="house" href="' + root + 'house/index.html" data-base="' + root + 'house/index.html"><span class="ic">' + HOUSE + '</span><span class="t"></span></a>' +
      '<a class="quest" href="' + root + 'quest/index.html" data-base="' + root + 'quest/index.html"><span class="ic">' + MAP + '</span><span class="t"></span></a>' +
      '<a class="gift-ru ' + (g ? 'got' : 'gift') + '" href="' + root + 'gift/index.html"><span class="ic">' + GIFT + '</span>Подарок дня<em>' + (g ? 'получен' : 'новый') + '</em></a>' +
      '<button type="button" class="inst" hidden><span class="ic">' + PHONE + '</span><span class="t"></span></button><p class="qk-hint" hidden></p>';
    var b = el.querySelector('.inst'), hint = el.querySelector('.qk-hint');
    b.addEventListener('click', function(){
      var st = window.PWA && PWA.state();
      if (st === 'prompt') PWA.install(); else if (st === 'ios') hint.hidden = !hint.hidden;
    });
    sync(el);
  }
  function sync(el){
    var l = curLang(el), a = el.querySelector('.house');
    if (!a) return;
    a.querySelector('.t').textContent = HOUSE_NAME[l] || HOUSE_NAME.ru;
    a.href = a.getAttribute('data-base') + '?lang=' + l;
    var qa = el.querySelector('.quest');
    if (qa){ qa.querySelector('.t').textContent = QUEST_NAME[l] || QUEST_NAME.ru; qa.href = qa.getAttribute('data-base') + '?lang=' + l; }
    var b = el.querySelector('.inst'), hint = el.querySelector('.qk-hint'), st = window.PWA ? PWA.state() : 'none';
    if (b){ b.hidden = (st === 'none'); b.querySelector('.t').textContent = INST[l] || INST.ru; }
    if (hint){ hint.textContent = IOS[l] || IOS.ru; if (st !== 'ios') hint.hidden = true; hint.setAttribute('dir', l === 'ug' ? 'rtl' : 'ltr'); }
  }
  function go(){
    if (!document.getElementById('qk-style')){ var s = document.createElement('style'); s.id = 'qk-style'; s.textContent = CSS; document.head.appendChild(s); }
    [].forEach.call(document.querySelectorAll('[data-quick]'), build);
    if (!go.obs){
      go.obs = true;
      document.addEventListener('pwa-state', function(){ [].forEach.call(document.querySelectorAll('[data-quick]'), sync); });
      try { new MutationObserver(function(){ [].forEach.call(document.querySelectorAll('[data-quick]'), sync); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-current'] }); } catch(e){}
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  window.addEventListener('pageshow', go);
})();
