(function(){
  var h = MF.h, INK = '#1D3557', I = function(set, k, x, y, s){ return h.ico(set, k, x, y, s); };
  var R = '#E5392F', Y = '#FFC21F', G = '#2FB04A', OFF = '#4A5568';
  var tl = function(x, y, s, on, loopOn){
    var lamp = function(cy, c, k){ var lit = on === k; var circle = '<circle cx="20" cy="' + cy + '" r="9" fill="' + (lit ? c : OFF) + '"' + (lit ? ' stroke="#fff" stroke-width="1.2"' : '') + '/>'; return loopOn && lit ? h.loop(circle, 'beat', 1.6) : circle; };
    return h.at(x, y, s, '<rect x="14" y="40" width="12" height="40" fill="#6B7788"/><rect x="2" y="-4" width="36" height="86" rx="10" fill="#2D3748" stroke="#111" stroke-width="1.6"/>' + lamp(8, R, 'r') + lamp(30, Y, 'y') + lamp(52, G, 'g'));
  };
  var road = '<rect y="60" width="160" height="30" fill="#4A5568"/><path d="M0 75 H160" stroke="#fff" stroke-width="1.6" stroke-dasharray="8 6"/><rect y="52" width="160" height="8" fill="#B8C4D4"/>';
  var zebra = [0, 1, 2, 3, 4, 5].map(function(i){ return '<rect x="' + (38 + i * 14) + '" y="60" width="8" height="30" fill="#fff"/>'; }).join('');
  var car = function(x, c, d, dx){ return h.slide('<g transform="translate(' + x + ' 62)"><rect x="0" y="6" width="34" height="12" rx="4" fill="' + c + '"/><path d="M6 6 L12 -2 H24 L30 6 Z" fill="' + c + '"/><path d="M13 0 H23 L26 6 H10 Z" fill="#BFE6FF"/><circle cx="9" cy="19" r="5" fill="#222"/><circle cx="26" cy="19" r="5" fill="#222"/></g>', dx, 0, d, 1.4); };
  MF.register('trafficlight', { lang: 'ru-RU', scenes: [
    { say: 'На дорогах ездит много машин, поэтому на перекрёстках стоит светофор. Он помогает всем двигаться безопасно.',
      svg: h.svg(road + car(30, '#E5524F', .2, -60) + car(100, '#2F7DE1', .8, 60) + h.pop(tl(124, 8, .62, 'g', false), .4), 'sky'), dur: 8 },
    { say: 'У светофора три цвета. Красный, жёлтый и зелёный.',
      svg: h.svg(h.pop(tl(22, 6, .9, 'r'), .2) + h.pop(tl(62, 6, .9, 'y'), .8) + h.pop(tl(102, 6, .9, 'g'), 1.4), 'sky'), dur: 6 },
    { say: 'Красный свет — стой! Переходить дорогу нельзя, нужно ждать.',
      svg: h.svg(h.pop(tl(18, 6, .85, 'r', true), .2) + h.pop(I('FIG', 'stand', 50, 14, 56), .6) + h.text(126, 26, 'СТОЙ!', { d: 1.2, s: 11, c: R }) + h.pop('<circle cx="128" cy="54" r="11" fill="none" stroke="' + R + '" stroke-width="3"/><path d="M120 62 L136 46" stroke="' + R + '" stroke-width="3"/>', 1.8), 'sky'), dur: 7 },
    { say: 'Жёлтый свет — внимание! Приготовься. Скоро цвет сменится.',
      svg: h.svg(h.pop(tl(18, 6, .85, 'y', true), .2) + h.pop(I('FIG', 'stand', 50, 14, 56), .6) + h.text(124, 30, 'ВНИМАНИЕ!', { d: 1.2, s: 8, c: '#C98A00' }), 'sky'), dur: 7 },
    { say: 'Зелёный свет — иди! Но сначала посмотри налево, потом направо и убедись, что машины остановились.',
      svg: h.svg(road + zebra + h.pop(tl(6, 8, .62, 'g', true), .2) + h.slide(I('FIG', 'walk', 48, 8, 54), 50, 0, .8, 2.2) + h.pop('<path d="M122 22 L104 22 M104 22 L110 16 M104 22 L110 28" stroke="#1D3557" stroke-width="2.4" fill="none" stroke-linecap="round"/>', 2.6) + h.text(125, 34, 'налево', { d: 3, s: 5 }) + h.pop('<path d="M138 46 L156 46 M156 46 L150 40 M156 46 L150 52" stroke="#1D3557" stroke-width="2.4" fill="none" stroke-linecap="round"/>', 3.6) + h.text(139, 56, 'направо', { d: 4, s: 5 }), 'sky'), dur: 10 },
    { say: 'Дорогу переходи только по пешеходному переходу, который называют зебра. И всегда держись за руку со взрослым. Молодец!',
      svg: h.svg(road + zebra + h.pop(I('FIG', 'stand', 30, 10, 60), .4) + h.pop(I('FIG', 'stand', 62, 26, 44), .8) + h.pop('<g transform="translate(120 12)"><rect width="30" height="30" rx="4" fill="#2F7DE1" stroke="#fff" stroke-width="2"/><polygon points="15,4 26,25 4,25" fill="#fff"/><circle cx="15" cy="13" r="2" fill="#2F7DE1"/><path d="M15 15 V20 M15 17 L12 20 M15 17 L18 20 M15 20 L13 23 M15 20 L17 23" stroke="#2F7DE1" stroke-width="1.3" stroke-linecap="round" fill="none"/></g>', 1.4), 'sky'), dur: 9 }
  ] });
})();
