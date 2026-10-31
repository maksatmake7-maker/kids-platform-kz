/* ===== Білім Аралы — «Дом Барсика»: звёзды, покупки, наряды =====
   Подключать после assets/progress.js и assets/barsik.js.
   Хранение: localStorage 'bilim_house_v1' = { spent, owned:{id:true}, worn:{slot:id}, gift:1 }.
   Баланс = все заработанные звёзды (progress.js) минус потраченные здесь. Только в этом браузере, как и остальной прогресс.
   Голос: записанный голос Барсика assets/audio/barsik/ru/house_<id>.mp3. Если файла ещё нет — показывается только текст (робот-голос не используется). */
(function(){
  'use strict';
  var KEY = 'bilim_house_v1';
  var ROOT = (typeof PROGRESS_ROOT === 'string' && PROGRESS_ROOT) ? PROGRESS_ROOT : '../';
  var STARS_PER_GAME = 10; /* пройденная игра даёт около 10 звёзд — по этому числу считаем «ещё N игр» */

  /* фразы Барсика: id → текст (те же тексты озвучиваются генератором voice-house-barsik.html) */
  var SAY = {
    hello1: 'Привет! Это мой дом. Заходи!',
    hello2: 'Ура, ты пришёл! Давай посмотрим, во что я могу одеться?',
    wardrobe_in: 'Это мой гардероб. Здесь живут все мои вещи.',
    gift: 'Смотри, мне подарили бантик! Спасибо!',
    wow1: 'Ого, красиво!',
    wow2: 'Мне очень идёт!',
    wow3: 'Вот это обновка!',
    wow4: 'Ура, я самый нарядный кот!',
    wow5: 'Мур-р! Мне нравится!',
    buy_bow: 'Бантик! Как будто праздник.',
    buy_cap: 'Кепка! Теперь я спортсмен!',
    buy_hat: 'Шапка с помпоном! Тепло и красиво!',
    buy_scarf: 'Шарф! Мне совсем не холодно.',
    buy_glasses: 'Тёмные очки! Я как настоящая звезда!',
    buy_cape: 'Плащ героя! Лечу спасать задачи!',
    buy_crown: 'Корона! Теперь я король острова!',
    need_more: 'Пока не хватает звёзд. Давай ещё поиграем!',
    off: 'Сниму. Хочу примерить что-нибудь другое.',
    kitchen_soon: 'Здесь скоро будет кухня. Я так люблю баурсаки!',
    play_soon: 'Здесь будет игровая. Скоро поиграем!',
    attic_soon: 'А на чердаке будут наклейки. Я соберу их все!',
    bye: 'Приходи ещё! Я буду ждать.'
  };
  var WOW = ['wow1', 'wow2', 'wow3', 'wow4', 'wow5'];

  function load(){
    var h = null;
    try { h = JSON.parse(localStorage.getItem(KEY)); } catch(e){}
    if (!h || typeof h !== 'object') h = {};
    return { spent: Math.max(0, +h.spent || 0), owned: h.owned || {}, worn: h.worn || {}, gift: h.gift ? 1 : 0 };
  }
  function save(h){ try { localStorage.setItem(KEY, JSON.stringify(h)); } catch(e){} }
  function earned(){ return typeof getTotalStars === 'function' ? getTotalStars() : 0; }
  function balance(){ return Math.max(0, earned() - load().spent); }
  function items(){ return window.Barsik ? Barsik.items : []; }
  function find(id){ var r = null; items().forEach(function(x){ if (x.id === id) r = x; }); return r; }

  /* подарок за новоселье: бантик достаётся даром при первом визите */
  function ensureGift(){
    var h = load(); if (h.gift) return false;
    h.gift = 1; h.owned.bow = true; if (!h.worn.neck) h.worn.neck = 'bow';
    save(h); return true;
  }

  /* список вещей с состоянием: owned / worn / canBuy / need */
  function list(){
    var h = load(), bal = Math.max(0, earned() - h.spent);
    return items().map(function(it){
      var owned = !!h.owned[it.id], on = h.worn[it.slot] === it.id;
      return { id: it.id, slot: it.slot, name: it.name, acc: it.acc, price: it.price, vb: it.vb, art: it.art,
               owned: owned, worn: on, canBuy: !owned && bal >= it.price, need: owned ? 0 : Math.max(0, it.price - bal) };
    });
  }

  /* купить (сразу надевает) → {ok, reason} */
  function buy(id){
    var it = find(id); if (!it) return { ok: false, reason: 'none' };
    var h = load();
    if (h.owned[id]) return { ok: false, reason: 'owned' };
    if (Math.max(0, earned() - h.spent) < it.price) return { ok: false, reason: 'poor' };
    h.spent += it.price; h.owned[id] = true; h.worn[it.slot] = id;
    save(h); badge();
    return { ok: true };
  }
  /* надеть / снять купленное → 'on' | 'off' | null */
  function toggle(id){
    var it = find(id), h = load(); if (!it || !h.owned[id]) return null;
    var res;
    if (h.worn[it.slot] === id){ delete h.worn[it.slot]; res = 'off'; } else { h.worn[it.slot] = id; res = 'on'; }
    save(h); return res;
  }
  function worn(){ return load().worn; }

  /* цель: самая дешёвая вещь, на которую пока не хватает → {item, need, games} */
  function goal(){
    var l = list().filter(function(x){ return !x.owned && !x.canBuy; }).sort(function(a, b){ return a.price - b.price; });
    if (!l.length) return null;
    var g = l[0]; return { item: g, need: g.need, games: Math.max(1, Math.ceil(g.need / STARS_PER_GAME)) };
  }
  function plural(n, a, b, c){ var m = n % 10, k = n % 100; return (m === 1 && k !== 11) ? a : (m >= 2 && m <= 4 && (k < 10 || k >= 20)) ? b : c; }
  function goalText(){
    var g = goal();
    if (!g) return { main: 'Звёзд хватает на любую вещь', sub: 'Выбирай, что надеть. Новые вещи появятся позже.', pct: 100 };
    return {
      main: 'Ещё ' + g.games + ' ' + plural(g.games, 'игра', 'игры', 'игр') + ', и куплю ' + g.item.acc,
      sub: 'Не хватает ' + g.need + ' из ' + g.item.price + ' звёзд. За пройденную игру дают около ' + STARS_PER_GAME + '.',
      pct: Math.min(100, Math.round((g.item.price - g.need) / g.item.price * 100))
    };
  }

  /* голос: проигрываем запись, если она есть; ошибки (нет файла, автоплей запрещён) молча игнорируем */
  var cur = null;
  function play(id){
    try {
      if (cur){ cur.pause(); cur = null; }
      var a = new Audio(ROOT + 'assets/audio/barsik/ru/house_' + id + '.mp3'); cur = a;
      var p = a.play(); if (p && p.catch) p.catch(function(){});
    } catch(e){}
  }
  function say(id){ play(id); return SAY[id] || ''; }
  var lastWow = -1;
  function wow(){ var i; do { i = Math.floor(Math.random() * WOW.length); } while (i === lastWow && WOW.length > 1); lastWow = i; return WOW[i]; }

  function badge(){ if (typeof updateProgressBadge === 'function') updateProgressBadge(); }

  window.House = { SAY: SAY, balance: balance, earned: earned, list: list, buy: buy, toggle: toggle, worn: worn, goal: goal, goalText: goalText,
                   say: say, wow: wow, ensureGift: ensureGift, badge: badge, STARS_PER_GAME: STARS_PER_GAME };
})();
