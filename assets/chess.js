/* Білім Аралы — шахматы: доска, ходы, подсказки, уровни (assets/chess.js). Движок — assets/chess-engine.js, тексты — assets/chess-text.js */
(function(){
  'use strict';
  var E = window.ChessEngine, TT = window.CHESS_TEXT;
  var BASE = (function(){ var s = document.currentScript; return s ? s.src.replace(/[^\/]*$/, '') : 'assets/'; })();
  var LANGS = [['ru', 'RU'], ['kz', 'ҚАЗ'], ['en', 'EN'], ['zh', '中文'], ['uz', 'O\'ZB'], ['tg', 'ТҶК'], ['ug', 'Уйғурчә'], ['fr', 'FR'], ['de', 'DE']];
  var GLYPH = { 1: '♟', 2: '♞', 3: '♝', 4: '♜', 5: '♛', 6: '♚' };
  var LET = ' PNBRQK';
  var KEY = 'bilim_chess_v1';

  function lang(){ try { var s = localStorage.getItem('bilim_lang_v1'); if (s && TT[s]) return s; } catch(e){} return 'ru'; }
  function t(k, n){ var l = TT[lang()] || TT.ru, v = l[k]; if (v === undefined) v = TT.en[k]; if (v === undefined) v = TT.ru[k]; if (n !== undefined) v = v.replace('{n}', n); return v; }
  function load(){ try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); o.wins = o.wins || {}; return o; } catch(e){ return { wins: {} }; } }
  function save(o){ try { localStorage.setItem(KEY, JSON.stringify(o)); } catch(e){} }
  var prog = load();

  var $ = function(id){ return document.getElementById(id); };
  var st = { level: prog.level || 1, color: 'white', pos: null, hist: [], snaps: [], last: null, sel: -1, targets: [], playerSide: 0, over: false, busy: false, token: 0, capW: [], capB: [], hintSq: null, status: null };
  var worker = null, workerOk = true, reqId = 0, pending = {};

  function initWorker(){
    if (worker || !workerOk) return;
    try {
      worker = new Worker(BASE + 'chess-worker.js');
      worker.onmessage = function(e){ var cb = pending[e.data.id]; if (cb){ delete pending[e.data.id]; cb(e.data); } };
      worker.onerror = function(){ workerOk = false; try { worker.terminate(); } catch(x){} worker = null; var ps = pending; pending = {}; for (var k in ps) ps[k](null); };
    } catch(e){ workerOk = false; worker = null; }
  }
  /* просим компьютер: worker, а если не вышло — считаем на странице */
  function askAI(level, time, cb){
    var fen = E.toFEN(st.pos), hist = st.hist.slice(), id = ++reqId;
    initWorker();
    if (worker){
      pending[id] = function(d){ if (d) cb(d.move); else fallback(); };
      worker.postMessage({ id: id, fen: fen, level: level, hist: hist, time: time });
      return id;
    }
    fallback();
    function fallback(){ setTimeout(function(){ var r = E.bestMove(E.fromFEN(fen), level, hist, time); cb(r ? r.move : -1); }, 30); }
    return id;
  }

  /* ===== разметка ===== */
  function build(){
    var root = $('app');
    root.innerHTML = '' +
      '<div class="ch-top"><a class="ch-back" id="chBack" href="index.html"></a><h1 id="chTitle"></h1><select id="chLang" aria-label="Language"></select></div>' +
      '<section id="chSetup" class="ch-card"><p class="ch-sub" id="chSub"></p><h2 id="chPickLevel"></h2><div class="ch-levels" id="chLevels"></div>' +
      '<h2 id="chPickColor"></h2><div class="ch-colors" id="chColors"></div><button class="ch-btn ch-go" id="chStart"></button>' +
      '<button class="ch-link" id="chHelp1"></button></section>' +
      '<section id="chGame" class="ch-game" hidden>' +
        '<div class="ch-bar"><span id="chStatus" class="ch-status"></span><span id="chLvl" class="ch-lvl"></span></div>' +
        '<div class="ch-cap" id="chCapTop"></div>' +
        '<div class="ch-board-wrap"><div class="ch-board" id="chBoard"></div></div>' +
        '<div class="ch-cap" id="chCapBot"></div>' +
        '<div class="ch-bubble" id="chBubble"><span class="ch-b-ic">🐆</span><span id="chSay"></span></div>' +
        '<div class="ch-btns"><button class="ch-btn" id="chUndo"></button><button class="ch-btn" id="chHint"></button><button class="ch-btn" id="chNew"></button><button class="ch-btn ch-sec" id="chLvls"></button><button class="ch-btn ch-sec" id="chHelp2"></button></div>' +
      '</section>' +
      '<div class="ch-modal" id="chModal" hidden><div class="ch-dlg" id="chDlg"></div></div>';
    var sel = $('chLang'); LANGS.forEach(function(l){ var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; sel.appendChild(o); });
    sel.value = lang();
    sel.onchange = function(){ try { localStorage.setItem('bilim_lang_v1', sel.value); } catch(e){} paintText(); renderLevels(); renderBoard(); updateStatus(); };
    var bd = $('chBoard'), i, d;
    for (i = 0; i < 64; i++){ d = document.createElement('div'); d.className = 'ch-sq'; d.setAttribute('data-i', i); bd.appendChild(d); }
    bd.addEventListener('click', function(ev){ var q = ev.target.closest('.ch-sq'); if (q) onSquare(+q.getAttribute('data-vi')); });
    $('chStart').onclick = startGame; $('chNew').onclick = function(){ newGame(); }; $('chUndo').onclick = undo; $('chHint').onclick = hint;
    $('chLvls').onclick = showSetup; $('chHelp1').onclick = $('chHelp2').onclick = showHelp;
  }
  function paintText(){
    document.documentElement.lang = lang() === 'kz' ? 'kk' : lang();
    document.title = t('title') + ' — Білім Аралы';
    $('chTitle').textContent = '♟ ' + t('title'); $('chBack').textContent = t('back'); $('chSub').textContent = t('sub');
    $('chPickLevel').textContent = t('pickLevel'); $('chPickColor').textContent = t('pickColor'); $('chStart').textContent = t('start');
    $('chHelp1').textContent = '❓ ' + t('help'); $('chHelp2').textContent = '❓ ' + t('help');
    $('chUndo').textContent = '↩ ' + t('undo'); $('chHint').textContent = '💡 ' + t('hint'); $('chNew').textContent = '🔄 ' + t('again'); $('chLvls').textContent = '📶 ' + t('levels');
    var cs = $('chColors'); cs.innerHTML = '';
    [['white', '♙ ' + t('white')], ['black', '♟ ' + t('black')], ['random', '🎲 ' + t('random')]].forEach(function(c){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'ch-opt' + (st.color === c[0] ? ' on' : ''); b.textContent = c[1];
      b.onclick = function(){ st.color = c[0]; paintText(); }; cs.appendChild(b); });
    $('chLvl').textContent = t('cls', st.level) + ' · ' + tierName(st.level);
  }
  function tierName(n){ return t('tier' + Math.min(6, Math.ceil(n / 2))); }
  function renderLevels(){
    var box = $('chLevels'); box.innerHTML = '';
    for (var n = 1; n <= 11; n++){ (function(n){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'ch-lv' + (st.level === n ? ' on' : '') + (prog.wins[n] ? ' done' : '');
      b.innerHTML = '<b>' + n + '</b><span>' + t('cls', n) + '</span><small>' + tierName(n) + '</small>' + (prog.wins[n] ? '<i title="' + t('beaten') + '">★</i>' : '');
      b.onclick = function(){ st.level = n; prog.level = n; save(prog); renderLevels(); paintText(); }; box.appendChild(b); })(n); }
  }

  /* ===== доска ===== */
  function vIndex(sq){ return st.playerSide === 0 ? sq : 63 - sq; }   // клетка доски -> позиция на экране
  function renderBoard(){
    if (!st.pos) return;
    var bd = $('chBoard'), cells = bd.children, i, sq, v, el, p = st.pos;
    var checkSq = (st.status && st.status.check) ? (p.side ? p.kb : p.kw) : -1;
    for (i = 0; i < 64; i++){
      sq = st.playerSide === 0 ? i : 63 - i; el = cells[i]; v = p.b[sq];
      var r = sq >> 3, c = sq & 7, cls = 'ch-sq ' + (((r + c) & 1) ? 'dk' : 'lt');
      if (st.last && (sq === st.last[0] || sq === st.last[1])) cls += ' last';
      if (sq === st.sel) cls += ' sel';
      if (st.targets.indexOf(sq) >= 0) cls += v ? ' cap' : ' dot';
      if (sq === checkSq) cls += ' chk';
      if (st.hintSq && (sq === st.hintSq[0] || sq === st.hintSq[1])) cls += ' hint';
      el.className = cls; el.setAttribute('data-vi', sq);
      var f = (st.playerSide === 0 ? c === 0 : c === 7), rk = (st.playerSide === 0 ? r === 7 : r === 0), lab = '';
      if (f) lab += '<em class="rk">' + (8 - r) + '</em>'; if (rk) lab += '<em class="fl">' + String.fromCharCode(97 + c) + '</em>';
      el.innerHTML = lab + (v ? '<span class="pc ' + ((v & 8) ? 'b' : 'w') + '">' + GLYPH[v & 7] + '︎</span>' : '');
    }
    var cw = st.capW.slice().sort(), cb = st.capB.slice().sort();   // съеденные фигуры
    $('chCapTop').innerHTML = capHtml(st.playerSide === 0 ? st.capW : st.capB, st.playerSide === 0 ? 'w' : 'b');
    $('chCapBot').innerHTML = capHtml(st.playerSide === 0 ? st.capB : st.capW, st.playerSide === 0 ? 'b' : 'w');
    $('chUndo').disabled = !st.snaps.length;
  }
  function capHtml(list, side){ return list.slice().sort(function(a, b){ return b - a; }).map(function(v){ return '<span class="pc ' + side + '">' + GLYPH[v] + '︎</span>'; }).join(''); }

  function say(k, extra){ $('chSay').textContent = t(k) + (extra || ''); var b = $('chBubble'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
  function setStatus(txt, cls){ var s = $('chStatus'); s.textContent = txt; s.className = 'ch-status ' + (cls || ''); }

  function updateStatus(){
    if (!st.pos) return;
    var s = st.status || E.status(st.pos);
    if (st.over){
      var m = { mate: st.pos.side === st.playerSide ? 'lose' : 'win', stalemate: 'stalemate', draw50: 'draw50', material: 'material', repeat: 'repeat' }[st.overWhy || s.state] || 'stalemate';
      setStatus(t(m), m === 'win' ? 'good' : m === 'lose' ? 'bad' : ''); return; }
    if (st.pos.side === st.playerSide) setStatus(s.check ? t('youCheck') : t('turnYou'), s.check ? 'bad' : 'good');
    else setStatus(t('turnAi'), '');
  }

  /* ===== партия ===== */
  function showSetup(){ st.token++; $('chGame').hidden = true; $('chSetup').hidden = false; closeModal(); renderLevels(); paintText(); window.scrollTo(0, 0); }
  function startGame(){ $('chSetup').hidden = true; $('chGame').hidden = false; newGame(); }
  function newGame(){
    st.token++; closeModal();
    st.playerSide = st.color === 'random' ? (Math.random() < 0.5 ? 0 : 1) : (st.color === 'black' ? 1 : 0);
    st.pos = E.fromFEN(E.START); st.hist = [E.key(st.pos)]; st.snaps = []; st.last = null; st.sel = -1; st.targets = []; st.over = false; st.overWhy = null;
    st.capW = []; st.capB = []; st.hintSq = null; st.busy = false; st.status = E.status(st.pos);
    paintText(); renderBoard(); updateStatus(); say('bStart');
    if (st.pos.side !== st.playerSide) aiTurn();
  }
  function onSquare(sq){
    if (st.over || st.busy || st.pos.side !== st.playerSide) return;
    st.hintSq = null;
    var v = st.pos.b[sq], mine = v && (((v & 8) ? 1 : 0) === st.playerSide);
    if (st.sel >= 0 && st.targets.indexOf(sq) >= 0){ playerMove(st.sel, sq); return; }
    if (mine){ st.sel = sq; st.targets = E.status(st.pos).moves.filter(function(m){ return E.mFrom(m) === sq; }).map(E.mTo); }
    else { st.sel = -1; st.targets = []; }
    renderBoard();
  }
  function playerMove(from, to){
    var ms = st.status.moves.filter(function(m){ return E.mFrom(m) === from && E.mTo(m) === to; });
    if (!ms.length) return;
    if (ms.length > 1){ askPromotion(function(pt){ var m = ms.filter(function(x){ return E.mPromo(x) === pt; })[0] || ms[0]; doMove(m, true); }); return; }
    doMove(ms[0], true);
  }
  function doMove(m, byPlayer){
    if (byPlayer) st.snaps.push({ fen: E.toFEN(st.pos), hist: st.hist.slice(), last: st.last, capW: st.capW.slice(), capB: st.capB.slice() });
    var cap = st.pos.b[E.mTo(m)], fl = E.mFlags(m), mover = st.pos.side;
    if (fl & 2) cap = 1;
    if (cap){ (mover === 0 ? st.capW : st.capB).push(cap & 7); }
    E.make(st.pos, m); st.last = [E.mFrom(m), E.mTo(m)]; st.sel = -1; st.targets = []; st.hintSq = null;
    st.hist.push(E.key(st.pos)); st.status = E.status(st.pos);
    var k = st.hist[st.hist.length - 1], rep = st.hist.filter(function(x){ return x === k; }).length;
    if (st.status.state !== 'play'){ st.over = true; st.overWhy = st.status.state; }
    else if (rep >= 3){ st.over = true; st.overWhy = 'repeat'; }
    renderBoard(); updateStatus();
    if (st.over){ finish(); return; }
    if (byPlayer){ if (st.status.check) say('bCheckAi'); else if (cap) say('bGood'); }
    else if (st.status.check) say('bCheckYou');
    if (st.pos.side !== st.playerSide) aiTurn();
  }
  function aiTurn(){
    st.busy = true; var tok = st.token, t0 = Date.now();
    askAI(st.level, 0, function(m){
      var wait = Math.max(0, 450 - (Date.now() - t0));
      setTimeout(function(){
        if (tok !== st.token) return;
        st.busy = false;
        if (m < 0){ var ms = st.status.moves; m = ms[(Math.random() * ms.length) | 0]; }
        doMove(m, false);
      }, wait);
    });
  }
  function undo(){
    if (!st.snaps.length) return;
    st.token++; var s = st.snaps.pop(); st.pos = E.fromFEN(s.fen); st.hist = s.hist; st.last = s.last; st.capW = s.capW; st.capB = s.capB;
    st.sel = -1; st.targets = []; st.over = false; st.overWhy = null; st.busy = false; st.hintSq = null; st.status = E.status(st.pos);
    closeModal(); renderBoard(); updateStatus(); say('bUndo');
  }
  function hint(){
    if (st.over || st.busy || st.pos.side !== st.playerSide) return;
    st.busy = true; var tok = st.token;
    askAI(8, 700, function(m){
      if (tok !== st.token) return; st.busy = false;
      if (m >= 0){ st.hintSq = [E.mFrom(m), E.mTo(m)]; st.sel = -1; st.targets = []; renderBoard(); say('bHint'); setTimeout(function(){ if (st.hintSq){ st.hintSq = null; renderBoard(); } }, 3500); }
    });
  }
  function finish(){
    var why = st.overWhy, win = why === 'mate' && st.pos.side !== st.playerSide, lose = why === 'mate' && !win;
    if (win){ prog.wins[st.level] = (prog.wins[st.level] || 0) + 1; save(prog); }
    say(win ? 'bWin' : lose ? 'bLose' : 'bDraw');
    var key = win ? 'win' : lose ? 'lose' : why === 'stalemate' ? 'stalemate' : why === 'draw50' ? 'draw50' : why === 'material' ? 'material' : 'repeat';
    setTimeout(function(){
      var h = '<h3>' + t(key) + '</h3><div class="ch-dbtn">' + (win && st.level < 11 ? '<button class="ch-btn ch-go" id="dNext">' + t('next') + ' ➜</button>' : '') +
        '<button class="ch-btn" id="dAgain">' + t('again') + '</button><button class="ch-btn ch-sec" id="dLv">' + t('levels') + '</button></div>';
      openModal(h);
      var a = $('dAgain'); if (a) a.onclick = function(){ newGame(); };
      var n = $('dNext'); if (n) n.onclick = function(){ st.level++; prog.level = st.level; save(prog); newGame(); };
      var l = $('dLv'); if (l) l.onclick = showSetup;
    }, 700);
  }
  function openModal(html){ $('chDlg').innerHTML = html; $('chModal').hidden = false; }
  function closeModal(){ $('chModal').hidden = true; }
  function askPromotion(cb){
    var h = '<h3>' + t('promo') + '</h3><div class="ch-promo">' + [5, 4, 3, 2].map(function(p){ return '<button type="button" data-p="' + p + '"><span class="pc ' + (st.playerSide ? 'b' : 'w') + '">' + GLYPH[p] + '︎</span><small>' + t(LET[p]) + '</small></button>'; }).join('') + '</div>';
    openModal(h);
    [].forEach.call($('chDlg').querySelectorAll('button[data-p]'), function(b){ b.onclick = function(){ closeModal(); cb(+b.getAttribute('data-p')); }; });
  }
  function showHelp(){
    var h = '<h3>' + t('helpTitle') + '</h3><ul class="ch-help">' + ['K', 'Q', 'R', 'B', 'N', 'P'].map(function(k){ var pv = { K: 6, Q: 5, R: 4, B: 3, N: 2, P: 1 }[k]; return '<li><span class="pc w">' + GLYPH[pv] + '︎</span><span>' + t('h' + k) + '</span></li>'; }).join('') + '</ul><p class="ch-goal">🎯 ' + t('hGoal') + '</p><div class="ch-dbtn"><button class="ch-btn ch-go" id="dOk">' + t('ok') + '</button></div>';
    openModal(h); $('dOk').onclick = closeModal;
  }

  build(); paintText(); renderLevels();
  var q = /[?&]level=(\d+)/.exec(location.search); if (q){ st.level = Math.max(1, Math.min(11, +q[1])); renderLevels(); paintText(); }
  window.__chess = { st: st, E: E, render: function(){ renderBoard(); updateStatus(); } };   // для проверки
})();
