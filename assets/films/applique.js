(function(){
  var h = MF.h, I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); }, INK = '#1D3557';
  var card = '<rect x="30" y="10" width="100" height="68" rx="3" fill="#C99A5B" stroke="#8B6232" stroke-width="2"/>';
  var sun = '<circle cx="80" cy="30" r="12" fill="#FFD21F"/>', tri = '<polygon points="52,70 70,44 88,70" fill="#2FB04A"/>', tri2 = '<polygon points="76,70 94,44 112,70" fill="#4BB863"/>', trunk = '<rect x="108" y="62" width="6" height="8" fill="#8B5A2B"/>';
  var labelRow = function(items, y, d0){
    return items.map(function(it, i){ var x = 18 + i * 31; return h.pop(I('MS', it[0], x - 12, y, 28), d0 + i * .5) + h.text(x + 2, y + 36, it[1], { d: d0 + i * .5 + .3, s: 4.6 }); }).join('');
  };
  MF.register('applique', { lang: 'ru-RU', scenes: [
    { say: 'Сегодня мы сделаем аппликацию. Это картинка, которую составляют из кусочков цветной бумаги и приклеивают на основу.',
      svg: h.svg(h.pop(I('MS', 'applique', 44, 8, 72), .2) + h.text(80, 86, 'Аппликация', { d: 1.2, s: 7 }), 'wood') },
    { say: 'Нам понадобятся цветная бумага, картон для основы, ножницы, клей и карандаш.',
      svg: h.svg(labelRow([['paper', 'бумага'], ['cardboard', 'картон'], ['scissors', 'ножницы'], ['glue', 'клей'], ['pencil', 'карандаш']], 22, .2), 'wood'), dur: 9 },
    { say: 'Сначала карандашом рисуем деталь на цветной бумаге. Например, большой круг для солнышка.',
      svg: h.svg('<rect x="34" y="10" width="92" height="66" rx="3" fill="#FFD21F" stroke="#C9A200" stroke-width="2"/>' + h.circ(80, 43, 20, { c: INK, w: 1.6, t: 1.4, d: .3 }) + h.slide(I('MS', 'pencil', 84, 40, 34), -20, 10, 1.7, .8), 'wood') },
    { say: 'Потом аккуратно вырезаем ножницами по линии. Ножницы держим двумя пальцами, острые концы смотрят от нас.',
      svg: h.svg('<rect x="34" y="10" width="92" height="66" rx="3" fill="#FFD21F" stroke="#C9A200" stroke-width="2"/><circle cx="80" cy="43" r="20" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-dasharray="3 2"/>' + h.loop(I('MS', 'scissors', 92, 28, 34), 'bob', 1.1), 'wood') },
    { say: 'Сначала раскладываем детали на картоне и смотрим, как красивее. Клеить пока не будем.',
      svg: h.svg(card + h.slide(sun, 0, -30, .2, .9) + h.slide(tri, -30, 20, .8, .9) + h.slide(tri2, 30, 20, 1.4, .9) + h.fade(trunk, 2.2) + h.text(80, 86, 'раскладываем без клея', { d: 2.6, s: 5.5 }), 'wood'), dur: 9 },
    { say: 'Теперь намажь обратную сторону детали клеем. Клея нужно совсем немного, тонким слоем. Потом приложи деталь и прижми.',
      svg: h.svg(card + sun + tri + h.pop('<g fill="#fff" stroke="#9BB0C6" stroke-width="1"><circle cx="100" cy="30" r="3.5"/><circle cx="108" cy="38" r="2.6"/></g>', .3) + h.slide(I('MS', 'glue', 100, 20, 30), 14, -8, .3, .8) + h.text(80, 86, 'клея мало, слой тонкий', { d: 1.4, s: 5.5 }), 'wood'), dur: 9 },
    { say: 'Вот и готова картина! После работы выбрось обрезки в мусорное ведро и вымой руки с мылом. Молодец!',
      svg: h.svg(card + sun + tri + tri2 + trunk + h.pop(I('MS', 'bin', 118, 40, 30), .8) + h.pop(I('PI', 'soap', 128, 12, 26), 1.6), 'wood'), dur: 8 }
  ] });
})();
