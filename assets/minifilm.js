/* Белім Аралы — мини-фильмы (свои анимированные уроки вместо чужих видео).
   Фильм = набор сцен {say, svg}. Озвучка: сначала mp3 assets/audio/films/<id>-<n>.mp3, иначе голос браузера. */
(function(){
  'use strict';
  var FILMS = {}, PLAYERS = {};
  var reduce = false; try { reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
  var FONT = "'Baloo 2','Nunito',sans-serif";
  var css = [
    '.mf{max-width:760px;margin:0 auto;border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 6px 22px rgba(29,53,87,.18);border:3px solid #DCE6F0;position:relative}',
    '.mf-stage{position:relative;aspect-ratio:16/9;background:#FFF8E7;line-height:0}',
    '.mf-svg{width:100%;height:100%;display:block}',
    '.mf-capwrap{display:flex;align-items:center;background:#F5F8FA}.mf-mas{width:74px;flex:none;padding-left:10px;line-height:0}.mf-mas:empty{display:none}.mf-cap{flex:1;min-height:4.6em;padding:12px 18px;background:#F5F8FA;font:700 1.12rem/1.4 Nunito,sans-serif;color:#1D3557;text-align:center;display:flex;align-items:center;justify-content:center}',
    '.mf-bar{display:flex;align-items:center;gap:8px;padding:8px 12px;background:#1D3557}',
    '.mf-b{border:0;border-radius:999px;background:#fff;color:#1D3557;width:42px;height:42px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}',
    '.mf-b:hover{background:#FFE9A8}.mf-b svg{width:20px;height:20px;fill:#1D3557}',
    '.mf-play{background:#3FAE5A;width:52px;height:52px}.mf-play svg{fill:#fff;width:24px;height:24px}',
    '.mf-dots{flex:1;display:flex;gap:6px;justify-content:center;flex-wrap:wrap}',
    '.mf-dot{width:11px;height:11px;border-radius:50%;background:#5C7690;border:0;padding:0;cursor:pointer}.mf-dot.on{background:#FFD21F;transform:scale(1.25)}.mf-dot.done{background:#8FD39F}',
    '.mf-start{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(29,53,87,.55);border:0;cursor:pointer;color:#fff;font:800 1.5rem Baloo 2,sans-serif;line-height:1.2;width:100%}',
    '.mf-start span.pl{width:84px;height:84px;border-radius:50%;background:#3FAE5A;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 0 rgba(0,0,0,.25)}',
    '.mf-start svg{width:40px;height:40px;fill:#fff;margin-left:6px}',
    '.mf-end{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(255,248,231,.94);font:800 1.7rem Baloo 2,sans-serif;color:#1D3557;line-height:1.2;text-align:center}',
    '.mf-end button{border:0;border-radius:999px;background:#3FAE5A;color:#fff;font:800 1.1rem Baloo 2,sans-serif;padding:10px 22px;cursor:pointer}',
    '.mf.fin .mf-end{display:flex}',
    '.mf-paused .mf-svg *{animation-play-state:paused !important}',
    '.mf-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:mfDraw var(--t,1s) ease-in-out both;animation-delay:var(--d,0s)}',
    '.mf-pop{transform-box:fill-box;transform-origin:center;animation:mfPop .55s cubic-bezier(.3,1.5,.5,1) both;animation-delay:var(--d,0s)}',
    '.mf-fade{animation:mfFade .6s ease both;animation-delay:var(--d,0s)}',
    '.mf-slide{animation:mfSlide var(--t,1s) ease-out both;animation-delay:var(--d,0s)}',
    '.mf-bob{animation:mfBob 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}',
    '.mf-beat{animation:mfBeat var(--t,1s) ease-in-out infinite;transform-box:fill-box;transform-origin:center}',
    '.mf-swing{animation:mfSwing var(--t,1s) ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 0}',
    '.mf-blink{animation:mfBlink 1s steps(2,jump-none) infinite;animation-delay:var(--d,0s)}',
    '.mf-final *{animation:none !important}.mf-final .mf-draw{stroke-dashoffset:0}',
    '@keyframes mfDraw{to{stroke-dashoffset:0}}',
    '@keyframes mfPop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}',
    '@keyframes mfFade{from{opacity:0}to{opacity:1}}',
    '@keyframes mfSlide{from{transform:translate(var(--dx,0),var(--dy,0));opacity:0}to{transform:none;opacity:1}}',
    '@keyframes mfBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
    '@keyframes mfBeat{0%,100%{transform:scale(1)}35%{transform:scale(1.16)}}',
    '@keyframes mfSwing{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}',
    '@keyframes mfBlink{0%{opacity:1}100%{opacity:.15}}',
    '@media (prefers-reduced-motion:reduce){.mf-svg *{animation:none !important}.mf-draw{stroke-dashoffset:0}}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M7 4 L20 12 L7 20 Z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4.5" height="16" rx="1"/><rect x="13.5" y="4" width="4.5" height="16" rx="1"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M17 4 L6 12 L17 20 Z"/><rect x="4" y="4" width="3" height="16"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M7 4 L18 12 L7 20 Z"/><rect x="17" y="4" width="3" height="16"/></svg>',
    snd: '<svg viewBox="0 0 24 24"><path d="M3 9 H7 L12 4 V20 L7 15 H3 Z"/><path d="M15 8 Q19 12 15 16" fill="none" stroke="#1D3557" stroke-width="2" stroke-linecap="round"/><path d="M17.5 5 Q23 12 17.5 19" fill="none" stroke="#1D3557" stroke-width="2" stroke-linecap="round"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M3 9 H7 L12 4 V20 L7 15 H3 Z"/><path d="M15 9 L21 15 M21 9 L15 15" fill="none" stroke="#1D3557" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };

  /* ---------- помощники для рисования сцен ---------- */
  var BG = {
    paper: '<rect width="160" height="90" fill="#FFF8E7"/>',
    white: '<rect width="160" height="90" fill="#fff"/>',
    sky: '<defs><linearGradient id="mfsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD3FF"/><stop offset="1" stop-color="#DFF4FF"/></linearGradient></defs><rect width="160" height="90" fill="url(#mfsky)"/><rect y="68" width="160" height="22" fill="#6CC77A"/>',
    board: '<rect width="160" height="90" fill="#2F6B4F"/><rect x="3" y="3" width="154" height="84" rx="4" fill="none" stroke="#B88A55" stroke-width="3"/>',
    night: '<rect width="160" height="90" fill="#1D3557"/>',
    wood: '<rect width="160" height="90" fill="#F3E2C3"/><rect y="70" width="160" height="20" fill="#D9B98A"/>',
    gym: '<rect width="160" height="90" fill="#EAF6FF"/><rect y="66" width="160" height="24" fill="#E7C99A"/><path d="M0 66 H160" stroke="#C9A56E" stroke-width="1.2"/>',
    grass: '<defs><linearGradient id="mfsk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ADBFF"/><stop offset="1" stop-color="#E6F7FF"/></linearGradient></defs><rect width="160" height="90" fill="url(#mfsk2)"/><ellipse cx="40" cy="92" rx="90" ry="26" fill="#7ACB7E"/><ellipse cx="130" cy="94" rx="80" ry="24" fill="#62BD6B"/>'
  };
  function sty(o, extra){ o = o || {}; return (o.d != null ? '--d:' + o.d + 's;' : '') + (o.t != null ? '--t:' + o.t + 's;' : '') + (extra || ''); }
  var H = {
    svg: function(inner, bg){ return '<svg class="mf-svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" font-family="' + FONT + '">' + (BG[bg === undefined ? 'paper' : bg] || '') + inner + '</svg>'; },
    /* линия рисуется постепенно */
    draw: function(d, o){ o = o || {}; return '<path d="' + d + '" pathLength="1" class="mf-draw" style="' + sty(o) + '" fill="none" stroke="' + (o.c || '#1D3557') + '" stroke-width="' + (o.w || 1.6) + '" stroke-linecap="round" stroke-linejoin="round"/>'; },
    rect: function(x, y, w, h, o){ o = o || {}; return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r || 0) + '" pathLength="1" class="mf-draw" style="' + sty(o) + '" fill="none" stroke="' + (o.c || '#1D3557') + '" stroke-width="' + (o.w || 1.6) + '" stroke-linejoin="round"/>'; },
    circ: function(cx, cy, r, o){ o = o || {}; return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" pathLength="1" class="mf-draw" style="' + sty(o) + '" fill="none" stroke="' + (o.c || '#1D3557') + '" stroke-width="' + (o.w || 1.6) + '"/>'; },
    poly: function(pts, o){ o = o || {}; return '<polygon points="' + pts + '" pathLength="1" class="mf-draw" style="' + sty(o) + '" fill="none" stroke="' + (o.c || '#1D3557') + '" stroke-width="' + (o.w || 1.6) + '" stroke-linejoin="round"/>'; },
    fade: function(inner, d){ return '<g class="mf-fade" style="' + sty({ d: d }) + '">' + inner + '</g>'; },
    pop: function(inner, d){ return '<g class="mf-pop" style="' + sty({ d: d }) + '">' + inner + '</g>'; },
    slide: function(inner, dx, dy, d, t){ return '<g class="mf-slide" style="' + sty({ d: d, t: t || .9 }, '--dx:' + dx + 'px;--dy:' + dy + 'px;') + '">' + inner + '</g>'; },
    loop: function(inner, kind, t){ return '<g class="mf-' + kind + '" style="' + (t ? '--t:' + t + 's' : '') + '">' + inner + '</g>'; },
    at: function(x, y, s, inner){ return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">' + inner + '</g>'; },
    text: function(x, y, str, o){ o = o || {}; return '<text class="mf-fade" style="' + sty(o) + '" x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.s || 8) + '" font-weight="' + (o.fw || 800) + '" fill="' + (o.c || '#1D3557') + '">' + str + '</text>'; },
    /* значок/фигурка из набора 60x60: k берётся из MFA */
    ico: function(set, k, x, y, s){ return H.at(x, y, s / 60, window.MFA[set][k]); }
  };

  /* ---------- плеер ---------- */
  function Player(root, id, film){
    var me = this; me.id = id; me.film = film; me.root = root; me.i = 0; me.on = false; me.sound = true; me.timer = null; me.audio = null; me.started = false;
    root.classList.add('mf');
    root.innerHTML = '<div class="mf-stage"><button class="mf-start" type="button"><span class="pl">' + ICON.play + '</span><span>Смотреть</span></button><div class="mf-scene"></div><div class="mf-end"><div>Молодец!</div><button type="button" class="mf-again">Смотреть ещё раз</button></div></div><div class="mf-capwrap"><div class="mf-mas" aria-hidden="true"></div><div class="mf-cap" aria-live="polite"></div></div><div class="mf-bar"><button class="mf-b mf-prev" type="button" aria-label="Назад">' + ICON.prev + '</button><button class="mf-b mf-play" type="button" aria-label="Играть или пауза">' + ICON.play + '</button><button class="mf-b mf-next" type="button" aria-label="Вперёд">' + ICON.next + '</button><span class="mf-dots"></span><button class="mf-b mf-snd" type="button" aria-label="Звук">' + ICON.snd + '</button></div>';
    me.q = function(s){ return root.querySelector(s); };
    var dots = me.q('.mf-dots'); film.scenes.forEach(function(s, i){ var b = document.createElement('button'); b.type = 'button'; b.className = 'mf-dot'; b.setAttribute('aria-label', 'Сцена ' + (i + 1)); b.onclick = function(){ me.go(i, true); }; dots.appendChild(b); });
    me.q('.mf-start').onclick = function(){ me.started = true; me.q('.mf-start').style.display = 'none'; me.go(0, true); };
    me.q('.mf-play').onclick = function(){ if (!me.started){ me.q('.mf-start').click(); return; } if (me.on) me.pause(); else me.go(me.i, true); };
    me.q('.mf-prev').onclick = function(){ me.go(Math.max(0, me.i - 1), me.on); };
    me.q('.mf-next').onclick = function(){ me.go(Math.min(film.scenes.length - 1, me.i + 1), me.on); };
    me.q('.mf-again').onclick = function(){ root.classList.remove('fin'); me.go(0, true); };
    me.q('.mf-snd').onclick = function(){ me.sound = !me.sound; this.innerHTML = me.sound ? ICON.snd : ICON.mute; if (!me.sound) me.stopVoice(); };
    try { if (window.Barsik && Barsik.mount) Barsik.mount(me.q('.mf-mas')); } catch(e){}
    me.render(0, false);
  }
  Player.prototype.render = function(i, final){
    var sc = this.film.scenes[i]; this.i = i;
    var box = this.q('.mf-scene'); box.className = 'mf-scene' + (final ? ' mf-final' : '');
    box.innerHTML = sc.svg; this.q('.mf-cap').textContent = sc.say || '';
    var ds = this.root.querySelectorAll('.mf-dot'); for (var k = 0; k < ds.length; k++) ds[k].className = 'mf-dot' + (k === i ? ' on' : (k < i ? ' done' : ''));
  };
  Player.prototype.stopVoice = function(){
    clearTimeout(this.timer); this.timer = null;
    if (this.audio){ try { this.audio.onended = null; this.audio.onerror = null; this.audio.pause(); } catch(e){} this.audio = null; }
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch(e){}
  };
  Player.prototype.pause = function(){ this.on = false; this.stopVoice(); this.root.classList.add('mf-paused'); this.q('.mf-play').innerHTML = ICON.play; };
  Player.prototype.go = function(i, play){
    var me = this; me.stopVoice(); me.root.classList.remove('fin', 'mf-paused'); me.render(i, false);
    if (!play){ me.on = false; me.q('.mf-play').innerHTML = ICON.play; return; }
    me.on = true; me.q('.mf-play').innerHTML = ICON.pause;
    var sc = me.film.scenes[i], token = {}; me._tok = token;
    var finished = false;
    function done(){ if (finished || me._tok !== token || !me.on) return; finished = true; me.stopVoice(); me.timer = setTimeout(function(){ if (me._tok !== token || !me.on) return; if (i + 1 < me.film.scenes.length) me.go(i + 1, true); else me.finish(); }, 900); }
    var est = sc.dur || Math.max(4, 2.5 + (sc.say || '').length * 0.055);
    function timerOnly(){ clearTimeout(me.timer); me.timer = setTimeout(done, est * 1000); }
    function tts(){
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance){ timerOnly(); return; }
      try {
        var u = new SpeechSynthesisUtterance(sc.say); u.lang = me.film.lang || 'ru-RU'; u.rate = .92; u.pitch = 1.15; u.onend = done; u.onerror = timerOnly;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
        clearTimeout(me.timer); me.timer = setTimeout(done, Math.max(est * 1000 * 2.2, 9000));
      } catch(e){ timerOnly(); }
    }
    if (!me.sound){ timerOnly(); return; }
    var base = me.film.audio === undefined ? '../../../assets/audio/films/' : me.film.audio;
    if (base){
      var a = new Audio(base + me.id + '-' + (i + 1) + '.mp3'); me.audio = a; var fell = false;
      var fb = function(){ if (fell || me._tok !== token) return; fell = true; me.audio = null; tts(); };
      a.onerror = fb; a.onended = done;
      var p; try { p = a.play(); } catch(e){ fb(); return; }
      if (p && p.catch) p.catch(fb);
    } else tts();
  };
  Player.prototype.finish = function(){ this.on = false; this.stopVoice(); this.q('.mf-play').innerHTML = ICON.play; this.root.classList.add('fin'); try { this.root.dispatchEvent(new CustomEvent('mf:end', { bubbles: true })); } catch(e){} };
  Player.prototype.show = function(i){ this.q('.mf-start').style.display = 'none'; this.root.classList.remove('fin'); this.render(i, true); };

  function mount(el){
    var id = el.getAttribute('data-film'), film = FILMS[id];
    if (!film){ el.textContent = 'Урок скоро появится.'; return; }
    if (film.base !== undefined) film.audio = film.base;
    PLAYERS[id] = new Player(el, id, film);
  }
  window.MF = { register: function(id, film){ FILMS[id] = film; }, mount: mount, players: PLAYERS, h: H, films: FILMS };
  function auto(){ var els = document.querySelectorAll('.mf[data-film]'); for (var i = 0; i < els.length; i++) if (!els[i].__mf){ els[i].__mf = 1; mount(els[i]); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
})();
