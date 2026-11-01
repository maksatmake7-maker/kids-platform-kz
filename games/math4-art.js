/* Математика, 4 класс — рисунки (куб, параллелепипед, составные фигуры, треугольники, симметрия, схемы движения). Всё рисуется кодом. */
(function(){
if(window.M4A) return;
var INK = '#25324A';
function svg(w, h, body, px){ return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (px || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;margin:0 auto" role="img">' + body + '</svg>'; }
function st(c, w, d){ return 'stroke="' + (c || INK) + '" stroke-width="' + (w || 2.5) + '" stroke-linejoin="round" stroke-linecap="round"' + (d ? ' stroke-dasharray="' + d + '"' : ''); }
function txt(x, y, t, o){ o = o || {}; return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="' + (o.s || 15) + '" fill="' + (o.c || INK) + '">' + t + '</text>'; }

/* коробка: a — длина (по горизонтали), b — ширина (вглубь), c — высота. o: la, lb, lc — подписи рёбер; verts — буквы вершин; col — цвет */
function box(a, b, c, o){
  o = o || {}; var sc = Math.min(130 / Math.max(a, 1), 90 / Math.max(c, 1), 70 / Math.max(b, 1)); sc = Math.max(sc, 8);
  var W = a * sc, H = c * sc, D = b * sc * .6, dx = D * .85, dy = D * .6, x0 = o.lc ? 56 : 28, y0 = 14, col = o.col || '#FFB74D';
  var Wt = x0 + W + dx + (o.lb ? 64 : 40), Ht = y0 + dy + H + 34, s = '';
  s += '<polygon points="' + x0 + ',' + (y0 + dy) + ' ' + (x0 + W) + ',' + (y0 + dy) + ' ' + (x0 + W + dx) + ',' + y0 + ' ' + (x0 + dx) + ',' + y0 + '" fill="#FFE0B2" ' + st() + '/>';
  s += '<rect x="' + x0 + '" y="' + (y0 + dy) + '" width="' + W + '" height="' + H + '" fill="' + col + '" ' + st() + '/>';
  s += '<polygon points="' + (x0 + W) + ',' + (y0 + dy) + ' ' + (x0 + W + dx) + ',' + y0 + ' ' + (x0 + W + dx) + ',' + (y0 + H) + ' ' + (x0 + W) + ',' + (y0 + dy + H) + '" fill="#F4A03C" ' + st() + '/>';
  s += '<polyline points="' + (x0 + dx) + ',' + y0 + ' ' + (x0 + dx) + ',' + (y0 + H) + ' ' + x0 + ',' + (y0 + dy + H) + '" fill="none" ' + st('#7A5A10', 1.8, '5 4') + '/><line x1="' + (x0 + dx) + '" y1="' + (y0 + H) + '" x2="' + (x0 + W + dx) + '" y2="' + (y0 + H) + '" ' + st('#7A5A10', 1.8, '5 4') + '/>';
  if(o.la) s += txt(x0 + W / 2, y0 + dy + H + 22, o.la, { c:'#D81B60', s:16 });
  if(o.lc) s += txt(x0 - 8, y0 + dy + H / 2 + 5, o.lc, { a:'end', c:'#1E88E5', s:16 });
  if(o.lb) s += txt(x0 + W + dx + 8, y0 + dy / 2 + 6, o.lb, { a:'start', c:'#43A047', s:16 });
  if(o.verts){
    var V = [['A', x0, y0 + dy + H, -12, 14], ['B', x0 + W, y0 + dy + H, 8, 14], ['C', x0 + W + dx, y0 + H, 10, 12], ['D', x0 + dx, y0 + H, 4, 16], ['A<tspan font-size="10" dy="3">1</tspan>', x0, y0 + dy, -14, -2], ['B<tspan font-size="10" dy="3">1</tspan>', x0 + W, y0 + dy, -2, 16], ['C<tspan font-size="10" dy="3">1</tspan>', x0 + W + dx, y0, 6, -2], ['D<tspan font-size="10" dy="3">1</tspan>', x0 + dx, y0, -6, -4]];
    V.forEach(function(v){ s += '<circle cx="' + v[1] + '" cy="' + v[2] + '" r="3.5" fill="' + INK + '"/>' + txt(v[1] + v[3], v[2] + v[4], v[0], { s:15 }); });
  }
  return svg(Wt, Ht, s, Math.min(Wt * 1.15, 330));
}
/* Г-образная фигура: большой прямоугольник W×H без выреза cw×chh в правом верхнем углу; клетки и подписи сторон */
function lshape(W, H, cw, chh, o){
  o = o || {}; var u = Math.min(190 / W, 130 / H), x0 = 40, y0 = 12, s = '';
  var pts = [[0, 0], [W - cw, 0], [W - cw, chh], [W, chh], [W, H], [0, H]].map(function(p){ return (x0 + p[0] * u) + ',' + (y0 + p[1] * u); }).join(' ');
  s += '<polygon points="' + pts + '" fill="#FFE082"/>';
  for(var i = 0; i < W; i++) for(var j = 0; j < H; j++){ if(i >= W - cw && j < chh) continue; s += '<rect x="' + (x0 + i * u) + '" y="' + (y0 + j * u) + '" width="' + u + '" height="' + u + '" fill="none" ' + st('#EF6C00', .7) + ' opacity=".45"/>'; }
  s += '<polygon points="' + pts + '" fill="none" ' + st('#EF6C00', 3) + '/>';
  s += txt(x0 + W * u / 2, y0 + H * u + 20, W + ' см', { c:'#D81B60' }) + txt(x0 - 6, y0 + H * u / 2 + 5, H + ' см', { a:'end', c:'#1E88E5' });
  return svg(x0 + W * u + 30, y0 + H * u + 30, s, Math.min(x0 + W * u + 30, 300));
}
/* два множества: kind = 'disj' (не пересекаются), 'inter' (пересекаются), 'sub' (A внутри B), 'eq' (равные).
   t = {a, b, ab} — подписи областей (числа или элементы); n = {A, B} — названия множеств */
function sets(kind, t, n){
  t = t || {}; n = n || { A:'A', B:'B' }; var s = '', W = 240, H = 130;
  if(kind === 'disj'){
    s += '<ellipse cx="62" cy="68" rx="52" ry="44" fill="#BBDEFB" ' + st('#1E88E5', 3) + '/><ellipse cx="178" cy="68" rx="52" ry="44" fill="#F8BBD0" ' + st('#D81B60', 3) + '/>' + txt(62, 20, n.A, { c:'#1E88E5', s:18 }) + txt(178, 20, n.B, { c:'#D81B60', s:18 }) + txt(62, 74, t.a || '', { s:16 }) + txt(178, 74, t.b || '', { s:16 });
  } else if(kind === 'inter'){
    s += '<ellipse cx="88" cy="68" rx="62" ry="46" fill="#BBDEFB" fill-opacity=".85" ' + st('#1E88E5', 3) + '/><ellipse cx="152" cy="68" rx="62" ry="46" fill="#F8BBD0" fill-opacity=".75" ' + st('#D81B60', 3) + '/>' + txt(62, 18, n.A, { c:'#1E88E5', s:18 }) + txt(178, 18, n.B, { c:'#D81B60', s:18 }) + txt(62, 74, t.a || '', { s:16 }) + txt(178, 74, t.b || '', { s:16 }) + txt(120, 74, t.ab || '', { s:16 });
  } else if(kind === 'sub'){
    s += '<ellipse cx="120" cy="68" rx="108" ry="54" fill="#F8BBD0" ' + st('#D81B60', 3) + '/><ellipse cx="120" cy="72" rx="54" ry="30" fill="#BBDEFB" ' + st('#1E88E5', 3) + '/>' + txt(120, 76, n.A + (t.a ? ' ' + t.a : ''), { c:'#1E88E5', s:16 }) + txt(120, 20, n.B, { c:'#D81B60', s:18 }) + txt(46, 106, t.b || '', { s:15 });
  } else {
    s += '<ellipse cx="120" cy="68" rx="90" ry="50" fill="#D1C4E9" ' + st('#5E35B1', 3) + '/>' + txt(120, 62, n.A + ' = ' + n.B, { c:'#5E35B1', s:20 }) + txt(120, 88, t.a || '', { s:15 });
  }
  return svg(W, H, s, 250);
}
/* схема движения: kind = 'meet' (навстречу), 'away' (в противоположные стороны), 'chase' (вдогонку). o: v1, v2 — скорости; s — расстояние (число или '?') */
function way(kind, o){
  o = o || {}; var W = 260, H = 110, s = '', y = 62;
  function car(x, dir, col, lab){ var d = dir > 0 ? 1 : -1; return '<g transform="translate(' + x + ',' + (y - 26) + ')"><rect x="-17" y="6" width="34" height="14" rx="5" fill="' + col + '" ' + st() + '/><rect x="' + (d > 0 ? -3 : -13) + '" y="-3" width="16" height="11" rx="3" fill="#E3F2FD" ' + st() + '/><circle cx="-8" cy="22" r="5" fill="#455A64"/><circle cx="8" cy="22" r="5" fill="#455A64"/></g>' + txt(x, y - 38, lab, { s:13, c:col }); }
  function arrow(x1, x2, col){ var d = x2 > x1 ? -4 : 4; return '<line x1="' + x1 + '" y1="9" x2="' + x2 + '" y2="9" ' + st(col, 3) + '/><polygon points="' + x2 + ',9 ' + (x2 + d * 2) + ',4 ' + (x2 + d * 2) + ',14" fill="' + col + '"/>'; }
  s += '<line x1="14" y1="' + (y + 2) + '" x2="' + (W - 14) + '" y2="' + (y + 2) + '" ' + st('#90A4AE', 4) + '/>';
  var l1 = o.v1 != null ? o.v1 + ' км/ч' : '', l2 = o.v2 != null ? o.v2 + ' км/ч' : '';
  if(kind === 'meet'){
    s += car(52, 1, '#E53935', l1) + car(W - 52, -1, '#1E88E5', l2) + arrow(70, 112, '#E53935') + arrow(W - 70, W - 112, '#1E88E5');
    if(o.s != null) s += '<path d="M52 ' + (y + 22) + ' H' + (W - 52) + '" ' + st('#7A5A10', 2, '4 3') + '/>' + txt(W / 2, y + 40, 'S = ' + (typeof o.s === 'number' ? o.s.toLocaleString('ru-RU') + ' км' : o.s), { s:15, c:'#7A5A10' });
  } else if(kind === 'away'){
    s += '<circle cx="' + W / 2 + '" cy="' + (y + 2) + '" r="5" fill="#455A64"/>' + car(W / 2 - 46, -1, '#E53935', l1) + car(W / 2 + 46, 1, '#1E88E5', l2) + arrow(W / 2 - 64, W / 2 - 106, '#E53935') + arrow(W / 2 + 64, W / 2 + 106, '#1E88E5');
  } else {
    s += car(60, 1, '#E53935', l1) + car(150, 1, '#1E88E5', l2) + arrow(78, 120, '#E53935') + arrow(168, 210, '#1E88E5');
    if(o.s != null) s += '<path d="M60 ' + (y + 22) + ' H150" ' + st('#7A5A10', 2, '4 3') + '/>' + txt(105, y + 40, 'S = ' + o.s + ' км', { s:15, c:'#7A5A10' });
  }
  return svg(W, H, s, 270);
}
/* окружность: r — радиус (число, подпись), o: {r:1 — показать радиус, d:1 — диаметр, p:[расстояние от центра точки, подпись] — точка, chord:1 — хорда, rl/dl — подписи} */
function circ(o){
  o = o || {}; var cx = 110, cy = 82, R = 62, s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="#FFE0B2" ' + st('#EF6C00', 3) + '/><circle cx="' + cx + '" cy="' + cy + '" r="4" fill="' + INK + '"/>' + txt(cx - 14, cy - 8, 'O', { s:15 });
  if(o.d) s += '<line x1="' + (cx - R) + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '" ' + st('#1E88E5', 3) + '/>' + txt(cx, cy + 20, o.dl || 'диаметр', { c:'#1E88E5', s:14 });
  if(o.r) s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R * .7) + '" y2="' + (cy - R * .7) + '" ' + st('#D81B60', 3) + '/>' + txt(cx + R * .42, cy - R * .62, o.rl || 'радиус', { c:'#D81B60', s:14, a:'start' });
  if(o.chord) s += '<line x1="' + (cx - R * .8) + '" y1="' + (cy - R * .6) + '" x2="' + (cx + R * .8) + '" y2="' + (cy - R * .6) + '" ' + st('#43A047', 3) + '/>' + txt(cx, cy - R * .6 - 7, 'хорда', { c:'#43A047', s:14 });
  if(o.p){ var px = cx + R * o.p[0], py = cy + (o.p[2] || 0); s += '<circle cx="' + px + '" cy="' + py + '" r="5" fill="#7E57C2"/>' + txt(px + 8, py - 8, o.p[1] || 'A', { c:'#7E57C2', s:15, a:'start' }); }
  return svg(220, 160, s, 230);
}
/* треугольник по двум углам. o: A, B (градусы при вершинах A и B), la:{A,B,C} подписи углов, sides:{ab,bc,ca} подписи сторон, verts:true — буквы */
function tri(o){
  var A = o.A, B = o.B, C = 180 - A - B, L = 170, x0 = 30, y0 = 130, r = Math.PI / 180;
  var dAC = L * Math.sin(B * r) / Math.sin(C * r), cx = x0 + dAC * Math.cos(A * r), cy = y0 - dAC * Math.sin(A * r);
  var sc = Math.min(1, 105 / (y0 - cy)); if(sc < 1){ cx = x0 + (cx - x0) * sc; cy = y0 - (y0 - cy) * sc; L = L * sc; }
  var bx = x0 + L, by = y0, s = '', la = o.la || {};
  s += '<polygon points="' + x0 + ',' + y0 + ' ' + bx + ',' + by + ' ' + cx + ',' + cy + '" fill="#C5E1A5" ' + st('#558B2F', 3) + '/>';
  function mark(px, py, ax, ay, bx2, by2){
    var u1 = [ax - px, ay - py], u2 = [bx2 - px, by2 - py], n1 = Math.hypot(u1[0], u1[1]), n2 = Math.hypot(u2[0], u2[1]); u1 = [u1[0] / n1 * 14, u1[1] / n1 * 14]; u2 = [u2[0] / n2 * 14, u2[1] / n2 * 14];
    return '<polyline points="' + (px + u1[0]) + ',' + (py + u1[1]) + ' ' + (px + u1[0] + u2[0]) + ',' + (py + u1[1] + u2[1]) + ' ' + (px + u2[0]) + ',' + (py + u2[1]) + '" fill="none" ' + st('#D81B60', 2) + '/>';
  }
  if(A === 90) s += mark(x0, y0, bx, by, cx, cy); if(B === 90) s += mark(bx, by, x0, y0, cx, cy); if(C === 90) s += mark(cx, cy, x0, y0, bx, by);
  if(la.A) s += txt(x0 + 40, y0 - 5, la.A, { c:'#D81B60', s:15 });
  if(la.B) s += txt(bx - 40, by - 5, la.B, { c:'#D81B60', s:15 });
  if(la.C) s += txt(cx, cy + 26, la.C, { c:'#D81B60', s:15 });
  if(o.verts){ s += txt(x0 - 12, y0 + 6, 'A', { s:16 }) + txt(bx + 12, by + 6, 'B', { s:16 }) + txt(cx, cy - 8, 'C', { s:16 }); }
  var sd = o.sides || {};
  if(sd.ab) s += txt((x0 + bx) / 2, y0 + 20, sd.ab, { c:'#1E88E5', s:14 });
  if(sd.bc) s += txt((bx + cx) / 2 + 16, (by + cy) / 2, sd.bc, { c:'#1E88E5', s:14, a:'start' });
  if(sd.ca) s += txt((x0 + cx) / 2 - 12, (y0 + cy) / 2, sd.ca, { c:'#1E88E5', s:14, a:'end' });
  return svg(250, 160, s, 250);
}
/* фигура с осями симметрии: kind = square | rect | equi | isos | circle | rhombus | hex; axes — сколько осей нарисовать (0 — без осей) */
function sym(kind, axes){
  var s = '', cx = 110, cy = 80, ax = [], fill = '#B3E5FC', sk = st('#0277BD', 3), D = st('#D81B60', 2.2, '6 4');
  function L(x1, y1, x2, y2){ return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" ' + D + '/>'; }
  if(kind === 'square'){ s += '<rect x="60" y="30" width="100" height="100" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 18, 110, 142), L(48, 80, 172, 80), L(52, 22, 168, 138), L(168, 22, 52, 138)]; }
  else if(kind === 'rect'){ s += '<rect x="40" y="45" width="140" height="70" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 33, 110, 127), L(28, 80, 192, 80)]; }
  else if(kind === 'equi'){ s += '<polygon points="110,22 170,126 50,126" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 12, 110, 136), L(181, 132, 69, 68), L(39, 132, 151, 68)]; }
  else if(kind === 'isos'){ s += '<polygon points="110,20 160,130 60,130" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 10, 110, 142)]; }
  else if(kind === 'circle'){ s += '<circle cx="110" cy="80" r="56" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 14, 110, 146), L(44, 80, 176, 80), L(63, 33, 157, 127), L(157, 33, 63, 127)]; }
  else if(kind === 'rhombus'){ s += '<polygon points="110,20 170,80 110,140 50,80" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 10, 110, 150), L(38, 80, 182, 80)]; }
  else { var p = []; for(var i = 0; i < 6; i++) p.push((110 + 58 * Math.cos(i * Math.PI / 3)) + ',' + (80 + 58 * Math.sin(i * Math.PI / 3))); s += '<polygon points="' + p.join(' ') + '" fill="' + fill + '" ' + sk + '/>'; ax = [L(110, 12, 110, 148), L(40, 80, 180, 80), L(145, 140, 75, 20), L(75, 140, 145, 20), L(162, 118, 58, 42), L(58, 118, 162, 42)]; }
  for(var j = 0; j < Math.min(axes || 0, ax.length); j++) s += ax[j];
  return svg(220, 160, s, 230);
}
window.M4A = { tri:tri, sym:sym, circ:circ, way:way, sets:sets, svg:svg, st:st, txt:txt, box:box, lshape:lshape, INK:INK };
})();
