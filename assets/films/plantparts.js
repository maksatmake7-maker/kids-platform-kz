(function(){
  var h = MF.h, N = MFA.nat(h);
  var seeds = '<g fill="#7A4A1E"><ellipse cx="38" cy="76" rx="3.4" ry="2.2"/><ellipse cx="46" cy="80" rx="3.4" ry="2.2"/><ellipse cx="30" cy="80" rx="3.4" ry="2.2"/></g>';
  MF.register('plantparts', { lang: 'ru-RU', scenes: [
    { key: 'plantparts_s1_text', svg: h.svg(MFA.plant('all'), 'sky'), dur: 9 },
    { key: 'plantparts_s2_text', svg: h.svg(MFA.plant('root'), 'sky'), dur: 9 },
    { key: 'plantparts_s3_text', svg: h.svg(MFA.plant('stem') + h.slide('<path d="M80 54 V24" stroke="#7EC8FF" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/>', 0, 14, .8, 1), 'sky'), dur: 10 },
    { key: 'plantparts_s4_text', svg: h.svg(MFA.plant('leaf') + h.pop('<circle cx="140" cy="16" r="9" fill="#FFD21F"/><g stroke="#FFD21F" stroke-width="2" stroke-linecap="round"><path d="M128 22 L112 30 M130 14 L114 18"/></g>', .3), 'sky'), dur: 10 },
    { key: 'plantparts_s5_text', svg: h.svg(MFA.plant('flower', h.fade('<g transform="translate(0 -6)"><g transform="translate(122 46)"><circle r="7" fill="#E5392F" stroke="#8B1E1E" stroke-width="1.3"/></g></g>', 2.2)) + h.pop(seeds, 3.2), 'sky'), dur: 10 },
    { key: 'plantparts_s6_text', svg: h.svg(N.celebrate(), 'sky'), dur: 8 }
  ] });
})();
