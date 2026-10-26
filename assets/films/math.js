(function(){
  var h = MF.h, INK = '#1D3557', I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  var num = function(n, x, y, d, c){ return h.pop('<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + (c || '#FFD21F') + '" stroke="#C9A200" stroke-width="1"/><text x="' + x + '" y="' + (y + 3.6) + '" text-anchor="middle" font-size="9" font-weight="800" fill="' + INK + '">' + n + '</text>', d); };
  var ap = function(x, y, s, d){ return h.pop(I('PI', 'apple', x, y, s), d); };
  MF.register('math', { lang: 'ru-RU', scenes: [
    { say: 'Давай учиться считать. Считаем яблоки по одному: один, два, три.',
      svg: h.svg([0, 1, 2].map(function(i){ return ap(24 + i * 42, 14, 34, .3 + i * 1.1) + num(i + 1, 41 + i * 42, 62, .6 + i * 1.1); }).join(''), 'wood'), dur: 8 },
    { say: 'Считаем дальше до десяти: четыре, пять, шесть, семь, восемь, девять, десять.',
      svg: h.svg([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(i){ var r = Math.floor(i / 5), c = i % 5; return ap(14 + c * 29, 8 + r * 38, 24, .2 + i * .75) + num(i + 1, 26 + c * 29, 36 + r * 38, .5 + i * .75, i === 9 ? '#FF8A1F' : '#FFD21F'); }).join(''), 'wood'), dur: 11 },
    { say: 'Как посчитать правильно? Показывай на каждый предмет один раз. Не пропускай и не считай один предмет дважды. Последнее число и есть ответ.',
      svg: h.svg([0, 1, 2, 3, 4].map(function(i){ return h.pop(I('PI', 'ball', 12 + i * 29, 14, 26), .2 + i * .6) + num(i + 1, 25 + i * 29, 50, .5 + i * .6); }).join('') + h.pop('<circle cx="80" cy="74" r="0"/>', 0) + h.text(80, 80, 'всего: 5', { d: 4, s: 8 }), 'wood'), dur: 10 },
    { say: 'Если добавить, предметов станет больше. Два яблока и ещё одно яблоко — это три яблока.',
      svg: h.svg(ap(8, 20, 28, .2) + ap(32, 20, 28, .5) + h.text(62, 40, '+', { d: .9, s: 14 }) + ap(72, 20, 28, 1.2) + h.text(106, 40, '=', { d: 1.8, s: 14 }) + ap(112, 8, 22, 2.3) + ap(126, 20, 22, 2.6) + ap(112, 30, 22, 2.9) + h.text(80, 80, '2 + 1 = 3', { d: 3.4, s: 9 }), 'wood'), dur: 9 },
    { say: 'А если убрать, предметов станет меньше. Было четыре яблока. Два яблока убрали. Осталось два.',
      svg: h.svg([0, 1, 2, 3].map(function(i){ return ap(14 + i * 34, 14, 30, .2 + i * .3); }).join('') + h.draw('M88 18 L112 44 M112 18 L88 44', { c: '#E5524F', w: 3, t: .6, d: 2 }) + h.draw('M122 18 L146 44 M146 18 L122 44', { c: '#E5524F', w: 3, t: .6, d: 2.6 }) + h.text(80, 70, '4 − 2 = 2', { d: 3.4, s: 9 }), 'wood'), dur: 10 },
    { say: 'Сравним. Где яблок больше, а где меньше? Там, где их больше, число тоже больше. Молодец, ты умеешь считать!',
      svg: h.svg('<rect x="6" y="10" width="68" height="58" rx="6" fill="#FFF0D6"/><rect x="86" y="10" width="68" height="58" rx="6" fill="#FFF0D6"/>' + [0, 1, 2].map(function(i){ return ap(12 + i * 21, 20, 20, .2 + i * .3); }).join('') + [0, 1, 2, 3, 4].map(function(i){ return ap(90 + (i % 3) * 21, 14 + Math.floor(i / 3) * 24, 20, .2 + i * .3); }).join('') + h.text(40, 62, '3', { d: 1.6, s: 10 }) + h.text(120, 62, '5', { d: 1.8, s: 10 }) + h.text(80, 38, '<', { d: 2.2, s: 16 }) + h.text(80, 82, 'меньше  <  больше', { d: 2.6, s: 6 }), 'paper'), dur: 10 }
  ] });
})();
