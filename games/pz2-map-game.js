/* Познание мира, 2 класс — «Карта Казахстана» (цель 2.1.3.2): города, крупные реки, озёра и море на карте. Данные карты — Natural Earth (общественное достояние), см. pz2-map-data.js. */
(function(){
var D = window.PZ2_MAP;
var NAMES = {
  astana:['Астана', 'город'], almaty:['Алматы', 'город'], shymkent:['Шымкент', 'город'], karaganda:['Караганда', 'город'], aktobe:['Актобе', 'город'], atyrau:['Атырау', 'город'], pavlodar:['Павлодар', 'город'],
  oskemen:['Усть-Каменогорск', 'город'], kostanay:['Костанай', 'город'], aktau:['Актау', 'город'], kyzylorda:['Кызылорда', 'город'], oral:['Уральск', 'город'],
  balkhash:['Балхаш', 'озеро'], zaysan:['Зайсан', 'озеро'], alakol:['Алаколь', 'озеро'], tengiz:['Тенгиз', 'озеро'], aral:['Аральское', 'море'], caspian:['Каспийское', 'море'],
  irtysh:['Иртыш', 'река'], syrdarya:['Сырдарья', 'река'], ili:['Или', 'река'], ural:['Урал', 'река'], esil:['Есиль', 'река']
};
var INFO = {
  astana:'Астана — столица Казахстана. Она находится в центре страны, на реке Есиль', almaty:'Алматы — самый большой город страны. Он на юго-востоке, у подножия гор', shymkent:'Шымкент — большой город на юге страны',
  karaganda:'Караганда — город в центре страны, там добывают уголь', aktobe:'Актобе — город на западе страны', atyrau:'Атырау стоит на реке Урал, недалеко от Каспийского моря', pavlodar:'Павлодар стоит на берегу реки Иртыш',
  oskemen:'Усть-Каменогорск — город на востоке страны, на реке Иртыш', kostanay:'Костанай — город на севере страны', aktau:'Актау — город на берегу Каспийского моря', kyzylorda:'Кызылорда стоит на реке Сырдарья', oral:'Уральск стоит на реке Урал, на западе страны',
  balkhash:'Балхаш — большое озеро на юго-востоке страны. Вода в нём в одной части пресная, а в другой солёная', zaysan:'Зайсан — озеро на востоке страны, через него течёт Иртыш', alakol:'Алаколь — солёное озеро на востоке страны', tengiz:'Тенгиз — солёное озеро в центре страны',
  aral:'Аральское море сильно обмелело. В Казахстане остаётся Малое Аральское море', caspian:'Каспийское море — самое большое в мире озеро-море. Казахстан стоит на его восточном берегу',
  irtysh:'Иртыш — большая река на востоке страны. Она течёт на север, в Россию', syrdarya:'Сырдарья течёт с юга на запад и впадает в Аральское море', ili:'Река Или течёт с востока на юго-восток страны и впадает в озеро Балхаш', ural:'Урал течёт на западе страны и впадает в Каспийское море', esil:'Есиль течёт на севере страны, на ней стоит столица Астана'
};
var CITIES = Object.keys(D.cities), WATER = ['balkhash', 'zaysan', 'alakol', 'tengiz', 'aral', 'caspian'], RIVERS = Object.keys(D.rivers);
function full(k){ var n = NAMES[k]; return n[1] === 'море' ? n[0] + ' ' + 'море' : n[1] + ' ' + n[0]; }
function shortName(k){ var n = NAMES[k]; return n[1] === 'море' ? n[0] + ' море' : n[0]; }
function toWhat(k){ return NAMES[k][1] === 'город' ? 'город' : NAMES[k][1] === 'река' ? 'река' : NAMES[k][1] === 'озеро' ? 'озеро' : 'море'; }

/* ----- карта ----- */
function svg(o){
  o = o || {};
  var W = D.w, H = D.h, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;max-width:640px;margin:0 auto;border-radius:16px;background:#A9DAF5;touch-action:manipulation;-webkit-tap-highlight-color:transparent">';
  s += '<style>.pzh{fill:transparent;stroke:transparent;cursor:pointer}.pzo.pzon .pzv{filter:drop-shadow(0 0 4px #FFC93C)}.pzo.pzon .pzv.c{fill:#FFC93C}.pzo.pzok .pzv.c{fill:#34C77B}.pzo.pzno .pzv.c{fill:#FF5A5A}.pzo.pzok .pzv.w{stroke:#34C77B}.pzo.pzno .pzv.w{stroke:#FF5A5A}.pzo.pzon .pzv.w{stroke:#FFC93C}.pzl{font:800 16px "Baloo 2",sans-serif;fill:#25324A;paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round}@keyframes pzp{50%{opacity:.35}}.pzo.pzon .pzv{animation:pzp .9s ease-in-out infinite}</style>';
  D.neigh.forEach(function(d){ s += '<path d="' + d + '" fill="#EDE6D2" stroke="#C9C1A8" stroke-width=".8"/>'; });
  s += '<path d="' + D.kaz + '" fill="#C4E8A4" stroke="#5E9E3E" stroke-width="1.4" stroke-linejoin="round"/>';
  s += '<path d="' + D.deco + '" fill="#7FC4EE"/><path d="' + D.other + '" fill="none" stroke="#7FC4EE" stroke-width="1"/>';
  var act = o.act, hl = o.hl, lab = o.labels || {};
  function wrap(k, inner, hit){
    var cls = 'pzo' + (hl === k ? ' pzon' : '');
    return '<g class="' + cls + '" data-k="' + k + '"' + (act ? '' : ' style="pointer-events:none"') + '>' + inner + (act ? hit : '') + '</g>';
  }
  /* озёра */
  var byKey = {}; D.lakes.forEach(function(l){ (byKey[l[0]] = byKey[l[0]] || []).push(l[1]); });
  Object.keys(byKey).forEach(function(k){
    var inner = byKey[k].map(function(d){ return '<path class="pzv c" d="' + d + '" fill="#3F9BE0" stroke="#2A79B8" stroke-width="1"/>'; }).join('');
    var hit = byKey[k].map(function(d){ return '<path class="pzh" d="' + d + '" stroke-width="16"/>'; }).join('');
    s += wrap(k, inner, hit);
  });
  /* Каспий */
  var cp = D.caspian;
  s += wrap('caspian', '<circle class="pzv c" cx="' + cp[0] + '" cy="' + cp[1] + '" r="' + (hl === 'caspian' ? 16 : 0.1) + '" fill="#3F9BE0" fill-opacity=".9"/>', '<circle class="pzh" cx="' + cp[0] + '" cy="' + cp[1] + '" r="30"/>');
  /* реки */
  RIVERS.forEach(function(k){ s += wrap(k, '<path class="pzv w" d="' + D.rivers[k] + '" fill="none" stroke="#2A79B8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>', '<path class="pzh" d="' + D.rivers[k] + '" fill="none" stroke-width="18" stroke-linecap="round"/>'); });
  /* города */
  CITIES.forEach(function(k){
    if(o.cities && o.cities.indexOf(k) < 0) return;
    var c = D.cities[k];
    s += wrap(k, '<circle class="pzv c" cx="' + c[1] + '" cy="' + c[2] + '" r="6" fill="#E8483F" stroke="#fff" stroke-width="2"/>', '<circle class="pzh" cx="' + c[1] + '" cy="' + c[2] + '" r="22"/>');
  });
  /* подписи */
  function text(x, y, t, a){ return '<text class="pzl" x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '">' + t + '</text>'; }
  Object.keys(lab).forEach(function(k){
    if(!lab[k]) return;
    var t = shortName(k), p;
    if(D.cities[k]) p = [D.cities[k][1], D.cities[k][2] - 11];
    else if(D.rlab[k]) p = [D.rlab[k][0] + 6, D.rlab[k][1] - 8];
    else if(D.llab[k]) p = [D.llab[k][0], D.llab[k][1] + 3];
    else if(k === 'caspian') p = [6, 300];
    if(p) s += text(p[0].toFixed(1), p[1].toFixed(1), t, k === 'caspian' ? 'start' : 'middle');
  });
  return s + '</svg>';
}
function allKeys(){ return CITIES.concat(WATER, RIVERS); }

PZ2.define({
  key:'pz2map', theme:'sky', icons:['🗺️', '🏙️', '💧'],
  groups:[],
  custom:function(X){
    var G = MXG2, M = X.M, S = X.S, pick = X.pick, shuffle = X.shuffle;
    function hint(k){
      return { hintExpr:'', hintSay:[G.say(INFO[k] + '.')], hint:G.hintCard(svg({ hl:k, labels:(function(){ var o = {}; o[k] = 1; return o; })() }), INFO[k]) };
    }
    /* найди на карте (касание): ключи — подсвеченные на карте объекты */
    function findTask(sig, k, o){
      var q = 'Найди на карте: ' + full(k);
      var t = { sig:sig, expr:'', cap:q, say:[G.say('Найди на карте ' + full(k) + '.')], ans:k, gate:false,
        field:function(el, Xe, task){
          var w = document.createElement('div'); w.style.cssText = 'width:min(82vw,500px);margin:0 auto'; el.appendChild(w); w.innerHTML = svg({ act:true, cities:o.cities, labels:o.labels });
          [].forEach.call(w.querySelectorAll('.pzo'), function(g){
            g.addEventListener('click', function(){
              if(task._done) return; task._done = true; Xe.sfx.tap(2);
              var key = g.getAttribute('data-k'); g.classList.add(key === k ? 'pzok' : 'pzno'); task.submit(key, g);
            });
          });
          task.auto = function(wrong){
            var gs = [].slice.call(w.querySelectorAll('.pzo')), g = gs.filter(function(x){ return (x.getAttribute('data-k') === k) === !wrong; })[0];
            if(g) g.dispatchEvent(new Event('click'));
          };
        }
      };
      return Object.assign(t, hint(k));
    }
    function labelsFor(keys){ var o = {}; keys.forEach(function(k){ o[k] = 1; }); return o; }
    /* ⭐ найди город: на карте только 4 города, они подписаны */
    function L1(){
      var k = pick(CITIES), set = [k].concat(shuffle(CITIES.filter(function(c){ return c !== k; })).slice(0, 3));
      return findTask('1c' + k, k, { cities:set, labels:labelsFor(set) });
    }
    /* ⭐⭐ найди реку, озеро или море: имена на карте подписаны */
    function L2(){
      var pool = WATER.concat(RIVERS), k = pick(pool), lab = {}; pool.forEach(function(x){ lab[x] = 1; });
      return findTask('2w' + k, k, { cities:[], labels:lab });
    }
    /* ⭐⭐⭐ найди без подписей, «что это?», вопросы */
    var MC = [
      ['Какой город — столица Казахстана?', 'Астана', ['Алматы', 'Шымкент', 'Караганда'], 'Астана — столица Казахстана. Она находится в центре страны, на реке Есиль', '🏛️'],
      ['Какой город в Казахстане самый большой?', 'Алматы', ['Астана', 'Актау', 'Костанай'], 'Алматы — самый большой город Казахстана. Он на юго-востоке, у подножия гор', '🏙️'],
      ['Какой город стоит на берегу Каспийского моря?', 'Актау', ['Караганда', 'Павлодар', 'Костанай'], 'Актау стоит на берегу Каспийского моря', '🌊'],
      ['В какое озеро впадает река Или?', 'В озеро Балхаш', ['В озеро Зайсан', 'В озеро Тенгиз', 'В Каспийское море'], 'Река Или впадает в озеро Балхаш', '💧'],
      ['Какая река течёт в Каспийское море?', 'Урал', ['Иртыш', 'Сырдарья', 'Есиль'], 'Река Урал течёт на западе страны и впадает в Каспийское море', '🏞️'],
      ['Как показывают реки, озёра и моря на карте?', 'Голубым цветом', ['Красным цветом', 'Жёлтым цветом', 'Серым цветом'], 'На карте вода — голубая', '🗺️'],
      ['Что обозначают красные точки на нашей карте?', 'Города', ['Горы', 'Реки', 'Озёра'], 'Города на карте отмечают точками', '📍'],
      ['Через какой город течёт река Есиль?', 'Через Астану', ['Через Алматы', 'Через Актау', 'Через Шымкент'], 'На реке Есиль стоит столица Астана', '🏞️']
    ];
    function L3(){
      var r = Math.random();
      if(r < .35){ var k = pick(allKeys().filter(function(x){ return !D.cities[x] || true; })); return findTask('3f' + k, k, { labels:{} }); }
      if(r < .65){
        var k2 = pick(allKeys()), same = allKeys().filter(function(x){ return x !== k2 && toWhat(x) === toWhat(k2); }), opts = [shortName(k2)].concat(shuffle(same).slice(0, 2).map(shortName));
        var q = 'Что это за ' + toWhat(k2) + '?';
        return S('3i' + k2, Object.assign({ expr:svg({ hl:k2 }), cap:q, say:[G.say(q)], ans:shortName(k2), opts:G.txtOpts(opts), layout:'wide' }, hint(k2)));
      }
      var m = pick(MC);
      return S('3m' + m[0], Object.assign(G.choice({ q:m[0], opts:[m[1]].concat(m[2]), ans:m[1], layout:'card' }), { hintSay:[G.say(m[3] + '.')], hint:G.hintCard('<span style="font-size:3.4rem;line-height:1">' + m[4] + '</span>', m[3]) }));
    }
    return [L1, L2, L3];
  }
});
})();
