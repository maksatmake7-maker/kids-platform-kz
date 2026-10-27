(function(){
  var h = MF.h, N = MFA.nat(h), K = '#2B2F44';
  var soil = '<rect y="58" width="160" height="32" fill="#9C6B3E"/><rect y="54" width="160" height="7" fill="#6CC77A"/>';
  var sprout = function(x, big, wilt){ var s = big ? 1.5 : 1; return h.at(x, 56, s, '<path d="M0 0 V-24" stroke="#2A9D4B" stroke-width="3" stroke-linecap="round"/><path d="M0 -14 Q-16 -16 -18 -28 Q-4 -28 0 -14 Z" fill="#4BB863" stroke="' + K + '" stroke-width="1.4"/><path d="M0 -18 Q14 -22 18 -34 Q4 -34 0 -18 Z" fill="#4BB863" stroke="' + K + '" stroke-width="1.4"/><path d="M0 0 Q-8 8 -10 18 M0 2 Q8 10 10 20" fill="none" stroke="#F4E3C3" stroke-width="2" stroke-linecap="round"/>'); };
  var no = function(x, y, d){ return h.pop('<g transform="translate(' + x + ' ' + y + ')"><circle r="11" fill="rgba(255,255,255,.85)" stroke="#E5392F" stroke-width="3"/><path d="M-7 -7 L7 7" stroke="#E5392F" stroke-width="3" stroke-linecap="round"/></g>', d); };
  MF.register('plantneeds', { lang: 'ru-RU', scenes: [
    { key: 'plantneeds_s1_text',
      svg: h.svg(soil + sprout(80, true) + N.pop('NT', 'sun', 6, 0, 40, .3) + N.pop('NT', 'drop', 112, 6, 34, .8) + N.pop('NT', 'thermo', 124, 28, 32, 1.3), 'sky'), dur: 9 },
    { key: 'plantneeds_s2_text',
      svg: h.svg(soil + sprout(80, true) + h.slide(N.I('NT', 'wateringcan', 8, 6, 62), 16, 0, .2, .9) + [0, 1, 2, 3].map(function(i){ return h.slide(N.I('NT', 'drop', 72 + (i % 2) * 10, 22, 9), 0, 30, 1 + i * .5, .9); }).join('') + h.fade('<path d="M80 63 Q70 70 68 82 M80 65 Q90 72 92 84" fill="none" stroke="#5BC0F0" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="3 3"/>', 3.2), 'sky'), dur: 9 },
    { key: 'plantneeds_s3_text',
      svg: h.svg(soil + sprout(80, true) + N.pop('NT', 'sun', 100, -4, 54, .2) + h.fade('<path d="M104 34 L92 40 M108 40 L96 46 M102 28 L88 32" stroke="#FFC21F" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="3 3"/>', 1.2), 'sky'), dur: 10 },
    { key: 'plantneeds_s4_text',
      svg: h.svg('<rect width="80" height="90" fill="#D6ECFA"/><rect x="80" width="80" height="90" fill="#FFF0C9"/>' + soil + h.pop(sprout(40, false), .2) + h.pop(sprout(120, true), .6) + N.pop('NT', 'snow', 12, 0, 34, .4) + N.pop('NT', 'sun', 100, -2, 44, .9) + N.pop('NT', 'thermo', 68, 14, 24, 1.3), ''), dur: 10 },
    { key: 'plantneeds_s5_text',
      svg: h.svg(soil + N.pop('NT', 'candy', 10, 12, 44, .2) + no(36, 52, .8) + N.pop('NT', 'teddy', 108, 8, 44, 1.4) + no(134, 52, 2) + sprout(80, false), 'sky'), dur: 9 },
    { key: 'plantneeds_s6_text', svg: h.svg(N.celebrate(N.pop('NT', 'drop', 6, 60, 24, 1.4) + N.pop('NT', 'sun', 68, 66, 26, 1.7) + N.pop('NT', 'thermo', 132, 56, 22, 2)), 'sky'), dur: 8 }
  ] });
})();
