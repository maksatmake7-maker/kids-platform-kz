/* ===== Білім Аралы — рисованные картинки для игр по трудовому обучению, 2 класс =====
   Инструменты, материалы и линейка рисуются кодом (SVG), без эмодзи и внешних картинок.
   Подключается перед игрой: <script src="../../../games/trud2-art.js"></script> */
(function(){
  if(window.TR) return;
  var INK = '#25324A';
  function svg(w, h, body, px){
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (px || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;height:auto">' + body + '</svg>';
  }
  function s(c, w){ return 'stroke="' + (c || INK) + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  var OBJ = {
    'ножницы': '<polygon points="27,6 36,6 58,58 49,62" fill="#CFD8DC" ' + s() + '/><polygon points="73,6 64,6 42,58 51,62" fill="#B0BEC5" ' + s() + '/>' +
      '<circle cx="35" cy="78" r="13" fill="none" stroke="#FB8C00" stroke-width="8"/><circle cx="65" cy="78" r="13" fill="none" stroke="#FB8C00" stroke-width="8"/><circle cx="50" cy="59" r="3.5" fill="' + INK + '"/>',
    'линейка': '<rect x="6" y="32" width="88" height="36" rx="5" fill="#FFE082" ' + s() + '/>' +
      [0,1,2,3,4,5,6,7,8].map(function(i){ var x = 14 + i * 9.5; return '<line x1="' + x + '" y1="32" x2="' + x + '" y2="' + (i % 2 ? 46 : 54) + '" ' + s('#6D4C41', 2) + '/>'; }).join(''),
    'карандаш': '<g transform="rotate(-35 50 50)"><rect x="14" y="41" width="58" height="18" fill="#FDD835" ' + s() + '/><rect x="8" y="41" width="8" height="18" rx="2" fill="#F48FB1" ' + s() + '/><rect x="16" y="41" width="6" height="18" fill="#B0BEC5" ' + s() + '/>' +
      '<polygon points="72,41 92,50 72,59" fill="#FFCC80" ' + s() + '/><polygon points="86,47.5 92,50 86,52.5" fill="' + INK + '"/></g>',
    'клей': '<rect x="33" y="36" width="34" height="56" rx="7" fill="#1E6FD9" ' + s() + '/><rect x="33" y="52" width="34" height="18" fill="#fff"/><rect x="36" y="12" width="28" height="26" rx="5" fill="#FB8C00" ' + s() + '/>',
    'игла': '<line x1="18" y1="86" x2="80" y2="12" ' + s('#78909C', 4) + '/><ellipse cx="78" cy="15" rx="3" ry="6" transform="rotate(40 78 15)" fill="#fff" ' + s('#78909C', 3) + '/>' +
      '<path d="M79 12 C 96 20 70 40 88 58 S 60 86 40 90" fill="none" ' + s('#E53935', 3) + '/>',
    'бумага': '<polygon points="16,12 64,12 84,32 84,88 16,88" fill="#fff" ' + s() + '/><polygon points="64,12 64,32 84,32" fill="#E3F2FD" ' + s() + '/>' +
      '<line x1="28" y1="48" x2="72" y2="48" ' + s('#B8C4D2', 3) + '/><line x1="28" y1="60" x2="72" y2="60" ' + s('#B8C4D2', 3) + '/><line x1="28" y1="72" x2="56" y2="72" ' + s('#B8C4D2', 3) + '/>',
    'картон': '<rect x="10" y="22" width="80" height="12" fill="#C9A06B" ' + s() + '/><rect x="10" y="66" width="80" height="12" fill="#C9A06B" ' + s() + '/>' +
      '<path d="M10 50 q5 -18 10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" ' + s('#8D6E63', 4) + '/><line x1="10" y1="34" x2="10" y2="66" ' + s('#8D6E63', 3) + '/><line x1="90" y1="34" x2="90" y2="66" ' + s('#8D6E63', 3) + '/>',
    'ткань': '<path d="M10 14 Q50 4 90 14 L90 82 Q50 94 10 82Z" fill="#fff" ' + s() + '/>' +
      [0,1,2,3].map(function(i){ return [0,1,2].map(function(j){ return ((i + j) % 2) ? '<rect x="' + (14 + i * 18) + '" y="' + (18 + j * 22) + '" width="18" height="22" fill="#1E6FD9" opacity=".75"/>' : ''; }).join(''); }).join('') +
      '<path d="M10 14 Q50 4 90 14 L90 82 Q50 94 10 82Z" fill="none" ' + s() + '/>',
    'пластилин': '<rect x="10" y="48" width="38" height="26" rx="9" fill="#E53935" ' + s() + '/><rect x="52" y="48" width="38" height="26" rx="9" fill="#FDD835" ' + s() + '/><rect x="30" y="22" width="40" height="26" rx="9" fill="#43A047" ' + s() + '/>',
    'глина': '<path d="M14 76 C 8 52 28 24 52 26 C 76 22 94 50 86 76 C 70 86 30 86 14 76Z" fill="#B5714B" ' + s() + '/><path d="M32 52 q8 -8 16 0" fill="none" ' + s('#7B4B2A', 3) + '/><path d="M54 62 q8 -8 16 0" fill="none" ' + s('#7B4B2A', 3) + '/>',
    'дерево': '<ellipse cx="68" cy="50" rx="22" ry="30" fill="#D9A56A" ' + s() + '/><ellipse cx="68" cy="50" rx="14" ry="20" fill="none" ' + s('#8D6E63', 2.5) + '/><ellipse cx="68" cy="50" rx="6" ry="9" fill="none" ' + s('#8D6E63', 2.5) + '/>' +
      '<path d="M68 20 L24 24 Q14 50 24 76 L68 80" fill="#B98150" ' + s() + '/><line x1="30" y1="38" x2="62" y2="36" ' + s('#8D6E63', 2) + '/><line x1="28" y1="60" x2="62" y2="62" ' + s('#8D6E63', 2) + '/>',
    'лист': '<path d="M50 90 C 14 70 12 30 50 8 C 88 30 86 70 50 90Z" fill="#43A047" ' + s() + '/><line x1="50" y1="90" x2="50" y2="22" ' + s('#1B5E20', 3) + '/><path d="M50 40 L34 30 M50 56 L30 46 M50 40 L66 30 M50 56 L70 46" fill="none" ' + s('#1B5E20', 2.5) + '/>',
    'шишка': '<ellipse cx="50" cy="54" rx="26" ry="36" fill="#8D6E63" ' + s() + '/>' +
      [0,1,2,3,4].map(function(r){ return [0,1,2].map(function(c){ var x = 34 + c * 16 + (r % 2 ? 8 : 0) - 4, y = 28 + r * 14; return '<path d="M' + (x - 8) + ' ' + y + ' q8 12 16 0" fill="none" ' + s('#4E342E', 2.5) + '/>'; }).join(''); }).join('') +
      '<line x1="50" y1="18" x2="50" y2="8" ' + s('#5D4037', 4) + '/>',
    'жёлудь': '<path d="M26 44 C 24 76 40 92 50 92 C 60 92 76 76 74 44Z" fill="#C9A06B" ' + s() + '/><path d="M20 46 Q50 26 80 46 Q50 34 20 46Z" fill="#8D6E63" ' + s() + '/><path d="M24 46 Q50 20 76 46Z" fill="#6D4C41" ' + s() + '/><line x1="50" y1="26" x2="50" y2="12" ' + s('#5D4037', 4) + '/>',
    'бутылка': '<rect x="42" y="6" width="16" height="10" rx="2" fill="#E53935" ' + s() + '/><path d="M44 16 L44 28 C 28 36 28 44 28 52 L28 84 Q28 92 36 92 L64 92 Q72 92 72 84 L72 52 C 72 44 72 36 56 28 L56 16Z" fill="#B3E5FC" opacity=".9" ' + s() + '/><path d="M28 56 L72 56" ' + s('#4FC3F7', 3) + '/>',
    'коробка': '<polygon points="50,16 90,34 50,52 10,34" fill="#D7B07A" ' + s() + '/><polygon points="10,34 50,52 50,90 10,72" fill="#B98150" ' + s() + '/><polygon points="90,34 50,52 50,90 90,72" fill="#C9A06B" ' + s() + '/><line x1="30" y1="25" x2="70" y2="43" ' + s('#8D6E63', 3) + '/>',
    'нитки': '<rect x="30" y="14" width="40" height="8" rx="2" fill="#B98150" ' + s() + '/><rect x="30" y="78" width="40" height="8" rx="2" fill="#B98150" ' + s() + '/><rect x="34" y="22" width="32" height="56" fill="#E53935" ' + s() + '/>' +
      [0,1,2,3,4].map(function(i){ return '<line x1="34" y1="' + (30 + i * 11) + '" x2="66" y2="' + (26 + i * 11) + '" ' + s('#B71C1C', 2.5) + '/>'; }).join(''),
    'пуговица': '<circle cx="50" cy="50" r="38" fill="#4FC3F7" ' + s() + '/><circle cx="50" cy="50" r="26" fill="none" ' + s('#1E6FD9', 2.5) + '/><circle cx="41" cy="42" r="4.5" fill="' + INK + '"/><circle cx="59" cy="42" r="4.5" fill="' + INK + '"/><circle cx="41" cy="58" r="4.5" fill="' + INK + '"/><circle cx="59" cy="58" r="4.5" fill="' + INK + '"/>'
  };
  function obj(k, w){ return svg(100, 100, OBJ[k], w || 86); }

  // линейка с полоской: n — длина полоски в сантиметрах
  var U = 22, X0 = 14;
  function ruler(n, w){
    var W = X0 * 2 + 13 * U, body = '<rect x="0" y="0" width="' + W + '" height="100" rx="12" fill="#F4FAFF"/>';
    if(n){ body += '<rect x="' + X0 + '" y="12" width="' + (n * U) + '" height="26" rx="4" fill="#FB8C00" ' + s('#C56A00', 2.5) + '/>'; }
    body += '<rect x="4" y="46" width="' + (W - 8) + '" height="46" rx="6" fill="#FFE082" ' + s() + '/>';
    for(var i = 0; i <= 12; i++){
      var x = X0 + i * U;
      body += '<line x1="' + x + '" y1="46" x2="' + x + '" y2="64" ' + s('#6D4C41', 2.4) + '/>';
      body += '<text x="' + x + '" y="84" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="15" fill="' + INK + '">' + i + '</text>';
      if(i < 12) body += '<line x1="' + (x + U / 2) + '" y1="46" x2="' + (x + U / 2) + '" y2="55" ' + s('#6D4C41', 1.8) + '/>';
    }
    return svg(W, 100, body, w || Math.min(W, 320));
  }
  function strip(n, k){
    var W = n * U + X0 * 2;
    return svg(W, 40, '<rect x="' + X0 + '" y="8" width="' + (n * U) + '" height="24" rx="4" fill="#FB8C00" ' + s('#C56A00', 2.5) + '/>', Math.round(W * (k || .7)));
  }

  var TOOLS = ['ножницы', 'линейка', 'карандаш', 'клей', 'игла'];
  var TOOL_TXT = {
    'ножницы':'Ножницами режут бумагу, картон и ткань.',
    'линейка':'Линейкой измеряют длину и проводят прямые линии.',
    'карандаш':'Карандашом рисуют эскиз и размечают деталь.',
    'клей':'Клеем соединяют детали из бумаги и картона.',
    'игла':'Иглой с ниткой пришивают и сшивают ткань.'
  };
  var TOOL_Q = [
    ['Чем режут бумагу?', 'ножницы'], ['Чем измеряют длину детали?', 'линейка'], ['Чем размечают деталь на бумаге?', 'карандаш'],
    ['Чем соединяют бумажные детали?', 'клей'], ['Чем сшивают ткань?', 'игла']
  ];
  var MATS = ['бумага', 'картон', 'ткань', 'пластилин', 'глина', 'дерево', 'лист', 'шишка', 'жёлудь', 'бутылка', 'коробка', 'нитки', 'пуговица'];
  var MAT_TXT = {
    'бумага':'Бумага тонкая и лёгкая. Она легко рвётся и режется.',
    'картон':'Картон плотнее и прочнее бумаги.',
    'ткань':'Ткань мягкая. Её режут ножницами и сшивают иглой с ниткой.',
    'пластилин':'Пластилин мягкий. Он легко меняет форму.',
    'глина':'Глина — природный материал. Она мягкая, когда влажная, и твёрдая, когда высохнет.',
    'дерево':'Дерево твёрдое и прочное.',
    'лист':'Лист — природный материал. Его собирают и сушат.',
    'шишка':'Шишка — природный материал. Из неё можно сделать поделку.',
    'жёлудь':'Жёлудь — природный материал, плод дуба.',
    'бутылка':'Пластиковая бутылка — искусственный материал. Из неё делают поделки.',
    'коробка':'Картонная коробка — бросовый материал. Из неё можно сделать поделку.',
    'нитки':'Нитками шьют и перевязывают детали.',
    'пуговица':'Пуговица — искусственный материал. Её пришивают нитками.'
  };
  var NAT = ['лист', 'шишка', 'жёлудь', 'глина', 'дерево'], NOT_NAT = ['бутылка', 'пуговица', 'пластилин', 'ткань'];
  var SOFT = ['ткань', 'пластилин'], HARD = ['дерево', 'шишка', 'жёлудь'];
  var ACC = { 'ножницы':'ножницы', 'линейка':'линейку', 'карандаш':'карандаш', 'клей':'клей', 'игла':'иглу', 'бумага':'бумагу', 'картон':'картон', 'ткань':'ткань', 'пластилин':'пластилин', 'глина':'глину', 'дерево':'дерево', 'лист':'лист', 'шишка':'шишку', 'жёлудь':'жёлудь', 'бутылка':'бутылку', 'коробка':'коробку', 'нитки':'нитки', 'пуговица':'пуговицу' };
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
    F.toolName = function(){ var k = pick(TOOLS);
      return ch('tn' + k, { q:'Как называется этот инструмент?', opts:[k].concat(others(TOOLS, k, 2)), ans:k, layout:'card', expr:obj(k, 110), hintVis:obj(k, 100), hint:TOOL_TXT[k], hintPlain:TOOL_TXT[k] }); };
    F.toolFor = function(){ var t = pick(TOOL_Q), q = t[0];
      return pp('tf' + t[1], { q:q, say:[G.say(q)], ans:t[1], items:[t[1]].concat(others(TOOLS, t[1], 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, t[1], obj(t[1], 100), TOOL_TXT[t[1]]); };
    F.toolPick = function(){ var k = pick(TOOLS), q = 'Найди ' + ACC[k] + '.';
      return pp('tp' + k, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(TOOLS, k, 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, k, obj(k, 100), TOOL_TXT[k]); };
    F.matName = function(){ var k = pick(MATS);
      return ch('mn' + k, { q:'Что это за материал?', opts:[k].concat(others(MATS, k, 2)), ans:k, layout:'card', expr:obj(k, 110), hintVis:obj(k, 100), hint:MAT_TXT[k], hintPlain:MAT_TXT[k] }); };
    F.matPick = function(){ var k = pick(MATS), q = 'Найди ' + ACC[k] + '.';
      return pp('mp' + k, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(MATS, k, 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, k, obj(k, 100), MAT_TXT[k]); };
    F.natural = function(){ var k = pick(NAT), q = 'Найди природный материал.';
      return pp('nt' + k, { q:q, say:[G.say(q + ' Он есть в природе.')], ans:k, items:[k].concat(others(NOT_NAT, '', 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, k, obj(k, 100), cap(k) + ' — природный материал. Его не делают на заводе, он есть в природе.', cap(k) + ' — природный материал. Его не делают на заводе, он есть в природе.'); };
    F.soft = function(){ var isSoft = Math.random() < .5, k = pick(isSoft ? SOFT : HARD), q = isSoft ? 'Найди мягкий материал.' : 'Найди твёрдый материал.';
      return pp('sf' + k + isSoft, { q:q, say:[G.say(q)], ans:k, items:[k].concat(others(isSoft ? HARD : SOFT, '', 2)).map(function(x){ return { k:x, h:obj(x, 76) }; }) }, k, obj(k, 100), isSoft ? cap(k) + ' мягкий: его легко мять и менять форму.' : cap(k) + ' твёрдый: его трудно согнуть и смять.'); };
    F.measure = function(){ var n = 2 + rnd(0, 9), ops = [n];
      while(ops.length < 3){ var d = n + pick([-2, -1, 1, 2]); if(d >= 1 && d <= 12 && ops.indexOf(d) < 0) ops.push(d); }
      return ch('ms' + n, { q:'Какой длины оранжевая полоска?', opts:shuffle(ops).map(String), ans:String(n), expr:ruler(n, 300), hintVis:ruler(n, 280), hint:'Полоска начинается с нуля и доходит до ' + n + '. Её длина ' + n + ' сантиметров.', hintPlain:'Полоска начинается с нуля и доходит до ' + n + '. Её длина ' + n + ' сантиметров.' }); };
    F.longer = function(){ var a = 2 + rnd(0, 9), b = a; while(Math.abs(b - a) < 2) b = 2 + rnd(0, 9);
      var lg = Math.random() < .5, ans = lg ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b'), q = lg ? 'Нажми на самую длинную полоску.' : 'Нажми на самую короткую полоску.';
      return pp('lg' + a + '_' + b + lg, { q:q, say:[G.say(q)], ans:ans, items:[{ k:'a', h:strip(a) }, { k:'b', h:strip(b) }] }, (ans === 'a' ? a : b) + ' см', strip(ans === 'a' ? a : b), lg ? 'Длиннее та полоска, которая тянется дальше. Её длина ' + Math.max(a, b) + ' сантиметров.' : 'Короче та полоска, которая тянется меньше. Её длина ' + Math.min(a, b) + ' сантиметров.'); };
    return F;
  }

  window.TR = { obj:obj, ruler:ruler, strip:strip, T:T, OBJ:OBJ, TOOLS:TOOLS, MATS:MATS };
})();
