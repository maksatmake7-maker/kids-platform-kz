(function(){
  var h = MF.h, N = MFA.nat(h), INK = '#1D3557';
  var flake = function(x, y, d){ return h.loop(h.at(x, y, .22, MFA.NT.snow), 'bob', 2 + (d % 3) * .4); };
  var flakes = [[10, 4], [44, 12], [80, 2], [120, 10], [146, 0], [28, 26], [100, 24]].map(function(p, i){ return flake(p[0], p[1], i); }).join('');
  var den = function(x, y, s){ return h.at(x, y, s, '<path d="M0 50 Q0 6 40 6 Q80 6 80 50 Z" fill="#8B6B4A" stroke="#2B2F44" stroke-width="2" stroke-linejoin="round"/><path d="M10 50 Q10 18 40 18 Q70 18 70 50 Z" fill="#2E2218"/>'); };
  var zz = function(x, y, d){ return h.loop(h.fade('<text x="' + x + '" y="' + y + '" font-size="9" font-weight="800" fill="#fff">Z</text><text x="' + (x + 8) + '" y="' + (y - 8) + '" font-size="7" font-weight="800" fill="#fff">z</text><text x="' + (x + 14) + '" y="' + (y - 15) + '" font-size="5.5" font-weight="800" fill="#fff">z</text>', d), 'bob', 2.4); };
  var winter = '<rect width="160" height="90" fill="#CFE6F7"/><rect y="62" width="160" height="28" fill="#fff"/><ellipse cx="40" cy="64" rx="60" ry="8" fill="#E9F4FC"/>';
  MF.register('adaptation', { lang: 'ru-RU', scenes: [
    { key: 'adaptation_s1_text',
      svg: h.svg(winter + N.pop('NT', 'firsnow', 0, 2, 48, .2) + N.pop('NT', 'firsnow', 112, 6, 44, .4) + N.pop('AN', 'squirrel', 50, 44, 40, .9) + N.pop('AN', 'bear', 92, 52, 44, 1.3) + N.slide('AN', 'bird', 52, 8, 26, 24, 4, 1.8, 1.6) + flakes, ''), dur: 9 },
    { key: 'adaptation_s2_text',
      svg: h.svg('<rect width="80" height="90" fill="#CFE6F7"/><rect x="80" width="80" height="90" fill="#BFE9FF"/><rect y="62" width="80" height="28" fill="#fff"/><rect x="80" y="62" width="80" height="28" fill="#7ED08A"/>' + N.pop('NT', 'firsnow', 6, 10, 40, .2) + N.pop('NT', 'sun', 108, -2, 44, .4) + N.pop('NT', 'tree', 112, 28, 44, .6) +
        [[20, 14, 1.0], [10, 30, 1.4], [28, 40, 1.8]].map(function(p, i){ return N.slide('AN', 'bird', p[0], p[1], 20, 90, -6, p[2], 2.6); }).join('') + flakes, ''), dur: 10 },
    { key: 'adaptation_s3_text',
      svg: h.svg('<rect y="64" width="160" height="26" fill="#C9A36A"/>' + N.pop('NT', 'tree', 70, 0, 84, .2) + h.pop('<ellipse cx="112" cy="40" rx="8" ry="10" fill="#2E2218"/>', .6) +
        N.pop('AN', 'squirrel', 6, 38, 56, .8) + N.slide('NT', 'nut', 98, 2, 12, 12, 30, 1.4, 1.2) + N.slide('NT', 'nut', 112, 0, 12, 0, 34, 2.4, 1.2) + N.slide('NT', 'nut', 124, 4, 12, -10, 28, 3.4, 1.2), 'sky'), dur: 10 },
    { key: 'adaptation_s4_text',
      svg: h.svg('<rect width="160" height="90" fill="#CFE6F7"/><rect y="66" width="160" height="24" fill="#fff"/>' + N.pop('NT', 'firsnow', 100, 6, 52, .2) + h.pop(den(8, 30, 1.45), .4) + h.pop('<g transform="translate(26 60) scale(.5)">' + MFA.AN.bear + '</g>', 1) + zz(110, 34, 1.4) + flakes, ''), dur: 10 },
    { key: 'adaptation_s5_text',
      svg: h.svg('<rect width="80" height="90" fill="#CFE6F7"/><rect x="80" width="80" height="90" fill="#CFE6F7"/><rect y="66" width="160" height="24" fill="#fff"/><path d="M80 0 V90" stroke="#fff" stroke-width="2.4" stroke-dasharray="5 4"/>' + N.pop('NT', 'tree', -8, 6, 64, .2) + N.pop('AN', 'squirrel', 18, 44, 40, .7) + N.pop('NT', 'nut', 6, 62, 14, 1.2) + N.pop('NT', 'nut', 20, 64, 14, 1.4) + h.pop(den(88, 36, .9), .4) + h.pop('<g transform="translate(98 62) scale(.34)">' + MFA.AN.bear + '</g>', 1) + zz(128, 40, 1.4), ''), dur: 10 },
    { key: 'adaptation_s6_text', svg: h.svg(N.celebrate(), 'sky'), dur: 8 }
  ] });
})();
