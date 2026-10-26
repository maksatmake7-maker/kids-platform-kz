(function(){
  var h = MF.h, I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); }, INK = '#1D3557';
  var grid = function(items, cols, x0, y0, dx, dy, s, d0, lab){
    return items.map(function(it, i){ var c = i % cols, r = Math.floor(i / cols), x = x0 + c * dx, y = y0 + r * dy;
      return h.pop(I('MS', it[0], x, y, s), d0 + i * .45) + (lab ? h.text(x + s / 2, y + s + 5, it[1], { d: d0 + i * .45 + .3, s: 4.4 }) : ''); }).join('');
  };
  var P = '#E5524F';
  MF.register('crafts', { lang: 'ru-RU', scenes: [
    { say: 'Из чего можно сделать поделку? Из бумаги и картона, из пластилина, из ткани и ниток, а ещё из листьев, шишек, камешков и веточек.',
      svg: h.svg(grid([['paper', 'бумага'], ['plast', 'пластилин'], ['fabric', 'ткань'], ['thread', 'нитки'], ['leaf', 'листья'], ['cone', 'шишки'], ['pebble', 'камешки'], ['twig', 'веточки']], 4, 10, 6, 37, 40, 28, .2, true), 'wood'), dur: 10 },
    { say: 'Материалы бывают разные. Природные берут из природы. Художественные нужны для творчества. А ткань и нитки сделали люди.',
      svg: h.svg('<rect x="3" y="6" width="50" height="78" rx="4" fill="#E6F6DF"/><rect x="55" y="6" width="50" height="78" rx="4" fill="#FFF0D6"/><rect x="107" y="6" width="50" height="78" rx="4" fill="#E8EEFF"/>' +
        h.text(28, 16, 'природные', { d: .2, s: 5 }) + h.pop(I('MS', 'leaf', 13, 24, 30), .6) + h.pop(I('MS', 'cone', 13, 52, 30), 1.1) +
        h.text(80, 16, 'для творчества', { d: 2, s: 4.4 }) + h.pop(I('MS', 'paper', 65, 24, 30), 2.4) + h.pop(I('MS', 'plast', 65, 52, 30), 2.9) +
        h.text(132, 16, 'сделали люди', { d: 3.8, s: 4.4 }) + h.pop(I('MS', 'fabric', 117, 24, 30), 4.2) + h.pop(I('MS', 'thread', 117, 52, 30), 4.7), 'none'), dur: 11 },
    { say: 'У каждого материала свои свойства. Пластилин мягкий. Камешек твёрдый. Бумага гладкая, а шишка шершавая.',
      svg: h.svg(grid([['plast', 'мягкий'], ['pebble', 'твёрдый'], ['paper', 'гладкая'], ['cone', 'шершавая']], 4, 10, 22, 37, 40, 30, .2, true), 'wood'), dur: 9 },
    { say: 'Давай слепим из пластилина. Сначала скатаем шарик. Потом сделаем колбаску. А если шарик прижать ладошкой, получится лепёшка.',
      svg: h.svg(h.pop('<circle cx="34" cy="38" r="14" fill="' + P + '"/><ellipse cx="29" cy="32" rx="4" ry="3" fill="#fff" opacity=".35"/>', .3) + h.text(34, 68, 'шарик', { d: 1, s: 5.5 }) +
        h.pop('<rect x="62" y="30" width="40" height="14" rx="7" fill="#2F9BE6"/>', 1.8) + h.text(82, 68, 'колбаска', { d: 2.5, s: 5.5 }) +
        h.pop('<ellipse cx="130" cy="42" rx="18" ry="6" fill="#FFD21F"/>', 3.3) + h.text(130, 68, 'лепёшка', { d: 4, s: 5.5 }), 'wood'), dur: 11 },
    { say: 'Из шариков и колбасок можно слепить гусеницу. Шарики будут телом, а два маленьких шарика станут глазками.',
      svg: h.svg([0, 1, 2, 3, 4].map(function(i){ return h.pop('<circle cx="' + (24 + i * 19) + '" cy="52" r="10" fill="#4BB863" stroke="#2F8F48" stroke-width="1.4"/>', .2 + i * .5); }).join('') +
        h.pop('<circle cx="122" cy="46" r="13" fill="#6FD07F" stroke="#2F8F48" stroke-width="1.4"/><circle cx="118" cy="43" r="3" fill="#fff"/><circle cx="127" cy="43" r="3" fill="#fff"/><circle cx="119" cy="44" r="1.4" fill="#222"/><circle cx="128" cy="44" r="1.4" fill="#222"/><path d="M117 51 Q122 55 127 51" fill="none" stroke="#222" stroke-width="1.3" stroke-linecap="round"/>', 3), 'wood'), dur: 9 },
    { say: 'Казахские мастера делают из войлока кошму и шапочку тақия. А юрта — это круглый дом казахов.',
      svg: h.svg(h.pop(I('MS', 'yurta', 8, 14, 46), .2) + h.text(31, 68, 'юрта', { d: .8, s: 5.5 }) + h.pop(I('MS', 'felt', 57, 14, 46), 1.4) + h.text(80, 68, 'кошма', { d: 2, s: 5.5 }) + h.pop(I('MS', 'cap', 106, 14, 46), 2.8) + h.text(129, 68, 'тақия', { d: 3.4, s: 5.5 }), 'wood'), dur: 9 },
    { say: 'Береги рабочее место. Надень фартук, убери мусор и после работы вымой руки с мылом. Молодец!',
      svg: h.svg(h.pop(I('MS', 'apron', 14, 18, 40), .2) + h.pop(I('MS', 'bin', 60, 18, 40), 1) + h.pop(I('PI', 'soap', 106, 18, 40), 1.8) + h.text(34, 70, 'фартук', { d: .8, s: 5.5 }) + h.text(80, 70, 'мусор в ведро', { d: 1.6, s: 5.5 }) + h.text(126, 70, 'мыло', { d: 2.4, s: 5.5 }), 'wood'), dur: 8 }
  ] });
})();
