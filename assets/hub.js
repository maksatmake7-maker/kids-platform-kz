/* ===== Білім Аралы — архипелаг предметов =====
   Рисует страницу класса: Барсик + острова-предметы. Подключать после i18n.js, barsik.js, world.js.
   Страница задаёт список так:
     <div id="hub"></div>
     <script>window.HUB={ grade:1, dir:'ru', lang:'ru', tag:'rus_direction_title', back:'../../grade-picker.html?dir=ru',
        subjects:[ {id:'math', href:'math/index.html', art:'math', color:'#FFC93C', title:'math_title', desc:'math_desc', badge:'badge_play'}, … ] };</script>
   subject.soon:true — остров в тумане «скоро» (без ссылки).
   subject.keys:['count','addition',…] — ключи игр предмета (те же, что игры передают в recordGameResult).
   Прогресс (звёздочки) = сколько из этих игр уже пройдено хотя бы раз (isGameCompleted из progress.js).
   Если keys не заданы — полоска у острова не показывается.
   Для проверки без прохождения игр: открыть страницу с ?demo
   Необязательно: HUB.h2 / HUB.lead — ключи i18n для заголовка и подзаголовка (по умолчанию subjects_h2 / subjects_lead). */
(function(){
  'use strict';
  var C = window.HUB, root = document.getElementById('hub');
  if (!C || !root) return;
  var $ = function(s,r){ return (r||document).querySelector(s); }, $$ = function(s,r){ return [].slice.call((r||document).querySelectorAll(s)); };
  var F = "font-family=\"'Baloo 2',sans-serif\" font-weight=\"800\"";

  /* ---------- общая основа острова ---------- */
  function base(d){
    return '<ellipse cx="90" cy="118" rx="86" ry="20" fill="rgba(15,70,120,.16)"/>' +
      '<ellipse cx="90" cy="112" rx="82" ry="14" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"><animate attributeName="rx" values="80;88;80" dur="4.4s" begin="'+d+'s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;.15;.6" dur="4.4s" begin="'+d+'s" repeatCount="indefinite"/></ellipse>' +
      '<path d="M10 104 Q10 124 90 126 Q170 124 170 104 Q170 86 90 84 Q10 86 10 104Z" fill="#F6D9A0"/>' +
      '<path d="M10 104 Q10 124 90 126 Q170 124 170 104 Q168 115 90 117 Q12 115 10 104Z" fill="#E2B96E"/>' +
      '<ellipse cx="90" cy="100" rx="70" ry="16" fill="#7ED08C"/><ellipse cx="90" cy="98" rx="58" ry="10.5" fill="#9CE0A3" opacity=".75"/>' +
      '<g fill="#6BC07A"><ellipse cx="38" cy="104" rx="3" ry="1.4"/><ellipse cx="146" cy="103" rx="3.4" ry="1.5"/><ellipse cx="124" cy="108" rx="2.6" ry="1.2"/></g>';
  }
  function cube(x,y,s,col,t,rot){
    return '<g transform="translate('+x+' '+y+') rotate('+rot+')"><rect x="'+(-s/2)+'" y="'+(-s)+'" width="'+s+'" height="'+s+'" rx="5" fill="'+col+'"/>' +
      '<rect x="'+(-s/2)+'" y="'+(-s)+'" width="'+s+'" height="'+(s*.22)+'" rx="4" fill="#fff" opacity=".28"/>' +
      '<text x="0" y="'+(-s*.24)+'" text-anchor="middle" font-size="'+(s*.64)+'" fill="#fff" '+F+'>'+t+'</text></g>';
  }
  function note(x,y,c,r){
    return '<g transform="translate('+x+' '+y+') rotate('+(r||0)+')"><ellipse rx="5.4" ry="3.8" transform="rotate(-22)" fill="'+c+'"/><path d="M4.4 -1.4 V-19 Q11 -15 12 -9" fill="none" stroke="'+c+'" stroke-width="2.4" stroke-linecap="round"/></g>';
  }
  function flower(x,y,c){
    var p=''; for(var i=0;i<5;i++){ var a=i*72*Math.PI/180; p+='<circle cx="'+(Math.cos(a)*4.2).toFixed(1)+'" cy="'+(Math.sin(a)*4.2).toFixed(1)+'" r="3.1" fill="'+c+'"/>'; }
    return '<g transform="translate('+x+' '+y+')"><path d="M0 0 V12" stroke="#3E9B52" stroke-width="2"/>'+p+'<circle r="2.4" fill="#FFE27A"/></g>';
  }

  /* ---------- рисунки по предметам ---------- */
  var ART = {
    math: function(){
      return cube(66,100,31,'#FF6B5B','1',-6) + cube(100,100,31,'#3FB088','2',5) + cube(83,70,31,'#5EC3E8','3',-3) +
        '<g transform="translate(138 62)"><circle r="14" fill="#FFC93C"/><circle r="14" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M-6 0H6M0 -6V6" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><animateTransform attributeName="transform" type="translate" values="138 62;138 56;138 62" dur="3.2s" repeatCount="indefinite"/></g>' +
        '<g transform="translate(32 66)"><circle r="11" fill="#FFB020"/><path d="M-5 0H5" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></g>';
    },
    quest: function(){
      return '<rect x="40" y="50" width="100" height="62" rx="8" fill="#F6E7BF" stroke="#B9955A" stroke-width="3"/>' +
        '<path d="M50 90 C62 62 78 96 96 76 C110 62 122 66 130 58" fill="none" stroke="#E8584A" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round"/>' +
        '<circle cx="62" cy="84" r="5" fill="#FFC93C" stroke="#7A4620" stroke-width="1.5"/><circle cx="96" cy="76" r="5" fill="#FFC93C" stroke="#7A4620" stroke-width="1.5"/>' +
        '<g transform="translate(130 56)"><path d="M-9 8 L-9 -12 L9 -6 L-9 0" fill="#E8584A" stroke="#8E2F3A" stroke-width="1.6" stroke-linejoin="round"/><path d="M-9 8 V-14" stroke="#7A4620" stroke-width="2.4" stroke-linecap="round"/><animateTransform attributeName="transform" type="translate" values="130 56;130 51;130 56" dur="3s" repeatCount="indefinite"/></g>' +
        '<g transform="translate(44 40)"><polygon points="0,-9 2.6,-3 9,-2.4 4.2,2 5.6,8.6 0,5.2 -5.6,8.6 -4.2,2 -9,-2.4 -2.6,-3" fill="#FFC93C"><animateTransform attributeName="transform" type="rotate" values="-10;10;-10" dur="3.4s" repeatCount="indefinite"/></polygon></g>';
    },
    house: function(){
      return '<rect x="112" y="48" width="12" height="26" fill="#7A3B2E"/>' +
        '<g fill="#fff" opacity=".8"><circle cx="118" cy="40" r="5"><animate attributeName="cy" values="42;28" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="3s" repeatCount="indefinite"/></circle></g>' +
        '<rect x="52" y="66" width="76" height="38" fill="#FFF7E3" stroke="#7A3B2E" stroke-width="2.5"/>' +
        '<polygon points="44,68 90,32 136,68" fill="#E8584A" stroke="#8E2F3A" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<rect x="82" y="80" width="17" height="24" rx="3" fill="#7A3B2E"/><circle cx="95" cy="93" r="1.6" fill="#FFC93C"/>' +
        '<rect x="58" y="74" width="16" height="15" fill="#CFE6FA" stroke="#7A3B2E" stroke-width="2"/><path d="M66 74 V89 M58 81.5 H74" stroke="#7A3B2E" stroke-width="1.4"/>' +
        '<rect x="106" y="74" width="16" height="15" fill="#CFE6FA" stroke="#7A3B2E" stroke-width="2"/><path d="M114 74 V89 M106 81.5 H122" stroke="#7A3B2E" stroke-width="1.4"/>' +
        '<circle cx="90" cy="53" r="6.5" fill="#F8AE3F" stroke="#7A4620" stroke-width="1.6"/><circle cx="87.6" cy="52.4" r="1.1" fill="#3B2A1A"/><circle cx="92.4" cy="52.4" r="1.1" fill="#3B2A1A"/>' +
        '<g transform="translate(150 84)"><polygon points="0,-9 2.6,-3 9,-2.4 4.2,2 5.6,8.6 0,5.2 -5.6,8.6 -4.2,2 -9,-2.4 -2.6,-3" fill="#FFC93C"><animateTransform attributeName="transform" type="rotate" values="-8;8;-8" dur="3.2s" repeatCount="indefinite"/></polygon></g>';
    },
    read: function(){
      var lines=''; for(var i=0;i<4;i++){ lines+='<path d="M96 '+(74+i*5.5)+' L126 '+(69+i*5.5)+'" stroke="#CFDBE8" stroke-width="2" stroke-linecap="round"/>'; }
      return '<path d="M42 96 L90 103 L138 96 L138 58 L90 65 L42 58Z" fill="#E4503F"/>' +
        '<path d="M47 91 L88 97 L88 67 L47 61Z" fill="#fff"/><path d="M92 97 L133 91 L133 61 L92 67Z" fill="#FBFDFF"/>' + lines +
        '<text x="67" y="90" text-anchor="middle" font-size="30" fill="#FF6B5B" transform="rotate(5 67 80)" '+F+'>А</text>' +
        '<path d="M90 65 V103" stroke="#D1DCE8" stroke-width="2"/><path d="M110 64 V82 L114 78 L118 82 V62Z" fill="#FFC93C"/>' +
        '<g><circle cx="52" cy="40" r="11" fill="#5EC3E8"/><text x="52" y="45" text-anchor="middle" font-size="14" fill="#fff" '+F+'>Ә</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.4s" repeatCount="indefinite"/></g>' +
        '<g><circle cx="130" cy="36" r="11" fill="#3FB088"/><text x="130" y="41" text-anchor="middle" font-size="14" fill="#fff" '+F+'>Б</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="4s" repeatCount="indefinite"/></g>' +
        '<g><circle cx="92" cy="30" r="9" fill="#FFC93C"/><text x="92" y="35" text-anchor="middle" font-size="12" fill="#fff" '+F+'>Я</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3s" repeatCount="indefinite"/></g>';
    },
    lit: function(){
      return '<rect x="44" y="88" width="92" height="15" rx="3" fill="#7E62C0"/><rect x="50" y="73" width="80" height="15" rx="3" fill="#F2B84B"/><rect x="42" y="58" width="86" height="15" rx="3" fill="#4DC98F"/>' +
        '<path d="M52 95.5 H128 M58 80.5 H122 M50 65.5 H120" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M108 58 V72 L112 68 L116 72 V58Z" fill="#E4503F"/>' +
        '<g><path d="M86 30 L90 40 L101 41 L93 48 L95 59 L86 53 L77 59 L79 48 L71 41 L82 40Z" fill="#FFC93C"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.4s" repeatCount="indefinite"/></g>';
    },
    kaz: function(){
      var lat=''; for(var i=0;i<7;i++){ lat+='<path d="M'+(54+i*11)+' 76 L'+(65+i*11)+' 102 M'+(65+i*11)+' 76 L'+(54+i*11)+' 102" stroke="#CDB68A" stroke-width="1.4"/>'; }
      return '<rect x="52" y="74" width="76" height="28" rx="3" fill="#F5ECDA"/><g clip-path="url(#ycl)">'+lat+'</g><clipPath id="ycl"><rect x="52" y="74" width="76" height="28"/></clipPath>' +
        '<path d="M44 78 Q90 20 136 78Z" fill="#fff" stroke="#E3D8C2" stroke-width="2"/>' +
        '<path d="M60 64 Q90 38 120 64" fill="none" stroke="#5EC3E8" stroke-width="3.4" stroke-linecap="round"/>' +
        '<path d="M44 78 H136" stroke="#E4503F" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M52 78 l5 -4 l5 4 l5 -4 l5 4 l5 -4 l5 4 l5 -4 l5 4 l5 -4 l5 4 l5 -4 l5 4 l5 -4 l5 4" fill="none" stroke="#FFC93C" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M80 102 V90 Q90 80 100 90 V102Z" fill="#C0543F"/><circle cx="90" cy="92" r="2" fill="#FFC93C"/>' +
        '<circle cx="90" cy="38" r="7" fill="#fff" stroke="#E3D8C2" stroke-width="2"/><path d="M90 31 V45 M83 38 H97" stroke="#E3D8C2" stroke-width="1.6"/>' +
        '<path d="M90 31 V22" stroke="#8B5A2B" stroke-width="2"/><path d="M90 22 L102 25 L90 29Z" fill="#5EC3E8"><animateTransform attributeName="transform" type="skewY" values="0;-6;0" dur="2.4s" repeatCount="indefinite"/></path>' +
        flower(44,92,'#FF8FB0') + flower(142,94,'#FFC93C');
    },
    english: function(){
      return '<path d="M34 34 H112 V74 H78 L60 92 V74 H34Z" fill="#fff" stroke="#4C6FD8" stroke-width="4" stroke-linejoin="round"/>' +
        '<text x="73" y="63" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="26" fill="#4C6FD8">Hello!</text>' +
        '<g><rect x="108" y="64" width="32" height="30" rx="5" fill="#FF6B5B"/><text x="124" y="86" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="18" fill="#fff">ABC</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/></g>' +
        '<g><circle cx="46" cy="26" r="9" fill="#FFC93C"/><text x="46" y="31" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="12" fill="#fff">A</text><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3s" repeatCount="indefinite"/></g>' +
        flower(40,100,'#FF8FB0') + flower(150,98,'#FFC93C');
    },
    estestvo: function(){
      return '<rect x="86" y="58" width="9" height="44" rx="3" fill="#A9733D"/>' +
        '<g><circle cx="90" cy="46" r="27" fill="#4FB963"/><circle cx="70" cy="60" r="19" fill="#5CC46E"/><circle cx="111" cy="60" r="19" fill="#5CC46E"/><circle cx="82" cy="38" r="9" fill="#74D587" opacity=".7"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="-1 90 100;1.2 90 100;-1 90 100" dur="5s" repeatCount="indefinite"/></g>' +
        '<circle cx="78" cy="52" r="3.6" fill="#FF5B4D"/><circle cx="100" cy="42" r="3.6" fill="#FF5B4D"/><circle cx="108" cy="62" r="3.6" fill="#FF5B4D"/>' +
        flower(42,90,'#FF8FB0') + flower(54,95,'#FFC93C') + flower(138,92,'#C77DD9') +
        '<g transform="translate(130 80)"><ellipse rx="5" ry="3.6" fill="#E4503F"/><path d="M0 -3.6 V3.6" stroke="#222" stroke-width="1"/><circle cx="-1.6" cy="-1" r=".9" fill="#222"/><circle cx="1.8" cy="1" r=".9" fill="#222"/><animateTransform attributeName="transform" type="translate" values="130 80;118 84;130 80" dur="7s" repeatCount="indefinite"/></g>';
    },
    digital: function(){
      return '<rect x="55" y="40" width="70" height="48" rx="8" fill="#3B4A63"/><rect x="61" y="46" width="58" height="36" rx="4" fill="#5EC3E8"/>' +
        '<rect x="61" y="46" width="58" height="12" rx="4" fill="#fff" opacity=".22"/>' +
        '<circle cx="80" cy="62" r="3.4" fill="#fff"/><circle cx="100" cy="62" r="3.4" fill="#fff"/><path d="M78 71 Q90 80 102 71" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
        '<rect x="84" y="88" width="12" height="8" fill="#2E3A52"/><rect x="68" y="95" width="44" height="6" rx="3" fill="#3B4A63"/>' +
        '<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M76 28 Q90 18 104 28"><animate attributeName="opacity" values="1;.25;1" dur="2s" repeatCount="indefinite"/></path><path d="M82 34 Q90 28 98 34"><animate attributeName="opacity" values="1;.25;1" dur="2s" begin=".3s" repeatCount="indefinite"/></path></g><circle cx="90" cy="39" r="2.2" fill="#fff"/>' +
        '<rect x="132" y="86" width="14" height="9" rx="4.5" fill="#EAF3FB" stroke="#B9C9DB" stroke-width="1.5"/><rect x="36" y="88" width="20" height="8" rx="2" fill="#FFC93C"/><g fill="#fff" opacity=".8"><rect x="39" y="90" width="3" height="3"/><rect x="44" y="90" width="3" height="3"/><rect x="49" y="90" width="3" height="3"/></g>';
    },
    poznanie: function(){
      return '<g><g transform="rotate(-16 90 62)"><circle cx="90" cy="62" r="30" fill="#4DA8E8"/>' +
        '<path d="M72 48 Q82 40 92 48 Q86 58 94 64 Q86 76 78 70 Q70 60 72 48Z" fill="#6FCB7D"/><path d="M98 54 Q112 50 116 62 Q108 70 100 68Z" fill="#6FCB7D"/><path d="M96 78 Q106 76 108 84 Q100 88 96 84Z" fill="#6FCB7D"/>' +
        '<ellipse cx="90" cy="62" rx="12" ry="30" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.6"/><ellipse cx="90" cy="62" rx="30" ry="9" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/>' +
        '<path d="M70 44 Q76 38 84 36" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="-16 90 62;-9 90 62;-16 90 62" dur="6s" repeatCount="indefinite"/></g></g>' +
        '<path d="M56 62 Q56 100 90 100" fill="none" stroke="#B17A42" stroke-width="4.5" stroke-linecap="round"/><rect x="76" y="97" width="28" height="7" rx="3.5" fill="#B17A42"/>' +
        '<g transform="translate(128 54)"><path d="M0 0 V-16" stroke="#8B5A2B" stroke-width="2"/><path d="M0 -16 L12 -12 L0 -8Z" fill="#F0954C"/></g>';
    },
    muzyka: function(){
      var z=''; for(var i=0;i<7;i++){ z+='<path d="M'+(58+i*9.4)+' 78 L'+(63+i*9.4)+' 98 L'+(67+i*9.4)+' 80" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" opacity=".9"/>'; }
      return '<path d="M58 66 V94 Q90 112 122 94 V66Z" fill="#C77DD9"/><g clip-path="url(#dcl)">'+z+'</g><clipPath id="dcl"><path d="M58 70 V94 Q90 112 122 94 V70Z"/></clipPath>' +
        '<ellipse cx="90" cy="66" rx="32" ry="10" fill="#fff" stroke="#E4D3EC" stroke-width="2"/><path d="M58 66 Q90 80 122 66" fill="none" stroke="#9E57B5" stroke-width="3"/>' +
        '<g><path d="M66 36 L88 62" stroke="#B17A42" stroke-width="3.4" stroke-linecap="round"/><circle cx="65" cy="35" r="4.2" fill="#E4503F"/><path d="M114 36 L92 62" stroke="#B17A42" stroke-width="3.4" stroke-linecap="round"/><circle cx="115" cy="35" r="4.2" fill="#E4503F"/>' +
        '<animateTransform attributeName="transform" type="rotate" values="0 90 62;-3 90 62;0 90 62;3 90 62;0 90 62" dur="1.4s" repeatCount="indefinite"/></g>' +
        '<g><g>'+note(44,52,'#C77DD9',-8)+'</g><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3s" repeatCount="indefinite"/></g>' +
        '<g><g>'+note(140,44,'#FFC93C',8)+'</g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.6s" repeatCount="indefinite"/></g>' +
        '<g><g>'+note(128,24,'#5EC3E8',0)+'</g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/></g>';
    },
    izo: function(){
      return '<path d="M90 48 L64 104 M90 48 L116 104 M90 58 V104" stroke="#A9733D" stroke-width="4.5" stroke-linecap="round"/>' +
        '<rect x="62" y="36" width="56" height="42" rx="4" fill="#fff" stroke="#A9733D" stroke-width="3.4"/>' +
        '<rect x="66" y="40" width="48" height="34" rx="2" fill="#8FD6F5"/><circle cx="102" cy="50" r="6" fill="#FFD34D"/><path d="M66 74 V64 Q78 52 90 64 Q102 56 114 66 V74Z" fill="#6FCB7D"/>' +
        '<path d="M70 58 Q80 44 90 58" fill="none" stroke="#FF6B5B" stroke-width="2.4"/><path d="M73 58 Q80 48 87 58" fill="none" stroke="#FFC93C" stroke-width="2.4"/>' +
        '<rect x="58" y="78" width="64" height="5" rx="2.5" fill="#A9733D"/>' +
        '<g transform="translate(138 94)"><ellipse rx="17" ry="9" fill="#F5D7A1"/><circle cx="-7" cy="-2" r="3" fill="#FF6B5B"/><circle cx="0" cy="-4" r="3" fill="#5EC3E8"/><circle cx="7" cy="-2" r="3" fill="#FFC93C"/><circle cx="3" cy="3" r="3" fill="#3FB088"/><ellipse cx="-9" cy="3" rx="2.2" ry="1.6" fill="#9CE0A3"/></g>' +
        '<g><path d="M40 98 L52 72" stroke="#B17A42" stroke-width="3" stroke-linecap="round"/><path d="M52 72 L55 66" stroke="#E8618C" stroke-width="4" stroke-linecap="round"/></g>';
    },
    trud: function(){
      return '<rect x="86" y="64" width="8" height="38" rx="2" fill="#A9733D"/>' +
        '<rect x="66" y="32" width="48" height="36" rx="4" fill="#FFD98E"/><path d="M60 34 L90 12 L120 34Z" fill="#E4503F"/><path d="M60 34 L90 12 L120 34" fill="none" stroke="#B83B2D" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<circle cx="90" cy="48" r="8" fill="#5B4630"/><circle cx="90" cy="48" r="8" fill="none" stroke="#C99650" stroke-width="2.4"/><rect x="82" y="58" width="16" height="3.4" rx="1.7" fill="#A9733D"/>' +
        '<path d="M70 38 H78 M102 38 H110" stroke="#F0B860" stroke-width="2" stroke-linecap="round"/>' +
        '<g transform="translate(138 90) rotate(-28)"><rect x="-2.6" y="-4" width="5.2" height="24" rx="2" fill="#A9733D"/><rect x="-11" y="-12" width="22" height="9" rx="2.5" fill="#8EA0B5"/><rect x="-11" y="-12" width="22" height="3" rx="1.5" fill="#fff" opacity=".4"/></g>' +
        '<g transform="translate(44 98)"><path d="M0 0 L8 -8 L16 0Z" fill="#FF8FB0"/><rect x="2" y="0" width="12" height="5" fill="#FFC93C"/></g>';
    },
    fizra: function(){
      return '<rect x="113" y="42" width="5" height="60" rx="2" fill="#9AA9BA"/><rect x="92" y="28" width="38" height="28" rx="4" fill="#fff" stroke="#4DB6AC" stroke-width="3"/><rect x="103" y="39" width="16" height="12" rx="1.5" fill="none" stroke="#4DB6AC" stroke-width="2.2"/>' +
        '<ellipse cx="102" cy="58" rx="11" ry="3.6" fill="none" stroke="#FF8A3D" stroke-width="3"/><path d="M92 59 L96 72 M99 62 L100 74 M106 62 L105 74 M112 59 L108 72" stroke="#fff" stroke-width="1.4" opacity=".9"/>' +
        '<g><g transform="translate(60 88)"><circle r="14" fill="#FF8A3D"/><path d="M-14 0 H14 M0 -14 V14" stroke="#B8531A" stroke-width="1.8"/><path d="M-10 -10 Q0 0 -10 10 M10 -10 Q0 0 10 10" fill="none" stroke="#B8531A" stroke-width="1.8"/><circle r="14" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/></g>' +
        '<animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0;0 -4;0 0" dur="1.8s" repeatCount="indefinite"/></g>' +
        '<ellipse cx="60" cy="104" rx="12" ry="3" fill="rgba(20,70,50,.22)"/>' +
        '<g transform="translate(138 100)"><path d="M0 0 V-14" stroke="#8B5A2B" stroke-width="2"/><path d="M0 -14 L10 -10 L0 -6Z" fill="#4DB6AC"/></g>';
    },
    game: function(){
      var sp='',cab='',cols=['#FF6B5B','#FFC93C','#3FB088','#5EC3E8','#C77DD9','#FF8A3D','#E8618C','#7C9CFF'];
      for(var i=0;i<8;i++){ var a=i*45*Math.PI/180, x=90+Math.cos(a)*32, y=56+Math.sin(a)*32;
        sp+='<path d="M90 56 L'+x.toFixed(1)+' '+y.toFixed(1)+'" stroke="#7C9CFF" stroke-width="2"/>';
        cab+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="6" fill="'+cols[i]+'" stroke="#fff" stroke-width="1.8"/>'; }
      return '<path d="M90 56 L66 104 M90 56 L114 104" stroke="#8C6F4E" stroke-width="5" stroke-linecap="round"/><path d="M72 92 H108" stroke="#8C6F4E" stroke-width="3"/>' +
        '<g><circle cx="90" cy="56" r="32" fill="none" stroke="#7C9CFF" stroke-width="3.4"/><circle cx="90" cy="56" r="20" fill="none" stroke="#7C9CFF" stroke-width="1.6" opacity=".6"/>'+sp+cab+
        '<animateTransform attributeName="transform" type="rotate" from="0 90 56" to="360 90 56" dur="36s" repeatCount="indefinite"/></g>' +
        '<circle cx="90" cy="56" r="6" fill="#FFC93C" stroke="#fff" stroke-width="2"/>' +
        '<path d="M90 12 l3.2 6.6 7.2 1 -5.2 5 1.2 7.1 -6.4 -3.4 -6.4 3.4 1.2 -7.1 -5.2 -5 7.2 -1z" fill="#FFC93C"><animateTransform attributeName="transform" type="rotate" values="-8 90 20;8 90 20;-8 90 20" dur="3s" repeatCount="indefinite"/></path>' +
        '<g transform="translate(40 96)"><rect x="-8" y="-8" width="16" height="12" rx="3" fill="#FF6B5B"/><circle cx="0" cy="-10" r="3.6" fill="#FF6B5B"/></g>';
    }
  };

  var LOCK='<span class="lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>';
  var STAR='<svg viewBox="0 0 24 24"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';

  /* ---------- прогресс ---------- */
  var DEMO={math:[11,17],read:[3,12],kaz:[2,9],estestvo:[15,15],digital:[0,0],poznanie:[4,14],muzyka:[1,6]};
  function progress(id){
    var s=null; C.subjects.forEach(function(x){ if(x.id===id) s=x; });
    if(/[?&]demo/.test(location.search) && DEMO[id] && DEMO[id][1]>0) return {done:DEMO[id][0], total:DEMO[id][1]};
    if(!s || !s.keys || !s.keys.length || typeof isGameCompleted!=='function') return null;
    var n=0; s.keys.forEach(function(k){ try{ if(isGameCompleted(k)) n++; }catch(e){} });
    return {done:n, total:s.keys.length};
  }

  /* кнопка «Подарок дня» (страница gift/ в корне сайта; «Дом Барсика» живёт только в верхнем ряду быстрых кнопок, assets/quick.js; получен ли подарок сегодня — из localStorage 'bilim_gift_v1').
     Название дома — на языке страницы (те же слова, что в assets/house-i18n.js); подарок дня пока только на русском, на других языках его прячет CSS. */
  function giftChip(){
    var got=false; try{ var g=JSON.parse(localStorage.getItem('bilim_gift_v1')), d=new Date(), k=d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2); got=!!(g&&g.days&&g.days[k]); }catch(e){}
    return '<div class="hub-chips"><a class="hub-gift hub-gift-ru'+(got?' got':'')+'" href="'+(C.giftHref||'../../gift/index.html')+'"><i aria-hidden="true"></i><span>Подарок дня</span><em>'+(got?'получен':'новый')+'</em></a></div>';
  }


  /* плитка «Квесты Барсика» (subject.quest): название и описание на языке страницы (те же слова, что в assets/quest-data.js), ссылка ведёт на задания именно этого класса */
  var QT={
    ru:['Квесты Барсика','Приключения с задачками для твоего класса'], kz:['Барсик квесттері','Сыныбыңа лайық тапсырмалы шытырман оқиғалар'],
    en:["Barsik's Quests",'Adventures with puzzles for your grade'], zh:['巴雷斯的冒险','适合你年级的解谜冒险'],
    uz:['Барсик квестлари','Синфингга мос топшириқли саргузашт'], tg:['Квестҳои Барсик','Саргузашт бо масъалаҳо барои синфи ту'],
    ug:['بارىسنىڭ سەرگۈزەشتىلىرى','سىنىپىڭىزغا ماس تاپشۇرۇقلۇق سەرگۈزەشت']
  };
  function syncQuest(l){
    l=l||document.documentElement.getAttribute('data-current')||C.lang||'ru'; var t=QT[l]||QT.ru;
    $$('[data-qt]',root).forEach(function(e){ e.textContent=t[e.getAttribute('data-qt')==='t'?0:1]; });
    $$('a[data-quest]',root).forEach(function(a){ a.href=a.getAttribute('data-base')+'&lang='+l; });
  }

  /* ---------- сборка страницы ---------- */
  var kz=C.dir==='kz';
  var html='<div class="hub-intro"><div class="hub-bs" aria-hidden="true"><span class="islet"></span><span class="bsw" id="hubBs"></span></div>' +
    '<div class="hub-tx"><span class="grade-tag dirtag" style="--flag:'+(kz?'#3FB088':'#FF6B5B')+'"><i></i><span data-i18n="'+C.tag+'"></span></span>' +
    '<h2 data-i18n="'+(C.h2||'subjects_h2')+'"></h2><p class="lead" data-i18n="'+(C.lead||'subjects_lead')+'"></p>'+giftChip()+'</div></div>';
  function cards(list){ list.forEach(function(s,i){
    var soon=!!s.soon, d=(-(i%5)*0.9).toFixed(1);
    if(s.quest){ s.titleText='<span data-qt="t"></span>'; s.descText='<span data-qt="d"></span>'; }
    html+='<a class="hi '+(soon?'fog':'ready')+'" '+(soon?'href="#" aria-disabled="true" tabindex="-1"':'href="'+s.href+'"')+(s.quest?' data-quest="1" data-base="'+s.href+'"':'')+' data-id="'+s.id+'" style="--c:'+s.color+';--d:'+d+'s">' +
      '<span class="hi-art"><svg class="art" viewBox="0 0 180 140" aria-hidden="true">'+base(d)+(ART[s.art]?ART[s.art]():'')+'</svg><span class="fogc"></span>'+LOCK+'</span>' +
      '<span class="hi-plate">'+(s.titleText?'<h3>'+s.titleText+'</h3>':'<h3 data-i18n="'+s.title+'"></h3>')+(s.descText?'<p>'+s.descText+'</p>':'<p data-i18n="'+s.desc+'"></p>')+
      '<span class="hi-prog"><i class="bar"><b></b></i><span class="st">'+STAR+STAR+STAR+'</span></span>' +
      (s.badgeText&&!soon?'<span class="badge">'+s.badgeText+'</span>':'<span class="badge" data-i18n="'+(soon?'grade_picker_coming_soon':(s.badge||'badge_play'))+'"></span>')+'</span></a>';
  }); }
  /* «Квесты Барсика» — отдельной плиткой над предметами, чтобы не смешивались с уроками и задачками */
  var QS=C.subjects.filter(function(s){ return s.quest; }), RS=C.subjects.filter(function(s){ return !s.quest; });
  if(QS.length){ html+='<div class="hub-archi hub-quest">'; cards(QS); html+='</div>'; }
  html+='<div class="hub-archi">'; cards(RS);
  html+='</div>';
  root.className='hub'; root.innerHTML=html;

  function fillProgress(){
    $$('.hi',root).forEach(function(a){
      if(a.classList.contains('fog')) return;
      var p=progress(a.getAttribute('data-id')); if(!p) return;
      var f=Math.max(0,Math.min(1,p.done/p.total));
      a.classList.add('has-prog');
      a.querySelector('.hi-plate').setAttribute('title',p.done+' / '+p.total);
      setTimeout(function(){
        a.querySelector('.bar b').style.width=(f*100)+'%';
        var st=$$('.st svg',a); st.forEach(function(x,k){ x.classList.toggle('on', f>=(k+1)/3-0.001 || (k===0&&f>0&&f>=1/6)); });
      },250);
    });
  }

  /* подпись «назад» (в i18n.js такой фразы нет) */
  var BACK={ru:'← К выбору класса',kz:'← Сыныпты таңдау',en:'← Choose grade',zh:'← 选择年级',uz:'← Sinfni tanlash',tg:'← Интихоби синф',ug:'← سىنىپ تاللاش'};
  var back=document.getElementById('hubBack');
  function setBack(l){ if(back) back.textContent=BACK[l]||BACK.ru; }
  var _al=window.applyLang; window.applyLang=function(l){ var r=_al.apply(this,arguments); setBack(l); syncQuest(l); return r; };

  /* Барсик: стоит на своём островке, следит за курсором, внешность по классу */
  if(window.Barsik){ try{ Barsik.mount(document.getElementById('hubBs'),{grade:C.grade||1,track:true}); }catch(e){} }

  document.addEventListener('DOMContentLoaded',function(){
    applyLang((C.lang && C.lang!=='ru') ? C.lang : (savedLang()||'ru'));   /* казахский хаб — по-казахски, русский — на запомненном языке */
    syncQuest();
    fillProgress();
  });
})();
