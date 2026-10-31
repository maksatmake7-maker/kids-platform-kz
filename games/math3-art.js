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
    var s = '<circle cx="82" cy="86" r="66" fill="#FFB74D" fill-opacity=".45" ' + st('#EF6C00', 2.5) + '/><circle cx="158" cy="86" r="66" fill="#4FC3F7" fill-opacity=".45" ' + st('#1E88E5', 2.5) + '/>';
    s += col(A, 52, 74 - (A.length - 1) * 8, 40) + col(B, 188, 74 - (B.length - 1) * 8, 40) + col(both, 120, 74 - (both.length - 1) * 8, 40);
    if(names) s += '<text x="64" y="12" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="13" fill="#B85C00">' + names[0] + '</text><text x="176" y="12" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="13" fill="#1565C0">' + names[1] + '</text>';
    return svg(240, 160, s, px || 250);
  }

  window.M3 = { svg:svg, blocks3:blocks3, fracBar:fracBar, fracPie:fracPie, frac:frac, euler:euler };
})();
