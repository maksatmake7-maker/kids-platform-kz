/* ===== Білім Аралы — установка на экран телефона (PWA) =====
   Подключается автоматически из assets/i18n.js (он есть на каждой странице). Делает три вещи:
   1) добавляет manifest, иконку для iPhone и цвет шапки браузера;
   2) регистрирует service worker (sw.js в корне сайта) — основа работы без интернета;
   3) следит за возможностью установки и сообщает об этом кнопке в assets/quick.js через window.PWA и событие 'pwa-state'. */
(function(){
  'use strict';
  var s = document.currentScript;
  var root = s && s.src ? s.src.replace(/assets\/pwa\.js.*$/, '') : '';

  function add(tag, attrs){ var el = document.createElement(tag); for (var k in attrs) el.setAttribute(k, attrs[k]); document.head.appendChild(el); }
  if (!document.querySelector('link[rel="manifest"]')) add('link', { rel: 'manifest', href: root + 'manifest.webmanifest' });
  if (!document.querySelector('link[rel="apple-touch-icon"]')) add('link', { rel: 'apple-touch-icon', href: root + 'assets/pwa/apple-touch-icon.png' });
  if (!document.querySelector('meta[name="theme-color"]')) add('meta', { name: 'theme-color', content: '#12235E' });
  if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
  if (!document.querySelector('meta[name="apple-mobile-web-app-title"]')) add('meta', { name: 'apple-mobile-web-app-title', content: 'Білім Аралы' });

  var secure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && secure){
    window.addEventListener('load', function(){ navigator.serviceWorker.register(root + 'sw.js').catch(function(){}); });
  }

  var deferred = null;
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function fire(){ try { document.dispatchEvent(new CustomEvent('pwa-state')); } catch(e){} }

  window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); deferred = e; fire(); });
  window.addEventListener('appinstalled', function(){ deferred = null; standalone = true; fire(); });

  /* state(): 'prompt' — браузер умеет сам предложить установку; 'ios' — нужна подсказка «Поделиться → На экран Домой»; 'none' — уже установлено или нельзя */
  window.PWA = {
    state: function(){ if (standalone) return 'none'; if (deferred) return 'prompt'; return ios ? 'ios' : 'none'; },
    install: function(){
      if (!deferred) return Promise.resolve();
      var d = deferred; deferred = null; d.prompt();
      return d.userChoice.then(function(){ fire(); }, function(){ fire(); });
    }
  };
  fire();
})();
