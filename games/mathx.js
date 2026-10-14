/* ===== Білім Аралы — общий движок «Игры 2.0» для математики 1 класса =====
   Режим освоения: нужно ответить верно N раз ПОДРЯД (N = 10).
   Три уровня (⭐ / ⭐⭐ / ⭐⭐⭐) — растут вместе с серией; на каждом уровне
   свои ТИПЫ заданий (а не только «сколько будет»).
   После ошибки показывается картинка-разбор, серия сбрасывается, игра идёт дальше.
   Задания без слов (цифры, знаки, картинки), поэтому работают на всех языках.
   Подключается так же, как раньше: initXxxGame('game-root') — страницы менять не надо.
*/
(function(){
  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓','🍪','🚗','⚽','🐥'];

  function rnd(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){
    a = a.slice();
    for(var j=a.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=a[j]; a[j]=a[k]; a[k]=t; }
    return a;
  }
  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }

  /* ---------- стили (подключаются один раз) ---------- */
  var CSS = ''
  + '.mx-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;}'
  + '.mx-lv{font-size:1.25rem;letter-spacing:2px;white-space:nowrap;}'
  + '.mx-bar{flex:1;display:flex;gap:4px;max-width:340px;}'
  + '.mx-seg{flex:1;height:12px;border-radius:6px;background:#E3EBF5;transition:background .25s;}'
  + '.mx-seg.on{background:var(--meadow,#3FB68B);}'
  + '.mx-q{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:120px;margin-bottom:22px;}'
  + '.mx-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 14px;}'
  + '.mx-grp{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:170px;}'
  + '.mx-grp .count-obj{font-size:2.1rem;}'
  + '.mx-o{position:relative;display:inline-block;}'
  + '.mx-o.x{opacity:.45;}.mx-o.x::after{content:"✖";position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;color:#E5533D;font-size:1.7rem;font-weight:900;}'
  + '.mx-o.b{filter:drop-shadow(0 0 0 #fff) saturate(1.2);outline:3px dashed #F2A93B;border-radius:10px;}'
  + '.mx-eq{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:2.4rem;color:var(--ink,#25324A);display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 12px;}'
  + '.mx-eq.s{font-size:1.9rem;}'
  + '.mx-box{display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;border-radius:12px;background:var(--coral,#FF6B5B);color:#fff;font-size:1.8rem;padding:0 8px;}'
  + '.mx-ok{color:var(--meadow,#2E8F6B);}'
  + '.mx-hint{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;background:#FFF7E3;border:2px dashed #F2C66B;border-radius:18px;padding:12px 14px;margin-top:16px;animation:pop-in .35s ease backwards;}'
  + '.mx-opts.sym{grid-template-columns:repeat(3,1fr);max-width:380px;margin:0 auto;}'
  + '.mx-opts.sym2{grid-template-columns:repeat(2,1fr);max-width:260px;margin:0 auto;}'
  + '.mx-opts.wide{grid-template-columns:repeat(2,1fr);}'
  + '.mx-opts.pic{grid-template-columns:repeat(2,1fr);}'
  + '.mx-opts .count-btn{font-size:1.7rem;font-family:"Baloo 2",sans-serif;}'
  + '.mx-opts.wide .count-btn{font-size:1.35rem;}'
  + '.mx-opts.pic .count-btn{padding:10px 6px;font-size:1.1rem;line-height:1.25;}'
  + '.mx-opts.pic .mx-pg{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;font-size:1.15rem;}'
  + '.mx-pair{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;width:100%;max-width:440px;}'
  + '.mx-pair .mx-grp{max-width:none;}.mx-pair .mx-grp .count-obj{font-size:1.8rem;}'
  + '.mx-nl{width:100%;max-width:460px;height:auto;}'
  + '.mx-frame{display:grid;grid-template-columns:repeat(5,34px);gap:4px;justify-content:center;padding:6px;background:#EAF2FB;border-radius:12px;}'
  + '.mx-cell{width:34px;height:34px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.35rem;}'
  + '.mx-frames{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}'
  + '@media (max-width:480px){.mx-pair .mx-grp .count-obj{font-size:1.45rem}.mx-eq{font-size:1.9rem}.mx-eq.s{font-size:1.5rem}.mx-grp .count-obj{font-size:1.8rem}.mx-grp{max-width:140px}.mx-opts.sym{grid-template-columns:repeat(3,1fr)}.mx-frame{grid-template-columns:repeat(5,28px)}.mx-cell{width:28px;height:28px;font-size:1.1rem}.mx-box{min-width:44px;height:44px;font-size:1.5rem}}';
  function injectCss(){
    if(document.getElementById('mx-css')) return;
    var s = document.createElement('style'); s.id = 'mx-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------- строительные блоки заданий ---------- */
  // группа предметов; cross = сколько последних предметов зачёркнуто; hl = сколько последних подсвечено
  function objs(n, emoji, o){
    o = o || {};
    var h = '<div class="mx-grp">';
    for(var i=0;i<n;i++){
      var cls = 'mx-o';
      if(o.cross && i >= n - o.cross) cls += ' x';
      if(o.hl && i >= n - o.hl) cls += ' b';
      h += '<span class="count-obj ' + cls + '" style="animation-delay:' + (i*0.05) + 's">' + emoji + '</span>';
    }
    return h + '</div>';
  }
  function box(t){ return '<span class="mx-box">' + (t === undefined ? '?' : t) + '</span>'; }
  function BOX(){ return '<span class="mx-box">☐</span>'; }
  function eq(parts, small){ return '<div class="mx-eq' + (small?' s':'') + '">' + parts.join(' ') + '</div>'; }
  function row(parts){ return '<div class="mx-row">' + parts.join('') + '</div>'; }
  function op(s){ return '<span class="mx-eq" style="font-size:2rem">' + s + '</span>'; }
  function pair(l, mid, r){ return '<div class="mx-pair">' + l + mid + r + '</div>'; }
  function ok(v){ return '<span class="mx-ok">' + v + '</span>'; }

  // десятковая рамка: n предметов, строки по 5 (две строки = десяток)
  function frame(n, emoji){
    var h = '<div class="mx-frame">';
    for(var i=0;i<10;i++) h += '<span class="mx-cell">' + (i<n ? emoji : '') + '</span>';
    return h + '</div>';
  }
  function frames(n, emoji){ // n: 1..20
    var h = '<div class="mx-frames">';
    h += frame(Math.min(n,10), emoji);
    if(n > 10) h += frame(n-10, emoji);
    return h + '</div>';
  }

  // числовой луч 0..N, точки: [{v, color, label}]
  function numline(N, points, jump){
    var W = 460, pad = 16, step = (W - pad*2) / N, y = 54;
    var s = '<svg class="mx-nl" viewBox="0 0 ' + W + ' 100" xmlns="http://www.w3.org/2000/svg">';
    s += '<line x1="' + pad + '" y1="' + y + '" x2="' + (W-pad) + '" y2="' + y + '" stroke="#8B95A3" stroke-width="3" stroke-linecap="round"/>';
    for(var i=0;i<=N;i++){
      var x = pad + i*step;
      s += '<line x1="' + x + '" y1="' + (y-7) + '" x2="' + x + '" y2="' + (y+7) + '" stroke="#8B95A3" stroke-width="2"/>';
      s += '<text x="' + x + '" y="' + (y+26) + '" font-size="' + (N>10?12:15) + '" text-anchor="middle" fill="#5A6577" font-family="Nunito,sans-serif" font-weight="700">' + i + '</text>';
    }
    if(jump){ // дуга от a до a+b (b может быть <0)
      var x1 = pad + jump[0]*step, x2 = pad + jump[1]*step, mid = (x1+x2)/2;
      s += '<path d="M' + x1 + ' ' + (y-4) + ' Q' + mid + ' ' + (y-48) + ' ' + x2 + ' ' + (y-4) + '" fill="none" stroke="#F2A93B" stroke-width="3" stroke-dasharray="6 4"/>';
    }
    (points||[]).forEach(function(p){
      var x = pad + p.v*step;
      s += '<circle cx="' + x + '" cy="' + (y-16) + '" r="11" fill="' + p.color + '" stroke="#fff" stroke-width="2"/>';
      if(p.label) s += '<text x="' + x + '" y="' + (y-11) + '" font-size="12" text-anchor="middle" fill="#fff" font-weight="800">' + p.label + '</text>';
    });
    return s + '</svg>';
  }

  // числовые варианты ответа: ans + 3 правдоподобных, в диапазоне [lo,hi]; extra — «ловушки»
  function numOpts(ans, lo, hi, extra){
    var set = [ans];
    (extra||[]).forEach(function(e){ if(e >= lo && e <= hi && set.indexOf(e) < 0 && set.length < 4) set.push(e); });
    var tries = 0;
    while(set.length < 4 && tries++ < 80){
      var d = pick([1,-1,2,-2,3,-3,10,-10]);
      var c = ans + d;
      if(c >= lo && c <= hi && set.indexOf(c) < 0) set.push(c);
    }
    var t = lo; while(set.length < 4 && t <= hi){ if(set.indexOf(t) < 0) set.push(t); t++; }
    return shuffle(set).map(function(v){ return {v:String(v), h:String(v)}; });
  }
  var SYM3 = [{v:'<',h:'<'},{v:'=',h:'='},{v:'>',h:'>'}];
  function cmpSym(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }

  function T(q, ans, opts, sol, layout){
    return { q:q, ans:String(ans), opts:opts, sol:sol, layout:layout||'' };
  }

  /* ---------- движок ---------- */
  function run(cfg){
    var root = document.getElementById(cfg.root);
    if(!root) return;
    injectCss();
    (window.MX.cfgs = window.MX.cfgs || {})[cfg.key] = cfg;
    var NEED = cfg.need || 10;
    var streak = 0, totalCorrect = 0, totalAnswered = 0, busy = false, cur = null, lastSig = '';
    var emoji = pick(EMOJIS);

    function level(){ return streak < 4 ? 0 : (streak < 8 ? 1 : 2); }
    function updateMeta(){
      var p = document.getElementById('count-progress-value'); if(p) p.textContent = streak + ' / ' + NEED;
      var s = document.getElementById('count-score-value'); if(s) s.textContent = totalCorrect;
    }
    function make(){
      var lv = level(), t, n = 0;
      do { t = cfg.levels[lv](emoji); n++; } while(t.sig && t.sig === lastSig && n < 20);
      lastSig = t.sig || '';
      return t;
    }
    function render(){
      var lv = level();
      cur = make(); cfg._cur = cur;
      updateMeta();
      var seg = '';
      for(var i=0;i<NEED;i++) seg += '<span class="mx-seg' + (i<streak?' on':'') + '"></span>';
      var stars = ''; for(var j=0;j<=lv;j++) stars += '⭐';
      var cls = 'count-options mx-opts ' + (cur.layout || '');
      var btns = cur.opts.map(function(o){
        return '<button class="count-btn" data-value="' + o.v + '">' + o.h + '</button>';
      }).join('');
      root.innerHTML =
        '<div class="mx-top"><span class="mx-lv" title="' + (lv+1) + '/3">' + stars + '</span><div class="mx-bar">' + seg + '</div></div>' +
        '<div class="mx-q">' + cur.q + '</div>' +
        '<div class="' + cls + '">' + btns + '</div>' +
        '<div id="mx-sol"></div>' +
        '<div class="count-feedback" id="count-feedback"></div>';
      root.querySelectorAll('.count-btn').forEach(function(b){
        b.addEventListener('click', function(){ if(busy) return; check(b.getAttribute('data-value'), b); });
      });
      busy = false;
    }
    function finish(){
      if(typeof recordGameResult === 'function') recordGameResult(cfg.key, NEED, NEED);
      var m = msgs();
      root.innerHTML =
        '<div class="finish-screen">' +
          '<div class="finish-emoji">🏆</div>' +
          '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
          '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
          '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
        '</div>';
      document.getElementById('play-again-btn').addEventListener('click', function(){
        streak = 0; totalCorrect = 0; totalAnswered = 0; emoji = pick(EMOJIS); lastSig = ''; render();
      });
    }
    function check(v, btn){
      busy = true; totalAnswered++;
      var fb = document.getElementById('count-feedback'), m = msgs();
      root.querySelectorAll('.count-btn').forEach(function(b){ b.disabled = true; });
      if(v === cur.ans){
        var before = level();
        totalCorrect++; streak++;
        btn.classList.add('correct');
        updateMeta();
        var up = (level() > before && streak < NEED) ? ' 🚀' : '';
        fb.textContent = (m.correct_msg || 'Great job! 🎉') + up;
        fb.className = 'count-feedback show correct';
        setTimeout(streak >= NEED ? finish : render, up ? 1300 : 900);
      } else {
        streak = 0; updateMeta();
        btn.classList.add('wrong');
        root.querySelectorAll('.count-btn').forEach(function(b){ if(b.getAttribute('data-value') === cur.ans) b.classList.add('correct'); });
        fb.textContent = m.wrong_msg || 'Try again';
        fb.className = 'count-feedback show wrong';
        if(cur.sol){
          document.getElementById('mx-sol').innerHTML = '<div class="mx-hint">' + cur.sol + '</div>';
        }
        setTimeout(render, cur.sol ? 3200 : 1500);
      }
    }
    updateMeta();
    render();
  }

  window.MX = {
    run:run, rnd:rnd, pick:pick, shuffle:shuffle, objs:objs, box:box, BOX:BOX, eq:eq, row:row, pair:pair, op:op, ok:ok,
    frame:frame, frames:frames, numline:numline, numOpts:numOpts, SYM3:SYM3, cmpSym:cmpSym, T:T, EMOJIS:EMOJIS
  };
})();
