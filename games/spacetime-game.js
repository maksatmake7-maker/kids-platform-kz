/* ===== Білім Аралы — игра "Приборы и время" (v2 — режим освоения) =====
   Естествознание, 1 класс, по программе (приложение 28):
   цель 1.4.2.2 "описывать приборы и летательные аппараты для
   изучения космоса" + цель 1.4.3.2 "определять средства измерения
   времени". Объединены в одну игру, как и раньше.
   Показываем название, ребёнок находит подходящую эмодзи среди 4.
   Понятий всего 6 — они не заканчиваются, а случайно повторяются
   (без повтора одного и того же понятия два раза подряд); чтобы
   "освоить" тему, нужно ответить верно 10 раз ПОДРЯД. Ошибка
   сбрасывает серию, но не прерывает игру.
   Использование: initSpaceTimeGame('game-root') — spacetime.html не трогать.
*/
function initSpaceTimeGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [ключ_названия, эмодзи]
  var ITEMS = [
    ['item_rocket','🚀'],
    ['item_telescope','🔭'],
    ['item_satellite','🛰️'],
    ['item_clock','⏰'],
    ['item_calendar','📅'],
    ['item_hourglass','⏳']
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

  function pickItem(){
    var candidate;
    var attempts = 0;
    do {
      candidate = ITEMS[Math.floor(Math.random()*ITEMS.length)];
      attempts++;
    } while (candidate[0] === lastKey && attempts < 10);
    lastKey = candidate[0];
    return candidate;
  }

  function render(){
    updateProgress();
    var m = msgs();
    currentAnswer = pickItem();

    var options = [currentAnswer];
    var pool = ITEMS.filter(function(it){ return it[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(it){
      return '<button class="count-btn" data-key="' + it[0] + '" style="font-size:2rem;">' + it[1] + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="shape-target-text">' + (m[currentAnswer[0]] || currentAnswer[0]) + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(btn.getAttribute('data-key'), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('spacetime', STREAK_NEEDED, STREAK_NEEDED);
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
    root.querySelectorAll('.count-btn').forEach(function(b){ b.disabled = true; });

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
