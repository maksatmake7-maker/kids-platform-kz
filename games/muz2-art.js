/* ===== Білім Аралы — звуки и картинки для игр по музыке, 2 класс =====
   Всё звучит и рисуется кодом: мелодии, ритм, марш и вальс играет Web Audio, а ноты, нотный стан и ритмические полоски рисует SVG.
   Подключается перед игрой: <script src="../../../games/muz2-art.js"></script>
   Скрипичный ключ: контур символа из шрифта GNU FreeFont (FreeSerif), GPL с исключением для встраивания шрифта в документы. */
(function(){
  if(window.MZ) return;
  var INK = '#25324A';
  var NOTE = { 'до':0, 'ре':2, 'ми':4, 'фа':5, 'соль':7, 'ля':9, 'си':11 };
  var STEP = { 'до':-2, 'ре':-1, 'ми':0, 'фа':1, 'соль':2, 'ля':3, 'си':4, 'до²':5 };
  var NAMES = ['до', 'ре', 'ми', 'фа', 'соль', 'ля', 'си'];
  var CLEF = "M434 2Q464 -103 464 -170Q464 -223 427.0 -257.0Q390 -291 337 -291Q287 -291 250.0 -261.5Q213 -232 213 -190Q213 -160 233.5 -133.5Q254 -107 283.5 -107.0Q313 -107 331.5 -128.5Q350 -150 350 -178Q350 -240 280 -240Q298 -268 338 -268Q353 -268 368.5 -263.5Q384 -259 401.0 -248.0Q418 -237 428.5 -213.5Q439 -190 439 -157Q439 -136 411 -6Q389 -12 356 -12Q259 -12 189.5 60.0Q120 132 120 232Q120 267 131.5 303.0Q143 339 157.5 366.5Q172 394 200.5 428.5Q229 463 248.5 483.5Q268 504 303 539Q280 621 280 689Q280 779 313.0 839.5Q346 900 379 900Q389 900 401.5 887.0Q414 874 426.0 851.0Q438 828 446.5 790.5Q455 753 455 710Q455 551 342 447L368 329Q384 332 397 332Q458 332 500.0 282.5Q542 233 542 162Q542 44 434 2ZM426 746Q426 801 394 801Q358 801 333.0 748.0Q308 695 308 630Q308 588 321 557Q359 580 392.5 639.5Q426 699 426 746ZM498 128Q498 183 466.0 216.0Q434 249 383 249L428 23Q498 52 498 128ZM407 17 361 247Q334 241 311.5 214.0Q289 187 289 158Q289 143 295.0 128.5Q301 114 309.5 104.0Q318 94 327.0 86.0Q336 78 342.0 74.5Q348 71 348 71L340 66Q307 75 277.5 106.0Q248 137 248 184Q248 231 277.5 270.5Q307 310 343 323L325 430Q168 299 168 177Q168 104 223.0 55.0Q278 6 348 6Q365 6 407 17Z";

  /* ---------- звук ---------- */
  var AC = null, playing = null;
  function actx(){
    if(!AC){ var C = window.AudioContext || window.webkitAudioContext; if(!C) return null; try { AC = new C(); } catch(e){ return null; } }
    if(AC.state === 'suspended'){ try { AC.resume(); } catch(e){} }
    return AC;
  }
  function freq(name, shift){
    var up = /²$/.test(name), flat = /♭$/.test(name), base = name.replace(/[²♭]/g, '');
    var semi = NOTE[base] + (flat ? -1 : 0) + (up ? 12 : 0) + 12 * (shift || 0);
    return 261.6256 * Math.pow(2, semi / 12);
  }
  // события: { t: доля, d: длительность в долях, f: частота | null, k: 'n' нота | 'wood' | 'low' | 'tick', v: громкость }
  function events(s){
    var ev = [], t = 0, i, o = s.o || 0;
    if(s.k === 'mel'){
      s.n.forEach(function(n, idx){ var d = Array.isArray(s.b) ? s.b[idx] : (s.b || 1); if(n) ev.push({ t:t, d:d, f:freq(n, o), k:'n', v:1 }); t += d; });
    } else if(s.k === 'rhy'){
      s.b.forEach(function(d){ ev.push({ t:t, d:d, k:'wood', v:1 }); t += d; });
    } else if(s.k === 'meter'){
      for(i = 0; i < (s.bars || 4); i++){
        for(var j = 0; j < s.m; j++){
          var bt = i * s.m + j;
          if(j === 0){ ev.push({ t:bt, d:.9, f:freq('до', -1), k:'n', v:1.1 }); ev.push({ t:bt, d:.2, k:'low', v:.9 }); }
          else ['до', 'ми', 'соль'].forEach(function(n){ ev.push({ t:bt, d:.45, f:freq(n, 0), k:'n', v:.45 }); });
        }
      }
    } else if(s.k === 'chord'){
      (s.n || []).forEach(function(n, idx){ ev.push({ t:idx * .35, d:s.d || 2, f:freq(n, o), k:'n', v:.8 }); });
    }
    return ev;
  }
  function endBeat(ev){ var m = 0; ev.forEach(function(e){ m = Math.max(m, e.t + e.d); }); return m; }
  function noiseBuf(c){ var n = Math.floor(c.sampleRate * .06), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for(var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n); return b; }
  function schedule(c, s, t0){
    var ev = events(s), spb = 60 / (s.bpm || 100), vol = (s.v == null ? .5 : s.v), out = c.createGain(); out.gain.value = vol; out.connect(c.destination);
    ev.forEach(function(e){
      var t = t0 + e.t * spb, d = Math.max(.08, e.d * spb), g = c.createGain(), v = e.v;
      g.connect(out);
      if(e.k === 'n'){
        var a = c.createOscillator(), b = c.createOscillator(), gb = c.createGain();
        a.type = 'triangle'; a.frequency.value = e.f; b.type = 'sine'; b.frequency.value = e.f * 2; gb.gain.value = .35; b.connect(gb); gb.connect(g); a.connect(g);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.55 * v, t + .012); g.gain.exponentialRampToValueAtTime(.2 * v, t + Math.min(d * .5, .5)); g.gain.exponentialRampToValueAtTime(.0001, t + d * 1.1 + .05);
        a.start(t); b.start(t); a.stop(t + d * 1.1 + .1); b.stop(t + d * 1.1 + .1);
      } else if(e.k === 'low'){
        var o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.setValueAtTime(150, t); o2.frequency.exponentialRampToValueAtTime(55, t + .15); o2.connect(g);
        g.gain.setValueAtTime(.9 * v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .22); o2.start(t); o2.stop(t + .25);
      } else {
        var o3 = c.createOscillator(), ns = c.createBufferSource(); o3.type = 'triangle'; o3.frequency.value = 880; o3.connect(g); ns.buffer = noiseBuf(c); ns.connect(g);
        g.gain.setValueAtTime(.9 * v, t); g.gain.exponentialRampToValueAtTime(.0001, t + .09); o3.start(t); o3.stop(t + .1); ns.start(t);
      }
    });
    return (endBeat(ev) * spb) + .3;
  }
  function render(s, rate){
    var OC = window.OfflineAudioContext || window.webkitOfflineAudioContext, len = 0;
    var dur = endBeat(events(s)) * 60 / (s.bpm || 100) + 1; var c = new OC(1, Math.ceil(dur * (rate || 22050)), rate || 22050);
    schedule(c, s, .05); return c.startRendering().then(function(b){ return b.getChannelData(0); });
  }
  var curBtn = null, curAudio = null, tmr = null;
  function stop(){ if(curAudio){ try { curAudio.pause(); } catch(e){} curAudio = null; } if(AC && AC.close && playing){ try { playing.disconnect(); } catch(e){} } if(curBtn){ curBtn.classList.remove('on'); curBtn = null; } clearTimeout(tmr); }
  function play(btn){
    var s; try { s = JSON.parse(btn.getAttribute('data-spec')); } catch(e){ return; }
    var was = btn.classList.contains('on'); stop(); if(was) return;
    btn.classList.add('on'); curBtn = btn;
    if(s.k === 'file'){
      try { curAudio = new Audio(s.u); curAudio.onended = stop; var pr = curAudio.play(); if(pr && pr.catch) pr.catch(function(){ stop(); }); } catch(e){ stop(); }
      return;
    }
    var c = actx(); if(!c){ stop(); return; }
    var len = schedule(c, s, c.currentTime + .05);
    tmr = setTimeout(stop, len * 1000);
  }
  function btn(s, label){
    return '<button type="button" class="mz-play" data-spec=\'' + JSON.stringify(s).replace(/'/g, '&#39;') + '\' onclick="MZ.play(this)"><svg viewBox="0 0 24 24"><path class="pl" d="M7 4l13 8-13 8z"/><path class="st" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg><span>' + (label || 'Слушать') + '</span></button>';
  }
  var CSS = '.mz-play{border:none;border-radius:999px;padding:10px 26px;background:linear-gradient(#FFD36B,#FF9F43);box-shadow:0 5px 0 #D17A1E;color:#fff;font:800 1.2rem "Baloo 2",sans-serif;cursor:pointer;display:inline-flex;gap:8px;align-items:center;margin:4px 6px}'
    + '.mz-play svg{width:22px;height:22px;fill:#fff}.mz-play .st{display:none}.mz-play.on{background:linear-gradient(#7BE0AD,#2FBF80);box-shadow:0 5px 0 #1D8F5E}.mz-play.on .pl{display:none}.mz-play.on .st{display:inline}'
    + '.mz-row{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;align-items:center}';
  (function(){ if(document.getElementById('mz-css')) return; var st = document.createElement('style'); st.id = 'mz-css'; st.textContent = CSS; (document.head || document.documentElement).appendChild(st); })();

  /* ---------- рисунки ---------- */
  function svg(w, h, body, width){ return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + (width || w) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;height:auto">' + body + '</svg>'; }
  function head(x, y, filled){ return '<ellipse cx="' + x + '" cy="' + y + '" rx="6.8" ry="5" transform="rotate(-20 ' + x + ' ' + y + ')" fill="' + (filled ? INK : '#fff') + '" stroke="' + INK + '" stroke-width="2"/>'; }
  function stave(w){ var s = ''; for(var i = 0; i < 5; i++) s += '<line x1="4" y1="' + (20 + i * 10) + '" x2="' + (w - 4) + '" y2="' + (20 + i * 10) + '" stroke="' + INK + '" stroke-width="1.6"/>'; return s; }
  function clef(){ return '<g transform="translate(14 50) scale(0.052 -0.052)"><path d="' + CLEF + '" fill="' + INK + '"/></g>'; }
  // нотный стан с нотами (одна нота — один звук)
  function staff(notes, w){
    var n = notes.length, W = 64 + n * 38 + 12, s = stave(W) + clef();
    notes.forEach(function(nm, i){
      var x = 72 + i * 38, st = STEP[nm], y = 60 - st * 5;
      if(st <= -2) s += '<line x1="' + (x - 11) + '" y1="70" x2="' + (x + 11) + '" y2="70" stroke="' + INK + '" stroke-width="1.8"/>';
      s += head(x, y, true);
      if(st < 4) s += '<line x1="' + (x + 6.4) + '" y1="' + (y - 1) + '" x2="' + (x + 6.4) + '" y2="' + (y - 32) + '" stroke="' + INK + '" stroke-width="2"/>';
      else s += '<line x1="' + (x - 6.4) + '" y1="' + (y + 1) + '" x2="' + (x - 6.4) + '" y2="' + (y + 32) + '" stroke="' + INK + '" stroke-width="2"/>';
    });
    return svg(W, 90, '<rect x="0" y="0" width="' + W + '" height="90" rx="10" fill="#FFFDF5"/>' + s, w || Math.min(W * 1.5, 330));
  }
  // ритмическая строка из длительностей: 1 — четвертная, .5 — восьмая, 2 — половинная
  function rhythm(bs, w){
    var x = 22, s = '', i = 0, items = [];
    while(i < bs.length){
      var d = bs[i];
      if(d === .5 && bs[i + 1] === .5){ items.push({ x:x, kind:'pair' }); x += 54; i += 2; }
      else { items.push({ x:x, kind:d === 2 ? 'half' : d === .5 ? 'eighth' : 'quarter' }); x += d === 2 ? 56 : d === .5 ? 34 : 38; i++; }
    }
    var W = x + 10, y = 58;
    s += '<line x1="4" y1="' + y + '" x2="' + (W - 4) + '" y2="' + y + '" stroke="' + INK + '" stroke-width="1.6"/>';
    items.forEach(function(it){
      var hx = it.x;
      if(it.kind === 'pair'){
        s += head(hx, y, true) + head(hx + 24, y, true) + '<line x1="' + (hx + 6.4) + '" y1="' + (y - 1) + '" x2="' + (hx + 6.4) + '" y2="' + (y - 38) + '" stroke="' + INK + '" stroke-width="2"/><line x1="' + (hx + 30.4) + '" y1="' + (y - 1) + '" x2="' + (hx + 30.4) + '" y2="' + (y - 38) + '" stroke="' + INK + '" stroke-width="2"/><line x1="' + (hx + 6.4) + '" y1="' + (y - 38) + '" x2="' + (hx + 30.4) + '" y2="' + (y - 38) + '" stroke="' + INK + '" stroke-width="6"/>';
      } else {
        s += head(hx, y, it.kind !== 'half') + '<line x1="' + (hx + 6.4) + '" y1="' + (y - 1) + '" x2="' + (hx + 6.4) + '" y2="' + (y - 38) + '" stroke="' + INK + '" stroke-width="2"/>';
        if(it.kind === 'eighth') s += '<path d="M' + (hx + 6.4) + ' ' + (y - 38) + ' q 12 8 8 20" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
      }
    });
    return svg(W, 80, '<rect x="0" y="0" width="' + W + '" height="80" rx="10" fill="#FFFDF5"/>' + s, w || Math.min(W * 1.4, 320));
  }
  function sym(kind, w){ return rhythm(kind === 'half' ? [2] : kind === 'eighth' ? [.5] : [1], w || 90); }

  /* ---------- готовые задания для игр ---------- */
  var cs0 = document.currentScript, BASE = cs0 && cs0.src ? cs0.src.replace(/[^\/]*$/, '') : '../../../games/';
  var TUNES = [['до', 'ре', 'ми', 'ре', 'до'], ['ми', 'соль', 'ми', 'до'], ['соль', 'ми', 'ми', 'фа', 'ре', 'ре'], ['до', 'ми', 'соль', 'ми', 'до']];
  var RHY = [[1, 1, 1, 1], [1, .5, .5, 1, 1], [.5, .5, .5, .5, 2], [2, 1, 1], [1, 1, 2], [.5, .5, 1, .5, .5, 1], [1, .5, .5, .5, .5, 1]];
  var POS = { 'до':'до — под нижней линейкой, на маленькой добавочной чёрточке', 'ре':'ре — под нижней линейкой', 'ми':'ми — на нижней линейке', 'фа':'фа — между первой и второй линейками', 'соль':'соль — на второй линейке', 'ля':'ля — между второй и третьей линейками', 'си':'си — на третьей линейке', 'до²':'до второй октавы — между третьей и четвёртой линейками' };
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
  function T(X){
    var G = MXG2, S = X.S, pick = X.pick, shuffle = X.shuffle, rnd = X.rnd;
    function others(list, not, n){ return shuffle(list.filter(function(x){ return x !== not; })).slice(0, n); }
    function ch(sig, o){ o.layout = o.layout || 'wide'; return S(sig, G.choice(o)); }
    function pp(sig, o, ansLabel, vis, text, spoken){
      var t = G.pickPic(o);
      return S(sig, Object.assign(t, { hintExpr:'<span class="ok">' + ansLabel + '</span>', hintSay:[G.say(spoken || text)], hint:G.hintCard(vis, text) }));
    }
    function row(h){ return '<div class="mz-row">' + h + '</div>'; }
    var F = {};
    F.tempo = function(){ var fast = Math.random() < .5, tune = pick(TUNES), sp = { k:'mel', n:tune, b:1, bpm:fast ? 170 : 62, v:.5 }, ans = fast ? 'быстро' : 'медленно';
      return ch('tp' + ans + tune.join(''), { q:'Музыка звучит…', say:[G.say('Нажми на кнопку и послушай. Как звучит музыка?')], opts:['быстро', 'медленно'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:'Скорость музыки называется темп. Быстрая музыка бежит, а медленная идёт спокойным шагом.', hintPlain:'Скорость музыки называется темп. Быстрая музыка бежит, а медленная идёт спокойным шагом.' }); };
    F.dyn = function(){ var loud = Math.random() < .5, tune = pick(TUNES), sp = { k:'mel', n:tune, b:1, bpm:90, v:loud ? .7 : .1 }, ans = loud ? 'громко' : 'тихо';
      return ch('dy' + ans + tune.join(''), { q:'Музыка звучит…', say:[G.say('Нажми на кнопку и послушай. Музыка звучит громко или тихо?')], opts:['громко', 'тихо'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:'Громкость музыки называется динамика. Музыка бывает громкой и тихой.', hintPlain:'Громкость музыки называется динамика. Музыка бывает громкой и тихой.' }); };
    F.pitch = function(){ var hi = Math.random() < .5, tune = pick(TUNES), sp = { k:'mel', n:tune, b:1, bpm:90, v:.5, o:hi ? 1 : -1 }, ans = hi ? 'высокие' : 'низкие';
      return ch('pc' + ans + tune.join(''), { q:'Какие звуки ты слышишь?', say:[G.say('Нажми на кнопку и послушай. Звуки высокие или низкие?')], opts:['высокие', 'низкие'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:'Высокие звуки тонкие, как голос птички. Низкие звуки густые, как голос большого зверя.', hintPlain:'Высокие звуки тонкие, как голос птички. Низкие звуки густые, как голос большого зверя.' }); };
    F.mode = function(){ var maj = Math.random() < .5, sp = { k:'mel', n:maj ? ['до', 'ми', 'соль', 'ми', 'до'] : ['до', 'ми♭', 'соль', 'ми♭', 'до'], b:[1, 1, 1, 1, 2], bpm:90, v:.5 }, A = 'светлая и весёлая', B = 'грустная и печальная', ans = maj ? A : B;
      return ch('md' + ans, { q:'Какая это музыка?', say:[G.say('Нажми на кнопку и послушай. Какое настроение у этой музыки?')], opts:[A, B], ans:ans, layout:'card', expr:row(btn(sp)), hintVis:row(btn(sp)), hint:'Светлую весёлую музыку называют мажор. Грустную печальную музыку называют минор.', hintPlain:'Светлую весёлую музыку называют мажор. Грустную печальную музыку называют минор.' }); };
    F.which = function(){ var lull = Math.random() < .5, calm = { k:'mel', n:['соль', 'ми', 'до', 'ми', 'соль', 'ми', 'до'], b:1, bpm:58, v:.12 }, run = { k:'mel', n:['до', 'ми', 'соль', 'до²', 'соль', 'ми', 'до'], b:.5, bpm:200, v:.7 }, first = Math.random() < .5;
      var a = first ? (lull ? calm : run) : (lull ? run : calm), b = first ? (lull ? run : calm) : (lull ? calm : run), ans = (lull ? (first ? 'первая' : 'вторая') : (first ? 'вторая' : 'первая')), q = lull ? 'Какая музыка подходит для колыбельной?' : 'Какая музыка подходит для весёлого бега?';
      var bt = row(btn(a, 'Первая') + btn(b, 'Вторая'));
      return ch('wh' + lull + first, { q:q, say:[G.say('Послушай первую и вторую музыку. ' + q)], opts:['первая', 'вторая'], ans:ans, expr:bt, hintVis:bt, hint:lull ? 'Колыбельную поют тихо и медленно, чтобы малыш уснул.' : 'Для бега нужна быстрая бодрая музыка.', hintPlain:lull ? 'Колыбельную поют тихо и медленно, чтобы малыш уснул.' : 'Для бега нужна быстрая бодрая музыка.' }); };
    F.rhyPick = function(){ var i = rnd(0, RHY.length - 1), pat = RHY[i], ds = others(RHY, pat, 2), sp = { k:'rhy', b:pat, bpm:84, v:.6 }, q = 'Найди ритм, который прозвучал.';
      return pp('rp' + i, { q:q, say:[G.say('Нажми на кнопку и послушай ритм. ' + q)], expr:row(btn(sp)), ans:'r' + i, items:[pat].concat(ds).map(function(p){ return { k:'r' + RHY.indexOf(p), h:rhythm(p, 150) }; }) }, 'вот он', row(rhythm(pat, 190) + btn(sp)), 'Длинные звуки рисуют с палочкой и белой ноткой, короткие вдвое быстрее. Вот ритм, который прозвучал.'); };
    F.count = function(){ var n = rnd(3, 6), sp = { k:'rhy', b:Array(n).fill(1), bpm:110, v:.6 };
      var opts = [String(n), String(n - 1), String(n + 1)];
      return ch('cn' + n, { q:'Сколько звуков ты услышал?', say:[G.say('Нажми на кнопку и послушай. Сколько звуков ты услышал?')], opts:opts, ans:String(n), expr:row(btn(sp)), hintVis:row(btn(sp) + rhythm(Array(n).fill(1), 160)), hint:'Всего звуков: ' + n + '.', hintPlain:'Всего звуков: ' + n + '.' }); };
    F.long = function(){ var longer = Math.random() < .5, q = longer ? 'Найди самую длинную ноту.' : 'Найди самую короткую ноту.', ans = longer ? 'half' : 'eighth';
      return pp('lg' + longer, { q:q, say:[G.say(q)], ans:ans, items:['half', 'quarter', 'eighth'].map(function(k){ return { k:k, h:sym(k, 90) }; }) }, longer ? 'половинная' : 'восьмая', sym(ans, 110), 'Половинная нота длится два счёта, четвертная — один счёт, а восьмая — половину счёта.'); };
    F.staffName = function(){ var nm = pick(MZ.NAMES.concat(['до²'])), ops = MZ.NAMES.filter(function(x){ return x !== nm; });
      var opts = [nm].concat(shuffle(ops).slice(0, 2)).map(function(x){ return x === 'до²' ? 'до' : x; });
      var ansv = nm === 'до²' ? 'до' : nm; opts = [ansv].concat(shuffle(MZ.NAMES.filter(function(x){ return x !== ansv; })).slice(0, 2));
      return ch('sn' + nm, { q:'Как называется эта нота?', say:[G.say('Как называется эта нота?')], opts:opts, ans:ansv, expr:staff([nm], 220), hintVis:staff([nm], 200), hint:'Это нота ' + (POS[nm]) + '.', hintPlain:'Это нота ' + POS[nm] + '.' }); };
    F.staffPick = function(){ var nm = pick(MZ.NAMES), q = 'Найди ноту ' + nm + '.';
      return pp('sp' + nm, { q:q, say:[G.say(q)], ans:nm, items:[nm].concat(others(MZ.NAMES, nm, 2)).map(function(x){ return { k:x, h:staff([x], 130) }; }) }, nm, staff([nm], 200), 'Нота ' + POS[nm] + '.'); };
    F.higher = function(){ var hi = Math.random() < .5, a = pick(MZ.NAMES), b = pick(others(MZ.NAMES, a, 6)), up = MZ.STEP[a] > MZ.STEP[b] ? a : b, dn = up === a ? b : a, ans = hi ? up : dn, q = hi ? 'Найди ноту, которая звучит выше.' : 'Найди ноту, которая звучит ниже.';
      return pp('hg' + hi + a + b, { q:q, say:[G.say(q)], ans:ans, items:[a, b].map(function(x){ return { k:x, h:staff([x], 130) }; }) }, ans, row(staff([dn, up], 230)), 'Чем выше нота на нотном стане, тем выше она звучит.'); };
    F.direction = function(){ var kinds = [['вверх', ['до', 'ре', 'ми', 'фа', 'соль']], ['вниз', ['соль', 'фа', 'ми', 'ре', 'до']], ['на месте', ['ми', 'ми', 'ми', 'ми', 'ми']]], k = pick(kinds), sp = { k:'mel', n:k[1], b:1, bpm:100, v:.5 };
      return ch('dr' + k[0], { q:'Куда идёт мелодия?', say:[G.say('Нажми на кнопку и послушай. Мелодия идёт вверх, вниз или стоит на месте?')], opts:['вверх', 'вниз', 'на месте'], ans:k[0], expr:row(btn(sp)), hintVis:row(btn(sp) + staff(k[1], 260)), hint:{ 'вверх':'Мелодия идёт вверх: каждый звук выше предыдущего.', 'вниз':'Мелодия идёт вниз: каждый звук ниже предыдущего.', 'на месте':'Мелодия стоит на месте: все звуки одинаковые.' }[k[0]], hintPlain:{ 'вверх':'Мелодия идёт вверх: каждый звук выше предыдущего.', 'вниз':'Мелодия идёт вниз: каждый звук ниже предыдущего.', 'на месте':'Мелодия стоит на месте: все звуки одинаковые.' }[k[0]] }); };
    F.firstSecond = function(){ var a = pick(MZ.NAMES.slice(0, 6)), b = pick(MZ.NAMES.filter(function(x){ return x !== a; })), ans = MZ.STEP[a] > MZ.STEP[b] ? 'первый' : 'второй', sp1 = { k:'mel', n:[a], b:2, bpm:100, v:.5 }, sp2 = { k:'mel', n:[b], b:2, bpm:100, v:.5 }, bt = row(btn(sp1, 'Первый') + btn(sp2, 'Второй'));
      return ch('fs' + a + b, { q:'Какой звук выше?', say:[G.say('Послушай первый и второй звук. Какой звук выше?')], opts:['первый', 'второй'], ans:ans, expr:bt, hintVis:bt + row(staff(ans === 'первый' ? [a] : [b], 160)), hint:'Звук, который выше, звучит тоньше. Его нота стоит выше на нотном стане.', hintPlain:'Звук, который выше, звучит тоньше. Его нота стоит выше на нотном стане.' }); };
    F.meter = function(){ var m = pick([2, 3]), ans = m === 2 ? 'марш' : 'вальс', sp = { k:'meter', m:m, bars:4, bpm:m === 2 ? 108 : 132, v:.6 };
      return ch('mt' + m, { q:'Это марш или вальс?', say:[G.say('Нажми на кнопку и послушай. Это марш или вальс?')], opts:['марш', 'вальс'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:m === 2 ? 'В марше считают «раз-два» и шагают: сильная доля, слабая доля.' : 'В вальсе считают «раз-два-три» и кружатся: одна сильная доля и две слабые.', hintPlain:m === 2 ? 'В марше считают раз-два и шагают: сильная доля, слабая доля.' : 'В вальсе считают раз-два-три и кружатся: одна сильная доля и две слабые.' }); };
    F.count23 = function(){ var m = pick([2, 3]), ans = m === 2 ? 'раз-два' : 'раз-два-три', sp = { k:'meter', m:m, bars:4, bpm:m === 2 ? 108 : 132, v:.6 };
      return ch('c23' + m, { q:'Как считать эту музыку?', say:[G.say('Нажми на кнопку и послушай. Как считать эту музыку: раз-два или раз-два-три?')], opts:['раз-два', 'раз-два-три'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:m === 2 ? 'Сильный звук, потом слабый: раз-два.' : 'Сильный звук и два слабых: раз-два-три.', hintPlain:m === 2 ? 'Сильный звук, потом слабый: раз-два.' : 'Сильный звук и два слабых: раз-два-три.' }); };
    F.inst = function(){ var dom = Math.random() < .5, u = BASE + '../assets/audio/muz/' + (dom ? 'dombra-aday-short.mp3' : 'violin-short.mp3'), sp = { k:'file', u:u }, ans = dom ? 'домбра' : 'скрипка';
      return ch('in' + ans, { q:'Какой инструмент звучит?', say:[G.say('Нажми на кнопку и послушай. Какой инструмент звучит?')], opts:['домбра', 'скрипка'], ans:ans, expr:row(btn(sp)), hintVis:row(btn(sp)), hint:dom ? 'Это домбра: казахский народный инструмент с двумя струнами.' : 'Это скрипка: классический смычковый инструмент.', hintPlain:dom ? 'Это домбра: казахский народный инструмент с двумя струнами.' : 'Это скрипка: классический смычковый инструмент.' }); };
    return F;
  }

  window.MZ = { NAMES:NAMES, STEP:STEP, freq:freq, events:events, render:render, play:play, stop:stop, btn:btn, staff:staff, rhythm:rhythm, sym:sym, actx:actx, T:T, RHY:RHY, TUNES:TUNES };
})();
