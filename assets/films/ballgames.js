(function(){
  var h = MF.h, N = MFA.nat(h), I = function(s, k, x, y, z){ return h.ico(s, k, x, y, z); };
  var ball = function(x, y, z, d){ return h.pop(I('PI', 'ball', x, y, z), d); };
  var kid = function(x, y, z, d){ return h.pop(I('FIG', 'stand', x, y, z), d); };
  var sp = function(x, y, d){ return h.fade('<g stroke="#FFC21F" stroke-width="2.4" stroke-linecap="round"><path d="M' + x + ' ' + y + ' l-6 -6 M' + (x + 8) + ' ' + (y - 2) + ' v-9 M' + (x + 16) + ' ' + y + ' l6 -6"/></g>', d); };
  var box = function(x, y, w){ return '<path d="M' + x + ' ' + y + ' H' + (x + w) + ' L' + (x + w - 5) + ' ' + (y + 20) + ' H' + (x + 5) + ' Z" fill="#C99A5B" stroke="#8B6232" stroke-width="2" stroke-linejoin="round"/><path d="M' + (x + 3) + ' ' + (y + 5) + ' H' + (x + w - 3) + '" stroke="#8B6232" stroke-width="1.6"/>'; };
  var num = function(t, x, y, d){ return h.pop('<text x="' + x + '" y="' + y + '" font-size="9" font-weight="800" fill="#FF8A1F" text-anchor="middle">' + t + '</text>', d); };
  MF.register('ballgames', { lang: 'ru-RU', scenes: [
    { key: 'ball_s1_text',
      svg: h.svg(h.loop(I('PI', 'ball', 50, 8, 60), 'bob', 1.4) + ball(14, 38, 26, .5) + ball(122, 30, 30, .9) + '<ellipse cx="80" cy="76" rx="26" ry="3.4" fill="rgba(0,0,0,.12)"/>', 'gym'), dur: 9 },
    { key: 'ball_s2_text',
      svg: h.svg(N.pop('NT', 'hand', 36, 46, 34, .2) + h.pop('<g transform="translate(90 46) scale(-.34 .34) translate(-100 0)">' + MFA.NT.hand + '</g>', .4) + h.loop(I('PI', 'ball', 62, 6, 34), 'bob', 1.3) + sp(54, 40, 2.4), 'gym'), dur: 10 },
    { key: 'ball_s3_text',
      svg: h.svg([[80, 6], [122, 28], [106, 52], [54, 52], [38, 28]].map(function(p, i){ return kid(p[0] - 14, p[1], 30, .2 + i * .25); }).join('') + h.slide(I('PI', 'ball', 66, 30, 24), 38, -10, 1.6, 1.2) + '<ellipse cx="80" cy="50" rx="50" ry="26" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 4" opacity=".7"/>', 'gym'), dur: 10 },
    { key: 'ball_s4_text',
      svg: h.svg(kid(24, 18, 56, .2) + h.loop(I('PI', 'ball', 78, 20, 28), 'bob', .9) + '<path d="M60 74 H140" stroke="#C9A56E" stroke-width="2"/>' + num('1', 112, 24, 1) + num('2', 126, 24, 1.8) + num('3', 140, 24, 2.6), 'gym'), dur: 10 },
    { key: 'ball_s5_text',
      svg: h.svg(h.pop(box(116, 52, 32), .2) + kid(6, 22, 52, .4) + '<path d="M36 76 H112" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3"/>' + h.slide(I('PI', 'ball', 122, 36, 22), -84, -6, 1.6, 1.1) + h.pop(kid(50, 22, 52, 0), 3) + h.slide(I('PI', 'ball', 122, 36, 22), -50, -8, 3.8, 1.1), 'gym'), dur: 11 },
    { key: 'ball_s6_text', svg: h.svg(N.celebrate(h.loop(I('PI', 'ball', 64, 52, 32), 'bob', 1.2)), 'sky'), dur: 8 }
  ] });
})();
