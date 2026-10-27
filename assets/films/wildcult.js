(function(){
  var h = MF.h, N = MFA.nat(h);
  var bed = function(x, y, w){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="12" rx="3" fill="#7A4A1E" stroke="#2B2F44" stroke-width="1.6"/><path d="M' + (x + 4) + ' ' + (y + 6) + ' H' + (x + w - 4) + '" stroke="#5A3414" stroke-width="1.6" stroke-dasharray="3 3"/>'; };
  var fence = '<path d="M0 70 H160 M0 78 H160" stroke="#B58A52" stroke-width="2.2"/>' + [4, 28, 52, 76, 100, 124, 148].map(function(x){ return '<rect x="' + x + '" y="62" width="5" height="22" rx="1.5" fill="#C99A5B" stroke="#8B6232" stroke-width="1.2"/>'; }).join('');
  MF.register('wildcult', { lang: 'ru-RU', scenes: [
    { key: 'wildcult_s1_text',
      svg: h.svg('<rect x="82" y="46" width="78" height="44" fill="#9BD08A"/><path d="M82 0 V90" stroke="#fff" stroke-width="2.4" stroke-dasharray="5 4"/>' + N.pop('NT', 'chamomile', 2, 28, 34, .2) + N.pop('NT', 'chamomile', 30, 36, 28, .5) + N.pop('NT', 'fir', 50, 6, 36, .8) + h.pop(bed(90, 70, 62), 1) + N.pop('NT', 'sunflower', 92, 38, 26, 1.3) + N.pop('NT', 'sunflower', 118, 38, 26, 1.6) + N.pop('NT', 'appletree', 120, 4, 40, 1.9), 'grass'), dur: 9 },
    { key: 'wildcult_s2_text',
      svg: h.svg(N.pop('NT', 'fir', -6, 4, 40, .2) + N.pop('NT', 'chamomile', 30, 30, 36, .5) + N.pop('NT', 'chamomile', 64, 38, 30, .8) + N.pop('NT', 'chamomile', 92, 28, 38, 1.1) + N.pop('NT', 'chamomile', 124, 40, 30, 1.4) + N.pop('NT', 'fir', 130, 2, 36, 1.8), 'grass'), dur: 10 },
    { key: 'wildcult_s3_text',
      svg: h.svg(fence + h.pop(bed(8, 56, 144), .2) + [0, 1, 2, 3, 4].map(function(i){ return N.pop('NT', 'sunflower', 4 + i * 30, 26, 30, .5 + i * .4); }).join('') + N.slide('NT', 'wateringcan', 100, -8, 34, -8, 0, 2.6, .8), 'grass'), dur: 10 },
    { key: 'wildcult_s4_text',
      svg: h.svg(fence + N.pop('NT', 'appletree', 52, -2, 82, .2) + N.pop('NT', 'wateringcan', 6, 30, 44, 1) + h.slide('<g transform="translate(112 66)"><path d="M0 0 H30 L26 14 H4 Z" fill="#C99A5B" stroke="#2B2F44" stroke-width="1.6"/></g>' + N.I('NT', 'apple', 118, 56, 12), 0, 12, 2, .8), 'grass'), dur: 10 },
    { key: 'wildcult_s5_text',
      svg: h.svg(N.pop('NT', 'chamomile', 50, 16, 66, .2) + N.pop('NT', 'sun', 108, -6, 44, .8) + N.pop('NT', 'chamomile', 6, 44, 30, 1.2) + N.pop('NT', 'chamomile', 128, 46, 28, 1.5), 'grass'), dur: 9 },
    { key: 'wildcult_s6_text', svg: h.svg(N.celebrate(), 'sky'), dur: 8 }
  ] });
})();
