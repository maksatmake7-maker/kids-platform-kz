/* ===== Білім Аралы — награды и отчёт (данные берутся из этого браузера) =====
   Читает то, что уже сохраняют курсы и игры: прогресс курсов (ключи bilim_*course_v1),
   общие звёзды (bilim_araly_progress_v1) и журнал занятий по дням (bilim_activity_v1).
   Требует assets/courses-registry.js (список курсов). Ничего никуда не отправляет. */
(function(){
  var SK = 'bilim_stickers_v1', AK = 'bilim_activity_v1', PK = 'bilim_araly_progress_v1';
  function jget(k, d){ try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e){ return d; } }
  function dayStr(d){ d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function courseState(c){
    var P = jget(c.key, {}), done = 0, stars = 0;
    var per = c.lessons.map(function(l){ var s = +P[l.id] || 0; if(s){ done++; stars += s; } return { id: l.id, title: l.title, icon: l.icon, stars: s }; });
    return { course: c, lessons: per, done: done, total: c.lessons.length, stars: stars, maxStars: c.lessons.length * 3, complete: done === c.lessons.length };
  }
  function allStates(){ return (window.BILIM_COURSES || []).map(courseState); }
  function activity(){ return jget(AK, {}); }
  function streak(){
    var a = activity(), d = new Date(); if(!a[dayStr(d)]) d.setDate(d.getDate() - 1);
    var n = 0; while(a[dayStr(d)]){ n++; d.setDate(d.getDate() - 1); } return n;
  }
  var WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  function lastDays(n){
    var a = activity(), out = [], d = new Date(); d.setDate(d.getDate() - (n - 1));
    for(var i = 0; i < n; i++){ out.push({ day: dayStr(d), count: a[dayStr(d)] || 0, label: WD[d.getDay()], num: d.getDate() }); d.setDate(d.getDate() + 1); }
    return out;
  }
  function progress(){ return jget(PK, { totalStars: 0, games: {} }); }
  function totalStars(){ return progress().totalStars || 0; }
  function gamesPlayed(){ var g = progress().games || {}, n = 0, t = 0; Object.keys(g).forEach(function(k){ if(k.indexOf('course_') !== 0 && g[k].timesPlayed){ n++; t += g[k].timesPlayed; } }); return { kinds: n, times: t }; }

  /* особые наклейки: [id, значок, название, описание, получено?, подпись о ходе] */
  function special(states){
    var courses = states.filter(function(s){ return s.complete; }).length, lessons = states.reduce(function(a, s){ return a + s.done; }, 0);
    var three = states.reduce(function(a, s){ return a + s.lessons.filter(function(l){ return l.stars === 3; }).length; }, 0);
    var st = totalStars(), sk = streak(), out = [];
    function add(id, icon, title, text, cur, need){ out.push({ id: id, icon: icon, title: title, text: text, got: cur >= need, cur: Math.min(cur, need), need: need }); }
    add('first', '🌟', 'Первый шаг', 'Пройти первый урок курса', lessons, 1);
    add('c1', '🏅', 'Первый курс', 'Пройти курс целиком', courses, 1);
    add('c5', '🏆', '5 курсов', 'Пройти 5 курсов', courses, 5);
    add('c10', '👑', '10 курсов', 'Пройти 10 курсов', courses, 10);
    add('three', '✨', 'Мастер без ошибок', 'Получить 3 звезды за 10 уроков', three, 10);
    add('s100', '⭐', '100 звёзд', 'Набрать 100 звёзд', st, 100);
    add('s500', '🌠', '500 звёзд', 'Набрать 500 звёзд', st, 500);
    add('s1000', '💫', '1000 звёзд', 'Набрать 1000 звёзд', st, 1000);
    add('k3', '🔥', '3 дня подряд', 'Заниматься 3 дня подряд', sk, 3);
    add('k7', '🔥', 'Неделя подряд', 'Заниматься 7 дней подряд', sk, 7);
    add('k14', '🚀', '2 недели подряд', 'Заниматься 14 дней подряд', sk, 14);
    (window.BILIM_SUBJECTS || []).forEach(function(s){
      var mine = states.filter(function(x){ return x.course.subject === s.id; });
      if(mine.length > 1) add('m_' + s.id, s.icon, 'Знаток: ' + s.name, 'Пройти все курсы предмета «' + s.name + '»', mine.filter(function(x){ return x.complete; }).length, mine.length);
    });
    return out;
  }
  window.BilimRewards = { esc: esc, dayStr: dayStr, jget: jget, courseState: courseState, allStates: allStates, activity: activity, streak: streak, lastDays: lastDays, progress: progress, totalStars: totalStars, gamesPlayed: gamesPlayed, special: special, STICKER_KEY: SK };
})();
