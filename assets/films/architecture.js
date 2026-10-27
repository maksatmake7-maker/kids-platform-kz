(function(){
  var h = MF.h, N = MFA.nat(h), I = function(s, k, x, y, z){ return h.ico(s, k, x, y, z); };
  var K = '#2B2F44';
  var plan = function(x, y, w, hh){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" rx="2" fill="#2F6FD0" stroke="#1D3557" stroke-width="2"/>'; };
  var winds = '<rect x="34" y="48" width="13" height="22" rx="1" fill="#8B5A2B"/><rect x="18" y="42" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="1.6"/><rect x="50" y="42" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="1.6"/>';
  var hbase = '<rect x="14" y="34" width="52" height="36" fill="#F2C27B" stroke="#8B5A2B" stroke-width="2.4"/><polygon points="8,36 40,8 72,36" fill="#D9534F" stroke="#8B2E2B" stroke-width="2.4" stroke-linejoin="round"/>';
  var house = function(x, y, s, extra){ return h.at(x, y, s, '<rect x="14" y="34" width="52" height="36" fill="#F2C27B" stroke="#8B5A2B" stroke-width="2.4"/><polygon points="8,36 40,8 72,36" fill="#D9534F" stroke="#8B2E2B" stroke-width="2.4" stroke-linejoin="round"/><rect x="34" y="48" width="13" height="22" rx="1" fill="#8B5A2B"/><rect x="18" y="42" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="1.6"/><rect x="50" y="42" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="1.6"/>' + (extra || '')); };
  var ground = '<rect y="72" width="160" height="18" fill="#7ED08A"/>';
  MF.register('architecture', { lang: 'ru-RU', scenes: [
    { key: 'arch_s1_text', svg: h.svg(ground + h.pop(I('BLD', 'tower', -4, 26, 50), .2) + h.pop(I('BLD', 'house', 38, 30, 52), .7) + h.pop(I('BLD', 'yurta', 92, 34, 40), 1.2), 'sky'), dur: 10 },
    { key: 'arch_s2_text', svg: h.svg(ground + h.pop(plan(8, 14, 62, 50), .2) + h.draw('M16 52 V34 L39 22 L62 34 V52 Z M32 52 V42 H46 V52', { c: '#fff', w: 1.6, t: 2.4, d: .8 }) + h.pop('<path d="M76 40 H92 M86 34 L94 40 L86 46" fill="none" stroke="#FF8A1F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>', 3.4) + h.pop(house(92, 14, .72), 4), 'sky'), dur: 11 },
    { key: 'arch_s3_text', svg: h.svg(h.pop(I('MS', 'cardboard', 6, 14, 48), .2) + h.pop(I('MS', 'scissors', 46, 14, 40), .8) + h.pop(I('MS', 'pencil', 88, 14, 40), 1.4) + h.pop(I('MS', 'glue', 122, 14, 36), 2), 'paper'), dur: 9 },
    { key: 'arch_s4_text', svg: h.svg('<rect x="14" y="16" width="56" height="50" fill="#FFE9A8" stroke="' + K + '" stroke-width="1.8"/><path d="M42 16 V66" stroke="#E5524F" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M76 42 H92 M86 36 L94 42 L86 48" fill="none" stroke="#FF8A1F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' + h.pop('<g transform="translate(100 18)"><path d="M0 48 L22 6 L44 48 Z" fill="#FFE9A8" stroke="' + K + '" stroke-width="1.8" stroke-linejoin="round"/><path d="M22 6 V48" stroke="#E5524F" stroke-width="1.6"/></g>', 1.6) + N.slide('NT', 'hand', 36, 30, 24, 0, 8, 1.2, .8), 'paper'), dur: 10 },
    { key: 'arch_s5_text', svg: h.svg(h.at(40, 10, 1.3, hbase) + h.pop(h.at(40, 10, 1.3, winds), 1.6) + h.slide(I('MS', 'pencil', 118, 36, 34), -24, 6, .6, .9), 'paper'), dur: 10 },
    { key: 'arch_s6_text', svg: h.svg(ground + N.pop('NT', 'sun', 112, -6, 42, .4) + N.pop('NT', 'tree', 108, 24, 46, .8) + h.pop(house(14, 4, 1.35), .2), 'sky'), dur: 9 }
  ] });
})();
