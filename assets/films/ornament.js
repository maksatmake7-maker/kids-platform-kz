(function(){
  var h = MF.h, A = MFA, INK = '#1D3557';
  var horn = function(c){ return A.EL.horn(c); };
  var hornPaths = (horn('#FF8A1F').match(/d="([^"]+)"/g) || []).map(function(s){ return s.slice(3, -1); });
  var hornDraw = function(x, y, s, c, d){ return h.at(x, y, s, hornPaths.map(function(p, i){ return h.draw(p, { c: c, w: 2.4, t: 1.4, d: d + i * .4 }); }).join('')); };
  var strip = function(arr, x, y, s, d0){ return arr.map(function(k, i){ return h.pop(h.at(x + i * 40 * s, y, s, A.EL[k](A.EL_COL[k])), d0 + i * .45); }).join(''); };
  var rug = function(inner){ return '<rect x="22" y="12" width="116" height="66" rx="3" fill="#C62F2F" stroke="#7F1B1B" stroke-width="2"/><rect x="30" y="20" width="100" height="50" fill="#F5E6C8" stroke="#7F1B1B" stroke-width="1.5"/>' + inner; };
  MF.register('ornament', { lang: 'ru-RU', scenes: [
    { say: 'Орнамент — это узор, в котором одни и те же элементы повторяются по порядку.',
      svg: h.svg(strip(['circle', 'triangle', 'circle', 'triangle'], 16, 28, .8, .3) + h.text(80, 76, 'круг, треугольник, круг, треугольник...', { d: 2.4, s: 6 }), 'paper'), dur: 8 },
    { say: 'Орнаментом украшают посуду, одежду и ковры. Казахские мастерицы делают ковры из войлока. Такой ковёр называется кошма.',
      svg: h.svg(h.pop(rug(''), .2) + h.fade(strip(['horn', 'horn', 'horn', 'horn'], 36, 28, .62, 0), 1.2) + h.text(80, 86, 'кошма', { d: 2.4, s: 6 }), 'wood'), dur: 8 },
    { say: 'Один из самых любимых узоров называется «қошқар мүйіз». По-русски это бараньи рога.',
      svg: h.svg(hornDraw(44, 6, 1.75, '#FF8A1F', .3) + h.text(80, 86, 'қошқар мүйіз', { d: 2.8, s: 7 }), 'paper'), dur: 8 },
    { say: 'Попробуем нарисовать свой орнамент. Возьмём полоску бумаги и нарисуем круг, потом треугольник, и так по порядку.',
      svg: h.svg('<rect x="8" y="30" width="144" height="30" rx="2" fill="#fff" stroke="#C5D3E2" stroke-width="1.5"/>' + [0, 1, 2, 3, 4].map(function(i){ return i % 2 ? h.poly((14 + i * 27) + ',54 ' + (26 + i * 27) + ',36 ' + (38 + i * 27) + ',54', { c: INK, w: 1.8, t: .8, d: .3 + i * 1.1 }) : h.circ(26 + i * 27, 45, 9, { c: INK, w: 1.8, t: .8, d: .3 + i * 1.1 }); }).join(''), 'wood'), dur: 8 },
    { say: 'Теперь раскрасим. Все круги красным цветом, а все треугольники зелёным. Так узор получается красивым и ровным.',
      svg: h.svg('<rect x="8" y="30" width="144" height="30" rx="2" fill="#fff" stroke="#C5D3E2" stroke-width="1.5"/>' + [0, 1, 2, 3, 4].map(function(i){ return i % 2 ? h.fade('<polygon points="' + (14 + i * 27) + ',54 ' + (26 + i * 27) + ',36 ' + (38 + i * 27) + ',54" fill="#2F9B4A"/>', .4 + i * .5) : h.fade('<circle cx="' + (26 + i * 27) + '" cy="45" r="9" fill="#E53935"/>', .4 + i * .5); }).join(''), 'wood') },
    { say: 'А теперь нарисуем рога по порядку. Один рог, второй, третий. Это узор «қошқар мүйіз».',
      svg: h.svg('<rect x="8" y="26" width="144" height="38" rx="2" fill="#fff" stroke="#C5D3E2" stroke-width="1.5"/>' + [0, 1, 2].map(function(i){ return hornDraw(14 + i * 46, 29, 1.0, ['#FF8A1F', '#E53935', '#2F9B4A'][i], .3 + i * 2); }).join(''), 'wood'), dur: 10 },
    { say: 'Из таких узоров получается красивый ковёр. Придумай и нарисуй свой орнамент. Молодец!',
      svg: h.svg(rug(strip(['horn', 'flower', 'horn', 'flower'], 42, 32, .55, .3)) + h.text(80, 86, 'Твой узор будет самым красивым', { d: 2.8, s: 6 }), 'wood') }
  ] });
})();
