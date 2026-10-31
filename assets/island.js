/* ===== Білім Аралы — «Остров оживает» на главной =====
   Чем больше звёзд ребёнок заработал за учёбу (assets/progress.js, ключ bilim_araly_progress_v1), тем больше жизни на острове:
   кусты, клумба, яблоня, маяк, воздушный шар, дельфин, радуга, салют. Звёзды не тратятся и ни на что не обмениваются — остров только растёт.
   Рисунки нарисованы кодом и вставляются в SVG #isle главной страницы. Подпись под кнопками — на 7 языках, без названий предметов-сюрпризов:
   ребёнок сам замечает, что появилось. Новое появляется с «хлопком» и один раз подсвечивается подписью.
   Подключать после progress.js. Запомненное: bilim_island_v1 = { seen: [id…] }. */
(function(){
  'use strict';
  var NS = 'http://www.w3.org/2000/svg', SK = 'bilim_island_v1', PK = 'bilim_araly_progress_v1';
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var svg = document.getElementById('isle');
  if (!svg) return;

  var T = {
    ru: { prog: 'Остров оживает: {n} из {m}. До следующего чуда — ещё звёзд: {k}.', done: 'Остров ожил полностью: {m} из {m}. Спасибо, что учишься!', fresh: 'На острове появилось что-то новое! Посмотри.', wake: 'Остров ожил! Посмотри, что на нём теперь есть.' },
    kz: { prog: 'Арал жандануда: {m} ішінен {n}. Келесі ғажайыпқа дейін жұлдыз керек: {k}.', done: 'Арал толық жанданды: {m} ішінен {m}. Оқығаның үшін рахмет!', fresh: 'Аралда жаңа бірдеңе пайда болды! Қарашы.', wake: 'Арал жанданды! Қазір онда не бар екенін қарашы.' },
    en: { prog: 'The island is coming alive: {n} of {m}. Stars until the next surprise: {k}.', done: 'The island is fully alive: {m} of {m}. Thank you for learning!', fresh: 'Something new appeared on the island! Take a look.', wake: 'The island has come alive! See what is on it now.' },
    zh: { prog: '小岛正在苏醒：{n}/{m}。距离下一个惊喜还差{k}颗星。', done: '小岛完全苏醒了：{m}/{m}。谢谢你的学习！', fresh: '岛上出现了新东西！快来看看。', wake: '小岛醒来了！看看现在岛上有什么。' },
    uz: { prog: 'Орол жонланмоқда: {m} тадан {n}. Кейинги мўъжизагача юлдуз керак: {k}.', done: 'Орол тўлиқ жонланди: {m} тадан {m}. Ўқиётганинг учун раҳмат!', fresh: 'Оролда янги нарса пайдо бўлди! Қараб кўр.', wake: 'Орол жонланди! Унда нималар борлигини қараб кўр.' },
    tg: { prog: 'Ҷазира зинда мешавад: {n} аз {m}. То мӯъҷизаи навбатӣ ситора лозим: {k}.', done: 'Ҷазира пурра зинда шуд: {m} аз {m}. Ташаккур, ки таҳсил мекунӣ!', fresh: 'Дар ҷазира чизи нав пайдо шуд! Бин.', wake: 'Ҷазира зинда шуд! Бин, ки ҳоло дар он чӣ ҳаст.' },
    ug: { prog: 'ئارال جانلىنىۋاتىدۇ: {m} دىن {n}. كېيىنكى مۆجىزىگىچە يۇلتۇز كېرەك: {k}.', done: 'ئارال تولۇق جانلاندى: {m} دىن {m}. ئوقۇغىنىڭ ئۈچۈن رەھمەت!', fresh: 'ئارالدا يېڭى بىر نەرسە پەيدا بولدى! قاراپ باق.', wake: 'ئارال جانلاندى! ئۇنىڭدا ھازىر نېمىلەر بارلىقىنى قاراپ باق.' }
  };
  function lang(){ var l = document.documentElement.getAttribute('data-current'); return T[l] ? l : 'ru'; }
  function tx(key, v){ var s = T[lang()][key]; return s.replace(/\{(\w+)\}/g, function(a, k){ return v && v[k] !== undefined ? v[k] : a; }); }

  /* ---------- рисунки (viewBox острова 760×560) ---------- */
  function bush(x, y, s){ return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><ellipse cx="0" cy="4" rx="22" ry="5" fill="#1D5E49" opacity=".25"/><circle cx="-12" cy="-4" r="13" fill="#2E9A74"/><circle cx="12" cy="-4" r="13" fill="#2E9A74"/><circle cx="0" cy="-12" r="15" fill="#3FB088"/><circle cx="-5" cy="-16" r="5" fill="#6ED69A" opacity=".7"/></g>'; }
  function tuft(x, y){ return '<path d="M' + x + ' ' + y + ' l-4 -13 l5 8 l1 -14 l3 14 l5 -9 l-2 14Z" fill="#2E9A74"/>'; }
  var ART = {
    sprouts: function(){ return bush(100, 452, 1) + bush(668, 458, .9) + bush(470, 478, .55) + tuft(214, 456) + tuft(332, 480) + tuft(440, 468) + tuft(606, 474) + tuft(140, 470); },
    flowerbed: function(){
      var cols = [['#FF8FA3', '#FFF'], ['#B58CF0', '#FFD34D'], ['#fff', '#FFB347'], ['#FF6B5B', '#FFD34D'], ['#5CC8E1', '#fff'], ['#FFD34D', '#FF6B5B']], xs = [404, 420, 436, 452, 468, 484], h = '<ellipse cx="444" cy="476" rx="52" ry="7" fill="#1D5E49" opacity=".22"/>';
      xs.forEach(function(x, i){
        var y = 466 - (i % 2) * 6, c = cols[i];
        h += '<path d="M' + x + ' 478 Q' + (x + 2) + ' ' + (y + 8) + ' ' + x + ' ' + y + '" stroke="#2E9A74" stroke-width="3" fill="none" stroke-linecap="round"/>' +
          '<g>' + (reduce ? '' : '<animateTransform attributeName="transform" type="rotate" values="-4 ' + x + ' 478;4 ' + x + ' 478;-4 ' + x + ' 478" dur="' + (3 + i * .35) + 's" repeatCount="indefinite"/>') +
          '<circle cx="' + x + '" cy="' + y + '" r="6.5" fill="' + c[0] + '"/><circle cx="' + x + '" cy="' + y + '" r="2.8" fill="' + c[1] + '"/></g>';
      });
      return h;
    },
    tree: function(){
      return '<ellipse cx="680" cy="440" rx="34" ry="8" fill="#1D5E49" opacity=".25"/><path d="M672 440 C674 410 672 392 674 372 L688 372 C686 394 686 412 690 440Z" fill="#B5793F"/>' +
        '<g><circle cx="662" cy="356" r="26" fill="#2E9A74"/><circle cx="700" cy="356" r="26" fill="#2E9A74"/><circle cx="681" cy="336" r="29" fill="#3FB088"/><circle cx="672" cy="330" r="10" fill="#6ED69A" opacity=".6"/>' +
        '<circle cx="660" cy="362" r="5" fill="#E8453C"/><circle cx="690" cy="345" r="5" fill="#E8453C"/><circle cx="704" cy="366" r="5" fill="#E8453C"/><circle cx="676" cy="320" r="5" fill="#E8453C"/><circle cx="646" cy="348" r="4.5" fill="#E8453C"/></g>' +
        '<ellipse cx="716" cy="446" rx="6" ry="3" fill="#E8453C"/><circle cx="661" cy="361" r="1.6" fill="#fff" opacity=".6"/>';
    },
    lighthouse: function(){
      var beam = reduce ? '' : '<animate attributeName="opacity" values=".15;.8;.15" dur="3.2s" repeatCount="indefinite"/>';
      return '<ellipse cx="84" cy="440" rx="30" ry="7" fill="#1D5E49" opacity=".25"/><path d="M68 438 L74 330 L94 330 L100 438Z" fill="#FFF7E3" stroke="#B9A98A" stroke-width="2"/>' +
        '<path d="M70.5 408 L99 408 L98 392 L71.6 392Z M73 366 L96 366 L95.4 350 L73.8 350Z" fill="#E8584A"/><rect x="72" y="322" width="26" height="10" rx="3" fill="#6B7F95"/>' +
        '<rect x="76" y="304" width="18" height="18" rx="3" fill="#FFE27A" stroke="#6B7F95" stroke-width="2"/><circle cx="85" cy="313" r="14" fill="#FFF1A8" opacity=".25">' + beam + '</circle>' +
        '<path d="M72 306 L85 288 L98 306Z" fill="#E8584A" stroke="#8E2F3A" stroke-width="2" stroke-linejoin="round"/><rect x="80" y="418" width="10" height="20" rx="2" fill="#7A3B2E"/>';
    },
    balloon: function(){
      var mv = reduce ? '' : '<animateTransform attributeName="transform" type="translate" values="0 0;10 -14;0 0" dur="9s" repeatCount="indefinite"/>';
      return '<g>' + mv + '<g transform="translate(646 150)"><path d="M0 -42 C-34 -42 -40 -4 -22 22 L22 22 C40 -4 34 -42 0 -42Z" fill="#FF6B5B"/><path d="M0 -42 C-12 -42 -16 -8 -8 22 L8 22 C16 -8 12 -42 0 -42Z" fill="#FFD34D"/><path d="M-30 -22 C-38 -2 -30 14 -22 22 L-12 22 C-26 6 -26 -12 -22 -34Z" fill="#fff" opacity=".35"/>' +
        '<path d="M-22 22 L-9 40 M22 22 L9 40 M0 22 V40" stroke="#7A4620" stroke-width="2"/><rect x="-11" y="40" width="22" height="14" rx="3" fill="#C98B52" stroke="#7A4620" stroke-width="2"/></g></g>';
    },
    dolphin: function(){
      var d = 'M706 548 C716 500 744 494 756 548';
      var body = '<g><path d="M-26 6 C-24 -10 4 -16 22 -6 L34 -14 L32 2 L40 8 L28 8 C10 14 -14 14 -26 6Z" fill="#5FA8D3"/><path d="M-26 6 C-12 14 10 14 28 8 C8 10 -12 8 -26 6Z" fill="#E8F3FA"/><path d="M-2 -10 L2 -22 L8 -10Z" fill="#4A8FB8"/><circle cx="-16" cy="-1" r="1.8" fill="#1D3557"/><path d="M-26 6 L-38 4" stroke="#5FA8D3" stroke-width="4" stroke-linecap="round"/></g>';
      if (reduce) return '<g transform="translate(730 506) rotate(-12)">' + body + '</g>';
      return '<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.02;.3;.33;1" dur="7s" repeatCount="indefinite"/>' +
        '<g><animateMotion dur="7s" repeatCount="indefinite" path="' + d + '" rotate="auto" keyPoints="0;1;1" keyTimes="0;.33;1" calcMode="linear"/>' + body + '</g></g>' +
        '<ellipse cx="706" cy="550" rx="10" ry="3" fill="none" stroke="#fff" stroke-width="2" opacity="0"><animate attributeName="rx" values="6;22" dur="7s" keyTimes="0;.33" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;0" keyTimes="0;.33;1" dur="7s" repeatCount="indefinite"/></ellipse>';
    },
    rainbow: function(){
      var c = ['#FF6B5B', '#FFA24D', '#FFD34D', '#6ED69A', '#5CB8E8', '#9A7CE8'], h = '<g fill="none" stroke-width="8" opacity=".5" stroke-linecap="butt">';
      c.forEach(function(col, i){ var r = 338 - i * 9; h += '<path d="M' + (380 - r) + ' 440 A' + r + ' ' + r + ' 0 0 1 ' + (380 + r) + ' 440" stroke="' + col + '"/>'; });
      return h + '</g>';
    },
    fireworks: function(){
      function burst(cx, cy, col, begin){
        var rays = '', i;
        for (i = 0; i < 12; i++) rays += '<path d="M0 -12 V-30" transform="rotate(' + (i * 30) + ')" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>';
        var inner = reduce ? '' : '<animateTransform attributeName="transform" type="scale" values=".2;1.25;1.3" keyTimes="0;.5;1" dur="5.5s" begin="' + begin + 's" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;.2;.55;1" dur="5.5s" begin="' + begin + 's" repeatCount="indefinite"/>';
        return '<g transform="translate(' + cx + ' ' + cy + ')"><g opacity="' + (reduce ? '.8' : '0') + '">' + inner + rays + '<circle r="4" fill="#fff"/></g></g>';
      }
      return burst(230, 96, '#FFD34D', 0) + burst(560, 78, '#FF6B5B', 1.9) + burst(380, 62, '#5CC8E1', 3.7);
    }
  };
  /* порядок появления: звёзд нужно, где вставить */
  var ITEMS = [
    { id: 'sprouts', need: 10, at: 'afterFlowers' },
    { id: 'flowerbed', need: 25, at: 'afterFlowers' },
    { id: 'tree', need: 50, at: 'beforeGlobe' },
    { id: 'lighthouse', need: 100, at: 'beforePalm' },
    { id: 'balloon', need: 170, at: 'beforeWorld' },
    { id: 'dolphin', need: 250, at: 'beforeIsland' },
    { id: 'rainbow', need: 380, at: 'rainbowSlot' },
    { id: 'fireworks', need: 550, at: 'beforeWorld' }
  ];

  function jget(k, d){ try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e){ return d; } }
  function stars(){ var p = jget(PK, null); return p && p.totalStars ? +p.totalStars || 0 : 0; }

  function anchor(at){
    var world = svg.querySelector('#world');
    switch (at){
      case 'afterFlowers': var f = svg.querySelector('#flowers'); return f ? { p: f.parentNode, before: f.nextSibling } : null;
      case 'beforeGlobe': var g = svg.querySelector('#globe'); return g ? { p: g.parentNode, before: g } : null;
      case 'beforePalm': var pm = svg.querySelector('#palm'); return pm ? { p: pm.parentNode, before: pm } : null;
      case 'beforeWorld': case 'rainbowSlot': return world ? { p: world.parentNode, before: world } : null;
      case 'beforeIsland': var isl = world && world.querySelector(':scope > path'); return isl ? { p: world, before: isl } : null;
    }
    return null;
  }

  var CSS = '.isl{transform-box:fill-box; transform-origin:50% 100%;} .isl-pop{animation:islpop .95s cubic-bezier(.3,1.6,.5,1);} @keyframes islpop{from{transform:scale(.15); opacity:0;} to{transform:scale(1); opacity:1;}}' +
    '.isl-prog{margin:12px 0 0; max-width:30em; font-weight:700; font-size:clamp(.95rem,1.4vw,1.05rem); line-height:1.4; color:var(--txt); text-shadow:0 1px 3px var(--txs);}' +
    '.isl-prog.fresh{background:#FFF3C4; color:#7A4620; text-shadow:none; border:3px solid #F8AE3F; border-radius:16px; padding:8px 14px; box-shadow:0 4px 0 rgba(29,53,87,.14);}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  var rec = jget(SK, null), firstRun = !rec, seen = (rec && rec.seen) || [], total = stars(), fresh = [], timer = null;
  var line = document.createElement('p'); line.className = 'isl-prog'; line.setAttribute('role', 'status'); line.setAttribute('aria-live', 'polite');
  var quick = document.querySelector('.copy [data-quick]');
  if (quick && quick.parentNode) quick.parentNode.insertBefore(line, quick.nextSibling);

  var unlocked = ITEMS.filter(function(it){ return total >= it.need; });
  unlocked.forEach(function(it){
    var a = anchor(it.at); if (!a) return;
    var g = document.createElementNS(NS, 'g'); g.setAttribute('id', 'isl-' + it.id); g.setAttribute('class', 'isl');
    g.innerHTML = ART[it.id]();
    var isNew = !firstRun && seen.indexOf(it.id) < 0;
    if (isNew && !reduce){ g.setAttribute('class', 'isl isl-pop'); }
    if (isNew) fresh.push(it.id);
    a.p.insertBefore(g, a.before);
  });
  var wokeNow = firstRun && unlocked.length > 0;
  try { localStorage.setItem(SK, JSON.stringify({ seen: unlocked.map(function(i){ return i.id; }) })); } catch(e){}

  function nextItem(){ for (var i = 0; i < ITEMS.length; i++) if (total < ITEMS[i].need) return ITEMS[i]; return null; }
  function render(){
    var n = unlocked.length, m = ITEMS.length, nx = nextItem();
    if (timer === null && (fresh.length || wokeNow)){
      line.className = 'isl-prog fresh'; line.textContent = tx(fresh.length ? 'fresh' : 'wake');
      timer = setTimeout(function(){ timer = 0; render(); }, 12000);
      return;
    }
    if (timer) { line.className = 'isl-prog fresh'; line.textContent = tx(fresh.length ? 'fresh' : 'wake'); return; }
    line.className = 'isl-prog';
    line.textContent = nx ? tx('prog', { n: n, m: m, k: nx.need - total }) : tx('done', { m: m });
  }
  render();
  try { new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-current'] }); } catch(e){}
  window.__island = { stars: total, shown: unlocked.map(function(i){ return i.id; }), fresh: fresh };
})();
