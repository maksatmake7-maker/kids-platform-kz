/* Итоговый тест четверти. Данные: window.QT_DATA (assets/qt-data/*).
   Прогресс — только в этом браузере: localStorage 'bilim_qt_v1'[id].
   Ошибки копятся в 'bilim_wrong_v1' (для будущего режима «Повторение ошибок»).
   Внешних ссылок и отправки данных нет. */
(function(){
  var D = window.QT_DATA, U = D.ui, KEY = 'bilim_qt_v1', WK = 'bilim_wrong_v1';
  var root = document.getElementById('qt-root');
  var h1 = document.getElementById('qt-h1'); if (h1) h1.textContent = D.title; document.title = D.title + ' — Білім Аралы';
  var bl = document.querySelector('.back-link'); if (bl && U.back_games) bl.textContent = '← ' + U.back_games;
  function jget(k){ try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e){ return {}; } }
  function jset(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var run = null;
  function stars(a, n){ var r = a / n; return r >= 0.85 ? 3 : r >= 0.65 ? 2 : r >= 0.4 ? 1 : 0; }
  function start(){
    run = { i: 0, ok: 0, picked: null, wrong: [],
      order: shuffle(D.questions.map(function(q, i){ return i; })) };
    run.opts = {}; run.order.forEach(function(qi){ run.opts[qi] = shuffle(D.questions[qi].o.map(function(t, k){ return k; })); });
    render();
  }
  function intro(){
    var st = jget(KEY)[D.id];
    var best = st ? '<p class="qt-note">' + esc(U.best.replace('{a}', st.best).replace('{n}', D.questions.length)) + '</p>' : '';
    root.innerHTML = '<div class="qt"><p>' + esc(U.intro) + '</p>' + best +
      '<p class="qt-note">' + esc(U.rules.replace('{n}', D.questions.length)) + '</p>' +
      '<button class="qt-btn" id="qt-go">' + esc(U.start) + '</button></div>';
    document.getElementById('qt-go').onclick = start;
  }
  function render(){
    if (run.i >= run.order.length) return result();
    var qi = run.order[run.i], q = D.questions[qi], ord = run.opts[qi], n = run.order.length;
    var h = '<div class="qt"><div class="qt-bar"><span style="width:' + Math.round(run.i / n * 100) + '%"></span></div>' +
      '<div class="qt-meta">' + esc(U.q_of.replace('{i}', run.i + 1).replace('{n}', n)) + (q.t ? ' · ' + esc(q.t) : '') + '</div>' +
      '<h2 class="qt-q">' + esc(q.q) + '</h2><div class="qt-opts">';
    ord.forEach(function(k, pos){
      var cls = 'qt-opt';
      if (run.picked != null) { if (k === q.a) cls += ' ok'; else if (k === run.picked) cls += ' bad'; }
      h += '<button class="' + cls + '" data-k="' + k + '"' + (run.picked != null ? ' disabled' : '') + '>' + esc(q.o[k]) + '</button>';
    });
    h += '</div>';
    if (run.picked != null) {
      var good = run.picked === q.a;
      h += '<div class="qt-fb ' + (good ? 'ok' : 'bad') + '"><b>' + esc(good ? U.correct : U.wrong) + '</b> ' + esc(q.w || '') + '</div>' +
        '<button class="qt-btn" id="qt-next">' + esc(run.i + 1 >= n ? U.finish : U.next) + '</button>';
    }
    root.innerHTML = h + '</div>';
    Array.prototype.forEach.call(root.querySelectorAll('.qt-opt'), function(b){
      b.onclick = function(){ answer(+b.getAttribute('data-k')); };
    });
    var nx = document.getElementById('qt-next'); if (nx) nx.onclick = function(){ run.i++; run.picked = null; render(); };
  }
  function answer(k){
    var qi = run.order[run.i], q = D.questions[qi];
    run.picked = k;
    if (k === q.a) run.ok++; else run.wrong.push(qi);
    render();
  }
  function result(){
    var n = run.order.length, s = stars(run.ok, n), all = jget(KEY), st = all[D.id] || { best: 0, runs: 0 };
    st.runs++; st.last = run.ok; if (run.ok > st.best) st.best = run.ok; st.date = new Date().toISOString().slice(0, 10);
    all[D.id] = st; jset(KEY, all);
    var w = jget(WK);
    D.questions.forEach(function(q, qi){ var id = D.id + ':' + qi; if (run.wrong.indexOf(qi) >= 0) w[id] = { id: id, test: D.id, subject: D.subject, t: q.t || '', q: q.q, o: q.o, a: q.a, w: q.w || '', n: ((w[id] && w[id].n) || 0) + 1 }; });
    jset(WK, w);
    try { recordGameResult(D.key, s, 3); } catch(e){}
    var h = '<div class="qt"><h2>' + esc(U.result_h) + '</h2><div class="qt-stars">' + '⭐'.repeat(s) + '☆'.repeat(3 - s) + '</div>' +
      '<p class="qt-big">' + esc(U.score.replace('{a}', run.ok).replace('{n}', n)) + '</p>';
    if (run.wrong.length) {
      var topics = []; run.wrong.forEach(function(qi){ var t = D.questions[qi].t; if (t && topics.indexOf(t) < 0) topics.push(t); });
      h += '<h3>' + esc(U.repeat_h) + '</h3>';
      if (topics.length) h += '<ul>' + topics.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
      h += '<details class="qt-det"><summary>' + esc(U.show_wrong) + '</summary>' + run.wrong.map(function(qi){ var q = D.questions[qi]; return '<div class="qt-wq"><b>' + esc(q.q) + '</b><br>✔ ' + esc(q.o[q.a]) + (q.w ? '<br><small>' + esc(q.w) + '</small>' : '') + '</div>'; }).join('') + '</details>';
    } else h += '<p class="qt-note">' + esc(U.all_good) + '</p>';
    h += '<button class="qt-btn" id="qt-again">' + esc(U.again) + '</button></div>';
    root.innerHTML = h;
    document.getElementById('qt-again').onclick = start;
  }
  intro();
})();
