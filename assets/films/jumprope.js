(function(){
  var h = MF.h, INK = '#1D3557', I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  var ropeArc = function(c, d, w){ return h.draw('M46 34 Q40 96 80 96 Q120 96 114 34', { c: c || '#E5524F', w: w || 2.4, t: 1.2, d: d || 0 }) + '<rect x="42" y="28" width="7" height="12" rx="3" fill="#1D3557"/><rect x="111" y="28" width="7" height="12" rx="3" fill="#1D3557"/>'; };
  MF.register('jumprope', { lang: 'ru-RU', scenes: [
    { say: 'Скакалка — это шнур с двумя ручками. Прыгать со скакалкой полезно: ноги становятся сильными, а сердце — выносливым.',
      svg: h.svg(h.pop('<rect x="22" y="20" width="8" height="15" rx="3.5" fill="#1D3557"/><rect x="68" y="20" width="8" height="15" rx="3.5" fill="#1D3557"/>', .2) + h.draw('M26 34 Q26 66 47 66 Q72 66 72 34', { c: '#E5524F', w: 2.6, t: 1.2, d: .3 }) + h.text(49, 78, 'скакалка', { d: 1.2, s: 5.5 }) + h.slide(I('PI', 'heart', 96, 18, 44), 20, 0, 1.6, .8) + h.text(118, 78, 'сердце', { d: 2.6, s: 5.5 }), 'gym'), dur: 9 },
    { say: 'Выбери скакалку по росту. Встань на середину шнура. Ручки должны доставать тебе до подмышек.',
      svg: h.svg(I('FIG', 'stand', 42, 8, 76) + h.draw('M60 70 L50 30 M100 70 L110 30', { c: '#E5524F', w: 2.2, t: 1, d: .3 }) + h.draw('M60 70 H100', { c: '#E5524F', w: 2.4, t: .8, d: 1 }) + h.pop('<rect x="46" y="26" width="7" height="12" rx="3" fill="#1D3557"/><rect x="107" y="26" width="7" height="12" rx="3" fill="#1D3557"/>', 1.6) + h.text(80, 86, 'ручки — до подмышек', { d: 2.2, s: 5.2 }), 'gym'), dur: 9 },
    { say: 'Возьми ручки, прижми локти к бокам и вращай скакалку кистями рук. Плечи не поднимай.',
      svg: h.svg(I('FIG', 'stand', 42, 8, 76) + h.draw('M62 62 Q80 96 98 62', { c: '#E5524F', w: 2.4, t: 1.2, d: .3 }) + h.pop('<path d="M118 36 A14 14 0 1 1 106 24" fill="none" stroke="#2F9BE6" stroke-width="2.4" stroke-linecap="round"/><polygon points="102,20 110,22 106,30" fill="#2F9BE6"/>', 1.4) + h.text(80, 86, 'вращаем кистями', { d: 2, s: 5.5 }), 'gym'), dur: 9 },
    { say: 'Прыгай на носочках и невысоко. Когда скакалка проходит под ногами, делай небольшой прыжок.',
      svg: h.svg(h.loop(I('FIG', 'jump', 45, 6, 70), 'bob', 0.8) + ropeArc('#E5524F', .2) + h.text(134, 46, 'невысоко', { d: 1.4, s: 5.5 }) + h.text(134, 54, 'на носочках', { d: 1.6, s: 5.5 }), 'gym'), dur: 9 },
    { say: 'Считай прыжки: раз, два, три, четыре, пять. Начни с пяти прыжков, а потом с каждым днём прыгай чуть больше.',
      svg: h.svg([1, 2, 3, 4, 5].map(function(n, i){ return h.pop('<circle cx="' + (30 + i * 25) + '" cy="40" r="10" fill="#FFD21F" stroke="#C9A200" stroke-width="1.4"/><text x="' + (30 + i * 25) + '" y="44.5" text-anchor="middle" font-size="12" font-weight="800" fill="#1D3557">' + n + '</text>', .3 + i * .9); }).join('') + h.text(80, 72, 'с каждым днём — чуть больше', { d: 5.2, s: 5.5 }), 'gym'), dur: 10 },
    { say: 'Прыгай на свободном месте и в удобной обуви. Не толкайся, чтобы не задеть друга скакалкой. Молодец!',
      svg: h.svg(h.pop(I('PI', 'sneaker', 14, 16, 48), .2) + h.pop('<circle cx="110" cy="40" r="22" fill="none" stroke="#2FB04A" stroke-width="3" stroke-dasharray="5 4"/>', 1) + h.pop(I('FIG', 'stand', 86, 14, 48), 1.2) + h.text(110, 78, 'свободное место', { d: 2, s: 5 }) + h.text(38, 78, 'удобная обувь', { d: 1.2, s: 5 }), 'gym'), dur: 9 }
  ] });
})();
