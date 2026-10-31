/* ===== «Вернуться» из Дома Барсика и Подарка дня =====
   Запоминает (sessionStorage) страницу сайта, откуда пришёл ребёнок, и ведёт обратно именно туда:
   в игру, в урок, на страницу класса. Если пришёл не с сайта — на выбор класса.
   Разметка: <a data-back>…</a> — получает href и подпись «Вернуться к урокам» (или «К выбору класса») на языке страницы (assets/house-i18n.js, если подключён). Путь к корню: data-root. */
(function(){
  'use strict';
  var K = 'bilim_house_back';
  function parse(u){ try { return new URL(u, location.href); } catch(e){ return null; } }
  var ref = parse(document.referrer);
  if (ref && ref.origin === location.origin && !/\/(house|gift)\//.test(ref.pathname)){
    try { sessionStorage.setItem(K, ref.href); } catch(e){}
  }
  var stored = null; try { stored = sessionStorage.getItem(K); } catch(e){}
  function tx(key, ru){ return (window.HI && HI.t(key)) || ru; }
  function apply(){
    [].forEach.call(document.querySelectorAll('[data-back]'), function(a){
      var root = a.getAttribute('data-root') || '../';
      var u = stored && parse(stored);
      var arrow = a.getAttribute('data-arrow') === 'no' ? '' : ((window.HI ? HI.arrow() : '←') + ' ');
      if (u && u.origin === location.origin){
        a.href = u.href;
        a.textContent = arrow + tx('back_lessons', 'Вернуться к урокам');
      } else {
        a.href = root + 'grade-picker.html';
        a.textContent = arrow + tx('back_grade', 'К выбору класса');
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  if (window.HI) HI.on(apply);
})();
