(function(){
  var h = MF.h, N = MFA.nat(h), I = function(s, k, x, y, z){ return h.ico(s, k, x, y, z); };
  var C = ['#E5524F', '#FFC21F', '#4C90F0', '#2FB04A', '#FF8A1F', '#9B7DFF'];
  var K = '#2B2F44';
  // коврик n x n: вертикальные полосы, горизонтальные поверх «через одну»
  var mat = function(x, y, n, cell, rows){
    var o = '', w = n * cell, i, j; rows = rows == null ? n : rows;
    for (i = 0; i < n; i++) o += '<rect x="' + (x + i * cell + 1) + '" y="' + y + '" width="' + (cell - 2) + '" height="' + w + '" fill="' + C[(i * 2 + 1) % 6] + '" stroke="' + K + '" stroke-width=".8"/>';
    for (j = 0; j < rows; j++){
      o += '<rect x="' + x + '" y="' + (y + j * cell + 1) + '" width="' + w + '" height="' + (cell - 2) + '" fill="' + C[(j * 2) % 6] + '" stroke="' + K + '" stroke-width=".8"/>';
      for (i = 0; i < n; i++) if ((i + j) % 2) o += '<rect x="' + (x + i * cell + 1) + '" y="' + (y + j * cell + 1) + '" width="' + (cell - 2) + '" height="' + (cell - 2) + '" fill="' + C[(i * 2 + 1) % 6] + '" stroke="' + K + '" stroke-width=".8"/>';
    }
    return o;
  };
  var sheet = function(x, y, w, hh, col){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="' + col + '" stroke="' + K + '" stroke-width="1.6"/>'; };
  var strips = function(x, y, vert){ return [0, 1, 2, 3, 4, 5].map(function(i){ return vert ? '<rect x="' + (x + i * 9) + '" y="' + y + '" width="8" height="56" fill="' + C[i] + '" stroke="' + K + '" stroke-width="1"/>' : ''; }).join(''); };
  MF.register('weaving', { lang: 'ru-RU', scenes: [
    { key: 'weaving_s1_text', svg: h.svg(h.pop(mat(46, 14, 6, 11), .2) + h.fade(N.I('NT', 'star', 118, 4, 30), 1.6), 'wood'), dur: 10 },
    { key: 'weaving_s2_text', svg: h.svg(h.pop(sheet(8, 12, 40, 52, '#FF8A9B') + sheet(16, 20, 40, 52, '#6CC6FF') + sheet(24, 28, 40, 52, '#FFE066'), .2) + h.pop(I('MS', 'scissors', 74, 8, 36), .9) + h.pop(I('MS', 'glue', 118, 8, 36), 1.4), 'wood'), dur: 10 },
    { key: 'weaving_s3_text', svg: h.svg(sheet(36, 10, 54, 68, '#6CC6FF') + [1, 2, 3, 4, 5].map(function(i){ return '<path d="M' + (36 + i * 9) + ' 10 V78" stroke="#fff" stroke-width="1.2" stroke-dasharray="3 2"/>'; }).join('') + h.slide(I('MS', 'scissors', 44, 0, 34), 0, 50, .4, 3) + h.pop(I('MS', 'ruler', 102, 14, 44), 1) + h.fade(strips(104, 14, true).replace(/height="56"/g, 'height="0"'), 9), 'wood'), dur: 10 },
    { key: 'weaving_s4_text', svg: h.svg(mat(40, 10, 6, 13, 2) + h.slide('<rect x="40" y="37" width="78" height="11" fill="' + C[4] + '" stroke="' + K + '" stroke-width=".8"/>' + [0, 1, 2, 3, 4, 5].map(function(i){ return i % 2 ? '<rect x="' + (41 + i * 13) + '" y="38" width="11" height="9" fill="' + C[(i * 2 + 1) % 6] + '" stroke="' + K + '" stroke-width=".8"/>' : ''; }).join(''), -80, 0, 1.2, 2.4), 'wood'), dur: 11 },
    { key: 'weaving_s5_text', svg: h.svg(mat(47, 10, 6, 11) + [0, 1, 2, 3, 4, 5].map(function(i){ return h.pop('<circle cx="' + (52 + i * 11) + '" cy="9" r="2.4" fill="#fff" stroke="#9BB0C6"/><circle cx="' + (52 + i * 11) + '" cy="77" r="2.4" fill="#fff" stroke="#9BB0C6"/>', 1.4 + i * .25); }).join('') + h.slide(h.at(122, 14, .9, '<g transform="rotate(30 15 18)">' + MFA.MS.glue + '</g>'), 10, -10, .3, .9), 'wood'), dur: 10 },
    { key: 'weaving_s6_text', svg: h.svg(h.pop(mat(52, 31, 5, 11), .2) + h.pop('<g transform="translate(68 6)"><path d="M0 0 H28 L25 22 H3 Z" fill="#fff" stroke="#2B2F44" stroke-width="1.8"/><path d="M28 5 Q38 5 36 14 Q33 19 27 17" fill="none" stroke="#2B2F44" stroke-width="1.8"/><path d="M6 6 H22" stroke="#E5524F" stroke-width="2.4"/></g>', .9) + N.pop('NT', 'star', 118, 6, 30, 1.6) + N.pop('NT', 'star', 10, 8, 24, 2), 'wood'), dur: 9 }
  ] });
})();
