(function(){
  var h = MF.h, INK = '#1D3557';
  function kid(x, y, s, wave, col){
    var c = col || INK, arms = wave ? 'M30 19 L18 33 M30 19 L42 5' : 'M30 19 L18 33 M30 19 L42 33';
    return h.at(x, y, s / 60, '<path d="M4 56 H56" stroke="#C5D3E2" stroke-width="2" stroke-linecap="round"/><circle cx="30" cy="8" r="5.5" fill="#FFD9B0" stroke="' + c + '" stroke-width="2.4"/><path fill="none" stroke="' + c + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M30 14 V34 ' + arms + ' M30 34 L24 55 M30 34 L36 55"/>');
  }
  function bubble(x, y, w, t, d, fs, col){
    return h.pop('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="18" rx="8" fill="#fff" stroke="' + (col || '#2F7DE1') + '" stroke-width="2"/><path d="M' + (x + 10) + ' ' + (y + 18) + ' l-4 7 l11 -7 Z" fill="#fff" stroke="' + (col || '#2F7DE1') + '" stroke-width="2" stroke-linejoin="round"/><rect x="' + (x + 7) + '" y="' + (y + 16) + '" width="14" height="4" fill="#fff"/><text x="' + (x + w / 2) + '" y="' + (y + 12.4) + '" text-anchor="middle" font-size="' + (fs || 8.5) + '" font-weight="800" fill="#1D3557">' + t + '</text>', d);
  }
  var tr = function(t, d){ return h.text(80, 87, t, { d: d, s: 5.8, c: '#1D3557' }); };
  MF.register('salem', { lang: 'ru-RU', scenes: [
    { say: 'Сегодня мы научимся здороваться по-казахски. Привет по-казахски — «Сәлем».',
      svg: h.svg(kid(14, 32, 54, true) + kid(88, 32, 54, true, '#E5524F') + bubble(20, 6, 40, 'Сәлем!', .6, 9) + bubble(94, 6, 40, 'Сәлем!', 1.8, 9, '#E5524F') + tr('Привет!', 2.8), 'grass'), dur: 8 },
    { say: 'Сәлем!', lang: 'kk-KZ',
      svg: h.svg(kid(48, 30, 58, true) + h.pop('<rect x="14" y="4" width="132" height="24" rx="12" fill="#fff" stroke="#2F7DE1" stroke-width="2.4"/><text x="80" y="21" text-anchor="middle" font-size="14" font-weight="800" fill="#1D3557">Сәлем!</text>', .3), 'grass'), dur: 4 },
    { say: 'Чтобы спросить имя, скажи: «Сенің атың кім?». Это значит: «Как тебя зовут?»',
      svg: h.svg(kid(14, 32, 54, false) + kid(90, 32, 54, false, '#E5524F') + bubble(8, 6, 78, 'Сенің атың кім?', .6, 7.5) + tr('Как тебя зовут?', 2.2), 'grass'), dur: 9 },
    { say: 'Сенің атың кім?', lang: 'kk-KZ',
      svg: h.svg(kid(48, 30, 58, false) + h.pop('<rect x="6" y="4" width="148" height="24" rx="12" fill="#fff" stroke="#2F7DE1" stroke-width="2.4"/><text x="80" y="21" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1D3557">Сенің атың кім?</text>', .3), 'grass'), dur: 5 },
    { say: 'Отвечай так: «Менің атым» и назови своё имя. Например: «Менің атым Барыс».',
      svg: h.svg(kid(14, 32, 54, false) + kid(90, 32, 54, false, '#E5524F') + bubble(70, 4, 86, 'Менің атым Барыс', .6, 7.2, '#E5524F') + tr('Меня зовут Барыс', 2.2), 'grass'), dur: 9 },
    { say: 'Менің атым Барыс.', lang: 'kk-KZ',
      svg: h.svg(kid(48, 30, 58, true, '#E5524F') + h.pop('<rect x="6" y="4" width="148" height="24" rx="12" fill="#fff" stroke="#E5524F" stroke-width="2.4"/><text x="80" y="21" text-anchor="middle" font-size="12.5" font-weight="800" fill="#1D3557">Менің атым Барыс</text>', .3), 'grass'), dur: 5 },
    { say: 'Ещё полезные слова. «Рахмет» — спасибо. «Сау бол» — до свидания. А утром можно сказать «Қайырлы таң», это значит «доброе утро».',
      svg: h.svg([['Рахмет', 'спасибо'], ['Сау бол', 'до свидания'], ['Қайырлы таң', 'доброе утро']].map(function(p, i){ var y = 8 + i * 25; return h.pop('<rect x="14" y="' + y + '" width="132" height="21" rx="9" fill="#fff" stroke="#2F7DE1" stroke-width="2"/><text x="26" y="' + (y + 14.5) + '" font-size="8.6" font-weight="800" fill="#1D3557">' + p[0] + '</text><text x="136" y="' + (y + 14) + '" text-anchor="end" font-size="6.6" font-weight="700" fill="#51647A">' + p[1] + '</text>', .3 + i * 2.4); }).join(''), 'paper'), dur: 11 },
    { say: 'Попробуй поздороваться с другом по-казахски. Скажи: Сәлем! Молодец!',
      svg: h.svg(kid(14, 32, 54, true) + kid(88, 32, 54, true, '#E5524F') + bubble(20, 6, 40, 'Сәлем!', .6, 9) + bubble(94, 6, 40, 'Сәлем!', 1.4, 9, '#E5524F'), 'grass'), dur: 7 }
  ] });
})();
