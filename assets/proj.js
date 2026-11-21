/* Движок страницы «Проект». Данные: window.PROJ_DATA (см. assets/proj-data/*).
   Прогресс — только в этом браузере: localStorage 'bilim_proj_v1'[id].
   Внешних ссылок, загрузок файлов и отправки данных нет. */
(function(){
  var D = window.PROJ_DATA, U = D.ui, KEY = 'bilim_proj_v1';
  var root = document.getElementById('proj-root');
  var STEPS = ['intro','research','design','make','defend','reflect','finish'];
  function all(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
  function load(){ var a = all(); return a[D.id] || { step:0, read:{}, pick:{}, chk:{}, rate:{}, ref:{}, idea:'', done:0, title:'', author:'', desc:'', draw:'', date:'' }; }
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
      case 'make': return !!S.draw && (S.title || '').trim().length >= 2;
      case 'defend': return rateCount() === D.defend.criteria.length;
      case 'reflect': return Object.keys(S.ref).length === D.reflect.qs.length;
      default: return true;
    }
  }
  function hint(){
    switch (STEPS[S.step]) {
      case 'research': return U.need_read.replace('{n}', D.research.need);
      case 'design': return budgetUsed() > D.design.budget ? U.over_budget : U.need_pick;
      case 'make': return !S.draw ? U.need_draw : U.need_title;
      case 'defend': return U.need_rate;
      case 'reflect': return U.need_ref;
    }
    return '';
  }
  function ratesum(){ var sum = 0; D.defend.criteria.forEach(function(c, i){ sum += (S.rate[i] || 0); }); return sum; }
  function stars(){
    var s = 1; if ((S.desc || '').trim().length >= 10) s++;
    if (makeCount() === D.make.items.length) s++;
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
      h += '<h2>' + esc(D.make.title) + '</h2><p>' + esc(D.make.lead) + '</p>';
      h += '<h3>' + esc(U.draw_h) + '</h3><p>' + esc(U.draw_lead) + '</p>';
      h += '<div class="pj-tools" id="pj-tools">';
      ['#222','#E74C3C','#F39C12','#F1C40F','#2ECC71','#3498DB','#8E44AD','#8B5A2B'].forEach(function(c){ h += '<button class="pj-sw" data-color="' + c + '" style="background:' + c + '" aria-label="color"></button>'; });
      h += '<button class="pj-tl" data-size="3">• 3</button><button class="pj-tl" data-size="8">● 8</button><button class="pj-tl" data-size="16">⬤ 16</button>';
      h += '<button class="pj-tl" data-mode="eraser">' + esc(U.tool_eraser) + '</button><button class="pj-tl" data-clear="1">' + esc(U.tool_clear) + '</button></div>';
      h += '<div class="pj-tools">' + esc(U.tool_stamp) + ': ';
      D.make.stamps.forEach(function(e){ h += '<button class="pj-tl" data-stamp="' + e + '">' + e + '</button>'; });
      h += '</div><canvas id="pj-cv" width="640" height="420"></canvas>';
      h += '<label class="pj-lab">' + esc(U.title_label) + '<input id="pj-title" maxlength="40" placeholder="' + esc(U.title_ph) + '" value="' + esc(S.title || '') + '"></label>';
      h += '<label class="pj-lab">' + esc(U.author_label) + '<input id="pj-author" maxlength="20" placeholder="' + esc(U.author_ph) + '" value="' + esc(S.author || '') + '"></label>';
      h += '<label class="pj-lab">' + esc(U.desc_label) + '<textarea id="pj-desc" maxlength="300" placeholder="' + esc(U.desc_ph) + '">' + esc(S.desc || '') + '</textarea></label>';
      h += '<h3>' + esc(U.extra_h) + ' (' + makeCount() + ' / ' + D.make.items.length + ')</h3>';
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
      h += '<h2>' + esc(D.finish.title) + '</h2><div class="pj-star">' + '⭐'.repeat(n) + '</div><p>' + esc(U.final_text) + '</p>';
      h += '<div id="pj-pass" class="pj-pass"><div class="pj-pass-h">' + esc(U.pass_h) + ' · ' + esc(D.title) + '</div>';
      h += '<img class="pj-pass-img" alt="" src="' + S.draw + '">';
      h += '<div class="pj-pass-t">' + esc(S.title) + '</div>';
      h += '<p><b>' + esc(U.pass_by) + ':</b> ' + esc(S.author || '—') + ' &nbsp; <b>' + esc(U.pass_date) + ':</b> ' + esc(S.date || '') + '</p>';
      if (S.desc) h += '<p><b>' + esc(U.pass_desc) + ':</b> ' + esc(S.desc) + '</p>';
      h += '<ul>';
      D.design.cats.forEach(function(c, i){ h += '<li>' + esc(c.h.replace(/[?]$/, '')) + ': ' + esc(c.opts[S.pick[i]].t) + '</li>'; });
      h += '</ul><p><b>' + esc(U.pass_budget) + ':</b> ' + budgetUsed() + ' / ' + D.design.budget + ' &nbsp; <b>' + esc(U.pass_stars) + ':</b> ' + ratesum() + ' / ' + D.defend.criteria.length * 3 + ' ⭐</p>';
      if (S.idea) h += '<p><b>' + esc(U.my_idea) + ':</b> ' + esc(S.idea) + '</p>';
      h += '</div><p class="pj-act"><button class="pj-btn" id="pj-print">🖨 ' + esc(U.print) + '</button> <a class="pj-btn sec" download="project.png" href="' + S.draw + '">⬇ ' + esc(U.save_pic) + '</a></p>';
      h += '<p>' + esc(D.finish.next) + '</p>';
    }
    return h;
  }
  var T = { color:'#222', size:8, mode:'brush', stamp:'' };
  function initCanvas(){
    var cv = document.getElementById('pj-cv'); if (!cv) return; var cx = cv.getContext('2d');
    cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height);
    if (S.draw) { var im = new Image(); im.onload = function(){ cx.drawImage(im, 0, 0); }; im.src = S.draw; }
    var drawing = false, last = null;
    function pt(e){ var r = cv.getBoundingClientRect(); return { x:(e.clientX - r.left) * cv.width / r.width, y:(e.clientY - r.top) * cv.height / r.height }; }
    function persist(){ S.draw = cv.toDataURL('image/png'); save(); var m = document.getElementById('pj-msg'); if (m) m.textContent = ''; }
    cv.addEventListener('pointerdown', function(e){
      e.preventDefault(); var p = pt(e);
      if (T.stamp) { cx.font = '48px serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(T.stamp, p.x, p.y); persist(); return; }
      drawing = true; last = p; try { cv.setPointerCapture(e.pointerId); } catch(x){}
      cx.beginPath(); cx.arc(p.x, p.y, T.size / 2, 0, 6.3); cx.fillStyle = T.mode === 'eraser' ? '#fff' : T.color; cx.fill();
    });
    cv.addEventListener('pointermove', function(e){
      if (!drawing) return; var p = pt(e);
      cx.strokeStyle = T.mode === 'eraser' ? '#fff' : T.color; cx.lineWidth = T.size; cx.lineCap = 'round'; cx.lineJoin = 'round';
      cx.beginPath(); cx.moveTo(last.x, last.y); cx.lineTo(p.x, p.y); cx.stroke(); last = p;
    });
    function end(){ if (drawing) { drawing = false; persist(); } }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end); cv.addEventListener('pointerleave', end);
    root.__clear = function(){ cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); S.draw = ''; save(); };
  }
  function render(){
    var last = S.step === STEPS.length - 1;
    var h = '<div class="pj">' + bar() + body() + '<div class="pj-msg" id="pj-msg"></div><div class="pj-nav">';
    h += '<button class="pj-btn sec" id="pj-back"' + (S.step === 0 ? ' disabled' : '') + '>← ' + esc(U.back) + '</button>';
    h += last ? '<button class="pj-btn" id="pj-restart">' + esc(U.again) + '</button>' : '<button class="pj-btn" id="pj-next">' + esc(U.next) + ' →</button>';
    h += '</div></div>';
    root.innerHTML = h;
    if (STEPS[S.step] === 'make') initCanvas();
  }
  function go(d){ S.step = Math.max(0, Math.min(STEPS.length - 1, S.step + d)); save(); render(); window.scrollTo(0, 0);
    if (STEPS[S.step] === 'finish') { S.date = new Date().toLocaleDateString(); save(); }
    if (STEPS[S.step] === 'finish' && !S.done) { S.done = 1; save(); try { recordGameResult(D.key, stars(), 3); } catch(e){} render(); } }
  root.addEventListener('click', function(e){
    var t = e.target.closest('button, input'); if (!t) return;
    if (t.id === 'pj-next') { if (!canNext()) { document.getElementById('pj-msg').textContent = hint(); return; } go(1); }
    else if (t.id === 'pj-back') go(-1);
    else if (t.id === 'pj-restart') { S = { step:0, read:{}, pick:{}, chk:{}, rate:{}, ref:{}, idea:'', done:S.done, title:'', author:'', desc:'', draw:'', date:'' }; save(); render(); }
    else if (t.id === 'pj-print') { window.print(); }
    else if (t.dataset.color || t.dataset.size || t.dataset.mode || t.dataset.stamp) {
      var ks = t.dataset.color ? 'color' : t.dataset.size ? 'size' : t.dataset.mode ? 'mode' : 'stamp';
      Array.prototype.forEach.call(root.querySelectorAll('[data-' + ks + ']'), function(b){ b.classList.remove('on'); }); t.classList.add('on');
      if (ks === 'color') { T.color = t.dataset.color; T.mode = 'brush'; T.stamp = ''; }
      else if (ks === 'size') { T.size = +t.dataset.size; T.stamp = ''; }
      else if (ks === 'mode') { T.mode = 'eraser'; T.stamp = ''; }
      else { T.stamp = (T.stamp === t.dataset.stamp ? '' : t.dataset.stamp); if (!T.stamp) t.classList.remove('on'); }
    }
    else if (false) { T.color = t.dataset.color; T.mode = 'brush'; T.stamp = ''; }
    else if (t.dataset.size) { T.size = +t.dataset.size; T.stamp = ''; }
    else if (t.dataset.mode) { T.mode = 'eraser'; T.stamp = ''; }
    else if (t.dataset.stamp) { T.stamp = (T.stamp === t.dataset.stamp ? '' : t.dataset.stamp); }
    else if (t.dataset.clear) { if (root.__clear) root.__clear(); }
    else if (t.dataset.read != null) { S.read[t.dataset.read] = 1; save(); render(); }
    else if (t.dataset.cat != null) { S.pick[t.dataset.cat] = +t.dataset.opt; save(); render(); }
    else if (t.dataset.chk != null) { S.chk[t.dataset.chk] = t.checked ? 1 : 0; save(); render(); }
    else if (t.dataset.rate) { var p = t.dataset.rate.split(':'); S.rate[p[0]] = +p[1]; save(); render(); }
    else if (t.dataset.ref) { var q = t.dataset.ref.split(':'); S.ref[q[0]] = +q[1]; save(); render(); }
  });
  root.addEventListener('input', function(e){
    var i = e.target.id, m = { 'pj-idea':'idea', 'pj-title':'title', 'pj-author':'author', 'pj-desc':'desc' };
    if (m[i]) { S[m[i]] = e.target.value; save(); } });
  render();
})();
