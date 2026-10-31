/* ===== Білім Аралы — рисованные картинки для игр по ИЗО, 2 класс =====
   Всё рисуется кодом (SVG), без эмодзи и внешних картинок: цвета, линии, жанры, узоры, объёмные формы, постройки.
   Подключается перед игрой: <script src="../../../games/izo2-art.js"></script> */
(function(){
  if(window.IZO) return;
  var INK = '#25324A';
  var COL = {
    'красный':'#E53935', 'жёлтый':'#FDD835', 'синий':'#1E6FD9', 'зелёный':'#43A047', 'оранжевый':'#FB8C00',
    'фиолетовый':'#8E44AD', 'голубой':'#4FC3F7', 'розовый':'#F48FB1', 'коричневый':'#8D6E63', 'чёрный':'#212121',
    'белый':'#FFFFFF', 'серый':'#9E9E9E',
    'светло-зелёный':'#A5D6A7', 'тёмно-красный':'#7B1F1B', 'тёмно-синий':'#12306B'
  };
  function svg(w, h, body, extra){
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (extra && extra.w || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;height:auto">' + body + '</svg>';
  }

  /* ---------- цвета ---------- */
  function blob(c, s){
    s = s || 54;
    var edge = c === '#FFFFFF' ? '#B8C4D2' : 'rgba(0,0,0,.18)';
    return '<svg viewBox="0 0 60 60" width="' + s + '" height="' + s + '" xmlns="http://www.w3.org/2000/svg" style="display:block"><path d="M30 5C43 4 56 14 55 29C54 45 43 56 29 55C15 54 4 44 5 30C6 17 16 6 30 5Z" fill="' + c + '" stroke="' + edge + '" stroke-width="3"/><ellipse cx="20" cy="19" rx="7" ry="4" fill="#fff" opacity=".35" transform="rotate(-30 20 19)"/></svg>';
  }
  function dot(c, s){ s = s || 22; return '<span style="display:inline-block;vertical-align:middle;width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:' + c + ';border:2px solid ' + (c === '#FFFFFF' ? '#B8C4D2' : 'rgba(0,0,0,.18)') + ';margin-right:6px"></span>'; }
  function cname(n){ return COL[n]; }
  // смешивание: два пятна и результат (res = цвет или null → «?»)
  function mix(a, b, res){
    var q = '<div style="width:54px;height:54px;border-radius:50%;border:4px dashed #B8C4D2;display:flex;align-items:center;justify-content:center;font:800 2rem \'Baloo 2\',sans-serif;color:#8B95A3">?</div>';
    var op = function(t){ return '<span style="font:800 2rem \'Baloo 2\',sans-serif;color:' + INK + '">' + t + '</span>'; };
    return '<div style="display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(255,255,255,.75);border-radius:18px;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14)">' +
      (a ? blob(a) : q) + op('+') + (b ? blob(b) : q) + op('=') + (res ? blob(res) : q) + '</div>';
  }
  // палитра из цветов (полоска пятен)
  function palette(list, s){
    s = s || 48;
    return '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;background:rgba(255,255,255,.75);border-radius:18px;padding:10px 14px;box-shadow:0 4px 0 rgba(0,0,0,.14)">' + list.map(function(c){ return blob(c, s); }).join('') + '</div>';
  }

  /* ---------- линии ---------- */
  var LINES = {
    'прямая':    '<path d="M10 24 H150" stroke-width="6"/>',
    'волнистая': '<path d="M10 24 q 11 -20 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0" stroke-width="6"/>',
    'ломаная':   '<path d="M10 38 L34 10 L58 38 L82 10 L106 38 L130 10 L150 30" stroke-width="6"/>',
    'пунктирная':'<path d="M10 24 H150" stroke-width="7" stroke-dasharray="1 13"/>',
    'штриховая': '<path d="M10 24 H150" stroke-width="6" stroke-dasharray="16 10"/>',
    'дуга':      '<path d="M10 40 Q80 -14 150 40" stroke-width="6"/>',
    'тонкая':    '<path d="M10 24 H150" stroke-width="2"/>',
    'толстая':   '<path d="M10 24 H150" stroke-width="14"/>',
    'спираль':   '<path d="M80 26 c0 -6 8 -6 8 0 c0 10 -16 10 -16 -2 c0 -16 26 -16 26 2 c0 22 -36 22 -36 -4 c0 -28 46 -28 46 4" stroke-width="5"/>'
  };
  function line(kind, w){
    return svg(160, 48, '<g fill="none" stroke="' + INK + '" stroke-linecap="round" stroke-linejoin="round">' + LINES[kind] + '</g>', { w:w || 150 });
  }
  // штриховка: частая — тёмное место, редкая — светлое
  function hatch(n, w){
    var s = '<rect x="8" y="8" width="104" height="60" rx="8" fill="#fff" stroke="#B8C4D2" stroke-width="2"/><g stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round">';
    var gap = 76 / (n - 1);
    for(var i = 0; i < n; i++){ var x = 16 + i * gap; s += '<line x1="' + x.toFixed(1) + '" y1="62" x2="' + (x + 14).toFixed(1) + '" y2="14"/>'; }
    return svg(120, 76, s + '</g>', { w:w || 120 });
  }
  function dots(n, w){
    var s = '<rect x="8" y="8" width="104" height="60" rx="8" fill="#fff" stroke="#B8C4D2" stroke-width="2"/><g fill="' + INK + '">';
    var seed = 7; function r(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for(var i = 0; i < n; i++) s += '<circle cx="' + (16 + r() * 88).toFixed(1) + '" cy="' + (16 + r() * 44).toFixed(1) + '" r="2.4"/>';
    return svg(120, 76, s + '</g>', { w:w || 120 });
  }

  /* ---------- жанры ---------- */
  function frame(inner){ return svg(160, 116, '<rect x="3" y="3" width="154" height="110" rx="6" fill="#B07A3A"/><rect x="10" y="10" width="140" height="96" rx="2" fill="#FFF8E7"/>' + '<svg x="10" y="10" width="140" height="96" viewBox="0 0 160 110" preserveAspectRatio="xMidYMid slice">' + inner + '</svg>', { w:170 }); }
  var GENRE = {
    'портрет': '<rect width="160" height="110" fill="#FFE9C7"/><path d="M34 112 Q34 78 80 78 Q126 78 126 112Z" fill="#4D8FF0"/><rect x="72" y="68" width="16" height="14" fill="#F2C09A"/><circle cx="80" cy="50" r="26" fill="#F8CFA9"/><path d="M52 48 Q54 22 80 22 Q106 22 108 48 Q96 34 80 34 Q64 34 52 48Z" fill="#5A3A22"/><circle cx="70" cy="52" r="3.4" fill="' + INK + '"/><circle cx="90" cy="52" r="3.4" fill="' + INK + '"/><path d="M69 64 Q80 74 91 64" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>',
    'пейзаж': '<rect width="160" height="110" fill="#BDE5FF"/><circle cx="128" cy="26" r="13" fill="#FFD34D"/><path d="M0 74 L36 34 L66 66 L96 40 L160 82 V110 H0Z" fill="#8FA7C4"/><path d="M0 84 Q50 64 100 82 T160 78 V110 H0Z" fill="#5DB85C"/><rect x="22" y="70" width="6" height="22" fill="#7A5230"/><circle cx="25" cy="64" r="15" fill="#2E9A4D"/><path d="M60 104 Q100 92 150 104" stroke="#4FC3F7" stroke-width="7" fill="none" stroke-linecap="round"/>',
    'натюрморт': '<rect width="160" height="110" fill="#F2E3F5"/><rect y="76" width="160" height="34" fill="#B98A5B"/><path d="M62 98 Q52 74 66 62 H92 Q106 74 96 98Z" fill="#4D8FF0"/><rect x="72" y="52" width="12" height="12" fill="#4D8FF0"/><path d="M78 52 Q72 28 62 24 M78 52 Q82 22 84 14 M78 52 Q94 30 104 30" stroke="#2E9A4D" stroke-width="3" fill="none"/><circle cx="62" cy="24" r="8" fill="#F48FB1"/><circle cx="84" cy="14" r="8" fill="#FDD835"/><circle cx="104" cy="30" r="8" fill="#F48FB1"/><circle cx="118" cy="86" r="13" fill="#E53935"/><path d="M118 74 q3 -8 8 -9" stroke="#2E9A4D" stroke-width="3" fill="none"/><ellipse cx="36" cy="90" rx="13" ry="10" fill="#FDD835"/>'
  };
  function genre(k){ return frame(GENRE[k]); }

  /* ---------- узоры ---------- */
  function shape(t, c, s){
    s = s || 34; var r = '';
    if(t === 'круг') r = '<circle cx="20" cy="20" r="16" fill="' + c + '"/>';
    else if(t === 'квадрат') r = '<rect x="5" y="5" width="30" height="30" rx="3" fill="' + c + '"/>';
    else if(t === 'треугольник') r = '<polygon points="20,4 36,35 4,35" fill="' + c + '"/>';
    else if(t === 'звезда') r = '<polygon points="20,3 25,15 38,16 28,25 31,38 20,31 9,38 12,25 2,16 15,15" fill="' + c + '"/>';
    else if(t === 'ромб') r = '<polygon points="20,2 37,20 20,38 3,20" fill="' + c + '"/>';
    return '<svg viewBox="0 0 40 40" width="' + s + '" height="' + s + '" xmlns="http://www.w3.org/2000/svg" style="display:block">' + r + '</svg>';
  }
  // ряд узора: items = [[фигура, цвет], …]; hole = номер «?»
  function row(items, hole){
    return '<div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;background:rgba(255,255,255,.75);border-radius:18px;padding:10px 14px;box-shadow:0 4px 0 rgba(0,0,0,.14)">' + items.map(function(it, i){
      return i === hole ? '<div style="width:34px;height:34px;border-radius:8px;border:3px dashed #B8C4D2;display:flex;align-items:center;justify-content:center;font:800 1.3rem \'Baloo 2\',sans-serif;color:#8B95A3">?</div>' : shape(it[0], it[1]);
    }).join('') + '</div>';
  }
  // рога барана (қошқар мүйіз): один рог и его зеркальное отражение
  function horns(w, col){
    col = col || '#C0392B';
    var p = '<path d="M80 100 C60 100 42 90 36 70 C30 50 44 36 58 42 C70 48 66 64 54 60" fill="none" stroke="' + col + '" stroke-width="8" stroke-linecap="round"/>';
    return svg(160, 120, '<rect x="2" y="2" width="156" height="116" rx="14" fill="#FFF3D6" stroke="#D8B26A" stroke-width="3"/>' + p + '<g transform="translate(160 0) scale(-1 1)">' + p + '</g><circle cx="80" cy="102" r="6" fill="' + col + '"/>', { w:w || 150 });
  }
  // цветок: простое обобщение — круг и лепестки
  function flower(n, col, w){
    var s = '', i;
    for(i = 0; i < n; i++){ var a = i * 360 / n; s += '<ellipse cx="60" cy="26" rx="11" ry="20" fill="' + (col || '#F27AA8') + '" transform="rotate(' + a + ' 60 60)"/>'; }
    s += '<circle cx="60" cy="60" r="13" fill="#FDD835" stroke="#E0A62A" stroke-width="3"/>';
    return svg(120, 120, s, { w:w || 110 });
  }
  // половинка узора и целый (симметрия): лист
  function leaf(w){
    return svg(120, 120, '<path d="M60 108 C14 90 14 40 60 10 C106 40 106 90 60 108Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="4"/><path d="M60 108 V22 M60 70 L38 52 M60 70 L82 52 M60 48 L44 34 M60 48 L76 34" stroke="#2E7D32" stroke-width="3" fill="none" stroke-linecap="round"/>', { w:w || 110 });
  }

  /* ---------- объёмные формы ---------- */
  var FORMS = {
    'шар':      '<circle cx="50" cy="52" r="34" fill="#F27AA8"/><ellipse cx="38" cy="38" rx="10" ry="6" fill="#fff" opacity=".4" transform="rotate(-35 38 38)"/><path d="M20 70 Q50 96 80 68 Q70 86 50 86 Q30 86 20 70Z" fill="#CE4E81" opacity=".55"/>',
    'куб':      '<polygon points="16,34 66,34 66,86 16,86" fill="#4D8FF0"/><polygon points="16,34 34,16 84,16 66,34" fill="#8FBBFF"/><polygon points="66,34 84,16 84,66 66,86" fill="#2760C4"/>',
    'цилиндр':  '<rect x="22" y="26" width="56" height="52" fill="#FFA24D"/><ellipse cx="50" cy="78" rx="28" ry="10" fill="#FFA24D"/><ellipse cx="50" cy="26" rx="28" ry="10" fill="#FFC785"/><path d="M22 78 Q50 98 78 78" fill="#D9741A" opacity=".35"/>',
    'конус':    '<polygon points="50,10 82,78 18,78" fill="#4DC98F"/><ellipse cx="50" cy="78" rx="32" ry="10" fill="#4DC98F"/><polygon points="50,10 82,78 60,86 50,10" fill="#27976A" opacity=".5"/>',
    'пирамида': '<polygon points="50,8 14,80 56,92" fill="#FFD34D"/><polygon points="50,8 56,92 88,76" fill="#D9A21A"/>'
  };
  function form(k, w){ return svg(100, 100, FORMS[k], { w:w || 90 }); }

  /* ---------- постройки ---------- */
  var BUILD = {
    'дом':    '<rect x="0" y="100" width="160" height="6" fill="#8CC56B"/><rect x="34" y="52" width="70" height="50" fill="#F2C48A"/><polygon points="26,52 69,16 112,52" fill="#C0392B"/><rect x="58" y="70" width="22" height="32" fill="#8D6E63"/><rect x="42" y="62" width="12" height="12" fill="#BDE5FF"/><rect x="86" y="62" width="12" height="12" fill="#BDE5FF"/>',
    'башня':  '<rect x="0" y="100" width="160" height="6" fill="#8CC56B"/><rect x="56" y="40" width="40" height="62" fill="#B0BEC5"/><ellipse cx="76" cy="102" rx="20" ry="4" fill="#B0BEC5"/><ellipse cx="76" cy="40" rx="22" ry="4" fill="#90A4AE"/><polygon points="50,40 76,6 102,40" fill="#C0392B"/><rect x="68" y="52" width="16" height="14" fill="#546E7A"/><rect x="68" y="76" width="16" height="26" fill="#546E7A"/>',
    'юрта':   '<rect x="0" y="100" width="160" height="6" fill="#D8C27A"/><rect x="28" y="56" width="104" height="46" fill="#F3EAD3"/><path d="M28 56 Q80 -6 132 56Z" fill="#FFF8E7" stroke="#E4D4A8" stroke-width="2"/><circle cx="80" cy="30" r="7" fill="#7FB8E6" opacity=".8"/><path d="M64 102 V74 Q80 62 96 74 V102Z" fill="#B0472E"/><path d="M28 80 H132" stroke="#C0392B" stroke-width="6"/>',
    'пирамида':'<rect x="0" y="100" width="160" height="6" fill="#E6C98A"/><polygon points="80,10 20,100 100,100" fill="#F0CE7A"/><polygon points="80,10 100,100 140,100" fill="#C9A24C"/>'
  };
  function building(k, w){ return svg(160, 108, '<rect width="160" height="108" fill="#CFEAFF"/>' + BUILD[k], { w:w || 150 }); }

  /* ---------- снеговик из шаров ---------- */
  function snowman(w){
    return svg(100, 130, '<circle cx="50" cy="100" r="26" fill="#F4F9FF" stroke="#B8D4EE" stroke-width="3"/><circle cx="50" cy="60" r="19" fill="#F4F9FF" stroke="#B8D4EE" stroke-width="3"/><circle cx="50" cy="28" r="14" fill="#F4F9FF" stroke="#B8D4EE" stroke-width="3"/><circle cx="45" cy="25" r="2" fill="' + INK + '"/><circle cx="56" cy="25" r="2" fill="' + INK + '"/><polygon points="50,29 66,32 50,35" fill="#FB8C00"/><circle cx="50" cy="56" r="2.5" fill="' + INK + '"/><circle cx="50" cy="66" r="2.5" fill="' + INK + '"/>', { w:w || 90 });
  }

  /* ---------- готовые задания для игр ---------- */
  var ACC = { 'красный':'красную', 'жёлтый':'жёлтую', 'синий':'синюю', 'зелёный':'зелёную', 'белый':'белую', 'чёрный':'чёрную' };
  var DAT = { 'красный':'красной', 'жёлтый':'жёлтой', 'синий':'синей' };
  var MIXES = [['жёлтый', 'синий', 'зелёный'], ['красный', 'жёлтый', 'оранжевый'], ['красный', 'синий', 'фиолетовый']];
  var LIGHT = [['красный', 'белый', 'розовый'], ['синий', 'белый', 'голубой'], ['зелёный', 'белый', 'светло-зелёный'], ['красный', 'чёрный', 'тёмно-красный'], ['синий', 'чёрный', 'тёмно-синий']];
  var WARM = ['красный', 'оранжевый', 'жёлтый'], COLD = ['синий', 'голубой', 'фиолетовый'];
  var GEN_TXT = {
    'портрет':'Портрет — картина, на которой главное человек.',
    'пейзаж':'Пейзаж — картина о природе: горы, река, лес, поле.',
    'натюрморт':'Натюрморт — картина, где изображены предметы: цветы, фрукты, посуда.'
  };
  var LINE_TXT = {
    'прямая':'Прямая линия идёт ровно, без изгибов.', 'волнистая':'Волнистая линия изгибается, как волны.', 'ломаная':'Ломаная линия состоит из прямых отрезков с углами.',
    'пунктирная':'Пунктирная линия состоит из точек.', 'штриховая':'Штриховая линия состоит из коротких чёрточек.', 'дуга':'Дуга — изогнутая линия, как радуга.',
    'тонкая':'Тонкая линия лёгкая и узкая.', 'толстая':'Толстая линия широкая и заметная.'
  };
  var FORM_TXT = {
    'шар':'Шар круглый со всех сторон, как мяч.', 'куб':'У куба шесть одинаковых квадратных граней.', 'цилиндр':'У цилиндра два круглых основания, как у банки.',
    'конус':'У конуса круглое основание и острая вершина.', 'пирамида':'У пирамиды острая вершина и треугольные грани.'
  };
  var LIKE = { 'шар':'мяч', 'куб':'игральный кубик', 'цилиндр':'консервная банка', 'конус':'морковка' };
  var BUILD_TXT = { 'дом':'Куб и треугольная крыша', 'башня':'Цилиндр и конус', 'юрта':'Цилиндр и купол', 'пирамида':'Пирамида' };
  var BUILD_SAY = { 'дом':'Дом состоит из куба и треугольной крыши.', 'башня':'Башня состоит из цилиндра и конуса.', 'юрта':'Юрта состоит из цилиндра и купола, а купол — это половина шара.', 'пирамида':'Это пирамида.' };
  var UNITS = [['круг', '#E53935', 'красный круг'], ['квадрат', '#1E6FD9', 'синий квадрат'], ['треугольник', '#43A047', 'зелёный треугольник'], ['звезда', '#FDD835', 'жёлтая звезда'], ['ромб', '#8E44AD', 'фиолетовый ромб']];
  var MOOD = {
    'радостное':[['#FDD835', '#FB8C00', '#E53935', '#FFEE58'], 'Яркие тёплые цвета обычно передают радость.'],
    'грустное':[['#455A64', '#37474F', '#78909C', '#263238'], 'Тёмные серые и холодные цвета обычно передают грусть.'],
    'спокойное':[['#A5D6A7', '#81D4FA', '#B3E5FC', '#C8E6C9'], 'Мягкие голубые и зелёные цвета обычно передают спокойствие.']
  };
  var SEASON = {
    'зима':[['#FFFFFF', '#BBDEFB', '#90CAF9', '#E3F2FD'], 'Зимой много белого и голубого: снег и лёд.'],
    'весна':[['#C5E1A5', '#F8BBD0', '#FFF59D', '#B2EBF2'], 'Весной цвета нежные: светлая зелень и розовые цветы.'],
    'лето':[['#2E9A4D', '#FDD835', '#29B6F6', '#66BB6A'], 'Летом цвета яркие: зелёная листва, жёлтое солнце и синее небо.'],
    'осень':[['#FB8C00', '#E53935', '#8D6E63', '#FDD835'], 'Осенью листья жёлтые, оранжевые и красные.']
  };
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  function T(X){
    var G = MXG2, S = X.S, pick = X.pick, shuffle = X.shuffle, rnd = X.rnd;
    function others(list, not, n){ return shuffle(list.filter(function(x){ return x !== not; })).slice(0, n); }
    function ch(sig, o){ o.layout = o.layout || 'wide'; return S(sig, G.choice(o)); }
    function swOpts(t, names){ t.opts = shuffle(names).map(function(n){ return { v:n, h:'<span class="nm">' + dot(COL[n], 18) + n + '</span>' }; }); return t; }
    function pp(sig, o, ansLabel, vis, text, spoken){
      var t = G.pickPic(o);
      return S(sig, Object.assign(t, { hintExpr:'<span class="ok">' + ansLabel + '</span>', hintSay:[G.say(spoken || text)], hint:G.hintCard(vis, text) }));
    }
    var F = {};
    F.genreName = function(){ var g = pick(Object.keys(GENRE)), ops = Object.keys(GENRE).map(cap);
      return ch('gn' + g, { q:'Как называется такая картина?', opts:ops, ans:cap(g), expr:genre(g), hintVis:genre(g), hint:GEN_TXT[g], hintPlain:GEN_TXT[g] }); };
    F.genrePick = function(){ var g = pick(Object.keys(GENRE)), q = 'Найди ' + { 'портрет':'портрет', 'пейзаж':'пейзаж', 'натюрморт':'натюрморт' }[g] + '.';
      return pp('gp' + g, { q:q, say:[G.say(q)], ans:g, items:Object.keys(GENRE).map(function(k){ return { k:k, h:genre(k) }; }) }, cap(g), genre(g), GEN_TXT[g]); };
    F.lineName = function(){ var ks = ['прямая', 'волнистая', 'ломаная', 'пунктирная', 'дуга'], k = pick(ks);
      return ch('ln' + k, { q:'Какая это линия?', opts:[k].concat(others(ks, k, 2)), ans:k, expr:line(k, 190), hintVis:line(k, 170), hint:LINE_TXT[k], hintPlain:LINE_TXT[k] }); };
    F.linePick = function(){ var ks = ['прямая', 'волнистая', 'ломаная', 'пунктирная', 'дуга'], k = pick(ks), q = 'Найди ' + { 'прямая':'прямую', 'волнистая':'волнистую', 'ломаная':'ломаную', 'пунктирная':'пунктирную', 'дуга':'дугу' }[k] + ' линию.';
      if(k === 'дуга') q = 'Найди дугу.';
      return pp('lp' + k, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(ks, k, 3)).map(function(x){ return { k:x, h:line(x, 120) }; }) }, k, line(k, 170), LINE_TXT[k]); };
    F.thick = function(){ var k = pick(['тонкая', 'толстая']), q = k === 'тонкая' ? 'Найди тонкую линию.' : 'Найди толстую линию.';
      return pp('th' + k, { q:q, say:[G.say(q)], ans:k, items:[{ k:'тонкая', h:line('тонкая', 120) }, { k:'толстая', h:line('толстая', 120) }, { k:'прямая', h:line('прямая', 120) }] }, k, line(k, 170), LINE_TXT[k] + ' Обычная линия — между ними.'); };
    F.shade = function(){ var dark = Math.random() < .5, hat = Math.random() < .5, q = dark ? 'Нажми на более тёмное место.' : 'Нажми на более светлое место.';
      var a = hat ? hatch(14, 110) : dots(46, 110), b = hat ? hatch(5, 110) : dots(10, 110);
      return pp('sh' + dark + hat, { q:q, say:[G.say(q)], ans:dark ? 'a' : 'b', items:[{ k:'a', h:a }, { k:'b', h:b }] }, dark ? 'чаще' : 'реже', dark ? a : b, hat ? 'Чем чаще штрихи, тем темнее место. Чем реже штрихи, тем светлее.' : 'Чем больше точек, тем темнее место. Чем меньше точек, тем светлее.'); };
    F.mix = function(){ var m = pick(MIXES), ask = Math.random() < .6;
      if(ask){ var q = 'Что получится, если смешать ' + ACC[m[0]] + ' и ' + ACC[m[1]] + ' краски?', ops = MIXES.map(function(x){ return x[2]; }).concat(['коричневый']);
        var t = ch('mx' + m[2], { q:q, opts:[m[2]].concat(others(ops, m[2], 2)), ans:m[2], expr:mix(COL[m[0]], COL[m[1]], null), hintVis:mix(COL[m[0]], COL[m[1]], COL[m[2]]), hint:cap(m[0]) + ' и ' + m[1] + ' дают ' + m[2] + ' цвет.', hintPlain:cap(m[0]) + ' и ' + m[1] + ' дают ' + m[2] + ' цвет.' });
        return swOpts(t, [m[2]].concat(others(ops, m[2], 2))); }
      var flip = Math.random() < .5, a = flip ? m[1] : m[0], b = flip ? m[0] : m[1], third = ['красный', 'жёлтый', 'синий'].filter(function(x){ return x !== a && x !== b; })[0];
      var q2 = 'Какую краску добавить к ' + DAT[a] + ', чтобы получился ' + m[2] + ' цвет?';
      var t2 = ch('mxb' + a + m[2], { q:q2, opts:[b, third, 'белый'], ans:b, expr:mix(COL[a], null, COL[m[2]]), hintVis:mix(COL[a], COL[b], COL[m[2]]), hint:cap(a) + ' и ' + b + ' дают ' + m[2] + ' цвет.', hintPlain:cap(a) + ' и ' + b + ' дают ' + m[2] + ' цвет.' });
      return swOpts(t2, [b, third, 'белый']); };
    F.light = function(){ var m = pick(LIGHT), q = 'Что получится, если к ' + DAT2(m[0]) + ' краске добавить ' + ACC[m[1]] + '?', ops = LIGHT.map(function(x){ return x[2]; });
      var t = ch('lt' + m[0] + m[1], { q:q, opts:[m[2]].concat(others(ops, m[2], 2)), ans:m[2], expr:mix(COL[m[0]], COL[m[1]], null), hintVis:mix(COL[m[0]], COL[m[1]], COL[m[2]]),
        hint:m[1] === 'белый' ? 'Белая краска делает цвет светлее.' : 'Чёрная краска делает цвет темнее.', hintPlain:m[1] === 'белый' ? 'Белая краска делает цвет светлее.' : 'Чёрная краска делает цвет темнее.' });
      return swOpts(t, [m[2]].concat(others(ops, m[2], 2))); };
    function DAT2(c){ return { 'красный':'красной', 'синий':'синей', 'зелёный':'зелёной' }[c]; }
    F.warm = function(){ var w = Math.random() < .5, own = w ? WARM : COLD, oth = w ? COLD : WARM, a = pick(own), q = w ? 'Найди тёплый цвет.' : 'Найди холодный цвет.';
      var items = [a].concat(shuffle(oth).slice(0, 2)).map(function(n){ return { k:n, h:blob(COL[n], 54), lab:n }; });
      return pp('wm' + a, { q:q, say:[G.say(q)], ans:a, items:items }, a, blob(COL[a], 70), w ? 'Тёплые цвета — красный, оранжевый и жёлтый. Они как солнце и огонь.' : 'Холодные цвета — синий, голубой и фиолетовый. Они как лёд и вода.'); };
    F.formName = function(){ var ks = ['шар', 'куб', 'цилиндр', 'конус', 'пирамида'], k = pick(ks);
      return ch('fn' + k, { q:'Как называется эта форма?', opts:[k].concat(others(ks, k, 2)), ans:k, expr:form(k, 110), hintVis:form(k, 100), hint:FORM_TXT[k], hintPlain:FORM_TXT[k] }); };
    F.formLike = function(){ var ks = Object.keys(LIKE), k = pick(ks);
      return ch('fl' + k, { q:'На что похожа эта форма?', opts:[LIKE[k]].concat(others(ks, k, 2).map(function(x){ return LIKE[x]; })), ans:LIKE[k], layout:'card', expr:form(k, 110), hintVis:form(k, 100), hint:cap(k) + ' похож на ' + (k === 'шар' ? 'мяч' : k === 'куб' ? 'игральный кубик' : k === 'цилиндр' ? 'консервную банку' : 'морковку') + '.', hintPlain:FORM_TXT[k] }); };
    F.snow = function(){ return ch('snow', { q:'Сколько шаров нужно слепить для такого снеговика?', opts:['2', '3', '4'], ans:'3', expr:snowman(110), hintVis:snowman(100), hint:'Голова, туловище и нижний шар: всего три шара.', hintPlain:'Голова, туловище и нижний шар: всего три шара.' }); };
    F.pattern = function(){ var p = pick([2, 3]), us = shuffle(UNITS).slice(0, p), len = p === 2 ? 5 : 6, seq = [], i;
      for(i = 0; i < len; i++) seq.push(us[i % p]);
      var ans = seq[len - 1], ai = us.indexOf(ans), ds = p === 2 ? [us[1 - ai], pick(UNITS.filter(function(u){ return us.indexOf(u) < 0; }))] : us.filter(function(u){ return u !== ans; });
      var items = [ans].concat(ds).map(function(u){ return { k:u[0], h:shape(u[0], u[1], 50) }; });
      var names = us.map(function(u){ return u[2]; }), q = 'Что дальше в узоре?';
      return pp('pt' + us.map(function(u){ return u[0]; }).join('') + len, { q:q, say:[G.say(q + ' Узор повторяется.')], expr:row(seq.map(function(u){ return [u[0], u[1]]; }), len - 1), ans:ans[0], items:items }, ans[2],
        row(seq.slice(0, len - 1).concat([ans]).map(function(u){ return [u[0], u[1]]; }), -1), 'В узоре повторяются ' + (p === 2 ? names[0] + ' и ' + names[1] : names[0] + ', ' + names[1] + ' и ' + names[2]) + '. Дальше нужен ' + ans[2] + '.'); };
    F.horns = function(){ var ops = ['На рога барана', 'На крылья бабочки', 'На следы кошки'];
      return ch('horns', { q:'На что похож этот казахский узор?', opts:ops, ans:ops[0], layout:'card', expr:horns(190), hintVis:horns(170), hint:'Этот узор называется «қошқар мүйіз». Так рисуют рога барана.', hintPlain:'Этот узор называется кошкар муиз. Так рисуют рога барана.' }); };
    F.flower = function(){ var ops = ['Круг и овальные лепестки', 'Квадрат и треугольники', 'Только прямые линии'], n = pick([5, 6, 8]);
      return ch('fw' + n, { q:'Из каких простых форм собран цветок?', opts:ops, ans:ops[0], layout:'card', expr:flower(n, pick(['#F27AA8', '#FB8C00', '#8E44AD']), 120), hintVis:flower(n, '#F27AA8', 110), hint:'Если упростить цветок, остаются круг в середине и лепестки-овалы. Так упрощают: это называется обобщение.', hintPlain:'Если упростить цветок, остаются круг в середине и лепестки-овалы. Так упрощают, это называется обобщение.' }); };
    F.leaf = function(){ var ops = ['Одинаковые, симметричные', 'Совсем разные', 'Одной половинки нет'];
      return ch('leaf', { q:'Половинки листа слева и справа…', opts:ops, ans:ops[0], layout:'card', expr:leaf(120), hintVis:leaf(110), hint:'Левая и правая половинки одинаковые. Это симметрия.', hintPlain:'Левая и правая половинки одинаковые. Это симметрия.' }); };
    F.build = function(){ var ks = Object.keys(BUILD_TXT), k = pick(ks);
      return ch('bf' + k, { q:'Из каких форм состоит эта постройка?', opts:[BUILD_TXT[k]].concat(others(ks, k, 2).map(function(x){ return BUILD_TXT[x]; })), ans:BUILD_TXT[k], layout:'card', expr:building(k, 170), hintVis:building(k, 150), hint:BUILD_SAY[k], hintPlain:BUILD_SAY[k] }); };
    F.buildPick = function(){ var ks = ['дом', 'башня', 'юрта'], k = pick(ks), q = 'Найди ' + { 'дом':'дом', 'башня':'башню', 'юрта':'юрту' }[k] + '.';
      return pp('bp' + k, { q:q, say:[G.say(q)], ans:k, items:ks.map(function(x){ return { k:x, h:building(x, 120) }; }) }, k, building(k, 160), k === 'юрта' ? 'Юрта круглая: у неё стены-цилиндр и купол сверху.' : k === 'дом' ? 'У дома стены-куб и треугольная крыша.' : 'У башни стены-цилиндр и остроконечная крыша-конус.'); };
    F.mood = function(){ var k = pick(Object.keys(MOOD)), ops = Object.keys(MOOD);
      return ch('md' + k, { q:'Какое настроение у этих цветов?', opts:ops, ans:k, expr:palette(MOOD[k][0], 46), hintVis:palette(MOOD[k][0], 46), hint:MOOD[k][1], hintPlain:MOOD[k][1] }); };
    F.season = function(){ var k = pick(Object.keys(SEASON)), ops = Object.keys(SEASON);
      return ch('se' + k, { q:'К какому времени года подходят эти цвета?', opts:[k].concat(others(ops, k, 2)), ans:k, expr:palette(SEASON[k][0], 46), hintVis:palette(SEASON[k][0], 46), hint:SEASON[k][1], hintPlain:SEASON[k][1] }); };
    return F;
  }

  window.IZO = { COL:COL, cname:cname, blob:blob, dot:dot, mix:mix, palette:palette, line:line, hatch:hatch, dots:dots, genre:genre, shape:shape, row:row,
    horns:horns, flower:flower, leaf:leaf, form:form, building:building, snowman:snowman, T:T };
})();
