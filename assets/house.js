/* ===== Білім Аралы — «Дом Барсика»: звёзды, покупки, наряды =====
   Подключать после assets/progress.js и assets/barsik.js.
   Хранение: localStorage 'bilim_house_v1' = { spent, owned:{id:true}, worn:{slot:id}, gift:1 }.
   Баланс = все заработанные звёзды (progress.js) минус потраченные здесь. Только в этом браузере, как и остальной прогресс.
   Тексты и названия вещей — в assets/house-i18n.js (7 языков, подключать до этого файла).
   Голос: записанный голос Барсика assets/audio/barsik/<ru|kz>/house_<id>.mp3. Если файла нет (или язык без записи) — показывается только текст (робот-голос не используется). */
(function(){
  'use strict';
  var KEY = 'bilim_house_v1';
  var ROOT = (typeof PROGRESS_ROOT === 'string' && PROGRESS_ROOT) ? PROGRESS_ROOT : '../';
  var STARS_PER_GAME = 10; /* пройденная игра даёт около 10 звёзд — по этому числу считаем «ещё N игр» */

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
      return { id: it.id, slot: it.slot, name: HI.t('item_' + it.id), acc: HI.t('acc_' + it.id), price: it.price, vb: it.vb, art: it.art,
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
  function goalText(){
    var g = goal();
    if (!g) return { main: HI.t('goal_done_main'), sub: HI.t('goal_done_sub'), pct: 100 };
    return {
      main: HI.t('goal_main', { n: g.games, games: HI.games(g.games), acc: g.item.acc }),
      sub: HI.t('goal_sub', { need: g.need, price: g.item.price, per: STARS_PER_GAME }),
      pct: Math.min(100, Math.round((g.item.price - g.need) / g.item.price * 100))
    };
  }

  /* голос: проигрываем запись, если она есть; ошибки (нет файла, автоплей запрещён) молча игнорируем */
  var cur = null;
  function play(id){
    try {
      if (cur){ cur.pause(); cur = null; }
      var dir = HI.voiceDir(); if (!dir) return;   /* на языках без записи Барсик молчит, только текст */
      var a = new Audio(ROOT + 'assets/audio/barsik/' + dir + '/house_' + id + '.mp3'); cur = a;
      var p = a.play(); if (p && p.catch) p.catch(function(){});
    } catch(e){}
  }
  function say(id){ play(id); return HI.t('say_' + id); }
  var lastWow = -1;
  function wow(){ var i; do { i = Math.floor(Math.random() * WOW.length); } while (i === lastWow && WOW.length > 1); lastWow = i; return WOW[i]; }

  function badge(){ if (typeof updateProgressBadge === 'function') updateProgressBadge(); }

  window.House = { balance: balance, earned: earned, list: list, buy: buy, toggle: toggle, worn: worn, goal: goal, goalText: goalText,
                   say: say, wow: wow, ensureGift: ensureGift, badge: badge, STARS_PER_GAME: STARS_PER_GAME };
})();
