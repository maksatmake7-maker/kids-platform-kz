/* ===== Білім Аралы — рисованные картинки для игр по физкультуре, 2 класс =====
   Человечки-спортсмены и снаряды рисуются кодом (SVG), без эмодзи и внешних картинок.
   Подключается перед игрой: <script src="../../../games/fiz2-art.js"></script> */
(function(){
  if(window.FZ) return;
  var INK = '#25324A';
  function svg(w, h, body, px){
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (px || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;height:auto">' + body + '</svg>';
  }
  function s(c, w){ return 'stroke="' + (c || INK) + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round" stroke-linecap="round"'; }
  var R = Math.PI / 180;
  function pt(x, y, L, a){ return [x + L * Math.sin(a * R), y + L * Math.cos(a * R)]; }

  /* углы отсчитываются от направления «вниз»: плюс — вправо по экрану, минус — влево */
  var POSES = {
    'стойка':      { aL:[-8,-8],     aR:[8,8],       lL:[-5,-5],   lR:[5,5] },
    'руки вверх':  { aL:[-155,-165], aR:[155,165],   lL:[-5,-5],   lR:[5,5] },
    'руки в стороны': { aL:[-90,-90], aR:[90,90],    lL:[-8,-8],   lR:[8,8] },
    'прыжок':      { aL:[-140,-150], aR:[140,150],   lL:[-28,-30], lR:[28,30], hip:70 },
    'бег':         { aL:[-55,-110],  aR:[50,160],    lL:[-50,-10], lR:[30,70], lean:12, hip:70 },
    'приседание':  { aL:[-80,-80],   aR:[80,80],     lL:[-65,-5],  lR:[65,5], hip:88 },
    'равновесие':  { aL:[-90,-90],   aR:[90,90],     lL:[-3,-3],   lR:[85,85] },
    'метание':     { aL:[-60,-30],   aR:[150,95],    lL:[-28,-28], lR:[22,12], lean:-8 },
    'наклон':      { aL:[-5,-5],     aR:[5,5],       lL:[-4,-4],   lR:[4,4], lean:70, x:30 }
  };
  var NAMES = ['бег', 'прыжок', 'наклон', 'приседание', 'равновесие', 'метание', 'руки вверх', 'руки в стороны'];
  var POSE_TXT = {
    'бег':'Это бег. Бегун наклоняется вперёд и быстро двигает ногами и руками.',
    'прыжок':'Это прыжок. Спортсмен отталкивается ногами, а руки поднимает вверх.',
    'наклон':'Это наклон вперёд. Ноги прямые, а тело наклоняется.',
    'приседание':'Это приседание. Спортсмен сгибает колени и опускается вниз.',
    'равновесие':'Это равновесие. Спортсмен стоит на одной ноге и держит руки в стороны.',
    'метание':'Это метание. Спортсмен замахивается рукой и бросает предмет.',
    'руки вверх':'Это потягивание: руки вытянуты вверх.',
    'руки в стороны':'Это упражнение руки в стороны: руки вытянуты на уровне плеч.'
  };
  function fig(name, w, col){
    var P = POSES[name], hip = P.hip || 70, lean = P.lean || 0, T = 36, c = col || '#1E6FD9', skin = '#FFCFA3';
    var hx = P.x || 50, hy = hip, nx = hx + T * Math.sin(lean * R), ny = hy - T * Math.cos(lean * R), o = '';
    function limb(x, y, a, L1, L2, wd, colr){
      var p1 = pt(x, y, L1, a[0]), p2 = pt(p1[0], p1[1], L2, a[1]);
      return '<polyline points="' + x + ',' + y + ' ' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + '" fill="none" stroke="' + colr + '" stroke-width="' + wd + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    o += limb(hx - 4, hy, P.lL, 21, 21, 7, INK) + limb(hx + 4, hy, P.lR, 21, 21, 7, INK);
    o += '<line x1="' + hx + '" y1="' + hy + '" x2="' + nx.toFixed(1) + '" y2="' + ny.toFixed(1) + '" stroke="' + c + '" stroke-width="13" stroke-linecap="round"/>';
    o += limb(nx - 4, ny + 3, P.aL, 15, 14, 5.5, skin) + limb(nx + 4, ny + 3, P.aR, 15, 14, 5.5, skin);
    var hdx = nx + 11 * Math.sin(lean * R), hdy = ny - 11 * Math.cos(lean * R);
    o += '<circle cx="' + hdx.toFixed(1) + '" cy="' + hdy.toFixed(1) + '" r="9.5" fill="' + skin + '" ' + s() + '/>';
    return svg(100, 120, '<rect width="100" height="120" rx="12" fill="#F4FAFF"/><line x1="8" y1="112" x2="92" y2="112" ' + s('#9CCB8F', 4) + '/>' + o, w || 90);
  }
  // осанка: вид сбоку
  function posture(good, w){
    var c = '#1E6FD9', skin = '#FFCFA3', o = '<rect width="100" height="120" rx="12" fill="#F4FAFF"/><line x1="8" y1="112" x2="92" y2="112" ' + s('#9CCB8F', 4) + '/>';
    o += '<line x1="46" y1="72" x2="46" y2="110" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/><line x1="54" y1="72" x2="54" y2="110" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>';
    if(good){
      o += '<line x1="50" y1="72" x2="50" y2="36" stroke="' + c + '" stroke-width="14" stroke-linecap="round"/><line x1="50" y1="40" x2="50" y2="72" stroke="' + skin + '" stroke-width="0"/>' +
        '<line x1="52" y1="40" x2="54" y2="68" stroke="' + skin + '" stroke-width="5.5" stroke-linecap="round"/><circle cx="50" cy="24" r="10" fill="' + skin + '" ' + s() + '/>';
    } else {
      o += '<path d="M48 72 Q32 54 52 42" fill="none" stroke="' + c + '" stroke-width="14" stroke-linecap="round"/>' +
        '<line x1="56" y1="46" x2="64" y2="72" stroke="' + skin + '" stroke-width="5.5" stroke-linecap="round"/><circle cx="66" cy="34" r="10" fill="' + skin + '" ' + s() + '/>';
    }
    return svg(100, 120, o, w || 90);
  }

  var OBJ = {
    'мяч': '<circle cx="50" cy="50" r="38" fill="#fff" ' + s() + '/><polygon points="50,32 66,44 60,63 40,63 34,44" fill="' + INK + '"/>' +
      '<line x1="50" y1="32" x2="50" y2="14" ' + s() + '/><line x1="66" y1="44" x2="84" y2="38" ' + s() + '/><line x1="60" y1="63" x2="72" y2="80" ' + s() + '/><line x1="40" y1="63" x2="28" y2="80" ' + s() + '/><line x1="34" y1="44" x2="16" y2="38" ' + s() + '/>',
    'скакалка': '<path d="M26 20 C 6 60 22 96 50 92 C 80 96 94 60 74 20" fill="none" ' + s('#E53935', 4) + '/><rect x="18" y="8" width="16" height="26" rx="7" fill="#FB8C00" ' + s() + '/><rect x="66" y="8" width="16" height="26" rx="7" fill="#FB8C00" ' + s() + '/>',
    'обруч': '<ellipse cx="50" cy="52" rx="38" ry="38" fill="none" stroke="#8E44AD" stroke-width="10"/><ellipse cx="50" cy="52" rx="38" ry="38" fill="none" stroke="#E1BEE7" stroke-width="3" stroke-dasharray="14 10"/>',
    'конус': '<polygon points="50,10 74,78 26,78" fill="#FB8C00" ' + s() + '/><rect x="14" y="78" width="72" height="12" rx="4" fill="#E65100" ' + s() + '/><line x1="40" y1="42" x2="60" y2="42" ' + s('#fff', 5) + '/><line x1="35" y1="60" x2="65" y2="60" ' + s('#fff', 5) + '/>',
    'скамейка': '<rect x="8" y="38" width="84" height="14" rx="4" fill="#D9A56A" ' + s() + '/><rect x="16" y="52" width="8" height="34" fill="#8D6E63" ' + s() + '/><rect x="76" y="52" width="8" height="34" fill="#8D6E63" ' + s() + '/>',
    'свисток': '<path d="M14 40 H66 a20 20 0 1 1 -8 36 H30 a16 16 0 0 1 -16 -16Z" fill="#B0BEC5" ' + s() + '/><circle cx="66" cy="58" r="8" fill="#fff" ' + s() + '/><rect x="64" y="22" width="14" height="14" rx="3" fill="#E53935" ' + s() + '/>',
    'секундомер': '<circle cx="50" cy="56" r="34" fill="#fff" ' + s() + '/><rect x="42" y="10" width="16" height="10" rx="3" fill="#78909C" ' + s() + '/><line x1="50" y1="56" x2="50" y2="34" ' + s('#E53935', 4) + '/><line x1="50" y1="56" x2="66" y2="64" ' + s() + '/>' +
      [0,1,2,3].map(function(i){ var p = pt(50, 56, 28, i * 90 + 180), q = pt(50, 56, 23, i * 90 + 180); return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" ' + s() + '/>'; }).join(''),
    'кроссовки': '<path d="M10 62 C 10 36 30 34 38 40 L58 52 C 76 54 90 60 90 72 L90 78 H10Z" fill="#1E6FD9" ' + s() + '/><rect x="10" y="76" width="80" height="10" rx="4" fill="#fff" ' + s() + '/><line x1="38" y1="42" x2="46" y2="52" ' + s('#fff', 3) + '/><line x1="30" y1="46" x2="38" y2="56" ' + s('#fff', 3) + '/>',
    'бутылка воды': '<rect x="40" y="6" width="20" height="12" rx="3" fill="#1E6FD9" ' + s() + '/><path d="M42 18 H58 L66 34 V88 Q66 94 60 94 H40 Q34 94 34 88 V34Z" fill="#B3E5FC" ' + s() + '/><path d="M34 54 H66 V88 Q66 94 60 94 H40 Q34 94 34 88Z" fill="#4FC3F7" opacity=".85"/>',
    'флажок': '<line x1="30" y1="8" x2="30" y2="94" ' + s('#8D6E63', 5) + '/><polygon points="30,12 82,26 30,44" fill="#E53935" ' + s() + '/>',
    'сердце': '<path d="M50 88 C 8 58 10 22 32 20 C 44 19 50 28 50 32 C 50 28 56 19 68 20 C 90 22 92 58 50 88Z" fill="#E53935" ' + s() + '/>'
  };
  var GEAR = ['мяч', 'скакалка', 'обруч', 'конус', 'скамейка', 'свисток', 'секундомер', 'кроссовки', 'бутылка воды', 'флажок'];
  var GEAR_TXT = {
    'мяч':'Мяч нужен для игр: его бросают, ловят и передают.',
    'скакалка':'Скакалка нужна для прыжков.',
    'обруч':'Обруч нужен для прыжков, игр и вращения.',
    'конус':'Конусом отмечают поворот или границу на дорожке.',
    'скамейка':'По гимнастической скамейке ходят, держа равновесие.',
    'свисток':'Свисток подаёт сигнал: начать или закончить.',
    'секундомер':'Секундомером засекают время бега.',
    'кроссовки':'Кроссовки удобны для бега и прыжков.',
    'бутылка воды':'Воду пьют после нагрузки.',
    'флажок':'Флажком отмечают старт, финиш или команду.'
  };
  var GEAR_Q = [
    ['Что нужно, чтобы прыгать?', 'скакалка'], ['Чем засекают время бега?', 'секундомер'], ['Чем подают сигнал начала игры?', 'свисток'],
    ['Что нужно для игры в футбол?', 'мяч'], ['Что надевают на ноги на урок физкультуры?', 'кроссовки'], ['Что пьют после игры?', 'бутылка воды'],
    ['Чем отмечают поворот на дорожке?', 'конус'], ['По чему ходят, держа равновесие?', 'скамейка']
  ];
  var ACC = { 'мяч':'мяч', 'скакалка':'скакалку', 'обруч':'обруч', 'конус':'конус', 'скамейка':'скамейку', 'свисток':'свисток', 'секундомер':'секундомер', 'кроссовки':'кроссовки', 'бутылка воды':'бутылку воды', 'флажок':'флажок' };
  function obj(k, w){ return svg(100, 100, OBJ[k], w || 86); }

  // прыжок в длину: флажок стоит на расстоянии n метров от линии старта
  var U = 24, X0 = 18;
  function dist(n, k){
    var W = n * U + X0 * 2 + 14;
    var body = '<rect width="' + W + '" height="56" rx="10" fill="#F4FAFF"/><rect x="0" y="40" width="' + W + '" height="16" fill="#E6C98F"/>' +
      '<line x1="' + X0 + '" y1="30" x2="' + X0 + '" y2="48" ' + s('#E53935', 4) + '/>' +
      '<line x1="' + X0 + '" y1="44" x2="' + (X0 + n * U) + '" y2="44" ' + s('#FB8C00', 4) + '/>' +
      '<line x1="' + (X0 + n * U) + '" y1="8" x2="' + (X0 + n * U) + '" y2="46" ' + s('#8D6E63', 3) + '/><polygon points="' + (X0 + n * U) + ',8 ' + (X0 + n * U + 14) + ',14 ' + (X0 + n * U) + ',20" fill="#1E6FD9" ' + s() + '/>';
    return svg(W, 56, body, Math.round(W * (k || .8)));
  }

  function cap(t){ return t.charAt(0).toUpperCase() + t.slice(1); }

  function T(X){
    var G = MXG2, S = X.S, pick = X.pick, shuffle = X.shuffle, rnd = X.rnd;
    function others(list, not, n){ return shuffle(list.filter(function(x){ return x !== not; })).slice(0, n); }
    function ch(sig, o){ o.layout = o.layout || 'wide'; return S(sig, G.choice(o)); }
    function pp(sig, o, ansLabel, vis, text, spoken){
      var t = G.pickPic(o);
      return S(sig, Object.assign(t, { hintExpr:'<span class="ok">' + ansLabel + '</span>', hintSay:[G.say(spoken || text)], hint:G.hintCard(vis, text) }));
    }
    var F = {};
    F.exName = function(){ var k = pick(NAMES);
      return ch('en' + k, { q:'Что делает спортсмен?', opts:[k].concat(others(NAMES, k, 2)), ans:k, layout:'card', expr:fig(k, 120), hintVis:fig(k, 110), hint:POSE_TXT[k], hintPlain:POSE_TXT[k] }); };
    F.exPick = function(){ var k = pick(NAMES), q = 'Найди упражнение: ' + k + '.';
      return pp('ep' + k, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(NAMES, k, 2)).map(function(x){ return { k:x, h:fig(x, 84) }; }) }, k, fig(k, 110), POSE_TXT[k]); };
    F.posture = function(){ var good = Math.random() < .5, q = good ? 'Найди правильную осанку.' : 'Найди неправильную осанку.';
      return pp('ps' + good, { q:q, say:[G.say(q)], ans:good ? 'a' : 'b', items:[{ k:'a', h:posture(true, 90) }, { k:'b', h:posture(false, 90) }] }, good ? 'прямая спина' : 'сутулая спина', posture(good, 110), good ? 'У правильной осанки спина прямая, плечи расправлены, голова поднята.' : 'Когда сутулишься, спина согнута, а голова наклонена вперёд. Так вредно для здоровья.'); };
    F.gearName = function(){ var k = pick(GEAR);
      return ch('gn' + k, { q:'Как называется этот предмет?', opts:[k].concat(others(GEAR, k, 2)), ans:k, layout:'card', expr:obj(k, 110), hintVis:obj(k, 100), hint:GEAR_TXT[k], hintPlain:GEAR_TXT[k] }); };
    F.gearFor = function(){ var t = pick(GEAR_Q), q = t[0];
      return pp('gf' + t[1], { q:q, say:[G.say(q)], ans:t[1], items:[t[1]].concat(others(GEAR, t[1], 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, t[1], obj(t[1], 100), GEAR_TXT[t[1]]); };
    F.gearPick = function(){ var k = pick(GEAR), q = 'Найди ' + ACC[k] + '.';
      return pp('gp' + k, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(GEAR, k, 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, k, obj(k, 100), GEAR_TXT[k]); };
    F.farther = function(){ var a = 2 + rnd(0, 8), b = a; while(Math.abs(b - a) < 2) b = 2 + rnd(0, 8);
      var far = Math.random() < .5, ans = far ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b'), q = far ? 'Нажми на самый длинный прыжок.' : 'Нажми на самый короткий прыжок.';
      return pp('fa' + a + '_' + b + far, { q:q, say:[G.say(q)], ans:ans, items:[{ k:'a', h:dist(a) }, { k:'b', h:dist(b) }] }, (ans === 'a' ? a : b) + ' м', dist(ans === 'a' ? a : b), far ? 'Дальше прыгнул тот, чей флажок стоит дальше от старта. Это ' + Math.max(a, b) + ' метров.' : 'Меньше прыгнул тот, чей флажок ближе к старту. Это ' + Math.min(a, b) + ' метров.'); };
    return F;
  }

  window.FZ = { fig:fig, posture:posture, obj:obj, dist:dist, T:T, POSES:POSES, NAMES:NAMES, OBJ:OBJ, GEAR:GEAR };
})();
