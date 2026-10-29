/* ===== Білім Аралы — «Растения в течение года: Волшебное дерево» (v3) =====
   Естествознание, 2 класс (цель 2.2.1.2 приказа №399): сезонные изменения у растений весной, летом, осенью и зимой.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + набор games/mathx-g2.js + заставка games/mathx-hero.js
   подгружаются сами. Режим освоения: 10 заданий подряд без ошибки, три уровня.
*/
window.__mxHeroCfg = {theme:'autumn', icons:['🌸','☀️','🍂']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-g2.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();

function initSeasonPlantGame(containerId){
  __mxLoad(function(){
    var M = MX, G = MXG2, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    var SEAS = ['spring', 'summer', 'autumn', 'winter'];
    var NM = { spring:'весна', summer:'лето', autumn:'осень', winter:'зима' };
    var IC = { spring:'🌸', summer:'☀️', autumn:'🍂', winter:'❄️' };
    var SUM = { spring:'Просыпаются: набухают почки, появляются молодые листья и цветы', summer:'Растут, цветут и дают плоды', autumn:'Листья желтеют и опадают, плоды и семена созревают', winter:'Отдыхают: рост почти остановился' };
    var FACTS = [
      ['На деревьях набухают почки и появляются клейкие молодые листочки', 'spring'], ['Из-под снега появляются первые цветы — подснежники', 'spring'], ['Зацветают яблони и вишни', 'spring'], ['Трава пробивается из земли и зеленеет', 'spring'],
      ['Деревья стоят в густой зелёной листве, созревают ягоды', 'summer'], ['Растения быстро растут: им много света и тепла', 'summer'], ['На лугу цветут ромашки и васильки', 'summer'], ['Созревают яблоки, вишни и помидоры', 'summer'],
      ['Листья на деревьях желтеют, краснеют и опадают', 'autumn'], ['Созревают семена, желуди и орехи', 'autumn'], ['Растения готовятся к холодам', 'autumn'], ['Трава желтеет и засыхает', 'autumn'],
      ['У лиственных деревьев голые ветки без листьев', 'winter'], ['Ель и сосна остаются зелёными', 'winter'], ['Растения «спят», рост остановился', 'winter'], ['Семена лежат под снегом и ждут весны', 'winter']
    ];
    // дерево по временам года
    function tree(s){
      var leaf = { spring:'#9BE070', summer:'#2FAE5B', autumn:'#F2A33A', winter:'none' }[s], sky = { spring:'#D7F3FF', summer:'#BFE9FF', autumn:'#FFE7C2', winter:'#E4EEF9' }[s], ground = { spring:'#7ED36B', summer:'#4FBF5A', autumn:'#D9A14A', winter:'#F6FBFF' }[s];
      var h = '<svg viewBox="0 0 220 200" width="210" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:22px;filter:drop-shadow(0 5px 0 rgba(0,0,0,.14))"><rect width="220" height="200" rx="22" fill="' + sky + '"/><ellipse cx="110" cy="190" rx="130" ry="40" fill="' + ground + '"/>';
      h += '<path d="M104 170 L106 100 Q108 84 100 70 M106 110 Q124 96 138 82 M106 122 Q86 108 74 94" stroke="#8A5E36" stroke-width="12" stroke-linecap="round" fill="none"/>';
      if(s === 'winter') h += '<path d="M100 70 Q92 56 88 44 M138 82 Q150 70 156 58 M74 94 Q60 86 52 74 M100 70 Q110 54 114 42" stroke="#8A5E36" stroke-width="5" stroke-linecap="round" fill="none"/><ellipse cx="110" cy="172" rx="46" ry="9" fill="#fff"/><circle cx="60" cy="40" r="3" fill="#fff"/><circle cx="170" cy="30" r="3" fill="#fff"/><circle cx="30" cy="90" r="3" fill="#fff"/><circle cx="190" cy="100" r="3" fill="#fff"/>';
      else {
        [[100,60,34],[140,76,30],[72,90,28],[118,40,26],[88,38,22],[150,52,18]].forEach(function(c){ h += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + leaf + '"/>'; });
        if(s === 'spring') [[96,52],[132,70],[70,86],[114,36],[148,50]].forEach(function(p){ h += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#FFB7D5"/>'; });
        if(s === 'summer') [[90,66],[130,84],[76,100],[120,52]].forEach(function(p){ h += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="#FF5B4B"/>'; });
        if(s === 'autumn'){ [[44,150],[176,160],[70,176],[150,178]].forEach(function(p){ h += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="5" fill="#E8853A" transform="rotate(-20 ' + p[0] + ' ' + p[1] + ')"/>'; }); h += '<ellipse cx="60" cy="120" rx="7" ry="4" fill="#E8853A"/><ellipse cx="170" cy="104" rx="7" ry="4" fill="#C9461F"/>'; }
      }
      return h + '</svg>';
    }
    function hintS(s, extra){ return { hintExpr:'<span class="ok">' + NM[s] + '</span>', hintSay:[G.say((extra ? extra + ' ' : '') + 'Это ' + NM[s] + '. ' + SUM[s] + '.')], hint:G.hintCard(tree(s), '<b>' + NM[s].charAt(0).toUpperCase() + NM[s].slice(1) + '</b>: ' + SUM[s].toLowerCase()) }; }
    function seasOpts(){ return G.txtOpts(SEAS.map(function(x){ return NM[x]; })); }

    /* ⭐ дерево на картинке — какое время года? */
    function L1(){
      var s = pick(SEAS);
      return S('1' + s + rnd(1, 99), Object.assign({ expr:'', cap:'Какое время года на картинке?', say:[G.say('Посмотри на дерево. Какое сейчас время года?')], ans:NM[s], opts:seasOpts(), layout:'wide', field:function(el){ el.innerHTML = tree(s); } }, hintS(s)));
    }
    /* ⭐⭐ что происходит с растениями — в какое время года? */
    function L2(){
      var f = pick(FACTS), s = f[1];
      return S('2' + f[0], Object.assign({ expr:'', cap:f[0] + '. Когда это бывает?', say:[G.say(f[0] + '. Когда это бывает: весной, летом, осенью или зимой?')], ans:NM[s], opts:seasOpts(), layout:'wide', field:function(el){ el.innerHTML = '<span style="font-size:3.4rem;line-height:1">' + IC[s] + '</span>'; } }, hintS(s)));
    }
    /* ⭐⭐⭐ что делают растения в это время года / что дальше */
    function L3(){
      if(Math.random() < .35){
        var s0 = pick(SEAS), nx = SEAS[(SEAS.indexOf(s0) + 1) % 4];
        return S('3n' + s0, Object.assign({ expr:'<span style="font-size:2.6rem">' + IC[s0] + ' ➜ ?</span>', cap:'Какое время года наступит после ' + (s0 === 'summer' ? 'лета' : s0 === 'spring' ? 'весны' : s0 === 'autumn' ? 'осени' : 'зимы') + '?', say:[G.say('Какое время года наступит после ' + (s0 === 'summer' ? 'лета' : s0 === 'spring' ? 'весны' : s0 === 'autumn' ? 'осени' : 'зимы') + '?')], ans:NM[nx], opts:seasOpts(), layout:'wide' }, hintS(nx, 'Времена года идут по кругу.')));
      }
      var s = pick(SEAS), good = SUM[s], bad = shuffle(SEAS.filter(function(x){ return x !== s; })).slice(0, 2).map(function(x){ return SUM[x]; });
      return S('3s' + s + rnd(1, 99), Object.assign(G.choice({ q:'Что происходит с растениями ' + ({ spring:'весной', summer:'летом', autumn:'осенью', winter:'зимой' })[s] + '?', opts:[good].concat(bad), ans:good, layout:'card', field:function(el){ el.innerHTML = tree(s); } }), hintS(s)));
    }

    M.run({ root:containerId, key:'seasonplant', need:10, theme:'autumn', levels:[L1, L2, L3] });
  });
}
