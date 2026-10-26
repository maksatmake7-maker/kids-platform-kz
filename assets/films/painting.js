(function(){
  var h = MF.h, A = MFA, INK = '#1D3557';
  var COL = { red: '#E53935', yellow: '#FFD21F', blue: '#1E73E8', orange: '#FF8A1F', green: '#2FB04A', purple: '#8E44C8', lblue: '#5BC0F0' };
  var dot = function(x, y, r, c, d){ return h.pop('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '" stroke="rgba(0,0,0,.18)" stroke-width="1"/>', d); };
  var brush = function(x, y, s, c){ return h.at(x, y, s, '<g transform="rotate(-35)"><rect x="-3" y="-30" width="6" height="30" rx="2" fill="#C99A5B" stroke="#8B6232" stroke-width="1.2"/><rect x="-3.4" y="0" width="6.8" height="7" fill="#C9D3DE" stroke="#7A8795" stroke-width="1.2"/><path d="M-3.4 7 Q0 20 3.4 7 Z" fill="' + c + '" stroke="#333" stroke-width=".8"/></g>'); };
  var jar = function(x, y, s, water){ return h.at(x, y, s, '<path d="M-14 -22 H14 V10 Q14 18 6 18 H-6 Q-14 18 -14 10 Z" fill="#EAF6FF" stroke="#7A8795" stroke-width="1.6"/><path d="M-14 -8 H14 V10 Q14 18 6 18 H-6 Q-14 18 -14 10 Z" fill="' + (water || '#9ED9F6') + '" opacity=".85"/>'); };
  function eq(a, b, c, y, d){
    return h.pop('<circle cx="35" cy="' + y + '" r="11" fill="' + COL[a] + '"/>', d) + h.text(52, y + 5, '+', { d: d + .3, s: 14 }) + h.pop('<circle cx="70" cy="' + y + '" r="11" fill="' + COL[b] + '"/>', d + .5) + h.text(89, y + 5, '=', { d: d + 1, s: 14 }) + h.pop('<circle cx="110" cy="' + y + '" r="13" fill="' + COL[c] + '"/>', d + 1.4);
  }
  var arcs = ['red', 'orange', 'yellow', 'green', 'lblue', 'blue', 'purple'];
  var rainbow = arcs.map(function(k, i){ var r = 58 - i * 6; return h.draw('M' + (80 - r) + ' 78 A' + r + ' ' + r + ' 0 0 1 ' + (80 + r) + ' 78', { c: COL[k], w: 5.2, t: .9, d: .3 + i * .9 }); }).join('');
  var tree = function(d){ return h.draw('M40 70 V50', { c: '#8B5A2B', w: 5, t: .8, d: d }) + h.pop('<circle cx="40" cy="42" r="14" fill="#2FB04A"/><circle cx="30" cy="48" r="9" fill="#3FC05A"/><circle cx="50" cy="48" r="9" fill="#3FC05A"/>', d + .8); };
  MF.register('painting', { lang: 'ru-RU', scenes: [
    { say: 'Сегодня мы будем рисовать красками. Нам понадобятся краски, кисточка, баночка с водой и лист бумаги.',
      svg: h.svg(h.pop('<ellipse cx="46" cy="52" rx="30" ry="22" fill="#F1D9A8" stroke="#B88A55" stroke-width="2"/><ellipse cx="62" cy="62" rx="5" ry="4" fill="#FFF8E7" stroke="#B88A55" stroke-width="1.2"/>', .2) + dot(32, 44, 5, COL.red, .6) + dot(44, 38, 5, COL.yellow, .8) + dot(57, 40, 5, COL.blue, 1) + dot(66, 50, 4.5, COL.green, 1.2) + dot(30, 58, 4.5, COL.purple, 1.4) + h.slide(brush(104, 42, 1.1, '#E53935'), 30, -10, 1.6, .9) + h.pop(jar(130, 56, 1), 2.4) + h.text(80, 84, 'Краски, кисточка, вода и бумага', { d: 3, s: 5.5 }), 'wood') },
    { say: 'Есть три основных цвета: красный, жёлтый и синий. Остальные цвета получаются, когда краски смешивают.',
      svg: h.svg(dot(40, 42, 20, COL.red, .3) + dot(80, 42, 20, COL.yellow, 1) + dot(120, 42, 20, COL.blue, 1.7) + h.text(40, 78, 'красный', { d: .8, s: 6 }) + h.text(80, 78, 'жёлтый', { d: 1.5, s: 6 }) + h.text(120, 78, 'синий', { d: 2.2, s: 6 }), 'paper'), dur: 8 },
    { say: 'Смешаем красный и жёлтый. Получится оранжевый, как апельсин.',
      svg: h.svg(h.slide('<circle cx="52" cy="40" r="15" fill="' + COL.red + '"/>', -26, 0, .2, 1.4) + h.slide('<circle cx="108" cy="40" r="15" fill="' + COL.yellow + '"/>', 26, 0, .2, 1.4) + h.pop('<circle cx="80" cy="40" r="19" fill="' + COL.orange + '"/>', 1.8) + h.text(80, 76, 'красный + жёлтый = оранжевый', { d: 2.4, s: 6 }), 'paper') },
    { say: 'Жёлтый и синий дают зелёный. Красный и синий дают фиолетовый.',
      svg: h.svg(eq('yellow', 'blue', 'green', 30, .2) + eq('red', 'blue', 'purple', 64, 2.6), 'paper'), dur: 8 },
    { say: 'Теперь нарисуем радугу. Берём кисточку и ведём дугу за дугой. Красный, оранжевый, жёлтый, зелёный, голубой, синий и фиолетовый.',
      svg: h.svg(rainbow, 'grass'), dur: 9 },
    { say: 'Нарисуем картину. Сначала небо голубой краской и зелёную траву.',
      svg: h.svg(h.fade('<rect width="160" height="90" fill="#8FD3FF"/>', .2) + h.fade('<ellipse cx="50" cy="94" rx="110" ry="30" fill="#6CC77A"/><ellipse cx="140" cy="96" rx="80" ry="26" fill="#4DB763"/>', 1.4) + h.slide(brush(110, 30, 1.2, '#8FD3FF'), 20, 10, .3, 1), '') },
    { say: 'Потом добавим жёлтое солнышко, дерево и красный цветок.',
      svg: h.svg('<rect width="160" height="90" fill="#8FD3FF"/><ellipse cx="50" cy="94" rx="110" ry="30" fill="#6CC77A"/><ellipse cx="140" cy="96" rx="80" ry="26" fill="#4DB763"/>' + h.pop('<circle cx="128" cy="20" r="10" fill="#FFD21F"/><g stroke="#FFD21F" stroke-width="2.4" stroke-linecap="round"><path d="M128 4 V1 M128 36 V39 M112 20 H109 M144 20 H147 M117 9 L115 7 M139 31 L141 33 M139 9 L141 7 M117 31 L115 33"/></g>', .3) + tree(1.4) + h.draw('M104 76 V62', { c: '#2A7E3F', w: 2.2, t: .6, d: 3.4 }) + h.pop('<g fill="#E53935"><circle cx="104" cy="58" r="4"/><circle cx="100" cy="62" r="4"/><circle cx="108" cy="62" r="4"/><circle cx="104" cy="66" r="4"/></g><circle cx="104" cy="62" r="3" fill="#FFD21F"/>', 4), ''), dur: 8 },
    { say: 'Красный, оранжевый и жёлтый — тёплые цвета. Они как солнце и огонь. Синий, голубой и фиолетовый — холодные цвета. Они как вода и лёд.',
      svg: h.svg('<rect width="80" height="90" fill="#FFF0D6"/><rect x="80" width="80" height="90" fill="#E3F2FF"/>' + dot(24, 34, 9, COL.red, .3) + dot(40, 34, 9, COL.orange, .6) + dot(56, 34, 9, COL.yellow, .9) + dot(104, 34, 9, COL.blue, 2.2) + dot(120, 34, 9, COL.lblue, 2.5) + dot(136, 34, 9, COL.purple, 2.8) + h.text(40, 62, 'тёплые', { d: 1.3, s: 7 }) + h.text(120, 62, 'холодные', { d: 3.3, s: 7 }) + h.pop(MFA ? h.ico('PI', 'sun', 28, 66, 24) : '', 1.6), ''), dur: 9 },
    { say: 'Когда работа закончена, хорошо вымой кисточку в воде и вытри её. Краски пробовать нельзя. Молодец!',
      svg: h.svg(h.pop(jar(60, 50, 1.6, '#9ED9F6'), .2) + h.loop(brush(60, 40, 1.6, '#E53935'), 'swing', 1.2) + h.pop('<g transform="translate(112 40)"><circle r="9" fill="#FFD21F" stroke="rgba(0,0,0,.18)"/><circle r="17" fill="none" stroke="#E53935" stroke-width="3"/><path d="M-12 -12 L12 12" stroke="#E53935" stroke-width="3" stroke-linecap="round"/></g>', 1.4) + h.text(112, 70, 'краски не пробуем', { d: 2.2, s: 5 }), 'paper') }
  ] });
})();
