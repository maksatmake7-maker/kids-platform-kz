/* ===== Білім Аралы — общий набор для игр 2 класса на движке «Приключения Барсика» =====
   Что здесь: озвучка предложений (G2.say), картинки (разрядные блоки, часы, углы, монеты, линейка, компас),
   готовые «рецепты» заданий (выбор-карточки, верно/неверно, нажми картинку, считай касанием, раздай поровну).
   Подключается сам (см. загрузчик в каждой игре), страницы менять не надо.
   Озвучка предложений: если есть mp3 (assets/audio/barsik/ru/f_g2_….mp3) — играет запись, иначе читает браузер. */
(function(){
  if(window.MXG2 || !window.MX || !window.MXV) return;
  var M = MX, V = MXV, rnd = M.rnd, pick = M.pick, shuffle = M.shuffle;

  /* ---------- дополнительные фразы для чисел и действий ---------- */
  var EXTRA = {
    ru: { times:'умножить на', divby:'разделить на', lbr:'в скобках', then:'потом', g2_ok:'Верно', g2_no:'Неверно' },
    kz: { times:'көбейту', divby:'бөлу', lbr:'жақшада', then:'содан кейін', g2_ok:'Дұрыс', g2_no:'Бұрыс' },
    en: { times:'times', divby:'divided by', lbr:'in brackets', then:'then', g2_ok:'True', g2_no:'False' }
  };
  Object.keys(EXTRA).forEach(function(L){ Object.keys(EXTRA[L]).forEach(function(k){ if(V.F[L] && !V.F[L][k]) V.F[L][k] = EXTRA[L][k]; }); });

  /* ---------- озвучка целого предложения одним клипом ---------- */
  function hsh(s){ var x = 5381; for(var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }
  var ROMAN_RE = /\b(?=[IVX])(X{0,3}(?:IX|IV|V?I{0,3}))\b/g;
  function romanToArabic(t){ return t.replace(ROMAN_RE, function(m){ if(!m) return m; var v = { I:1, V:5, X:10 }, r = 0; for(var i = 0; i < m.length; i++) r += (i + 1 < m.length && v[m[i]] < v[m[i + 1]]) ? -v[m[i]] : v[m[i]]; return String(r); }); }
  function say(text){ var k = 'g2_' + hsh(text), sp = romanToArabic(text); V.F.ru[k] = sp; return { id:'f_' + k, text:sp, ru:true }; }

  /* ---------- вспомогательное ---------- */
  function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function uniq(arr){ var r = []; arr.forEach(function(x){ if(r.indexOf(x) < 0) r.push(x); }); return r; }
  function numOpts(ans, lo, hi, extra){ return M.numOpts(ans, lo, hi, extra); }
  function txtOpts(list){ return shuffle(list).map(function(t){ return { v:String(t), h:esc(t) }; }); }
  function plural(n, a, b, c){ var m = n % 100, d = n % 10; if(m > 10 && m < 15) return c; if(d === 1) return a; if(d > 1 && d < 5) return b; return c; }

  /* ---------- стили ---------- */
  var CSS = ''
  + '.g2-blocks{display:flex;flex-wrap:wrap;gap:10px 14px;justify-content:center;align-items:flex-end;background:rgba(255,255,255,.72);border-radius:18px;padding:10px 12px;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
  + '.g2-ten{display:flex;flex-direction:column-reverse;gap:2px;background:#2F86F0;padding:3px;border-radius:7px;animation:mxIn .4s backwards;box-shadow:0 3px 0 #1F62B4;}'
  + '.g2-ten i{display:block;width:15px;height:11px;border-radius:3px;background:#8CC3FF;}'
  + '.g2-ones{display:grid;grid-template-columns:repeat(3,17px);gap:3px;align-content:end;}'
  + '.g2-ones i{display:block;width:17px;height:17px;border-radius:4px;background:#FFB400;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);animation:mxIn .35s backwards;}'
  + '.g2-lab{font:800 .9rem "Baloo 2",sans-serif;color:#25324A;text-align:center;}'
  + '.g2-box{background:#fff;border-radius:16px;padding:8px 12px;font:800 1.15rem/1.25 "Nunito",sans-serif;color:#25324A;box-shadow:0 4px 0 rgba(0,0,0,.14);text-align:center;max-width:320px;}'
  + '.g2-big{font:800 2.6rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.25);min-height:46px;}'
  + '.g2-tiles{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:340px;}'
  + '.g2-tile{min-width:78px;min-height:78px;border-radius:20px;border:3px solid transparent;background:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 8px;font:800 .95rem/1.1 "Baloo 2",sans-serif;color:#25324A;cursor:pointer;animation:mxIn .35s backwards;}'
  + '.g2-tile:hover{transform:translateY(-3px);}'
  + '.g2-tile .e{font-size:2.3rem;line-height:1;}'
  + '.g2-tile svg{display:block;}'
  + '.g2-tile.on{border-color:#2FBF80;background:#E9FFF3;}'
  + '.g2-tile.no{border-color:#FF6B5B;background:#FFECE9;animation:mxShake .4s;}'
  + '.g2-expl{background:#fff;border-radius:16px;padding:9px 12px;font:700 1rem/1.25 "Nunito",sans-serif;color:#25324A;text-align:center;box-shadow:0 3px 0 rgba(0,0,0,.12);}'
  + '.g2-expl b{color:#1FA672;}'
  + '.g2-step{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;font:800 1.35rem "Baloo 2",sans-serif;color:#25324A;}'
  + '.g2-step .n{background:#FFB400;color:#fff;border-radius:50%;width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;font-size:.95rem;}'
  + '.g2-chip{display:inline-block;background:#fff;border-radius:12px;padding:3px 10px;box-shadow:0 3px 0 rgba(0,0,0,.16);font:800 1.4rem "Baloo 2",sans-serif;}'
  + '.g2-chip.hot{background:#FFE08A;outline:3px solid #FFB400;}'
  + '.g2-plate{width:84px;min-height:70px;border-radius:0 0 42px 42px;background:linear-gradient(#fff,#E9EEF8);box-shadow:0 5px 0 rgba(0,0,0,.2);display:flex;flex-wrap:wrap;justify-content:center;align-content:flex-start;padding:6px 4px;gap:1px;}'
  + '.g2-plate span{font-size:1.25rem;line-height:1;animation:mxIn .3s backwards;}'
  + '.g2-go{border:none;border-radius:999px;padding:9px 26px;background:linear-gradient(#FFD36B,#FF9F43);color:#fff;font:800 1.3rem "Baloo 2",sans-serif;box-shadow:0 5px 0 #D17A1E;cursor:pointer;}'
  + '.g2-go[disabled]{opacity:.4;pointer-events:none;}'
  + '.mxs-balloon.wide .b .nm{font-size:1.02rem;line-height:1.1;padding:0 6px;text-align:center;}'
  + '@media (prefers-reduced-motion:reduce){.g2-ten,.g2-ones i,.g2-tile{animation:none}}';
  (function(){ if(document.getElementById('g2-css')) return; var s = document.createElement('style'); s.id = 'g2-css'; s.textContent = CSS; document.head.appendChild(s); })();

  /* ---------- картинки ---------- */
  // разрядные блоки: десятки — синие столбики по 10, единицы — жёлтые кубики
  function blocks(tens, ones, lab){
    var h = '<div class="g2-blocks">', i;
    for(i = 0; i < tens; i++) h += '<span class="g2-ten" style="animation-delay:' + (i*.05) + 's">' + '<i></i>'.repeat(10) + '</span>';
    if(ones) { h += '<span class="g2-ones">'; for(i = 0; i < ones; i++) h += '<i style="animation-delay:' + ((tens + i)*.04) + 's"></i>'; h += '</span>'; }
    h += '</div>';
    if(lab) h += '<div class="g2-lab">' + lab + '</div>';
    return h;
  }
  var RIM = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  function clock(hh, mm, o){
    o = o || {}; var cx = 100, cy = 100, r = 92, s = '';
    var ha = (hh % 12) * 30 + mm * .5 - 90, ma = mm * 6 - 90, rad = Math.PI / 180;
    var hx = cx + 46*Math.cos(ha*rad), hy = cy + 46*Math.sin(ha*rad), mx = cx + 70*Math.cos(ma*rad), my = cy + 70*Math.sin(ma*rad);
    s += '<circle cx="100" cy="100" r="96" fill="#FFB400"/><circle cx="100" cy="100" r="' + r + '" fill="#FFFDF5" stroke="#E08A00" stroke-width="4"/>';
    for(var i = 1; i <= 12; i++){
      var a = (i*30 - 90)*rad, tx = cx + 74*Math.cos(a), ty = cy + 74*Math.sin(a) + (o.roman ? 5 : 7);
      s += '<text x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + (o.roman ? (i === 8 || i === 3 || i === 7 || i === 12 ? 15 : 17) : 20) + '" fill="#25324A">' + (o.roman ? RIM[i-1] : i) + '</text>';
    }
    if(o.ticks !== false) for(var j = 0; j < 60; j++){ if(j % 5 === 0) continue; var b = (j*6 - 90)*rad; s += '<line x1="' + (cx + 88*Math.cos(b)).toFixed(1) + '" y1="' + (cy + 88*Math.sin(b)).toFixed(1) + '" x2="' + (cx + 91*Math.cos(b)).toFixed(1) + '" y2="' + (cy + 91*Math.sin(b)).toFixed(1) + '" stroke="#C9A56A" stroke-width="1.5"/>'; }
    if(!o.nohands){
      s += '<line x1="100" y1="100" x2="' + hx.toFixed(1) + '" y2="' + hy.toFixed(1) + '" stroke="#25324A" stroke-width="8" stroke-linecap="round"/>';
      s += '<line x1="100" y1="100" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '" stroke="#FF6B5B" stroke-width="5" stroke-linecap="round"/>';
      s += '<circle cx="100" cy="100" r="7" fill="#25324A"/>';
    }
    var w = o.size || 170;
    return '<svg viewBox="0 0 200 200" width="' + w + '" height="' + w + '" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 5px 0 rgba(0,0,0,.14))">' + s + '</svg>';
  }
  function angle(deg, o){
    o = o || {}; var vx = 34, vy = 150, L = 112, rad = Math.PI / 180, a = deg * rad, size = o.size || 170;
    var x2 = vx + L*Math.cos(a), y2 = vy - L*Math.sin(a), s = '';
    var col = o.col || '#6C4CE0';
    if(deg === 90){ s += '<path d="M' + (vx + 26) + ' ' + vy + ' L' + (vx + 26) + ' ' + (vy - 26) + ' L' + vx + ' ' + (vy - 26) + '" fill="rgba(47,191,128,.25)" stroke="#2FBF80" stroke-width="3"/>'; }
    else { var ar = 30, ax = vx + ar*Math.cos(a), ay = vy - ar*Math.sin(a); s += '<path d="M' + vx + ' ' + vy + ' L' + (vx + ar) + ' ' + vy + ' A' + ar + ' ' + ar + ' 0 0 0 ' + ax.toFixed(1) + ' ' + ay.toFixed(1) + ' Z" fill="rgba(255,180,0,.35)" stroke="#FFB400" stroke-width="3"/>'; }
    s += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L) + '" y2="' + vy + '" stroke="' + col + '" stroke-width="7" stroke-linecap="round"/>';
    s += '<line x1="' + vx + '" y1="' + vy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + col + '" stroke-width="7" stroke-linecap="round"/>';
    s += '<circle cx="' + vx + '" cy="' + vy + '" r="7" fill="#FF6B5B"/>';
    return '<svg viewBox="0 0 160 170" width="' + size + '" height="' + (size*170/160) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">' + s + '</svg>';
  }
  // монеты и купюры Казахстана (рисунок упрощённый)
  var COINCOL = { 50:['#E8E2D0','#B8AE8C'], 100:['#FFD65A','#E0A62A'], 200:['#C8E6C9','#6DB58B'], 500:['#FFD3E0','#E58AA8'], 1000:['#D3E4FF','#6C9BE6'], 2000:['#E8DAFF','#9C7BE0'] };
  function money(v, w){
    var c = COINCOL[v] || ['#eee','#999'];
    if(v <= 100){ var d = w || 60; return '<svg viewBox="0 0 60 60" width="' + d + '" height="' + d + '"><circle cx="30" cy="30" r="28" fill="' + c[1] + '"/><circle cx="30" cy="30" r="23" fill="' + c[0] + '" stroke="#fff" stroke-opacity=".7" stroke-width="2"/><text x="30" y="37" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + (v >= 100 ? 19 : 21) + '" fill="#4A3A12">' + v + '</text></svg>'; }
    var ww = w || 96; return '<svg viewBox="0 0 96 50" width="' + ww + '" height="' + (ww*50/96) + '"><rect x="2" y="2" width="92" height="46" rx="7" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="3"/><circle cx="20" cy="25" r="11" fill="' + c[1] + '" opacity=".35"/><text x="62" y="32" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="22" fill="#25324A">' + v + '</text><text x="62" y="44" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="8" fill="#25324A" opacity=".6">тенге</text></svg>';
  }
  // линейка с предметом; len — длина в см (целое), scale — пикселей на см
  function ruler(len, em, total){
    total = total || 12; var sc = 24, W = total*sc + 20, s = '';
    s += '<rect x="2" y="44" width="' + (W - 4) + '" height="34" rx="6" fill="#FFE08A" stroke="#E0A62A" stroke-width="2"/>';
    for(var i = 0; i <= total; i++){ var x = 10 + i*sc; s += '<line x1="' + x + '" y1="44" x2="' + x + '" y2="' + (i % 5 === 0 ? 62 : 56) + '" stroke="#7A5A10" stroke-width="2"/><text x="' + x + '" y="74" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="11" fill="#5A4208">' + i + '</text>'; }
    s += '<rect x="10" y="12" width="' + (len*sc) + '" height="24" rx="5" fill="#FF6B5B"/><polygon points="' + (10 + len*sc) + ',12 ' + (10 + len*sc + 16) + ',24 ' + (10 + len*sc) + ',36" fill="#F2C48A"/><rect x="10" y="12" width="12" height="24" rx="4" fill="#F7A8B8"/>';
    return '<svg viewBox="0 0 ' + W + ' 84" width="' + Math.min(W, 330) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%">' + s + '</svg>';
  }
  // Барсик с поворотом: стрелка показывает направление взгляда (0 = вверх, по часовой)
  function compass(deg, o){
    o = o || {}; var s = '<circle cx="80" cy="80" r="70" fill="#fff" stroke="#6C4CE0" stroke-width="4"/>';
    s += '<text x="80" y="24" text-anchor="middle" font-size="12" font-family="Baloo 2,sans-serif" font-weight="800" fill="#7A87A6">↑ вверх</text>';
    [['→',146,86],['↓',80,150],['←',14,86]].forEach(function(d){ s += '<text x="' + d[1] + '" y="' + d[2] + '" text-anchor="middle" font-size="20" font-family="Baloo 2,sans-serif" font-weight="800" fill="#C2CAE0">' + d[0] + '</text>'; });
    s += '<g class="g2-cmp" style="transform-origin:80px 80px;transform:rotate(' + deg + 'deg);transition:transform .9s cubic-bezier(.4,1.5,.5,1)"><polygon points="80,30 94,58 66,58" fill="#FF6B5B"/><text x="80" y="92" text-anchor="middle" font-size="40">🐯</text></g>';
    return '<svg viewBox="0 0 160 160" width="' + (o.size || 170) + '" height="' + (o.size || 170) + '" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">' + s + '</svg>';
  }

  /* ---------- рецепты заданий ---------- */
  function hintCard(vis, text){ return function(el){ el.innerHTML = (vis || '') + (text ? '<div class="g2-expl">' + text + '</div>' : ''); }; }

  // Вопрос + варианты. o: {sig, q (текст в облачке), say (что говорит; по умолчанию q), field (html|fn), opts (строки), ans, hint (html-текст разбора), hintVis, hintSay, layout ('card'|'wide'), expr}
  function choice(o){
    o.opts = uniq(o.opts.map(String));
    var layout = o.layout || (o.opts.every(function(t){ return String(t).length <= 9; }) ? 'wide' : 'card');
    var t = {
      sig:o.sig, expr:o.expr || '', cap:o.q, say:o.say ? [].concat(o.say) : [say(o.q)], ans:String(o.ans), layout:layout,
      opts: layout === 'wide' ? shuffle(o.opts).map(function(x){ return { v:String(x), h:'<span class="nm">' + esc(x) + '</span>' }; }) : txtOpts(o.opts),
      field:o.field, small:o.small,
      hintExpr:o.hintExpr != null ? o.hintExpr : '<span class="ok">' + esc(o.ans) + '</span>',
      hintSay:o.hintSay ? [].concat(o.hintSay) : (o.hintPlain ? [say(o.hintPlain)] : []),
      hint:hintCard(o.hintVis, o.hint)
    };
    return t;
  }
  // Верно / неверно. o: {sig, q (утверждение), truth (bool), field, hint (разбор), hintVis}
  function tf(o){
    var q = o.q;
    return choice({ sig:o.sig, q:q, say:[say(q), say('Верно или неверно?')], field:o.field, opts:['Верно','Неверно'], ans:o.truth ? 'Верно' : 'Неверно', layout:'wide',
      hint:o.hint, hintVis:o.hintVis, hintPlain:o.hintPlain || (o.hint ? o.hint.replace(/<[^>]+>/g, '') : ''), hintExpr:'<span class="ok">' + (o.truth ? 'Верно' : 'Неверно') + '</span>' });
  }
  // Нажми нужную картинку. o: {sig, q, say, items:[{k,h,lab}], ans, hint, hintVis, cols}
  function pickPic(o){
    var t = {
      sig:o.sig, expr:o.expr || '', cap:o.q, say:o.say ? [].concat(o.say) : [say(o.q)], ans:String(o.ans), gate:false, small:o.small,
      field:function(el, X, task){
        var w = document.createElement('div'); w.className = 'g2-tiles'; el.appendChild(w);
        shuffle(o.items).forEach(function(it, i){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'g2-tile'; b.setAttribute('data-k', it.k); b.style.animationDelay = (i*.06) + 's';
          b.innerHTML = it.h + (it.lab ? '<span>' + it.lab + '</span>' : '');
          b.addEventListener('click', function(){ if(task._done) return; task._done = true; X.sfx.tap(2); b.classList.add(String(it.k) === String(o.ans) ? 'on' : 'no'); task.submit(String(it.k), b); });
          w.appendChild(b);
        });
        task.auto = function(wrong){ var bs = [].slice.call(w.querySelectorAll('.g2-tile')); var b = bs.filter(function(x){ return (x.getAttribute('data-k') === String(o.ans)) === !wrong; })[0]; if(b) b.click(); };
      },
      hintExpr:o.hintExpr != null ? o.hintExpr : '', hintSay:o.hintSay ? [].concat(o.hintSay) : (o.hintPlain ? [say(o.hintPlain)] : []), hint:hintCard(o.hintVis, o.hint)
    };
    return t;
  }
  // Считай касанием: каждый предмет прибавляет val; когда все нажаты — открываются ответы.
  // o: {sig, expr, q, say, units:[{h, val}], opts, ans, hint, hintVis, hintExpr, hintSay, wrap, label}
  function tapSum(o){
    var t = {
      sig:o.sig, expr:o.expr || '', cap:o.q, say:[].concat(o.say), ans:String(o.ans), opts:o.opts, layout:o.layout, gate:true, small:o.small,
      field:function(el, X, task){
        var big = document.createElement('div'); big.className = 'g2-big'; big.innerHTML = '&nbsp;';
        var w = document.createElement('div'); w.className = 'g2-tiles'; if(o.pre){ var pr = document.createElement('div'); pr.innerHTML = o.pre; el.appendChild(pr); } el.appendChild(w); el.appendChild(big);
        var sum = 0, left = o.units.length, bs = [];
        o.units.forEach(function(u, i){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'g2-tile'; b.style.animationDelay = (i*.05) + 's'; b.innerHTML = u.h; bs.push(b);
          b.addEventListener('click', function(){
            if(b.classList.contains('on') || task._done) return;
            b.classList.add('on'); sum += u.val; left--; big.textContent = (o.prefix || '') + sum + (o.suffix || ''); X.sfx.tap(i + 1);
            if(o.sayEach !== false) X.say([sum]);
            if(left === 0) setTimeout(function(){ task.openAnswers(); if(o.sayAfter) X.say(o.sayAfter); }, 650);
          });
          w.appendChild(b);
        });
        task.auto = function(){ bs.forEach(function(b){ b.click(); }); };
      },
      hintExpr:o.hintExpr, hintSay:o.hintSay || [], hint:o.hint ? (typeof o.hint === 'function' ? o.hint : hintCard(o.hintVis, o.hint)) : hintCard(o.hintVis, '')
    };
    return t;
  }
  // Раздай поровну: k тарелок, n предметов. Кнопка «Раздать» кладёт по одному на каждую тарелку.
  function deal(o){
    var k = o.plates, n = o.total, em = o.em, per = n / k;
    return {
      sig:o.sig, expr:o.expr || '', cap:o.q, say:[].concat(o.say), ans:String(o.ans), opts:o.opts, layout:o.layout, gate:true,
      field:function(el, X, task){
        var pile = document.createElement('div'); pile.className = 'mxs-grp'; var items = [];
        for(var i = 0; i < n; i++){ var s = document.createElement('span'); s.className = 'mxs-o sm'; s.textContent = em; pile.appendChild(s); items.push(s); }
        var row = document.createElement('div'); row.className = 'mxs-row'; var plates = [];
        for(var j = 0; j < k; j++){ var p = document.createElement('div'); p.className = 'g2-plate'; row.appendChild(p); plates.push(p); }
        var go = document.createElement('button'); go.type = 'button'; go.className = 'g2-go'; go.textContent = o.btn || 'Раздать';
        el.appendChild(pile); el.appendChild(row); el.appendChild(go);
        var round = 0;
        function step(){
          if(task._done || round >= per) return; round++;
          plates.forEach(function(p){ var it = items.pop(); if(it) it.remove(); var s = document.createElement('span'); s.textContent = em; p.appendChild(s); });
          X.sfx.drop(); X.say([round]);
          if(round >= per){ go.disabled = true; setTimeout(function(){ task.openAnswers(); }, 600); }
        }
        go.addEventListener('click', step);
        task.auto = function(){ (function loop(){ if(round < per){ step(); setTimeout(loop, 40); } })(); };
      },
      hintExpr:o.hintExpr, hintSay:o.hintSay || [], hint:hintCard(o.hintVis, o.hint)
    };
  }

  /* ---------- свои картинки вместо новых смайликов (на части телефонов и ПК они не показываются) ---------- */
  var SV = function(body){ return '<svg viewBox="0 0 64 64" width="1.12em" height="1.12em" aria-hidden="true" style="vertical-align:-.2em">' + body + '</svg>'; };
  var ICONS = {
    '🪥': SV('<g transform="rotate(-35 32 32)"><rect x="4" y="27" width="40" height="10" rx="5" fill="#3b82f6"/><rect x="8" y="29.5" width="18" height="2.6" rx="1.3" fill="#93c5fd"/><rect x="40" y="22" width="20" height="20" rx="4" fill="#fff" stroke="#94a3b8" stroke-width="2"/><g stroke="#38bdf8" stroke-width="3" stroke-linecap="round"><path d="M44 18v6M50 18v6M56 18v6"/></g><g stroke="#f472b6" stroke-width="3" stroke-linecap="round"><path d="M47 18v6M53 18v6"/></g><path d="M42 27h16M42 32h16M42 37h16" stroke="#cbd5e1" stroke-width="1.5"/></g>'),
    '🪟': SV('<rect x="8" y="6" width="48" height="52" rx="4" fill="#92400e"/><rect x="13" y="11" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="34" y="11" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="13" y="34" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="34" y="34" width="17" height="19" rx="2" fill="#7dd3fc"/><path d="M16 26l6-9M37 26l6-9" stroke="#fff" stroke-width="2" opacity=".7"/>'),
    '🪑': SV('<rect x="16" y="6" width="6" height="30" rx="2" fill="#b45309"/><rect x="16" y="6" width="26" height="22" rx="3" fill="#d97706"/><rect x="12" y="34" width="38" height="8" rx="3" fill="#b45309"/><rect x="14" y="42" width="6" height="16" rx="2" fill="#92400e"/><rect x="42" y="42" width="6" height="16" rx="2" fill="#92400e"/>'),
    '🪙': SV('<circle cx="32" cy="32" r="24" fill="#fbbf24" stroke="#d97706" stroke-width="4"/><circle cx="32" cy="32" r="16" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M32 22l3 7 7 .6-5.4 4.6 1.8 7-6.4-4-6.4 4 1.8-7L22 29.6l7-.6z" fill="#f59e0b"/>'),
    '🪵': SV('<rect x="6" y="18" width="42" height="28" rx="6" fill="#a16207"/><path d="M12 26h30M12 32h30M12 38h30" stroke="#854d0e" stroke-width="2"/><ellipse cx="48" cy="32" rx="10" ry="14" fill="#d6a05a" stroke="#854d0e" stroke-width="2"/><ellipse cx="48" cy="32" rx="6" ry="9" fill="none" stroke="#a16207" stroke-width="2"/><ellipse cx="48" cy="32" rx="2.4" ry="3.5" fill="#a16207"/>'),
    '🪣': SV('<path d="M14 24c0-14 36-14 36 0" fill="none" stroke="#64748b" stroke-width="4"/><path d="M10 24h44l-5 32H15z" fill="#38bdf8" stroke="#0369a1" stroke-width="3" stroke-linejoin="round"/><ellipse cx="32" cy="24" rx="22" ry="5" fill="#bae6fd" stroke="#0369a1" stroke-width="3"/><path d="M20 34l2 16M44 34l-2 16" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>'),
    '🫖': SV('<path d="M50 24c10-2 10 14 0 14" fill="none" stroke="#be185d" stroke-width="5" stroke-linecap="round"/><path d="M14 22l-8-6" stroke="#be185d" stroke-width="5" stroke-linecap="round"/><ellipse cx="30" cy="38" rx="20" ry="17" fill="#f472b6" stroke="#be185d" stroke-width="3"/><path d="M16 22h28" stroke="#be185d" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="17" r="4" fill="#be185d"/><path d="M20 32c4-4 10-5 14-3" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>'),
    '🫁': SV('<path d="M30 6v20" stroke="#fb7185" stroke-width="5" stroke-linecap="round"/><path d="M30 24c-6 0-8-2-12 2-8 8-10 22-8 28 1 3 6 4 12 2 6-2 8-6 8-12z" fill="#fb7185" stroke="#be123c" stroke-width="3" stroke-linejoin="round"/><path d="M34 24c6 0 8-2 12 2 8 8 10 22 8 28-1 3-6 4-12 2-6-2-8-6-8-12z" fill="#fb7185" stroke="#be123c" stroke-width="3" stroke-linejoin="round"/>'),
    '🧃': SV('<path d="M38 4l-8 14" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/><rect x="14" y="16" width="34" height="44" rx="5" fill="#fb923c" stroke="#c2410c" stroke-width="3"/><rect x="14" y="28" width="34" height="18" fill="#fff" opacity=".85"/><circle cx="31" cy="37" r="6" fill="#f97316"/><path d="M31 31c1-3 4-4 6-3" stroke="#16a34a" stroke-width="2" fill="none"/>'),
    '🧊': SV('<path d="M10 22l22-12 22 12v24L32 58 10 46z" fill="#bae6fd" stroke="#0284c7" stroke-width="3" stroke-linejoin="round"/><path d="M10 22l22 12 22-12M32 34v24" stroke="#0284c7" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M18 24l8-4" stroke="#fff" stroke-width="3" stroke-linecap="round"/>')
  };
  var ICON_RE = /(🪥|🪟|🪑|🪙|🪵|🪣|🫖|🫁|🧃|🧊)/g;
  function iconSpan(ch){ return '<span class="g2-ic" style="display:inline-block;line-height:1">' + ICONS[ch] + '<i style="font-size:0;position:absolute;opacity:0;pointer-events:none">' + ch + '</i></span>'; }
  function swapIcons(root){
    try {
      if(!root || !root.nodeType) return;
      var w = document.createTreeWalker(root.nodeType === 3 ? root.parentNode : root, NodeFilter.SHOW_TEXT, null), list = [], n;
      while((n = w.nextNode())){ if(root.nodeType === 3 && n !== root) continue; if(ICON_RE.test(n.nodeValue)){ var pn = n.parentNode && n.parentNode.nodeName; if(pn === 'I' && n.parentNode.parentNode && n.parentNode.parentNode.className === 'g2-ic'){ ICON_RE.lastIndex = 0; continue; } if(pn !== 'SCRIPT' && pn !== 'STYLE' && pn !== 'TEXTAREA' && pn !== 'OPTION' && pn !== 'TITLE') list.push(n); } ICON_RE.lastIndex = 0; }
      list.forEach(function(t){
        var sp = document.createElement('span'); sp.innerHTML = t.nodeValue.split(ICON_RE).map(function(part, i){ return i % 2 ? iconSpan(part) : esc(part); }).join('');
        while(sp.firstChild) t.parentNode.insertBefore(sp.firstChild, t); t.parentNode.removeChild(t);
      });
    } catch(e){}
  }
  try {
    var busy = false;
    var mo = new MutationObserver(function(muts){
      if(busy) return; busy = true;
      try { muts.forEach(function(m){
        if(m.type === 'characterData') swapIcons(m.target);
        else m.addedNodes && Array.prototype.forEach.call(m.addedNodes, function(nd){ if(nd.nodeType === 1 || nd.nodeType === 3) swapIcons(nd); });
      }); } catch(e){}
      busy = false;
    });
    var start = function(){ swapIcons(document.body); mo.observe(document.body, { childList:true, subtree:true, characterData:true }); };
    if(document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  } catch(e){}

  window.MXG2 = {
    say:say, esc:esc, uniq:uniq, numOpts:numOpts, txtOpts:txtOpts, plural:plural,
    blocks:blocks, clock:clock, angle:angle, money:money, ruler:ruler, compass:compass, RIM:RIM,
    hintCard:hintCard, swapIcons:swapIcons, choice:choice, tf:tf, pickPic:pickPic, tapSum:tapSum, deal:deal
  };
})();
