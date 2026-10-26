(function(){
  var h = MF.h, INK = '#1D3557', I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  // человечек в рамке 60x60: голова, тело, руки, ноги
  function sf(x, y, s, p, col){
    var c = col || INK;
    return h.at(x, y, s / 60, '<path d="M4 56 H56" stroke="#C5D3E2" stroke-width="2" stroke-linecap="round"/><circle cx="' + p.head[0] + '" cy="' + p.head[1] + '" r="5.5" fill="#FFD9B0" stroke="' + c + '" stroke-width="2.4"/><path fill="none" stroke="' + c + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="' + p.body + ' ' + p.arms + ' ' + p.legs + '"/>');
  }
  var P = {
    stand: { head: [30, 8], body: 'M30 14 V34', arms: 'M30 19 L20 34 M30 19 L40 34', legs: 'M30 34 L24 55 M30 34 L36 55' },
    up: { head: [30, 8], body: 'M30 14 V34', arms: 'M30 19 L20 3 M30 19 L40 3', legs: 'M30 34 L24 55 M30 34 L36 55' },
    side: { head: [30, 8], body: 'M30 14 V34', arms: 'M30 20 L8 20 M30 20 L52 20', legs: 'M30 34 L22 55 M30 34 L38 55' },
    twR: { head: [32, 8], body: 'M30 14 V34', arms: 'M30 20 L12 13 M30 20 L48 27', legs: 'M30 34 L22 55 M30 34 L38 55' },
    twL: { head: [28, 8], body: 'M30 14 V34', arms: 'M30 20 L12 27 M30 20 L48 13', legs: 'M30 34 L22 55 M30 34 L38 55' },
    bend: { head: [47, 20], body: 'M22 34 L42 24', arms: 'M40 25 L44 46', legs: 'M22 34 L17 55 M22 34 L28 55' },
    squat: { head: [28, 20], body: 'M28 26 V42', arms: 'M28 31 L46 30', legs: 'M28 42 L42 44 L40 55 M28 42 L16 47 L18 55' }
  };
  var two = function(a, b, la, lb, d){
    return sf(10, 10, 56, P[a]) + h.pop(sf(94, 10, 56, P[b]), d + .3) + h.text(80, 40, '→', { d: d, s: 14 }) + h.text(38, 82, la, { d: d, s: 5.5 }) + h.text(122, 82, lb, { d: d + .3, s: 5.5 });
  };
  MF.register('exercise', { lang: 'ru-RU', scenes: [
    { say: 'Каждое утро полезно делать зарядку. Она будит тело и делает нас сильными и бодрыми. Заниматься нужно там, где есть свободное место.',
      svg: h.svg(h.pop(I('PI', 'sun', 8, 8, 40), .2) + h.slide(sf(52, 12, 62, P.up), 0, 20, .6, .9) + h.pop(I('PI', 'heart', 112, 14, 36), 1.8), 'gym'), dur: 9 },
    { say: 'Первое упражнение — потягивание. Встань прямо, подними руки вверх, потянись, и опусти руки.',
      svg: h.svg(two('stand', 'up', 'встань', 'потянись', .3), 'gym'), dur: 8 },
    { say: 'Второе упражнение — повороты. Руки в стороны. Повернись вправо, потом влево.',
      svg: h.svg(two('twR', 'twL', 'вправо', 'влево', .3), 'gym'), dur: 8 },
    { say: 'Третье упражнение — наклоны. Ноги на ширине плеч. Наклонись вперёд и выпрямись. Колени лучше не сгибать.',
      svg: h.svg(two('stand', 'bend', 'выпрямись', 'наклонись', .3), 'gym'), dur: 9 },
    { say: 'Четвёртое упражнение — приседания. Присядь и встань. Спину держи прямо.',
      svg: h.svg(two('stand', 'squat', 'встань', 'присядь', .3), 'gym'), dur: 8 },
    { say: 'Пятое упражнение — прыжки на месте. Прыгай и считай до десяти.',
      svg: h.svg(h.loop(I('FIG', 'jump', 40, 12, 64), 'bob', 0.7) + ['1', '2', '3', '4', '5'].map(function(n, i){ return h.pop('<circle cx="' + (92 + i * 13) + '" cy="40" r="5.4" fill="#FFD21F" stroke="#C9A200"/><text x="' + (92 + i * 13) + '" y="42.4" text-anchor="middle" font-size="6.5" font-weight="800" fill="#1D3557">' + n + '</text>', .5 + i * .7); }).join('') + h.text(120, 62, '...10', { d: 4.2, s: 7 }), 'gym'), dur: 9 },
    { say: 'В конце успокой дыхание. Глубокий вдох носом и медленный выдох ртом. Зарядка закончена. Молодец!',
      svg: h.svg(h.loop(I('PI', 'lungs', 52, 12, 56), 'beat', 2.4) + h.text(80, 80, 'вдох носом — выдох ртом', { d: .6, s: 6 }), 'gym'), dur: 8 }
  ] });
})();
