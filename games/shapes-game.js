/* ===== Білім Аралы — игра "Найди линию" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, цель 1.3.1.1):
   "распознавать и называть геометрические фигуры: точка, прямая,
   кривая, ломаная, замкнутая и незамкнутая линии, отрезок, луч, угол".
   Показываем название, ребёнок находит подходящую SVG-иконку среди 4.
   Понятий всего 7 — они не заканчиваются, а случайно повторяются;
   чтобы "освоить" тему, нужно ответить верно 10 раз ПОДРЯД (без повтора
   одного и того же понятия два раза подряд). Ошибка сбрасывает серию,
   но не прерывает игру — сразу следующий вопрос.
   Использование: initShapesGame('game-root') — shapes.html не трогать.
*/
function initShapesGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // Каждая фигура: [ключ_названия, генератор SVG-иконки]
  var SHAPES = [
    ['shape_tochka', function(){
      return '<svg viewBox="0 0 100 60"><circle cx="50" cy="30" r="6" fill="#1D3557"/></svg>';
    }],
    ['shape_pryamaya', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="10" y1="30" x2="90" y2="30" stroke="#1D3557" stroke-width="4"/>' +
        '<path d="M6 24 L12 30 L6 36" fill="none" stroke="#1D3557" stroke-width="3"/>' +
        '<path d="M94 24 L88 30 L94 36" fill="none" stroke="#1D3557" stroke-width="3"/>' +
        '</svg>';
    }],
    ['shape_krivaya', function(){
      return '<svg viewBox="0 0 100 60"><path d="M10 45 Q35 5 50 30 Q65 55 90 15" fill="none" stroke="#1D3557" stroke-width="4" stroke-linecap="round"/></svg>';
    }],
    ['shape_lomanaya', function(){
      return '<svg viewBox="0 0 100 60"><polyline points="10,45 30,15 50,45 70,15 90,40" fill="none" stroke="#1D3557" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }],
    ['shape_otrezok', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="15" y1="30" x2="85" y2="30" stroke="#1D3557" stroke-width="4"/>' +
        '<circle cx="15" cy="30" r="5" fill="#1D3557"/>' +
        '<circle cx="85" cy="30" r="5" fill="#1D3557"/>' +
        '</svg>';
    }],
    ['shape_luch', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="15" y1="30" x2="88" y2="30" stroke="#1D3557" stroke-width="4"/>' +
        '<circle cx="15" cy="30" r="5" fill="#1D3557"/>' +
        '<path d="M82 24 L92 30 L82 36" fill="none" stroke="#1D3557" stroke-width="3"/>' +
        '</svg>';
    }],
    ['shape_ugol', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="20" y1="50" x2="20" y2="10" stroke="#1D3557" stroke-width="4"/>' +
        '<line x1="20" y1="50" x2="85" y2="50" stroke="#1D3557" stroke-width="4"/>' +
        '<path d="M20 38 A12 12 0 0 1 32 50" fill="none" stroke="#FF6B5B" stroke-width="3"/>' +
        '</svg>';
    }]
  ];

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = null;
  var lastKey = null;
  var busy = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
  }

  function pickShape(){
    var candidate;
    var attempts = 0;
    do {
      candidate = SHAPES[Math.floor(Math.random()*SHAPES.length)];
      attempts++;
    } while (candidate[0] === lastKey && attempts < 10);
    lastKey = candidate[0];
    return candidate;
  }

  function render(){
    updateProgress();
    var m = msgs();
    currentAnswer = pickShape();

    var options = [currentAnswer];
    var pool = SHAPES.filter(function(s){ return s[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(s){
      return '<button class="shape-btn" data-key="' + s[0] + '">' + s[1]() + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="shape-target-text">' + (m[currentAnswer[0]] || currentAnswer[0]) + '</div>' +
      '<div class="shape-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.shape-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(btn.getAttribute('data-key'), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('shapes', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastKey = null;
      updateScore();
      render();
    });
  }

  function checkAnswer(key, btn){
    busy = true;
    totalAnswered++;
    var feedback = document.getElementById('count-feedback');
    var m = msgs();
    root.querySelectorAll('.shape-btn').forEach(function(b){ b.disabled = true; });

    if(key === currentAnswer[0]){
      totalCorrect++;
      streak++;
      updateScore();
      updateProgress();
      btn.classList.add('correct');
      feedback.textContent = m.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      if(streak >= STREAK_NEEDED){
        setTimeout(renderFinish, 900);
      } else {
        setTimeout(render, 900);
      }
    } else {
      streak = 0;
      updateProgress();
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(render, 1200);
    }
  }

  render();
}
