(function(){
  var h = MF.h, INK = '#1D3557', I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  // подписи. Казахская версия: natgames-kz.js (тот же рисунок, текст по-казахски)
  window.NATGAMES_SCENES = function(T){
    var crowd = function(x, y, sz, d){ return [0, 1, 2].map(function(i){ return h.pop(I('FIG', 'stand', x + i * sz * .62, y, sz), d + i * .4); }).join(''); };
    var tug = function(d){
      var L = function(m){ var X = function(v){ return m ? 160 - v : v; }; return '<circle cx="' + X(22) + '" cy="38" r="5.5" fill="#FFD9B0" stroke="#1D3557" stroke-width="2.2"/><path fill="none" stroke="#1D3557" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" d="M' + X(25) + ' 44 L' + X(38) + ' 62 M' + X(27) + ' 48 L' + X(46) + ' 55 M' + X(38) + ' 62 L' + X(30) + ' 77 M' + X(38) + ' 62 L' + X(47) + ' 77"/>'; };
      return h.pop('<rect x="30" y="52" width="100" height="5" rx="2.5" fill="#C99A5B" stroke="#8B6232" stroke-width="1.2"/><path d="M80 44 V52" stroke="#E5524F" stroke-width="3"/><polygon points="80,44 90,47 80,50" fill="#E5524F"/>', d) + h.pop(L(0), d + .3) + h.pop(L(1), d + .6) + '<path d="M10 78 H150" stroke="#9BB0C6" stroke-width="2" stroke-linecap="round"/>';
    };
    return [
      { say: T.s1, svg: h.svg(crowd(8, 16, 54, .2) + h.pop(I('PI', 'flag', 104, 12, 50), 1.6) + h.text(80, 82, T.l1, { d: 1.8, s: 5.4 }), 'grass'), dur: 9 },
      { say: T.s2, svg: h.svg(h.pop(I('PI', 'asyk', 14, 14, 58), .2) + h.pop(I('PI', 'asyk', 52, 28, 40), .8) + h.slide(I('FIG', 'throw', 94, 12, 58), 20, 0, 1.2, .8) + h.text(80, 82, T.l2, { d: 2, s: 6.5 }), 'grass'), dur: 9 },
      { say: T.s3, svg: h.svg(h.pop(I('PI', 'blind', 12, 12, 62), .2) + h.slide(I('FIG', 'run', 92, 12, 60), 20, 0, 1, .8) + h.text(80, 82, T.l3, { d: 1.8, s: 6.5 }), 'grass'), dur: 9 },
      { say: T.s4, svg: h.svg(tug(.2) + h.text(80, 18, T.l4, { d: 1.2, s: 6.5 }), 'grass'), dur: 9 },
      { say: T.s5, svg: h.svg(h.pop(I('PI', 'heart', 16, 14, 52), .2) + crowd(58, 20, 44, 1) + h.text(80, 82, T.l5, { d: 2, s: 5.6 }), 'grass'), dur: 9 }
    ];
  };
  MF.register('natgames', { lang: 'ru-RU', scenes: window.NATGAMES_SCENES({
    s1: 'Казахские народные игры — это игры, в которые играли ещё наши бабушки и дедушки. Они учат ловкости, силе и дружбе.',
    s2: 'Асық ату. Играют специальными косточками, они называются асыки. Нужно метко бросить свой асык и выбить чужой.',
    s3: 'Соқыр теке. Одному игроку завязывают глаза, и он старается поймать остальных ребят.',
    s4: 'Арқан тарту. Это перетягивание каната. Две команды тянут канат каждая в свою сторону, и побеждает та, что перетянула.',
    s5: 'В играх нужно соблюдать правила, быть честным и помогать товарищам. Молодец!',
    l1: 'Народные игры', l2: 'Асық ату', l3: 'Соқыр теке', l4: 'Арқан тарту', l5: 'Правила, честность, дружба'
  }) });
})();
