/* ===== Білім Аралы — анимированный Барсик (рисунок кодом: SVG + CSS) =====
   Подключение: <script src="…/assets/barsik.js"></script>
   Использование:
     var b = Barsik.mount(document.getElementById('куда'));
     b.talk(true / false)        — говорит (рот двигается)
     b.react('happy', 1400)      — временное состояние, потом возвращается к основному
     b.set('cheer')              — основное состояние
   Состояния: idle, happy, oops, think, cheer, wave
*/
(function(){
  'use strict';
  var CSS = [
    '.bs{display:block;width:100%;height:auto;overflow:visible;}',
    '.bs *{transform-box:view-box;}',
    '.bs-all{transform-origin:100px 205px;}',
    '.bs-bodyg{transform-origin:100px 205px;animation:bsBreath 3.4s ease-in-out infinite;}',
    '.bs-head{transform-origin:100px 150px;animation:bsHead 5s ease-in-out infinite;}',
    '.bs-tail{transform-origin:150px 178px;animation:bsTail 2.6s ease-in-out infinite;}',
    '.bs-ear{animation:bsEar 7s ease-in-out infinite;}',
    '.bs-earR{transform-origin:150px 62px;} .bs-earL{transform-origin:50px 62px;animation-delay:.4s;}',
    '.bs-lid{animation:bsBlink 4.8s infinite;}',
    '.bs-pupils{transition:transform .35s ease;}',
    '.bs-armL{transform-origin:64px 156px;transition:transform .45s ease;} .bs-armR{transform-origin:136px 156px;transition:transform .45s ease;}',
    '.bs-happyeyes,.bs-brows,.bs-sad,.bs-q,.bs-spark,.bs-open{opacity:0;}',
    '.bs-blush{opacity:0;transition:opacity .3s;}',
    '.bs-head,.bs-all{transition:transform .35s ease;}',
    /* говорит */
    '.bs-talk .bs-open{animation:bsOpen .36s steps(1,end) infinite;}',
    '.bs-talk .bs-closed{animation:bsClosed .36s steps(1,end) infinite;}',
    '.bs-talk .bs-head{animation:bsNod .72s ease-in-out infinite;}',
    /* радость */
    '.bs[data-state=happy] .bs-all{animation:bsJump .55s ease-out 2;}',
    '.bs[data-state=happy] .bs-eyes,.bs[data-state=cheer] .bs-eyes{opacity:0;}',
    '.bs[data-state=happy] .bs-happyeyes,.bs[data-state=cheer] .bs-happyeyes{opacity:1;}',
    '.bs[data-state=happy] .bs-open,.bs[data-state=cheer] .bs-open{opacity:1;animation:none;}',
    '.bs[data-state=happy] .bs-closed,.bs[data-state=cheer] .bs-closed{opacity:0;animation:none;}',
    '.bs[data-state=happy] .bs-blush,.bs[data-state=cheer] .bs-blush{opacity:.6;}',
    '.bs[data-state=happy] .bs-spark,.bs[data-state=cheer] .bs-spark{opacity:1;animation:bsSpark 1s ease-in-out infinite;}',
    '.bs[data-state=happy] .bs-armR{transform:rotate(-35deg);}',
    '.bs[data-state=cheer] .bs-all{animation:bsJump .8s ease-out infinite;}',
    '.bs[data-state=cheer] .bs-armR{transform:rotate(-140deg) scale(1.3);} .bs[data-state=cheer] .bs-armL{transform:rotate(140deg) scale(1.3);}',
    /* ой */
    '.bs[data-state=oops] .bs-head{animation:none;transform:rotate(-7deg) translateY(3px);}',
    '.bs[data-state=oops] .bs-brows{opacity:1;}',
    '.bs[data-state=oops] .bs-closed{opacity:0;animation:none;} .bs[data-state=oops] .bs-sad{opacity:1;}',
    '.bs[data-state=oops] .bs-pupils{transform:translate(0,3px);}',
    /* думает */
    '.bs[data-state=think] .bs-head{animation:none;transform:rotate(5deg);}',
    '.bs[data-state=think] .bs-pupils{transform:translate(4px,-4px);}',
    '.bs[data-state=think] .bs-q{opacity:1;animation:bsQ 1.2s ease-in-out infinite;}',
    '.bs[data-state=think] .bs-armR{transform:rotate(-20deg);}',
    /* машет */
    '.bs[data-state=wave] .bs-armR{animation:bsWave .5s ease-in-out infinite alternate;}',
    '.bs[data-state=wave] .bs-open{opacity:1;animation:none;} .bs[data-state=wave] .bs-closed{opacity:0;animation:none;}',
    '.bs[data-state=wave] .bs-blush{opacity:.35;}',
    '@keyframes bsBreath{0%,100%{transform:scaleY(1);}50%{transform:scaleY(1.025);}}',
    '@keyframes bsHead{0%,100%{transform:rotate(0) translateY(0);}30%{transform:rotate(1.6deg) translateY(-1px);}70%{transform:rotate(-1.6deg) translateY(1px);}}',
    '@keyframes bsNod{0%,100%{transform:translateY(0);}50%{transform:translateY(2.5px);}}',
    '@keyframes bsTail{0%,100%{transform:rotate(-9deg);}50%{transform:rotate(11deg);}}',
    '@keyframes bsEar{0%,90%,100%{transform:rotate(0);}93%{transform:rotate(-7deg);}96%{transform:rotate(3deg);}}',
    '@keyframes bsBlink{0%,92%,100%{transform:scaleY(0);}94%,96%{transform:scaleY(1);}}',
    '@keyframes bsOpen{0%{opacity:1;}50%{opacity:0;}}',
    '@keyframes bsClosed{0%{opacity:0;}50%{opacity:1;}}',
    '@keyframes bsJump{0%{transform:translateY(0);}40%{transform:translateY(-14px) scale(1.03);}100%{transform:translateY(0);}}',
    '@keyframes bsSpark{0%,100%{transform:scale(.6) rotate(0);opacity:.4;}50%{transform:scale(1.15) rotate(25deg);opacity:1;}}',
    '@keyframes bsQ{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}',
    '@keyframes bsWave{from{transform:rotate(-110deg) scale(1.3);}to{transform:rotate(-150deg) scale(1.3);}}',
    '@media (prefers-reduced-motion:reduce){.bs *{animation:none !important;}}'
  ].join('\n');

  var uid = 0, injected = false;
  function inject(){ if (injected) return; injected = true; var s = document.createElement('style'); s.setAttribute('data-barsik', ''); s.textContent = CSS; document.head.appendChild(s); }

  function star(cx, cy, r, color, cls){
    var p = [cx, cy - r, cx + r * .3, cy - r * .3, cx + r, cy, cx + r * .3, cy + r * .3, cx, cy + r, cx - r * .3, cy + r * .3, cx - r, cy, cx - r * .3, cy - r * .3].join(' ');
    return '<polygon class="bs-spark" style="transform-origin:' + cx + 'px ' + cy + 'px;animation-delay:' + (cls || 0) + 's" points="' + p + '" fill="' + color + '"/>';
  }

  function svg(id){
    var g = function(n){ return 'bs' + id + n; };
    var W = '#FFF7E3', INK = '#3B2A1A', SPOT = '#7A4620';
    return '<svg class="bs" viewBox="0 0 200 215" role="img" aria-label="Барсик" data-state="idle">' +
      '<defs>' +
        '<radialGradient id="' + g('f') + '" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#FFD27A"/><stop offset=".7" stop-color="#F8AE3F"/><stop offset="1" stop-color="#EE9524"/></radialGradient>' +
        '<linearGradient id="' + g('b') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8AE3F"/><stop offset="1" stop-color="#EE9524"/></linearGradient>' +
      '</defs>' +
      '<g class="bs-all">' +
      /* хвост */
      '<g class="bs-tail"><path d="M148 180 C186 178 198 140 180 112" fill="none" stroke="#EE9524" stroke-width="15" stroke-linecap="round"/>' +
        '<path d="M170 162 l9 -4 M178 147 l10 -2 M180 131 l10 1" stroke="' + SPOT + '" stroke-width="4" stroke-linecap="round"/><circle cx="180" cy="112" r="8.5" fill="' + SPOT + '"/></g>' +
      '<g class="bs-bodyg">' +
        /* туловище */
        '<ellipse cx="100" cy="172" rx="50" ry="38" fill="url(#' + g('b') + ')"/>' +
        '<ellipse cx="100" cy="182" rx="29" ry="25" fill="' + W + '"/>' +
        '<g fill="' + SPOT + '"><ellipse cx="66" cy="160" rx="5" ry="4"/><ellipse cx="136" cy="158" rx="5" ry="4"/><ellipse cx="74" cy="178" rx="4" ry="3"/><ellipse cx="128" cy="180" rx="4" ry="3"/><ellipse cx="60" cy="178" rx="3.5" ry="3"/></g>' +
        /* лапки-ноги */
        '<ellipse cx="74" cy="206" rx="19" ry="9" fill="#F8AE3F"/><ellipse cx="126" cy="206" rx="19" ry="9" fill="#F8AE3F"/>' +
        '<path d="M66 208 v-5 M74 209 v-6 M82 208 v-5 M118 208 v-5 M126 209 v-6 M134 208 v-5" stroke="' + SPOT + '" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>' +
      '</g>' +
      /* голова */
      '<g class="bs-head">' +
        '<g class="bs-ear bs-earL"><circle cx="48" cy="54" r="23" fill="#F8AE3F"/><circle cx="49" cy="57" r="13" fill="#FFB4A8"/><path d="M30 44 Q38 34 50 34" stroke="' + SPOT + '" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>' +
        '<g class="bs-ear bs-earR"><circle cx="152" cy="54" r="23" fill="#F8AE3F"/><circle cx="151" cy="57" r="13" fill="#FFB4A8"/><path d="M170 44 Q162 34 150 34" stroke="' + SPOT + '" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>' +
        '<ellipse cx="100" cy="94" rx="66" ry="57" fill="url(#' + g('f') + ')"/>' +
        /* пятнышки */
        '<g fill="' + SPOT + '"><ellipse cx="100" cy="44" rx="4.5" ry="6"/><ellipse cx="85" cy="48" rx="4" ry="5.5" transform="rotate(-18 85 48)"/><ellipse cx="115" cy="48" rx="4" ry="5.5" transform="rotate(18 115 48)"/>' +
        '<ellipse cx="42" cy="100" rx="4" ry="3.2"/><ellipse cx="48" cy="114" rx="3.4" ry="2.8"/><ellipse cx="158" cy="100" rx="4" ry="3.2"/><ellipse cx="152" cy="114" rx="3.4" ry="2.8"/>' +
        '<ellipse cx="62" cy="52" rx="3.2" ry="4" transform="rotate(-30 62 52)"/><ellipse cx="138" cy="52" rx="3.2" ry="4" transform="rotate(30 138 52)"/></g>' +
        /* мордочка */
        '<ellipse cx="100" cy="116" rx="32" ry="23" fill="' + W + '"/><circle cx="86" cy="118" r="15" fill="' + W + '"/><circle cx="114" cy="118" r="15" fill="' + W + '"/>' +
        '<g fill="' + SPOT + '" opacity=".55"><circle cx="82" cy="116" r="1.5"/><circle cx="88" cy="121" r="1.5"/><circle cx="118" cy="116" r="1.5"/><circle cx="112" cy="121" r="1.5"/></g>' +
        /* румянец */
        '<ellipse class="bs-blush" cx="56" cy="106" rx="11" ry="6.5" fill="#FF8FA3"/><ellipse class="bs-blush" cx="144" cy="106" rx="11" ry="6.5" fill="#FF8FA3"/>' +
        /* глаза */
        '<g class="bs-eyes">' +
          '<ellipse cx="72" cy="86" rx="16" ry="18" fill="#fff" stroke="' + INK + '" stroke-width="2"/><ellipse cx="128" cy="86" rx="16" ry="18" fill="#fff" stroke="' + INK + '" stroke-width="2"/>' +
          '<g class="bs-pupils"><circle cx="73" cy="88" r="11" fill="#8DB23F"/><circle cx="73" cy="88" r="6.5" fill="' + INK + '"/><circle cx="69" cy="83" r="3.4" fill="#fff"/><circle cx="77" cy="92" r="1.6" fill="#fff"/>' +
          '<circle cx="127" cy="88" r="11" fill="#8DB23F"/><circle cx="127" cy="88" r="6.5" fill="' + INK + '"/><circle cx="123" cy="83" r="3.4" fill="#fff"/><circle cx="131" cy="92" r="1.6" fill="#fff"/></g>' +
          '<ellipse class="bs-lid" style="transform-origin:72px 68px" cx="72" cy="86" rx="17" ry="19" fill="#F6A93B"/><ellipse class="bs-lid" style="transform-origin:128px 68px" cx="128" cy="86" rx="17" ry="19" fill="#F6A93B"/>' +
        '</g>' +
        '<g class="bs-happyeyes" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"><path d="M57 92 Q72 72 87 92"/><path d="M113 92 Q128 72 143 92"/></g>' +
        '<g class="bs-brows" stroke="' + SPOT + '" stroke-width="4.5" stroke-linecap="round"><path d="M56 66 L88 58"/><path d="M112 58 L144 66"/></g>' +
        /* нос и рот */
        '<path d="M91 103 Q100 98 109 103 Q105 112 100 113 Q95 112 91 103Z" fill="#E5707F"/><ellipse cx="97" cy="103" rx="2.6" ry="1.4" fill="#fff" opacity=".6"/>' +
        '<g class="bs-closed" fill="none" stroke="#7A3B2E" stroke-width="2.6" stroke-linecap="round"><path d="M100 113 V119"/><path d="M100 119 Q93 128 85 121"/><path d="M100 119 Q107 128 115 121"/></g>' +
        '<g class="bs-open"><path d="M86 118 Q100 146 114 118 Q100 124 86 118Z" fill="#8E2F3A" stroke="#7A3B2E" stroke-width="2" stroke-linejoin="round"/><ellipse cx="100" cy="132" rx="7" ry="4.5" fill="#F18AA0"/><path d="M100 113 V119" stroke="#7A3B2E" stroke-width="2.6" stroke-linecap="round"/></g>' +
        '<g class="bs-sad" fill="none" stroke="#7A3B2E" stroke-width="2.6" stroke-linecap="round"><path d="M100 113 V119"/><path d="M88 128 Q100 117 112 128"/></g>' +
        /* усы */
        '<g stroke="' + SPOT + '" stroke-width="1.7" stroke-linecap="round" opacity=".55"><path d="M72 117 L32 108"/><path d="M72 122 L30 124"/><path d="M74 127 L36 140"/><path d="M128 117 L168 108"/><path d="M128 122 L170 124"/><path d="M126 127 L164 140"/></g>' +
      '</g>' +
      /* передние лапы (поверх головы, чтобы поднятые были видны) */
        '<g class="bs-armL"><ellipse cx="62" cy="170" rx="12" ry="24" fill="url(#' + g('b') + ')" transform="rotate(14 62 170)"/><ellipse cx="57" cy="192" rx="12" ry="9" fill="#FFE4A8"/><path d="M52 194 v-4 M57 195 v-5 M62 194 v-4" stroke="' + SPOT + '" stroke-width="1.6" stroke-linecap="round" opacity=".6"/></g>' +
        '<g class="bs-armR"><ellipse cx="138" cy="170" rx="12" ry="24" fill="url(#' + g('b') + ')" transform="rotate(-14 138 170)"/><ellipse cx="143" cy="192" rx="12" ry="9" fill="#FFE4A8"/><path d="M138 194 v-4 M143 195 v-5 M148 194 v-4" stroke="' + SPOT + '" stroke-width="1.6" stroke-linecap="round" opacity=".6"/></g>' +
      /* искры и вопрос */
      star(30, 26, 9, '#FFD34D', 0) + star(174, 22, 11, '#FFD34D', .25) + star(188, 70, 7, '#FF8FA3', .5) + star(14, 78, 7, '#7BC8FF', .75) +
      '<text class="bs-q" x="160" y="40" font-family="Baloo 2, Arial, sans-serif" font-weight="800" font-size="40" fill="#1D3557" style="transform-origin:160px 30px">?</text>' +
      '</g></svg>';
  }

  window.Barsik = {
    mount: function(el, opts){
      inject();
      el.innerHTML = svg(uid++);
      var node = el.querySelector('svg'), base = (opts && opts.state) || 'idle', timer = null;
      node.setAttribute('data-state', base);
      return {
        el: node,
        set: function(state){ base = state; clearTimeout(timer); timer = null; node.setAttribute('data-state', state); },
        react: function(state, ms){ clearTimeout(timer); node.setAttribute('data-state', state); timer = setTimeout(function(){ timer = null; node.setAttribute('data-state', base); }, ms || 1400); },
        base: function(state){ base = state; if (!timer) node.setAttribute('data-state', state); },
        talk: function(on){ node.classList.toggle('bs-talk', !!on); }
      };
    }
  };
})();
