/* ===== Білім Аралы — «Музыкальные инструменты: Узнай и послушай» (v3) =====
   Музыка, 1 класс (базовое содержание программы: фортепиано, скрипка, домбра, конырау и детские шумовые инструменты ксилофон, барабан, треугольник, маракасы, бубен). Те же 9 инструментов, что в прежней игре. Уровни: картинка → название / название → картинка → послушай и найди (звуки синтезированные) / шумовые и остальные.
   «Приключения Барсика»: движок games/mathx.js + голос games/mathx-voice.js + заставка games/mathx-hero.js
   подгружаются сами — страницу менять не надо. Режим освоения: 10 заданий подряд без ошибки.
*/
window.__mxHeroCfg = {theme:'night',icons:['🎹','🥁','🎻']};
(function(){
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[^\/]*$/, '') : '../../../games/';
  window.__mxBase = window.__mxBase || base;
  function load(src, cb){ var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  if(!window.__mxLoad){
    var waiting = [], done = false, chain = [];
    if(!window.Barsik) chain.push(base + '../assets/barsik.js');
    chain.push(base + 'mathx-voice.js'); chain.push(base + 'mathx.js'); chain.push(base + 'mathx-hero.js');
    chain.slice().forEach(function(u){ try { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'script'; l.href = u; document.head.appendChild(l); } catch(e){} });
    (function next(){
      if(!chain.length){ done = true; try { if(window.MXHero) (document.readyState === 'loading' ? document.addEventListener.bind(document, 'DOMContentLoaded') : function(f){ f(); })(MXHero.init); } catch(e){} waiting.forEach(function(f){ f(); }); waiting = []; return; }
      load(chain.shift(), next);
    })();
    window.__mxLoad = function(cb){ if(done) cb(); else waiting.push(cb); };
  }
})();
function initInstrumentsGame(containerId){
  __mxLoad(function(){
    var M = MX, rnd = M.rnd, pick = M.pick, V = MXV, shuffle = M.shuffle;
    function S(sig, t){ t.sig = sig; return t; }
    function F(){ return V.F[V.lang()]; }
    function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }
    function nm(k){ var t = msgs()['item_' + (k === 'triangle' ? 'triangle_instr' : k)]; return t || F()['in_' + k]; }

    var BROWN = '#B08050', INK = '#1D3557';
    /* 9 инструментов из прежней игры (программа по музыке, 1 класс): значки: эмодзи или собственные SVG */
    var SVG = {
      dombra:'<g transform="translate(5,5) rotate(19) scale(.93)"><g transform="scale(1,.88)"><path d="M52,-3.6 C62,-7 75,-16 88,-15.2 C98.5,-14.6 102,-6 101,0 C102,7 98.5,16 88,17 C75,18 62,8.5 52,5 Z" fill="#4A1C12"/><path d="M52,-4.5 C62,-8 75,-17 88,-16 C98,-15 101,-6 100,0 C101,6 98,15 88,16 C75,17 62,8 52,4.5 Z" fill="#E9C26E" stroke="#5B2415" stroke-width="1.6" stroke-linejoin="round"/><path d="M60,-9 C75,-12 90,-12 97,-7 M58,-5 C75,-8 92,-8 98,-3 M58,-1 L99,-1 M58,3 C75,5 92,5 98,3 M60,7 C75,9 90,10 96,7" fill="none" stroke="#C99A45" stroke-width=".45" opacity=".6"/><path d="M52,-4.5 C58,-6.5 66,-11 74,-14.2 C78,-11 77,-6 72,-3.5 C68,-1.5 66,3 69,6.5 C63,6 56,5.2 52,4.5 Z" fill="#5B2415"/><path d="M56,-3 C60,-6 63,-5.5 65,-9 M62,-1.5 C66,-3.5 70,-3 72,-8 M58,2.5 C62,3 64,2 65,4.5" fill="none" stroke="#F0C96A" stroke-width="1.1" stroke-linecap="round"/><ellipse cx="73.5" cy="1" rx="2.3" ry="1.7" fill="#2A1008"/><rect x="85" y="-2.2" width="2.6" height="4.4" rx=".6" fill="#FFF6DD" stroke="#D9C79A" stroke-width=".3"/><path d="M93.5,3 C93,0 96,-1.6 99,0.6 C100,3 98.4,5.6 95.5,5.6 C94,5.4 93.6,4.2 93.5,3 Z" fill="#5B2415" stroke="#F0C96A" stroke-width=".5"/><circle cx="100.2" cy="0.4" r="1.2" fill="#E96A8C"/></g><rect x="8" y="-2.3" width="52" height="4.6" rx="1" fill="#4A1C12"/><g stroke="#F4EBD6" stroke-width=".5"><line x1="15" y1="-2.3" x2="15" y2="2.3"/><line x1="20" y1="-2.3" x2="20" y2="2.3"/><line x1="25" y1="-2.3" x2="25" y2="2.3"/><line x1="29.6" y1="-2.3" x2="29.6" y2="2.3"/><line x1="34" y1="-2.3" x2="34" y2="2.3"/><line x1="38" y1="-2.3" x2="38" y2="2.3"/><line x1="42" y1="-2.3" x2="42" y2="2.3"/><line x1="45.7" y1="-2.3" x2="45.7" y2="2.3"/><line x1="49.2" y1="-2.3" x2="49.2" y2="2.3"/><line x1="52.5" y1="-2.3" x2="52.5" y2="2.3"/></g><path d="M0,-.8 C-.8,-2.6 1,-3.8 3,-3 C5,-2.5 7.5,-2.6 9.6,-2.3 L9.6,2.3 C7.5,2.6 5,2.5 3,3 C1,3.8 -.8,2.6 0,.8 Z" fill="#4A1C12"/><circle cx="2.6" cy="-3.9" r="1.1" fill="#E96A8C"/><circle cx="5.2" cy="4.0" r="1.1" fill="#E96A8C"/><line x1="9" y1="-.8" x2="86" y2="-.8" stroke="#F4EBD6" stroke-width=".42"/><line x1="9" y1=".8" x2="86" y2=".8" stroke="#F4EBD6" stroke-width=".42"/></g>',
      tambourine:'<circle cx="50" cy="30" r="24" fill="none" stroke="' + BROWN + '" stroke-width="5"/><circle cx="50" cy="6" r="3" fill="#FFC93C"/><circle cx="74" cy="30" r="3" fill="#FFC93C"/><circle cx="50" cy="54" r="3" fill="#FFC93C"/><circle cx="26" cy="30" r="3" fill="#FFC93C"/>',
      xylophone:'<rect x="8" y="46" width="84" height="10" rx="3" fill="' + BROWN + '"/><rect x="10" y="6" width="66" height="7" rx="3" fill="#FF6B5B"/><rect x="10" y="15" width="57" height="7" rx="3" fill="#FFC93C"/><rect x="10" y="24" width="48" height="7" rx="3" fill="#3FB088"/><rect x="10" y="33" width="40" height="7" rx="3" fill="#5EC3F0"/>',
      triangle:'<polyline points="50,4 78,54 22,54 50,4" fill="none" stroke="#9AA5B3" stroke-width="4" stroke-linejoin="round"/><line x1="50" y1="0" x2="50" y2="4" stroke="#7E8998" stroke-width="2"/><line x1="62" y1="30" x2="82" y2="48" stroke="#C77D5A" stroke-width="4"/><circle cx="83" cy="49" r="4" fill="' + BROWN + '"/>',
      konyrau:'<polygon points="50,10 32,52 68,52" fill="#FFC93C"/><ellipse cx="50" cy="52" rx="20" ry="6" fill="#F0954C"/><ellipse cx="50" cy="6" rx="5" ry="5" fill="' + BROWN + '"/><rect x="47" y="0" width="6" height="8" fill="' + INK + '"/><ellipse cx="50" cy="55" rx="4" ry="5" fill="' + INK + '"/>',
      maracas:'<ellipse cx="35" cy="20" rx="14" ry="16" fill="#FF6B5B"/><rect x="30" y="32" width="10" height="24" fill="' + BROWN + '"/><ellipse cx="65" cy="20" rx="14" ry="16" fill="#3FB088"/><rect x="60" y="32" width="10" height="24" fill="' + BROWN + '"/><circle cx="30" cy="14" r="2" fill="#FFF3D6"/><circle cx="40" cy="14" r="2" fill="#FFF3D6"/><circle cx="35" cy="24" r="2" fill="#FFF3D6"/><circle cx="60" cy="14" r="2" fill="#FFF3D6"/><circle cx="70" cy="14" r="2" fill="#FFF3D6"/><circle cx="65" cy="24" r="2" fill="#FFF3D6"/>'
    };
    var EMO = { piano:'🎹', violin:'🎻', drum:'🥁' };
    var KEYS = ['piano','violin','dombra','drum','tambourine','xylophone','triangle','konyrau','maracas'];
    var NOISE = ['drum','tambourine','xylophone','triangle','maracas'];      /* «детские шумовые инструменты» по программе */
    var OTHER = ['piano','violin','dombra','konyrau'];
    function pic(k, w){ if(EMO[k]) return '<span style="font-size:' + (w / 40) + 'rem;line-height:1">' + EMO[k] + '</span>'; return '<svg viewBox="0 0 100 60" width="' + w + '" height="' + Math.round(w * .6) + '" aria-hidden="true">' + SVG[k] + '</svg>'; }

    (function(){
      if(document.getElementById('mxin-css')) return;
      var s = document.createElement('style'); s.id = 'mxin-css';
      s.textContent = ''
      + '.mxin-big{display:flex;align-items:center;justify-content:center;min-width:170px;height:122px;padding:0 22px;border-radius:28px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.08),0 6px 0 rgba(0,0,0,.14);margin:0 auto;width:max-content;animation:mxIn .4s backwards;}'
      + '.mxin-card{display:flex;align-items:center;justify-content:center;min-width:150px;padding:14px 24px;border-radius:26px;background:rgba(255,255,255,.94);box-shadow:inset 0 -8px 0 rgba(0,0,0,.07),0 6px 0 rgba(0,0,0,.14);font:800 1.6rem/1.2 "Baloo 2",sans-serif;color:#25324A;text-align:center;margin:0 auto;width:max-content;max-width:310px;animation:mxIn .4s backwards;}'
      + '.mxin-spk{display:flex;align-items:center;justify-content:center;width:118px;height:118px;border-radius:50%;border:0;background:linear-gradient(#FFD84D,#F0A81E);box-shadow:0 7px 0 rgba(0,0,0,.25);font-size:3.5rem;cursor:pointer;margin:0 auto;padding:0;}.mxin-spk:active{transform:translateY(3px);box-shadow:0 4px 0 rgba(0,0,0,.25);}'
      + '.mxin-info{display:flex;align-items:center;gap:10px;background:#fff;border-radius:20px;padding:8px 16px;box-shadow:0 4px 0 rgba(0,0,0,.14);font:800 1.05rem/1.25 "Baloo 2",sans-serif;color:#25324A;text-align:center;max-width:320px;margin:8px auto 0;}.mxin-info b{font-size:1.4rem;color:#7E6BD6;}'
      + '.mxs-balloon .b .lt{display:flex;align-items:center;justify-content:center;font:800 2.7rem "Baloo 2",sans-serif;line-height:1;}body .mxs-balloon .b .nm{font-size:.95rem!important;font-weight:800;padding:0 2px;text-align:center;line-height:1.1;}.mxs .mxs-balloon.wide{width:148px;}'
      + '@media (prefers-reduced-motion:reduce){.mxin-big,.mxin-card{animation:none}}';
      document.head.appendChild(s);
    })();

    /* ------- звуки: синтез в браузере (WebAudio), записей нет ------- */
    var AC = null;
    function actx(){ if(!AC){ var C = window.AudioContext || window.webkitAudioContext; if(!C) return null; try { AC = new C(); } catch(e){ return null; } } if(AC.state === 'suspended'){ try { AC.resume(); } catch(e){} } return AC; }
    function env(g, t, a, d, peak){ g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
    function tone(c, out, t, f, type, a, d, peak){ var o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); env(g, t, a, d, peak); o.connect(g); g.connect(out); o.start(t); o.stop(t + a + d + .05); }
    function burst(c, out, t, dur, freq, q, peak, ftype){
      var n = Math.floor(c.sampleRate * (dur + .05)), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for(var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      var s = c.createBufferSource(); s.buffer = b; var f = c.createBiquadFilter(); f.type = ftype || 'bandpass'; f.frequency.value = freq; f.Q.value = q; var g = c.createGain(); env(g, t, .004, dur, peak);
      s.connect(f); f.connect(g); g.connect(out); s.start(t); s.stop(t + dur + .05);
    }
    function pluck(c, out, t, f, dur, peak){   /* Карплус—Стронг: щипковая струна */
      var sr = c.sampleRate, n = Math.floor(sr * dur), buf = c.createBuffer(1, n, sr), d = buf.getChannelData(0), N = Math.max(2, Math.round(sr / f)), line = new Float32Array(N), i, p = 0;
      for(i = 0; i < N; i++) line[i] = Math.random() * 2 - 1;
      for(i = 0; i < n; i++){ var cur = line[p], nx = line[(p + 1) % N]; d[i] = cur; line[p] = (cur + nx) * .5 * .997; p = (p + 1) % N; }
      var s = c.createBufferSource(); s.buffer = buf; var g = c.createGain(); g.gain.setValueAtTime(peak, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(g); g.connect(out); s.start(t);
    }
    var SOUND = {
      drum:function(c, o, t){ [0, .4].forEach(function(dt){ var os = c.createOscillator(), g = c.createGain(); os.type = 'sine'; os.frequency.setValueAtTime(170, t + dt); os.frequency.exponentialRampToValueAtTime(55, t + dt + .18); env(g, t + dt, .003, .34, .9); os.connect(g); g.connect(o); os.start(t + dt); os.stop(t + dt + .45); burst(c, o, t + dt, .07, 1800, .8, .25); }); },
      tambourine:function(c, o, t){ tone(c, o, t, 220, 'sine', .003, .1, .3); [0, .09, .18, .27, .36, .45].forEach(function(dt, i){ burst(c, o, t + dt, .16, 6500, .6, i % 2 ? .55 : .8, 'highpass'); }); },
      maracas:function(c, o, t){ for(var i = 0; i < 9; i++) burst(c, o, t + i * .075, .07, 4200, .5, i % 2 ? .6 : .9, 'highpass'); },
      triangle:function(c, o, t){ [0, .75].forEach(function(dt){ [[2200, .3, 1.2], [5600, .2, .8], [8400, .1, .5]].forEach(function(p){ tone(c, o, t + dt, p[0], 'sine', .002, p[2], p[1]); }); }); },
      xylophone:function(c, o, t){ [523, 659, 784, 1047].forEach(function(f, i){ tone(c, o, t + i * .22, f, 'sine', .003, .38, .5); tone(c, o, t + i * .22, f * 3, 'sine', .002, .1, .14); }); },
      konyrau:function(c, o, t){ [0, .6].forEach(function(dt){ [[1, .4, 1.4], [2.76, .25, 1], [5.4, .15, .6], [8.9, .08, .4]].forEach(function(p){ tone(c, o, t + dt, 880 * p[0], 'sine', .003, p[2], p[1]); }); }); },
      piano:function(c, o, t){ [262, 330, 392, 523].forEach(function(f, i){ tone(c, o, t + i * .3, f, 'triangle', .004, 1, .42); tone(c, o, t + i * .3, f * 2, 'sine', .003, .5, .14); }); },
      dombra:function(c, o, t){ [220, 220, 330, 220, 330].forEach(function(f, i){ pluck(c, o, t + i * .18, f, .7, .6); }); }
    };

    /* настоящая домбра: запись кюя «Адай» (Курмангазы) вместо синтеза; пока файл грузится, играет прежний синтез */
    (function(){
      var synth = SOUND.dombra, buf = null, url = '' + (window.__mxBase || '../../../games/') + '../assets/audio/muz/dombra-aday-short.mp3';
      try { var OC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (OC) { fetch(url).then(function(r){ if (!r.ok) throw 0; return r.arrayBuffer(); }).then(function(b){ return new Promise(function(res, rej){ new OC(1, 1, 44100).decodeAudioData(b, res, rej); }); }).then(function(d){ buf = d; }).catch(function(){}); } } catch(e){}
      SOUND.dombra = function(c, o, t){ if (!buf) return synth(c, o, t); var s = c.createBufferSource(); s.buffer = buf; var g = c.createGain(); g.gain.value = .9; s.connect(g); g.connect(o); s.start(t); };
    })();

/* настоящая скрипка: запись вместо синтеза; пока файл грузится, играет простой синтез */
(function(){
  var synth = SOUND.violin || function(c, o, t){ [440, 494, 523, 494].forEach(function(f, i){ tone(c, o, t + i * .4, f, 'triangle', .04, .6, .3); }); };
  var buf = null, url = '' + (window.__mxBase || '../../../games/') + '../assets/audio/muz/violin-short.mp3';
  try { var OC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (OC) { fetch(url).then(function(r){ if (!r.ok) throw 0; return r.arrayBuffer(); }).then(function(b){ return new Promise(function(res, rej){ new OC(1, 1, 44100).decodeAudioData(b, res, rej); }); }).then(function(d){ buf = d; }).catch(function(){}); } } catch(e){}
  SOUND.violin = function(c, o, t){ if (!buf) return synth(c, o, t); var s = c.createBufferSource(); s.buffer = buf; var g = c.createGain(); g.gain.value = 1.5; s.connect(g); g.connect(o); s.start(t); };
})();
    var CLS = { drum:'a', maracas:'b', tambourine:'b', triangle:'c', konyrau:'c', xylophone:'d', piano:'d', dombra:'e', violin:'f' };
    var SOUNDED = Object.keys(SOUND);
    function play(k){ var c = actx(); if(!c || !SOUND[k] || !V.enabled()) return; var m = c.createGain(); m.gain.value = .6; m.connect(c.destination); try { SOUND[k](c, m, c.currentTime + .03); } catch(e){} }
    window.__mxinSound = function(k, c, dest){ SOUND[k](c, dest, 0.01); };   /* для автопроверки */

    function hintOf(k){
      return { hintSay:['f:in_' + k], hint:function(el){ el.innerHTML = '<div class="mxin-big" style="height:100px">' + pic(k, 130) + '</div><div class="mxin-info"><b>' + nm(k) + '</b></div>'; } };
    }
    function names(k, n){ return shuffle([k].concat(shuffle(KEYS.filter(function(x){ return x !== k; })).slice(0, n - 1))); }
    /* ⭐: картинка → название */
    function nameTask(k, n){
      var h = hintOf(k);
      return S('n' + k + n, { expr:'', say:V.tpl('q', {k:'inq'}), ans:k, layout:'wide', opts:names(k, n).map(function(x){ return { v:x, h:'<span class="nm">' + nm(x) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxin-big">' + pic(k, 150) + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐: название → картинка */
    function signTask(k, n){
      var h = hintOf(k);
      return S('s' + k + n, { expr:'', say:V.tpl('seq', {list:['f:in_' + k, 'f:infind']}), cap:F().infind, ans:k, layout:'wide', opts:names(k, n).map(function(x){ return { v:x, h:'<span class="lt">' + pic(x, 100) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<div class="mxin-card">' + nm(k) + '</div>'; }, hintSay:h.hintSay, hintExpr:'', hint:h.hint });
    }
    /* ⭐⭐⭐: послушай и найди (звуки синтезированные; в наборе не бывает двух похожих по звучанию) */
    function listenTask(k){
      var cls = {}; cls[CLS[k]] = 1; var set = [k];
      shuffle(KEYS.filter(function(x){ return x !== k; })).forEach(function(x){ if(set.length < 4 && !cls[CLS[x]]){ cls[CLS[x]] = 1; set.push(x); } });
      var h = hintOf(k);
      return S('l' + k, { expr:'', say:V.tpl('q', {k:'inlisten'}), ans:k, layout:'wide', opts:shuffle(set).map(function(x){ return { v:x, h:'<span class="lt">' + pic(x, 100) + '</span>' }; }),
        field:function(el){ el.innerHTML = '<button type="button" class="mxin-spk" aria-label="Слушать">🔊</button>'; el.querySelector('.mxin-spk').addEventListener('click', function(){ play(k); }); },
        afterSay:function(){ play(k); },
        hintSay:['f:inhlisten', 'f:in_' + k], hintExpr:'', hint:function(el){ el.innerHTML = '<div class="mxin-big" style="height:100px">' + pic(k, 130) + '</div><div class="mxin-info"><b>' + nm(k) + '</b></div>'; play(k); } });
    }
    /* ⭐⭐⭐: шумовые инструменты и остальные */
    function sortTask(){
      var a = shuffle(NOISE).slice(0, 3), b = shuffle(OTHER).slice(0, 3);
      var items = shuffle(a.map(function(k){ return { h:pic(k, 62), k:'noise', id:k }; }).concat(b.map(function(k){ return { h:pic(k, 62), k:'other', id:k }; })));
      return S('o' + items.map(function(i){ return i.id; }).join('-'), M.sortTask({ wide:true, items:items, say:V.tpl('q', {k:'insort'}), hintSay:['f:inhnoise', 'f:inhother'],
        buckets:[{ k:'noise', name:F().in_noise, icon:'🥁', c1:'#FFB454', c2:'#E8832F' }, { k:'other', name:F().in_other, icon:'🎼', c1:'#B58CF0', c2:'#7E6BD6' }] }));
    }

    function L1(){ return Math.random() < .5 ? nameTask(pick(KEYS), 3) : signTask(pick(KEYS), 3); }
    function L2(){ var r = Math.random(); return r < .4 ? nameTask(pick(KEYS), 4) : r < .8 || !V.enabled() ? signTask(pick(KEYS), 4) : listenTask(pick(SOUNDED)); }
    function L3(){ var r = Math.random(); return r < .4 && V.enabled() ? listenTask(pick(SOUNDED)) : r < .7 ? sortTask() : r < .85 ? signTask(pick(KEYS), 4) : nameTask(pick(KEYS), 4); }

    M.run({ root:containerId, key:'instruments', need:10, theme:'night', levels:[L1,L2,L3] });
  });
}
