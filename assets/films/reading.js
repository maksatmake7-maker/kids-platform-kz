(function(){
  var h = MF.h, INK = '#1D3557';
  var RED = '#E5524F', BLU = '#2F7DE1', GRN = '#2FB04A';
  var ch = function(l, x, y, col, d, r){ r = r || 11; return h.pop('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '"/><text x="' + x + '" y="' + (y + r * .36) + '" text-anchor="middle" font-size="' + (r * 1.1) + '" font-weight="800" fill="#fff">' + l + '</text>', d); };
  var row = function(arr, col, y, d0, step, r){ var n = arr.length, gap = Math.min(24, 150 / n); var x0 = 80 - (n - 1) * gap / 2; return arr.map(function(l, i){ return ch(l, x0 + i * gap, y, col, d0 + i * step, r); }).join(''); };
  MF.register('reading', { lang: 'ru-RU', scenes: [
    { say: 'Мы говорим словами, а слова состоят из звуков. Звуки мы слышим и произносим. Послушай слово «мама»: м, а, м, а.',
      svg: h.svg(ch('м', 30, 36, BLU, .3, 13) + ch('а', 62, 36, RED, 1.2, 13) + ch('м', 94, 36, BLU, 2.1, 13) + ch('а', 126, 36, RED, 3, 13) + h.text(80, 76, 'мама', { d: 3.8, s: 9 }), 'paper'), dur: 10 },
    { say: 'Гласные звуки можно петь: а, о, у, э, ы, и. Воздух выходит свободно. Мы рисуем их красным цветом.',
      svg: h.svg(row(['а', 'о', 'у', 'э', 'ы', 'и'], RED, 34, .3, .9, 11) + h.text(80, 70, 'гласные — красные', { d: 5.8, s: 7 }), 'paper'), dur: 10 },
    { say: 'Согласные звуки не поются. Воздуху мешает преграда: губы, зубы или язык. Это м, н, б, к, т. Мы рисуем их синим цветом.',
      svg: h.svg(row(['м', 'н', 'б', 'к', 'т'], BLU, 34, .3, .9, 11) + h.text(80, 70, 'согласные — синие', { d: 5, s: 7 }), 'paper'), dur: 11 },
    { say: 'Разберём слово «мак». М — согласный звук, а — гласный, к — согласный. Получилось: синий, красный, синий.',
      svg: h.svg(ch('м', 42, 34, BLU, .3, 13) + ch('а', 80, 34, RED, 1.6, 13) + ch('к', 118, 34, BLU, 2.9, 13) + h.text(80, 76, 'мак', { d: 4, s: 9 }), 'paper'), dur: 10 },
    { say: 'В слове столько слогов, сколько в нём гласных звуков. В слове «мама» две гласные, значит, два слога: ма-ма. Слоги можно хлопать в ладоши.',
      svg: h.svg('<rect x="16" y="22" width="56" height="30" rx="8" fill="#FFF0D6" stroke="#E5524F" stroke-width="2"/><rect x="88" y="22" width="56" height="30" rx="8" fill="#FFF0D6" stroke="#E5524F" stroke-width="2"/>' + h.pop('<text x="44" y="43" text-anchor="middle" font-size="18" font-weight="800" fill="#1D3557">ма</text>', .4) + h.pop('<text x="116" y="43" text-anchor="middle" font-size="18" font-weight="800" fill="#1D3557">ма</text>', 2) + h.loop('<text x="44" y="16" text-anchor="middle" font-size="9">хлоп!</text>', 'bob', .8) + h.fade('<text x="116" y="16" text-anchor="middle" font-size="9">хлоп!</text>', 2.4) + h.text(80, 76, '2 гласные — 2 слога', { d: 3.4, s: 6.5 }), 'paper'), dur: 11 },
    { say: 'Теперь слушай слова и находи в них гласные звуки. Молодец!',
      svg: h.svg(row(['а', 'о', 'у', 'э', 'ы', 'и'], RED, 30, .3, .4, 9) + row(['б', 'в', 'г', 'д', 'ж'], BLU, 58, 2.6, .4, 9), 'paper') }
  ] });
})();
