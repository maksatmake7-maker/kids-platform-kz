/* Видео-шаг урока для страниц курсов «Білім Аралы».
   Подключение: <script src="…/assets/lesson-video.js"></script> до основного скрипта курса,
   затем в курсе:  SCENES.video = window.LessonVideoScene;
   Шаг урока: { id, scene:'video', gate:true, silent:true, title, src, poster, text, hint? } */
(function(){
  if (!document.getElementById('lv-css')){
    var s = document.createElement('style'); s.id = 'lv-css';
    s.textContent =
      '.ac-vid{max-width:720px;margin:4px auto 0;}' +
      '.ac-vid-frame{position:relative;border-radius:24px;overflow:hidden;background:#1D3557;border:5px solid #FFC93C;box-shadow:0 10px 0 rgba(29,53,87,.14),0 18px 34px rgba(29,53,87,.2);aspect-ratio:16/9;}' +
      '.ac-vid-frame video{width:100%;height:100%;display:block;background:#8DD3F7;object-fit:contain;}' +
      ".ac-vid-tag{position:absolute;left:12px;top:12px;background:#FF6B4A;color:#fff;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:.9rem;padding:4px 12px;border-radius:999px;pointer-events:none;z-index:2;box-shadow:0 3px 0 rgba(0,0,0,.18);}" +
      '.ac-vid-row{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:12px 4px 0;}' +
      ".ac-vid-hint{font-family:'Baloo 2',sans-serif;font-weight:700;color:#1D3557;font-size:1.02rem;}" +
      '.ac-vid-hint.ac-ok{color:#1D6B2E;}' +
      ".ac-vid-skip{background:none;border:none;color:#5C7690;font-family:'Nunito',sans-serif;font-weight:700;font-size:.9rem;text-decoration:underline;cursor:pointer;padding:6px;}";
    document.head.appendChild(s);
  }
  window.LessonVideoScene = function(stage, st, ctx){
    var hint0 = st.hint || 'Нажми ▶ и смотри вместе с Барсиком';
    stage.innerHTML = '<div class="ac-vid"><div class="ac-vid-frame"><span class="ac-vid-tag">🎬 Видео-урок</span>' +
      '<video id="ac-video" controls playsinline preload="metadata" poster="' + st.poster + '"><source src="' + st.src + '" type="video/mp4"></video></div>' +
      '<div class="ac-vid-row"><span class="ac-vid-hint" id="ac-vid-hint">' + hint0 + '</span><button class="ac-vid-skip" id="ac-vid-skip" type="button">Пропустить видео</button></div></div>';
    var v = stage.querySelector('#ac-video'), hint = stage.querySelector('#ac-vid-hint'), skip = stage.querySelector('#ac-vid-skip');
    var fin = function(){
      hint.textContent = '✓ Молодец! Теперь задания'; hint.classList.add('ac-ok'); skip.style.display = 'none';
      try { if (typeof bsReact === 'function') bsReact('happy', 1800); } catch(e){}
      ctx.done();
    };
    v.addEventListener('ended', fin);
    v.addEventListener('play', function(){ hint.textContent = 'Смотри внимательно 👀'; });
    v.addEventListener('error', function(){ hint.textContent = 'Видео не загрузилось. Можно пропустить'; }, true);
    skip.onclick = function(){ try { v.pause(); } catch(e){} fin(); };
  };
})();
