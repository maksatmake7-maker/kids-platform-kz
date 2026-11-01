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
window.M4A = { sets:sets, svg:svg, st:st, txt:txt, box:box, lshape:lshape, INK:INK };
})();
