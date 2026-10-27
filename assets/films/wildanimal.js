(function(){
  var h = MF.h, N = MFA.nat(h), INK = '#1D3557';
  var house = function(x, y, s){ return h.at(x, y, s, '<path d="M0 26 L20 6 L40 26 V46 H0 Z" fill="#C99A5B" stroke="#2B2F44" stroke-width="1.8" stroke-linejoin="round"/><path d="M-3 28 L20 4 L43 28" fill="none" stroke="#B33A3A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="20" cy="38" rx="8" ry="9" fill="#3B2A1A"/>'); };
  var bowl = function(x, y, s){ return h.at(x, y, s, '<path d="M0 6 Q20 22 40 6 Z" fill="#5BA0F0" stroke="#2B2F44" stroke-width="1.8" stroke-linejoin="round"/><ellipse cx="20" cy="6" rx="20" ry="4" fill="#8B5A2B" stroke="#2B2F44" stroke-width="1.8"/>'); };
  var fence = '<path d="M0 66 H160 M0 74 H160" stroke="#B58A52" stroke-width="2.4"/>' + [4, 28, 52, 76, 100, 124, 148].map(function(x){ return '<rect x="' + x + '" y="58" width="5" height="22" rx="1.5" fill="#C99A5B" stroke="#8B6232" stroke-width="1.2"/>'; }).join('');
  MF.register('wildanimal', { lang: 'ru-RU', scenes: [
    { key: 'wildanimal_s1_text',
      svg: h.svg('<rect x="80" y="40" width="80" height="50" fill="#9BD08A"/>' + N.pop('NT', 'fir', -6, 4, 50, .2) + N.pop('NT', 'fir', 24, 10, 42, .5) + N.pop('AN', 'wolf', 4, 44, 66, .9) + N.pop('AN', 'cow', 86, 30, 66, 1.3) + N.pop('AN', 'dog', 104, 62, 50, 1.7), 'grass'), dur: 9 },
    { key: 'wildanimal_s2_text',
      svg: h.svg(N.pop('NT', 'fir', -4, 2, 52, .2) + N.pop('NT', 'fir', 50, 0, 56, .4) + N.pop('NT', 'fir', 106, 4, 52, .6) + N.pop('AN', 'wolf', 0, 44, 52, .9) + N.pop('AN', 'fox', 58, 46, 48, 1.4) + N.pop('AN', 'hare', 110, 54, 42, 1.9), 'grass'), dur: 10 },
    { key: 'wildanimal_s3_text',
      svg: h.svg(fence + N.pop('AN', 'cow', 0, 36, 58, .3) + N.pop('AN', 'sheep', 52, 42, 52, .8) + N.pop('AN', 'horse', 104, 36, 56, 1.3), 'grass'), dur: 9 },
    { key: 'wildanimal_s4_text',
      svg: h.svg('<rect x="80" width="80" height="90" fill="#9BD08A"/><path d="M80 0 V90" stroke="#fff" stroke-width="2.4" stroke-dasharray="5 4"/>' + N.pop('NT', 'fir', 2, 4, 44, .2) + N.pop('AN', 'wolf', 6, 40, 70, .5) + h.pop(house(102, 14, .9), .9) + N.pop('AN', 'dog', 98, 48, 58, 1.3) + h.pop(bowl(84, 74, .5), 1.7), 'grass'), dur: 11 },
    { key: 'wildanimal_s5_text',
      svg: h.svg('<rect x="80" width="80" height="90" fill="#9BD08A"/><path d="M80 0 V90" stroke="#fff" stroke-width="2.4" stroke-dasharray="5 4"/>' +
        h.pop('<circle cx="40" cy="14" r="9" fill="#fff" stroke="#2B2F44" stroke-width="1.6"/>' + N.I('NT', 'fir', 33, 7, 14), .2) + h.pop('<circle cx="120" cy="14" r="9" fill="#fff" stroke="#2B2F44" stroke-width="1.6"/>' + house(114, 6, .24), .2) +
        N.pop('AN', 'wolf', 6, 36, 56, .6) + N.slide('AN', 'hare', 58, 46, 32, 20, 0, .9, 1.4) +
        N.pop('NT', 'hand', 96, 22, 22, 1.0) + h.pop(bowl(110, 38, .6), 1.4) + N.pop('AN', 'dog', 100, 50, 52, 1.8), 'grass'), dur: 11 },
    { key: 'wildanimal_s6_text', svg: h.svg(N.celebrate(), 'sky'), dur: 8 }
  ] });
})();
