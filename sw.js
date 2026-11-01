/* ===== Білім Аралы — service worker (установка на экран + основа офлайна) =====
   Что делает:
   • при установке сохраняет оболочку сайта: главная, выбор класса, хабы классов, Дом Барсика, подарок, общие скрипты и стили;
   • страницы, скрипты и стили — «сначала сеть» (если сеть тормозит больше 4 секунд или её нет — берём сохранённое), поэтому обновления сайта приходят сразу;
   • картинки — «сначала сохранённое»; всё, что ребёнок уже открывал, потом открывается без интернета;
   • аудио и видео НЕ сохраняются (браузер запрашивает их кусками) — без интернета голос Барсика не звучит, остаётся текст;
   • чужие адреса (сервер прогресса на Railway, шрифты) не трогаются.
   Чтобы сбросить сохранённое после крупных изменений, поменяйте V. */
const V = 'bilim-v2';
const SHELL = [
  './', 'index.html', 'grade-picker.html', 'offline.html', 'manifest.webmanifest',
  'assets/pwa/icon-192.png', 'assets/pwa/icon-512.png',
  'assets/i18n.js', 'assets/styles.css', 'assets/world.css', 'assets/world.js', 'assets/progress.js', 'assets/barsik.js',
  'assets/auth.js', 'assets/rewards.js', 'assets/explain.js', 'assets/quick.js', 'assets/island.js', 'assets/quest.js', 'assets/quest-data.js', 'assets/quest.css', 'quest/index.html', 'assets/pwa.js',
  'assets/hub.js', 'assets/hub.css', 'assets/subject.js', 'assets/subject.css', 'assets/subject-themes.js', 'assets/courses-registry.js',
  'assets/house.js', 'assets/house.css', 'assets/house-i18n.js', 'assets/house-back.js', 'assets/gift.css',
  'house/index.html', 'house/wardrobe.html', 'house/attic.html', 'gift/index.html', 'gift/gift-data.js',
  'assets/album.js', 'assets/album-data.js', 'assets/album.css',
  'grades/grade-1/index.html', 'grades/grade-1-kaz/index.html', 'grades/grade-2/index.html', 'grades/grade-3/index.html', 'grades/grade-4/index.html'
];

self.addEventListener('install', function(e){
  e.waitUntil((async function(){
    const cache = await caches.open(V);
    await Promise.all(SHELL.map(async function(u){
      try { const r = await fetch(new Request(u, { cache: 'reload' })); if (r.ok) await cache.put(new Request(u), r); } catch(err){}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    const keys = await caches.keys();
    await Promise.all(keys.filter(function(k){ return k.indexOf('bilim-') === 0 && k !== V; }).map(function(k){ return caches.delete(k); }));
    await self.clients.claim();
  })());
});

function isHtml(req, u){ return req.mode === 'navigate' || /\.html?$/i.test(u.pathname) || /\/$/.test(u.pathname); }
function keyFor(req, u){ return isHtml(req, u) ? new Request(u.origin + u.pathname) : req; }   /* у страниц ?lang=, ?dir= не плодят копии */

async function netFirst(req, u){
  const cache = await caches.open(V), key = keyFor(req, u);
  const net = fetch(req, { cache: 'no-cache' }).then(function(res){
    if (res.ok && res.type === 'basic') cache.put(key, res.clone());
    return res;
  });
  net.catch(function(){});
  try {
    return await Promise.race([net, new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('slow')); }, 4000); })]);
  } catch(err){
    const hit = await cache.match(key, { ignoreSearch: isHtml(req, u) });
    if (hit) return hit;
    try { return await net; } catch(e2){
      if (req.mode === 'navigate'){ const off = await cache.match('offline.html'); if (off) return off; }
      return Response.error();
    }
  }
}
async function cacheFirst(req){
  const cache = await caches.open(V), hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.type === 'basic') cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', function(e){
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) return;
  if (req.headers.has('range')) return;
  if (/\.(mp3|mp4|m4a|wav|ogg|webm)$/i.test(u.pathname)) return;
  if (/\.(png|jpe?g|webp|gif|svg|ico|woff2?)$/i.test(u.pathname)) e.respondWith(cacheFirst(req));
  else e.respondWith(netFirst(req, u));
});
