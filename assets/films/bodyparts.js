(function(){
  var h = MF.h, N = MFA.nat(h);
  var skin = '#FFD9B0', K = '#2B2F44';
  var face = function(x, y, s, d){
    return h.pop(h.at(x, y, s, '<ellipse cx="-22" cy="4" rx="7" ry="10" fill="' + skin + '" stroke="' + K + '" stroke-width="2"/><ellipse cx="22" cy="4" rx="7" ry="10" fill="' + skin + '" stroke="' + K + '" stroke-width="2"/><circle cx="0" cy="0" r="26" fill="' + skin + '" stroke="' + K + '" stroke-width="2"/><path d="M-24 -6 Q-22 -26 0 -26 Q22 -26 24 -6 Q10 -18 -2 -14 Q-14 -10 -24 -6 Z" fill="#6B4226"/>' +
      '<circle cx="-9" cy="-3" r="4.4" fill="#fff" stroke="' + K + '" stroke-width="1.4"/><circle cx="9" cy="-3" r="4.4" fill="#fff" stroke="' + K + '" stroke-width="1.4"/><circle cx="-8.4" cy="-2.6" r="2.2" fill="' + K + '"/><circle cx="9.6" cy="-2.6" r="2.2" fill="' + K + '"/><path d="M0 2 Q-3 8 1 9" fill="none" stroke="#D98A5E" stroke-width="1.8" stroke-linecap="round"/><path d="M-9 14 Q0 22 9 14" fill="none" stroke="#C0394F" stroke-width="2.4" stroke-linecap="round"/>'), d);
  };
  var ring = function(x, y, r, d){ return h.loop(h.pop('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="#FF8A1F" stroke-width="2.6" stroke-dasharray="4 3"/>', d), 'beat', 1.6); };
  var pair = function(a, b, d){ return '<rect x="6" y="8" width="70" height="74" rx="10" fill="#FFF3DE"/><rect x="84" y="8" width="70" height="74" rx="10" fill="#E8F3FF"/>' + N.pop('NT', a, 14, 22, 54, d) + N.pop('NT', b, 92, 22, 54, d + 1.2); };
  MF.register('bodyparts', { lang: 'ru-RU', scenes: [
    { key: 'bodyparts_s1_text',
      svg: h.svg(face(80, 46, 1.35, .2) + ring(66, 42, 9, 1.4) + ring(94, 42, 9, 1.6) + ring(80, 50, 6, 1.8) + ring(80, 64, 9, 2), 'paper'), dur: 9 },
    { key: 'bodyparts_s2_text', svg: h.svg(pair('eye', 'ear', .2), ''), dur: 10 },
    { key: 'bodyparts_s3_text', svg: h.svg(pair('nose', 'mouth', .2), ''), dur: 9 },
    { key: 'bodyparts_s4_text', svg: h.svg(pair('hand', 'foot', .2), ''), dur: 10 },
    { key: 'bodyparts_s5_text',
      svg: h.svg('<text x="80" y="46" text-anchor="middle" font-size="58" font-weight="800" fill="#FF8A1F" class="mf-fade">?</text>' + N.pop('NT', 'eye', 4, 6, 44, .6) + N.pop('NT', 'ear', 108, 4, 44, 1.2) + N.pop('NT', 'foot', 4, 52, 36, 1.8) + N.pop('NT', 'hand', 118, 50, 34, 2.4), 'paper'), dur: 10 },
    { key: 'bodyparts_s6_text', svg: h.svg(N.celebrate(), 'sky'), dur: 8 }
  ] });
})();
