/* ===== Білім Аралы — предметные фоны =====
   Подключать после world.js. На странице:  <body class="w-page" data-subject="math">
   Скрипт добавляет к общему небу и морю «мир предмета»: парящие знаки, острова на горизонте, буйки и надводные детали.
   Новый предмет = новая запись в THEMES (ниже). Сейчас готово: math. */
(function(){
  'use strict';
  var key = document.body && document.body.getAttribute('data-subject');
  var bg = document.querySelector('.w-bg');
  if (!key || !bg) return;

  var $e = function(cls, html, tag){ var d=document.createElement(tag||'div'); d.className=cls; if(html) d.innerHTML=html; return d; };
  function rnd(i){ var x=Math.sin(i*127.1+11.7)*43758.5453; return x-Math.floor(x); }
  var ISLE='<path d="M2 74 Q18 64 60 64 Q102 64 118 74Z" fill="#7DBF86"/><path d="M2 74 H118 Q102 80 60 80 Q18 80 2 74Z" fill="#E7C98C"/>';

  /* ---------- предмет: математика — «Страна чисел» ---------- */
  var MATH_COL = ['#FFC93C','#FF6B5B','#3FB088','#5EC3E8','#C77DD9','#FF8A3D'];
  function mathSky(sky){
    var G = ['1','2','3','4','5','6','7','8','9','0','+','−','=','×','÷','5','7','3','+','2','8','='];
    var shapes = [
      '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="none" stroke="var(--c)" stroke-width="6"/></svg>',
      '<svg viewBox="0 0 40 40"><path d="M20 5 L36 34 H4Z" fill="none" stroke="var(--c)" stroke-width="6" stroke-linejoin="round"/></svg>',
      '<svg viewBox="0 0 40 40"><rect x="6" y="6" width="28" height="28" rx="5" fill="none" stroke="var(--c)" stroke-width="6"/></svg>'
    ];
    var N = 22;
    for (var i=0;i<N;i++){
      var shape = (i%7===3);
      var c = MATH_COL[Math.floor(rnd(i+3)*MATH_COL.length)];
      var m = $e('s-m'+(i%2?' opt':''));
      var px=rnd(i)*92+1, py=Math.max(rnd(i+40)*48+1, 20);
      /* середина верхней части занята заголовком — знаки уходят к краям */
      if (px>20 && px<80 && py<34) px = px<50 ? 1+px*.28 : 99-(100-px)*.28-4;
      m.style.setProperty('--x',px.toFixed(1)+'%');
      m.style.setProperty('--y',py.toFixed(1)+'%');
      m.style.setProperty('--sz',(30+rnd(i+80)*34).toFixed(0)+'px');
      m.style.setProperty('--r',((rnd(i+120)-.5)*28).toFixed(0)+'deg');
      m.style.setProperty('--dur',(7+rnd(i+160)*5).toFixed(1)+'s');
      m.style.setProperty('--dl',(-rnd(i+200)*9).toFixed(1)+'s');
      m.style.setProperty('--z',(6+rnd(i+240)*22).toFixed(0));
      m.style.setProperty('--c',c);
      m.innerHTML = shape ? shapes[(i/7|0)%3] : '<span class="blk">'+G[i%G.length]+'</span>';
      sky.appendChild(m);
    }
  }
  function mathIslands(hz){
    var abacus='<svg viewBox="0 0 120 84">'+ISLE+
      '<rect x="30" y="22" width="60" height="42" rx="4" fill="#FFF7E1" stroke="#B17A42" stroke-width="4"/>'+
      '<path d="M34 34H86M34 44H86M34 54H86" stroke="#B17A42" stroke-width="2.4"/>'+
      '<g fill="#FF6B5B"><circle cx="40" cy="34" r="4.6"/><circle cx="50" cy="34" r="4.6"/><circle cx="60" cy="34" r="4.6"/></g><g fill="#3FB088"><circle cx="76" cy="34" r="4.6"/><circle cx="84" cy="34" r="0"/></g>'+
      '<g fill="#FFC93C"><circle cx="40" cy="44" r="4.6"/><circle cx="50" cy="44" r="4.6"/><circle cx="72" cy="44" r="4.6"/><circle cx="82" cy="44" r="4.6"/></g>'+
      '<g fill="#5EC3E8"><circle cx="40" cy="54" r="4.6"/><circle cx="62" cy="54" r="4.6"/><circle cx="72" cy="54" r="4.6"/><circle cx="82" cy="54" r="4.6"/></g></svg>';
    var cubes='<svg viewBox="0 0 120 84">'+ISLE+
      '<g font-family="Baloo 2,sans-serif" font-weight="800" font-size="15" text-anchor="middle" fill="#fff">'+
      '<rect x="30" y="42" width="26" height="26" rx="4" fill="#FF6B5B"/><text x="43" y="62">1</text>'+
      '<rect x="62" y="42" width="26" height="26" rx="4" fill="#3FB088"/><text x="75" y="62">2</text>'+
      '<rect x="46" y="16" width="26" height="26" rx="4" fill="#5EC3E8" transform="rotate(-6 59 29)"/><text x="58" y="36" transform="rotate(-6 59 29)">3</text></g></svg>';
    var ruler='<svg viewBox="0 0 120 84">'+ISLE+
      '<rect x="51" y="14" width="18" height="52" rx="3" fill="#FFE08A" stroke="#E2B24A" stroke-width="3"/>'+
      '<path d="M51 22h7M51 30h5M51 38h7M51 46h5M51 54h7M51 62h5" stroke="#B88A1F" stroke-width="2"/>'+
      '<path d="M47 14 L60 3 L73 14Z" fill="#FF6B5B"/>'+
      '<ellipse class="s-glow" cx="60" cy="10" rx="22" ry="14" fill="#FFF3A8" opacity="0"/><circle cx="60" cy="9" r="3.4" fill="#FFF7C2"/></svg>';
    var pyr='<svg viewBox="0 0 120 84">'+ISLE+
      '<path d="M26 68 L58 22 L90 68Z" fill="#FFB35C"/><path d="M58 22 L90 68 L58 68Z" fill="#F29234"/>'+
      '<circle cx="100" cy="58" r="10" fill="#C77DD9"/><circle cx="97" cy="55" r="3.2" fill="#fff" opacity=".5"/></svg>';
    var set=[[ '0.5%', abacus,'far'],['24%',cubes,''],['66%',ruler,''],['89%',pyr,'far']];
    set.forEach(function(s,i){
      var d=$e('s-isl '+s[2]); d.style.left=s[0]; if(i%2) d.style.transform='translateY(2px) scale(.9)'; d.innerHTML=s[1]; hz.appendChild(d);
    });
  }
  function mathSea(sea){
    var cols=['#FF6B5B','#FFC93C','#3FB088','#C77DD9','#FF8A3D','#5EC3E8'];
    for (var i=0;i<7;i++){
      var b=$e('s-buoy',String(1+Math.floor(rnd(i+300)*9)));
      b.style.setProperty('--x',(6+rnd(i+310)*86).toFixed(1)+'%');
      b.style.setProperty('--y',(8+rnd(i+320)*42).toFixed(1)+'%');
      b.style.setProperty('--sz',(28+rnd(i+330)*14).toFixed(0)+'px');
      b.style.setProperty('--dur',(4.4+rnd(i+340)*2.4).toFixed(1)+'s');
      b.style.setProperty('--dl',(-rnd(i+350)*5).toFixed(1)+'s');
      b.style.setProperty('--c',cols[i%cols.length]);
      if (i>=4) b.className+=' opt';
      sea.appendChild(b);
    }
    var nl=$e('s-nl'); for (var n=0;n<=10;n++){ var sp=document.createElement('span'); sp.textContent=n; nl.appendChild(sp); }
    sea.appendChild(nl);
  }

  var THEMES = {
    math: { accent:'#FFC93C', sky:mathSky, islands:mathIslands, sea:mathSea }
  };
  var T = THEMES[key]; if (!T) return;
  document.body.style.setProperty('--sub', T.accent);

  /* слои */
  var deco=$e('s-deco'), sky=$e('s-sky'), hz=$e('s-hz'), haze=$e('s-haze');
  deco.appendChild(sky); deco.appendChild(haze); deco.appendChild(hz);
  var cl=bg.querySelector('.cl'); // небо рисуем перед облаками: знаки чуть позади
  bg.insertBefore(deco, cl || bg.querySelector('.w-sea'));
  var sea=bg.querySelector('.w-sea');
  T.sky(sky); T.islands(hz); if (T.sea && sea) T.sea(sea);

  /* лёгкий параллакс от курсора */
  if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var tx=0, ty=0, raf=0;
    window.addEventListener('pointermove',function(e){
      tx=(e.clientX/innerWidth-.5)*2; ty=(e.clientY/innerHeight-.5)*2;
      if(!raf) raf=requestAnimationFrame(function(){ raf=0; sky.style.setProperty('--px',tx.toFixed(3)); sky.style.setProperty('--py',ty.toFixed(3)); });
    },{passive:true});
  }
})();
