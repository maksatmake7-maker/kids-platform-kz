/* ===== Білім Аралы — рисованные картинки и общие заготовки для игр по математике, 3 класс =====
   Разрядные блоки до 1000, полоски долей, диаграммы Эйлера и др. Всё рисуется кодом (SVG), без эмодзи.
   Подключается после pz2-kit.js: <script src="../../../games/math3-art.js"></script> */
(function(){
  if(window.M3) return;
  var INK = '#25324A';
  function svg(w, h, body, px){
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (px || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;height:auto">' + body + '</svg>';
  }
  function st(c, w){ return 'stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  /* ---------- разрядные блоки: сотни, десятки, единицы ---------- */
  function hundred(x, y){
    var s = '<rect x="' + x + '" y="' + y + '" width="40" height="40" rx="3" fill="#B3E5FC" ' + st('#1E88E5', 2) + '/>';
    for(var i = 1; i < 10; i++){ var d = i * 4; s += '<line x1="' + (x + d) + '" y1="' + y + '" x2="' + (x + d) + '" y2="' + (y + 40) + '" ' + st('#4FC3F7', 1) + '/><line x1="' + x + '" y1="' + (y + d) + '" x2="' + (x + 40) + '" y2="' + (y + d) + '" ' + st('#4FC3F7', 1) + '/>'; }
    return s;
  }
  function ten(x, y){
    var s = '<rect x="' + x + '" y="' + y + '" width="8" height="40" rx="2" fill="#A5D6A7" ' + st('#2E7D32', 1.6) + '/>';
    for(var i = 1; i < 10; i++) s += '<line x1="' + x + '" y1="' + (y + i * 4) + '" x2="' + (x + 8) + '" y2="' + (y + i * 4) + '" ' + st('#66BB6A', 1) + '/>';
    return s;
  }
  function one(x, y){ return '<rect x="' + x + '" y="' + y + '" width="8" height="8" rx="1.5" fill="#FFCC80" ' + st('#EF6C00', 1.4) + '/>'; }
  function blocks3(h, t, o, px){
    var s = '', x = 4, i;
    for(i = 0; i < h; i++){ s += hundred(x, 6); x += 46; }
    if(h && (t || o)) x += 6;
    for(i = 0; i < t; i++){ s += ten(x, 6); x += 12; }
    if(t && o) x += 8;
    for(i = 0; i < o; i++){ s += one(x + (i % 3) * 11, 6 + Math.floor(i / 3) * 11); }
    if(o) x += 33;
    var W = Math.max(40, x + 4);
    return svg(W, 52, s, px || Math.min(W * 1.15, 360));
  }

  /* ---------- дроби: полоска и круг ---------- */
  function fracBar(n, d, px, col){
    var W = 200, w = W / d, s = '';
    for(var i = 0; i < d; i++) s += '<rect x="' + (4 + i * w) + '" y="6" width="' + w + '" height="34" fill="' + (i < n ? (col || '#FFB74D') : '#FFFDF5') + '" ' + st('#8D6E63', 2) + '/>';
    return svg(W + 8, 46, s, px || 220);
  }
  function fracPie(n, d, px, col){
    var r = 42, cx = 50, cy = 50, s = '';
    for(var i = 0; i < d; i++){
      var a0 = -Math.PI / 2 + i * 2 * Math.PI / d, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / d;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      s += '<path d="M' + cx + ' ' + cy + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + (d === 1 ? 1 : 0) + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Z" fill="' + (i < n ? (col || '#FFB74D') : '#FFFDF5') + '" ' + st('#8D6E63', 2) + '/>';
    }
    return svg(100, 100, s, px || 90);
  }
  function frac(n, d){ return '<span style="display:inline-block;text-align:center;vertical-align:middle;font:800 1.3rem \'Baloo 2\',sans-serif;line-height:1"><span style="display:block;padding:0 6px 2px;border-bottom:3px solid ' + INK + '">' + n + '</span><span style="display:block;padding-top:2px">' + d + '</span></span>'; }

  /* ---------- диаграмма Эйлера: два множества ---------- */
  function euler(A, B, both, names, px){
    // A — только первое, B — только второе, both — общее; names=[имя1, имя2]
    function col(list, x, y, w){ return list.map(function(t, i){ return '<text x="' + x + '" y="' + (y + i * 17) + '" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="14" fill="' + INK + '">' + t + '</text>'; }).join(''); }
    var s = '<rect x="0" y="0" width="240" height="160" rx="14" fill="#FFFDF5"/><circle cx="82" cy="86" r="66" fill="#FFB74D" fill-opacity=".45" ' + st('#EF6C00', 2.5) + '/><circle cx="158" cy="86" r="66" fill="#4FC3F7" fill-opacity=".45" ' + st('#1E88E5', 2.5) + '/>';
    s += col(A, 52, 74 - (A.length - 1) * 8, 40) + col(B, 188, 74 - (B.length - 1) * 8, 40) + col(both, 120, 74 - (both.length - 1) * 8, 40);
    if(names) s += '<text x="64" y="12" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="13" fill="#B85C00">' + names[0] + '</text><text x="176" y="12" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="13" fill="#1565C0">' + names[1] + '</text>';
    return svg(240, 160, s, px || 250);
  }


  /* ---------- прямоугольник на клетках, окружность, банкноты ---------- */
  function grid(w, h, o){
    o = o || {}; var u = o.u || 26, X = 26, Y = 22, W = w * u + X + 14, H = h * u + Y + 22, s = '';
    s += '<rect x="' + X + '" y="' + Y + '" width="' + (w * u) + '" height="' + (h * u) + '" fill="' + (o.fill === false ? '#FFFDF5' : '#B3E5FC') + '"/>';
    if(o.cells !== false){ for(var i = 0; i <= w; i++) s += '<line x1="' + (X + i * u) + '" y1="' + Y + '" x2="' + (X + i * u) + '" y2="' + (Y + h * u) + '" ' + st('#4FC3F7', 1.2) + '/>'; for(var j = 0; j <= h; j++) s += '<line x1="' + X + '" y1="' + (Y + j * u) + '" x2="' + (X + w * u) + '" y2="' + (Y + j * u) + '" ' + st('#4FC3F7', 1.2) + '/>'; }
    s += '<rect x="' + X + '" y="' + Y + '" width="' + (w * u) + '" height="' + (h * u) + '" fill="none" ' + st('#1E88E5', 3) + '/>';
    var lt = function(x, y, t){ return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="15" fill="' + INK + '">' + t + '</text>'; };
    if(o.a !== undefined) s += lt(X + w * u / 2, Y - 6, o.a);
    if(o.b !== undefined) s += lt(X - 12, Y + h * u / 2 + 5, o.b);
    return svg(W, H, s, Math.min(W, 340));
  }
  function circle(o){
    o = o || {}; var s = '<circle cx="100" cy="80" r="64" fill="#FFE0B2" ' + st('#EF6C00', 3) + '/><circle cx="100" cy="80" r="4" fill="' + INK + '"/>';
    var t = function(x, y, c, tx){ return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="14" fill="' + c + '">' + tx + '</text>'; };
    if(o.r) s += '<line x1="100" y1="80" x2="164" y2="80" ' + st('#D81B60', 3) + '/>' + t(132, 72, '#D81B60', o.rl || 'радиус');
    if(o.d) s += '<line x1="36" y1="80" x2="164" y2="80" ' + st('#1E88E5', 3) + '/>' + t(100, 102, '#1E88E5', o.dl || 'диаметр');
    s += t(100, 70, INK, 'центр');
    return svg(200, 160, s, 220);
  }
  var NOTE = { 1000:['#D3E4FF', '#6C9BE6'], 2000:['#E8DAFF', '#9C7BE0'], 5000:['#FFD9C2', '#E57F4A'], 10000:['#C8E6C9', '#4CA46C'] };
  function note(v, w){
    var c = NOTE[v] || ['#eee', '#999']; w = w || 110;
    return '<svg viewBox="0 0 110 56" width="' + w + '" height="' + (w * 56 / 110) + '" xmlns="http://www.w3.org/2000/svg" style="display:inline-block"><rect x="2" y="2" width="106" height="52" rx="8" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="3"/><circle cx="22" cy="28" r="12" fill="' + c[1] + '" fill-opacity=".5"/><text x="72" y="35" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="22" fill="#25324A">' + v + '</text></svg>';
  }

  /* ---------- столбчатая диаграмма, прямые, координаты ---------- */
  function txt(x, y, t, o){ o = o || {}; return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="' + (o.s || 13) + '" fill="' + (o.c || INK) + '">' + t + '</text>'; }
  function bars(labels, vals, o){
    o = o || {}; var n = labels.length, mx = o.max || Math.max.apply(null, vals), step = o.step || (mx > 20 ? 10 : mx > 10 ? 5 : 2), top = Math.ceil(mx / step) * step, W = 60 + n * 52, H = 190, X0 = 40, Y0 = 160, hh = 130, s = '', cols = ['#FF8A65', '#4FC3F7', '#81C784', '#FFD54F', '#BA68C8', '#F06292'];
    for(var v = 0; v <= top; v += step){ var y = Y0 - v / top * hh; s += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '" ' + st('#CFD8DC', 1) + '/>' + txt(X0 - 6, y + 4, v, { a:'end', s:11, c:'#607D8B' }); }
    for(var i = 0; i < n; i++){ var h = vals[i] / top * hh, x = X0 + 12 + i * 52; s += '<rect x="' + x + '" y="' + (Y0 - h) + '" width="34" height="' + h + '" rx="4" fill="' + cols[i % cols.length] + '" ' + st('#25324A', 1.5) + '/>' + txt(x + 17, Y0 + 16, labels[i], { s:12 }); }
    return svg(W, H, s, Math.min(W * 1.1, 340));
  }
  function lines(kind, px){
    var s = '';
    if(kind === 'par') s = '<line x1="20" y1="40" x2="180" y2="40" ' + st('#1E88E5', 5) + '/><line x1="20" y1="90" x2="180" y2="90" ' + st('#1E88E5', 5) + '/>';
    else if(kind === 'perp') s = '<line x1="100" y1="12" x2="100" y2="116" ' + st('#D81B60', 5) + '/><line x1="30" y1="76" x2="170" y2="76" ' + st('#D81B60', 5) + '/><path d="M100 76 L112 76 L112 64 L100 64Z" fill="#FFF59D" ' + st('#EF6C00', 2) + '/>';
    else s = '<line x1="30" y1="20" x2="170" y2="110" ' + st('#43A047', 5) + '/><line x1="40" y1="110" x2="160" y2="20" ' + st('#43A047', 5) + '/>';
    return svg(200, 130, s, px || 180);
  }
  function coord(pts, o){
    o = o || {}; var N = o.n || 6, u = 30, X0 = 30, Y0 = 30 + N * u, W = X0 + N * u + 20, H = Y0 + 28, s = '';
    for(var i = 0; i <= N; i++){ s += '<line x1="' + (X0 + i * u) + '" y1="' + (Y0 - N * u) + '" x2="' + (X0 + i * u) + '" y2="' + Y0 + '" ' + st('#CFD8DC', 1) + '/><line x1="' + X0 + '" y1="' + (Y0 - i * u) + '" x2="' + (X0 + N * u) + '" y2="' + (Y0 - i * u) + '" ' + st('#CFD8DC', 1) + '/>' + txt(X0 + i * u, Y0 + 18, i, { s:12 }) + txt(X0 - 10, Y0 - i * u + 4, i, { s:12, a:'end' }); }
    s += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + (X0 + N * u) + '" y2="' + Y0 + '" ' + st(INK, 3) + '/><line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + (Y0 - N * u) + '" ' + st(INK, 3) + '/>';
    (pts || []).forEach(function(p){ s += '<circle cx="' + (X0 + p[0] * u) + '" cy="' + (Y0 - p[1] * u) + '" r="9" fill="#FF7043" ' + st(INK, 2) + '/>' + txt(X0 + p[0] * u, Y0 - p[1] * u + 5, p[2] || '', { s:12, c:'#fff' }); });
    return svg(W, H, s, Math.min(W * 1.1, 300));
  }

  window.M3 = { bars:bars, lines:lines, coord:coord, grid:grid, circle:circle, note:note, svg:svg, blocks3:blocks3, fracBar:fracBar, fracPie:fracPie, frac:frac, euler:euler };
})();
