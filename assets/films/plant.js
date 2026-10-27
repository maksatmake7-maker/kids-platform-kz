(function(){
  var h = MF.h, INK = '#1D3557';
  // растение: части со своими слоями; hi — какая часть подсвечена ('all' — все)
  function plant(hi, extra){
    var o = function(k){ return hi === 'all' || hi === k ? 1 : .22; };
    var g = function(k, inner, d){ return '<g opacity="' + o(k) + '">' + (hi === k ? h.pop(inner, d || .2) : inner) + '</g>'; };
    return '<rect y="54" width="160" height="36" fill="#9C6B3E"/><rect y="50" width="160" height="6" fill="#6CC77A"/><g transform="translate(0 6)">' +
      g('root', '<path d="M80 56 V74 M80 60 Q66 66 60 80 M80 60 Q94 66 100 80 M80 66 Q72 72 70 84 M80 66 Q88 72 90 84" fill="none" stroke="#F4E3C3" stroke-width="2.6" stroke-linecap="round"/>') +
      g('stem', '<path d="M80 54 V18" stroke="#2A9D4B" stroke-width="4.5" stroke-linecap="round"/>') +
      g('leaf', '<path d="M80 40 Q56 30 50 44 Q66 52 80 40 Z" fill="#4BB863" stroke="#2A7E3F" stroke-width="1.4"/><path d="M80 34 Q104 24 112 38 Q96 48 80 34 Z" fill="#4BB863" stroke="#2A7E3F" stroke-width="1.4"/>') +
      g('flower', '<g transform="translate(80 12)"><g fill="#FF8AA8"><circle cx="0" cy="-7" r="5"/><circle cx="7" cy="-2" r="5"/><circle cx="4" cy="6" r="5"/><circle cx="-4" cy="6" r="5"/><circle cx="-7" cy="-2" r="5"/></g><circle r="4.2" fill="#FFD21F"/></g>') +
      g('fruit', '<g transform="translate(122 46)"><path d="M-42 -4 Q-26 -14 -10 -8" fill="none" stroke="#2A9D4B" stroke-width="2"/><circle cx="0" cy="0" r="7" fill="#E5524F" stroke="#8B1E1E" stroke-width="1.3"/><path d="M0 -7 Q2 -11 6 -10" fill="none" stroke="#2A7E3F" stroke-width="1.6"/></g>', .2) + (extra || '') + '</g>';
  }
  var lab = function(t, d){ return h.fade('<rect x="4" y="4" width="68" height="11" rx="5" fill="#1D3557" opacity=".75"/>', d) + h.text(38, 11.8, t, { d: d, s: 6.5, c: '#fff' }); };
  MFA.plant = plant;
  MF.register('plant', { lang: 'ru-RU', scenes: [
    { say: 'Посмотри на растение. У него пять частей: корень, стебель, листья, цветок и плод.',
      svg: h.svg(plant('all'), 'sky'), dur: 8 },
    { say: 'Корень находится под землёй. Он держит растение и всасывает из почвы воду.',
      svg: h.svg(plant('root') + lab('корень', .6), 'sky'), dur: 8 },
    { say: 'Стебель держит листья и цветок. По нему вода поднимается от корня наверх.',
      svg: h.svg(plant('stem') + h.slide('<path d="M80 52 V22" stroke="#7EC8FF" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/>', 0, 14, .8, 1) + lab('стебель', .6), 'sky'), dur: 8 },
    { say: 'Листья зелёные. Они ловят солнечный свет, и от этого растение растёт.',
      svg: h.svg(plant('leaf') + h.pop('<circle cx="140" cy="16" r="9" fill="#FFD21F"/><g stroke="#FFD21F" stroke-width="2" stroke-linecap="round"><path d="M128 22 L112 30 M130 14 L114 18"/></g>', .3) + lab('листья', .6), 'sky'), dur: 8 },
    { say: 'Цветок красивый и душистый. К нему прилетают бабочки и пчёлы.',
      svg: h.svg(plant('flower') + h.slide('<g transform="translate(110 14)"><ellipse cx="-4" cy="0" rx="5" ry="4" fill="#9B7DFF"/><ellipse cx="4" cy="0" rx="5" ry="4" fill="#9B7DFF"/><path d="M0 -3 V3" stroke="#1D3557" stroke-width="1.6"/></g>', -20, 4, .3, 1.2) + lab('цветок', .6), 'sky'), dur: 8 },
    { say: 'Потом на месте цветка вырастает плод. В плоде прячутся семена. Из семечка вырастет новое растение.',
      svg: h.svg(plant('fruit') + h.pop('<ellipse cx="30" cy="70" rx="4" ry="2.6" fill="#7A4A1E"/><path d="M30 68 Q31 62 33 58" stroke="#2A9D4B" stroke-width="1.6" fill="none"/>', 1.2) + lab('плод и семена', .6), 'sky'), dur: 9 },
    { say: 'Растениям нужны свет, вода и тепло. Если ухаживать за растением, оно будет здоровым. Молодец!',
      svg: h.svg(plant('all') + h.pop('<circle cx="22" cy="16" r="8" fill="#FFD21F"/>', .2) + h.slide('<g fill="#5BC0F0"><path d="M120 18 q-3 5 0 7 q3 -2 0 -7 Z"/><path d="M128 24 q-3 5 0 7 q3 -2 0 -7 Z"/><path d="M114 26 q-3 5 0 7 q3 -2 0 -7 Z"/></g>', 0, 14, .6, 1.2), 'sky'), dur: 8 }
  ] });
})();
