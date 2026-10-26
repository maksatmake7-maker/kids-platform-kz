(function(){
  var h = MF.h, A = MFA, I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  var INK = '#1D3557';
  var paper = '<rect x="20" y="8" width="120" height="74" rx="3" fill="#fff" stroke="#C5D3E2" stroke-width="1.5"/>';
  function wrap(inner){ return h.svg('<rect width="160" height="90" fill="#F3E2C3"/>' + paper + inner, 'none'); }
  var lines = {
    straight: 'M30 22 H80', wavy: 'M90 22 q6 -9 12 0 t12 0 t12 0 t10 0', zig: 'M30 46 L40 34 L50 46 L60 34 L70 46 L80 34',
    spiral: 'M115 40 m0 0 a1.5 1.5 0 1 1 3 0 a4.5 4.5 0 1 1 -8 -1.5 a8 8 0 1 1 4 12 a11.5 11.5 0 1 1 -13 -16'
  };
  MF.register('drawing', { lang: 'ru-RU', scenes: [
    { say: 'Привет! Сегодня мы будем рисовать. Возьми лист бумаги и карандаш.',
      svg: h.svg(h.pop('<rect x="38" y="10" width="84" height="66" rx="3" fill="#fff" stroke="#C5D3E2" stroke-width="1.5"/>', .2) + h.slide(I('MS', 'pencil', 70, 28, 52), 40, -20, .9, .9) + h.text(80, 84, 'Бумага и карандаш', { d: 1.4, s: 7 }), 'wood') },
    { say: 'Сначала потренируем руку. Нарисуем прямую линию, волнистую линию, ломаную и спираль.',
      svg: wrap(h.draw(lines.straight, { c: INK, w: 1.8, t: 1.1, d: .2 }) + h.text(55, 15, 'прямая', { d: 1.3, s: 5 }) +
        h.draw(lines.wavy, { c: '#2F9BE6', w: 1.8, t: 1.3, d: 1.6 }) + h.text(105, 15, 'волнистая', { d: 2.9, s: 5 }) +
        h.draw(lines.zig, { c: '#E5524F', w: 1.8, t: 1.3, d: 3.2 }) + h.text(55, 58, 'ломаная', { d: 4.5, s: 5 }) +
        h.draw(lines.spiral, { c: '#2FB04A', w: 1.8, t: 1.5, d: 4.8 }) + h.text(118, 62, 'спираль', { d: 6.3, s: 5 }) +
        '') , dur: 9 },
    { say: 'Теперь нарисуем домик. Начнём со стены. Это квадрат.',
      svg: wrap(h.rect(60, 36, 40, 40, { c: INK, w: 2, t: 1.3, d: .3 })) },
    { say: 'Сверху на стену поставим крышу. Это треугольник.',
      svg: wrap(h.rect(60, 36, 40, 40, { c: INK, w: 2, t: .01, d: 0 }) + h.poly('54,36 80,12 106,36', { c: '#E5524F', w: 2, t: 1.3, d: .3 })) },
    { say: 'Добавим дверь и окошко. Дверь — прямоугольник, окошко — маленький квадрат.',
      svg: wrap(h.rect(60, 36, 40, 40, { c: INK, w: 2, t: .01 }) + h.poly('54,36 80,12 106,36', { c: '#E5524F', w: 2, t: .01 }) + h.rect(69, 54, 11, 22, { c: '#8B5A2B', w: 2, t: 1, d: .3 }) + h.rect(85, 46, 11, 11, { c: '#2F9BE6', w: 2, t: 1, d: 1.5 }) + h.draw('M90.5 46 V57 M85 51.5 H96', { c: '#2F9BE6', w: 1.2, t: .8, d: 2.6 })) },
    { say: 'А теперь раскрасим! Стена жёлтая, крыша красная, дверь коричневая. Над домиком светит солнышко.',
      svg: wrap(h.fade('<rect x="60" y="36" width="40" height="40" fill="#FFE08A"/>', .2) + h.fade('<polygon points="54,36 80,12 106,36" fill="#E5524F"/>', 1) + h.fade('<rect x="69" y="54" width="11" height="22" fill="#8B5A2B"/><rect x="85" y="46" width="11" height="11" fill="#BFE6FF"/>', 1.8) +
        h.rect(60, 36, 40, 40, { c: INK, w: 2, t: .01 }) + h.poly('54,36 80,12 106,36', { c: INK, w: 2, t: .01 }) + h.rect(69, 54, 11, 22, { c: INK, w: 1.5, t: .01 }) + h.rect(85, 46, 11, 11, { c: INK, w: 1.5, t: .01 }) +
        h.pop('<circle cx="124" cy="22" r="8" fill="#FFD21F"/><g stroke="#FFD21F" stroke-width="2" stroke-linecap="round"><path d="M124 9 V6 M124 35 V38 M111 22 H108 M137 22 H140 M115 13 L113 11 M133 31 L135 33 M133 13 L135 11 M115 31 L113 33"/></g>', 2.8)) , dur: 8 },
    { say: 'Ещё мы можем нарисовать котика из простых фигур. Голова — круг.',
      svg: wrap(h.circ(80, 46, 22, { c: INK, w: 2, t: 1.4, d: .3 })) },
    { say: 'Сверху добавим два уха-треугольника. Внутри нарисуем глаза и носик, а ещё усы и ротик.',
      svg: wrap(h.circ(80, 46, 22, { c: INK, w: 2, t: .01 }) + h.poly('62,34 64,14 76,26', { c: INK, w: 2, t: 1, d: .2 }) + h.poly('98,34 96,14 84,26', { c: INK, w: 2, t: 1, d: 1 }) + h.pop('<circle cx="72" cy="44" r="3" fill="' + INK + '"/><circle cx="88" cy="44" r="3" fill="' + INK + '"/>', 2.1) + h.pop('<polygon points="77,50 83,50 80,54" fill="#E5524F"/>', 2.6) + h.draw('M80 54 V57 M75 58 Q80 62 85 58', { c: INK, w: 1.4, t: .8, d: 3 }) + h.draw('M58 50 L70 52 M58 56 L70 55 M102 50 L90 52 M102 56 L90 55', { c: INK, w: 1.2, t: 1, d: 3.8 })), dur: 8 },
    { say: 'Раскрась котика! Рисуй каждый день, и у тебя будет получаться всё лучше. Молодец!',
      svg: wrap(h.fade('<circle cx="80" cy="46" r="22" fill="#FFB86B"/><polygon points="62,34 64,14 76,26" fill="#FFB86B"/><polygon points="98,34 96,14 84,26" fill="#FFB86B"/>', .2) + h.circ(80, 46, 22, { c: INK, w: 2, t: .01 }) + h.poly('62,34 64,14 76,26', { c: INK, w: 2, t: .01 }) + h.poly('98,34 96,14 84,26', { c: INK, w: 2, t: .01 }) + '<circle cx="72" cy="44" r="3" fill="' + INK + '"/><circle cx="88" cy="44" r="3" fill="' + INK + '"/><polygon points="77,50 83,50 80,54" fill="#E5524F"/><path d="M80 54 V57 M75 58 Q80 62 85 58 M58 50 L70 52 M58 56 L70 55 M102 50 L90 52 M102 56 L90 55" fill="none" stroke="' + INK + '" stroke-width="1.4" stroke-linecap="round"/>' + h.loop(h.pop(I('PI', 'sun', 120, 6, 26) , 1.5), 'bob')) }
  ] });
})();
