/* Повторение ошибок. Берёт вопросы, на которые ребёнок ответил неверно в итоговых тестах
   (localStorage 'bilim_wrong_v1'), фильтрует по предмету страницы (window.RP.subject).
   Верный ответ убирает вопрос из списка. Итоги — 'bilim_rep_v1' {fixed, sessions}. Данные не покидают устройство. */
(function(){
  var C = window.RP, U = C.ui, WK = 'bilim_wrong_v1', RK = 'bilim_rep_v1', BATCH = 8;
  var root = document.getElementById('rp-root');
  var h1 = document.getElementById('rp-h1'); if (h1) h1.textContent = U.title; document.title = U.title + ' — Білім Аралы';
  var bl = document.querySelector('.back-link'); if (bl && U.back_games) bl.textContent = '← ' + U.back_games;
  function jget(k){ try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e){ return {}; } }
  function jset(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var S = null;
  function pool(){ var w = jget(WK); return Object.keys(w).map(function(k){ return w[k]; }).filter(function(x){ return x.subject === C.subject; }); }
  function start(){
    var p = pool();
    if (!p.length) return empty();
    p.sort(function(a, b){ return (b.n || 0) - (a.n || 0); });
    var top = shuffle(p.slice(0, BATCH * 2)).slice(0, BATCH);
    S = { items: top.map(function(x){ return { q: x, ord: shuffle(x.o.map(function(t, k){ return k; })) }; }), i: 0, ok: 0, picked: null };
    render();
  }
  function empty(){
    var r = jget(RK);
    root.innerHTML = '<div class="qt"><p class="qt-big">' + esc(U.empty) + '</p>' + (r.fixed ? '<p class="qt-note">' + esc(U.fixed_total.replace('{n}', r.fixed)) + '</p>' : '') + '<p>' + esc(U.empty_hint) + '</p></div>';
  }
  function render(){
    if (S.i >= S.items.length) return done();
    var it = S.items[S.i], q = it.q, n = S.items.length;
    var h = '<div class="qt"><div class="qt-bar"><span style="width:' + Math.round(S.i / n * 100) + '%"></span></div>' +
      '<div class="qt-meta">' + esc(U.q_of.replace('{i}', S.i + 1).replace('{n}', n)) + (q.t ? ' · ' + esc(q.t) : '') + '</div>' +
      '<h2 class="qt-q">' + esc(q.q) + '</h2><div class="qt-opts">';
    it.ord.forEach(function(k){
      var cls = 'qt-opt';
      if (S.picked != null) { if (k === q.a) cls += ' ok'; else if (k === S.picked) cls += ' bad'; }
      h += '<button class="' + cls + '" data-k="' + k + '"' + (S.picked != null ? ' disabled' : '') + '>' + esc(q.o[k]) + '</button>';
    });
    h += '</div>';
    if (S.picked != null) {
      var good = S.picked === q.a;
      h += '<div class="qt-fb ' + (good ? 'ok' : 'bad') + '"><b>' + esc(good ? U.correct : U.wrong) + '</b> ' + esc(q.w || '') + '</div><button class="qt-btn" id="rp-next">' + esc(S.i + 1 >= n ? U.finish : U.next) + '</button>';
    }
    root.innerHTML = h + '</div>';
    Array.prototype.forEach.call(root.querySelectorAll('.qt-opt'), function(b){ b.onclick = function(){ answer(+b.getAttribute('data-k')); }; });
    var nx = document.getElementById('rp-next'); if (nx) nx.onclick = function(){ S.i++; S.picked = null; render(); };
  }
  function answer(k){
    var q = S.items[S.i].q; S.picked = k;
    var w = jget(WK);
    if (k === q.a) { S.ok++; delete w[q.id]; } else if (w[q.id]) { w[q.id].n = (w[q.id].n || 0) + 1; }
    jset(WK, w); render();
  }
  function done(){
    var r = jget(RK); r.fixed = (r.fixed || 0) + S.ok; r.sessions = (r.sessions || 0) + 1; r.date = new Date().toISOString().slice(0, 10); jset(RK, r);
    var left = pool().length;
    root.innerHTML = '<div class="qt"><h2>' + esc(U.result_h) + '</h2><p class="qt-big">' + esc(U.fixed.replace('{a}', S.ok).replace('{n}', S.items.length)) + '</p>' +
      '<p class="qt-note">' + esc(left ? U.left.replace('{n}', left) : U.none_left) + '</p>' +
      (left ? '<button class="qt-btn" id="rp-again">' + esc(U.again) + '</button>' : '') + '</div>';
    var a = document.getElementById('rp-again'); if (a) a.onclick = start;
  }
  start();
})();
