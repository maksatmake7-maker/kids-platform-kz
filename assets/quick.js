/* ===== Білім Аралы — быстрые кнопки «Дом Барсика» и «Подарок дня» на первых страницах =====
   Разметка: <div data-quick></div> (необязательно data-root="../" — путь к корню сайта, data-kz — только казахская подпись).
   Для страницы выбора класса с ?dir=kz автоматически показывает казахскую подпись и без «Подарка дня» (он пока только на русском).
   Подключать после progress.js. */
(function(){
  'use strict';
  var CSS = '.qk{display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:12px; margin:16px 0 4px;}' +
    '.qk a{display:inline-flex; align-items:center; gap:10px; min-height:48px; padding:6px 18px 6px 12px; border-radius:999px; background:#fff; color:#1D3557; text-decoration:none; border:3px solid #F8AE3F; box-shadow:0 4px 0 rgba(29,53,87,.14); font-family:"Baloo 2",sans-serif; font-weight:800; font-size:1.1rem; transition:transform .15s;}' +
    '.qk a:hover{transform:translateY(-2px);} .qk a:focus-visible{outline:3px dashed #FF6B5B; outline-offset:3px;}' +
    '.qk .ic{flex:none; width:34px; height:30px; display:block;} .qk .ic svg{display:block; width:100%; height:100%;}' +
    '.qk .house{border-color:#E8584A;} .qk em{font-style:normal; font-size:.78rem; background:#D9483A; color:#fff; border-radius:999px; padding:2px 10px;} .qk .got em{background:#3F8F6B;}';
  var HOUSE = '<svg viewBox="0 0 34 30" aria-hidden="true"><rect x="22" y="3" width="4" height="8" fill="#7A3B2E"/><polygon points="1,16 17,3 33,16" fill="#E8584A" stroke="#8E2F3A" stroke-width="1.5" stroke-linejoin="round"/><rect x="6" y="15" width="22" height="14" fill="#FFF7E3" stroke="#7A3B2E" stroke-width="1.5"/><rect x="14" y="19" width="6" height="10" rx="1" fill="#7A3B2E"/><circle cx="17" cy="10" r="2.6" fill="#F8AE3F" stroke="#7A4620" stroke-width=".8"/></svg>';
  var GIFT = '<svg viewBox="0 0 34 30" aria-hidden="true"><rect x="5" y="12" width="24" height="16" rx="2" fill="#E8584A"/><rect x="15" y="12" width="4" height="16" fill="#FFC93C"/><rect x="3" y="8" width="28" height="6" rx="2" fill="#F0746A"/><rect x="15" y="8" width="4" height="6" fill="#FFD34D"/><path d="M17 8 C12 1 7 4 11 7 C13 9 16 8 17 8Z M17 8 C22 1 27 4 23 7 C21 9 18 8 17 8Z" fill="#FFC93C" stroke="#D99A00" stroke-width="1.2"/></svg>';
  function got(){
    try { var g = JSON.parse(localStorage.getItem('bilim_gift_v1')), d = new Date(), k = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); return !!(g && g.days && g.days[k]); } catch(e){ return false; }
  }
  function build(el){
    var root = el.getAttribute('data-root') || '';
    var kz = el.hasAttribute('data-kz') || /[?&]dir=kz/.test(location.search);
    var g = got();
    el.className = 'qk';
    el.innerHTML = '<a class="house" href="' + root + 'house/index.html"><span class="ic">' + HOUSE + '</span>' + (kz ? 'Барсиктің үйі' : 'Дом Барсика') + '</a>' +
      (kz ? '' : '<a class="' + (g ? 'got' : 'gift') + '" href="' + root + 'gift/index.html"><span class="ic">' + GIFT + '</span>Подарок дня<em>' + (g ? 'получен' : 'новый') + '</em></a>');
  }
  function go(){
    if (!document.getElementById('qk-style')){ var s = document.createElement('style'); s.id = 'qk-style'; s.textContent = CSS; document.head.appendChild(s); }
    [].forEach.call(document.querySelectorAll('[data-quick]'), build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  window.addEventListener('pageshow', go);
})();
