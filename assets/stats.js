/* Білім Аралы — счётчик посетителей (assets/stats.js)
   Cloudflare Web Analytics: считает заходы и просмотры страниц, не ставит cookie и не следит за
   отдельным человеком (так описывает сервис сам Cloudflare). Итоги видны в кабинете Cloudflare:
   Observability → Analytics → Web analytics → bilimaraly.com.

   • Работает только на https://bilimaraly.com (старый адрес, проверочные страницы и локальные копии не считаются).
   • Свои заходы можно не считать: открыть сайт с хвостом ?nostats=1 (вернуть: ?nostats=0). Запоминается в этом браузере.
   • Выключить счётчик для всех: удалить строку-подключение assets/stats.js со страниц или очистить COUNTER_TOKEN ниже. */
(function(){
  'use strict';
  var COUNTER_TOKEN = '8c4e6004a0de4a17bd49f128a0631a7c';
  if (!COUNTER_TOKEN) return;
  try {
    var h = location.hostname;
    if (h !== 'bilimaraly.com' && h !== 'www.bilimaraly.com') return;
    var q = /[?&]nostats=([01])(?:&|#|$)/.exec(location.search);
    if (q) { if (q[1] === '1') localStorage.setItem('bilim_no_stats', '1'); else localStorage.removeItem('bilim_no_stats'); }
    if (localStorage.getItem('bilim_no_stats') === '1') return;
  } catch(e){}
  if (document.querySelector('script[data-cf-beacon]')) return;
  var s = document.createElement('script');
  s.type = 'module';
  s.setAttribute('data-cf-beacon', '{"token": "' + COUNTER_TOKEN + '"}');
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  (document.head || document.documentElement).appendChild(s);
})();
