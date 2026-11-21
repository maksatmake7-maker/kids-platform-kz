/* Движок страницы «Проект». Данные: window.PROJ_DATA (см. assets/proj-data/*).
   Прогресс — только в этом браузере: localStorage 'bilim_proj_v1'[id].
   Внешних ссылок, загрузок файлов и отправки данных нет. */
(function(){
  var D = window.PROJ_DATA, U = D.ui, KEY = 'bilim_proj_v1';
  var root = document.getElementById('proj-root');
  var STEPS = ['intro','research','design','make','defend','reflect','finish'];
  function all(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
  function load(){ var a = all(); return a[D.id] || { step:0, read:{}, pick:{}, chk:{}, rate:{}, ref:{}, idea:'', done:0 }; }
  var h1=document.getElementById('pj-h1'); if(h1) h1.textContent=U.page+': '+D.title; document.title=U.page+': '+D.title+' — Білім Аралы'; var bl=document.querySelector('.back-link'); if(bl&&U.back_games) bl.textContent='← '+U.back_games;
  var S = load();
  function save(){ try { var a = all(); a[D.id] = S; localStorage.setItem(KEY, JSON.stringify(a)); } catch(e){} }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function budgetUsed(){ var n = 0; D.design.cats.forEach(function(c, i){ var p = S.pick[i]; if (p != null) n += c.opts[p].cost; }); return n; }
  function designOk(){ return D.design.cats.every(function(c, i){ return S.pick[i] != null; }) && budgetUsed() <= D.design.budget; }
  function readCount(){ return Object.keys(S.read).length; }
  function makeCount(){ return Object.keys(S.chk).filter(function(k){ return S.chk[k]; }).length; }
  function rateCount(){ return Object.keys(S.rate).length; }
  function canNext(){
    switch (STEPS[S.step]) {
      case 'research': return readCount() >= D.research.need;
      case 'design': return designOk();
      case 'make': return makeCount() === D.make.items.length;
      case 'defend': return rateCount() === D.defend.criteria.length;
      case 'reflect': return Object.keys(S.ref).length === D.reflect.qs.length;
      default: return true;
    }
  }
  function hint(){
    switch (STEPS[S.step]) {
      case 'research': return U.need_read.replace('{n}', D.research.need);
      case 'design': return budgetUsed() > D.design.budget ? U.over_budget : U.need_pick;
      case 'make': return U.need_all;
      case 'defend': return U.need_rate;
      case 'reflect': return U.need_ref;
    }
    return '';
  }
  function stars(){
    var s = 1; if (S.idea && S.idea.trim().length >= 5) s++;
    var sum = 0; D.defend.criteria.forEach(function(c, i){ sum += (S.rate[i] || 0); });
    if (sum >= D.defend.criteria.length * 2) s++;
    return s;
  }
  function bar(){
    var h = '<div class="pj-steps">';
    STEPS.forEach(function(k, i){ h += '<div class="pj-dot ' + (i === S.step ? 'on' : (i < S.step ? 'done' : '')) + '">' + esc(U.steps[k]) + '</div>'; });
    return h + '</div>';
  }
  function body(){
    var k = STEPS[S.step], h = '';
    if (k === 'intro') {
      h += '<h2>' + esc(D.title) + '</h2><p>' + esc(D.goal) + '</p>';
      h += '<div class="pj-role"><b>' + esc(U.role) + ': ' + esc(D.role.name) + '</b><p>' + esc(D.role.task) + '</p></div>';
      h += '<p class="pj-note">🛡 ' + esc(U.safety) + '</p>';
      h += '<p>' + esc(U.path) + '</p>';
    } else if (k === 'research') {
      h += '<h2>' + esc(D.research.title) + '</h2><p>' + esc(D.research.lead) + ' (' + readCount() + ' / ' + D.research.need + ')</p><div class="pj-cards">';
      D.research.cards.forEach(function(c, i){
        var o = S.read[i];
        h += '<button class="pj-card ' + (o ? 'open' : '') + '" data-read="' + i + '"><b>' + esc(c.h) + '</b>' + (o ? esc(c.t) : esc(U.tap)) + '</button>';
      });
      h += '</div>';
    } else if (k === 'design') {
      h += '<h2>' + esc(D.design.title) + '</h2><p>' + esc(D.design.lead) + '</p>';
      var used = budgetUsed(), bad = used > D.design.budget;
      h += '<div class="pj-budget ' + (bad ? 'bad' : '') + '">' + esc(U.budget) + ': ' + used + ' / ' + D.design.budget + '</div>';
      D.design.cats.forEach(function(c, i){
        h += '<div class="pj-cat"><h3>' + esc(c.h) + '</h3>';
        c.opts.forEach(function(o, j){
          h += '<button class="pj-opt ' + (S.pick[i] === j ? 'sel' : '') + '" data-cat="' + i + '" data-opt="' + j + '">' + esc(o.t) + ' <b>(' + o.cost + ')</b>' + (S.pick[i] === j ? '<small>' + esc(o.fb) + '</small>' : '') + '</button>';
        });
        h += '</div>';
      });
    } else if (k === 'make') {
      h += '<h2>' + esc(D.make.title) + '</h2><p>' + esc(D.make.lead) + ' (' + makeCount() + ' / ' + D.make.items.length + ')</p>';
      D.make.items.forEach(function(t, i){ h += '<label class="pj-chk"><input type="checkbox" data-chk="' + i + '"' + (S.chk[i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label>'; });
      h += '<p class="pj-note">🛡 ' + esc(D.make.safe) + '</p>';
    } else if (k === 'defend') {
      h += '<h2>' + esc(D.defend.title) + '</h2><p>' + esc(D.defend.lead) + '</p><ul>';
      D.defend.speech.forEach(function(t){ h += '<li>' + esc(t) + '</li>'; });
      h += '</ul><h3>' + esc(U.rate_h) + '</h3>';
      D.defend.criteria.forEach(function(c, i){
        var v = S.rate[i] || 0;
        h += '<div class="pj-rate"><span>' + esc(c) + '</span><span class="st">';
        for (var n = 1; n <= 3; n++) h += '<button data-rate="' + i + ':' + n + '" class="' + (v >= n ? 'on' : '') + '">⭐</button>';
        h += '</span></div>';
      });
    } else if (k === 'reflect') {
      h += '<h2>' + esc(D.reflect.title) + '</h2>';
      D.reflect.qs.forEach(function(q, i){
        h += '<div class="pj-cat"><h3>' + esc(q.q) + '</h3>';
        q.opts.forEach(function(o, j){ h += '<button class="pj-opt ' + (S.ref[i] === j ? 'sel' : '') + '" data-ref="' + i + ':' + j + '">' + esc(o) + '</button>'; });
        h += '</div>';
      });
      h += '<h3>' + esc(D.reflect.idea) + '</h3><textarea id="pj-idea" maxlength="300" placeholder="' + esc(U.idea_ph) + '">' + esc(S.idea || '') + '</textarea><p class="pj-note">' + esc(U.local) + '</p>';
    } else {
      var n = stars();
      h += '<h2>' + esc(D.finish.title) + '</h2><div class="pj-star">' + '⭐'.repeat(n) + '</div><p>' + esc(D.finish.text) + '</p>';
      h += '<div class="pj-sum"><b>' + esc(U.my_design) + ':</b><ul>';
      D.design.cats.forEach(function(c, i){ h += '<li>' + esc(c.h.replace(/[?]$/, '')) + ': ' + esc(c.opts[S.pick[i]].t) + '</li>'; });
      h += '</ul>' + (S.idea ? '<p><b>' + esc(U.my_idea) + ':</b> ' + esc(S.idea) + '</p>' : '') + '</div>';
      h += '<p>' + esc(D.finish.next) + '</p>';
    }
    return h;
  }
  function render(){
    var last = S.step === STEPS.length - 1;
    var h = '<div class="pj">' + bar() + body() + '<div class="pj-msg" id="pj-msg"></div><div class="pj-nav">';
    h += '<button class="pj-btn sec" id="pj-back"' + (S.step === 0 ? ' disabled' : '') + '>← ' + esc(U.back) + '</button>';
    h += last ? '<button class="pj-btn" id="pj-restart">' + esc(U.again) + '</button>' : '<button class="pj-btn" id="pj-next">' + esc(U.next) + ' →</button>';
    h += '</div></div>';
    root.innerHTML = h;
  }
  function go(d){ S.step = Math.max(0, Math.min(STEPS.length - 1, S.step + d)); save(); render(); window.scrollTo(0, 0);
    if (STEPS[S.step] === 'finish' && !S.done) { S.done = 1; save(); try { recordGameResult(D.key, stars(), 3); } catch(e){} render(); } }
  root.addEventListener('click', function(e){
    var t = e.target.closest('button, input'); if (!t) return;
    if (t.id === 'pj-next') { if (!canNext()) { document.getElementById('pj-msg').textContent = hint(); return; } go(1); }
    else if (t.id === 'pj-back') go(-1);
    else if (t.id === 'pj-restart') { S = { step:0, read:{}, pick:{}, chk:{}, rate:{}, ref:{}, idea:'', done:S.done }; save(); render(); }
    else if (t.dataset.read != null) { S.read[t.dataset.read] = 1; save(); render(); }
    else if (t.dataset.cat != null) { S.pick[t.dataset.cat] = +t.dataset.opt; save(); render(); }
    else if (t.dataset.chk != null) { S.chk[t.dataset.chk] = t.checked ? 1 : 0; save(); render(); }
    else if (t.dataset.rate) { var p = t.dataset.rate.split(':'); S.rate[p[0]] = +p[1]; save(); render(); }
    else if (t.dataset.ref) { var q = t.dataset.ref.split(':'); S.ref[q[0]] = +q[1]; save(); render(); }
  });
  root.addEventListener('input', function(e){ if (e.target.id === 'pj-idea') { S.idea = e.target.value; save(); } });
  render();
})();
