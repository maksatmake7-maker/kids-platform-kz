/* Білім Аралы — адрес аудио и видео (assets/media-base.js)
   Зачем: аудио (assets/audio/…) и видео (assets/video/*.mp4) можно раздавать не с GitHub Pages,
   а из облачного хранилища. Все страницы строят пути к файлам по-разному, поэтому здесь один слой:
   он на лету подменяет адрес и, если облако не ответило, возвращает обычный локальный файл.

   Адрес хранилища — в MEDIA_BASE ниже (без слэша на конце). Чтобы вернуть всё на GitHub Pages,
   сделайте MEDIA_BASE пустым ''. В хранилище (Cloudflare R2, бакет bilim-media) файлы лежат так:
     assets/audio/…  →  <MEDIA_BASE>/audio/…
     assets/video/*.mp4  →  <MEDIA_BASE>/video/*.mp4
   Картинки-постеры (assets/video/*.jpg) остаются на сайте и не переносятся.
   Если хранилище не отвечает, слой сам берёт обычный локальный файл с сайта.

   Для проверки без правки файла: открыть страницу с хвостом ?mediabase=https://адрес.r2.dev (выключить: ?mediabase=off). */
/* ВЫКЛЮЧАТЕЛЬ ВХОДА И РЕГИСТРАЦИИ (живёт здесь, потому что этот файл подключён первым на каждой странице).
   false — вход и регистрация скрыты, на сервер ничего не отправляется, игра идёт без аккаунта (прогресс только в браузере).
   true  — всё как раньше. Включать только после того, как база аккаунтов будет размещена в Казахстане
   и политика конфиденциальности согласована с юристом. */
window.BILIM_AUTH_ENABLED = false;

(function(){
  'use strict';
  if (window.BilimMedia) return;

  var MEDIA_BASE = 'https://media.bilimaraly.com';

  /* Переключатель для проверки: открыть любую страницу сайта с хвостом ?mediabase=https://адрес.r2.dev —
     браузер запомнит адрес и будет брать аудио/видео из хранилища (только у этого человека).
     Выключить: ?mediabase=off. Разрешены только адреса *.r2.dev и media.bilimaraly.com, чужая ссылка ничего не подменит. */
  var TEST_OK = /^https:\/\/([a-z0-9-]+\.r2\.dev|media\.bilimaraly\.com)$/i;
  try {
    var q = /[?&]mediabase=([^&#]*)/.exec(location.search);
    if (q) {
      var qv = decodeURIComponent(q[1]).replace(/\/+$/, '');
      if (qv === 'off') localStorage.removeItem('bilim_media_base');
      else if (TEST_OK.test(qv)) localStorage.setItem('bilim_media_base', qv);
    }
  } catch(e){}

  var base = MEDIA_BASE, testMode = false;
  try {
    var t = localStorage.getItem('bilim_media_base');
    if (t !== null && t !== '' && TEST_OK.test(String(t).replace(/\/+$/, ''))) { base = t; testMode = true; }
  } catch(e){}
  base = String(base || '').replace(/\/+$/, '');

  /* В режиме проверки в углу экрана виден маленький значок — чтобы не перепутать, откуда идут файлы. */
  if (testMode && base){
    var mark = function(){
      if (!document.body || document.getElementById('bilim-media-test')) return;
      var d = document.createElement('div');
      d.id = 'bilim-media-test';
      d.textContent = '\u2601 тест';
      d.setAttribute('style', 'position:fixed;left:6px;bottom:6px;z-index:2147483647;font:11px/1 sans-serif;color:#fff;background:rgba(30,120,220,.85);padding:3px 6px;border-radius:8px;pointer-events:none');
      document.body.appendChild(d);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mark); else mark();
  }

  var nativeFetch = window.fetch;
  var down = 0;               // если облако не ответило — до этого момента (мс) берём локальные файлы
  var DOWN_MS = 5 * 60 * 1000;
  var ORIG = (typeof WeakMap === 'function') ? new WeakMap() : null;   // элемент → локальный адрес

  function isDown(){ return down && Date.now() < down; }

  /* Один файл не нашёлся — это ещё не авария облака. Проверяем, отвечает ли оно вообще:
     запрос «вслепую» завершается успешно при любом ответе сервера и падает только если сети/адреса нет. */
  var probing = 0;
  function probe(){
    if (!base || !window.fetch || probing || isDown()) return;
    probing = 1;
    nativeFetch.call(window, base + '/ping?t=' + Date.now(), { mode: 'no-cors', cache: 'no-store' })
      .then(function(){ probing = 0; }, function(){ probing = 0; down = Date.now() + DOWN_MS; });
  }

  /* Возвращает адрес в облаке или null, если подменять не нужно. */
  function remote(u){
    if (!base || isDown() || typeof u !== 'string' || !u) return null;
    var url;
    try { url = new URL(u, location.href); } catch(e){ return null; }
    if (url.origin !== location.origin) return null;
    var m = url.pathname.match(/\/assets\/(audio\/.+|video\/.+\.mp4)$/i);
    if (!m) return null;
    return base + '/' + m[1] + url.search;
  }

  function local(u){ try { return new URL(u, location.href).href; } catch(e){ return u; } }

  function url(u){ var r = remote(u); return r || u; }
  function localUrl(u){ return local(u); }

  var proto = window.HTMLMediaElement && HTMLMediaElement.prototype;
  var desc = proto && Object.getOwnPropertyDescriptor(proto, 'src');
  var nativePlay = proto && proto.play;
  var wantPlay = ORIG ? new WeakSet() : null;

  var hooked = ORIG ? new WeakSet() : null;
  function setSrc(el, v){
    var r = remote(v);
    if (r && ORIG && !hooked.has(el)){ hooked.add(el); el.addEventListener('error', onMediaError); }
    if (r && ORIG) ORIG.set(el, local(v));
    else if (ORIG) ORIG.delete(el);
    desc.set.call(el, r || v);
  }

  if (desc && desc.set && desc.get && ORIG){
    Object.defineProperty(proto, 'src', {
      configurable: true, enumerable: desc.enumerable,
      get: function(){ return desc.get.call(this); },
      set: function(v){ setSrc(this, v); }
    });
    proto.play = function(){
      try { wantPlay.add(this); } catch(e){}
      return nativePlay.apply(this, arguments);
    };
    var nativeSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(n, v){
      if (String(n).toLowerCase() === 'src' && (this instanceof HTMLMediaElement) && typeof v === 'string'){
        var r = remote(v);
        if (r){ ORIG.set(this, local(v)); return nativeSetAttr.call(this, n, r); }
      }
      return nativeSetAttr.apply(this, arguments);
    };
  }

  /* new Audio(url) задаёт адрес внутри браузера, мимо сеттера — оборачиваем конструктор. */
  var NativeAudio = window.Audio;
  if (NativeAudio && ORIG){
    var A = function(src){
      var a = new NativeAudio();
      if (src !== undefined) a.src = src;
      return a;
    };
    A.prototype = NativeAudio.prototype;
    window.Audio = A;
  }

  /* Файл не загрузился из облака — этот файл берём локально, а доступность облака проверяем отдельно. */
  function onMediaError(ev){
    var el = ev.target;
    if (!ORIG || !el) return;
    try {
      if (el instanceof HTMLSourceElement){
        var loc0 = el.getAttribute('data-local');
        var par = el.parentNode;
        if (!loc0 || !par || !(par instanceof HTMLMediaElement)) return;
        el.removeAttribute('data-local');
        probe();
        desc.set.call(el, loc0);
        par.load();
        return;
      }
      if (!(el instanceof HTMLMediaElement)) return;
      var loc = ORIG.get(el);
      if (!loc) return;
      ORIG.delete(el);
      probe();
      var again = wantPlay.has(el) || !el.paused;
      desc.set.call(el, loc);
      el.load();
      if (again) { var p = nativePlay.call(el); if (p && p.catch) p.catch(function(){}); }
    } catch(e){}
  }
  document.addEventListener('error', onMediaError, true);

  /* fetch (музыкальные инструменты): сначала облако, при ошибке — локально. */
  if (nativeFetch){
    window.fetch = function(input, init){
      if (typeof input === 'string'){
        var r = remote(input);
        if (r){
          var loc = local(input);
          return nativeFetch.call(this, r, init).then(function(res){
            if (res && res.ok) return res;
            return nativeFetch.call(window, loc, init);
          }, function(){
            down = Date.now() + DOWN_MS;
            return nativeFetch.call(window, loc, init);
          });
        }
      }
      return nativeFetch.apply(this, arguments);
    };
  }

  window.BilimMedia = { base: base, url: url, local: localUrl };
})();
